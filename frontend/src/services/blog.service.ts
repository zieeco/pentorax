/**
 * Blog API Service
 * Precision-engineered interfaces for blog posts and categories.
 */
import { apiClient } from '@/lib/api-client';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  category: string | { name: string; slug: string };
  author?: { name: string; image: string; bio?: string };
  created_at: string;
  read_time?: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  post_count: number;
}

export const blogApi = {
  posts: (params?: { category?: string; search?: string; limit?: number; offset?: number }) =>
    apiClient.get('/blog/posts/', { params }),

  post: (slug: string) => apiClient.get(`/blog/posts/${slug}/`),

  categories: () => apiClient.get('/blog/categories/'),
};
