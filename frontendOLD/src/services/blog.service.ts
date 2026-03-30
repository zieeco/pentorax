/**
 * Blog API Service
 * Handles blog posts and categories
 */
import { apiClient } from '@/lib/axiosInstance';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string; // HTML/Markdown from Tiptap
  excerpt?: string;
  featured_image?: string;
  status: 'draft' | 'published';
  author?: {
    name: string;
    avatar?: string;
  };
  created_at: string;
  updated_at: string;
  category?: string;
}

export interface CreateBlogDTO {
  title: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  status: 'draft' | 'published';
  category_id?: string;
}

export const blogApi = {
  // Public
  listPosts: (params?: { 
    category?: string; 
    page?: number;
    per_page?: number;
    search?: string;
    status?: 'published' | 'draft' | 'all';
  }) => apiClient.get('/blog/posts/', { params }),
  
  getPost: (slug: string) => 
    apiClient.get(`/blog/posts/${slug}/`),
  
  categories: () => 
    apiClient.get('/blog/categories/'),

  // Admin CRUD
  createPost: (data: CreateBlogDTO) =>
    apiClient.post('/blog/posts/', data),

  updatePost: (id: string, data: Partial<CreateBlogDTO>) =>
    apiClient.patch(`/blog/posts/${id}/`, data),

  deletePost: (id: string) =>
    apiClient.delete(`/blog/posts/${id}/`),

  // Media
  uploadImage: (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    return apiClient.post('/blog/media/upload/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};
