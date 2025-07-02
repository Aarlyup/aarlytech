import React from 'react';
import { ChevronDown } from 'lucide-react';

interface FilterDropdownProps {
  label: string;
  options: string[];
  selectedValues: string[];
  isOpen: boolean;
  onToggle: () => void;
  onOptionChange: (value: string) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  options,
  selectedValues,
  isOpen,
  onToggle,
  onOptionChange,
}) => {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
          selectedValues.length > 0
            ? 'border-blue-500 bg-blue-50 text-blue-700'
            : 'border-gray-200 hover:border-gray-300'
        }`}
      >
        <span>{label}</span>
        {selectedValues.length > 0 && (
          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">
            {selectedValues.length}
          </span>
        )}
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-10 max-h-60 overflow-y-auto">
          {options.map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedValues.includes(option)}
                onChange={() => onOptionChange(option)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown; 