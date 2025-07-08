import React from 'react';
import { Star, MapPin, Building2, User, Rocket, Award, DollarSign } from 'lucide-react';
import { cn } from '../../lib/utils';

interface FundingCardProps {
  id: string;
  name: string;
  category?: string;
  location: string;
  amount?: string;
  sector?: string[];
  stage?: string[];
  onClick: () => void;
  showCategoryLabel?: boolean;
}

const getCategoryIcon = (category?: string) => {
  switch (category) {
    case 'angel-investors': return <User className="w-8 h-8 text-pink-600" />;
    case 'venture-capital': return <Building2 className="w-8 h-8 text-blue-600" />;
    case 'micro-vcs': return <Building2 className="w-8 h-8 text-green-600" />;
    case 'incubators': return <Building2 className="w-8 h-8 text-purple-600" />;
    case 'accelerators': return <Rocket className="w-8 h-8 text-orange-600" />;
    case 'govt-grants': return <Award className="w-8 h-8 text-green-600" />;
    default: return <Building2 className="w-8 h-8 text-gray-600" />;
  }
};

const getCategoryColor = (category?: string) => {
  switch (category) {
    case 'angel-investors': return 'from-pink-100 to-purple-100';
    case 'venture-capital': return 'from-blue-100 to-indigo-100';
    case 'micro-vcs': return 'from-green-100 to-blue-100';
    case 'incubators': return 'from-purple-100 to-blue-100';
    case 'accelerators': return 'from-orange-100 to-red-100';
    case 'govt-grants': return 'from-green-100 to-blue-100';
    default: return 'from-gray-100 to-gray-200';
  }
};
const FundingCard: React.FC<FundingCardProps> = ({
  id,
  name,
  category,
  location,
  amount,
  sector = [],
  stage = [],
  onClick,
  showCategoryLabel = false
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
        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${getCategoryColor(category)} flex items-center justify-center`}>
          {getCategoryIcon(category)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
            {name}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
          {showCategoryLabel && category && (
            <div className="mt-1 text-xs font-semibold text-blue-500 uppercase tracking-wide">
              {category.replace(/-/g, ' ')}
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {amount && (
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="w-4 h-4 text-green-600" />
            <span className="font-medium text-gray-900">{amount}</span>
          </div>
        )}
        {Array.isArray(sector) && sector.length > 0 && (
          <div className="text-sm text-gray-600">
            <span className="font-medium">Sectors: </span>
            {sector.slice(0, 2).join(', ')}
            {sector.length > 2 && ` +${sector.length - 2} more`}
          </div>
        )}
      </div>

      {stage && stage.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {stage.slice(0, 3).map((stageItem) => (
            <span
              key={stageItem}
              className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200"
            >
              {stageItem}
            </span>
          ))}
          {stage.length > 3 && (
            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
              +{stage.length - 3} more
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
