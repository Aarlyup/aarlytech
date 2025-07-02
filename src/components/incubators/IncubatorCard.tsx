import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Building2, Clock, Calendar, IndianRupee, Percent } from 'lucide-react';

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

interface IncubatorCardProps {
  incubator: Incubator;
}

// Helper: get state from location string (assume state is the last word or comma-separated)
function getState(location: string) {
  if (!location) return '';
  const parts = location.split(',').map(s => s.trim());
  return parts[parts.length - 1];
}

const AFFILIATION_COLORS: Record<string, string> = {
  'Govt-backed': 'bg-blue-100 text-blue-700',
  'University-backed': 'bg-purple-100 text-purple-700',
  'Private': 'bg-gray-100 text-gray-700',
};

const TAG_COLORS: Record<string, string> = {
  'Infra': 'bg-green-100 text-green-700 border-green-200',
  'Grant': 'bg-yellow-100 text-yellow-700 border-yellow-200',
  'No Equity': 'bg-gray-200 text-gray-700 border-gray-200',
  'Equity': 'bg-blue-50 text-blue-700 border-blue-200',
};

const STATUS_COLORS: Record<string, string> = {
  'Open': 'bg-green-50 text-green-700 border border-green-100',
  'Closed': 'bg-gray-100 text-gray-500 border border-gray-200',
};

const IncubatorCard: React.FC<IncubatorCardProps> = ({ incubator }) => {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-md border border-blue-100 p-6 hover:shadow-xl transition-shadow transition-transform hover:-translate-y-1 animate-fade-in-up">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-110 group-hover:animate-pulse">
          {incubator.logo_url ? (
            <img
              src={incubator.logo_url}
              alt={`${incubator.name} logo`}
              className="w-full h-full object-contain"
            />
          ) : (
            <Building2 className="w-8 h-8 text-gray-400 transition-transform group-hover:scale-110 group-hover:animate-pulse" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {incubator.name}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
            <MapPin className="w-4 h-4" />
            <span>{incubator.state}</span>
            <span className="mx-1">•</span>
            <span>{incubator.affiliation}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {Array.isArray(incubator.tags) ? incubator.tags.map((tag) => (
          <span
            key={tag}
            className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
              TAG_COLORS[tag] || 'bg-gray-100 text-gray-700 border-gray-200'
            }`}
          >
            {tag}
          </span>
        )) : null}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4 text-orange-600" />
          <span className="font-medium text-gray-900">
            {incubator.total_startups_supported || 0} startups
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Percent className="w-4 h-4 text-blue-600" />
          <span className="font-medium text-gray-900">
            {incubator.funded_startup_percent || 0}% funded
          </span>
        </div>
      </div>

      {incubator.startup_supporter_label && (
        <div className="mt-4 text-sm text-gray-600">
          {incubator.startup_supporter_label}
        </div>
      )}

      <div className="mt-6 flex items-center justify-between">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            incubator.application_status === 'Open'
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          {incubator.application_status}
        </span>
        <Link
          to={`/incubators/${incubator.id}`}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default IncubatorCard; 
