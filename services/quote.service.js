import apiClient from '@/lib/api-client';

export const quoteService = {
  submit: async (quoteData) => {
    try {
      const response = await apiClient.post('/quotes', quoteData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Admin methods (optional for now but good to have)
  getAll: async () => {
    try {
      const response = await apiClient.get('/quotes');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  updateStatus: async (id, status) => {
    try {
      const response = await apiClient.patch(`/quotes/${id}`, { status });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  delete: async (id) => {
    try {
      const response = await apiClient.delete(`/quotes/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};
