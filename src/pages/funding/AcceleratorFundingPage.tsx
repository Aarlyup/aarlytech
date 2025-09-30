import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Rocket, MapPin, ExternalLink } from 'lucide-react';
import { useFunding } from '../../contexts/FundingContext';
import LoadingGrid from '../../components/ui/LoadingGrid';
import EmptyState from '../../components/ui/EmptyState';
import { FundingMobileNav } from '../../components/layout/FundingSidebar';

interface Accelerator {
  _id: string;
  name: string;
  websiteUrl: string;
  hq: string;
  batchFrequency: string;
  stage: string[];
  fundingOffered: string;
  programDuration: string;
  servicesProvided: string;
  sectors: string[];
  applicationLink: string;
  pastCohorts: string;
  fundSizeDescription?: string;
  icon?: {
    url: string;
    publicId: string;
  };
}

const AcceleratorFundingPage: React.FC = () => {
  const { getFundingByCategory, loading, error } = useFunding();
  const [accelerators, setAccelerators] = useState<Accelerator[]>([]);
  const [filteredAccelerators, setFilteredAccelerators] = useState<Accelerator[]>([]);
  const [search, setSearch] = useState('');
  const [selectedAccelerator, setSelectedAccelerator] = useState<Accelerator | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    // Get accelerators from centralized funding context
    const acceleratorData = getFundingByCategory('accelerators') as Accelerator[];
    setAccelerators(acceleratorData);
    setFilteredAccelerators(acceleratorData);
  }, [getFundingByCategory]);

  useEffect(() => {
    // Filter accelerators based on search
    if (!search.trim()) {
      setFilteredAccelerators(accelerators);
    } else {
      const filtered = accelerators.filter(accelerator =>
        accelerator.name?.toLowerCase().includes(search.toLowerCase()) ||
        accelerator.hq?.toLowerCase().includes(search.toLowerCase()) ||
        accelerator.sectors?.some(sector => sector.toLowerCase().includes(search.toLowerCase()))
      );
      setFilteredAccelerators(filtered);
    }
  }, [search, accelerators]);
  const handleAcceleratorClick = (accelerator: Accelerator) => {
    setSelectedAccelerator(accelerator);
  };

  const closeModal = () => {
    setSelectedAccelerator(null);
  };

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, []);

  return (
    <>
      <Helmet>
        <title>Startup Accelerators | Aarly</title>
        <meta name="description" content="Find startup accelerators offering intensive programs, funding, and mentorship to scale your business." />
      </Helmet>
      
  <FundingMobileNav />
  <div className="mb-8 px-2 md:px-6 pt-4 md:pt-8 mt-6 md:mt-10">
        <h1 className="text-2xl font-bold mb-2 text-white">Startup Accelerators</h1>
        <p className="text-gray-400">
          Discover accelerators that offer intensive programs to help scale your startup.
        </p>
      </div>

      {/* Search */}
      <div className="px-2 md:px-6 mb-6">
        <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-sm p-4">
          <input
            type="text"
            placeholder="Search accelerators by name, location, or sector..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Accelerator Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2 md:px-6 pb-8">
        {(loading && filteredAccelerators.length === 0) ? (
          <LoadingGrid count={6} columns={2} />
        ) : (
          filteredAccelerators.map((accelerator) => (
            <div
              key={accelerator._id}
              onClick={() => handleAcceleratorClick(accelerator)}
              className="relative bg-gray-800 border border-gray-700 backdrop-blur-xl rounded-2xl shadow-md p-6 hover:shadow-xl hover:border-gray-600 transition-all hover:-translate-y-1 cursor-pointer group"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl bg-gray-700 border border-gray-600 flex items-center justify-center overflow-hidden">
                  {accelerator.icon?.url ? (
                    <img 
                      src={accelerator.icon.url} 
                      alt={`${accelerator.name} icon`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Rocket className="w-8 h-8 text-orange-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-white truncate group-hover:text-blue-400 transition-colors">
                    {accelerator.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                    <MapPin className="w-4 h-4" />
                    <span>{accelerator.hq}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-gray-300">{accelerator.fundingOffered}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-gray-300">{accelerator.programDuration}</span>
                </div>
              </div>

              {accelerator.stage && accelerator.stage.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {accelerator.stage.slice(0, 3).map((stage) => (
                    <span
                      key={stage}
                      className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30"
                    >
                      {stage}
                    </span>
                  ))}
                  {accelerator.stage.length > 3 && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-600 text-gray-300">
                      +{accelerator.stage.length - 3} more
                    </span>
                  )}
                </div>
              )}

              <div className="mt-6 flex items-center justify-end">
                <span className="text-blue-400 font-medium text-sm group-hover:text-blue-300">
                  View Details →
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {filteredAccelerators.length === 0 && !loading && (
        <EmptyState
          title={search ? "No accelerators found" : "No accelerators available"}
          message={search ? "Try adjusting your search criteria" : "Accelerator data will appear here once loaded"}
          error={error}
        />
      )}

      {/* Accelerator Detail Modal (outside grid) */}
      {selectedAccelerator && (
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
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 flex items-center justify-center overflow-hidden">
                  {selectedAccelerator.icon?.url ? (
                    <img 
                      src={selectedAccelerator.icon.url} 
                      alt={`${selectedAccelerator.name} icon`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Rocket className="w-6 h-6 text-orange-400" />
                  )}
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">{selectedAccelerator.name}</h1>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedAccelerator.hq}</span>
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
            <div className="overflow-y-auto p-4 max-h-[calc(85vh-120px)]">
              <div className="space-y-4">
                {/* Funding Offered + Program Duration (one-line on md+) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-emerald-600/40 to-green-600/40 border border-emerald-400/60 rounded-xl p-3">
                    <div className="text-center">
                      <div className="text-sm font-semibold text-emerald-200 uppercase tracking-wide mb-2">Funding Offered</div>
                      <div className="text-xl font-bold text-emerald-50">{selectedAccelerator.fundingOffered}</div>
                      {selectedAccelerator.fundSizeDescription && (
                        <div className="text-sm text-emerald-200 mt-2 px-3">
                          {selectedAccelerator.fundSizeDescription}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-600/40 to-red-600/40 border border-orange-400/60 rounded-xl p-3">
                    <div className="text-center">
                      <div className="text-sm font-semibold text-orange-200 uppercase tracking-wide mb-2">Program Duration</div>
                      <div className="text-xl font-bold text-orange-50">{selectedAccelerator.programDuration}</div>
                    </div>
                  </div>
                </div>

                {/* Additional Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
                    <div className="text-sm font-semibold text-white mb-3">Batch Frequency</div>
                    <div className="text-gray-300">{selectedAccelerator.batchFrequency}</div>
                  </div>

                  {selectedAccelerator.stage && selectedAccelerator.stage.length > 0 && (
                    <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
                      <div className="text-sm font-semibold text-white mb-3">Stage Focus</div>
                      <div className="flex flex-wrap gap-2">
                        {selectedAccelerator.stage.map(s => (
                          <span key={s} className="px-3 py-1 rounded-full text-sm bg-blue-600/30 text-blue-300 border border-blue-500/40">{s}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Sectors */}
                {selectedAccelerator.sectors && selectedAccelerator.sectors.length > 0 && (
                  <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
                    <div className="text-sm font-semibold text-white mb-3">Sectors</div>
                    <div className="flex flex-wrap gap-2">
                      {selectedAccelerator.sectors.map(sec => (
                        <span key={sec} className="px-3 py-1 rounded-full text-sm bg-orange-500/30 text-orange-300 border border-orange-500/40">{sec}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Services Provided */}
                {selectedAccelerator.servicesProvided && (
                  <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                    <h3 
                      className="text-lg font-semibold mb-3 text-white"
                      style={{ 
                        color: '#ffffff',
                        WebkitTextFillColor: '#ffffff',
                        textShadow: '0 0 1px rgba(255,255,255,0.5)'
                      }}
                    >
                      Services Provided
                    </h3>
                    <p 
                      className="leading-relaxed text-gray-300 whitespace-pre-wrap break-words"
                      style={{ 
                        color: '#d1d5db',
                        WebkitTextFillColor: '#d1d5db'
                      }}
                    >
                      {selectedAccelerator.servicesProvided}
                    </p>
                  </div>
                )}

                {/* Past Cohorts */}
                {selectedAccelerator.pastCohorts && (
                  <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                    <h3 
                      className="text-lg font-semibold mb-3 text-white"
                      style={{ 
                        color: '#ffffff',
                        WebkitTextFillColor: '#ffffff',
                        textShadow: '0 0 1px rgba(255,255,255,0.5)'
                      }}
                    >
                      Past Cohorts
                    </h3>
                    <p 
                      className="leading-relaxed text-gray-300 whitespace-pre-wrap break-words"
                      style={{ 
                        color: '#d1d5db',
                        WebkitTextFillColor: '#d1d5db'
                      }}
                    >
                      {selectedAccelerator.pastCohorts}
                    </p>
                  </div>
                )}

                {/* Contact Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  {selectedAccelerator.applicationLink && (
                    <a 
                      href={selectedAccelerator.applicationLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-150 text-sm font-medium"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Apply Now</span>
                    </a>
                  )}
                  {selectedAccelerator.websiteUrl && (
                    <a 
                      href={selectedAccelerator.websiteUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-150 text-sm font-medium"
                    >
                      <ExternalLink className="w-4 h-4" />
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

export default AcceleratorFundingPage;