/**
 * API client for Pentorax backend
 */
import { apiClient } from '@/lib/axiosInstance';

// Products API
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
  }>) => apiClient.patch(`/products/${slug}/`, data),

  delete: (slug: string) => apiClient.delete(`/products/${slug}/`),

  duplicate: (slug: string) => apiClient.post(`/products/${slug}/duplicate/`),
};

// Cart API
export const cartApi = {
  get: () => apiClient.get('/cart/'),
  
  addItem: (productId: string, quantity: number) =>
    apiClient.post('/cart/items/', { product_id: productId, quantity }),
  
  updateItem: (itemId: string, quantity: number) =>
    apiClient.patch(`/cart/items/${itemId}/`, { quantity }),
  
  removeItem: (itemId: string) => apiClient.delete(`/cart/items/${itemId}/`),
};

// Orders API
export const ordersApi = {
  create: (data: any) => apiClient.post('/orders/', data),
  
  list: () => apiClient.get('/orders/'),
  
  get: (id: string) => apiClient.get(`/orders/${id}/`),
};

// Payments API
export const paymentsApi = {
  initialize: (orderId: string) =>
    apiClient.post('/payments/initialize/', { order_id: orderId }),
  
  verify: (reference: string) =>
    apiClient.post('/payments/verify/', { reference }),
};

// Reviews API
export const reviewsApi = {
  list: (productId: string) => apiClient.get('/reviews/', { params: { product_id: productId } }),
  
  create: (productId: string, data: { rating: number; comment: string }) =>
    apiClient.post('/reviews/', { product_id: productId, ...data }),
};

// Quotes API
export const quotesApi = {
  create: (data: { name: string; email: string; phone: string; message: string }) =>
    apiClient.post('/quotes/', data),
};

// Blog API
export const blogApi = {
  listPosts: (params?: { category?: string; page?: number }) =>
    apiClient.get('/blog/posts/', { params }),
  
  getPost: (slug: string) => apiClient.get(`/blog/posts/${slug}/`),
  
  categories: () => apiClient.get('/blog/categories/'),
};

// Core App API
export const coreApi = {
  // Team
  team: () => apiClient.get('/team/'),
  
  // FAQs
  faqs: (params?: { category?: string; search?: string }) =>
    apiClient.get('/faqs/', { params }),
  
  // Case Studies
  caseStudies: () => apiClient.get('/case-studies/'),
  
  // Contact Form
  submitContact: (data: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  }) => apiClient.post('/contact/', data),
  
  // Support Tickets
  submitTicket: (data: {
    subject: string;
    category: string;
    description: string;
    customer_name: string;
    customer_email: string;
    customer_phone?: string;
  }) => apiClient.post('/support/tickets/', data),
  
  // Warranty Check
  checkWarranty: (serialNumber: string) =>
    apiClient.post('/support/warranty/check/', { serial_number: serialNumber }),
};

