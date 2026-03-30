/**
 * Product-related React Query hooks
 * @module hooks/products
 */

import { useQuery, useMutation, useQueryClient, type UseQueryOptions } from '@tanstack/react-query';
import { productsApi } from '@/services';
import { QUERY_KEYS } from './api.constants';
import { normalizePaginatedResponse, normalizeListResponse, defaultQueryOptions } from './api.utils';
import type { Product, Category } from '@/types/product';

// ===========================
// Query Hooks
// ===========================

/**
 * Fetch products list with optional filters
 */
export function useProducts(
  params?: {
    category?: string;
    search?: string;
    min_price?: number;
    max_price?: number;
    featured?: boolean;
  },
  options?: Omit<UseQueryOptions<Product[]>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: QUERY_KEYS.products.list(params || {}),
    queryFn: async () => {
      const response = await productsApi.list(params);
      return normalizeListResponse<Product>(response.data);
    },
    ...defaultQueryOptions,
    ...options,
  });
}

/**
 * Fetch paginated products for admin dashboard
 */
export function useProductsPaginated(
  params?: {
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
  },
  options?: Omit<UseQueryOptions<ReturnType<typeof normalizePaginatedResponse>>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: QUERY_KEYS.products.paginated(params || {}),
    queryFn: async () => {
      const response = await productsApi.list(params);
      return normalizePaginatedResponse(response.data, params);
    },
    ...defaultQueryOptions,
    ...options,
  });
}

/**
 * Fetch single product by slug
 */
export function useProduct(
  slug: string,
  options?: Omit<UseQueryOptions<Product>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: QUERY_KEYS.products.detail(slug),
    queryFn: async () => {
      const response = await productsApi.get(slug);
      return response.data;
    },
    enabled: !!slug,
    ...defaultQueryOptions,
    ...options,
  });
}

/**
 * Fetch featured products
 */
export function useFeaturedProducts(
  options?: Omit<UseQueryOptions<Product[]>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: QUERY_KEYS.products.featured(),
    queryFn: async () => {
      const response = await productsApi.featured();
      return normalizeListResponse<Product>(response.data);
    },
    ...defaultQueryOptions,
    ...options,
  });
}

/**
 * Fetch related products based on category
 */
export function useRelatedProducts(
  currentProductId: string,
  categoryId: string,
  params?: { limit?: number },
  options?: Omit<UseQueryOptions<Product[]>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: QUERY_KEYS.products.related(currentProductId, categoryId),
    queryFn: async () => {
      const response = await productsApi.related(categoryId, currentProductId, params);
      return normalizeListResponse<Product>(response.data);
    },
    enabled: !!currentProductId && !!categoryId,
    ...defaultQueryOptions,
    ...options,
  });
}

/**
 * Fetch product categories
 */
export function useCategories(
  options?: Omit<UseQueryOptions<Category[]>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: QUERY_KEYS.categories.list(),
    queryFn: async () => {
      const response = await productsApi.categories();
      return normalizeListResponse<Category>(response.data);
    },
    ...defaultQueryOptions,
    ...options,
  });
}

// ===========================
// Mutation Hooks
// ===========================

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
export function useCreateProduct() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateProductData) => productsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.products.all });
    },
  });
}

/**
 * Update existing product
 */
export function useUpdateProduct() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ slug, data }: { slug: string; data: UpdateProductData }) =>
      productsApi.update(slug, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.products.all });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.products.detail(variables.slug) });
    },
  });
}

/**
 * Delete product
 */
export function useDeleteProduct() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (slug: string) => productsApi.delete(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.products.all });
    },
  });
}

/**
 * Duplicate product
 */
export function useDuplicateProduct() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (slug: string) => productsApi.duplicate(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.products.all });
    },
  });
}

/**
 * Upload product image
 */
export function useUploadProductImage() {
  return useMutation({
    mutationFn: (file: File) => productsApi.uploadImage(file),
  });
}

/**
 * Bulk delete products
 */
export function useBulkDeleteProducts() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (ids: string[]) => productsApi.bulkDelete(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.products.all });
    },
  });
}

/**
 * Bulk activate products
 */
export function useBulkActivateProducts() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (ids: string[]) => productsApi.bulkActivate(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.products.all });
    },
  });
}

/**
 * Bulk deactivate products
 */
export function useBulkDeactivateProducts() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (ids: string[]) => productsApi.bulkDeactivate(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.products.all });
    },
  });
}
