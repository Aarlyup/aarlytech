import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Building2, IndianRupee, Percent, Users, DollarSign } from 'lucide-react';

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

interface MicroVCCardProps {
  microvc: MicroVC;
}

const TAG_COLORS: Record<string, string> = {
  'Pre-seed': 'bg-green-100 text-green-700 border-green-200',
  'Seed': 'bg-blue-100 text-blue-700 border-blue-200',
  'Early Stage': 'bg-purple-100 text-purple-700 border-purple-200',
};

const MicroVCCard: React.FC<MicroVCCardProps> = ({ microvc }) => {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-md border border-blue-100 p-6 hover:shadow-xl transition-shadow transition-transform hover:-translate-y-1 animate-fade-in-up" style={{boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.07)'}}>
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-110 group-hover:animate-pulse">
          {microvc.logo_url ? (
            <img
              src={microvc.logo_url}
              alt={`${microvc.name} logo`}
              className="w-full h-full object-contain"
            />
          ) : (
            <Building2 className="w-8 h-8 text-gray-400 transition-transform group-hover:scale-110 group-hover:animate-pulse" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {microvc.name}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
            <MapPin className="w-4 h-4" />
            <span>{microvc.location}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {Array.isArray(microvc.sectors) ? microvc.sectors.map((sector) => (
          <span
            key={sector}
            className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
              TAG_COLORS[sector] || 'bg-gray-100 text-gray-700 border-gray-200'
            }`}
          >
            {sector}
          </span>
        )) : null}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2 text-sm">
          <IndianRupee className="w-4 h-4 text-green-600" />
          <span className="font-medium text-gray-900">{microvc.cheque_size}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Percent className="w-4 h-4 text-blue-600" />
          <span className="font-medium text-gray-900">{microvc.focus}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Users className="w-4 h-4 text-purple-600" />
          <span className="font-medium text-gray-900">
            {microvc.total_companies || 0} companies
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <DollarSign className="w-4 h-4 text-orange-600" />
          <span className="font-medium text-gray-900">
            {microvc.total_funding || '₹0'}
          </span>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end">
        <Link
          to={`/microvcs/${microvc.id}`}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default MicroVCCard; 