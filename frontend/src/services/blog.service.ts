/**
 * Blog API Service
 * Handles blog posts and categories
 */
import { apiClient } from '@/lib/axiosInstance';

export const blogApi = {
  listPosts: (params?: { 
    category?: string; 
    page?: number;
    per_page?: number;
    search?: string;
  }) => apiClient.get('/blog/posts/', { params }),
  
  getPost: (slug: string) => 
    apiClient.get(`/blog/posts/${slug}/`),
  
  categories: () => 
    apiClient.get('/blog/categories/'),
};
