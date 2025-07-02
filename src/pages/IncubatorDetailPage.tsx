import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import IncubatorDetail from '../components/incubators/IncubatorDetail';

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

const IncubatorDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [incubator, setIncubator] = useState<Incubator | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIncubator = async () => {
      if (!id) {
        navigate('/incubators');
        return;
      }

      try {
        setLoading(true);
        // Use demo data since we removed backend
        const demoIncubator: Incubator = {
          id: id,
          name: 'Demo Incubator',
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
        };

        setIncubator(demoIncubator);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchIncubator();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !incubator) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">Error: {error || 'Incubator not found'}</div>
      </div>
    );
  }

  return <IncubatorDetail incubator={incubator} />;
};

export default IncubatorDetailPage; 