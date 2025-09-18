import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Building2, MapPin, DollarSign, Calendar, ExternalLink, Mail } from 'lucide-react';
import { useFunding } from '../../contexts/FundingContext';
import LoadingGrid from '../../components/ui/LoadingGrid';
import EmptyState from '../../components/ui/EmptyState';
import { FundingMobileNav } from '../../components/layout/FundingSidebar';

interface Incubator {
  _id: string;
  name: string;
  websiteUrl: string;
  location: string;
  fundingSupport: string;
  otherBenefits: string;
  eligibility: string;
  applicationProcess: string;
  contact: string;
  alumniStartups: string;
  icon?: {
    url: string;
    publicId: string;
  };
}

const IncubatorFundingPage: React.FC = () => {
  const { getFundingByCategory, loading, error } = useFunding();
  const [incubators, setIncubators] = useState<Incubator[]>([]);
  const [filteredIncubators, setFilteredIncubators] = useState<Incubator[]>([]);
  const [search, setSearch] = useState('');
  const [selectedIncubator, setSelectedIncubator] = useState<Incubator | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    // Get incubators from centralized funding context
    const incubatorData = getFundingByCategory('incubators') as Incubator[];
    setIncubators(incubatorData);
    setFilteredIncubators(incubatorData);
  }, [getFundingByCategory]);

  useEffect(() => {
    // Filter incubators based on search
    if (!search.trim()) {
      setFilteredIncubators(incubators);
    } else {
      const filtered = incubators.filter(incubator =>
        incubator.name?.toLowerCase().includes(search.toLowerCase()) ||
        incubator.location?.toLowerCase().includes(search.toLowerCase()) ||
        incubator.fundingSupport?.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredIncubators(filtered);
    }
  }, [search, incubators]);
  const handleIncubatorClick = (incubator: Incubator) => {
    setSelectedIncubator(incubator);
  };

  const closeModal = () => {
    setSelectedIncubator(null);
  };

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeModal();
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, []);

  return (
    <>
      <Helmet>
        <title>Startup Incubators | Aarly</title>
        <meta name="description" content="Discover startup incubators offering funding, mentorship, and resources for early-stage companies." />
      </Helmet>
      
  <FundingMobileNav />
  <div className="mb-8 px-2 md:px-6 pt-4 md:pt-8 mt-6 md:mt-10">
        <h1 className="text-2xl font-bold mb-2 text-white">Startup Incubators</h1>
        <p className="text-gray-400">
          Find incubators that provide funding, mentorship, and resources for your startup journey.
        </p>
      </div>

      {/* Search */}
      <div className="px-2 md:px-6 mb-6">
        <div className="bg-gray-800 rounded-2xl shadow-sm border border-gray-700 p-4">
          <input
            type="text"
            placeholder="Search incubators by name, location, or focus..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Incubator Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2 md:px-6 pb-8">
        {(loading && filteredIncubators.length === 0) ? (
          <LoadingGrid count={6} columns={2} />
        ) : (
          filteredIncubators.map((incubator) => (
            <div
              key={incubator._id}
              onClick={() => handleIncubatorClick(incubator)}
              className="relative bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-md border border-gray-700 p-6 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center border border-purple-500/30 overflow-hidden">
                  {incubator.icon?.url ? (
                    <img 
                      src={incubator.icon.url} 
                      alt={`${incubator.name} icon`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Building2 className="w-8 h-8 text-purple-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-white truncate group-hover:text-blue-400 transition-colors">
                    {incubator.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                    <MapPin className="w-4 h-4" />
                    <span>{incubator.location}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-gray-300">{incubator.fundingSupport}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-blue-400" />
                  <span className="font-medium text-gray-300">{incubator.applicationProcess}</span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end">
                <span className="text-blue-400 font-medium text-sm group-hover:text-blue-300">
                  View Details →
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {filteredIncubators.length === 0 && !loading && (
        <EmptyState
          title={search ? "No incubators found" : "No incubators available"}
          message={search ? "Try adjusting your search criteria" : "Incubator data will appear here once loaded"}
          error={error}
        />
      )}

      {/* Incubator Detail Modal */}
      {selectedIncubator && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in p-4 pt-20 md:pl-72" onClick={closeModal}>
          <div
            className="relative bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden animate-slide-up mx-auto"
            onClick={e => e.stopPropagation()}
            tabIndex={-1}
            ref={modalRef}
          >
            {/* Header */}
            <div className="sticky top-0 z-20 bg-gray-900 border-b border-gray-700 flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-purple-500/30 flex items-center justify-center overflow-hidden">
                  {selectedIncubator.icon?.url ? (
                    <img 
                      src={selectedIncubator.icon.url} 
                      alt={`${selectedIncubator.name} icon`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Building2 className="w-6 h-6 text-purple-400" />
                  )}
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">{selectedIncubator.name}</h1>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedIncubator.location}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="p-2 rounded-xl hover:bg-gray-800 transition-all duration-200 group"
                aria-label="Close"
              >
                <span className="text-2xl text-gray-400 group-hover:text-white">×</span>
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto p-6 max-h-[calc(85vh-120px)]">
              <div className="space-y-6">
                {/* Funding Support Card */}
                <div className="bg-gradient-to-br from-emerald-600/40 to-green-600/40 border border-emerald-400/60 rounded-xl p-6">
                  <div className="text-center">
                    <div className="text-sm font-semibold text-emerald-200 uppercase tracking-wide mb-2">Funding Support</div>
                    <div className="text-3xl font-bold text-emerald-50">{selectedIncubator.fundingSupport}</div>
                    <div className="text-sm text-emerald-300 mt-1">Monetary & non-monetary support</div>
                  </div>
                </div>

                {/* Other Benefits Card */}
                {selectedIncubator.otherBenefits && (
                  <div className="bg-gradient-to-br from-purple-600/40 to-indigo-600/40 border border-purple-400/60 rounded-xl p-6">
                    <div className="text-center">
                      <div className="text-sm font-semibold text-purple-200 uppercase tracking-wide mb-2">Other Benefits</div>
                      <div className="text-lg font-semibold text-purple-50">{selectedIncubator.otherBenefits}</div>
                      <div className="text-sm text-purple-300 mt-1">Additional support provided</div>
                    </div>
                  </div>
                )}

                {/* Location */}
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
                  <div className="text-sm font-semibold text-white mb-3">Location</div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    <span className="text-gray-300">{selectedIncubator.location}</span>
                  </div>
                </div>

                {/* Eligibility */}
                {selectedIncubator.eligibility && (
                  <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                    <h3 
                      className="text-lg font-semibold mb-3 text-white"
                      style={{ 
                        color: '#ffffff',
                        WebkitTextFillColor: '#ffffff',
                        textShadow: '0 0 1px rgba(255,255,255,0.5)'
                      }}
                    >
                      Eligibility
                    </h3>
                    <p 
                      className="leading-relaxed text-gray-300"
                      style={{ 
                        color: '#d1d5db',
                        WebkitTextFillColor: '#d1d5db'
                      }}
                    >
                      {selectedIncubator.eligibility}
                    </p>
                  </div>
                )}

                {/* Application Process */}
                {selectedIncubator.applicationProcess && (
                  <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                    <h3 
                      className="text-lg font-semibold mb-3 text-white"
                      style={{ 
                        color: '#ffffff',
                        WebkitTextFillColor: '#ffffff',
                        textShadow: '0 0 1px rgba(255,255,255,0.5)'
                      }}
                    >
                      Application Process
                    </h3>
                    <p 
                      className="leading-relaxed text-gray-300"
                      style={{ 
                        color: '#d1d5db',
                        WebkitTextFillColor: '#d1d5db'
                      }}
                    >
                      {selectedIncubator.applicationProcess}
                    </p>
                  </div>
                )}

                {/* Alumni Startups */}
                {selectedIncubator.alumniStartups && (
                  <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                    <h3 
                      className="text-lg font-semibold mb-3 text-white"
                      style={{ 
                        color: '#ffffff',
                        WebkitTextFillColor: '#ffffff',
                        textShadow: '0 0 1px rgba(255,255,255,0.5)'
                      }}
                    >
                      Alumni Startups
                    </h3>
                    <p 
                      className="leading-relaxed text-gray-300"
                      style={{ 
                        color: '#d1d5db',
                        WebkitTextFillColor: '#d1d5db'
                      }}
                    >
                      {selectedIncubator.alumniStartups}
                    </p>
                  </div>
                )}

                {/* Contact Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  {selectedIncubator.contact && (
                    <a 
                      href={`mailto:${selectedIncubator.contact}`} 
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium"
                    >
                      <Mail className="w-5 h-5" />
                      <span>Send Email</span>
                    </a>
                  )}
                  {selectedIncubator.websiteUrl && (
                    <a 
                      href={selectedIncubator.websiteUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium"
                    >
                      <ExternalLink className="w-5 h-5" />
                      <span>Visit Website</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default IncubatorFundingPage;