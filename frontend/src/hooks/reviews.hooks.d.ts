/**
 * Reviews and Quotes React Query hooks
 * @module hooks/reviews-quotes
 */
import { type UseQueryOptions } from '@tanstack/react-query';
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
/**
 * Fetch reviews for a product
 */
export declare function useReviews(productId: string, options?: Omit<UseQueryOptions<Review[]>, 'queryKey' | 'queryFn'>): import("@tanstack/react-query").UseQueryResult<Review[], Error>;
/**
 * Create product review
 */
export declare function useCreateReview(): import("@tanstack/react-query").UseMutationResult<import("axios").AxiosResponse<any, any>, Error, {
    productId: string;
    data: {
        rating: number;
        comment: string;
    };
}, unknown>;
/**
 * Update review
 */
export declare function useUpdateReview(): import("@tanstack/react-query").UseMutationResult<import("axios").AxiosResponse<any, any>, Error, {
    reviewId: string;
    productId: string;
    data: {
        rating: number;
        comment: string;
    };
}, unknown>;
/**
 * Delete review
 */
export declare function useDeleteReview(): import("@tanstack/react-query").UseMutationResult<import("axios").AxiosResponse<any, any>, Error, {
    reviewId: string;
    productId: string;
}, unknown>;
export {};
