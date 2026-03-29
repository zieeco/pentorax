/**
 * Core application React Query hooks
 * Team, FAQs, Case Studies, Contact, Support
 */
import { useMutation, useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { coreApi } from '@/services/core.service';
import { QUERY_KEYS } from './api-constants';
import { defaultQueryOptions, normalizeListResponse } from './api-utils';

export interface TeamMember {
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

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
  order?: number;
}

export function useTeam(options?: Omit<UseQueryOptions<TeamMember[]>, 'queryKey' | 'queryFn'>) {
  return useQuery({
    queryKey: QUERY_KEYS.core.team(),
    queryFn: async () => {
      const resp = await coreApi.team();
      return normalizeListResponse<TeamMember>(resp.data);
    },
    ...defaultQueryOptions,
    ...options,
  });
}

export function useFAQs(
  params?: { category?: string; search?: string },
  options?: Omit<UseQueryOptions<FAQ[]>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: QUERY_KEYS.core.faqs(params),
    queryFn: async () => {
      const resp = await coreApi.faqs(params);
      return normalizeListResponse<FAQ>(resp.data);
    },
    ...defaultQueryOptions,
    ...options,
  });
}

export function useSubmitContact() {
  return useMutation({
    mutationFn: (data: any) => coreApi.submitContact(data),
  });
}

export function useSubmitTicket() {
  return useMutation({
    mutationFn: (data: any) => coreApi.submitTicket(data),
  });
}

export function useCheckWarranty() {
  return useMutation({
    mutationFn: (sn: string) => coreApi.checkWarranty(sn),
  });
}
