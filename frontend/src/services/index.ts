/**
 * API Services - Barrel Export
 * Re-exports all API services for easy import and backward compatibility
 * 
 * Usage:
 *   import { productsApi, cartApi } from '@/services/api';
 * 
 * Or import from specific service files:
 *   import { productsApi } from '@/services/products.service';
 */

export { productsApi } from './products.service';
export { cartApi } from './cart.service';
export { ordersApi } from './orders.service';
export { paymentsApi } from './payments.service';
export { wishlistApi } from './wishlist.service';
export { stockNotificationsApi } from './stock-notifications.service';
export { reviewsApi } from './reviews.service';
export { quotesApi } from './quotes.service';
export { blogApi } from './blog.service';
export { coreApi } from './core.service';
export { newsletterApi } from './newsletter.service';
