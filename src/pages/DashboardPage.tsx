import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useFunding } from '../contexts/FundingContext';
import FundingCard from '../components/ui/FundingCard';
import { ArrowRight, Sparkles, Calendar } from 'lucide-react';

function useIsMd() {
  const [isMd, setIsMd] = useState(window.innerWidth >= 768);
  useEffect(() => {
    const onResize = () => setIsMd(window.innerWidth >= 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return isMd;
}

const DashboardPage: React.FC = () => {
  const { getRandomFundingItems, loading: fundingLoading } = useFunding();
  const [randomFundingItems, setRandomFundingItems] = useState<any[]>([]);

  useEffect(() => {
    const items = getRandomFundingItems(6);
    setRandomFundingItems(items);
  }, [getRandomFundingItems]);

  const formatAmount = (item: any) => {
    if (item.fundSize) return `₹${(item.fundSize).toFixed(0)} Fund`;
    if (item.ticketSize) return `₹${(item.ticketSize).toFixed(0)} Ticket`;
    if (item.checkSize) return `₹${(item.checkSize).toFixed(0)} Check`;
    if (item.avgTicketSize) return `₹${(item.avgTicketSize).toFixed(0)} Avg`;
    if (item.grantSize) return `₹${(item.grantSize).toFixed(0)} Grant`;
    if (item.fundingOffered) return item.fundingOffered;
    if (item.fundingSupport) return item.fundingSupport;
    return 'Contact for details';
  };

  const getLocation = (item: any) => {
    return item.location || item.city || item.headOffice || item.hq || 'Location not specified';
  };

  const getSectors = (item: any) => {
    return item.sector || item.sectors || item.sectorFocus || item.investCategory || [];
  };

  const getStages = (item: any) => {
    return item.stage || item.stageFocus || [];
  };

  const handleFundingItemClick = (item: any) => {
    const categoryRoutes: Record<string, string> = {
      'angel-investors': '/funding/angel',
      'venture-capital': '/funding/vc',
      'micro-vcs': '/funding/microvc',
      'incubators': '/funding/incubator',
      'accelerators': '/funding/accelerator',
      'govt-grants': '/funding/grants'
    };
    const route = categoryRoutes[item.category];
    if (route) {
      window.location.href = route;
    }
  };

  return (
    <>
      <Helmet>
        <title>Your Startup Dashboard | Aarly</title>
        <meta name="description" content="Manage your startup journey, track funding, and access personalized resources on your Aarly dashboard." />
        <link rel="canonical" href="https://aarly.co/dashboard" />
        <meta property="og:title" content="Your Startup Dashboard | Aarly" />
        <meta property="og:description" content="Manage your startup journey, track funding, and access personalized resources on your Aarly dashboard." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aarly.co/dashboard" />
        <meta property="og:image" content="/Screenshot 2025-06-29 140116.png" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 py-10 space-y-12 animate-fade-in" data-aos="fade-in">
        {/* Greeting Block */}
        <div className="relative bg-white/80 border border-blue-100 shadow-2xl rounded-3xl p-4 sm:p-8 md:p-12 mb-8 flex flex-col items-center gap-4 sm:gap-6 overflow-hidden backdrop-blur-xl w-full max-w-xl mx-auto" style={{boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10), 0 0 60px 0 #3b82f680'}} data-aos="fade-down" data-aos-delay="200">
          <div className="absolute inset-0 pointer-events-none" style={{background: 'radial-gradient(circle at 30% 20%, #e0e7ff 0%, #fff0 70%)'}}></div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-1 text-blue-900 text-center z-10">
            <span className="block">Welcome to Aarly — your early-stage startup support system.</span>
          </h2>
          <p className="text-gray-700 mb-2 text-sm sm:text-base md:text-lg z-10 text-center max-w-xs sm:max-w-md md:max-w-2xl">Here you can manage your saved investors, explore funding blocks, and access tools to build your startup right.</p>
          <a href="/funding/vc" className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-3 rounded-xl shadow-lg transition-all text-base sm:text-lg z-10 focus:ring-4 focus:ring-blue-200 group w-full sm:w-auto">
            <span className="transition-transform group-hover:scale-110 group-hover:animate-pulse">Browse All Funding Options</span> <ArrowRight size={20} className="transition-transform group-hover:scale-110 group-hover:animate-pulse" />
          </a>
        </div>

        {/* Latest Funding Opportunities */}
        <div data-aos="fade-up" data-aos-delay="300">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-blue-900">Latest Funding Opportunities</h3>
            <button
              onClick={() => {
                const items = getRandomFundingItems(6);
                setRandomFundingItems(items);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              Refresh
            </button>
          </div>
          {fundingLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-xl"></div>
                    <div className="flex-1">
                      <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : randomFundingItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {randomFundingItems.map((item, index) => (
                <FundingCard
                  key={`${item._id}-${index}`}
                  id={item._id}
                  name={item.name}
                  category={item.category}
                  location={getLocation(item)}
                  amount={formatAmount(item)}
                  sector={getSectors(item)}
                  stage={getStages(item)}
                  onClick={() => handleFundingItemClick(item)}
                  showCategoryLabel={true}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-500 mb-4">No funding opportunities available at the moment.</div>
              <a href="/funding/vc" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Browse All Funding Options
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          )}
          <div className="mt-8 text-center">
            <a href="/funding/vc" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
              View All Funding Categories
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
