import React from 'react';
import { X } from 'lucide-react';

interface FilterChipsProps<T extends Record<string, string[]>> {
  filters: T;
  onRemove: (category: keyof T, value: string) => void;
}

const FilterChips = <T extends Record<string, string[]>>({ filters, onRemove }: FilterChipsProps<T>) => {
  return (
    <div className="flex flex-wrap gap-2">
      {Object.entries(filters).map(([category, values]) =>
        values.map((value) => (
          <div
            key={`${category}-${value}`}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm"
          >
            <span>{value}</span>
            <button
              onClick={() => onRemove(category as keyof T, value)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default FilterChips; 