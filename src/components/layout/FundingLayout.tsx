import React from 'react';
import FundingSidebar from './FundingSidebar';
import { Link, useLocation, Outlet } from 'react-router-dom';
import Logo from '../ui/Logo';

const FundingLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');
  const isFunding = location.pathname.startsWith('/funding');
  const isFinNewz = location.pathname.startsWith('/finnewz');
  const isContent = location.pathname.startsWith('/content');
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative overflow-hidden">
      {/* Animated gradient top border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-400 opacity-70 rounded-t-xl animate-pulse z-30" />
      {/* Animated moving light spot */}
      <div className="absolute -top-32 left-1/2 w-96 h-96 bg-gradient-to-br from-blue-200 via-indigo-100 to-transparent rounded-full blur-3xl opacity-30 animate-move-light z-0" />
      <header className="w-full bg-white/95 shadow-lg py-4 px-4 md:px-8 flex items-center justify-between fixed top-0 left-0 z-40" style={{backdropFilter: 'blur(8px)'}}>
        <div className="flex items-center gap-2">
          <Logo />
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/dashboard" className={`text-base font-semibold transition-colors ${isDashboard ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>Dashboard</Link>
          <Link to="/funding/vc" className={`text-base font-semibold transition-colors ${isFunding ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>Funding</Link>
          <Link to="/investor-match" className={`text-base font-semibold transition-colors ${location.pathname.startsWith('/investor-match') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>Investor Match</Link>
          <Link to="/finnewz" className={`text-base font-semibold transition-colors ${isFinNewz ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>Fin'Newz</Link>
          <Link to="/content" className={`text-base font-semibold transition-colors ${isContent ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>Content</Link>
        </nav>
        {/* Mobile menu button */}
        <button className="md:hidden p-2 text-gray-700" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
      </header>
      <div className="flex flex-1 pt-24 w-full">
        {/* Sidebar: hidden on mobile, visible on md+ */}
        <div className="hidden md:block">
          <FundingSidebar />
        </div>
        {/* Mobile sidebar drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-black/40 md:hidden" onClick={() => setMobileMenuOpen(false)}>
            <div className="absolute top-0 left-0 w-64 h-full bg-white shadow-lg">
              <FundingSidebar />
            </div>
          </div>
        )}
        <main className="flex-1 p-2 md:p-8 animate-fade-in z-10 w-full md:ml-64">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default FundingLayout; 