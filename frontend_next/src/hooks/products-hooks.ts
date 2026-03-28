/**
 * Product-related React Query hooks for Next.js 16.
 * Refactored from legacy products.hooks.ts.
 * Provides hooks for fetching and managing product data.
 */

import { useMutation, useQuery, useQueryClient, type UseQueryOptions } from '@tanstack/react-query';
import { productsApi } from '@/services';
import type {
  Category,
  CreateProductPayload,
  PaginatedResponse,
  Product,
  UpdateProductPayload,
} from '@/types/product';
import { QUERY_KEYS } from './api-constants';
import {
  defaultQueryOptions,
  normalizeListResponse,
  normalizePaginatedResponse,
} from './api-utils';

// ===========================
// Query Hooks
// ===========================

/**
 * Fetch products list with optional filters
 */
export function useProducts(
  params?: Record<string, any>,
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
  options?: Omit<UseQueryOptions<PaginatedResponse<Product>>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: QUERY_KEYS.products.paginated(params || {}),
    queryFn: async () => {
      const response = await productsApi.list(params);
      return normalizePaginatedResponse<Product>(response.data, params);
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
 * Fetch product categories
 */
export function useCategories(options?: Omit<UseQueryOptions<Category[]>, 'queryKey' | 'queryFn'>) {
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

/**
 * Create new product
 */
export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductPayload) => productsApi.create(data),
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
    mutationFn: ({ slug, data }: { slug: string; data: UpdateProductPayload }) =>
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
 * Duplicate existing product
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

/**
 * Upload product image
 */
export function useUploadProductImage() {
  return useMutation({
    mutationFn: (file: File) => productsApi.uploadImage(file),
  });
}
