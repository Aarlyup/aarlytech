import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Building2, MapPin, DollarSign, Calendar, ExternalLink, Mail, Star } from 'lucide-react';

interface Incubator {
  _id: string;
  name: string;
  websiteUrl: string;
  location: string;
  fundingSupport: string;
  otherBenefits: string;
  eligibility: string;
  applicationProcess: string;
  contact: string;
  alumniStartups: string;
}

const IncubatorFundingPage: React.FC = () => {
  const [incubators, setIncubators] = useState<Incubator[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedIncubator, setSelectedIncubator] = useState<Incubator | null>(null);
  const [error, setError] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    loadIncubators();
  }, [search]);

  const loadIncubators = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Loading Incubators with search:', search);
      
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      
      const response = await fetch(`${API_URL}/funding/public/incubators?${params.toString()}`, {
        credentials: 'include'
      });
      const data = await response.json();
      
      console.log('Incubator data response:', data);
      
      if (data.success) {
        setIncubators(data.data);
      } else {
        setError('Failed to load Incubators: ' + data.message);
        setIncubators([]);
      }
    } catch (error) {
      console.error('Error loading incubators:', error);
      setError('Error loading incubators. Please try again later.');
      setIncubators([]);
    } finally {
      setLoading(false);
    }
  };

  const handleIncubatorClick = (incubator: Incubator) => {
    setSelectedIncubator(incubator);
  };

  const closeModal = () => {
    setSelectedIncubator(null);
  };

  return (
    <>
      <Helmet>
        <title>Startup Incubators | Aarly</title>
        <meta name="description" content="Discover startup incubators offering funding, mentorship, and resources for early-stage companies." />
      </Helmet>
      
      <div className="mb-8 px-2 md:px-6 pt-4 md:pt-8">
        <h1 className="text-2xl font-bold mb-2">Startup Incubators</h1>
        <p className="text-gray-600">
          Find incubators that provide funding, mentorship, and resources for your startup journey.
        </p>
      </div>

      {/* Search */}
      <div className="px-2 md:px-6 mb-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <input
            type="text"
            placeholder="Search incubators by name, location, or focus..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Incubator Grid */}
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
          incubators.map((incubator) => (
            <div
              key={incubator._id}
              onClick={() => handleIncubatorClick(incubator)}
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
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                    {incubator.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <MapPin className="w-4 h-4" />
                    <span>{incubator.location}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-gray-900">{incubator.fundingSupport}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-gray-900">{incubator.applicationProcess}</span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end">
                <span className="text-blue-600 font-medium text-sm group-hover:text-blue-700">
                  View Details →
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {incubators.length === 0 && !loading && (
        <div className="text-center py-12 px-4">
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <p className="text-gray-500">No incubators found matching your search criteria.</p>
          )}
        </div>
      )}

      {/* Incubator Detail Modal */}
      {selectedIncubator && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-purple-600" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{selectedIncubator.name}</h1>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{selectedIncubator.location}</span>
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

              <div className="space-y-6">
                <div className="bg-green-50 rounded-xl p-4">
                  <h3 className="font-semibold text-green-900 mb-2">Funding Support</h3>
                  <p className="text-green-700">{selectedIncubator.fundingSupport}</p>
                </div>

                {selectedIncubator.otherBenefits && (
                  <div className="bg-blue-50 rounded-xl p-4">
                    <h3 className="font-semibold text-blue-900 mb-2">Other Benefits</h3>
                    <p className="text-blue-700">{selectedIncubator.otherBenefits}</p>
                  </div>
                )}

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Eligibility</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedIncubator.eligibility}</p>
                </div>

                <div className="bg-purple-50 rounded-xl p-4">
                  <h3 className="font-semibold text-purple-900 mb-2">Application Process</h3>
                  <p className="text-purple-700">{selectedIncubator.applicationProcess}</p>
                </div>

                {selectedIncubator.alumniStartups && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Alumni Startups</h3>
                    <p className="text-gray-700 leading-relaxed">{selectedIncubator.alumniStartups}</p>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap gap-4">
                  {selectedIncubator.websiteUrl && (
                    <a
                      href={selectedIncubator.websiteUrl}
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
        </div>
      )}
    </>
  );
};

export default IncubatorFundingPage;