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
  const [isModalOpen, setIsModalOpen] = useState(false);
  
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

  // Auto-open modal on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight / 3 && !isModalOpen) {
        setIsModalOpen(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isModalOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

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

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'initial';
  };

  return (
    <>
      {/* Background Container */}
      <div className="h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 relative overflow-hidden font-[Inter,sans-serif]">
        {/* Background Image */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url('/ChatGPT Image Jul 9, 2025, 09_54_00 AM.png')",
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            width: '100%',
            height: '100%'
          }}
        />
        
        {/* Scroll Down Indicator */}
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center text-gray-700 text-3xl font-extrabold z-10">
          SCROLL DOWN
          <svg 
            className="mt-4 w-12 fill-current" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 32 32"
          >
            <path d="M16 3C8.832031 3 3 8.832031 3 16s5.832031 13 13 13 13-5.832031 13-13S23.167969 3 16 3zm0 2c6.085938 0 11 4.914063 11 11 0 6.085938-4.914062 11-11 11-6.085937 0-11-4.914062-11-11C5 9.914063 9.914063 5 16 5zm-1 4v10.28125l-4-4-1.40625 1.4375L16 23.125l6.40625-6.40625L21 15.28125l-4 4V9z"/> 
          </svg>
        </div>

        {/* Modal Trigger Button */}
        <button 
          onClick={openModal}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm text-gray-700 font-semibold text-lg cursor-pointer border-0 outline-0 py-3 px-10 rounded-full shadow-lg transition-all duration-300 hover:bg-white hover:shadow-xl z-20"
        >
          Click here to login
        </button>
      </div>

      {/* Modal */}
      <div className={`fixed inset-0 z-50 transition-all duration-700 ease-in-out ${isModalOpen ? 'bg-black/85' : 'bg-transparent pointer-events-none'}`}
        style={{backdropFilter: isModalOpen ? 'blur(2px)' : 'none', transition: 'background 0.6s cubic-bezier(0.4,0,0.2,1)'}}
      >
        <div className={`flex items-center justify-center min-h-screen p-4 transition-all duration-700 ease-in-out ${isModalOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          style={{transition: 'opacity 0.6s cubic-bezier(0.4,0,0.2,1)'}}
        >
           <div className={`bg-white rounded-2xl overflow-hidden w-full max-w-4xl h-[90vh] flex shadow-2xl transition-all duration-700 ease-in-out will-change-transform will-change-opacity ${isModalOpen ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-8 opacity-0'}`}
             style={{minHeight: '500px', height: '90vh', transition: 'all 0.6s cubic-bezier(0.4,0,0.2,1)'}}
           >
            {/* Left Side - Form */}
            <div className="w-1/2 min-w-0 flex flex-col bg-white relative h-full">
              {/* Sticky Header */}
              <div className="sticky top-0 z-20 bg-white pt-8 pb-4 px-12 shadow-sm flex flex-col items-center" style={{minHeight: 120}}>
                <button 
                  onClick={closeModal}
                  className="absolute top-6 right-8 w-8 h-8 border-0 bg-transparent p-0 cursor-pointer z-10"
                  aria-label="Close"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" className="w-full h-full fill-gray-600">
                    <path d="M 25 3 C 12.86158 3 3 12.86158 3 25 C 3 37.13842 12.86158 47 25 47 C 37.13842 47 47 37.13842 47 25 C 47 12.86158 37.13842 3 25 3 z M 25 5 C 36.05754 5 45 13.94246 45 25 C 45 36.05754 36.05754 45 25 45 C 13.94246 45 5 36.05754 5 25 C 5 13.94246 13.94246 5 25 5 z M 16.990234 15.990234 A 1.0001 1.0001 0 0 0 16.292969 17.707031 L 23.585938 25 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 25 26.414062 L 32.292969 33.707031 A 1.0001 1.0001 0 1 0 33.707031 32.292969 L 26.414062 25 L 33.707031 17.707031 A 1.0001 1.0001 0 0 0 32.980469 15.990234 A 1.0001 1.0001 0 0 0 32.292969 16.292969 L 25 23.585938 L 17.707031 16.292969 A 1.0001 1.0001 0 0 0 16.990234 15.990234 z"></path>
                  </svg>
                </button>
                <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight text-center" style={{fontFamily: 'Inter, Nunito, Poppins, sans-serif'}}>
                  {mode === 'signin' && 'Welcome back'}
                  {mode === 'signup' && 'Start your journey'}
                  {mode === 'verify' && 'Verify Your Email'}
                </h1>
                <p className="text-gray-600 text-lg font-medium leading-relaxed tracking-wide text-center" style={{fontFamily: 'Inter, Nunito, Poppins, sans-serif', maxWidth: 400, margin: '0 auto'}}>
                  {mode === 'verify' 
                    ? `We've sent a verification code to ${formData.email}`
                    : mode === 'signin'
                      ? 'Sign in to continue.'
                      : mode === 'signup'
                        ? 'Create your account and unlock new opportunities.'
                        : ''
                  }
                </p>
              </div>
              {/* Scrollable Form Area */}
              <div className="flex-1 flex flex-col justify-start px-12 pb-8 pt-4 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent" style={{minHeight: 0}}>
                {/* Mode Selector */}
                {mode !== 'verify' && (
                  <div className="flex justify-center mb-6">
                    <div className="inline-flex rounded-full bg-gray-100 p-1">
                      <button
                        className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
                          mode === 'signin' 
                            ? 'bg-blue-600 text-white shadow-md' 
                            : 'bg-transparent text-gray-700 hover:bg-gray-200'
                        }`}
                        onClick={() => setMode('signin')}
                      >
                        Sign In
                      </button>
                      <button
                        className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
                          mode === 'signup' 
                            ? 'bg-blue-600 text-white shadow-md' 
                            : 'bg-transparent text-gray-700 hover:bg-gray-200'
                        }`}
                        onClick={() => setMode('signup')}
                      >
                        Sign Up
                      </button>
                    </div>
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
                    <div className="input-block">
                      <label htmlFor="name" className="input-label text-blue-600">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        className="w-full outline-0 border-0 pt-1 text-sm"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                      />
                    </div>
                  )}

                  {mode !== 'verify' && (
                    <div className="input-block">
                      <label htmlFor="email" className="input-label text-blue-600">Email</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        className="w-full outline-0 border-0 pt-1 text-sm"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                      />
                    </div>
                  )}

                  {mode !== 'verify' && (
                    <div className="input-block">
                      <label htmlFor="password" className="input-label text-blue-600">Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          id="password"
                          required
                          className="w-full outline-0 border-0 pt-1 text-sm pr-8"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Enter your password"
                        />
                        <button
                          type="button"
                          className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {mode === 'signup' && formData.password && (
                        <div className="mt-2">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-1">
                              <div 
                                className={`h-1 rounded-full transition-all ${
                                  passwordStrength.strength === 1 ? 'bg-red-500 w-1/3' :
                                  passwordStrength.strength === 2 ? 'bg-yellow-500 w-2/3' :
                                  passwordStrength.strength === 3 ? 'bg-green-500 w-full' : 'w-0'
                                }`}
                              />
                            </div>
                            <span className={`text-xs font-medium ${passwordStrength.color}`}>
                              {passwordStrength.text}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {mode === 'signup' && (
                    <div className="input-block">
                      <label htmlFor="confirmPassword" className="input-label text-blue-600">Confirm Password</label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          id="confirmPassword"
                          required
                          className="w-full outline-0 border-0 pt-1 text-sm pr-8"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="Confirm your password"
                        />
                        <button
                          type="button"
                          className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  )}

                  {mode === 'verify' && (
                    <div className="input-block">
                      <label htmlFor="otp" className="input-label text-blue-600">Verification Code</label>
                      <input
                        type="text"
                        name="otp"
                        id="otp"
                        required
                        maxLength={6}
                        className="w-full outline-0 border-0 pt-1 text-sm text-center text-2xl font-mono tracking-widest"
                        value={formData.otp}
                        onChange={handleChange}
                        placeholder="000000"
                      />
                      <div className="mt-2 flex items-center justify-between text-xs">
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
                    <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  {success && (
                    <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                      <CheckCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{success}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="modal-buttons">
                    {mode === 'signin' && (
                      <a href="#" className="text-blue-600 text-sm hover:underline">
                        Forgot your password?
                      </a>
                    )}
                    <button 
                      type="submit"
                      disabled={loading}
                      className={`flex items-center gap-2 px-6 py-2 rounded-full font-semibold transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 ${mode === 'signup' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                    >
                      {loading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <>
                          <span>
                            {mode === 'signin' ? 'Login' : 
                             mode === 'signup' ? 'Create Account' : 
                             'Verify Email'}
                          </span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* Sign Up Link */}
                {mode === 'signin' && (
                  <p className="sign-up">
                    Don't have an account? <a href="#" className="text-blue-600 hover:underline" onClick={() => setMode('signup')}>Sign up now</a>
                  </p>
                )}

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
            {/* Right Side - Image */}
            <div className="w-1/2 min-w-0 hidden lg:flex items-stretch justify-center overflow-hidden transition-all duration-500 h-full">
              <img 
                src="/ChatGPT Image Jul 9, 2025, 10_12_09 AM.png"
                alt="Auth visual"
                className="w-full h-full object-contain transition-transform duration-700"
                style={{height: '100%', objectPosition: 'center'}}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <style>{`
        .input-block {
          display: flex;
          flex-direction: column;
          padding: 10px 10px 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
          margin-bottom: 20px;
          transition: border 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s cubic-bezier(0.4,0,0.2,1);
        }
        .input-block:focus-within {
          border-color: #2563eb;
        }
        .input-block:focus-within .input-label {
          color: #2563eb;
        }
        .input-label {
          font-size: 1rem;
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 1.2px;
          color: #2563eb;
          transition: 0.3s;
          font-family: 'Inter', 'Nunito', 'Poppins', sans-serif;
        }
        .input-block input::placeholder {
          font-size: 1rem;
          font-weight: 500;
          color: #b0b8c1;
          letter-spacing: 0.5px;
          font-family: 'Inter', 'Nunito', 'Poppins', sans-serif;
        }
        .input-block input {
          font-size: 1.08rem;
          font-weight: 500;
          color: #222f3e;
          font-family: 'Inter', 'Nunito', 'Poppins', sans-serif;
          line-height: 1.5;
        }
        .modal-buttons {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 20px;
        }
        .modal-buttons button, .modal-buttons a {
          transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
        }
        .modal-buttons button {
          font-size: 1.15rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          font-family: 'Inter', 'Nunito', 'Poppins', sans-serif;
        }
        .sign-up {
          margin: 60px 0 0;
          font-size: 14px;
          text-align: center;
        }
        .sign-up a {
          color: #2563eb;
          text-decoration: none;
        }
        .sign-up a:hover {
          text-decoration: underline;
        }
        @media (max-width: 750px) {
          .modal-container {
            width: 90%;
          }
          .modal-right {
            display: none;
          }
        }
        /* Custom scrollbar for form area */
        .scrollbar-thin {
          scrollbar-width: thin;
        }
        .scrollbar-thumb-blue-200::-webkit-scrollbar-thumb {
          background-color: #bfdbfe;
          border-radius: 8px;
        }
        .scrollbar-track-transparent::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 8px;
        }
      `}</style>
      {/* Import Inter font from Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet" />
    </>
  );
};

export default AuthPage;
