import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Rocket, Home, LogOut, User } from 'lucide-react';
import { useUi } from '../../contexts/UiContext';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';
import Logo from '../ui/Logo';

const Header: React.FC = () => {
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

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

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

  return (
    <header className={`fixed top-0 left-0 w-screen max-w-none z-50 transition-all duration-300 ${
      isHomePage
        ? 'bg-white/95 backdrop-blur-sm shadow-lg'
        : isScrolled 
          ? 'bg-white/95 backdrop-blur-sm shadow-lg' 
          : 'bg-transparent'
    }`}>
      {/* More visible white strip at the very top, only on main page and not on auth page */}
      {isHomePage && !isAuthPage && (
        <div className="w-full h-1 bg-white shadow-md" style={{ minHeight: '2px' }}></div>
      )}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <Logo imgClassName="h-14 md:h-16 w-auto" />
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 w-auto">
          {isHomePage ? (
            <>
              <button 
                onClick={() => scrollToSection('how-it-works')} 
                className="font-medium transition-colors text-black relative group"
                style={{ zIndex: 1 }}
              >
                <span className="relative z-10 group-hover:text-blue-700 transition-colors duration-200">
                  How It Works
                  <span className="block h-0.5 bg-gradient-to-r from-blue-400 to-blue-700 absolute left-0 -bottom-1 w-0 group-hover:w-full transition-all duration-300"></span>
                </span>
              </button>
              <button 
                onClick={() => scrollToSection('pricing')} 
                className="font-medium transition-colors text-black relative group"
                style={{ zIndex: 1 }}
              >
                <span className="relative z-10 group-hover:text-blue-700 transition-colors duration-200">
                  Pricing
                  <span className="block h-0.5 bg-gradient-to-r from-blue-400 to-blue-700 absolute left-0 -bottom-1 w-0 group-hover:w-full transition-all duration-300"></span>
                </span>
              </button>
              {!isAuthenticated && (
                <Button
                  onClick={handleAuthClick}
                  className="ml-4 flex items-center space-x-2 bg-gradient-to-r from-amber-400 to-amber-500 text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:from-amber-500 hover:to-yellow-500 transition-all duration-200"
                >
                  <Rocket size={18} />
                  <span>Explore Now</span>
                </Button>
              )}
            </>
          ) : (
            <>
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
              {/* Remove Home button on auth page */}
              {!isHomePage && !isAuthenticated && !isAuthPage && (
                <button
                  onClick={scrollToTop}
                  className="flex items-center space-x-1 transition-colors text-gray-700 hover:text-blue-600"
                >
                  <Home size={18} />
                  <span>Home</span>
                </button>
              )}
            </>
          )}

          {/* User Menu or Auth Button */}
          {isAuthenticated && !location.pathname.startsWith('/funding') ? (
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
                {isHomePage && (
                  <>
                    <button
                      onClick={() => scrollToSection('how-it-works')}
                      className="text-gray-700 hover:text-blue-600 font-semibold py-3 px-2 rounded-lg transition-colors text-lg"
                    >
                      How It Works
                    </button>
                    <button
                      onClick={() => scrollToSection('pricing')}
                      className="text-gray-700 hover:text-blue-600 font-semibold py-3 px-2 rounded-lg transition-colors text-lg"
                    >
                      Pricing
                    </button>
                  </>
                )}
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

export default Header;