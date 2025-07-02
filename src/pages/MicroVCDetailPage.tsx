import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MicroVCDetail from '../components/microvcs/MicroVCDetail';

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

const MicroVCDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [microvc, setMicroVC] = useState<MicroVC | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMicroVC();
  }, [id]);

  const fetchMicroVC = async () => {
    try {
      setLoading(true);
      // Use demo data since we removed backend
      const demoMicroVC: MicroVC = {
        id: id || '1',
        name: 'Demo MicroVC',
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
      };
      setMicroVC(demoMicroVC);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching Micro-VC details');
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

  if (error || !microvc) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">Error: {error || 'Micro-VC not found'}</div>
      </div>
    );
  }

  return <MicroVCDetail microvc={microvc} />;
};

export default MicroVCDetailPage; 