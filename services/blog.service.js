import apiClient from '@/lib/api-client';

export const blogService = {
  /**
   * Fetch all blogs with pagination
   * @param {number} page 
   * @param {number} limit 
   */
  async getAll(page = 1, limit = 9) {
    try {
      const response = await apiClient.get(`/blogs?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('BlogService: Fetch All failed', error);
      // Return consistent fallback structure to prevent UI crashes
      return { blogs: [], total: 0, pages: 0, error: true };
    }
  },

  /**
   * Fetch a single blog by slug
   * @param {string} slug 
   */
  async getBySlug(slug) {
    if (!slug) return null;
    try {
      const response = await apiClient.get(`/blogs/slug/${slug}`);
      return response.data;
    } catch (error) {
      console.error(`BlogService: Fetch details failed for slug: ${slug}`, error);
      return null;
    }
  }
};
