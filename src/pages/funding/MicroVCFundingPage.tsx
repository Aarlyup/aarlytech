import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Building2, MapPin, Users, ExternalLink } from 'lucide-react';
import { useFunding } from '../../contexts/FundingContext';
import { formatCurrencyWithSymbol } from '../../lib/utils';
import LoadingGrid from '../../components/ui/LoadingGrid';
import EmptyState from '../../components/ui/EmptyState';
import { FundingMobileNav } from '../../components/layout/FundingSidebar';

interface MicroVC {
  _id: string;
  name: string;
  websiteUrl: string;
  location: string;
  fundSize: number;
  fundSizeCurrency: string;
  checkSize: number;
  checkSizeCurrency: string;
  stage: string[];
  sector: string[];
  contact: string;
  portfolioHighlights: string;
}

const MicroVCFundingPage: React.FC = () => {
  const { getFundingByCategory, loading, error } = useFunding();
  const [microvcs, setMicroVCs] = useState<MicroVC[]>([]);
  const [filteredMicroVCs, setFilteredMicroVCs] = useState<MicroVC[]>([]);
  const [search, setSearch] = useState('');
  const [selectedMicroVC, setSelectedMicroVC] = useState<MicroVC | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    // Get Micro VCs from centralized funding context
    const microvcData = getFundingByCategory('micro-vcs') as MicroVC[];
    setMicroVCs(microvcData);
    setFilteredMicroVCs(microvcData);
  }, [getFundingByCategory]);

  useEffect(() => {
    // Filter Micro VCs based on search
    if (!search.trim()) {
      setFilteredMicroVCs(microvcs);
    } else {
      const filtered = microvcs.filter(microvc =>
        microvc.name?.toLowerCase().includes(search.toLowerCase()) ||
        microvc.location?.toLowerCase().includes(search.toLowerCase()) ||
        microvc.sector?.some(sector => sector.toLowerCase().includes(search.toLowerCase()))
      );
      setFilteredMicroVCs(filtered);
    }
  }, [search, microvcs]);
  const handleMicroVCClick = (microvc: MicroVC) => {
    setSelectedMicroVC(microvc);
  };

  const closeModal = () => {
    setSelectedMicroVC(null);
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
        <title>Micro VCs for Startups | Aarly</title>
        <meta name="description" content="Connect with micro venture capital firms for early-stage startup funding. Find the right micro VC for your business." />
      </Helmet>
      
  <FundingMobileNav />
  <div className="mb-8 px-2 md:px-6 pt-4 md:pt-8 mt-6 md:mt-10">
        <h1 className="text-2xl font-bold mb-2 text-white">Micro VCs</h1>
        <p className="text-gray-400">
          Connect with micro venture capital firms specializing in early-stage investments.
        </p>
      </div>

      {/* Search */}
      <div className="px-2 md:px-6 mb-6">
        <div className="bg-gray-800 rounded-2xl shadow-sm border border-gray-700 p-4">
          <input
            type="text"
            placeholder="Search Micro VCs by name, location, or sector..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Micro VC Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2 md:px-6 pb-8">
        {(loading && filteredMicroVCs.length === 0) ? (
          <LoadingGrid count={6} columns={2} />
        ) : (
          filteredMicroVCs.map((microvc) => (
            <div
              key={microvc._id}
              onClick={() => handleMicroVCClick(microvc)}
              className="relative bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-md border border-gray-700 p-6 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-500/20 to-blue-500/20 flex items-center justify-center border border-green-500/30">
                  <Building2 className="w-8 h-8 text-green-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-white truncate group-hover:text-blue-400 transition-colors">
                    {microvc.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                    <MapPin className="w-4 h-4" />
                    <span>{microvc.location}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-gray-300">{formatCurrencyWithSymbol(microvc.fundSize, microvc.fundSizeCurrency || 'INR')} Fund</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-purple-400" />
                  <span className="font-medium text-gray-300">{formatCurrencyWithSymbol(microvc.checkSize, microvc.checkSizeCurrency || 'INR')} Check</span>
                </div>
              </div>

              {microvc.stage && microvc.stage.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {microvc.stage.slice(0, 3).map((stage) => (
                    <span
                      key={stage}
                      className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30"
                    >
                      {stage}
                    </span>
                  ))}
                  {microvc.stage.length > 3 && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-600 text-gray-300">
                      +{microvc.stage.length - 3} more
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

      {filteredMicroVCs.length === 0 && !loading && (
        <EmptyState
          title={search ? "No Micro VCs found" : "No Micro VCs available"}
          message={search ? "Try adjusting your search criteria" : "Micro VC data will appear here once loaded"}
          error={error}
        />
      )}

      {/* Micro VC Detail Modal */}
      {selectedMicroVC && (
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
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500/20 to-blue-500/20 flex items-center justify-center border border-green-500/30">
                  <Building2 className="w-6 h-6 text-green-400" />
                </div>
                <div className="text-center">
                  <h1 className="text-lg font-bold text-white leading-tight">{selectedMicroVC.name}</h1>
                  <div className="flex items-center gap-2 text-gray-400 text-sm justify-center">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedMicroVC.location}</span>
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
                  <div className="rounded-2xl bg-gray-800 border border-gray-700 p-5 border-l-4 border-blue-500/80">
                    <div className="text-sm font-semibold text-gray-300 uppercase">Fund Size</div>
                    <div className="mt-2 text-2xl font-extrabold text-white">{formatCurrencyWithSymbol(Number(selectedMicroVC.fundSize), selectedMicroVC.fundSizeCurrency || 'INR')}</div>
                    <div className="mt-1 text-xs text-gray-400">Total committed fund</div>
                  </div>

                  <div className="rounded-2xl bg-gray-800 border border-gray-700 p-5 border-l-4 border-green-500/80">
                    <div className="text-sm font-semibold text-gray-300 uppercase">Check Size</div>
                    <div className="mt-2 text-2xl font-extrabold text-white">{formatCurrencyWithSymbol(Number(selectedMicroVC.checkSize), selectedMicroVC.checkSizeCurrency || 'INR')}</div>
                    <div className="mt-1 text-xs text-gray-400">Typical investment ticket</div>
                  </div>

                  {selectedMicroVC.stage && selectedMicroVC.stage.length > 0 && (
                    <div className="rounded-2xl bg-gray-800 border border-gray-700 p-4">
                      <div className="text-sm font-semibold text-white mb-3">Stage Focus</div>
                      <div className="flex flex-wrap gap-2">
                        {selectedMicroVC.stage.map(s => (
                          <span key={s} className="px-3 py-1 rounded-full text-sm bg-blue-600/30 text-blue-100 border border-blue-600/40">{s}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedMicroVC.sector && selectedMicroVC.sector.length > 0 && (
                    <div className="rounded-2xl bg-gray-800 border border-gray-700 p-4">
                      <div className="text-sm font-semibold text-white mb-3">Sector Focus</div>
                      <div className="flex flex-wrap gap-2">
                        {selectedMicroVC.sector.map(sec => (
                          <span key={sec} className="px-3 py-1 rounded-full text-sm bg-purple-600/30 text-purple-100 border border-purple-600/40">{sec}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </aside>

                {/* Right: long-form content */}
                <main className="lg:col-span-2 space-y-6">
                  {selectedMicroVC.portfolioHighlights && (
                    <section className="rounded-2xl bg-gray-800 border border-gray-700 p-6">
                      <h3 className="text-xl font-semibold text-white mb-3">Portfolio Highlights</h3>
                      <p className="text-gray-100 leading-relaxed text-base">{selectedMicroVC.portfolioHighlights}</p>
                    </section>
                  )}

                  <div className="flex justify-end">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      {selectedMicroVC.websiteUrl && (
                        <a href={selectedMicroVC.websiteUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full hover:from-blue-700 hover:to-blue-800 inline-flex items-center gap-2">
                          <ExternalLink className="w-4 h-4" />
                          <span>Visit Website</span>
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

export default MicroVCFundingPage;