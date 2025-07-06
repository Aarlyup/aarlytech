import React, { useEffect, useState } from 'react';
import { Newspaper, RefreshCw, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

interface NewsItem {
  _id: string;
  title: string;
  description: string;
  image: {
    url: string;
    publicId: string;
  };
  category: string;
  publishedAt: string;
  author: {
    name: string;
  };
}

const FinNewzPage: React.FC = () => {
  const [articles, setArticles] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}/public/news`);
        const data = await response.json();
        
        if (data.success) {
          setArticles(data.data);
        } else {
          setError('Failed to load news articles');
        }
      } catch (err: any) {
        setError('Could not load news articles. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const handleArticleClick = (article: NewsItem) => {
    setSelectedArticle(article);
  };

  const closeModal = () => {
    setSelectedArticle(null);
  };

  return (
    <>
      <Helmet>
        <title>Fin'Newz - Startup Funding News | Aarly</title>
        <meta name="description" content="Stay updated with the latest startup funding news, trends, and insights on Aarly Fin'Newz." />
        <link rel="canonical" href="https://aarly.co/finnewz" />
        <meta property="og:title" content="Fin'Newz - Startup Funding News | Aarly" />
        <meta property="og:description" content="Stay updated with the latest startup funding news, trends, and insights on Aarly Fin'Newz." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aarly.co/finnewz" />
        <meta property="og:image" content="/Screenshot 2025-06-29 140116.png" />
      </Helmet>
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-2 sm:px-4 md:px-8">
        <div className="w-full max-w-3xl p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl bg-gradient-to-br from-blue-100 via-white to-indigo-100 border-0 flex flex-col items-center">
          <div className="flex flex-col sm:flex-row items-center gap-3 mb-4">
            <Newspaper size={40} className="text-blue-500 transition-transform hover:scale-110 hover:animate-pulse" />
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-blue-700 text-center relative">
              Fin'Newz
              <span className="block h-1 w-20 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full mt-1 mx-auto animate-underline"></span>
            </h1>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 text-center mb-4 sm:mb-6">Latest startup funding and business news from our editorial team.</p>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 w-full py-6 sm:py-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white/80 rounded-lg p-3 sm:p-4 border border-blue-100 shadow animate-shimmer h-44 sm:h-56 flex flex-col gap-3">
                  <div className="w-full h-24 sm:h-32 bg-blue-100 rounded mb-2 shimmer"></div>
                  <div className="h-4 sm:h-5 w-3/4 bg-blue-50 rounded shimmer"></div>
                  <div className="h-3 sm:h-4 w-1/2 bg-blue-50 rounded shimmer"></div>
                  <div className="h-3 sm:h-4 w-2/3 bg-blue-50 rounded shimmer"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-red-500 font-semibold py-8">{error}</div>
          ) : (
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {articles.map((article, i) => (
                <div
                  key={i}
                  onClick={() => handleArticleClick(article)}
                  className="group block bg-white/90 rounded-xl p-3 sm:p-4 border border-blue-100 shadow hover:shadow-2xl hover:bg-white/100 transition-all fade-in-up overflow-hidden relative cursor-pointer"
                  style={{animationDelay: `${i * 80}ms`}}
                >
                  {article.image?.url && (
                    <div className="overflow-hidden rounded mb-2 sm:mb-3 h-28 sm:h-40 w-full">
                      <img
                        src={article.image.url}
                        alt={article.title}
                        className="w-full h-28 sm:h-40 object-cover rounded transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full">{article.category}</span>
                    <span className="text-gray-400 text-xs">{new Date(article.publishedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="font-semibold text-gray-900 mb-1 text-base sm:text-lg line-clamp-2">{article.title}</div>
                  <div className="text-gray-700 text-sm sm:text-base line-clamp-3 mb-2">
                    {article.description.length > 150 
                      ? `${article.description.substring(0, 150)}...` 
                      : article.description
                    }
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">By {article.author.name}</span>
                  <span className="inline-flex items-center gap-1 text-blue-600 font-medium text-xs sm:text-sm mt-1 opacity-80 group-hover:opacity-100 transition-all group/readmore">
                    Read More
                    <ArrowRight size={14} className="transform translate-x-0 group-hover/readmore:translate-x-1 transition-transform duration-200" />
                  </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Article Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full">
                    {selectedArticle.category}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {new Date(selectedArticle.publishedAt).toLocaleDateString()}
                  </span>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              {selectedArticle.image?.url && (
                <img
                  src={selectedArticle.image.url}
                  alt={selectedArticle.title}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              )}
              
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                {selectedArticle.title}
              </h1>
              
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {selectedArticle.description}
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Written by {selectedArticle.author.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FinNewzPage; 