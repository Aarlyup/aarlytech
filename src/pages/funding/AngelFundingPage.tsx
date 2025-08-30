import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { User, MapPin, DollarSign, Target, ExternalLink, Mail, Linkedin, Star } from 'lucide-react';
import { useFunding } from '../../contexts/FundingContext';
import { formatCurrencyShort } from '../../lib/utils';
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
                  <span className="font-medium text-gray-300">₹{formatCurrencyShort(Number(angel.ticketSize))} Ticket</span>
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
                <div className="w-10 h-10 rounded-xl bg-gray-700 border border-gray-600 flex items-center justify-center">
                  <User className="w-6 h-6 text-pink-400" />
                </div>
                <div className="text-center">
                  <h1 className="text-lg font-bold text-white leading-tight">{selectedAngel.name}</h1>
                  <div className="flex items-center gap-2 text-gray-400 text-sm justify-center">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedAngel.city}, {selectedAngel.country}</span>
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
                    <div className="text-sm font-semibold text-gray-300 uppercase">Ticket Size</div>
                      <div className="mt-2 text-2xl font-extrabold text-white">₹{formatCurrencyShort(Number(selectedAngel.ticketSize))}</div>
                    <div className="mt-1 text-xs text-gray-400">Typical check size</div>
                  </div>

                  {selectedAngel.investCategory && selectedAngel.investCategory.length > 0 && (
                    <div className="rounded-2xl bg-gray-800 border border-gray-700 p-4">
                      <div className="text-sm font-semibold text-white mb-3">Investment Category</div>
                      <div className="flex flex-wrap gap-2">
                        {selectedAngel.investCategory.map(cat => (
                          <span key={cat} className="px-3 py-1 rounded-full text-sm bg-blue-600/30 text-blue-100 border border-blue-600/40">{cat}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedAngel.stage && selectedAngel.stage.length > 0 && (
                    <div className="rounded-2xl bg-gray-800 border border-gray-700 p-4">
                      <div className="text-sm font-semibold text-white mb-3">Stage Focus</div>
                      <div className="flex flex-wrap gap-2">
                        {selectedAngel.stage.map(s => (
                          <span key={s} className="px-3 py-1 rounded-full text-sm bg-purple-600/30 text-purple-100 border border-purple-600/40">{s}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </aside>

                {/* Right: long-form content */}
                <main className="lg:col-span-2 space-y-6">
                  {selectedAngel.portfolioHighlights && (
                    <section className="rounded-2xl bg-gray-800 border border-gray-700 p-6">
                      <h3 className="text-xl font-semibold text-white mb-3">Portfolio Highlights</h3>
                      <p className="text-gray-100 leading-relaxed text-base">{selectedAngel.portfolioHighlights}</p>
                    </section>
                  )}

                  {selectedAngel.preferFounderProfile && (
                    <section className="rounded-2xl bg-gray-800 border border-gray-700 p-6">
                      <h3 className="text-xl font-semibold text-white mb-3">Founder Preference</h3>
                      <p className="text-gray-100 leading-relaxed text-base">{selectedAngel.preferFounderProfile}</p>
                    </section>
                  )}

                  <div className="flex justify-end">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      {selectedAngel.contact && (
                        <a href={`mailto:${selectedAngel.contact}`} className="px-4 py-2 bg-gray-800 text-white rounded-full border border-gray-700 hover:bg-gray-800/90 inline-flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          <span>Contact</span>
                        </a>
                      )}
                      {selectedAngel.linkedinProfileUrl && (
                        <a href={selectedAngel.linkedinProfileUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full hover:from-blue-700 hover:to-blue-800 inline-flex items-center gap-2">
                          <ExternalLink className="w-4 h-4" />
                          <span>View LinkedIn</span>
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

export default AngelFundingPage;