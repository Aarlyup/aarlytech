import React, { useState, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import AcceleratorFilters from '../components/accelerators/AcceleratorFilters';
import type { AcceleratorFilters as FilterType } from '../components/accelerators/AcceleratorFilters';
import AcceleratorCard from '../components/accelerators/AcceleratorCard';
import Button from '../components/ui/Button';
import { emptyFilters } from '../constants/accelerators';

interface Accelerator {
  id: string;
  name: string;
  logo_url: string;
  state: string;
  affiliation: string;
  tags: string[];
  application_status: string;
  batch_frequency: string;
  equity_taken: string;
  funding_offered: string;
  duration_weeks: number;
  created_at: string;
  updated_at: string;
  total_startups_supported: number;
  funded_startup_percent: number;
  company_email: string;
  company_linkedin: string;
  poc_email: string;
  poc_linkedin: string;
  description: string;
  website_url: string;
  sectors_supported: string[];
}

const DEMO_ACCELERATORS = [
  {
    id: '1',
    name: 'Demo Accelerator One',
    logo_url: '',
    state: 'Delhi',
    affiliation: 'Private',
    tags: ['Grant', 'Equity'],
    application_status: 'Open',
    batch_frequency: 'Quarterly',
    equity_taken: '5%',
    funding_offered: '₹20L',
    duration_weeks: 12,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z',
    total_startups_supported: 8,
    funded_startup_percent: 50,
    company_email: '',
    company_linkedin: '',
    poc_email: '',
    poc_linkedin: '',
    description: 'A demo accelerator for early-stage startups.',
    website_url: '',
    sectors_supported: ['AI', 'Seed'],
  },
  {
    id: '2',
    name: 'Demo Accelerator Two',
    logo_url: '',
    state: 'Pune',
    affiliation: 'Govt-backed',
    tags: ['Infra'],
    application_status: 'Closed',
    batch_frequency: 'Yearly',
    equity_taken: '2%',
    funding_offered: '₹10L',
    duration_weeks: 8,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z',
    total_startups_supported: 3,
    funded_startup_percent: 33,
    company_email: '',
    company_linkedin: '',
    poc_email: '',
    poc_linkedin: '',
    description: 'A demo accelerator for pre-seed startups.',
    website_url: '',
    sectors_supported: ['Healthtech', 'Pre-seed'],
  },
];

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-red-600">Error: {error.message}</div>
    </div>
  );
}

const AcceleratorsPage: React.FC = () => {
  const [filters, setFilters] = useState<FilterType>(emptyFilters);
  const [accelerators, setAccelerators] = useState<Accelerator[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 12;

  useEffect(() => {
    const loadAccelerators = async () => {
      try {
        setLoading(true);
        // Use demo data since we removed backend
        setAccelerators(DEMO_ACCELERATORS);
        setTotalCount(DEMO_ACCELERATORS.length);
      } catch (error) {
        setAccelerators(DEMO_ACCELERATORS);
        setTotalCount(DEMO_ACCELERATORS.length);
      } finally {
        setLoading(false);
      }
    };
    loadAccelerators();
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
      <div className="mb-8 px-2 md:px-6 pt-4 md:pt-8">
        <h1 className="text-2xl font-bold mb-2">Accelerators</h1>
        <p className="text-gray-600">
          Discover accelerators that can help your startup grow and succeed.
        </p>
      </div>
      <div className="px-2 md:px-6 mb-6">
        <AcceleratorFilters onFilterChange={handleFilterChange} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2 md:px-6 pb-8">
        {accelerators.map((accelerator) => (
          <AcceleratorCard key={accelerator.id} accelerator={accelerator} />
        ))}
      </div>
      {accelerators.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No accelerators found matching your criteria.</p>
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
            Showing {accelerators.length} of {totalCount} accelerators
          </p>
        </div>
      )}
    </>
  );
};

export default AcceleratorsPage; 