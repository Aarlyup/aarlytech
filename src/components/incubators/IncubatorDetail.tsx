import React, { useState } from 'react';
import { MapPin, Building2, Globe, Mail, ExternalLink, Linkedin, ArrowLeft, ChevronDown, ChevronUp, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

interface IncubatorDetailProps {
  incubator: Incubator;
}

const AFFILIATION_COLORS: Record<string, string> = {
  'Govt-backed': 'bg-blue-100 text-blue-700 border-blue-200',
  'University-backed': 'bg-purple-100 text-purple-700 border-purple-200',
  'Private': 'bg-gray-100 text-gray-700 border-gray-200',
};

const TAG_COLORS: Record<string, string> = {
  'Infra': 'bg-green-100 text-green-700 border-green-200',
  'Grant': 'bg-yellow-100 text-yellow-700 border-yellow-200',
  'No Equity': 'bg-gray-200 text-gray-700 border-gray-200',
  'Equity': 'bg-blue-50 text-blue-700 border-blue-200',
};

const STATUS_COLORS: Record<string, string> = {
  'Open': 'bg-green-100 text-green-700 border-green-200',
  'Closed': 'bg-gray-100 text-gray-700 border-gray-200',
};

const IncubatorDetail: React.FC<IncubatorDetailProps> = ({ incubator }) => {
  const navigate = useNavigate();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showFullSectors, setShowFullSectors] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate('/funding/incubator')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Incubators</span>
      </button>

      {/* Header Section */}
      <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-md border border-blue-100 p-6 animate-fade-in-up" style={{boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.07)'}}>
        {/* Star (Save) Icon */}
        <button
          className="absolute top-4 left-4 bg-white rounded-full p-1 shadow hover:bg-yellow-100 transition-colors"
          title="Save this card"
          type="button"
          tabIndex={0}
        >
          <Star className="w-5 h-5 text-yellow-400" fill="none" />
        </button>
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden">
            {incubator.logo_url ? (
              <img 
                src={incubator.logo_url} 
                alt={`${incubator.name} logo`}
                className="w-full h-full object-contain"
              />
            ) : (
              <Building2 className="w-12 h-12 text-gray-400" />
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{incubator.name}</h1>
            <div className="flex items-center text-gray-600 gap-2 mb-3">
              <MapPin className="w-5 h-5" />
              <span>{incubator.state}</span>
              <span className="mx-1">•</span>
              <span>{incubator.affiliation}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${AFFILIATION_COLORS[incubator.affiliation]}`}>
                {incubator.affiliation}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${STATUS_COLORS[incubator.application_status]}`}>
                {incubator.application_status}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="md:col-span-2 space-y-6">
          {/* About */}
          {incubator.description && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">About</h2>
              <div className="relative">
                <div className={`text-gray-600 whitespace-pre-line transition-all duration-300 ${!showFullDescription ? 'line-clamp-4' : ''}`}>
                  {incubator.description}
                </div>
                {incubator.description.length > 200 && (
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

          {/* Focus Areas */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Focus Areas</h2>
            <div className="space-y-4">
              {Array.isArray(incubator.tags) && incubator.tags.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {incubator.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-3 py-1 rounded-full text-sm font-medium border bg-gray-100 text-gray-700 border-gray-200`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {Array.isArray(incubator.sectors_supported) && incubator.sectors_supported.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Sectors Supported</h3>
                  <div className="relative">
                    <div className={`flex flex-wrap gap-2 transition-all duration-300 ${!showFullSectors ? 'max-h-24 overflow-hidden' : ''}`}>
                      {incubator.sectors_supported.map((sector) => (
                        <span
                          key={sector}
                          className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 border border-gray-200"
                        >
                          {sector}
                        </span>
                      ))}
                    </div>
                    {incubator.sectors_supported.length > 6 && (
                      <button
                        onClick={() => setShowFullSectors(!showFullSectors)}
                        className="mt-2 text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                      >
                        {showFullSectors ? (
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
            </div>
          </div>

          {/* How to Apply */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">How to Apply</h2>
            <div className="text-gray-600 whitespace-pre-line">
              {incubator.application_status ? incubator.application_status : 'Apply through the website.'}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Key Information */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Key Information</h2>
            <div className="space-y-4">
              <div className="bg-blue-50/50 rounded-xl p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-1">Total Startups Supported</h3>
                <p className="text-blue-700 font-semibold">{incubator.total_startups_supported} startups</p>
              </div>
              <div className="bg-green-50/50 rounded-xl p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-1">Portfolio Success</h3>
                <p className="text-green-700 font-semibold">{incubator.funded_startup_percent}% of portfolio funded</p>
              </div>
              <div className="bg-purple-50/50 rounded-xl p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-1">Funding Offered</h3>
                <p className="text-purple-700 font-semibold">{incubator.funding_offered}</p>
              </div>
              <div className="bg-orange-50/50 rounded-xl p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-1">Equity Taken</h3>
                <p className="text-orange-700 font-semibold">{incubator.equity_taken}</p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact</h2>
            <div className="space-y-4">
              {incubator.website_url && (
                <a
                  href={incubator.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                >
                  <Globe className="w-5 h-5" />
                  <span>Visit Website</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {incubator.company_email && (
                <a
                  href={`mailto:${incubator.company_email}`}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                >
                  <Mail className="w-5 h-5" />
                  <span>{incubator.company_email}</span>
                </a>
              )}
              {incubator.company_linkedin && (
                <a
                  href={incubator.company_linkedin}
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

export default IncubatorDetail; 