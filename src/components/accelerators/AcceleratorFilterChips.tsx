import React from 'react';
import { X } from 'lucide-react';
import { AcceleratorFilters } from './AcceleratorFilters';

interface AcceleratorFilterChipsProps {
  filters: AcceleratorFilters;
  onRemove: (category: keyof AcceleratorFilters, value: string) => void;
}

const AcceleratorFilterChips: React.FC<AcceleratorFilterChipsProps> = ({ filters, onRemove }) => {
  const renderChip = (category: keyof AcceleratorFilters, value: string) => {
    let label = value;
    switch (category) {
      case 'affiliation':
        label = `Affiliation: ${value}`;
        break;
      case 'applicationStatus':
        label = `Status: ${value}`;
        break;
      case 'tags':
        label = `Tag: ${value}`;
        break;
      case 'equityRange':
        label = `Equity: ${value}`;
        break;
      case 'fundingRange':
        label = `Funding: ${value}`;
        break;
      case 'durationRange':
        label = `Duration: ${value}`;
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
        (values as string[]).map((value) => renderChip(category as keyof AcceleratorFilters, value))
      )}
    </div>
  );
};

export default AcceleratorFilterChips; 