import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Award, Building, DollarSign, Calendar, FileText, ExternalLink, Mail, Star } from 'lucide-react';
import { useFunding } from '../../contexts/FundingContext';
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
    const grantData = getFundingByCategory('govt-grants') as GovtGrant[];
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

  const getAuthorityColor = (authority: string) => {
    const colors: Record<string, string> = {
      'DPIIT': 'bg-blue-100 text-blue-700',
      'DST': 'bg-green-100 text-green-700',
      'MSME': 'bg-purple-100 text-purple-700',
      'BIRAC': 'bg-orange-100 text-orange-700',
      'SERB': 'bg-red-100 text-red-700',
      'CSIR': 'bg-indigo-100 text-indigo-700',
      'Other': 'bg-gray-100 text-gray-700'
    };
    return colors[authority] || colors['Other'];
  };

  return (
    <>
      <Helmet>
        <title>Government Grants & Schemes | Aarly</title>
        <meta name="description" content="Discover government grants and schemes for startups. Find funding opportunities from DPIIT, DST, MSME and other authorities." />
      </Helmet>
      
      <FundingMobileNav />
      <div className="mb-8 px-2 md:px-6 pt-4 md:pt-8">
        <h1 className="text-2xl font-bold mb-2">Government Grants & Schemes</h1>
        <p className="text-gray-600">
          Explore government funding opportunities and grants for startups across different stages and sectors.
        </p>
      </div>

      {/* Search */}
      <div className="px-2 md:px-6 mb-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <input
            type="text"
            placeholder="Search grants by name, authority, or sector..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-md border border-blue-100 p-6 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group"
            >
              {/* Star Icon */}
              <button
                className="absolute top-4 left-4 bg-white rounded-full p-1 shadow hover:bg-yellow-100 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle save functionality
                }}
              >
                <Star className="w-5 h-5 text-yellow-400" fill="none" />
              </button>

              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                  <Award className="w-8 h-8 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                    {grant.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <Building className="w-4 h-4" />
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAuthorityColor(grant.authority)}`}>
                      {grant.authority}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-2">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-gray-900">{grant.timelines}</span>
                </div>
              </div>

              {grant.stage && grant.stage.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {grant.stage.slice(0, 3).map((stage) => (
                    <span
                      key={stage}
                      className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200"
                    >
                      {stage}
                    </span>
                  ))}
                  {grant.stage.length > 3 && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                      +{grant.stage.length - 3} more
                    </span>
                  )}
                </div>
              )}

              <div className="mt-6 flex items-center justify-between">
                <span className="text-sm text-gray-500">{grant.sector}</span>
                <span className="text-blue-600 font-medium text-sm group-hover:text-blue-700">
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
          message={search ? "Try adjusting your search criteria" : "Government grant data will appear here once loaded"}
          error={error}
        />
      )}

      {/* Grant Detail Modal */}
      {selectedGrant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in" onClick={closeModal}>
          <div
            className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full animate-slide-up mt-12"
            onClick={e => e.stopPropagation()}
            tabIndex={-1}
            ref={modalRef}
          >
            {/* Sticky Header */}
            <div className="sticky top-0 z-20 bg-white rounded-t-2xl flex items-center justify-between px-4 py-3 border-b border-gray-100 shadow-sm">
              <button
                onClick={closeModal}
                className="flex items-center gap-1 text-gray-500 hover:text-blue-600 font-medium text-base px-1 py-1 rounded-lg transition-colors focus:outline-none"
                aria-label="Back"
              >
                <span className="text-lg">←</span>
              </button>
              <div className="flex items-center gap-2 mx-auto">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                  <Award className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-center">
                  <h1 className="text-base font-bold text-gray-900 leading-tight">{selectedGrant.name}</h1>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getAuthorityColor(selectedGrant.authority)}`}>{selectedGrant.authority}</span>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-red-500 text-xl px-1 py-1 rounded-lg transition-colors focus:outline-none"
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="p-4 sm:p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-xl p-4 flex flex-col items-start shadow-sm">
                  <span className="text-xs font-semibold text-green-700 mb-1 uppercase tracking-wide">Grant Size</span>
                  <span className="text-2xl font-bold text-green-900">₹{Number(selectedGrant.grantSize).toLocaleString()}</span>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 flex flex-col items-start shadow-sm">
                  <span className="text-xs font-semibold text-blue-700 mb-1 uppercase tracking-wide">Equity Dilution</span>
                  <span className="text-lg text-blue-900">{selectedGrant.equityDilution}</span>
                </div>
              </div>
              {selectedGrant.stage && selectedGrant.stage.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Stage Focus</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedGrant.stage.map((stage) => (
                      <span
                        key={stage}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200"
                      >
                        {stage}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <h3 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Sector</h3>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 border border-purple-200">{selectedGrant.sector}</span>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Eligibility</h3>
                <p className="text-gray-700 leading-relaxed text-sm">{selectedGrant.eligibility}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 flex flex-col items-start shadow-sm">
                <span className="text-xs font-semibold text-gray-700 mb-1 uppercase tracking-wide">How to Apply</span>
                <span className="text-sm text-gray-900">{selectedGrant.howToApply}</span>
              </div>
              {selectedGrant.documentsRequired && selectedGrant.documentsRequired.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Documents Required</h3>
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    {selectedGrant.documentsRequired.map((doc, idx) => (
                      <li key={idx}>{doc}</li>
                    ))}
                  </ul>
                </div>
              )}
              {selectedGrant.specialNotes && (
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Special Notes</h3>
                  <p className="text-gray-700 leading-relaxed text-sm">{selectedGrant.specialNotes}</p>
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                {selectedGrant.contact && (
                  <a
                    href={`mailto:${selectedGrant.contact}`}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow w-full sm:w-auto"
                  >
                    <Mail className="w-4 h-4" />
                    Contact
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GrantsFundingPage;