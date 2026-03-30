/**
 * Orders API Service
 * Handles order creation and management
 */
import { apiClient } from '@/lib/axiosInstance';

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
