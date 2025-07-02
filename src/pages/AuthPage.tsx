import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/ui/Logo';
import Button from '../components/ui/Button';
import { ArrowRight } from 'lucide-react';

// This AuthPage is frontend-only with demo functionality.

const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Password strength checker (simple example)
  const getPasswordStrength = (pwd: string) => {
    if (pwd.length > 8 && /[A-Z]/.test(pwd) && /[0-9]/.test(pwd) && /[^A-Za-z0-9]/.test(pwd)) return 'Strong';
    if (pwd.length > 6) return 'Medium';
    return 'Weak';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    // Demo authentication - no backend integration
    setTimeout(() => {
      setSuccess('Success! Redirecting...');
      setLoading(false);
      setTimeout(() => {
        navigate('/dashboard'); // Change to your main app page
      }, 1200);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 flex flex-col">
      {/* Navbar/Header placeholder for MVP - adjust as needed */}
      <header className="w-full bg-white/90 shadow-sm py-4 px-8 flex items-center justify-between fixed top-0 left-0 z-40" style={{backdropFilter: 'blur(8px)'}}>
        <div className="flex items-center gap-2">
          <Logo />
        </div>
        {/* No nav links on Auth page */}
      </header>
      <div className="flex-1 flex items-center justify-center pt-24 pb-8">
        <div className="backdrop-blur-xl bg-white/70 border border-blue-100 shadow-2xl rounded-3xl w-full max-w-md p-10 flex flex-col gap-8" style={{boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)'}}>
          <div className="flex justify-center mb-4">
            <div className="inline-flex rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 p-1 border border-blue-200 shadow-inner">
              <button
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 text-lg focus:outline-none ${mode === 'signin' ? 'bg-blue-600 text-white shadow-md' : 'bg-transparent text-blue-700 hover:bg-blue-50'}`}
                onClick={() => setMode('signin')}
                disabled={mode === 'signin'}
                style={{ minWidth: 110 }}
              >
                Sign In
              </button>
              <button
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 text-lg focus:outline-none ${mode === 'signup' ? 'bg-blue-600 text-white shadow-md' : 'bg-transparent text-blue-700 hover:bg-blue-50'}`}
                onClick={() => setMode('signup')}
                disabled={mode === 'signup'}
                style={{ minWidth: 110 }}
              >
                Sign Up
              </button>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                required
                autoComplete="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Password</label>
              <input
                type="password"
                required
                minLength={6}
                autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
              />
              {mode === 'signup' && (
                <div className="mt-1 text-xs text-gray-500">
                  Password strength: <span className={
                    getPasswordStrength(password) === 'Strong' ? 'text-green-600' : getPasswordStrength(password) === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                  }>{getPasswordStrength(password)}</span>
                </div>
              )}
            </div>
            {mode === 'signup' && (
              <div>
                <label className="block text-gray-700 font-medium mb-1">Confirm Password</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  autoComplete="new-password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
            )}
            {error && <div className="text-red-600 text-sm font-medium">{error}</div>}
            {success && <div className="text-green-600 text-sm font-medium">{success}</div>}
            <Button
              type="submit"
              variant="primary"
              className="flex items-center justify-center gap-2 transition-all bg-gradient-to-r from-amber-400 to-amber-500 text-white shadow-lg hover:from-amber-500 hover:to-amber-600 w-full font-semibold text-base py-2.5 mt-2 rounded-xl"
              disabled={loading}
            >
              <span className="font-semibold">{loading ? (mode === 'signin' ? 'Signing In...' : 'Signing Up...') : (mode === 'signin' ? 'Sign In' : 'Sign Up')}</span>
              <ArrowRight size={18} />
            </Button>
          </form>
          <div className="mt-6 text-center text-gray-400 text-xs">
            {/* For social login, add buttons here and connect to your backend provider. */}
            {/* Example: <button>Sign in with Google</button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage; 