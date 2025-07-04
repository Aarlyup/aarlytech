import React from 'react';
import IncubatorsPage from '../IncubatorsPage';
import IncubatorCard from '../../components/incubators/IncubatorCard';
import Header from '../../components/layout/Header';

const DEMO_GRANTS = [
  {
    id: '1',
    name: 'Startup India Seed Fund',
    logo_url: '',
    state: 'Pan-India',
    affiliation: 'Govt-backed',
    tags: ['Grant'],
    application_status: 'Open',
    funding_offered: '₹10L',
    equity_taken: '0%',
    duration_weeks: 12,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z',
    total_startups_supported: 100,
    funded_startup_percent: 80,
    startup_supporter_label: 'Seed-stage',
    description: 'A government grant for seed-stage startups.',
    website_url: '',
    sectors_supported: ['All'],
    company_email: '',
    company_linkedin: '',
    person_of_contact: '',
    person_email: '',
    person_linkedin_url: '',
  },
  {
    id: '2',
    name: 'MSME Innovation Scheme',
    logo_url: '',
    state: 'Pan-India',
    affiliation: 'Govt-backed',
    tags: ['Grant', 'Support'],
    application_status: 'Open',
    funding_offered: '₹5L',
    equity_taken: '0%',
    duration_weeks: 8,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z',
    total_startups_supported: 50,
    funded_startup_percent: 60,
    startup_supporter_label: 'Growth-stage',
    description: 'A government grant for growth-stage startups.',
    website_url: '',
    sectors_supported: ['All'],
    company_email: '',
    company_linkedin: '',
    person_of_contact: '',
    person_email: '',
    person_linkedin_url: '',
  },
];

const GrantsFundingPage: React.FC = () => (
  <>
    <Header />
    <div className="max-w-5xl mx-auto px-2 sm:px-4 md:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">Govt Grants & Schemes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {DEMO_GRANTS.map((grant) => (
          <IncubatorCard key={grant.id} incubator={grant} />
        ))}
      </div>
    </div>
  </>
);

export default GrantsFundingPage; 