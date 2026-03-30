/**
 * Payments API Service
 * Handles Paystack payment initialization and verification
 */
import { apiClient } from '@/lib/axiosInstance';

export const paymentsApi = {
  initialize: (orderId: string) =>
    apiClient.post('/payments/initialize/', { order_id: orderId }),
  
  verify: (reference: string) =>
    apiClient.post('/payments/verify/', { reference }),
};
