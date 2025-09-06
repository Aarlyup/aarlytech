import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { User, MapPin, DollarSign, Target, ExternalLink, Mail, Linkedin, Star } from 'lucide-react';
import { useFunding } from '../../contexts/FundingContext';
import { formatCurrencyWithSymbol } from '../../lib/utils';
import LoadingGrid from '../../components/ui/LoadingGrid';
import EmptyState from '../../components/ui/EmptyState';
import { FundingMobileNav } from '../../components/layout/FundingSidebar';

interface AngelInvestor {
  _id: string;
  name: string;
  linkedinProfileUrl: string;
  city: string;
  country: string;
  investCategory: string[];
  ticketSize: number;
  currency: string;
  stage: string[];
  preferFounderProfile: string;
  portfolioHighlights: string;
  contact: string;
}

const AngelFundingPage: React.FC = () => {
  const { getFundingByCategory, loading, error } = useFunding();
  const [angels, setAngels] = useState<AngelInvestor[]>([]);
  const [filteredAngels, setFilteredAngels] = useState<AngelInvestor[]>([]);
  const [search, setSearch] = useState('');
  const [selectedAngel, setSelectedAngel] = useState<AngelInvestor | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    // Get angels from centralized funding context
    const angelData = getFundingByCategory('angel-investors') as AngelInvestor[];
    setAngels(angelData);
    setFilteredAngels(angelData);
  }, [getFundingByCategory]);

  useEffect(() => {
    // Filter angels based on search
    if (!search.trim()) {
      setFilteredAngels(angels);
    } else {
      const filtered = angels.filter(angel =>
        angel.name?.toLowerCase().includes(search.toLowerCase()) ||
        angel.city?.toLowerCase().includes(search.toLowerCase()) ||
        angel.country?.toLowerCase().includes(search.toLowerCase()) ||
        angel.investCategory?.some(category => category.toLowerCase().includes(search.toLowerCase()))
      );
      setFilteredAngels(filtered);
    }
  }, [search, angels]);
  const handleAngelClick = (angel: AngelInvestor) => {
    setSelectedAngel(angel);
  };

  const closeModal = () => {
    setSelectedAngel(null);
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
        <title>Angel Investors | Aarly</title>
        <meta name="description" content="Connect with angel investors for early-stage startup funding. Find angels that match your industry and stage." />
      </Helmet>
      
  <FundingMobileNav />
  <div className="mb-8 px-2 md:px-6 pt-4 md:pt-8 mt-6 md:mt-10">
        <h1 className="text-2xl font-bold mb-2 text-white">Angel Investors</h1>
        <p className="text-gray-400">
          Connect with angel investors who can provide early-stage funding and mentorship.
        </p>
      </div>

      {/* Search */}
      <div className="px-2 md:px-6 mb-6">
        <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-sm p-4">
          <input
            type="text"
            placeholder="Search angels by name, location, or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Angel Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2 md:px-6 pb-8">
        {(loading && filteredAngels.length === 0) ? (
          <LoadingGrid count={6} columns={2} />
        ) : (
          filteredAngels.map((angel) => (
            <div
              key={angel._id}
              onClick={() => handleAngelClick(angel)}
              className="relative bg-gray-800 border border-gray-700 backdrop-blur-xl rounded-2xl shadow-md p-6 hover:shadow-xl hover:border-gray-600 transition-all hover:-translate-y-1 cursor-pointer group"
            >
              {/* Star Icon */}
              <button
                className="absolute top-4 left-4 bg-gray-700 border border-gray-600 rounded-full p-1 shadow hover:bg-yellow-100 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle save functionality
                }}
              >
                <Star className="w-5 h-5 text-yellow-400" fill="none" />
              </button>

              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl bg-gray-700 border border-gray-600 flex items-center justify-center">
                  <User className="w-8 h-8 text-pink-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-white truncate group-hover:text-blue-400 transition-colors">
                    {angel.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                    <MapPin className="w-4 h-4" />
                    <span>{angel.city}, {angel.country}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-gray-300">{formatCurrencyWithSymbol(Number(angel.ticketSize), angel.currency || 'INR')} Ticket</span>
                </div>
                {angel.investCategory && angel.investCategory.length > 0 && (
                  <div className="flex items-center gap-2 text-sm">
                    <Target className="w-4 h-4 text-blue-400" />
                    <span className="font-medium text-gray-300">{angel.investCategory.join(', ')}</span>
                  </div>
                )}
              </div>

              {angel.stage && angel.stage.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {angel.stage.slice(0, 3).map((stage) => (
                    <span
                      key={stage}
                      className="px-2.5 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400 border border-purple-500/30"
                    >
                      {stage}
                    </span>
                  ))}
                  {angel.stage.length > 3 && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-600 text-gray-300">
                      +{angel.stage.length - 3} more
                    </span>
                  )}
                </div>
              )}

              <div className="mt-6 flex items-center justify-end">
                <span className="text-blue-400 font-medium text-sm group-hover:text-blue-300">
                  View Profile →
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {filteredAngels.length === 0 && !loading && (
        <EmptyState
          title={search ? "No angels found" : "No angels available"}
          message={search ? "Try adjusting your search criteria" : "Angel investor data will appear here once loaded"}
          error={error}
        />
      )}

      {/* Angel Detail Modal */}
      {selectedAngel && (
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
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/30 flex items-center justify-center">
                  <User className="w-6 h-6 text-pink-400" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">{selectedAngel.name}</h1>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedAngel.city}, {selectedAngel.country}</span>
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
                {/* Ticket Size Card */}
                <div className="bg-gradient-to-br from-emerald-600/40 to-green-600/40 border border-emerald-400/60 rounded-xl p-6">
                  <div className="text-center">
                    <div className="text-sm font-semibold text-emerald-200 uppercase tracking-wide mb-2">Ticket Size</div>
                    <div className="text-3xl font-bold text-emerald-50">{formatCurrencyWithSymbol(Number(selectedAngel.ticketSize), selectedAngel.currency || 'INR')}</div>
                    <div className="text-sm text-emerald-300 mt-1">Typical investment amount</div>
                  </div>
                </div>

                {/* Categories and Stages */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedAngel.investCategory && selectedAngel.investCategory.length > 0 && (
                    <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
                      <div className="text-sm font-semibold text-white mb-3">Investment Categories</div>
                      <div className="flex flex-wrap gap-2">
                        {selectedAngel.investCategory.map(cat => (
                          <span key={cat} className="px-3 py-1 rounded-full text-sm bg-blue-600/30 text-blue-300 border border-blue-500/40">{cat}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedAngel.stage && selectedAngel.stage.length > 0 && (
                    <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
                      <div className="text-sm font-semibold text-white mb-3">Investment Stages</div>
                      <div className="flex flex-wrap gap-2">
                        {selectedAngel.stage.map(s => (
                          <span key={s} className="px-3 py-1 rounded-full text-sm bg-purple-600/30 text-purple-300 border border-purple-500/40">{s}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Portfolio Highlights */}
                {selectedAngel.portfolioHighlights && (
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
                      className="leading-relaxed text-gray-300"
                      style={{ 
                        color: '#d1d5db',
                        WebkitTextFillColor: '#d1d5db'
                      }}
                    >
                      {selectedAngel.portfolioHighlights}
                    </p>
                  </div>
                )}

                {/* Founder Preferences */}
                {selectedAngel.preferFounderProfile && (
                  <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                    <h3 
                      className="text-lg font-semibold mb-3 text-white"
                      style={{ 
                        color: '#ffffff',
                        WebkitTextFillColor: '#ffffff',
                        textShadow: '0 0 1px rgba(255,255,255,0.5)'
                      }}
                    >
                      Founder Preferences
                    </h3>
                    <p 
                      className="leading-relaxed text-gray-300"
                      style={{ 
                        color: '#d1d5db',
                        WebkitTextFillColor: '#d1d5db'
                      }}
                    >
                      {selectedAngel.preferFounderProfile}
                    </p>
                  </div>
                )}

                {/* Contact Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  {selectedAngel.contact && (
                    <a 
                      href={`mailto:${selectedAngel.contact}`} 
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium"
                    >
                      <Mail className="w-5 h-5" />
                      <span>Send Email</span>
                    </a>
                  )}
                  {selectedAngel.linkedinProfileUrl && (
                    <a 
                      href={selectedAngel.linkedinProfileUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium"
                    >
                      <Linkedin className="w-5 h-5" />
                      <span>View LinkedIn</span>
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

export default AngelFundingPage;