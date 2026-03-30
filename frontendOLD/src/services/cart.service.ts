/**
 * Cart API Service
 * Handles cart operations including guest cart management
 */
import { apiClient } from '@/lib/axiosInstance';

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
