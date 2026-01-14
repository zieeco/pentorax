/**
 * Cart-related React Query hooks
 * @module hooks/cart
 */
import { type UseQueryOptions } from '@tanstack/react-query';
import type { Cart } from '@/types';
/**
 * Fetch current user's cart
 */
export declare function useCart(options?: Omit<UseQueryOptions<Cart>, 'queryKey' | 'queryFn'>): import("@tanstack/react-query").UseQueryResult<Cart, Error>;
/**
 * Add item to cart
 */
export declare function useAddToCart(): import("@tanstack/react-query").UseMutationResult<import("axios").AxiosResponse<any, any>, Error, {
    productId: string;
    quantity?: number;
}, unknown>;
/**
 * Update cart item quantity
 */
export declare function useUpdateCartItem(): import("@tanstack/react-query").UseMutationResult<import("axios").AxiosResponse<any, any>, Error, {
    itemId: string;
    quantity: number;
}, unknown>;
/**
 * Remove item from cart
 */
export declare function useRemoveFromCart(): import("@tanstack/react-query").UseMutationResult<import("axios").AxiosResponse<any, any>, Error, string, unknown>;
/**
 * Clear entire cart
 */
export declare function useClearCart(): import("@tanstack/react-query").UseMutationResult<import("axios").AxiosResponse<any, any>, Error, void, unknown>;
