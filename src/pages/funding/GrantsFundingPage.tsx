import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Award, Building, Calendar, Mail, Star } from 'lucide-react';
import { useFunding } from '../../contexts/FundingContext';
import { formatCurrencyShort } from '../../lib/utils';
import LoadingGrid from '../../components/ui/LoadingGrid';
import EmptyState from '../../components/ui/EmptyState';
import { FundingMobileNav } from '../../components/layout/FundingSidebar';

interface GovtGrant {
  _id: string;
  name: string;
  authority: string;
  stage: string[];
  sector: string;
  grantSize: number;
  equityDilution: string;
  eligibility: string;
  howToApply: string;
  timelines: string;
  contact: string;
  documentsRequired: string[];
  specialNotes: string;
}

const GrantsFundingPage: React.FC = () => {
  const { getFundingByCategory, loading, error } = useFunding();
  const [grants, setGrants] = useState<GovtGrant[]>([]);
  const [filteredGrants, setFilteredGrants] = useState<GovtGrant[]>([]);
  const [search, setSearch] = useState('');
  const [selectedGrant, setSelectedGrant] = useState<GovtGrant | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    // Get grants from centralized funding context
    const grantData = getFundingByCategory('govt-grants') as unknown as GovtGrant[];
    setGrants(grantData);
    setFilteredGrants(grantData);
  }, [getFundingByCategory]);

  useEffect(() => {
    // Filter grants based on search
    if (!search.trim()) {
      setFilteredGrants(grants);
    } else {
      const filtered = grants.filter(grant =>
        grant.name?.toLowerCase().includes(search.toLowerCase()) ||
        grant.authority?.toLowerCase().includes(search.toLowerCase()) ||
        grant.sector?.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredGrants(filtered);
    }
  }, [search, grants]);
  const handleGrantClick = (grant: GovtGrant) => {
    setSelectedGrant(grant);
  };

  const closeModal = () => {
    setSelectedGrant(null);
  };

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeModal();
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, []);

  const getAuthorityColor = (authority: string) => {
    const colors: Record<string, string> = {
      'DPIIT': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'DST': 'bg-green-500/20 text-green-400 border-green-500/30',
      'MSME': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'BIRAC': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'SERB': 'bg-red-500/20 text-red-400 border-red-500/30',
      'CSIR': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
      'Other': 'bg-gray-600 text-gray-300 border-gray-500'
    };
    return colors[authority] || colors['Other'];
  };

  return (
    <>
      <Helmet>
        <title>Grants | Aarly</title>
        <meta name="description" content="Discover grants and schemes for startups. Find funding opportunities from DPIIT, DST, MSME and other authorities." />
      </Helmet>
      
  <FundingMobileNav />
  <div className="mb-8 px-2 md:px-6 pt-4 md:pt-8 mt-6 md:mt-10">
        <h1 className="text-2xl font-bold mb-2 text-white">Grants</h1>
        <p className="text-gray-400">
          Explore funding opportunities and grants for startups across different stages and sectors.
        </p>
      </div>

      {/* Search */}
      <div className="px-2 md:px-6 mb-6">
        <div className="bg-gray-800 rounded-2xl shadow-sm border border-gray-700 p-4">
          <input
            type="text"
            placeholder="Search grants by name, authority, or sector..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Grant Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2 md:px-6 pb-8">
        {(loading && filteredGrants.length === 0) ? (
          <LoadingGrid count={6} columns={2} />
        ) : (
          filteredGrants.map((grant) => (
            <div
              key={grant._id}
              onClick={() => handleGrantClick(grant)}
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
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-500/20 to-blue-500/20 flex items-center justify-center border border-green-500/30">
                  <Award className="w-8 h-8 text-green-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-white truncate group-hover:text-blue-400 transition-colors">
                    {grant.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                    <Building className="w-4 h-4" />
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getAuthorityColor(grant.authority)}`}>
                      {grant.authority}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-2">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-blue-400" />
                  <span className="font-medium text-gray-300">{grant.timelines}</span>
                </div>
              </div>

              {grant.stage && grant.stage.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {grant.stage.slice(0, 3).map((stage) => (
                    <span
                      key={stage}
                      className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30"
                    >
                      {stage}
                    </span>
                  ))}
                  {grant.stage.length > 3 && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-600 text-gray-300">
                      +{grant.stage.length - 3} more
                    </span>
                  )}
                </div>
              )}

              <div className="mt-6 flex items-center justify-between">
                <span className="text-sm text-gray-400">{grant.sector}</span>
                <span className="text-blue-400 font-medium text-sm group-hover:text-blue-300">
                  View Details →
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {filteredGrants.length === 0 && !loading && (
        <EmptyState
          title={search ? "No grants found" : "No grants available"}
          message={search ? "Try adjusting your search criteria" : "Grant data will appear here once loaded"}
          error={error}
        />
      )}

      {/* Grant Detail Modal */}
      {selectedGrant && (
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
                  <Award className="w-6 h-6 text-green-400" />
                </div>
                <div className="text-center">
                  <h1 className="text-lg font-bold text-white leading-tight">{selectedGrant.name}</h1>
                  <div className="flex items-center gap-2 text-gray-400 text-sm justify-center">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getAuthorityColor(selectedGrant.authority)}`}>{selectedGrant.authority}</span>
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
                    <div className="text-sm font-semibold text-gray-300 uppercase">Grant Size</div>
                    <div className="mt-2 text-2xl font-extrabold text-white">₹{formatCurrencyShort(Number(selectedGrant.grantSize))}</div>
                    <div className="mt-1 text-xs text-gray-400">Total grant amount</div>
                  </div>

                  <div className="rounded-2xl bg-gray-800 border border-gray-700 p-5 border-l-4 border-blue-500/80">
                    <div className="text-sm font-semibold text-gray-300 uppercase">Equity Dilution</div>
                    <div className="mt-2 text-2xl font-extrabold text-white">{selectedGrant.equityDilution}</div>
                    <div className="mt-1 text-xs text-gray-400">If applicable</div>
                  </div>

                  <div className="rounded-2xl bg-gray-800 border border-gray-700 p-4">
                    <div className="text-sm font-semibold text-white mb-3">Timelines</div>
                    <div className="text-sm text-gray-300">{selectedGrant.timelines}</div>
                  </div>

                  {selectedGrant.stage && selectedGrant.stage.length > 0 && (
                    <div className="rounded-2xl bg-gray-800 border border-gray-700 p-4">
                      <div className="text-sm font-semibold text-white mb-3">Stage Focus</div>
                      <div className="flex flex-wrap gap-2">
                        {selectedGrant.stage.map(s => (
                          <span key={s} className="px-3 py-1 rounded-full text-sm bg-blue-600/30 text-blue-100 border border-blue-600/40">{s}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </aside>

                {/* Right: long-form content */}
                <main className="lg:col-span-2 space-y-6">
                  {selectedGrant.eligibility && (
                    <section className="rounded-2xl bg-gray-800 border border-gray-700 p-6">
                      <h3 className="text-xl font-semibold text-white mb-3">Eligibility</h3>
                      <p className="text-gray-100 leading-relaxed text-base">{selectedGrant.eligibility}</p>
                    </section>
                  )}

                  {selectedGrant.howToApply && (
                    <section className="rounded-2xl bg-gray-800 border border-gray-700 p-6">
                      <h3 className="text-xl font-semibold text-white mb-3">How to Apply</h3>
                      <p className="text-gray-100 leading-relaxed text-base">{selectedGrant.howToApply}</p>
                    </section>
                  )}

                  {selectedGrant.documentsRequired && selectedGrant.documentsRequired.length > 0 && (
                    <section className="rounded-2xl bg-gray-800 border border-gray-700 p-6">
                      <h3 className="text-xl font-semibold text-white mb-3">Documents Required</h3>
                      <ul className="list-disc list-inside text-sm text-gray-300">
                        {selectedGrant.documentsRequired.map((doc, idx) => (
                          <li key={idx}>{doc}</li>
                        ))}
                      </ul>
                    </section>
                  )}

                  {selectedGrant.specialNotes && (
                    <section className="rounded-2xl bg-gray-800 border border-gray-700 p-6">
                      <h3 className="text-xl font-semibold text-white mb-3">Special Notes</h3>
                      <p className="text-gray-100 leading-relaxed text-base">{selectedGrant.specialNotes}</p>
                    </section>
                  )}

                  <div className="flex justify-end">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      {selectedGrant.contact && (
                        <a
                          href={`mailto:${selectedGrant.contact}`}
                          className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 inline-flex items-center gap-2"
                        >
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

export default GrantsFundingPage;