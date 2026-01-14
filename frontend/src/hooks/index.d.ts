/**
 * API Hooks Barrel Export
 * Centralized export for all React Query hooks
 * @module hooks
 */
export { API_DEFAULTS, QUERY_KEYS } from './api.constants';
export { normalizePaginatedResponse, normalizeListResponse, extractErrorMessage, buildQueryParams, defaultQueryOptions, defaultMutationOptions, } from './api.utils';
export { useProducts, useProductsPaginated, useProduct, useFeaturedProducts, useRelatedProducts, useCategories, useCreateProduct, useUpdateProduct, useDeleteProduct, useDuplicateProduct, useUploadProductImage, useBulkDeleteProducts, useBulkActivateProducts, useBulkDeactivateProducts, } from './products.hooks';
export { useCart, useAddToCart, useUpdateCartItem, useRemoveFromCart, useClearCart, } from './cart.hooks';
export { useOrders, useOrder, useCreateOrder, useUpdateOrderStatus, useCancelOrder, } from './orders.hooks';
export { useInitializePayment, useVerifyPayment, } from './payments.hooks';
export { useReviews, useCreateReview, useUpdateReview, useDeleteReview, } from './reviews.hooks';
export { useCreateQuote, } from './quotes.hooks';
export { useBlogPosts, useBlogPost, useBlogCategories, } from './blog.hooks';
export { useTeam, useFAQs, useCaseStudies, useSubmitContact, useSubmitTicket, useCheckWarranty, useSubscribeNewsletter, } from './core.hooks';
