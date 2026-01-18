/**
 * Products API Service
 * Handles all product-related API calls
 */
import { apiClient } from '@/lib/axiosInstance';

export const productsApi = {
  list: (params?: {
    category?: string;
    min_price?: number;
    max_price?: number;
    search?: string;
    featured?: boolean;
    in_stock?: boolean;
    page?: number;
    per_page?: number;
    sort?: string;
    order?: 'asc' | 'desc';
  }) => apiClient.get('/products/', { params }),
  
  get: (slug: string) => apiClient.get(`/products/${slug}/`),
  
  featured: () => apiClient.get('/products/featured/'),
  
  categories: () => apiClient.get('/products/categories/'),
  
  category: (slug: string) => apiClient.get(`/products/categories/${slug}/`),

  related: (categoryId: string, excludeProductId: string, params?: { limit?: number }) => 
    apiClient.get('/products/', { 
      params: { 
        category_id: categoryId, 
        exclude_id: excludeProductId,
        per_page: params?.limit || 4,
      } 
    }),

  // Admin CRUD operations
  create: (data: {
    name: string;
    slug?: string;
    description: string;
    short_description?: string;
    price: string;
    compare_at_price?: string;
    category_id: string;
    featured_image?: string;
    is_active?: boolean;
    is_featured?: boolean;
    sku?: string;
    stock_quantity?: number;
    low_stock_threshold?: number;
  }) => apiClient.post('/products/', data),

  update: (slug: string, data: Partial<{
    name: string;
    description: string;
    short_description: string;
    price: string;
    compare_at_price: string;
    category_id: string;
    featured_image: string;
    is_active: boolean;
    is_featured: boolean;
    sku: string;
    stock_quantity: number;
    low_stock_threshold: number;
  }>) => apiClient.patch(`/products/${slug}/`, data),

  delete: (slug: string) => apiClient.delete(`/products/${slug}/`),

  duplicate: (slug: string) => apiClient.post(`/products/${slug}/duplicate/`),

  // Image upload
  uploadImage: (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    return apiClient.post('/products/upload_image/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },

  // Bulk operations
  bulkDelete: (ids: string[]) => 
    apiClient.post('/products/bulk_delete/', { ids }),

  bulkActivate: (ids: string[]) => 
    apiClient.post('/products/bulk_activate/', { ids }),

  bulkDeactivate: (ids: string[]) => 
    apiClient.post('/products/bulk_deactivate/', { ids }),
  
  // AI-powered specification generation
  generateSpecifications: (data: {
    image_url: string;
    product_name?: string;
    product_description?: string;
  }) => apiClient.post('/products/generate_specifications/', data),
  
  // AI-powered description refinement
  refineDescription: (data: {
    description: string;
    product_name?: string;
  }) => apiClient.post('/products/refine_description/', data),
};
