import React from 'react';
import { X } from 'lucide-react';
import { IncubatorFilters } from './IncubatorFilters';

interface IncubatorFilterChipsProps {
  filters: IncubatorFilters;
  onRemove: (category: keyof IncubatorFilters, value: string) => void;
}

const IncubatorFilterChips: React.FC<IncubatorFilterChipsProps> = ({ filters, onRemove }) => {
  const renderChip = (category: keyof IncubatorFilters, value: string) => {
    let label = value;
    switch (category) {
      case 'affiliation':
        label = `Affiliation: ${value}`;
        break;
      case 'applicationStatus':
        label = `Status: ${value}`;
        break;
      case 'sectors':
        label = `Sector: ${value}`;
        break;
      case 'state':
        label = `State: ${value}`;
        break;
      case 'search':
        label = `Search: ${value}`;
        break;
    }

    return (
      <div
        key={`${category}-${value}`}
        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm"
      >
        <span>{label}</span>
        <button
          onClick={() => onRemove(category, value)}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  };

  return (
    <div className="flex flex-wrap gap-2">
      {Object.entries(filters).map(([category, values]) =>
        (values as string[]).map((value) => renderChip(category as keyof IncubatorFilters, value))
      )}
    </div>
  );
};

export default IncubatorFilterChips; 