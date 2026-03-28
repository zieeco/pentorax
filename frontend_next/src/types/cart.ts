import type { Product } from './product';

/**
 * Modern Cart Type Definitions for Pentorax.
 * Ported from legacy types/index.ts.
 */

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
