/**
 * API Utility Functions
 * Response normalization and error handling
 */
/**
 * Normalize paginated API response
 */
export declare function normalizePaginatedResponse<T>(data: any, params?: {
    page?: number;
    per_page?: number;
}): {
    results: any;
    count: any;
    page: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
};
/**
 * Normalize list response (handles both paginated and non-paginated)
 */
export declare function normalizeListResponse<T>(data: any): T[];
/**
 * Extract error message from API error
 */
export declare function extractErrorMessage(error: any): string;
/**
 * Build query params string
 */
export declare function buildQueryParams(params?: Record<string, any>): string;
/**
 * Default query options for React Query
 */
export declare const defaultQueryOptions: {
    staleTime: number;
    cacheTime: number;
    retry: 3;
    retryDelay: 1000;
    refetchOnWindowFocus: boolean;
};
/**
 * Default mutation options for React Query
 */
export declare const defaultMutationOptions: {
    retry: number;
};
