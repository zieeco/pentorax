/**
 * Reviews and Quotes React Query hooks
 * @module hooks/reviews-quotes
 */

import { useQuery, useMutation, useQueryClient, type UseQueryOptions } from '@tanstack/react-query';
import { reviewsApi } from '@/services/api';
import { QUERY_KEYS } from './api.constants';
import { normalizeListResponse, defaultQueryOptions } from './api.utils';

interface Review {
  id: string;
  product_id: string;
  user_id: string;
  user_email: string;
  rating: number;
  comment: string;
  is_verified_purchase: boolean;
  created_at: string;
}

// ===========================
// Review Hooks
// ===========================

/**
 * Fetch reviews for a product
 */
export function useReviews(
  productId: string,
  options?: Omit<UseQueryOptions<Review[]>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: QUERY_KEYS.reviews.list(productId),
    queryFn: async () => {
      const response = await reviewsApi.list(productId);
      return normalizeListResponse<Review>(response.data);
    },
    enabled: !!productId,
    ...defaultQueryOptions,
    ...options,
  });
}

/**
 * Create product review
 */
export function useCreateReview() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ productId, data }: { productId: string; data: { rating: number; comment: string } }) =>
      reviewsApi.create(productId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.reviews.list(variables.productId) });
    },
  });
}

/**
 * Update review
 */
export function useUpdateReview() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ 
      reviewId, 
      productId, 
      data 
    }: { 
      reviewId: string; 
      productId: string; 
      data: { rating: number; comment: string } 
    }) => reviewsApi.update(reviewId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.reviews.list(variables.productId) });
    },
  });
}

/**
 * Delete review
 */
export function useDeleteReview() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ reviewId, productId }: { reviewId: string; productId: string }) =>
      reviewsApi.delete(reviewId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.reviews.list(variables.productId) });
    },
  });
}

