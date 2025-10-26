import React from 'react';
import { Helmet } from 'react-helmet-async';

const ComingSoonAarly: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Coming Soon | Aarly</title>
        <meta name="description" content="Investor Match is coming soon. Sign up to get notified when we launch investor matching." />
      </Helmet>

      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-5xl font-bold text-white">Coming Soon</h1>
          <p className="text-gray-300 mt-3">This feature is under development — page coming soon.</p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={() => window.history.back()}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md"
            >
              Go back
            </button>
            <a
              href="/"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
              Home
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComingSoonAarly;
