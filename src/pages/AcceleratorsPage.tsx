import React, { useState, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import AcceleratorFilters from '../components/accelerators/AcceleratorFilters';
import type { AcceleratorFilters as FilterType } from '../components/accelerators/AcceleratorFilters';
import AcceleratorCard from '../components/accelerators/AcceleratorCard';
import Button from '../components/ui/Button';
import { emptyFilters } from '../constants/accelerators';
import { acceleratorService, type Accelerator } from '../services/acceleratorService';
import { Helmet } from 'react-helmet-async';

// Demo data fallback
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
  const [accelerators, setAccelerators] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const pageSize = 12;

  useEffect(() => {
    loadAccelerators();
  }, [filters, page]);

  const loadAccelerators = async () => {
    try {
      setLoading(true);
      
      // Convert filters to API format
      const apiFilters = {
        page,
        limit: pageSize,
        search: filters.search[0] || undefined,
        affiliation: filters.affiliation.length > 0 ? filters.affiliation.join(',') : undefined,
        applicationStatus: filters.applicationStatus.length > 0 ? filters.applicationStatus.join(',') : undefined,
        tags: filters.tags.length > 0 ? filters.tags.join(',') : undefined,
        equityRange: filters.equityRange.length > 0 ? filters.equityRange.join(',') : undefined,
        fundingRange: filters.fundingRange.length > 0 ? filters.fundingRange.join(',') : undefined,
        durationRange: filters.durationRange.length > 0 ? filters.durationRange.join(',') : undefined,
      };

      const response = await acceleratorService.getAccelerators(apiFilters);
      
      // Convert backend format to frontend format
      const formattedAccelerators = response.accelerators.map((acc: Accelerator) => ({
        id: acc._id,
        name: acc.name,
        logo_url: acc.logo_url,
        state: acc.state,
        affiliation: acc.affiliation,
        tags: acc.tags,
        application_status: acc.application_status,
        batch_frequency: acc.batch_frequency,
        equity_taken: acc.equity_taken,
        funding_offered: acc.funding_offered,
        duration_weeks: acc.duration_weeks,
        created_at: acc.createdAt,
        updated_at: acc.updatedAt,
        total_startups_supported: acc.total_startups_supported,
        funded_startup_percent: acc.funded_startup_percent,
        company_email: acc.company_email,
        company_linkedin: acc.company_linkedin,
        poc_email: acc.poc_email,
        poc_linkedin: acc.poc_linkedin,
        description: acc.description,
        website_url: acc.website_url,
        sectors_supported: acc.sectors_supported,
      }));

      if (page === 1) {
        setAccelerators(formattedAccelerators);
      } else {
        setAccelerators(prev => [...prev, ...formattedAccelerators]);
      }
      
      setTotalCount(response.total);
      setHasMore(response.currentPage < response.totalPages);
    } catch (error) {
      console.error('Failed to load accelerators:', error);
      // Fallback to demo data
      setAccelerators(DEMO_ACCELERATORS);
      setTotalCount(DEMO_ACCELERATORS.length);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters: FilterType) => {
    setFilters(newFilters);
    setPage(1); // Reset to first page when filters change
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

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
        <title>Startup Accelerators in India | Aarly</title>
        <meta name="description" content="Discover the best startup accelerators in India. Compare programs, funding, and support to find the right accelerator for your startup." />
        <link rel="canonical" href="https://aarly.co/accelerators" />
        <meta property="og:title" content="Startup Accelerators in India | Aarly" />
        <meta property="og:description" content="Discover the best startup accelerators in India. Compare programs, funding, and support to find the right accelerator for your startup." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aarly.co/accelerators" />
        <meta property="og:image" content="/Screenshot 2025-06-29 140116.png" />
      </Helmet>
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
      {accelerators.length === 0 && !loading && (
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
