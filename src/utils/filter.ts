import { IncubatorFilters } from '../components/incubators/IncubatorFilters';
import { AcceleratorFilters } from '../components/accelerators/AcceleratorFilters';

type FilterType = IncubatorFilters | AcceleratorFilters;

export const hasActiveFilters = (filters: FilterType): boolean => {
  return Object.entries(filters).some(([key, value]) => {
    if (key === 'search') return false;
    return Array.isArray(value) && value.length > 0;
  });
};

export const hasActiveSearch = (filters: FilterType): boolean => {
  return filters.search.length > 0;
};

export const parseQueryToFilters = (query: Record<string, string>): FilterType => {
  const filters: Record<string, string[]> = {
    affiliation: [],
    applicationStatus: [],
    search: [],
  };
  
  Object.entries(query).forEach(([key, value]) => {
    if (key === 'search') {
      filters[key] = [value];
    } else {
      filters[key] = value.split(',');
    }
  });

  // Add accelerator-specific fields if they exist in the query
  if ('tags' in query) {
    filters.tags = query.tags.split(',');
  }
  if ('equityRange' in query) {
    filters.equityRange = query.equityRange.split(',');
  }
  if ('fundingRange' in query) {
    filters.fundingRange = query.fundingRange.split(',');
  }
  if ('durationRange' in query) {
    filters.durationRange = query.durationRange.split(',');
  }

  // Add incubator-specific fields if they exist in the query
  if ('sectors' in query) {
    filters.sectors = query.sectors.split(',');
  }
  if ('state' in query) {
    filters.state = query.state.split(',');
  }

  // Determine if this is an accelerator or incubator filter set
  const isAccelerator = 'tags' in filters && 'equityRange' in filters && 'fundingRange' in filters && 'durationRange' in filters;
  const isIncubator = 'sectors' in filters && 'state' in filters;

  if (isAccelerator) {
    return {
      affiliation: filters.affiliation,
      applicationStatus: filters.applicationStatus,
      tags: filters.tags || [],
      equityRange: filters.equityRange || [],
      fundingRange: filters.fundingRange || [],
      durationRange: filters.durationRange || [],
      search: filters.search,
    } as AcceleratorFilters;
  } else if (isIncubator) {
    return {
      affiliation: filters.affiliation,
      applicationStatus: filters.applicationStatus,
      sectors: filters.sectors || [],
      state: filters.state || [],
      search: filters.search,
    } as IncubatorFilters;
  }

  // Default to incubator filters if type cannot be determined
  return {
    affiliation: [],
    applicationStatus: [],
    sectors: [],
    state: [],
    search: [],
  } as IncubatorFilters;
};

export const filtersToQuery = (filters: FilterType): Record<string, string> => {
  const query: Record<string, string> = {};
  
  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value) && value.length > 0) {
      query[key] = value.join(',');
    }
  });

  return query;
}; 