import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Mail, ArrowRight, Linkedin, Instagram, Github, MessageCircle, Slack, Heart, Rocket, Phone } from 'lucide-react';
import Logo from '../ui/Logo';

const Footer: React.FC = () => {
  const [newsletterSuccess, setNewsletterSuccess] = React.useState(false);
  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterSuccess(true);
    setTimeout(() => setNewsletterSuccess(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white pt-10 pb-6 md:pt-20 md:pb-10 lg:pt-6 lg:pb-2 mt-16 border-t border-gray-800 relative overflow-hidden">
      {/* SVG dot pattern background */}
      <svg className="absolute left-0 top-0 w-full h-full opacity-10 pointer-events-none" width="100%" height="100%"><defs><pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="2" fill="#fff" /></pattern></defs><rect width="100%" height="100%" fill="url(#dots)" /></svg>
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-400 opacity-70 rounded-t-xl" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-wrap flex-row gap-y-8 gap-x-4 md:gap-x-24 md:gap-y-12 items-start md:grid md:grid-cols-4 md:gap-x-24 md:gap-y-12">
          {/* Logo and description */}
          <div className="flex flex-col items-start justify-center md:justify-start h-full min-w-[120px] space-y-3 mb-6 md:mb-0">
            <Logo className="mb-2" imgClassName="h-10 md:h-12 w-auto" />
            <p className="text-gray-400 text-xs md:text-base max-w-xs mb-2">
              Find the right investors, grants, and startup support — instantly.
            </p>
            <div className="flex flex-row space-x-4 mt-2">
              <a href="#" onClick={scrollToTop} className="text-gray-400 hover:text-blue-400 transition-transform hover:scale-110 hover:drop-shadow-md" aria-label="Twitter"><Twitter size={20} /></a>
              <a href="#" onClick={scrollToTop} className="text-gray-400 hover:text-blue-500 transition-transform hover:scale-110 hover:drop-shadow-md" aria-label="Linkedin"><Linkedin size={20} /></a>
              <a href="#" onClick={scrollToTop} className="text-gray-400 hover:text-pink-400 transition-transform hover:scale-110 hover:drop-shadow-md" aria-label="Instagram"><Instagram size={20} /></a>
            </div>
          </div>

          {/* Platform Links */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-sm md:text-lg font-semibold mb-3">Platform</h3>
            <ul className="space-y-2 text-xs md:text-base">
              <li><Link to="/funding/vc" onClick={scrollToTop} className="text-gray-400 hover:text-white transition-colors">Venture Capital</Link></li>
              <li><Link to="/funding/microvc" onClick={scrollToTop} className="text-gray-400 hover:text-white transition-colors">Micro VCs</Link></li>
              <li><Link to="/funding/angel" onClick={scrollToTop} className="text-gray-400 hover:text-white transition-colors">Angel Investors</Link></li>
              <li><Link to="/funding/accelerator" onClick={scrollToTop} className="text-gray-400 hover:text-white transition-colors">Accelerators</Link></li>
              <li><Link to="/funding/incubator" onClick={scrollToTop} className="text-gray-400 hover:text-white transition-colors">Incubators</Link></li>
              <li><Link to="/funding/grants" onClick={scrollToTop} className="text-gray-400 hover:text-white transition-colors">Government Grants</Link></li>
            </ul>
          </div>
          {/* Company Links */}
          <div className="mb-8 md:mb-0 ml-0 sm:ml-8">
            <h3 className="text-sm md:text-lg font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-xs md:text-base">
              <li><Link to="/about" onClick={scrollToTop} className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" onClick={scrollToTop} className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              <li><a href="#" onClick={scrollToTop} className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>
          {/* Legal Links */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-sm md:text-lg font-semibold mb-3">Legal</h3>
            <ul className="space-y-2 text-xs md:text-base">
              <li><Link to="/privacy-policy" onClick={scrollToTop} className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" onClick={scrollToTop} className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/disclaimer" onClick={scrollToTop} className="text-gray-400 hover:text-white transition-colors">Disclaimer</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-4 pt-2 border-t border-gray-800 text-center text-gray-500 text-xs md:text-sm flex flex-col md:flex-row items-center justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} Aarly. All rights reserved. | Made with <Heart size={10} className="inline text-pink-400 animate-pulse" /> by Aarly Team</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
