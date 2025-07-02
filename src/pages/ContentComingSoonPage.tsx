import React from 'react';
import { Hourglass } from 'lucide-react';

const ContentComingSoonPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50">
      <div className="backdrop-blur-xl bg-white/80 border border-blue-100 shadow-2xl rounded-3xl px-10 py-16 flex flex-col items-center gap-6" style={{boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)'}}>
        <Hourglass size={56} className="text-amber-400 mb-2 animate-pulse" />
        <h1 className="text-3xl font-extrabold text-blue-900 mb-2">Content Coming Soon!</h1>
        <p className="text-lg text-gray-700 text-center max-w-md">We're working hard to bring you amazing resources, guides, and more. Stay tuned for updates!</p>
      </div>
    </div>
  );
};

export default ContentComingSoonPage; 