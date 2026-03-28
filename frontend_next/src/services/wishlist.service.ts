import { apiClient } from '@/lib/axiosInstance';

/**
 * Wishlist API Service
 * Handles user wishlist operations
 */

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
      notes: notes || '',
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
