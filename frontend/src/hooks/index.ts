/**
 * API Hooks Barrel Export
 * Centralized export for all React Query hooks
 * @module hooks
 */

// Constants & Utilities
export { API_DEFAULTS, QUERY_KEYS } from './api.constants';
export { 
  normalizePaginatedResponse, 
  normalizeListResponse, 
  extractErrorMessage,
  buildQueryParams,
  defaultQueryOptions,
  defaultMutationOptions,
} from './api.utils';

// Products
export {
  useProducts,
  useProductsPaginated,
  useProduct,
  useFeaturedProducts,
  useRelatedProducts,
  useCategories,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
  useDuplicateProduct,
  useUploadProductImage,
  useBulkDeleteProducts,
  useBulkActivateProducts,
  useBulkDeactivateProducts,
} from './products.hooks';

// Cart
export {
  useCart,
  useAddToCart,
  useUpdateCartItem,
  useRemoveFromCart,
  useClearCart,
} from './cart.hooks';

// Orders & Payments
export {
  useOrders,
  useOrder,
  useCreateOrder,
  useUpdateOrderStatus,
  useCancelOrder,
} from './orders.hooks';

// Payments
export {
  useInitializePayment,
  useVerifyPayment,
} from './payments.hooks';

// Reviews & Quotes
export {
  useReviews,
  useCreateReview,
  useUpdateReview,
  useDeleteReview,
} from './reviews.hooks';

// Quotes
export {
  useCreateQuote,
} from './quotes.hooks';

// Blog
export {
  useBlogPosts,
  useBlogPost,
  useBlogCategories,
} from './blog.hooks';

// Core
export {
  useTeam,
  useFAQs,
  useCaseStudies,
  useSubmitContact,
  useSubmitTicket,
  useCheckWarranty,
  useSubscribeNewsletter,
} from './core.hooks';
