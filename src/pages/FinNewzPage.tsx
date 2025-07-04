import React, { useEffect, useState } from 'react';
import { Newspaper, RefreshCw, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const NEWSAPI_KEY = 'aad0474192134b3187ad14b6f7b3aab9';
const NEWSAPI_URL = `https://newsapi.org/v2/top-headlines?category=business&language=en&pageSize=12&apiKey=${NEWSAPI_KEY}`;

const fetchJSON = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
};

const FinNewzPage: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchJSON(NEWSAPI_URL);
        setArticles(data.articles || []);
      } catch (err: any) {
        setError('Could not load news. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

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
          <p className="text-base sm:text-lg md:text-xl text-gray-700 text-center mb-4 sm:mb-6">Latest business and finance news headlines — powered by NewsAPI.org.</p>
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
                <a
                  key={i}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block bg-white/90 rounded-xl p-3 sm:p-4 border border-blue-100 shadow hover:shadow-2xl hover:bg-white/100 transition-all fade-in-up overflow-hidden relative"
                  style={{animationDelay: `${i * 80}ms`}}
                >
                  {article.urlToImage && (
                    <div className="overflow-hidden rounded mb-2 sm:mb-3 h-28 sm:h-40 w-full">
                      <img
                        src={article.urlToImage}
                        alt={article.title}
                        className="w-full h-28 sm:h-40 object-cover rounded transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full">{article.source?.name}</span>
                    <span className="text-gray-400 text-xs">{new Date(article.publishedAt).toLocaleString()}</span>
                  </div>
                  <div className="font-semibold text-gray-900 mb-1 text-base sm:text-lg line-clamp-2">{article.title}</div>
                  <div className="text-gray-700 text-sm sm:text-base line-clamp-3 mb-2">{article.description}</div>
                  <span className="inline-flex items-center gap-1 text-blue-600 font-medium text-xs sm:text-sm mt-1 opacity-80 group-hover:opacity-100 transition-all group/readmore">
                    Read More
                    <ArrowRight size={14} className="transform translate-x-0 group-hover/readmore:translate-x-1 transition-transform duration-200" />
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FinNewzPage; 