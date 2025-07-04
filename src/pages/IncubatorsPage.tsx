import React, { useState, useEffect } from 'react';
import IncubatorFilters from '../components/incubators/IncubatorFilters';
import type { IncubatorFilters as FilterType } from '../components/incubators/IncubatorFilters';
import IncubatorCard from '../components/incubators/IncubatorCard';
import Button from '../components/ui/Button';
import { Helmet } from 'react-helmet-async';

interface Incubator {
  id: string;
  name: string;
  logo_url: string;
  state: string;
  affiliation: string;
  tags: string[];
  application_status: string;
  funding_offered: string;
  equity_taken: string;
  duration_weeks: number;
  created_at: string;
  updated_at: string;
  total_startups_supported: number;
  funded_startup_percent: number;
  startup_supporter_label: string;
  description: string;
  website_url: string;
  sectors_supported: string[];
  company_email: string;
  company_linkedin: string;
  person_of_contact: string;
  person_email: string;
  person_linkedin_url: string;
}

const DEMO_INCUBATORS = [
  {
    id: '1',
    name: 'Demo Incubator One',
    logo_url: '',
    state: 'Karnataka',
    affiliation: 'Govt-backed',
    tags: ['Infra', 'Grant'],
    application_status: 'Open',
    funding_offered: '₹10L',
    equity_taken: '0%',
    duration_weeks: 12,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z',
    total_startups_supported: 12,
    funded_startup_percent: 60,
    startup_supporter_label: 'Early-stage',
    description: 'A demo incubator for early-stage startups.',
    website_url: '',
    sectors_supported: ['Fintech', 'AI'],
    company_email: '',
    company_linkedin: '',
    person_of_contact: '',
    person_email: '',
    person_linkedin_url: '',
  },
  {
    id: '2',
    name: 'Demo Incubator Two',
    logo_url: '',
    state: 'Maharashtra',
    affiliation: 'Private',
    tags: ['Support'],
    application_status: 'Closed',
    funding_offered: '₹5L',
    equity_taken: '2%',
    duration_weeks: 8,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z',
    total_startups_supported: 7,
    funded_startup_percent: 40,
    startup_supporter_label: 'Growth-stage',
    description: 'A demo incubator for growth-stage startups.',
    website_url: '',
    sectors_supported: ['Healthtech'],
    company_email: '',
    company_linkedin: '',
    person_of_contact: '',
    person_email: '',
    person_linkedin_url: '',
  },
];

const IncubatorsPage: React.FC = () => {
  const [filters, setFilters] = useState<FilterType>({
    affiliation: [],
    applicationStatus: [],
    sectors: [],
    state: [],
    search: [],
  });
  const [incubators, setIncubators] = useState<Incubator[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 12;

  useEffect(() => {
    const loadIncubators = async () => {
      try {
        setLoading(true);
        // Use demo data since we removed backend
        setIncubators(DEMO_INCUBATORS);
        setTotalCount(DEMO_INCUBATORS.length);
      } catch (error) {
        setIncubators(DEMO_INCUBATORS);
        setTotalCount(DEMO_INCUBATORS.length);
      } finally {
        setLoading(false);
      }
    };

    loadIncubators();
  }, [filters, page]);

  const handleFilterChange = (newFilters: FilterType) => {
    setFilters(newFilters);
    setPage(1); // Reset to first page when filters change
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const totalPages = Math.ceil(totalCount / pageSize);
  const hasMore = page < totalPages;

  if (loading && page === 1) {
    return (
      <div>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-xl p-6 space-y-4">
                <div className="h-12 bg-gray-200 rounded-full w-12"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Startup Incubators in India | Aarly</title>
        <meta name="description" content="Explore top startup incubators in India. Find the best programs, funding, and support for your startup journey." />
        <link rel="canonical" href="https://aarly.co/incubators" />
        <meta property="og:title" content="Startup Incubators in India | Aarly" />
        <meta property="og:description" content="Explore top startup incubators in India. Find the best programs, funding, and support for your startup journey." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aarly.co/incubators" />
        <meta property="og:image" content="/Screenshot 2025-06-29 140116.png" />
      </Helmet>
      <div className="mb-8 px-2 md:px-6 pt-4 md:pt-8">
        <h1 className="text-2xl font-bold mb-2">Incubators</h1>
        <p className="text-gray-600">
          Discover incubators that can help your startup grow and succeed.
        </p>
      </div>

      {/* LinkedIn Follow Message */}
      <div className="px-2 md:px-6 mb-6">
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
          <p className="text-blue-700 text-sm">
            💡 Many of these incubators frequently launch new schemes and funding programs. 
            We highly recommend following their LinkedIn handles to stay updated! 
            You'll find the LinkedIn link on each incubator's detail page.
          </p>
        </div>
      </div>

      <div className="px-2 md:px-6 mb-6">
        <IncubatorFilters onFilterChange={handleFilterChange} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2 md:px-6 pb-8">
        {incubators.map((incubator) => (
          <IncubatorCard key={incubator.id} incubator={incubator} />
        ))}
      </div>
      {incubators.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No incubators found matching your criteria.</p>
        </div>
      )}
      
      {hasMore && (
        <div className="mt-8 text-center">
          <Button 
            variant="outline"
            onClick={handleLoadMore}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Load More'}
          </Button>
          <p className="mt-2 text-sm text-gray-500">
            Showing {incubators.length} of {totalCount} incubators & accelerators
          </p>
        </div>
      )}
    </>
  );
};

export default IncubatorsPage; 