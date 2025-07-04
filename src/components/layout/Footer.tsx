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

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 mt-16 border-t border-gray-800 relative overflow-hidden">
      {/* SVG dot pattern background */}
      <svg className="absolute left-0 top-0 w-full h-full opacity-10 pointer-events-none" width="100%" height="100%"><defs><pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="2" fill="#fff" /></pattern></defs><rect width="100%" height="100%" fill="url(#dots)" /></svg>
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-400 opacity-70 rounded-t-xl" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-wrap flex-row gap-3 items-start md:grid md:grid-cols-4 md:gap-8">
          {/* Logo and description */}
          <div className="flex flex-col items-start justify-center md:justify-start h-full min-w-[120px]">
            <Logo className="mb-1" imgClassName="h-7 w-auto" textClassName="text-lg md:text-2xl font-bold text-white pb-1 ml-2" />
            <p className="text-gray-400 text-xs md:text-base max-w-xs mb-2">
              Find the right investors, grants, and startup support — instantly.
            </p>
            <div className="flex flex-row space-x-3 mt-1">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-transform hover:scale-110 hover:drop-shadow-md" aria-label="Twitter"><Twitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-transform hover:scale-110 hover:drop-shadow-md" aria-label="Linkedin"><Linkedin size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-transform hover:scale-110 hover:drop-shadow-md" aria-label="Instagram"><Instagram size={20} /></a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-sm md:text-lg font-semibold mb-2">Platform</h3>
            <ul className="space-y-1 text-xs md:text-base">
              <li><Link to="/funding/vc" className="text-gray-400 hover:text-white transition-colors">Venture Capital</Link></li>
              <li><Link to="/funding/microvc" className="text-gray-400 hover:text-white transition-colors">Micro VCs</Link></li>
              <li><Link to="/funding/angel" className="text-gray-400 hover:text-white transition-colors">Angel Investors</Link></li>
              <li><Link to="/funding/accelerator" className="text-gray-400 hover:text-white transition-colors">Accelerators</Link></li>
              <li><Link to="/funding/incubator" className="text-gray-400 hover:text-white transition-colors">Incubators</Link></li>
              <li><Link to="/funding/grants" className="text-gray-400 hover:text-white transition-colors">Government Grants</Link></li>
            </ul>
          </div>
          {/* Company Links */}
          <div>
            <h3 className="text-sm md:text-lg font-semibold mb-2">Company</h3>
            <ul className="space-y-1 text-xs md:text-base">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>
          {/* Legal Links */}
          <div>
            <h3 className="text-sm md:text-lg font-semibold mb-2">Legal</h3>
            <ul className="space-y-1 text-xs md:text-base">
              <li><Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/disclaimer" className="text-gray-400 hover:text-white transition-colors">Disclaimer</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="w-full md:w-auto">
            <h3 className="text-sm md:text-lg font-semibold mb-2">Stay Updated</h3>
            <p className="text-gray-400 text-xs md:text-base mb-2">Get the latest funding opportunities and startup news.</p>
            <form className="flex w-full max-w-xs mb-2" onSubmit={handleNewsletter}>
              <input
                type="email"
                placeholder="Your email"
                className="bg-gray-800 text-white px-3 py-1 rounded-l-lg focus:outline-none flex-grow text-xs md:text-base border border-gray-700 focus:ring-2 focus:ring-blue-500 transition-all"
                required
                disabled={newsletterSuccess}
              />
              <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-r-lg transition-colors flex items-center justify-center focus:ring-2 focus:ring-blue-400 focus:ring-offset-2" disabled={newsletterSuccess}>
                <ArrowRight size={14} />
              </button>
            </form>
            {newsletterSuccess && <div className="text-green-400 mt-1 text-xs animate-fade-in">Thank you for subscribing!</div>}
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-800 text-center text-gray-500 text-xs md:text-sm flex flex-col md:flex-row items-center justify-between gap-1">
          <span>&copy; {new Date().getFullYear()} Aarly. All rights reserved. | Made with <Heart size={10} className="inline text-pink-400 animate-pulse" /> by Aarly Team</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
