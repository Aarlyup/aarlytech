import React from 'react';
import { ArrowRight, TrendingUp, Users, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/video.mp4"
      />
      {/* Overlay for text clarity */}
      <div className="absolute inset-0 bg-black/60 z-10" />
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 z-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #3b82f6 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, #8b5cf6 0%, transparent 50%)`
        }} />
      </div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5 z-20">
        <div className="h-full w-full" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-30 container mx-auto px-4 sm:px-6 pt-4 sm:pt-6 pb-16 sm:pb-20">
        <div className="max-w-5xl mx-auto">
          {/* Main Content */}
          <div className="text-center space-y-8 sm:space-y-12">
            {/* Main Heading */}
            <div className="space-y-2 sm:space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
                <div className="text-white mb-2 sm:mb-3">
                  Seize the Right Opportunity
                </div>
                <div className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent pb-2">
                  at the Right Moment
                </div>
              </h1>
            </div>

            {/* Subheading */}
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4 sm:px-0">
              For first-time founders, timing is everything — Aarly is your unfair advantage to seize funding, mentors, grants, and discover events & competitions right on time.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/10">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">300+</div>
                  <div className="text-xs sm:text-sm lg:text-base text-gray-400 font-medium">Investors</div>
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/10">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">₹120Cr+</div>
                  <div className="text-xs sm:text-sm lg:text-base text-gray-400 font-medium">Funded</div>
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/10">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">95%</div>
                  <div className="text-xs sm:text-sm lg:text-base text-gray-400 font-medium">Success Rate</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                to="/dashboard" 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 min-w-[200px] w-full sm:w-auto cursor-pointer text-center no-underline"
              >
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5 inline" />
              </Link>
              <button 
                type="button"
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                className="block px-8 py-4 text-lg font-semibold text-white border-2 border-white/20 rounded-xl hover:bg-white/10 hover:border-white/30 transition-all duration-300 backdrop-blur-sm min-w-[200px] w-full sm:w-auto cursor-pointer text-center"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient - moved to lower z-index */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent z-10" />
    </section>
  );
};

export default Hero;
