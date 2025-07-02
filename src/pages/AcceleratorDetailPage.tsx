import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AcceleratorDetail from '../components/accelerators/AcceleratorDetail';

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

const AcceleratorDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [accelerator, setAccelerator] = useState<Accelerator | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAccelerator();
  }, [id]);

  const fetchAccelerator = async () => {
    try {
      setLoading(true);
      // Use demo data since we removed backend
      const demoAccelerator: Accelerator = {
        id: id || '1',
        name: 'Demo Accelerator',
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
      };
      setAccelerator(demoAccelerator);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching accelerator details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !accelerator) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">Error: {error || 'Accelerator not found'}</div>
      </div>
    );
  }

  return <AcceleratorDetail accelerator={accelerator} />;
};

export default AcceleratorDetailPage; 