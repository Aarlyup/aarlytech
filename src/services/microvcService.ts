import { api } from '../config/api';

export interface MicroVC {
  _id: string;
  name: string;
  logo_url: string;
  location: string;
  focus: string;
  cheque_size: string;
  sectors: string[];
  total_companies: number;
  total_funding: string;
  description: string;
  application_method: string;
  portfolio_url: string;
  website_url: string;
  email: string;
  linkedin_url: string;
  createdAt: string;
  updatedAt: string;
}

export interface MicroVCFilters {
  page?: number;
  limit?: number;
  search?: string;
  focus?: string;
  sectors?: string;
  state?: string;
}

export interface MicroVCResponse {
  microvcs: MicroVC[];
  totalPages: number;
  currentPage: number;
  total: number;
}

export const microvcService = {
  // Get all microvcs with filters
  async getMicroVCs(filters: MicroVCFilters = {}): Promise<MicroVCResponse> {
    const queryParams = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        queryParams.append(key, value.toString());
      }
    });

    const queryString = queryParams.toString();
    const endpoint = `/microvcs${queryString ? `?${queryString}` : ''}`;
    
    return api.get(endpoint);
  },

  // Get single microvc
  async getMicroVC(id: string): Promise<MicroVC> {
    return api.get(`/microvcs/${id}`);
  },

  // Create microvc
  async createMicroVC(data: Partial<MicroVC>): Promise<MicroVC> {
    return api.post('/microvcs', data);
  },

  // Update microvc
  async updateMicroVC(id: string, data: Partial<MicroVC>): Promise<MicroVC> {
    return api.put(`/microvcs/${id}`, data);
  },

  // Delete microvc
  async deleteMicroVC(id: string): Promise<{ message: string }> {
    return api.delete(`/microvcs/${id}`);
  },
};