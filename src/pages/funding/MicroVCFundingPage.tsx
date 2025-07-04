import React from 'react';
import MicroVCsPage from '../MicroVCsPage';
import Header from '../../components/layout/Header';

const MicroVCFundingPage: React.FC = () => (
  <>
    <Header />
    <div className="max-w-5xl mx-auto px-2 sm:px-4 md:px-8 py-8">
      <MicroVCsPage />
    </div>
  </>
);

export default MicroVCFundingPage; 