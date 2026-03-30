/**
 * Newsletter API Service
 * Handles newsletter subscriptions and management
 */
import { apiClient } from '@/lib/axiosInstance';

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
