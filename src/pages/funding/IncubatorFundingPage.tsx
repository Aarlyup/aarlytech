import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Building2, MapPin, DollarSign, Calendar, ExternalLink, Mail, Star } from 'lucide-react';
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
              {/* Star Icon */}
              <button
                className="absolute top-4 left-4 bg-gray-700 rounded-full p-1 shadow hover:bg-yellow-500/20 transition-colors border border-gray-600"
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle save functionality
                }}
              >
                <Star className="w-5 h-5 text-yellow-400" fill="none" />
              </button>

              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center border border-purple-500/30">
                  <Building2 className="w-8 h-8 text-purple-400" />
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
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 backdrop-blur-sm animate-fade-in pt-20 px-4 md:pl-72 md:pr-8" onClick={closeModal}>
          <div
            className="relative bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl w-full animate-slide-up flex flex-col max-w-full md:max-w-4xl lg:max-w-5xl"
            style={{ maxHeight: 'calc(100vh - 6rem)' }}
            onClick={e => e.stopPropagation()}
            tabIndex={-1}
            ref={modalRef}
          >
            {/* Sticky Header */}
            <div className="sticky top-0 z-20 bg-gray-800 rounded-t-2xl flex items-center justify-between px-6 py-4 border-b border-gray-700 shadow-sm">
              <button
                onClick={closeModal}
                className="flex items-center gap-2 text-gray-400 hover:text-blue-400 font-medium text-base px-2 py-1 rounded-lg transition-colors focus:outline-none"
                aria-label="Back"
              >
                <span className="text-lg">←</span>
                Back
              </button>
              <div className="flex items-center gap-3 mx-auto">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center border border-purple-500/30">
                  <Building2 className="w-6 h-6 text-purple-400" />
                </div>
                <div className="text-center">
                  <h1 className="text-lg font-bold text-white leading-tight">{selectedIncubator.name}</h1>
                  <div className="flex items-center gap-2 text-gray-400 text-sm justify-center">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedIncubator.location}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-red-400 text-2xl px-2 py-1 rounded-lg transition-colors focus:outline-none"
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="overflow-y-auto p-8" style={{ maxHeight: 'calc(100vh - 12rem)' }}>
              <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: metrics & tags */}
                <aside className="lg:col-span-1 space-y-6">
                  <div className="rounded-2xl bg-gray-800 border border-gray-700 p-5 border-l-4 border-green-500/80">
                    <div className="text-sm font-semibold text-gray-300 uppercase">Funding Support</div>
                    <div className="mt-2 text-2xl font-extrabold text-white">{selectedIncubator.fundingSupport}</div>
                    <div className="mt-1 text-xs text-gray-400">Monetary & non-monetary support</div>
                  </div>

                  <div className="rounded-2xl bg-gray-800 border border-gray-700 p-5 border-l-4 border-blue-500/80">
                    <div className="text-sm font-semibold text-gray-300 uppercase">Application Process</div>
                    <div className="mt-2 text-2xl font-extrabold text-white">{selectedIncubator.applicationProcess}</div>
                    <div className="mt-1 text-xs text-gray-400">How to apply and timelines</div>
                  </div>

                  <div className="rounded-2xl bg-gray-800 border border-gray-700 p-4">
                    <div className="text-sm font-semibold text-white mb-3">Location</div>
                    <div className="text-sm text-gray-300">{selectedIncubator.location}</div>
                  </div>

                  {selectedIncubator.otherBenefits && (
                    <div className="rounded-2xl bg-gray-800 border border-gray-700 p-4">
                      <div className="text-sm font-semibold text-white mb-3">Other Benefits</div>
                      <div className="text-sm text-gray-300">{selectedIncubator.otherBenefits}</div>
                    </div>
                  )}
                </aside>

                {/* Right: long-form content */}
                <main className="lg:col-span-2 space-y-6">
                  {selectedIncubator.eligibility && (
                    <section className="rounded-2xl bg-gray-800 border border-gray-700 p-6">
                      <h3 className="text-xl font-semibold text-white mb-3">Eligibility</h3>
                      <p className="text-gray-100 leading-relaxed text-base">{selectedIncubator.eligibility}</p>
                    </section>
                  )}

                  {selectedIncubator.applicationProcess && (
                    <section className="rounded-2xl bg-gray-800 border border-gray-700 p-6">
                      <h3 className="text-xl font-semibold text-white mb-3">Application Process</h3>
                      <p className="text-gray-100 leading-relaxed text-base">{selectedIncubator.applicationProcess}</p>
                    </section>
                  )}

                  {selectedIncubator.alumniStartups && (
                    <section className="rounded-2xl bg-gray-800 border border-gray-700 p-6">
                      <h3 className="text-xl font-semibold text-white mb-3">Alumni Startups</h3>
                      <p className="text-gray-100 leading-relaxed text-base">{selectedIncubator.alumniStartups}</p>
                    </section>
                  )}

                  <div className="flex justify-end">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      {selectedIncubator.websiteUrl && (
                        <a href={selectedIncubator.websiteUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full hover:from-blue-700 hover:to-blue-800 inline-flex items-center gap-2">
                          <ExternalLink className="w-4 h-4" />
                          <span>Visit Website</span>
                        </a>
                      )}
                      {selectedIncubator.contact && (
                        <a href={`mailto:${selectedIncubator.contact}`} className="px-4 py-2 bg-gray-800 text-white rounded-full border border-gray-700 hover:bg-gray-800/90 inline-flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          <span>Contact</span>
                        </a>
                      )}
                    </div>
                  </div>
                </main>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default IncubatorFundingPage;