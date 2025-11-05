import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Building2, MapPin, Users, ExternalLink, Mail } from 'lucide-react';
import { useFunding } from '../../contexts/FundingContext';
import { useAuth } from '../../contexts/AuthContext';
import { formatCurrencyWithSymbol, formatCurrencyRange } from '../../lib/utils';
import LoadingGrid from '../../components/ui/LoadingGrid';
import EmptyState from '../../components/ui/EmptyState';
import { FundingMobileNav } from '../../components/layout/FundingSidebar';

interface VentureCapital {
  _id: string;
  name: string;
  websiteUrl: string;
  headOffice: string;
  fundSize: number;
  fundSizeCurrency: string;
  fundSizeDescription: string;
  stageFocus: string[];
  sectorFocus: string[];
  avgTicketSize: {
    min: number;
    max: number;
  };
  avgTicketSizeCurrency: string;
  applicationProcess: string;
  contact: string;
  portfolioHighlights: string;
  investmentThesis: string;
  icon?: {
    url: string;
    publicId: string;
  };
  expired?: boolean;
}

const VCFundingPage: React.FC = () => {
  const { getFundingByCategory, loading, error } = useFunding();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [vcs, setVCs] = useState<VentureCapital[]>([]);
  const [filteredVCs, setFilteredVCs] = useState<VentureCapital[]>([]);
  const [search, setSearch] = useState('');
  const [selectedVC, setSelectedVC] = useState<VentureCapital | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const isMobileDevice = () => {
    if (typeof navigator === 'undefined') return false;
    // navigator.userAgentData.mobile exists in some browsers
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (navigator.userAgentData && typeof navigator.userAgentData.mobile === 'boolean') {
      // @ts-ignore
      return navigator.userAgentData.mobile;
    }
    return /Mobi|Android|iPhone|iPad|iPod|Phone/i.test(navigator.userAgent);
  };


  useEffect(() => {
    // Get VCs from centralized funding context
    const vcData = getFundingByCategory('venture-capital') as unknown as VentureCapital[];
    setVCs(vcData);
    setFilteredVCs(vcData);
  }, [getFundingByCategory]);

  useEffect(() => {
    // Filter VCs based on search
    if (!search.trim()) {
      setFilteredVCs(vcs);
    } else {
      const filtered = vcs.filter(vc =>
        vc.name?.toLowerCase().includes(search.toLowerCase()) ||
        vc.headOffice?.toLowerCase().includes(search.toLowerCase()) ||
        vc.sectorFocus?.some(sector => sector.toLowerCase().includes(search.toLowerCase())) ||
        vc.stageFocus?.some(stage => stage.toLowerCase().includes(search.toLowerCase()))
      );
      setFilteredVCs(filtered);
    }
  }, [search, vcs]);
  const handleVCClick = (vc: VentureCapital) => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    setSelectedVC(vc);
  };

  const closeModal = () => {
    setSelectedVC(null);
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <Helmet>
        <title>Venture Capital Firms | Aarly</title>
        <meta name="description" content="Discover top venture capital firms for startup funding. Connect with VCs that match your stage and sector." />
      </Helmet>
      
  <FundingMobileNav />
  <div className="mb-8 px-2 md:px-6 pt-4 md:pt-8 mt-6 md:mt-10">
        <h1 className="text-2xl font-bold mb-2 text-white">Venture Capital Firms</h1>
        <p className="text-gray-400">
          Connect with leading venture capital firms for your startup funding needs.
        </p>
      </div>

      {/* Search */}
      <div className="px-2 md:px-6 mb-6">
        <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-sm p-4">
          <input
            type="text"
            placeholder="Search VCs by name, location, or sector..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* VC Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2 md:px-6 pb-8">
        {(loading && filteredVCs.length === 0) ? (
          <LoadingGrid count={6} columns={2} />
        ) : (
          filteredVCs.map((vc) => (
            <div
              key={vc._id}
              onClick={() => handleVCClick(vc)}
              className={`relative bg-gray-800 border border-gray-700 backdrop-blur-xl rounded-2xl shadow-md p-6 hover:shadow-xl hover:border-gray-600 transition-all cursor-pointer group ${vc.expired ? 'opacity-50 grayscale' : ''}`}
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl bg-gray-700 border border-gray-600 flex items-center justify-center overflow-hidden">
                  {vc.icon?.url ? (
                    <img 
                      src={vc.icon.url} 
                      alt={`${vc.name} icon`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Building2 className="w-8 h-8 text-blue-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-white truncate group-hover:text-blue-400 transition-colors">
                    {vc.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                    <MapPin className="w-4 h-4" />
                    <span>{vc.headOffice}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-gray-300">{formatCurrencyWithSymbol(Number(vc.fundSize), vc.fundSizeCurrency || 'INR')} Fund</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-purple-400" />
                  <span className="font-medium text-gray-300">{formatCurrencyRange(vc.avgTicketSize, vc.avgTicketSizeCurrency || 'INR')} Avg</span>
                </div>
              </div>

              {vc.stageFocus && vc.stageFocus.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {vc.stageFocus.slice(0, 3).map((stage) => (
                    <span
                      key={stage}
                      className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30"
                    >
                      {stage}
                    </span>
                  ))}
                  {vc.stageFocus.length > 3 && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-600 text-gray-300">
                      +{vc.stageFocus.length - 3} more
                    </span>
                  )}
                </div>
              )}

              {vc.sectorFocus && vc.sectorFocus.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {vc.sectorFocus.slice(0, 2).map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400 border border-purple-500/30"
                    >
                      {s}
                    </span>
                  ))}
                  {vc.sectorFocus.length > 2 && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-600/50 text-gray-400 border border-gray-600">
                      +{vc.sectorFocus.length - 2}
                    </span>
                  )}
                </div>
              )}

              <div className="mt-6 flex items-center justify-between">
                <span className="text-sm text-gray-400">{vc.applicationProcess}</span>
                <span className="text-blue-400 font-medium text-sm group-hover:text-blue-300">
                  View Details →
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {filteredVCs.length === 0 && !loading && (
        <EmptyState
          title={search ? "No VCs found" : "No VCs available"}
          message={search ? "Try adjusting your search criteria" : "Venture capital data will appear here once loaded"}
          error={error}
        />
      )}

      {/* VC Detail Modal */}
      {selectedVC && (
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
                <div className="hidden md:flex w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center overflow-hidden">
                  {selectedVC.icon?.url ? (
                    <img 
                      src={selectedVC.icon.url} 
                      alt={`${selectedVC.name} icon`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Building2 className="w-6 h-6 text-blue-400" />
                  )}
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">{selectedVC.name}</h1>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedVC.headOffice}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${selectedVC?.expired ? 'bg-gray-700 text-gray-300' : 'bg-emerald-600 text-white'}`}>
                  {selectedVC?.expired ? 'Expired' : 'Open'}
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 rounded-xl hover:bg-gray-800 transition-all duration-200 group"
                  aria-label="Close"
                >
                  <span className="text-2xl text-gray-400 group-hover:text-white">×</span>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="overflow-y-auto p-4 max-h-[calc(85vh-120px)]">
              <div className="space-y-4">
                {/* Fund Size + Average Ticket (one-line on md+) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-emerald-600/40 to-green-600/40 border border-emerald-400/60 rounded-xl p-4">
                    <div className="text-center">
                      <div className="text-sm font-semibold text-emerald-200 uppercase tracking-wide mb-2">Fund Size</div>
                      <div className="text-2xl font-bold text-emerald-50">{formatCurrencyWithSymbol(Number(selectedVC.fundSize), selectedVC.fundSizeCurrency || 'INR')}</div>
                      {selectedVC.fundSizeDescription && (
                        <div className="text-sm text-emerald-200 mt-2 px-3">
                          {selectedVC.fundSizeDescription}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-sky-600/40 to-blue-600/40 border border-sky-400/60 rounded-xl p-4">
                    <div className="text-center">
                      <div className="text-sm font-semibold text-sky-200 uppercase tracking-wide mb-2">Average Ticket</div>
                      <div className="text-2xl font-bold text-sky-50">{formatCurrencyRange(selectedVC.avgTicketSize, selectedVC.avgTicketSizeCurrency || 'INR')}</div>
                    </div>
                  </div>
                </div>

                {/* Stage and Sector Focus */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedVC.stageFocus && selectedVC.stageFocus.length > 0 && (
                    <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
                      <div className="text-sm font-semibold text-white mb-3">Stage Focus</div>
                      <div className="flex flex-wrap gap-2">
                        {selectedVC.stageFocus.map(s => (
                          <span key={s} className="px-3 py-1 rounded-full text-sm bg-blue-600/30 text-blue-300 border border-blue-500/40">{s}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedVC.sectorFocus && selectedVC.sectorFocus.length > 0 && (
                    <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
                      <div className="text-sm font-semibold text-white mb-3">Sector Focus</div>
                      <div className="flex flex-wrap gap-2">
                        {selectedVC.sectorFocus.map(s => (
                          <span key={s} className="px-3 py-1 rounded-full text-sm bg-purple-600/30 text-purple-300 border border-purple-500/40">{s}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Portfolio Highlights */}
                {selectedVC.portfolioHighlights && (
                  <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                    <h3 
                      className="text-lg font-semibold mb-3 text-white"
                      style={{ 
                        color: '#ffffff',
                        WebkitTextFillColor: '#ffffff',
                        textShadow: '0 0 1px rgba(255,255,255,0.5)'
                      }}
                    >
                      Portfolio Highlights
                    </h3>
                    <p 
                      className="leading-relaxed text-gray-300 whitespace-pre-wrap break-words"
                      style={{ 
                        color: '#d1d5db',
                        WebkitTextFillColor: '#d1d5db'
                      }}
                    >
                      {selectedVC.portfolioHighlights}
                    </p>
                  </div>
                )}

                {/* Application Process */}
                {selectedVC.applicationProcess && (
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
                      {selectedVC.applicationProcess}
                    </p>
                  </div>
                )}

                {/* Contact Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  {selectedVC.contact && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        const to = encodeURIComponent(selectedVC.contact);
                        const subject = encodeURIComponent(`Inquiry about ${selectedVC.name}`);
                        if (isMobileDevice()) {
                          window.location.href = `mailto:${selectedVC.contact}?subject=${subject}`;
                        } else {
                          const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${to}&su=${subject}`;
                          window.open(gmailUrl, '_blank');
                        }
                      }}
                      className="flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-150 text-sm font-medium"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Send Email</span>
                    </button>
                  )}
                  {selectedVC.websiteUrl && (
                    <a 
                      href={selectedVC.websiteUrl} 
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

export default VCFundingPage;