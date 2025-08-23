import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const HomeLayout: React.FC = () => (
  <div className="min-h-screen bg-gray-900 flex flex-col">
    <Header />
    <main className="flex-1 pt-16 md:pt-20">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default HomeLayout; 