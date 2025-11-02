import React from 'react';

interface LoadingGridProps {
  count?: number;
  columns?: number;
}

const LoadingGrid: React.FC<LoadingGridProps> = ({ 
  count = 6,
  columns = 2
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-6`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="relative bg-gray-800 border border-gray-700 backdrop-blur-xl rounded-2xl shadow-md p-6 hover:shadow-xl hover:border-gray-600 transition-all hover:-translate-y-1 animate-pulse group">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-xl bg-gray-700 border border-gray-600 flex items-center justify-center overflow-hidden">
              <div className="w-8 h-8 bg-blue-400/20" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="h-7 bg-gray-700 rounded mb-2 w-3/4" />
              <div className="flex items-center gap-2 text-sm mt-1">
                <div className="w-4 h-4 bg-gray-700 rounded shrink-0" />
                <div className="h-5 bg-gray-700 rounded w-32" />
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <div className="h-5 bg-gray-700 rounded w-32" />
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-4 h-4 bg-gray-700 rounded shrink-0" />
              <div className="h-5 bg-gray-700 rounded w-28" />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <div className="px-2.5 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 h-6 w-20" />
            <div className="px-2.5 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 h-6 w-24" />
            <div className="px-2.5 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 h-6 w-16" />
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm h-5 bg-gray-700 rounded w-40" />
            <div className="text-blue-400 text-sm font-medium h-5 bg-gray-700 rounded w-24" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingGrid;
