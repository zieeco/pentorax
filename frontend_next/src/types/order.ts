import type { Product } from './product';

/**
 * Modern Order Type Definitions for Pentorax.
 * Ported from legacy types/index.ts.
 */

export interface Order {
  id: string;
  user?: string; // User email or ID
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: OrderItem[];
  shipping_name: string;
  shipping_address: string;
  shipping_city: string;
  shipping_state: string;
  shipping_phone: string;
  payment_method?: string;
  payment_status?: string;
  tracking_number?: string;
  created_at: string;
  updated_at?: string;
}

export interface OrderItem {
  id: string;
  product_id?: string;
  product: Product;
  quantity: number;
  price: number; // Price at time of purchase
  subtotal?: number;
}

export interface OrderUpdateData {
  status?: Order['status'];
  tracking_number?: string;
}
