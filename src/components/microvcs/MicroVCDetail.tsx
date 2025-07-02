import React, { useState } from 'react';
import { MapPin, Building2, Globe, Mail, ExternalLink, Linkedin, ArrowLeft, ChevronDown, ChevronUp, Users, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

interface MicroVCDetailProps {
  microvc: MicroVC;
}

const TAG_COLORS: Record<string, string> = {
  'Pre-seed': 'bg-green-100 text-green-700 border-green-200',
  'Seed': 'bg-blue-100 text-blue-700 border-blue-200',
  'Early Stage': 'bg-purple-100 text-purple-700 border-purple-200',
};

const MicroVCDetail: React.FC<MicroVCDetailProps> = ({ microvc }) => {
  const navigate = useNavigate();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showFullSectors, setShowFullSectors] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate('/funding/microvc')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Micro-VCs</span>
      </button>

      {/* Header Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden">
            {microvc.logo_url ? (
              <img 
                src={microvc.logo_url} 
                alt={`${microvc.name} logo`}
                className="w-full h-full object-contain"
              />
            ) : (
              <Building2 className="w-12 h-12 text-gray-400" />
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{microvc.name}</h1>
            <div className="flex items-center text-gray-600 gap-2 mb-3">
              <MapPin className="w-5 h-5" />
              <span>{microvc.location}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(microvc.focus) && microvc.focus.map((focus: string) => (
                <span
                  key={focus}
                  className={`px-3 py-1 rounded-full text-sm font-medium border ${TAG_COLORS[focus] || 'bg-gray-100 text-gray-700 border-gray-200'}`}
                >
                  {focus}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="md:col-span-2 space-y-6">
          {/* Description */}
          {microvc.description && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">About</h2>
              <div className="relative">
                <div className={`text-gray-600 whitespace-pre-line transition-all duration-300 ${!showFullDescription ? 'line-clamp-4' : ''}`}>
                  {microvc.description}
                </div>
                {microvc.description.length > 200 && (
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="mt-2 text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                  >
                    {showFullDescription ? (
                      <>
                        Show Less
                        <ChevronUp className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        Show More
                        <ChevronDown className="w-4 h-4" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Sectors */}
          {Array.isArray(microvc.sectors) && microvc.sectors.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Sectors</h2>
              <div className="flex flex-wrap gap-2">
                {microvc.sectors.map((sector) => (
                  <span
                    key={sector}
                    className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 border border-gray-200"
                  >
                    {sector}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Application Method */}
          {microvc.application_method && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">How to Apply</h2>
              <div className="text-gray-600 whitespace-pre-line">
                {microvc.application_method}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Portfolio Stats */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Portfolio</h2>
            <div className="space-y-4">
              <div className="bg-blue-50/50 rounded-xl p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-1">Total Companies</h3>
                <p className="text-blue-700 font-semibold">{microvc.total_companies}</p>
              </div>
              <div className="bg-green-50/50 rounded-xl p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-1">Total Funding</h3>
                <p className="text-green-700 font-semibold">
                  ₹{(Number(microvc.total_funding || 0) / 10000000).toFixed(1)} Cr
                </p>
              </div>
              <div className="bg-purple-50/50 rounded-xl p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-1">Cheque Size</h3>
                <p className="text-purple-700 font-semibold">{microvc.cheque_size}</p>
              </div>
              {microvc.portfolio_url && (
                <a
                  href={microvc.portfolio_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700"
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  View Portfolio
                </a>
              )}
            </div>
          </div>

          {/* Contact Block */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact</h2>
            <div className="space-y-4">
              {microvc.website_url && (
                <a
                  href={microvc.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                >
                  <Globe className="w-5 h-5" />
                  <span>Visit Website</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {microvc.email && (
                <a
                  href={`mailto:${microvc.email}`}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                >
                  <Mail className="w-5 h-5" />
                  <span>{microvc.email}</span>
                </a>
              )}
              {microvc.linkedin_url && (
                <a
                  href={microvc.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                >
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MicroVCDetail; 