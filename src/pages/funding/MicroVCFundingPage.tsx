import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Building2, MapPin, DollarSign, Users, ExternalLink, Mail, Linkedin, Star } from 'lucide-react';
import { useFunding } from '../../contexts/FundingContext';
import LoadingGrid from '../../components/ui/LoadingGrid';
import EmptyState from '../../components/ui/EmptyState';

interface MicroVC {
  _id: string;
  name: string;
  websiteUrl: string;
  location: string;
  fundSize: number;
  checkSize: number;
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

  return (
    <>
      <Helmet>
        <title>Micro VCs for Startups | Aarly</title>
        <meta name="description" content="Connect with micro venture capital firms for early-stage startup funding. Find the right micro VC for your business." />
      </Helmet>
      
      <div className="mb-8 px-2 md:px-6 pt-4 md:pt-8">
        <h1 className="text-2xl font-bold mb-2">Micro VCs</h1>
        <p className="text-gray-600">
          Connect with micro venture capital firms specializing in early-stage investments.
        </p>
      </div>

      {/* Search */}
      <div className="px-2 md:px-6 mb-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <input
            type="text"
            placeholder="Search Micro VCs by name, location, or sector..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  <Building2 className="w-8 h-8 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                    {microvc.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <MapPin className="w-4 h-4" />
                    <span>{microvc.location}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-gray-900">₹{(microvc.fundSize).toFixed(0)} Fund</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-purple-600" />
                  <span className="font-medium text-gray-900">₹{(microvc.checkSize).toFixed(0)} Check</span>
                </div>
              </div>

              {microvc.stage && microvc.stage.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {microvc.stage.slice(0, 3).map((stage) => (
                    <span
                      key={stage}
                      className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200"
                    >
                      {stage}
                    </span>
                  ))}
                  {microvc.stage.length > 3 && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                      +{microvc.stage.length - 3} more
                    </span>
                  )}
                </div>
              )}

              <div className="mt-6 flex items-center justify-end">
                <span className="text-blue-600 font-medium text-sm group-hover:text-blue-700">
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{selectedMicroVC.name}</h1>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{selectedMicroVC.location}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-green-50 rounded-xl p-4">
                  <h3 className="font-semibold text-green-900 mb-2">Fund Size</h3>
                  <p className="text-green-700 text-xl font-bold">₹{(selectedMicroVC.fundSize).toFixed(0)} </p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">Check Size</h3>
                  <p className="text-blue-700 text-xl font-bold">₹{(selectedMicroVC.checkSize).toFixed(0)} </p>
                </div>
              </div>

              {selectedMicroVC.stage && selectedMicroVC.stage.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Stage Focus</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedMicroVC.stage.map((stage) => (
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

              {selectedMicroVC.sector && selectedMicroVC.sector.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Sector Focus</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedMicroVC.sector.map((sector) => (
                      <span
                        key={sector}
                        className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-700"
                      >
                        {sector}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedMicroVC.portfolioHighlights && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Portfolio Highlights</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedMicroVC.portfolioHighlights}</p>
                </div>
              )}

              <div className="flex flex-wrap gap-4">
                {selectedMicroVC.websiteUrl && (
                  <a
                    href={selectedMicroVC.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Visit Website
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

export default MicroVCFundingPage;