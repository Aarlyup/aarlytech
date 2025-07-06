import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Rocket, Home, LogOut, User } from 'lucide-react';
import { useUi } from '../../contexts/UiContext';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';
import Logo from '../ui/Logo';

const FundingHeader: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { mobileMenuOpen, setMobileMenuOpen } = useUi();
  const { user, logout, isAuthenticated } = useAuth();
  const isHomePage = location.pathname === '/';
  const isAuthPage = location.pathname === '/auth';
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    setShowUserMenu(false);
    navigate('/');
  };

  const handleAuthClick = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/auth');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 w-screen max-w-none z-50 transition-all duration-300 ${
      isHomePage
        ? 'bg-white/95 backdrop-blur-sm shadow-lg'
        : isScrolled 
          ? 'bg-white/95 backdrop-blur-sm shadow-lg' 
          : 'bg-transparent'
    }`}>
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <Logo imgClassName="h-14 md:h-16 w-auto" />
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 w-auto">
          {isAuthenticated && (
            <>
              <Link
                to="/dashboard"
                className={`font-medium transition-colors ${
                  location.pathname.startsWith('/dashboard')
                    ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/funding/vc"
                className={`font-medium transition-colors ${
                  location.pathname.startsWith('/funding')
                    ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Funding
              </Link>
              <Link
                to="/investor-match"
                className={`font-medium transition-colors ${
                  location.pathname.startsWith('/investor-match')
                    ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Investor Match
              </Link>
              <Link
                to="/finnewz"
                className={`font-medium transition-colors ${
                  location.pathname.startsWith('/finnewz')
                    ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Fin'Newz
              </Link>
              <Link
                to="/content"
                className={`font-medium transition-colors ${
                  location.pathname.startsWith('/content')
                    ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Content
              </Link>
            </>
          )}
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
                <span className="font-medium text-black">
                  {user?.name?.split(' ')[0]}
                </span>
              </button>
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setShowUserMenu(false)}
                  >
                    Dashboard
                  </Link>
                  {/* Show Admin link only for admin users */}
                  {user && ['admin@aarly.co', 'founder@aarly.co', 'teamaarly@gmail.com'].includes(user.email.toLowerCase()) && (
                    <Link
                      to="/admin"
                      className={`font-medium transition-colors ${
                        location.pathname.startsWith('/admin')
                          ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                      }`}
                    >
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : null}
        </nav>
        {/* Mobile Menu Button */}
        <button 
          className={`md:hidden p-2 transition-colors w-12 h-12 text-blue-700 font-bold shadow-lg rounded-full flex items-center justify-center bg-white/90 border border-blue-100 ${
            isScrolled 
              ? 'hover:text-blue-600' 
              : 'hover:text-blue-200'
          }`}
          style={{ fontSize: 0 }}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={36} /> : <Menu size={36} />}
        </button>
      </div>
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-[70px] left-0 w-screen max-w-none z-50 bg-white backdrop-blur-xl shadow-2xl rounded-b-3xl animate-fade-in-down border-t border-blue-100">
          <div className="px-4 py-6 flex flex-col space-y-5">
            {/* Funding Section Navigation */}
            <div className="flex flex-wrap gap-2 pb-4 border-b border-gray-200">
              <Link to="/funding/vc" className="px-3 py-2 rounded-lg text-sm font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors" onClick={() => setMobileMenuOpen(false)}>VC</Link>
              <Link to="/funding/microvc" className="px-3 py-2 rounded-lg text-sm font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors" onClick={() => setMobileMenuOpen(false)}>MicroVC</Link>
              <Link to="/funding/incubator" className="px-3 py-2 rounded-lg text-sm font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors" onClick={() => setMobileMenuOpen(false)}>Incubator</Link>
              <Link to="/funding/accelerator" className="px-3 py-2 rounded-lg text-sm font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors" onClick={() => setMobileMenuOpen(false)}>Accelerator</Link>
              <Link to="/funding/angel" className="px-3 py-2 rounded-lg text-sm font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors" onClick={() => setMobileMenuOpen(false)}>Angel</Link>
              <Link to="/funding/grants" className="px-3 py-2 rounded-lg text-sm font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors" onClick={() => setMobileMenuOpen(false)}>Grants</Link>
            </div>
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-gray-900">{user?.name}</p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                </div>
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-blue-600 font-semibold py-3 px-2 rounded-lg transition-colors text-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/funding/vc"
                  className="text-gray-700 hover:text-blue-600 font-semibold py-3 px-2 rounded-lg transition-colors text-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Funding
                </Link>
                <Link
                  to="/investor-match"
                  className="text-gray-700 hover:text-blue-600 font-semibold py-3 px-2 rounded-lg transition-colors text-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Investor Match
                </Link>
                <Link
                  to="/finnewz"
                  className="text-gray-700 hover:text-blue-600 font-semibold py-3 px-2 rounded-lg transition-colors text-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Fin'Newz
                </Link>
                <Link
                  to="/content"
                  className="text-gray-700 hover:text-blue-600 font-semibold py-3 px-2 rounded-lg transition-colors text-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Content
                </Link>
                {/* Show Admin link only for admin users */}
                {user && ['admin@aarly.co', 'founder@aarly.co', 'teamaarly@gmail.com'].includes(user.email.toLowerCase()) && (
                  <Link
                    to="/admin"
                    className="text-gray-700 hover:text-blue-600 font-semibold py-3 px-2 rounded-lg transition-colors text-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700 font-semibold py-3 px-2 rounded-lg transition-colors text-lg"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Button 
                  onClick={handleAuthClick}
                  variant="primary" 
                  className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl"
                >
                  <Rocket size={18} />
                  <span className="font-semibold">Get Started</span>
                </Button>
                {!isHomePage && (
                  <button
                    onClick={scrollToTop}
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-semibold py-3 px-2 rounded-lg transition-colors text-lg"
                  >
                    <Home size={18} />
                    <span>Back to Home</span>
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default FundingHeader; 