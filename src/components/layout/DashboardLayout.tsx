import React from 'react';
import { useLocation } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {!isAdminPage && <Header />}
      <main className={`flex-1 px-4 ${isAdminPage ? 'py-6' : 'pt-24'}`}>
        {children}
      </main>
      {!isAdminPage && (
        <>
          <div className="mt-24" />
          <Footer />
        </>
      )}
    </div>
  );
};

export default DashboardLayout; 
