import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AcceleratorDetail from '../components/accelerators/AcceleratorDetail';
import { acceleratorService, type Accelerator } from '../services/acceleratorService';

const AcceleratorDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [accelerator, setAccelerator] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAccelerator();
  }, [id]);

  const fetchAccelerator = async () => {
    if (!id) return;

    try {
      setLoading(true);
      const response = await acceleratorService.getAccelerator(id);
      
      // Convert backend format to frontend format
      const formattedAccelerator = {
        id: response._id,
        name: response.name,
        logo_url: response.logo_url,
        state: response.state,
        affiliation: response.affiliation,
        tags: response.tags,
        application_status: response.application_status,
        batch_frequency: response.batch_frequency,
        equity_taken: response.equity_taken,
        funding_offered: response.funding_offered,
        duration_weeks: response.duration_weeks,
        created_at: response.createdAt,
        updated_at: response.updatedAt,
        total_startups_supported: response.total_startups_supported,
        funded_startup_percent: response.funded_startup_percent,
        company_email: response.company_email,
        company_linkedin: response.company_linkedin,
        poc_email: response.poc_email,
        poc_linkedin: response.poc_linkedin,
        description: response.description,
        website_url: response.website_url,
        sectors_supported: response.sectors_supported,
      };

      setAccelerator(formattedAccelerator);
    } catch (err) {
      console.error('Failed to fetch accelerator:', err);
      // Fallback to demo data
      const demoAccelerator = {
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
