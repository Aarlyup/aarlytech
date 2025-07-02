import { api } from '../config/api';

export interface Accelerator {
  _id: string;
  name: string;
  logo_url: string;
  state: string;
  affiliation: string;
  tags: string[];
  application_status: string;
  batch_frequency: string;
  equity_taken: string;
  funding_offered: string;
  duration_weeks: number;
  total_startups_supported: number;
  funded_startup_percent: number;
  company_email: string;
  company_linkedin: string;
  poc_email: string;
  poc_linkedin: string;
  description: string;
  website_url: string;
  sectors_supported: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AcceleratorFilters {
  page?: number;
  limit?: number;
  search?: string;
  affiliation?: string;
  applicationStatus?: string;
  tags?: string;
  equityRange?: string;
  fundingRange?: string;
  durationRange?: string;
}

export interface AcceleratorResponse {
  accelerators: Accelerator[];
  totalPages: number;
  currentPage: number;
  total: number;
}

export const acceleratorService = {
  // Get all accelerators with filters
  async getAccelerators(filters: AcceleratorFilters = {}): Promise<AcceleratorResponse> {
    const queryParams = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        queryParams.append(key, value.toString());
      }
    });

    const queryString = queryParams.toString();
    const endpoint = `/accelerators${queryString ? `?${queryString}` : ''}`;
    
    return api.get(endpoint);
  },

  // Get single accelerator
  async getAccelerator(id: string): Promise<Accelerator> {
    return api.get(`/accelerators/${id}`);
  },

  // Create accelerator
  async createAccelerator(data: Partial<Accelerator>): Promise<Accelerator> {
    return api.post('/accelerators', data);
  },

  // Update accelerator
  async updateAccelerator(id: string, data: Partial<Accelerator>): Promise<Accelerator> {
    return api.put(`/accelerators/${id}`, data);
  },

  // Delete accelerator
  async deleteAccelerator(id: string): Promise<{ message: string }> {
    return api.delete(`/accelerators/${id}`);
  },
};