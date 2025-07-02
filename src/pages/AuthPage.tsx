import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Logo from '../components/ui/Logo';
import Button from '../components/ui/Button';
import GoogleSignIn from '../components/auth/GoogleSignIn';
import { ArrowRight, Mail, Lock, User, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';

const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<'signin' | 'signup' | 'verify'>('signin');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    otp: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  
  const { login, register, verifyEmail, resendOTP, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [user, navigate, location]);

  // Handle URL error parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const error = urlParams.get('error');
    if (error === 'oauth_failed') {
      setError('Google sign-in failed. Please try again.');
    }
  }, [location]);

  // OTP timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const validateForm = () => {
    if (mode === 'signup') {
      if (!formData.name.trim()) {
        setError('Name is required');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        return false;
      }
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (mode !== 'verify' && !formData.password.trim()) {
      setError('Password is required');
      return false;
    }
    if (mode === 'verify' && !formData.otp.trim()) {
      setError('OTP is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (mode === 'signup') {
        const result = await register(formData.name, formData.email, formData.password);
        setSuccess('Registration successful! Please check your email for verification code.');
        setMode('verify');
        setOtpTimer(900); // 15 minutes
      } else if (mode === 'signin') {
        const result = await login(formData.email, formData.password);
        if (result.requiresVerification) {
          setMode('verify');
          setOtpTimer(900);
        } else {
          setSuccess('Login successful! Redirecting...');
          setTimeout(() => {
            const from = location.state?.from?.pathname || '/dashboard';
            navigate(from, { replace: true });
          }, 1000);
        }
      } else if (mode === 'verify') {
        const result = await verifyEmail(formData.email, formData.otp);
        setSuccess('Email verified successfully! Redirecting...');
        setTimeout(() => {
          const from = location.state?.from?.pathname || '/dashboard';
          navigate(from, { replace: true });
        }, 1000);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      if (err.message?.includes('verify your email')) {
        setMode('verify');
        setOtpTimer(900);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (otpTimer > 0) return;
    
    setLoading(true);
    try {
      await resendOTP(formData.email);
      setSuccess('Verification code sent successfully!');
      setOtpTimer(900);
    } catch (err: any) {
      setError(err.message || 'Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, text: '', color: '' };
    if (password.length < 6) return { strength: 1, text: 'Weak', color: 'text-red-600' };
    if (password.length < 8) return { strength: 2, text: 'Fair', color: 'text-yellow-600' };
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) return { strength: 2, text: 'Fair', color: 'text-yellow-600' };
    return { strength: 3, text: 'Strong', color: 'text-green-600' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 flex flex-col">
      <header className="w-full bg-white/90 shadow-sm py-4 px-8 flex items-center justify-between fixed top-0 left-0 z-40" style={{backdropFilter: 'blur(8px)'}}>
        <Logo />
      </header>
      
      <div className="flex-1 flex items-center justify-center pt-24 pb-8 px-4">
        <div className="backdrop-blur-xl bg-white/70 border border-blue-100 shadow-2xl rounded-3xl w-full max-w-md p-8">
          
          {/* Mode Selector */}
          {mode !== 'verify' && (
            <div className="flex justify-center mb-6">
              <div className="inline-flex rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 p-1 border border-blue-200">
                <button
                  className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
                    mode === 'signin' 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'bg-transparent text-blue-700 hover:bg-blue-50'
                  }`}
                  onClick={() => setMode('signin')}
                >
                  Sign In
                </button>
                <button
                  className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
                    mode === 'signup' 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'bg-transparent text-blue-700 hover:bg-blue-50'
                  }`}
                  onClick={() => setMode('signup')}
                >
                  Sign Up
                </button>
              </div>
            </div>
          )}

          {/* Verify Email Header */}
          {mode === 'verify' && (
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Email</h2>
              <p className="text-gray-600">We've sent a verification code to {formData.email}</p>
            </div>
          )}

          {/* Google Sign In */}
          {mode !== 'verify' && (
            <div className="mb-6">
              <GoogleSignIn text={mode === 'signin' ? 'Sign in with Google' : 'Sign up with Google'} />
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  <User className="inline w-4 h-4 mr-2" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
              </div>
            )}

            {mode !== 'verify' && (
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  <Mail className="inline w-4 h-4 mr-2" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </div>
            )}

            {mode !== 'verify' && (
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  <Lock className="inline w-4 h-4 mr-2" />
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {mode === 'signup' && formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all ${
                            passwordStrength.strength === 1 ? 'bg-red-500 w-1/3' :
                            passwordStrength.strength === 2 ? 'bg-yellow-500 w-2/3' :
                            passwordStrength.strength === 3 ? 'bg-green-500 w-full' : 'w-0'
                          }`}
                        />
                      </div>
                      <span className={`text-sm font-medium ${passwordStrength.color}`}>
                        {passwordStrength.text}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {mode === 'signup' && (
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  <Lock className="inline w-4 h-4 mr-2" />
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    required
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            )}

            {mode === 'verify' && (
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Verification Code
                </label>
                <input
                  type="text"
                  name="otp"
                  required
                  maxLength={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-2xl font-mono tracking-widest"
                  value={formData.otp}
                  onChange={handleChange}
                  placeholder="000000"
                />
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    {otpTimer > 0 ? `Code expires in ${formatTime(otpTimer)}` : 'Code expired'}
                  </span>
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={otpTimer > 0 || loading}
                    className="text-blue-600 hover:text-blue-700 disabled:text-gray-400 disabled:cursor-not-allowed"
                  >
                    Resend Code
                  </button>
                </div>
              </div>
            )}

            {/* Error/Success Messages */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {success && (
              <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{success}</span>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg transition-all"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <span>
                    {mode === 'signin' ? 'Sign In' : 
                     mode === 'signup' ? 'Create Account' : 
                     'Verify Email'}
                  </span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </form>

          {/* Back to Sign In */}
          {mode === 'verify' && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setMode('signin')}
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                ← Back to Sign In
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;