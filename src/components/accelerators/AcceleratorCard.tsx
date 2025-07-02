import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Calendar, IndianRupee, Percent } from 'lucide-react';

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

interface AcceleratorCardProps {
  accelerator: Accelerator;
}

const TAG_COLORS: Record<string, string> = {
  Equity: 'bg-green-100 text-green-700 border-green-200',
  Grant: 'bg-blue-100 text-blue-700 border-blue-200',
  Global: 'bg-purple-100 text-purple-700 border-purple-200',
  Remote: 'bg-orange-100 text-orange-700 border-orange-200',
  Infra: 'bg-gray-100 text-gray-700 border-gray-200',
};

const AcceleratorCard: React.FC<AcceleratorCardProps> = ({ accelerator }) => {
  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden">
          {accelerator.logo_url ? (
            <img
              src={accelerator.logo_url}
              alt={`${accelerator.name} logo`}
              className="w-full h-full object-contain transition-transform group-hover:scale-110 group-hover:animate-pulse"
            />
          ) : (
            <div className="text-2xl font-bold text-gray-400 transition-transform group-hover:scale-110 group-hover:animate-pulse">
              {accelerator.name.charAt(0)}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {accelerator.name}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
            <MapPin className="w-4 h-4 transition-transform group-hover:scale-110 group-hover:animate-pulse" />
            <span>{accelerator.state}</span>
            <span className="mx-1">•</span>
            <span>{accelerator.affiliation}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {Array.isArray(accelerator.tags) ? accelerator.tags.map((tag) => (
          <span
            key={tag}
            className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-transform group-hover:scale-110 group-hover:animate-pulse ${
              TAG_COLORS[tag] || 'bg-gray-100 text-gray-700 border-gray-200'
            }`}
          >
            {tag}
          </span>
        )) : null}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2 text-sm">
          <IndianRupee className="w-4 h-4 text-green-600 transition-transform group-hover:scale-110 group-hover:animate-pulse" />
          <span className="font-medium text-gray-900">{accelerator.funding_offered}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Percent className="w-4 h-4 text-blue-600 transition-transform group-hover:scale-110 group-hover:animate-pulse" />
          <span className="font-medium text-gray-900">{accelerator.equity_taken}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4 text-purple-600 transition-transform group-hover:scale-110 group-hover:animate-pulse" />
          <span className="font-medium text-gray-900">{accelerator.batch_frequency}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-orange-600 transition-transform group-hover:scale-110 group-hover:animate-pulse" />
          <span className="font-medium text-gray-900">{accelerator.duration_weeks} weeks</span>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            accelerator.application_status === 'Open'
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          {accelerator.application_status}
        </span>
        <Link
          to={`/accelerators/${accelerator.id}`}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default AcceleratorCard; 