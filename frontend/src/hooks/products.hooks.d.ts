/**
 * Product-related React Query hooks
 * @module hooks/products
 */
import { type UseQueryOptions } from '@tanstack/react-query';
import { normalizePaginatedResponse } from './api.utils';
import type { Product, Category } from '@/types/product';
/**
 * Fetch products list with optional filters
 */
export declare function useProducts(params?: {
    category?: string;
    search?: string;
    min_price?: number;
    max_price?: number;
    featured?: boolean;
}, options?: Omit<UseQueryOptions<Product[]>, 'queryKey' | 'queryFn'>): import("@tanstack/react-query").UseQueryResult<Product[], Error>;
/**
 * Fetch paginated products for admin dashboard
 */
export declare function useProductsPaginated(params?: {
    category?: string;
    search?: string;
    min_price?: number;
    max_price?: number;
    featured?: boolean;
    in_stock?: boolean;
    page?: number;
    per_page?: number;
    sort?: string;
    order?: 'asc' | 'desc';
}, options?: Omit<UseQueryOptions<ReturnType<typeof normalizePaginatedResponse>>, 'queryKey' | 'queryFn'>): import("@tanstack/react-query").UseQueryResult<{
    results: any;
    count: any;
    page: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
}, Error>;
/**
 * Fetch single product by slug
 */
export declare function useProduct(slug: string, options?: Omit<UseQueryOptions<Product>, 'queryKey' | 'queryFn'>): import("@tanstack/react-query").UseQueryResult<Product, Error>;
/**
 * Fetch featured products
 */
export declare function useFeaturedProducts(options?: Omit<UseQueryOptions<Product[]>, 'queryKey' | 'queryFn'>): import("@tanstack/react-query").UseQueryResult<Product[], Error>;
/**
 * Fetch related products based on category
 */
export declare function useRelatedProducts(currentProductId: string, categoryId: string, params?: {
    limit?: number;
}, options?: Omit<UseQueryOptions<Product[]>, 'queryKey' | 'queryFn'>): import("@tanstack/react-query").UseQueryResult<Product[], Error>;
/**
 * Fetch product categories
 */
export declare function useCategories(options?: Omit<UseQueryOptions<Category[]>, 'queryKey' | 'queryFn'>): import("@tanstack/react-query").UseQueryResult<Category[], Error>;
interface CreateProductData {
    name: string;
    slug?: string;
    description: string;
    short_description?: string;
    price: string;
    compare_at_price?: string;
    category_id: string;
    featured_image?: string;
    is_active?: boolean;
    is_featured?: boolean;
    sku?: string;
    stock_quantity?: number;
    low_stock_threshold?: number;
}
interface UpdateProductData {
    name?: string;
    description?: string;
    short_description?: string;
    price?: string;
    compare_at_price?: string;
    category_id?: string;
    featured_image?: string;
    is_active?: boolean;
    is_featured?: boolean;
    sku?: string;
    stock_quantity?: number;
    low_stock_threshold?: number;
}
/**
 * Create new product
 */
export declare function useCreateProduct(): import("@tanstack/react-query").UseMutationResult<import("axios").AxiosResponse<any, any>, Error, CreateProductData, unknown>;
/**
 * Update existing product
 */
export declare function useUpdateProduct(): import("@tanstack/react-query").UseMutationResult<import("axios").AxiosResponse<any, any>, Error, {
    slug: string;
    data: UpdateProductData;
}, unknown>;
/**
 * Delete product
 */
export declare function useDeleteProduct(): import("@tanstack/react-query").UseMutationResult<import("axios").AxiosResponse<any, any>, Error, string, unknown>;
/**
 * Duplicate product
 */
export declare function useDuplicateProduct(): import("@tanstack/react-query").UseMutationResult<import("axios").AxiosResponse<any, any>, Error, string, unknown>;
/**
 * Upload product image
 */
export declare function useUploadProductImage(): import("@tanstack/react-query").UseMutationResult<import("axios").AxiosResponse<any, any>, Error, File, unknown>;
/**
 * Bulk delete products
 */
export declare function useBulkDeleteProducts(): import("@tanstack/react-query").UseMutationResult<import("axios").AxiosResponse<any, any>, Error, string[], unknown>;
/**
 * Bulk activate products
 */
export declare function useBulkActivateProducts(): import("@tanstack/react-query").UseMutationResult<import("axios").AxiosResponse<any, any>, Error, string[], unknown>;
/**
 * Bulk deactivate products
 */
export declare function useBulkDeactivateProducts(): import("@tanstack/react-query").UseMutationResult<import("axios").AxiosResponse<any, any>, Error, string[], unknown>;
export {};
