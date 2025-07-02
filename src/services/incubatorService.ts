import { api } from '../config/api';

export interface Incubator {
  _id: string;
  name: string;
  logo_url: string;
  state: string;
  affiliation: string;
  tags: string[];
  application_status: string;
  funding_offered: string;
  equity_taken: string;
  duration_weeks: number;
  total_startups_supported: number;
  funded_startup_percent: number;
  startup_supporter_label: string;
  description: string;
  website_url: string;
  sectors_supported: string[];
  company_email: string;
  company_linkedin: string;
  person_of_contact: string;
  person_email: string;
  person_linkedin_url: string;
  createdAt: string;
  updatedAt: string;
}

export interface IncubatorFilters {
  page?: number;
  limit?: number;
  search?: string;
  affiliation?: string;
  applicationStatus?: string;
  sectors?: string;
  state?: string;
}

export interface IncubatorResponse {
  incubators: Incubator[];
  totalPages: number;
  currentPage: number;
  total: number;
}

export const incubatorService = {
  // Get all incubators with filters
  async getIncubators(filters: IncubatorFilters = {}): Promise<IncubatorResponse> {
    const queryParams = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        queryParams.append(key, value.toString());
      }
    });

    const queryString = queryParams.toString();
    const endpoint = `/incubators${queryString ? `?${queryString}` : ''}`;
    
    return api.get(endpoint);
  },

  // Get single incubator
  async getIncubator(id: string): Promise<Incubator> {
    return api.get(`/incubators/${id}`);
  },

  // Create incubator
  async createIncubator(data: Partial<Incubator>): Promise<Incubator> {
    return api.post('/incubators', data);
  },

  // Update incubator
  async updateIncubator(id: string, data: Partial<Incubator>): Promise<Incubator> {
    return api.put(`/incubators/${id}`, data);
  },

  // Delete incubator
  async deleteIncubator(id: string): Promise<{ message: string }> {
    return api.delete(`/incubators/${id}`);
  },
};