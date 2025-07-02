import React, { useState, useEffect } from 'react';
import IncubatorCard from '../components/incubators/IncubatorCard';
import IncubatorFilters from '../components/incubators/IncubatorFilters';
import type { IncubatorFilters as FilterType } from '../components/incubators/IncubatorFilters';

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

const Incubators: React.FC = () => {
  const [incubators, setIncubators] = useState<Incubator[]>([]);
  const [filteredIncubators, setFilteredIncubators] = useState<Incubator[]>([]);
  const [filters, setFilters] = useState<FilterType>({
    affiliation: [],
    applicationStatus: [],
    sectors: [],
    state: [],
    search: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchIncubators();
  }, []);

  const fetchIncubators = async () => {
    try {
      setLoading(true);
      // Use demo data since we removed backend
      const demoIncubators: Incubator[] = [
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
      setIncubators(demoIncubators);
      setFilteredIncubators(demoIncubators);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filters: FilterType) => {
    setFilters(filters);
    let filtered = [...incubators];

    // Apply affiliation filter
    if (filters.affiliation.length > 0) {
      filtered = filtered.filter(incubator => 
        filters.affiliation.includes(incubator.affiliation)
      );
    }

    // Apply tags filter
    if ((filters as any).tags && (filters as any).tags.length > 0) {
      filtered = filtered.filter(incubator => 
        (filters as any).tags.some((tag: string) => incubator.tags.includes(tag))
      );
    }

    // Apply application status filter
    if (filters.applicationStatus.length > 0) {
      filtered = filtered.filter(incubator => 
        filters.applicationStatus.includes(incubator.application_status)
      );
    }

    // Apply funded percent filter
    if ((filters as any).fundedPercent && (filters as any).fundedPercent.length > 0) {
      filtered = filtered.filter(incubator => {
        const percent = incubator.funded_startup_percent || 0;
        return (filters as any).fundedPercent.some((range: string) => {
          const [min, max] = range.split('-').map(Number);
          return percent >= min && percent <= max;
        });
      });
    }

    setFilteredIncubators(filtered);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Incubators</h1>
      
      <IncubatorFilters onFilterChange={handleFilterChange} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIncubators.map((incubator) => (
          <IncubatorCard key={incubator.id} incubator={incubator} />
        ))}
      </div>

      {filteredIncubators.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No incubators found matching your filters.</p>
        </div>
      )}
    </div>
  );
};

export default Incubators; 