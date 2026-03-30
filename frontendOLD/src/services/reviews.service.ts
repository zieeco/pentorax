/**
 * Reviews API Service
 * Handles product reviews and ratings
 */
import { apiClient } from '@/lib/axiosInstance';

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
