import { AcceleratorFilters } from '../components/accelerators/AcceleratorFilters';

export const hasActiveAcceleratorFilters = (filters: AcceleratorFilters): boolean => {
  return Object.entries(filters).some(([key, value]) => {
    if (key === 'search') return false;
    return Array.isArray(value) && value.length > 0;
  });
};

export const hasActiveAcceleratorSearch = (filters: AcceleratorFilters): boolean => {
  return filters.search.length > 0;
};

export const parseAcceleratorQueryToFilters = (query: Record<string, string>): AcceleratorFilters => {
  return {
    affiliation: query.affiliation ? query.affiliation.split(',') : [],
    applicationStatus: query.applicationStatus ? query.applicationStatus.split(',') : [],
    tags: query.tags ? query.tags.split(',') : [],
    equityRange: query.equityRange ? query.equityRange.split(',') : [],
    fundingRange: query.fundingRange ? query.fundingRange.split(',') : [],
    durationRange: query.durationRange ? query.durationRange.split(',') : [],
    search: query.search ? [query.search] : [],
  };
};

export const acceleratorFiltersToQuery = (filters: AcceleratorFilters): Record<string, string> => {
  const query: Record<string, string> = {};
  
  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value) && value.length > 0) {
      query[key] = value.join(',');
    }
  });

  return query;
}; 