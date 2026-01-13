/**
 * Orders and Payments React Query hooks
 * @module hooks/orders
 */

import { useQuery, useMutation, useQueryClient, type UseQueryOptions } from '@tanstack/react-query';
import { ordersApi } from '@/services/api';
import { QUERY_KEYS } from './api.constants';
import { normalizeListResponse, defaultQueryOptions } from './api.utils';
import type { Order } from '@/types';

/**
 * Fetch user's orders list
 */
export function useOrders(
  options?: Omit<UseQueryOptions<Order[]>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: QUERY_KEYS.orders.lists(),
    queryFn: async () => {
      const response = await ordersApi.list();
      return normalizeListResponse<Order>(response.data);
    },
    ...defaultQueryOptions,
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
    ...defaultQueryOptions,
    ...options,
  });
}

/**
 * Create new order
 */
export function useCreateOrder() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (orderData: any) => ordersApi.create(orderData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.orders.all });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.cart.all });
    },
  });
}

/**
 * Update order status (admin)
 */
export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ orderId, status }: { orderId: string; status: string }) =>
      ordersApi.updateStatus(orderId, status),
    onSuccess: (_, variables) => {
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

