import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Award, Building, DollarSign, Calendar, FileText, ExternalLink, Mail, Star } from 'lucide-react';

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
  const [grants, setGrants] = useState<GovtGrant[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedGrant, setSelectedGrant] = useState<GovtGrant | null>(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    loadGrants();
  }, [search]);

  const loadGrants = async () => {
    try {
      setLoading(true);
      console.log('Loading Grants with search:', search);
      
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      
      const response = await fetch(`${API_URL}/funding/public/govt-grants?${params.toString()}`, {
        credentials: 'include'
      });
      const data = await response.json();
      
      console.log('Grants data response:', data);
      
      if (data.success) {
        setGrants(data.data);
      } else {
        console.error('Failed to load Grants:', data.message);
        setGrants([]);
      }
    } catch (error) {
      console.error('Error loading grants:', error);
      setGrants([]);
    } finally {
      setLoading(false);
    }
  };

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
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse">
              <div className="h-6 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          ))
        ) : (
          grants.map((grant) => (
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
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-gray-900">₹{(grant.grantSize / 100000).toFixed(0)} Lakhs</span>
                </div>
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

      {grants.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500">No government grants found.</p>
        </div>
      )}

      {/* Grant Detail Modal */}
      {selectedGrant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                    <Award className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{selectedGrant.name}</h1>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getAuthorityColor(selectedGrant.authority)}`}>
                      {selectedGrant.authority}
                    </span>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-green-50 rounded-xl p-4">
                  <h3 className="font-semibold text-green-900 mb-2">Grant Size</h3>
                  <p className="text-green-700 text-xl font-bold">₹{(selectedGrant.grantSize / 100000).toFixed(0)} Lakhs</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">Equity Dilution</h3>
                  <p className="text-blue-700 font-bold">{selectedGrant.equityDilution}</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-4">
                  <h3 className="font-semibold text-purple-900 mb-2">Sector</h3>
                  <p className="text-purple-700 font-bold">{selectedGrant.sector}</p>
                </div>
              </div>

              {selectedGrant.stage && selectedGrant.stage.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Eligible Stages</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedGrant.stage.map((stage) => (
                      <span
                        key={stage}
                        className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700"
                      >
                        {stage}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Eligibility Criteria</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedGrant.eligibility}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">How to Apply</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedGrant.howToApply}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Timelines</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedGrant.timelines}</p>
                </div>

                {selectedGrant.documentsRequired && selectedGrant.documentsRequired.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Documents Required</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      {selectedGrant.documentsRequired.map((doc, index) => (
                        <li key={index}>{doc}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedGrant.specialNotes && (
                  <div className="bg-yellow-50 rounded-xl p-4">
                    <h3 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Special Notes
                    </h3>
                    <p className="text-yellow-800">{selectedGrant.specialNotes}</p>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap gap-4">
                  {selectedGrant.contact && (
                    <a
                      href={selectedGrant.contact.includes('@') ? `mailto:${selectedGrant.contact}` : selectedGrant.contact}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {selectedGrant.contact.includes('@') ? <Mail className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
                      Contact
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

export default GrantsFundingPage;