import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Rocket, Home } from 'lucide-react';
import { useUi } from '../../contexts/UiContext';
import Button from '../ui/Button';
import Logo from '../ui/Logo';

const Header: React.FC = () => {
  const location = useLocation();
  const { mobileMenuOpen, setMobileMenuOpen } = useUi();
  const isHomePage = location.pathname === '/';
  const [isScrolled, setIsScrolled] = useState(false);

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
              <Link to="/auth" className="relative z-50">
                <Button 
                  variant="primary" 
                  className={`flex items-center space-x-2 transition-all ${
                    isScrolled 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg' 
                      :  'bg-gradient-to-r from-amber-400 to-amber-500 text-white shadow-lg hover:shadow-xl'
                  }`}
                >
                  <Rocket size={18} />
                  <span className="font-semibold">Explore Now</span>
                </Button>
              </Link>
            </>
          ) : (
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
                to="/funding"
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
              <Link to="/vc" className="relative z-50">
                <Button 
                  variant="primary" 
                  className={`flex items-center space-x-2 transition-all ${
                    isScrolled 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg' 
                      :  'bg-gradient-to-r from-amber-400 to-amber-500 text-white shadow-lg hover:shadow-xl'
                  }`}
                >
                  <Rocket size={18} />
                  <span className="font-semibold">Explore Now</span>
                </Button>
              </Link>
              {!isHomePage && (
                <button
                  onClick={scrollToTop}
                  className={`flex items-center space-x-1 transition-colors ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-blue-600' 
                      : 'text-white hover:text-blue-200'
                  }`}
                >
                  <Home size={18} />
                  <span>Exit</span>
                </button>
              )}
            </>
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
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/funding"
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
            <Link to="/vc" className="w-full">
              <Button 
                variant="primary" 
                className="w-full flex items-center justify-center space-x-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 shadow-lg hover:shadow-xl"
              >
                <Rocket size={18} />
                <span className="font-semibold">Explore Now</span>
              </Button>
            </Link>
            {!isHomePage && (
              <button
                onClick={scrollToTop}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors"
              >
                <Home size={18} />
                <span>Exit to Home</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;