import React from 'react';
import MicroVCsPage from '../MicroVCsPage';
import Header from '../../components/layout/Header';

const AngelFundingPage: React.FC = () => (
  <>
    <Header />
    <div className="max-w-5xl mx-auto px-2 sm:px-4 md:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">Angel Investors</h1>
      <MicroVCsPage />
    </div>
  </>
);

export default AngelFundingPage; 