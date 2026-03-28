/**
 * Cart-related React Query hooks for Next.js 16.
 * Refactored from legacy hooks/cart.hooks.ts.
 * Provides hooks for fetching and managing user cart.
 */

import { useMutation, useQuery, useQueryClient, type UseQueryOptions } from '@tanstack/react-query';
import { cartApi } from '@/services/cart.service';
import type { Cart } from '@/types/cart';
import { QUERY_KEYS } from './api-constants';
import { defaultQueryOptions } from './api-utils';

/**
 * Fetch current user's cart
 */
export function useCart(options?: Omit<UseQueryOptions<Cart>, 'queryKey' | 'queryFn'>) {
  return useQuery({
    queryKey: QUERY_KEYS.cart.detail(),
    queryFn: async () => {
      const response = await cartApi.get();
      return response.data;
    },
    ...defaultQueryOptions,
    ...options,
  });
}

/**
 * Add item to cart
 */
export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, quantity = 1 }: { productId: string; quantity?: number }) =>
      cartApi.addItem(productId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.cart.all });
    },
  });
}

/**
 * Update cart item quantity
 */
export function useUpdateCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: string; quantity: number }) =>
      cartApi.updateItem(itemId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.cart.all });
    },
  });
}

/**
 * Remove item from cart
 */
export function useRemoveFromCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemId: string) => cartApi.removeItem(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.cart.all });
    },
  });
}

/**
 * Clear entire cart
 */
export function useClearCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => cartApi.clear(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.cart.all });
    },
  });
}
