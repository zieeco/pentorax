/**
 * Core application React Query hooks
 * Team, FAQs, Case Studies, Contact, Support
 * @module hooks/core
 */

import { useQuery, useMutation, type UseQueryOptions } from '@tanstack/react-query';
import { coreApi } from '@/services';
import { QUERY_KEYS } from './api.constants';
import { normalizeListResponse, defaultQueryOptions } from './api.utils';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  bio?: string;
  image: string;
  email?: string;
  linkedin?: string;
  order: number;
  is_active: boolean;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
  order?: number;
}

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  description: string;
  challenge?: string;
  solution?: string;
  results?: string;
  image?: string;
}

interface ContactData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

interface TicketData {
  subject: string;
  category: string;
  description: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
}

// ===========================
// Query Hooks
// ===========================

/**
 * Fetch team members
 */
export function useTeam(
  options?: Omit<UseQueryOptions<TeamMember[]>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: QUERY_KEYS.core.team(),
    queryFn: async () => {
      const response = await coreApi.team();
      return normalizeListResponse<TeamMember>(response.data);
    },
    ...defaultQueryOptions,
    ...options,
  });
}

/**
 * Fetch FAQs with optional filters
 */
export function useFAQs(
  params?: { category?: string; search?: string },
  options?: Omit<UseQueryOptions<FAQ[]>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: QUERY_KEYS.core.faqs(params),
    queryFn: async () => {
      const response = await coreApi.faqs(params);
      return normalizeListResponse<FAQ>(response.data);
    },
    ...defaultQueryOptions,
    ...options,
  });
}

/**
 * Fetch case studies
 */
export function useCaseStudies(
  options?: Omit<UseQueryOptions<CaseStudy[]>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: QUERY_KEYS.core.caseStudies(),
    queryFn: async () => {
      const response = await coreApi.caseStudies();
      return normalizeListResponse<CaseStudy>(response.data);
    },
    ...defaultQueryOptions,
    ...options,
  });
}

// ===========================
// Mutation Hooks
// ===========================

/**
 * Submit contact form
 */
export function useSubmitContact() {
  return useMutation({
    mutationFn: (data: ContactData) => coreApi.submitContact(data),
  });
}

/**
 * Submit support ticket
 */
export function useSubmitTicket() {
  return useMutation({
    mutationFn: (data: TicketData) => coreApi.submitTicket(data),
  });
}

/**
 * Check warranty status
 */
export function useCheckWarranty() {
  return useMutation({
    mutationFn: (serialNumber: string) => coreApi.checkWarranty(serialNumber),
  });
}

/**
 * Subscribe to newsletter
 */
export function useSubscribeNewsletter() {
  return useMutation({
    mutationFn: (email: string) => coreApi.subscribeNewsletter(email),
  });
}
