const User = require('../models/User');
const OTP = require('../models/OTP');
const { generateToken, generateOTP } = require('../utils/jwt');
const { sendVerificationEmail, sendWelcomeEmail } = require('../utils/email');
const { validationResult } = require('express-validator');

// Register user
const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      if (existingUser.isVerified) {
        return res.status(400).json({
          success: false,
          message: 'User already exists with this email'
        });
      } else {
        // User exists but not verified, resend OTP
        const otp = generateOTP();
        
        // Delete old OTPs
        await OTP.deleteMany({ email, type: 'email_verification' });
        
        // Create new OTP
        await OTP.create({
          email,
          otp,
          type: 'email_verification'
        });

        // Send verification email
        await sendVerificationEmail(email, otp, existingUser.name);

        return res.status(200).json({
          success: true,
          message: 'Verification email sent. Please check your inbox.',
          requiresVerification: true
        });
      }
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
      authProvider: 'email'
    });

    // Generate OTP
    const otp = generateOTP();
    
    // Save OTP to database
    await OTP.create({
      email,
      otp,
      type: 'email_verification'
    });

    // Send verification email
    const emailResult = await sendVerificationEmail(email, otp, name);
    
    if (!emailResult.success) {
      console.error('Failed to send verification email:', emailResult.error);
      // Don't fail registration if email fails
    }

    res.status(201).json({
      success: true,
      message: 'Registration successful. Please check your email for verification code.',
      requiresVerification: true
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed. Please try again.'
    });
  }
};

// Verify email with OTP
const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Email and OTP are required'
      });
    }

    // Find valid OTP
    const otpRecord = await OTP.findOne({
      email: email.toLowerCase(),
      otp,
      type: 'email_verification',
      isUsed: false,
      expiresAt: { $gt: new Date() }
    });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP'
      });
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Mark user as verified
    user.isVerified = true;
    await user.save();

    // Mark OTP as used
    otpRecord.isUsed = true;
    await otpRecord.save();

    // Generate JWT token
    const token = generateToken({ id: user._id });

    // Set HTTP-only cookie
    const cookieOptions = {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    };

    res.cookie('token', token, cookieOptions);

    // Send welcome email
    await sendWelcomeEmail(email, user.name);

    res.status(200).json({
      success: true,
      message: 'Email verified successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
        avatar: user.avatar,
        authProvider: user.authProvider
      },
      token
    });

  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Email verification failed. Please try again.'
    });
  }
};

// Resend OTP
const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: 'Email is already verified'
      });
    }

    // Generate new OTP
    const otp = generateOTP();
    
    // Delete old OTPs
    await OTP.deleteMany({ email: email.toLowerCase(), type: 'email_verification' });
    
    // Create new OTP
    await OTP.create({
      email: email.toLowerCase(),
      otp,
      type: 'email_verification'
    });

    // Send verification email
    await sendVerificationEmail(email, otp, user.name);

    res.status(200).json({
      success: true,
      message: 'Verification code sent successfully'
    });

  } catch (error) {
    console.error('Resend OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to resend verification code'
    });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    // Find user and include password
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check if user registered with Google
    if (user.authProvider === 'google' && !user.password) {
      return res.status(400).json({
        success: false,
        message: 'Please sign in with Google or reset your password'
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check if email is verified
    if (!user.isVerified) {
      return res.status(401).json({
        success: false,
        message: 'Please verify your email before logging in',
        requiresVerification: true
      });
    }

    // Check if account is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Your account has been deactivated'
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const token = generateToken({ id: user._id });

    // Set HTTP-only cookie
    const cookieOptions = {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    };

    res.cookie('token', token, cookieOptions);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
        avatar: user.avatar,
        authProvider: user.authProvider
      },
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed. Please try again.'
    });
  }
};

// Logout user
const logout = async (req, res) => {
  try {
    // Clear the HTTP-only cookie
    res.cookie('token', '', {
      expires: new Date(0),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });

    res.status(200).json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Logout failed'
    });
  }
};

// Get current user
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
        avatar: user.avatar,
        authProvider: user.authProvider,
        lastLogin: user.lastLogin
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get user information'
    });
  }
};

// Google OAuth success
const googleSuccess = async (req, res) => {
  try {
    if (!req.user) {
      return res.redirect(`${process.env.FRONTEND_URL}/auth?error=oauth_failed`);
    }

    // Generate JWT token
    const token = generateToken({ id: req.user._id });

    // Set HTTP-only cookie
    const cookieOptions = {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    };

    res.cookie('token', token, cookieOptions);

    // Send welcome email for new users
    if (req.user.createdAt && new Date() - new Date(req.user.createdAt) < 60000) { // Created within last minute
      await sendWelcomeEmail(req.user.email, req.user.name);
    }

    // Redirect to dashboard
    res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
  } catch (error) {
    console.error('Google OAuth success error:', error);
    res.redirect(`${process.env.FRONTEND_URL}/auth?error=oauth_failed`);
  }
};

module.exports = {
  register,
  verifyEmail,
  resendOTP,
  login,
  logout,
  getMe,
  googleSuccess
};
