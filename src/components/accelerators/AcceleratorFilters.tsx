import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import FilterDropdown from '../FilterDropdown';
import AcceleratorFilterChips from './AcceleratorFilterChips';
import {
  AFFILIATIONS,
  APPLICATION_STATUS,
  TAGS,
  EQUITY_RANGES,
  FUNDING_RANGES,
  DURATION_RANGES,
  emptyFilters,
} from '../../constants/accelerators';
import {
  hasActiveAcceleratorFilters,
  hasActiveAcceleratorSearch,
  parseAcceleratorQueryToFilters,
  acceleratorFiltersToQuery,
} from '../../utils/acceleratorFilter';

interface AcceleratorFiltersProps {
  onFilterChange: (filters: AcceleratorFilters) => void;
}

export interface AcceleratorFilters {
  affiliation: string[];
  applicationStatus: string[];
  tags: string[];
  equityRange: string[];
  fundingRange: string[];
  durationRange: string[];
  search: string[];
}

const AcceleratorFilters: React.FC<AcceleratorFiltersProps> = ({ onFilterChange }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [stagedFilters, setStagedFilters] = useState<AcceleratorFilters>({ ...emptyFilters });
  const [appliedFilters, setAppliedFilters] = useState<AcceleratorFilters>({ ...emptyFilters });
  const [searchText, setSearchText] = useState('');
  const filterRef = useRef<HTMLDivElement>(null);

  // Hydrate state from URL query params on mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryFilters = parseAcceleratorQueryToFilters(Object.fromEntries(params));
    setStagedFilters(queryFilters);
    setAppliedFilters(queryFilters);
    setSearchText(queryFilters.search[0] || '');
  }, [location.search]);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!activeDropdown) return;
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]);

  const updateUrlAndState = (newFilters: AcceleratorFilters) => {
    const query = acceleratorFiltersToQuery(newFilters);
    const params = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(v => params.append(key, v));
      } else {
        params.set(key, value);
      }
    });
    navigate(`?${params.toString()}`, { replace: true });
    setAppliedFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSearchChange = (value: string) => {
    setSearchText(value);
  };

  const handleSearchClick = () => {
    const newFilters = { ...appliedFilters, search: searchText ? [searchText] : [] };
    updateUrlAndState(newFilters);
  };

  const toggleStagedFilter = (category: keyof AcceleratorFilters, value: string) => {
    if (category === 'search') return;
    const currentValues = stagedFilters[category] as string[];
    let newValues;
    if (currentValues.includes(value)) {
      newValues = currentValues.filter((v: string) => v !== value);
    } else {
      newValues = [...currentValues, value];
    }
    setStagedFilters({ ...stagedFilters, [category]: newValues });
  };

  const applyFilters = () => {
    updateUrlAndState(stagedFilters);
  };

  const clearSearch = () => {
    setSearchText('');
    const newFilters = { ...appliedFilters, search: [] };
    updateUrlAndState(newFilters);
  };

  const clearFilters = () => {
    const newFilters = { ...emptyFilters, search: appliedFilters.search };
    setStagedFilters(newFilters);
    updateUrlAndState(newFilters);
  };

  const resetAll = () => {
    setSearchText('');
    setStagedFilters({ ...emptyFilters });
    updateUrlAndState({ ...emptyFilters });
  };

  const removeFilter = (category: keyof AcceleratorFilters, value: string) => {
    const newFilters = { ...appliedFilters };
    if (category === 'search') {
      newFilters.search = [];
      setSearchText('');
    } else {
      newFilters[category] = (newFilters[category] as string[]).filter(v => v !== value);
    }
    updateUrlAndState(newFilters);
  };

  return (
    <div ref={filterRef} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        <div className="flex items-center gap-2">
          {hasActiveAcceleratorSearch(appliedFilters) && (
            <button
              onClick={clearSearch}
              className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              Clear Search
            </button>
          )}
          {hasActiveAcceleratorFilters(appliedFilters) && (
            <button
              onClick={clearFilters}
              className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              Clear Filters
            </button>
          )}
          {(hasActiveAcceleratorSearch(appliedFilters) || hasActiveAcceleratorFilters(appliedFilters)) && (
            <button
              onClick={resetAll}
              className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              Reset All
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <div className="relative flex-1 flex gap-2">
          <input
            type="text"
            placeholder="Search accelerators..."
            value={searchText}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearchClick}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition flex items-center gap-2"
          >
            <Search className="w-5 h-5" />
            Search
          </button>
        </div>
        <FilterDropdown
          label="Affiliation"
          options={AFFILIATIONS}
          selectedValues={stagedFilters.affiliation}
          isOpen={activeDropdown === 'Affiliation'}
          onToggle={() => setActiveDropdown(activeDropdown === 'Affiliation' ? null : 'Affiliation')}
          onOptionChange={(value) => toggleStagedFilter('affiliation', value)}
        />
        <FilterDropdown
          label="Tags"
          options={TAGS}
          selectedValues={stagedFilters.tags}
          isOpen={activeDropdown === 'Tags'}
          onToggle={() => setActiveDropdown(activeDropdown === 'Tags' ? null : 'Tags')}
          onOptionChange={(value) => toggleStagedFilter('tags', value)}
        />
        <FilterDropdown
          label="Status"
          options={APPLICATION_STATUS}
          selectedValues={stagedFilters.applicationStatus}
          isOpen={activeDropdown === 'Status'}
          onToggle={() => setActiveDropdown(activeDropdown === 'Status' ? null : 'Status')}
          onOptionChange={(value) => toggleStagedFilter('applicationStatus', value)}
        />
        <FilterDropdown
          label="Equity"
          options={EQUITY_RANGES}
          selectedValues={stagedFilters.equityRange}
          isOpen={activeDropdown === 'Equity'}
          onToggle={() => setActiveDropdown(activeDropdown === 'Equity' ? null : 'Equity')}
          onOptionChange={(value) => toggleStagedFilter('equityRange', value)}
        />
        <FilterDropdown
          label="Funding"
          options={FUNDING_RANGES}
          selectedValues={stagedFilters.fundingRange}
          isOpen={activeDropdown === 'Funding'}
          onToggle={() => setActiveDropdown(activeDropdown === 'Funding' ? null : 'Funding')}
          onOptionChange={(value) => toggleStagedFilter('fundingRange', value)}
        />
        <FilterDropdown
          label="Duration"
          options={DURATION_RANGES}
          selectedValues={stagedFilters.durationRange}
          isOpen={activeDropdown === 'Duration'}
          onToggle={() => setActiveDropdown(activeDropdown === 'Duration' ? null : 'Duration')}
          onOptionChange={(value) => toggleStagedFilter('durationRange', value)}
        />
        {JSON.stringify(stagedFilters) !== JSON.stringify(appliedFilters) && (
          <button
            onClick={applyFilters}
            className="ml-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
          >
            Apply Filters
          </button>
        )}
      </div>
      {(hasActiveAcceleratorSearch(appliedFilters) || hasActiveAcceleratorFilters(appliedFilters)) && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-700">Active Filters</h3>
            <span className="text-sm text-gray-500">
              {Object.values(appliedFilters).flat().length} applied
            </span>
          </div>
          <AcceleratorFilterChips filters={appliedFilters} onRemove={removeFilter} />
        </div>
      )}
    </div>
  );
};

export default AcceleratorFilters; 