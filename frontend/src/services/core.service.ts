/**
 * Core API Service
 * Precision-engineered interfaces for team, faqs, and support.
 */
import { apiClient } from '@/lib/axiosInstance';

export const coreApi = {
  team: () => apiClient.get('/team/'),

  faqs: (params?: { category?: string; search?: string }) => apiClient.get('/faqs/', { params }),

  caseStudies: () => apiClient.get('/case-studies/'),

  submitContact: (data: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  }) => apiClient.post('/contact/', data),

  submitTicket: (data: {
    subject: string;
    category: string;
    description: string;
    customer_name: string;
    customer_email: string;
    customer_phone?: string;
  }) => apiClient.post('/support/tickets/', data),

  checkWarranty: (serialNumber: string) =>
    apiClient.post('/support/warranty/check/', { serial_number: serialNumber }),
};
