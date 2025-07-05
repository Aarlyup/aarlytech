import React, { useRef, useEffect, useState } from 'react';
import { Lock } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

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

const previewCards = [
  <InvestorPreview blurred={true} key="investor1" />, 
  <InvestorPreview blurred={true} key="investor2" />, 
  <GrantPreview blurred={true} key="grant1" />
];

const PreviewSection: React.FC = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const cardRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // GSAP animation for card transitions (mobile only)
  useEffect(() => {
    cardRefs.forEach((ref, idx) => {
      if (ref.current) {
        gsap.set(ref.current, { x: idx === current ? 0 : 100, scale: idx === current ? 1 : 0.85, opacity: idx === current ? 1 : 0 });
      }
    });
    if (cardRefs[current].current) {
      gsap.to(cardRefs[current].current, { x: 0, scale: 1, opacity: 1, duration: 0.7, ease: 'power3.out' });
    }
    cardRefs.forEach((ref, idx) => {
      if (idx !== current && ref.current) {
        gsap.to(ref.current, { x: -100, scale: 0.85, opacity: 0, duration: 0.7, ease: 'power3.in' });
      }
    });
  }, [current]);

  // Auto-loop
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % previewCards.length);
    }, 2500);
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [current]);

  // Manual navigation (optional)
  const goTo = (idx: number) => {
    setCurrent(idx);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gray-50 mt-16">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Preview Our Database</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get access to our curated list of investors, grants, and government schemes to accelerate your startup journey.
          </p>
        </div>
        {/* Carousel for small screens */}
        <div className="block md:hidden">
          <div className="flex flex-col items-center w-full">
            <div className="flex justify-center items-center min-h-[340px] w-full">
              {previewCards.map((card, idx) => (
                <div
                  key={idx}
                  ref={cardRefs[idx]}
                  className={`mx-auto w-full max-w-xs sm:max-w-sm transition-all duration-300`}
                  style={{ display: idx === current ? 'block' : 'none' }}
                >
                  {card}
                </div>
              ))}
            </div>
            {/* Manual navigation dots */}
            <div className="flex gap-2 mt-6 justify-center">
              {previewCards.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-2.5 h-2.5 rounded-full ${idx === current ? 'bg-blue-600' : 'bg-gray-300'} transition-all`}
                  onClick={() => goTo(idx)}
                  aria-label={`Go to card ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
        {/* 3-column grid for md+ screens */}
        <div className="hidden md:grid grid-cols-3 gap-4 md:gap-6 gap-y-8 mb-12">
          <InvestorPreview blurred={true} />
          <InvestorPreview blurred={true} />
          <GrantPreview blurred={true} />
        </div>
      </div>
    </section>
  );
};

export default PreviewSection;