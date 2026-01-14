/**
 * Orders and Payments React Query hooks
 * @module hooks/orders
 */
import { type UseQueryOptions } from '@tanstack/react-query';
import type { Order } from '@/types';
/**
 * Fetch user's orders list
 */
export declare function useOrders(options?: Omit<UseQueryOptions<Order[]>, 'queryKey' | 'queryFn'>): import("@tanstack/react-query").UseQueryResult<Order[], Error>;
/**
 * Fetch single order by ID
 */
export declare function useOrder(id: string, options?: Omit<UseQueryOptions<Order>, 'queryKey' | 'queryFn'>): import("@tanstack/react-query").UseQueryResult<Order, Error>;
/**
 * Create new order
 */
export declare function useCreateOrder(): import("@tanstack/react-query").UseMutationResult<import("axios").AxiosResponse<any, any>, Error, any, unknown>;
/**
 * Update order status (admin)
 */
export declare function useUpdateOrderStatus(): import("@tanstack/react-query").UseMutationResult<import("axios").AxiosResponse<any, any>, Error, {
    orderId: string;
    status: string;
}, unknown>;
/**
 * Cancel order
 */
export declare function useCancelOrder(): import("@tanstack/react-query").UseMutationResult<import("axios").AxiosResponse<any, any>, Error, string, unknown>;
