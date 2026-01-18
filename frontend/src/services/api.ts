/**
 * API client for Pentorax backend
 * Comprehensive API service layer
 */
import { apiClient } from '@/lib/axiosInstance';

// ===========================
// Products API
// ===========================
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

// ===========================
// Cart API
// ===========================
export const cartApi = {
  get: () => apiClient.get('/cart/items/'),
  
  addItem: (productId: string, quantity: number) =>
    apiClient.post('/cart/items/', { product_id: productId, quantity }),
  
  updateItem: (itemId: string, quantity: number) =>
    apiClient.patch(`/cart/items/${itemId}/`, { quantity }),
  
  removeItem: (itemId: string) => 
    apiClient.delete(`/cart/items/${itemId}/`),
  
  clear: () => 
    apiClient.delete('/cart/items/clear/'),
  
  merge: (sessionKey: string) =>
    apiClient.post('/cart/items/merge_cart/', { session_key: sessionKey }),
};

// ===========================
// Orders API
// ===========================
export const ordersApi = {
  create: (data: any) => 
    apiClient.post('/orders/create_order/', data),
  
  list: () => 
    apiClient.get('/orders/'),
  
  get: (id: string) => 
    apiClient.get(`/orders/${id}/`),
  
  updateStatus: (orderId: string, status: string) =>
    apiClient.patch(`/orders/${orderId}/update_status/`, { status }),
  
  cancel: (orderId: string) =>
    apiClient.post(`/orders/${orderId}/cancel/`),
};

// ===========================
// Wishlist API
// ===========================
export const wishlistApi = {
  /**
   * Get current user's wishlist
   */
  get: () => apiClient.get('/products/wishlist/'),
  
  /**
   * Add product to wishlist
   */
  addItem: (productId: string, notes?: string) => 
    apiClient.post('/products/wishlist/add_item/', { 
      product_id: productId,
      notes: notes || ''
    }),
  
  /**
   * Remove product from wishlist
   */
  removeItem: (productId: string) => 
    apiClient.delete(`/products/wishlist/remove_item/${productId}/`),
  
  /**
   * Clear entire wishlist
   */
  clear: () => apiClient.delete('/products/wishlist/clear/'),
};

/**
 * Stock Notifications API endpoints
 * Manages email alerts for out-of-stock products
 */
export const stockNotificationsApi = {
  /**
   * Subscribe to stock notifications for a product (Public)
   */
  subscribe: (productId: string, email: string) =>
    apiClient.post('/products/stock-notifications/subscribe/', { 
      product_id: productId,
      email 
    }),
  
  /**
   * Unsubscribe from stock notifications (Public)
   */
  unsubscribe: (productId: string, email: string) =>
    apiClient.delete('/products/stock-notifications/unsubscribe/', {
      data: { product_id: productId, email }
    }),
  
  /**
   * List all stock notifications with pagination and filters (Admin/Staff)
   */
  list: (params?: {
    page?: number;
    per_page?: number;
    search?: string;
    is_read?: boolean;
    is_archived?: boolean;
    is_notified?: boolean;
    product_id?: string;
  }) => apiClient.get('/products/stock-notifications/', { params }),
  
  /**
   * Get notification statistics (Admin/Staff)
   */
  getStats: () => apiClient.get('/products/stock-notifications/stats/'),
  
  /**
   * Mark notification as read (Admin/Staff)
   */
  markRead: (id: string) => 
    apiClient.post(`/products/stock-notifications/${id}/mark_read/`),
  
  /**
   * Mark notification as unread (Admin/Staff)
   */
  markUnread: (id: string) => 
    apiClient.post(`/products/stock-notifications/${id}/mark_unread/`),
  
  /**
   * Archive notification (Admin/Staff)
   */
  archive: (id: string) => 
    apiClient.post(`/products/stock-notifications/${id}/archive/`),
  
  /**
   * Unarchive notification (Admin/Staff)
   */
  unarchive: (id: string) => 
    apiClient.post(`/products/stock-notifications/${id}/unarchive/`),
  
  /**
   * Send custom email to a single subscriber (Admin/Staff)
   */
  sendCustomEmail: (id: string, subject: string, message: string) =>
    apiClient.post(`/products/stock-notifications/${id}/send_custom_email/`, {
      subject,
      message
    }),
  
  /**
   * Generate AI-powered email content (Admin/Staff)
   */
  generateEmail: (notificationId?: string, notificationIds?: string[]) =>
    apiClient.post('/products/stock-notifications/generate_email/', {
      notification_id: notificationId,
      notification_ids: notificationIds,
    }),
  
  /**
   * Send custom email to multiple subscribers (Admin/Staff)
   */
  bulkSendEmail: (ids: string[], subject: string, message: string) =>
    apiClient.post('/products/stock-notifications/bulk_send_email/', {
      ids,
      subject,
      message
    }),
};

// ===========================
// Payments API
// ===========================
export const paymentsApi = {
  initialize: (orderId: string) =>
    apiClient.post('/payments/initialize/', { order_id: orderId }),
  
  verify: (reference: string) =>
    apiClient.post('/payments/verify/', { reference }),
};

// ===========================
// Reviews API
// ===========================
export const reviewsApi = {
  list: (productId: string) => 
    apiClient.get('/reviews/', { params: { product_id: productId } }),
  
  create: (productId: string, data: { rating: number; comment: string }) =>
    apiClient.post('/reviews/', { product_id: productId, ...data }),
  
  update: (reviewId: string, data: { rating: number; comment: string }) =>
    apiClient.patch(`/reviews/${reviewId}/`, data),
  
  delete: (reviewId: string) =>
    apiClient.delete(`/reviews/${reviewId}/`),
};

// ===========================
// Quotes API
// ===========================
export const quotesApi = {
  create: (data: { 
    name: string; 
    email: string; 
    phone: string; 
    message: string;
    products?: string[];
  }) => apiClient.post('/quotes/', data),
};

// ===========================
// Blog API
// ===========================
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

// ===========================
// Core App API
// ===========================
export const coreApi = {
  // Team
  team: () => 
    apiClient.get('/team/'),
  
  // FAQs
  faqs: (params?: { category?: string; search?: string }) =>
    apiClient.get('/faqs/', { params }),
  
  // Case Studies
  caseStudies: () => 
    apiClient.get('/case-studies/'),
  
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

// ===========================
// Newsletter API
// ===========================
export const newsletterApi = {
  subscribe: (data: { email: string; full_name: string }) =>
    apiClient.post('/newsletter/subscribe/', data),
  
  unsubscribe: (token: string) =>
    apiClient.post('/newsletter/unsubscribe/', { token }),
  
  list: (params?: { is_active?: boolean; search?: string }) =>
    apiClient.get('/newsletter/', { params }),
  
  export: () =>
    apiClient.get('/newsletter/export/', { responseType: 'blob' }),
};
