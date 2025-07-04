import React from 'react';
import { Hourglass } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const ContentComingSoonPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Startup Content & Resources | Aarly</title>
        <meta name="description" content="Explore upcoming startup content, guides, and resources on Aarly. Stay tuned for expert insights and actionable tips." />
        <link rel="canonical" href="https://aarly.co/content" />
        <meta property="og:title" content="Startup Content & Resources | Aarly" />
        <meta property="og:description" content="Explore upcoming startup content, guides, and resources on Aarly. Stay tuned for expert insights and actionable tips." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aarly.co/content" />
        <meta property="og:image" content="/Screenshot 2025-06-29 140116.png" />
      </Helmet>
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 px-2 sm:px-4 md:px-8">
        <div className="backdrop-blur-xl bg-white/80 border border-blue-100 shadow-2xl rounded-3xl px-4 sm:px-8 md:px-10 py-10 sm:py-16 flex flex-col items-center gap-4 sm:gap-6 w-full max-w-lg" style={{boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)'}}>
          <Hourglass size={48} className="text-amber-400 mb-2 animate-pulse" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-900 mb-2 text-center">Content Coming Soon!</h1>
          <p className="text-base sm:text-lg text-gray-700 text-center max-w-md">We're working hard to bring you amazing resources, guides, and more. Stay tuned for updates!</p>
        </div>
      </div>
    </>
  );
};

export default ContentComingSoonPage; 