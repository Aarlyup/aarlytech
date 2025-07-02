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
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const isAppPage = [
    '/dashboard',
    '/funding',
    '/investor-match',
    '/finnewz',
  ].some(path => location.pathname.startsWith(path));

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
    <header className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-sm shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-5 flex items-center justify-between">
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {isHomePage ? (
            <>
              <button 
                onClick={() => scrollToSection('how-it-works')} 
                className={`font-medium transition-colors ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-blue-600' 
                    : 'text-white hover:text-blue-200'
                }`}
              >
                How It Works
              </button>
              <button 
                onClick={() => scrollToSection('pricing')} 
                className={`font-medium transition-colors ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-blue-600' 
                    : 'text-white hover:text-blue-200'
                }`}
              >
                Pricing
              </button>
            </>
          ) : (
            <>
              {isAuthenticated && (
                <>
                  <Link
                    to="/dashboard"
                    className={`font-medium transition-colors ${
                      location.pathname.startsWith('/dashboard')
                        ? 'text-blue-600' : isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
                    }`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/funding/vc"
                    className={`font-medium transition-colors ${
                      location.pathname.startsWith('/funding')
                        ? 'text-blue-600' : isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
                    }`}
                  >
                    Funding
                  </Link>
                  <Link
                    to="/investor-match"
                    className={`font-medium transition-colors ${
                      location.pathname.startsWith('/investor-match')
                        ? 'text-blue-600' : isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
                    }`}
                  >
                    Investor Match
                  </Link>
                  <Link
                    to="/finnewz"
                    className={`font-medium transition-colors ${
                      location.pathname.startsWith('/finnewz')
                        ? 'text-blue-600' : isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
                    }`}
                  >
                    Fin'Newz
                  </Link>
                </>
              )}
              {!isHomePage && !isAuthenticated && (
                <button
                  onClick={scrollToTop}
                  className={`flex items-center space-x-1 transition-colors ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-blue-600' 
                      : 'text-white hover:text-blue-200'
                  }`}
                >
                  <Home size={18} />
                  <span>Home</span>
                </button>
              )}
            </>
          )}

          {/* User Menu or Auth Button */}
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
                <span className={`font-medium ${isScrolled ? 'text-gray-700' : 'text-white'}`}>
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
          ) : (
            <Button 
              onClick={handleAuthClick}
              variant="primary" 
              className={`flex items-center space-x-2 transition-all ${
                isScrolled 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg' 
                  :  'bg-gradient-to-r from-amber-400 to-amber-500 text-white shadow-lg hover:shadow-xl'
              }`}
            >
              <Rocket size={18} />
              <span className="font-semibold">Get Started</span>
            </Button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className={`md:hidden p-2 transition-colors ${
            isScrolled 
              ? 'text-gray-700 hover:text-blue-600' 
              : 'text-white hover:text-blue-200'
          }`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm shadow-lg animate-fade-in-down">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
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
                  className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/funding/vc"
                  className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Funding
                </Link>
                <Link
                  to="/investor-match"
                  className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Investor Match
                </Link>
                <Link
                  to="/finnewz"
                  className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Fin'Newz
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700 font-medium py-2 transition-colors text-left flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                {isHomePage && (
                  <>
                    <button
                      onClick={() => scrollToSection('how-it-works')}
                      className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors text-left"
                    >
                      How It Works
                    </button>
                    <button
                      onClick={() => scrollToSection('pricing')}
                      className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors text-left"
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
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors"
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