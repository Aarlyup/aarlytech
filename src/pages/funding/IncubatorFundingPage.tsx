import React from 'react';
import IncubatorsPage from '../IncubatorsPage';
import Header from '../../components/layout/Header';

const IncubatorFundingPage: React.FC = () => (
  <>
    <Header />
    <div className="max-w-5xl mx-auto px-2 sm:px-4 md:px-8 py-8">
      <IncubatorsPage />
    </div>
  </>
);

export default IncubatorFundingPage; 