/**
 * Orders and Payments React Query hooks for Next.js 16.
 * Refactored from legacy orders.hooks.ts.
 * Uses TanStack Query v5 conventions.
 */

import { useMutation, useQuery, useQueryClient, type UseQueryOptions } from '@tanstack/react-query';
import { ordersApi } from '@/services/orders.service';
import type { Order, OrderUpdateData } from '@/types/order';
import { QUERY_KEYS } from './api-constants';
import { normalizeListResponse } from './api-utils';

/**
 * Create a new order
 */
export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => ordersApi.create(data),
    onSuccess: () => {
      // Invalidate orders list
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.orders.all });
      // Also invalidate products if stock changes
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.products.all });
    },
  });
}

/**
 * Fetch orders list (Admin/Staff view)
 * Uses normalized response processing.
 */
export function useOrders(options?: Omit<UseQueryOptions<Order[]>, 'queryKey' | 'queryFn'>) {
  return useQuery({
    queryKey: QUERY_KEYS.orders.lists(),
    queryFn: async () => {
      const response = await ordersApi.list();
      return normalizeListResponse<Order>(response.data);
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    ...options,
  });
}

/**
 * Fetch single order by ID
 */
export function useOrder(
  id: string,
  options?: Omit<UseQueryOptions<Order>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: QUERY_KEYS.orders.detail(id),
    queryFn: async () => {
      const response = await ordersApi.get(id);
      return response.data;
    },
    enabled: !!id,
    ...options,
  });
}

/**
 * Update order status (Admin)
 */
export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, status }: { orderId: string; status: Order['status'] }) =>
      ordersApi.updateStatus(orderId, status),
    onSuccess: (_, variables) => {
      // Invalidate both the list and the specific detail
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.orders.all });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.orders.detail(variables.orderId) });
    },
  });
}

/**
 * Cancel order
 */
export function useCancelOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId: string) => ordersApi.cancel(orderId),
    onSuccess: (_, orderId) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.orders.all });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.orders.detail(orderId) });
    },
  });
}
