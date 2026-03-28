/**
 * API Utility Functions for Next.js 16.
 * Refactored from legacy api.utils.ts.
 * Provides response normalization and error handling for React Query.
 */

import { API_DEFAULTS } from './api-constants';

/**
 * Normalize paginated API response
 */
export function normalizePaginatedResponse<T>(
  data: any,
  params?: { page?: number; per_page?: number }
) {
  const perPage = params?.per_page || API_DEFAULTS.PAGINATION.DEFAULT_PER_PAGE;
  const currentPage = params?.page || API_DEFAULTS.PAGINATION.DEFAULT_PAGE;
  const results = data.results || data || [];
  const totalCount = data.count || results.length;
  const totalPages = Math.ceil(totalCount / perPage);

  return {
    results: results as T[],
    count: totalCount,
    currentPage: currentPage,
    totalPages,
    hasNext: !!data.next,
    hasPrevious: !!data.previous,
  };
}

/**
 * Normalize list response (handles both paginated and non-paginated)
 */
export function normalizeListResponse<T>(data: any): T[] {
  return (data.results || data || []) as T[];
}

/**
 * Extract error message from API error
 */
export function extractErrorMessage(error: any): string {
  if (error?.response?.data?.detail) {
    return error.response.data.detail;
  }

  if (error?.response?.data?.message) {
    return error.response.data.message;
  }

  if (error?.message) {
    return error.message;
  }

  return 'An unexpected error occurred';
}

/**
 * Build query params string
 */
export function buildQueryParams(params?: Record<string, any>): string {
  if (!params) return '';

  const filtered = Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

  return filtered ? `?${filtered}` : '';
}

/**
 * Default query options for React Query v5
 */
export const defaultQueryOptions = {
  staleTime: API_DEFAULTS.CACHE.STALE_TIME,
  gcTime: API_DEFAULTS.CACHE.CACHE_TIME, // v5 uses gcTime instead of cacheTime
  retry: API_DEFAULTS.RETRY.MAX_RETRIES,
  retryDelay: API_DEFAULTS.RETRY.RETRY_DELAY,
  refetchOnWindowFocus: false,
};

/**
 * Default mutation options for React Query
 */
export const defaultMutationOptions = {
  retry: 1,
};
