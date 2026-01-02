/**
 * Product-related TypeScript types
 * Centralized type definitions for product domain
 */

export interface Product {
  id: string;
  slug: string;
  name: string;
  short_description: string;
  description: string;
  price: string;
  compare_at_price: string | null;
  discount_percentage: number;
  featured_image: string;
  category_id: string;
  category_name: string;
  is_active: boolean;
  is_featured: boolean;
  in_stock: boolean;
  created_at: string;
  updated_at: string;
  sku?: string;
  stock_quantity?: number;
  low_stock_threshold?: number;
  is_low_stock?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parent_id?: string;
  is_active: boolean;
  created_at: string;
}

export interface ProductFilters {
  search?: string;
  category?: string;
  is_active?: boolean;
  is_featured?: boolean;
  in_stock?: boolean;
  page?: number;
  per_page?: number;
}

export interface PaginatedResponse<T> {
  results: T[];
  count: number;
  totalPages: number;
  currentPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface ProductFormData {
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price: string;
  compare_at_price: string;
  category_id: string;
  featured_image: string;
  is_active: boolean;
  is_featured: boolean;
  sku: string;
  stock_quantity: string;
  low_stock_threshold: string;
}
