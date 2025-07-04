import React from 'react';
import { Lock } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';

const InvestorPreview = ({ blurred = true }) => {
  return (
    <Card className={`h-full bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 ${blurred ? 'relative overflow-hidden' : ''}`}>
      {blurred && (
        <div className="absolute inset-0 backdrop-blur-md bg-white/60 z-10 flex flex-col items-center justify-center rounded-2xl">
          <Lock className="mb-2 text-blue-400" size={28} />
          <p className="text-base font-semibold text-blue-500">Premium Content</p>
        </div>
      )}
      <div className="p-6 flex flex-col justify-center items-center">
        <div className="flex items-center mb-4">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-3">
            <span className="text-blue-600 font-semibold">SV</span>
          </div>
          <div>
            <h3 className="font-bold text-lg">Sequoia Ventures</h3>
            <p className="text-sm text-gray-500">Venture Capital</p>
          </div>
        </div>
        <div className="space-y-3 mb-4 w-full">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Stage</span>
            <span className="font-medium">Series A, B</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Sectors</span>
            <span className="font-medium">SaaS, Fintech, AI</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Check Size</span>
            <span className="font-medium">$1M - $10M</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Location</span>
            <span className="font-medium">Global</span>
          </div>
        </div>
        <Button variant="outline" className="w-full justify-center">View Details</Button>
      </div>
    </Card>
  );
};

const GrantPreview = ({ blurred = true }) => {
  return (
    <Card className={`h-full bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 ${blurred ? 'relative overflow-hidden' : ''}`}>
      {blurred && (
        <div className="absolute inset-0 backdrop-blur-md bg-white/60 z-10 flex flex-col items-center justify-center rounded-2xl">
          <Lock className="mb-2 text-blue-400" size={28} />
          <p className="text-base font-semibold text-blue-500">Premium Content</p>
        </div>
      )}
      <div className="p-6 flex flex-col justify-center items-center">
        <div className="flex items-center mb-4">
          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mr-3">
            <span className="text-green-600 font-semibold">SG</span>
          </div>
          <div>
            <h3 className="font-bold text-lg">Startup India Grant</h3>
            <p className="text-sm text-gray-500">Government Grant</p>
          </div>
        </div>
        <div className="space-y-3 mb-4 w-full">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Amount</span>
            <span className="font-medium">₹5L - ₹25L</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Eligible Sectors</span>
            <span className="font-medium">All Sectors</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Deadline</span>
            <span className="font-medium text-red-600">May 30, 2025</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Requirements</span>
            <span className="font-medium">DPIIT Registration</span>
          </div>
        </div>
        <Button variant="outline" className="w-full justify-center">View Details</Button>
      </div>
    </Card>
  );
};

const PreviewSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gray-50 mt-16">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Preview Our Database</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get access to our curated list of investors, grants, and government schemes to accelerate your startup journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 gap-y-8 mb-12">
          {/* Sample Investors */}
          <InvestorPreview blurred={true} />
          <InvestorPreview blurred={true} />
          
          {/* Sample Grant */}
          <GrantPreview blurred={true} />
        </div>

        {/* Submit Resource button and text removed as requested */}
      </div>
    </section>
  );
};

export default PreviewSection;