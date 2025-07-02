import { IncubatorFilters } from '../components/incubators/IncubatorFilters';

export const hasActiveIncubatorFilters = (filters: IncubatorFilters): boolean => {
  return Object.entries(filters).some(([key, value]) => {
    if (key === 'search') return false;
    return Array.isArray(value) && value.length > 0;
  });
};

export const hasActiveIncubatorSearch = (filters: IncubatorFilters): boolean => {
  return filters.search.length > 0;
};

export const parseIncubatorQueryToFilters = (query: Record<string, string>): IncubatorFilters => {
  return {
    affiliation: query.affiliation ? query.affiliation.split(',') : [],
    applicationStatus: query.applicationStatus ? query.applicationStatus.split(',') : [],
    sectors: query.sectors ? query.sectors.split(',') : [],
    state: query.state ? query.state.split(',') : [],
    search: query.search ? [query.search] : [],
  };
};

export const incubatorFiltersToQuery = (filters: IncubatorFilters): Record<string, string> => {
  const query: Record<string, string> = {};
  
  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value) && value.length > 0) {
      query[key] = value.join(',');
    }
  });

  return query;
}; 