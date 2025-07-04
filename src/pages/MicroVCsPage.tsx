import React, { useState, useEffect } from 'react';
import MicroVCFilters from '../components/microvcs/MicroVCFilters';
import type { MicroVCFilters as FilterType } from '../components/microvcs/MicroVCFilters';
import MicroVCCard from '../components/microvcs/MicroVCCard';
import Button from '../components/ui/Button';
import { Helmet } from 'react-helmet-async';

interface MicroVC {
  id: string;
  name: string;
  logo_url: string;
  location: string;
  focus: string;
  cheque_size: string;
  sectors: string[];
  created_at: string;
  updated_at: string;
  total_companies: number;
  total_funding: string;
  description: string;
  application_method: string;
  portfolio_url: string;
  website_url: string;
  email: string;
  linkedin_url: string;
}

const DEMO_MICROVCS = [
  {
    id: '1',
    name: 'Demo MicroVC One',
    logo_url: '',
    location: 'Bangalore',
    focus: 'Seed',
    cheque_size: '₹50L',
    sectors: ['Fintech', 'Seed'],
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z',
    total_companies: 10,
    total_funding: '₹5Cr',
    description: 'A demo MicroVC for seed-stage startups.',
    application_method: '',
    portfolio_url: '',
    website_url: '',
    email: '',
    linkedin_url: '',
  },
  {
    id: '2',
    name: 'Demo MicroVC Two',
    logo_url: '',
    location: 'Mumbai',
    focus: 'Pre-seed',
    cheque_size: '₹30L',
    sectors: ['Healthtech', 'Pre-seed'],
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z',
    total_companies: 5,
    total_funding: '₹2Cr',
    description: 'A demo MicroVC for pre-seed startups.',
    application_method: '',
    portfolio_url: '',
    website_url: '',
    email: '',
    linkedin_url: '',
  },
];

const MicroVCsPage: React.FC = () => {
  const [filters, setFilters] = useState<FilterType>({
    focus: [],
    sectors: [],
    location: [],
    state: [],
    search: [],
  });
  const [microvcs, setMicroVCs] = useState<MicroVC[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 12;

  useEffect(() => {
    const loadMicroVCs = async () => {
      try {
        setLoading(true);
        // Use demo data since we removed backend
        setMicroVCs(DEMO_MICROVCS);
        setTotalCount(DEMO_MICROVCS.length);
      } catch (error) {
        setMicroVCs(DEMO_MICROVCS);
        setTotalCount(DEMO_MICROVCS.length);
      } finally {
        setLoading(false);
      }
    };

    loadMicroVCs();
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
        <title>Micro VCs for Startups in India | Aarly</title>
        <meta name="description" content="Browse top Micro VCs in India for early-stage startup funding. Compare micro venture capital options and find the right fit for your business." />
        <link rel="canonical" href="https://aarly.co/microvcs" />
        <meta property="og:title" content="Micro VCs for Startups in India | Aarly" />
        <meta property="og:description" content="Browse top Micro VCs in India for early-stage startup funding. Compare micro venture capital options and find the right fit for your business." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aarly.co/microvcs" />
        <meta property="og:image" content="/Screenshot 2025-06-29 140116.png" />
      </Helmet>
      <div className="mb-8 px-2 md:px-6 pt-4 md:pt-8">
        <h1 className="text-2xl font-bold mb-2">Micro-VCs</h1>
        <p className="text-gray-600">
          Discover Micro-VCs that can help your startup grow and succeed.
        </p>
      </div>
      <div className="px-2 md:px-6 mb-6">
        <MicroVCFilters onFilterChange={handleFilterChange} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2 md:px-6 pb-8">
        {microvcs.map((microvc) => (
          <MicroVCCard key={microvc.id} microvc={microvc} />
        ))}
      </div>
      {microvcs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No Micro-VCs found matching your criteria.</p>
        </div>
      )}
      {hasMore && (
        <div className="text-center py-8">
          <Button
            onClick={handleLoadMore}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Load More
          </Button>
        </div>
      )}
    </>
  );
};

export default MicroVCsPage; 