import React from 'react';
import { Star, MapPin } from 'lucide-react';
import { cn } from '../../lib/utils';

interface FundingCardProps {
  id: string;
  name: string;
  icon: React.ReactNode;
  location: string;
  tags?: string[];
  details: Array<{
    icon: React.ReactNode;
    label: string;
    value: string | number;
    color?: string;
  }>;
  onClick: () => void;
}

const FundingCard: React.FC<FundingCardProps> = ({
  id,
  name,
  icon,
  location,
  tags = [],
  details,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-md border border-blue-100 p-6 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group"
    >
      {/* Star Icon */}
      <button
        className="absolute top-4 left-4 bg-white rounded-full p-1 shadow hover:bg-yellow-100 transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          // Handle save functionality
        }}
      >
        <Star className="w-5 h-5 text-yellow-400" fill="none" />
      </button>

      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-xl bg-gray-50 flex items-center justify-center">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
            {name}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        {details.map((detail, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            {React.cloneElement(detail.icon as React.ReactElement, { 
              className: cn("w-4 h-4", detail.color || "text-blue-600")
            })}
            <span className="font-medium text-gray-900">{detail.value}</span>
          </div>
        ))}
      </div>

      {tags && tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200"
            >
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
              +{tags.length - 3} more
            </span>
          )}
        </div>
      )}

      <div className="mt-6 flex items-center justify-end">
        <span className="text-blue-600 font-medium text-sm group-hover:text-blue-700">
          View Details →
        </span>
      </div>
    </div>
  );
};

export default FundingCard;