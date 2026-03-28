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

export { authApi } from './auth.service';
export { blogApi } from './blog.service';
export { cartApi } from './cart.service';
export { coreApi } from './core.service';
export { newsletterApi } from './newsletter.service';
export { ordersApi } from './orders.service';
export { paymentsApi } from './payments.service';
export { productsApi } from './products.service';
export { quotesApi } from './quotes.service';
export { reviewsApi } from './reviews.service';
export { stockNotificationsApi } from './stock-notifications.service';
export { wishlistApi } from './wishlist.service';
