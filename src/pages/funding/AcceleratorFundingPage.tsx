import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Rocket, MapPin, DollarSign, Calendar, Clock, ExternalLink, Mail, Star } from 'lucide-react';

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
}

const AcceleratorFundingPage: React.FC = () => {
  const [accelerators, setAccelerators] = useState<Accelerator[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedAccelerator, setSelectedAccelerator] = useState<Accelerator | null>(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    loadAccelerators();
  }, [search]);

  const loadAccelerators = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      
      const response = await fetch(`${API_URL}/funding/public/accelerators?${params.toString()}`, {
        credentials: 'include'
      });
      const data = await response.json();
      
      if (data.success) {
        setAccelerators(data.data);
      }
    } catch (error) {
      console.error('Error loading accelerators:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceleratorClick = (accelerator: Accelerator) => {
    setSelectedAccelerator(accelerator);
  };

  const closeModal = () => {
    setSelectedAccelerator(null);
  };

  return (
    <>
      <Helmet>
        <title>Startup Accelerators | Aarly</title>
        <meta name="description" content="Find startup accelerators offering intensive programs, funding, and mentorship to scale your business." />
      </Helmet>
      
      <div className="mb-8 px-2 md:px-6 pt-4 md:pt-8">
        <h1 className="text-2xl font-bold mb-2">Startup Accelerators</h1>
        <p className="text-gray-600">
          Discover accelerators that offer intensive programs to help scale your startup.
        </p>
      </div>

      {/* Search */}
      <div className="px-2 md:px-6 mb-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <input
            type="text"
            placeholder="Search accelerators by name, location, or sector..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Accelerator Grid */}
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
          accelerators.map((accelerator) => (
            <div
              key={accelerator._id}
              onClick={() => handleAcceleratorClick(accelerator)}
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
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
                  <Rocket className="w-8 h-8 text-orange-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                    {accelerator.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <MapPin className="w-4 h-4" />
                    <span>{accelerator.hq}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-gray-900">{accelerator.fundingOffered}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-gray-900">{accelerator.programDuration}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-purple-600" />
                <span className="font-medium text-gray-900">{accelerator.batchFrequency}</span>
              </div>

              {accelerator.stage && accelerator.stage.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {accelerator.stage.slice(0, 3).map((stage) => (
                    <span
                      key={stage}
                      className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200"
                    >
                      {stage}
                    </span>
                  ))}
                  {accelerator.stage.length > 3 && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                      +{accelerator.stage.length - 3} more
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

      {accelerators.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500">No accelerators found.</p>
        </div>
      )}

      {/* Accelerator Detail Modal */}
      {selectedAccelerator && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
                    <Rocket className="w-8 h-8 text-orange-600" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{selectedAccelerator.name}</h1>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{selectedAccelerator.hq}</span>
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
                  <h3 className="font-semibold text-green-900 mb-2">Funding Offered</h3>
                  <p className="text-green-700 text-xl font-bold">{selectedAccelerator.fundingOffered}</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">Program Duration</h3>
                  <p className="text-blue-700 text-xl font-bold">{selectedAccelerator.programDuration}</p>
                </div>
              </div>

              <div className="bg-purple-50 rounded-xl p-4 mb-6">
                <h3 className="font-semibold text-purple-900 mb-2">Batch Frequency</h3>
                <p className="text-purple-700">{selectedAccelerator.batchFrequency}</p>
              </div>

              {selectedAccelerator.stage && selectedAccelerator.stage.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Stage Focus</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedAccelerator.stage.map((stage) => (
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

              {selectedAccelerator.sectors && selectedAccelerator.sectors.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Sectors</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedAccelerator.sectors.map((sector) => (
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

              {selectedAccelerator.servicesProvided && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Services Provided</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedAccelerator.servicesProvided}</p>
                </div>
              )}

              {selectedAccelerator.pastCohorts && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Past Cohorts</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedAccelerator.pastCohorts}</p>
                </div>
              )}

              <div className="flex flex-wrap gap-4">
                {selectedAccelerator.websiteUrl && (
                  <a
                    href={selectedAccelerator.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Visit Website
                  </a>
                )}
                {selectedAccelerator.applicationLink && (
                  <a
                    href={selectedAccelerator.applicationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    <Rocket className="w-4 h-4" />
                    Apply Now
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

export default AcceleratorFundingPage;