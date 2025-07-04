import React from 'react';
import AcceleratorsPage from '../AcceleratorsPage';
import Header from '../../components/layout/Header';

const AcceleratorFundingPage: React.FC = () => (
  <>
    <Header />
    <div className="max-w-5xl mx-auto px-2 sm:px-4 md:px-8 py-8">
      <AcceleratorsPage />
    </div>
  </>
);

export default AcceleratorFundingPage; 