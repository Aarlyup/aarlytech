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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 items-start">
          {/* Logo and description */}
          <div className="flex flex-col items-start justify-center md:justify-start h-full">
            <Logo className="mb-3" imgClassName="h-14 w-auto" textClassName="text-4xl font-bold text-white pb-1 ml-3" />
            <p className="text-gray-400 text-base max-w-xs mb-6">
              Find the right investors, grants, and startup support — instantly.
            </p>
            <div className="flex space-x-3 mt-2">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-transform hover:scale-110 hover:drop-shadow-md" aria-label="Twitter"><Twitter size={22} /></a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-transform hover:scale-110 hover:drop-shadow-md" aria-label="LinkedIn"><Linkedin size={22} /></a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-transform hover:scale-110 hover:drop-shadow-md" aria-label="Instagram"><Instagram size={22} /></a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-transform hover:scale-110 hover:drop-shadow-md" aria-label="WhatsApp"><Phone size={22} /></a>
              <a href="#" className="text-gray-400 hover:text-gray-200 transition-transform hover:scale-110 hover:drop-shadow-md" aria-label="GitHub"><Github size={22} /></a>
              <a href="mailto:hello@aarly.co" className="text-gray-400 hover:text-amber-400 transition-transform hover:scale-110 hover:drop-shadow-md" aria-label="Email"><Mail size={22} /></a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              <li><Link to="/funding/vc" className="text-gray-400 hover:text-white transition-colors text-base">Venture Capital</Link></li>
              <li><Link to="/funding/microvc" className="text-gray-400 hover:text-white transition-colors text-base">Micro VCs</Link></li>
              <li><Link to="/funding/angel" className="text-gray-400 hover:text-white transition-colors text-base">Angel Investors</Link></li>
              <li><Link to="/funding/accelerator" className="text-gray-400 hover:text-white transition-colors text-base">Accelerators</Link></li>
              <li><Link to="/funding/incubator" className="text-gray-400 hover:text-white transition-colors text-base">Incubators</Link></li>
              <li><Link to="/funding/grants" className="text-gray-400 hover:text-white transition-colors text-base">Government Grants</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors text-base">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-base">Contact</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-base">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-base flex items-center gap-1"><Slack size={16} /> Join our Slack</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-base flex items-center gap-1"><MessageCircle size={16} /> Ask a Mentor</a></li>
            </ul>
          </div>

          {/* Newsletter & Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-400 text-base mb-4">Get the latest funding opportunities and startup news.</p>
            <form className="flex w-full max-w-xs mb-6" onSubmit={handleNewsletter}>
              <input
                type="email"
                placeholder="Your email"
                className="bg-gray-800 text-white px-4 py-2 rounded-l-lg focus:outline-none flex-grow text-base border border-gray-700 focus:ring-2 focus:ring-blue-500 transition-all"
                required
                disabled={newsletterSuccess}
              />
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-lg transition-colors flex items-center justify-center focus:ring-2 focus:ring-blue-400 focus:ring-offset-2" disabled={newsletterSuccess}>
                <ArrowRight size={18} />
              </button>
            </form>
            {newsletterSuccess && <div className="text-green-400 mt-2 text-sm animate-fade-in">Thank you for subscribing!</div>}
            
            {/* Legal Links */}
            <div className="mt-6 space-y-2">
              <h4 className="text-sm font-semibold text-gray-300">Legal</h4>
              <ul className="space-y-1">
                <li><Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</Link></li>
                <li><Link to="/terms-of-service" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</Link></li>
                <li><Link to="/disclaimer" className="text-gray-400 hover:text-white transition-colors text-sm">Disclaimer</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <span>&copy; {new Date().getFullYear()} Aarly. All rights reserved.</span>
          <span className="flex items-center gap-1">Made with <Heart size={14} className="inline text-pink-400 animate-pulse" /> by Aarly Team</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
