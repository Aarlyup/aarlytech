import React, { useRef, useEffect, useState } from 'react';
import { Search, Filter, Send } from 'lucide-react';
import gsap from 'gsap';

const features = [
  {
    icon: <Search size={24} className="text-blue-600" />,
    title: 'Search by sector, stage, region',
    description: 'Filter through our database to find exactly what you need, whether you\'re an early-stage health tech or a growth-stage fintech.',
  },
  {
    icon: <Filter size={24} className="text-indigo-600" />,
    title: 'Filter investors or grants',
    description: 'Narrow down options based on check size, investment thesis, application deadlines, or grant requirements.',
  },
  {
    icon: <Send size={24} className="text-teal-600" />,
    title: 'Contact or apply directly',
    description: 'Get direct access to investor contact details or application links for grants, streamlining your funding process.',
  },
];

const HowItWorks: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const cardRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // GSAP animation for card transitions
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
      setCurrent((prev) => (prev + 1) % features.length);
    }, 2500);
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [current]);

  // Manual navigation (optional)
  const goTo = (idx: number) => {
    setCurrent(idx);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  return (
    <section id="how-it-works" className="py-12 sm:py-16 md:py-20 scroll-mt-20 bg-gradient-to-b from-blue-50/60 via-white to-indigo-50/60">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Aarly simplifies the funding discovery process in three easy steps.
          </p>
        </div>
        {/* Carousel for small screens */}
        <div className="block md:hidden">
          <div className="relative flex justify-center items-center min-h-[340px] w-full max-w-full overflow-hidden">
            {features.map((feature, idx) => (
              <div
                key={idx}
                ref={cardRefs[idx]}
                className={`absolute left-1/2 top-0 w-full max-w-xs sm:max-w-sm -translate-x-1/2 flex flex-col items-center text-center p-4 sm:p-6 rounded-2xl bg-white shadow-lg border border-blue-100 ${idx === current ? 'z-10' : 'z-0'}`}
                style={{ pointerEvents: idx === current ? 'auto' : 'none' }}
              >
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 flex items-center justify-center mb-6 shadow-md">
                  {React.cloneElement(feature.icon, { size: 32 })}
                </div>
                <h3 className="text-xl font-bold mb-3 text-blue-900">{feature.title}</h3>
                <p className="text-gray-600 text-base leading-relaxed">{feature.description}</p>
              </div>
            ))}
            {/* Manual navigation dots */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2 mt-4">
              {features.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-2.5 h-2.5 rounded-full ${idx === current ? 'bg-blue-600' : 'bg-gray-300'} transition-all`}
                  onClick={() => goTo(idx)}
                  aria-label={`Go to step ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
        {/* 3-column grid for md+ screens */}
        <div className="hidden md:grid grid-cols-3 gap-6 md:gap-8 gap-y-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center p-8 rounded-2xl bg-white shadow-lg border border-blue-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-200"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 flex items-center justify-center mb-6 shadow-md">
                {React.cloneElement(feature.icon, { size: 32 })}
              </div>
              <h3 className="text-xl font-bold mb-3 text-blue-900">{feature.title}</h3>
              <p className="text-gray-600 text-base leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-4 sm:p-8 md:p-12 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-blue-900">Ready to kickstart your funding journey?</h3>
              <p className="text-gray-700 mb-6 text-lg">
                Pioneers raise first. Secure your funding through Aarly today.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-base font-semibold shadow-sm">
                  300+ Investors
                </div>
                <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-base font-semibold shadow-sm">
                  100+ Grants
                </div>
              </div>
            </div>
            <div className="bg-white p-4 sm:p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col gap-4 items-center">
              <div className="flex gap-4 mb-4 w-full">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-200 via-indigo-200 to-purple-200"></div>
                <div className="flex-1">
                  <div className="h-5 w-3/4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
                </div>
              </div>
              <div className="h-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-lg mb-4 w-full"></div>
              <div className="h-8 bg-blue-600 rounded-lg w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;