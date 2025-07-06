import React from 'react';
import { MapPin, Building2, Globe, Mail, ExternalLink, Linkedin, ArrowLeft, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

interface AcceleratorDetailProps {
  accelerator: Accelerator;
}

const AFFILIATION_COLORS: Record<string, string> = {
  'Govt-backed': 'bg-blue-100 text-blue-700 border-blue-200',
  'University-backed': 'bg-purple-100 text-purple-700 border-purple-200',
  'Private': 'bg-gray-100 text-gray-700 border-gray-200',
};

const TAG_COLORS: Record<string, string> = {
  'Equity': 'bg-green-100 text-green-700 border-green-200',
  'Grant': 'bg-blue-100 text-blue-700 border-blue-200',
  'Global': 'bg-purple-100 text-purple-700 border-purple-200',
  'Remote': 'bg-orange-100 text-orange-700 border-orange-200',
  'Infra': 'bg-gray-100 text-gray-700 border-gray-200',
};

const STATUS_COLORS: Record<string, string> = {
  'Open': 'bg-green-100 text-green-700 border-green-200',
  'Closed': 'bg-gray-100 text-gray-700 border-gray-200',
};

const AcceleratorDetail: React.FC<AcceleratorDetailProps> = ({ accelerator }) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate('/funding/accelerator')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Accelerators</span>
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
            {accelerator.logo_url ? (
              <img 
                src={accelerator.logo_url} 
                alt={`${accelerator.name} logo`}
                className="w-full h-full object-contain"
              />
            ) : (
              <Building2 className="w-12 h-12 text-gray-400" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{accelerator.name}</h1>
                <div className="flex items-center text-gray-600 gap-2 mb-3">
                  <MapPin className="w-5 h-5" />
                  <span>{accelerator.state}</span>
                  <span className="mx-1">•</span>
                  <span>{accelerator.affiliation}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${AFFILIATION_COLORS[accelerator.affiliation]}`}>
                    {accelerator.affiliation}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${STATUS_COLORS[accelerator.application_status]}`}>
                    {accelerator.application_status}
                  </span>
                </div>
              </div>
              {accelerator.website_url && (
                <a
                  href={accelerator.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
                >
                  Apply Now
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="md:col-span-2 space-y-6">
          {/* About */}
          {accelerator.description && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">About</h2>
              <p className="text-gray-600 whitespace-pre-line">{accelerator.description}</p>
            </div>
          )}

          {/* Focus Areas */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Focus Areas</h2>
            <div className="space-y-4">
              {Array.isArray(accelerator.sectors_supported) && accelerator.sectors_supported.length > 0 ? (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Supported Areas</h3>
                  <div className="flex flex-wrap gap-2">
                    {accelerator.sectors_supported.map((sector) => (
                      <span
                        key={sector}
                        className="px-3 py-1 rounded-full text-sm font-medium border bg-gray-100 text-gray-700 border-gray-200"
                      >
                        {sector}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-gray-500 text-sm">No focus areas listed.</div>
              )}
            </div>
          </div>

          {/* How to Apply */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">How to Apply</h2>
            <div className="text-gray-600 whitespace-pre-line">
              {accelerator.website_url ? 'Apply via the website link below.' : 'Apply through the website.'}
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
                <h3 className="text-sm font-medium text-gray-700 mb-1">Funding Offered</h3>
                <p className="text-blue-700 font-semibold">{accelerator.funding_offered}</p>
              </div>
              <div className="bg-green-50/50 rounded-xl p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-1">Equity Taken</h3>
                <p className="text-green-700 font-semibold">{accelerator.equity_taken}</p>
              </div>
              <div className="bg-purple-50/50 rounded-xl p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-1">Batch Frequency</h3>
                <p className="text-purple-700 font-semibold">{accelerator.batch_frequency}</p>
              </div>
              <div className="bg-orange-50/50 rounded-xl p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-1">Duration</h3>
                <p className="text-orange-700 font-semibold">{accelerator.duration_weeks} weeks</p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact</h2>
            <div className="space-y-4">
              {accelerator.website_url && (
                <a
                  href={accelerator.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                >
                  <Globe className="w-5 h-5" />
                  <span>Visit Website</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {accelerator.company_email && (
                <a
                  href={`mailto:${accelerator.company_email}`}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                >
                  <Mail className="w-5 h-5" />
                  <span>{accelerator.company_email}</span>
                </a>
              )}
              {accelerator.company_linkedin && (
                <a
                  href={accelerator.company_linkedin}
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

export default AcceleratorDetail; 