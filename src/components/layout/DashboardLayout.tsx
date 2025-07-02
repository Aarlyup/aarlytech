import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../ui/Logo';
import Footer from './Footer';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');
  const isFunding = location.pathname.startsWith('/funding');
  const isFinNewz = location.pathname.startsWith('/finnewz');
  const isInvestorMatch = location.pathname.startsWith('/investor-match');
  const isContent = location.pathname.startsWith('/content');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="w-full bg-white/95 shadow-sm py-4 px-8 flex items-center justify-between fixed top-0 left-0 z-40" style={{backdropFilter: 'blur(8px)'}}>
        <div className="flex items-center gap-2">
          <Logo />
        </div>
        <nav className="flex items-center gap-8">
          <Link to="/dashboard" className={`text-base font-semibold transition-colors ${isDashboard ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>Dashboard</Link>
          <Link to="/funding/vc" className={`text-base font-semibold transition-colors ${isFunding ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>Funding</Link>
          <Link to="/investor-match" className={`text-base font-semibold transition-colors ${isInvestorMatch ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>Investor Match</Link>
          <Link to="/finnewz" className={`text-base font-semibold transition-colors ${isFinNewz ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>Fin'Newz</Link>
          <Link to="/content" className={`text-base font-semibold transition-colors ${isContent ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>Content</Link>
        </nav>
      </header>
      <main className="flex-1 pt-24 px-4">
        {children}
      </main>
      <div className="mt-24" />
      <Footer />
    </div>
  );
};

export default DashboardLayout; 