import { MicroVCFilters } from '../components/microvcs/MicroVCFilters';

export const hasActiveMicroVCFilters = (filters: MicroVCFilters): boolean => {
  return Object.entries(filters).some(([key, value]) => {
    if (key === 'search') return false;
    return Array.isArray(value) && value.length > 0;
  });
};

export const hasActiveMicroVCSearch = (filters: MicroVCFilters): boolean => {
  return Array.isArray(filters.search) && filters.search.length > 0 && filters.search[0].trim() !== '';
};

export const parseMicroVCQueryToFilters = (query: Record<string, string>): MicroVCFilters => {
  const filters: MicroVCFilters = {
    state: [],
    focus: [],
    sectors: [],
    search: [],
  };

  if (query.state) {
    filters.state = query.state.split(',').filter(Boolean);
  }
  if (query.focus) {
    filters.focus = query.focus.split(',').filter(Boolean);
  }
  if (query.sectors) {
    filters.sectors = query.sectors.split(',').filter(Boolean);
  }
  if (query.search) {
    filters.search = [query.search.trim()];
  }

  return filters;
};

export const microvcFiltersToQuery = (filters: MicroVCFilters): Record<string, string> => {
  const query: Record<string, string> = {};
  
  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value) && value.length > 0) {
      const filteredValues = value.filter(Boolean);
      if (filteredValues.length > 0) {
        query[key] = filteredValues.join(',');
      }
    }
  });

  return query;
}; 