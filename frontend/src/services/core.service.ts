/**
 * Core API Service
 * Handles team, FAQs, case studies, contact, support, and warranty
 */
import { apiClient } from '@/lib/axiosInstance';

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
