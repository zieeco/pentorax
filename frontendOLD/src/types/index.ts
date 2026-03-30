/**
 * TypeScript types for Pentorax
 */

// Import Category from product.ts to avoid duplicate definitions
import type { Category } from './product';
export type { Category } from './product';

export interface Product {
  category_id: string;
  sku: string;
  stock_quantity: number;
  low_stock_threshold: number;
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  category: Category;
  price: number;
  compare_at_price?: number;
  discount_percentage: number;
  is_active: boolean;
  is_featured: boolean;
  featured_image: string;
  images: ProductImage[];
  specifications: ProductSpecification[];
  created_at: string;
  updated_at: string;
}

export interface ProductImage {
  id: string;
  image_url: string;
  alt_text: string;
  position: number;
}

export interface ProductSpecification {
  id: string;
  key: string;
  value: string;
  position: number;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  subtotal: number;
}

export interface Cart {
  id: string;
  items: CartItem[];
  total: number;
  item_count: number;
}

export interface Order {
  id: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: OrderItem[];
  shipping_name: string;
  shipping_address: string;
  shipping_city: string;
  shipping_state: string;
  shipping_phone: string;
  created_at: string;
}

export interface OrderItem {
  id: string;
  product: Product;
  quantity: number;
  price: number;
}

export interface Review {
  id: string;
  product: string;
  user_email: string;
  rating: number;
  comment: string;
  is_verified_purchase: boolean;
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image: string;
  category: BlogCategory;
  published_at: string;
  created_at: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
}
