/**
 * Quotes API Service
 * Handles quote requests for custom projects
 */
import { apiClient } from '@/lib/axiosInstance';

export const quotesApi = {
  create: (data: {
    name: string;
    email: string;
    phone: string;
    message: string;
    products?: string[];
  }) => apiClient.post('/quotes/', data),
};
