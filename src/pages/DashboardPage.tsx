import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useFunding } from '../contexts/FundingContext';
import FundingCard from '../components/ui/FundingCard';
import Button from '../components/ui/Button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { formatCurrencyWithSymbol, formatCurrencyRange } from '../lib/utils';
import { Link } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const { getRandomFundingItems, loading: fundingLoading } = useFunding();
  const [randomFundingItems, setRandomFundingItems] = useState<any[]>([]);

  useEffect(() => {
    const items = getRandomFundingItems(6);
    // filter out items marked expired
    setRandomFundingItems(items.filter((it: any) => !it.expired));
  }, [getRandomFundingItems]);

  const formatAmount = (item: any) => {
    // Handle fund size with currency
    if (item.fundSize) {
      const currency = item.fundSizeCurrency || 'INR';
      return `${formatCurrencyWithSymbol(item.fundSize, currency)} Fund`;
    }
    
    // Handle ticket size with currency (angel investors)
    if (item.ticketSize) {
      const currency = item.currency || 'INR';
      return `${formatCurrencyWithSymbol(item.ticketSize, currency)} Ticket`;
    }
    
    // Handle check size with currency (micro VCs)
    if (item.checkSize) {
      const currency = item.checkSizeCurrency || 'INR';
      return `${formatCurrencyWithSymbol(item.checkSize, currency)} Check`;
    }
    
    // Handle avgTicketSize range (venture capital)
    if (item.avgTicketSize && typeof item.avgTicketSize === 'object' && item.avgTicketSize.min && item.avgTicketSize.max) {
      const currency = item.avgTicketSizeCurrency || 'INR';
      return `${formatCurrencyRange(item.avgTicketSize, currency)} Avg`;
    }
    // Fallback for old avgTicketSize format
    if (item.avgTicketSize && typeof item.avgTicketSize === 'number') {
      const currency = item.avgTicketSizeCurrency || 'INR';
      return `${formatCurrencyWithSymbol(item.avgTicketSize, currency)} Avg`;
    }
    
    // Handle grant size with currency
    if (item.grantSize) {
      const currency = item.currency || 'INR';
      return `${formatCurrencyWithSymbol(item.grantSize, currency)} Grant`;
    }
    
    // Handle text-based funding amounts
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
      </Helmet>

      <div className="min-h-screen bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 sm:space-y-12">
          {/* Top Section: Background Video with Overlay */}
          <div className="relative w-full h-[180px] sm:h-[220px] rounded-2xl overflow-hidden mb-8">
            <video
              src="/video2.mp4"
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 via-purple-900/80 to-blue-900/80 z-10" />
            <div className="relative z-20 w-full h-full flex flex-col items-center justify-center text-center p-4 sm:p-6">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 drop-shadow-lg">
                  Welcome to Your Funding Journey
                </h1>
                <p className="text-sm sm:text-base text-blue-100 mb-4 max-w-2xl mx-auto drop-shadow-lg px-2">
                  Discover, connect, and secure funding from the right investors for your startup.
                </p>
                <Link to="/funding/vc" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  <button className="bg-white text-blue-600 hover:bg-gray-100 px-4 sm:px-6 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 mx-auto text-sm sm:text-base shadow-lg">
                    Explore Funding Options
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Latest Opportunities */}
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-white">Latest Funding Opportunities</h2>
              <button
                onClick={() => {
                  const items = getRandomFundingItems(6);
                  // filter out items marked expired
                  setRandomFundingItems(items.filter((it: any) => !it.expired));
                }}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 text-gray-300 rounded-lg hover:border-gray-600 hover:text-white transition-all"
              >
                <Sparkles className="w-4 h-4" />
                Refresh
              </button>
            </div>

            {fundingLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-gray-800 border border-gray-700 rounded-xl p-6 animate-pulse">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-gray-700 rounded-lg"></div>
                      <div className="flex-1">
                        <div className="h-5 bg-gray-700 rounded mb-2 w-3/4"></div>
                        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-4 bg-gray-700 rounded w-full"></div>
                      <div className="h-4 bg-gray-700 rounded w-2/3"></div>
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
                    icon={item.icon}
                    onClick={() => handleFundingItemClick(item)}
                    showCategoryLabel={true}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-800 border border-gray-700 rounded-xl">
                <div className="text-gray-400 mb-4">No funding opportunities available at the moment.</div>
                <Link to="/funding/vc" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Browse All Funding Options
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            )}

            <div className="mt-8 text-center">
              <Link 
                to="/funding/vc" 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                View All Funding Categories
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
