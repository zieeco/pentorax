/**
 * API Configuration Constants
 * Centralized configuration for API requests
 */

export const API_DEFAULTS = {
  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_PER_PAGE: 20,
    PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
  },
  CACHE: {
    STALE_TIME: 5 * 60 * 1000, // 5 minutes
    CACHE_TIME: 10 * 60 * 1000, // 10 minutes
  },
  RETRY: {
    MAX_RETRIES: 3,
    RETRY_DELAY: 1000,
  },
} as const;

export const QUERY_KEYS = {
  products: {
    all: ['products'] as const,
    lists: () => [...QUERY_KEYS.products.all, 'list'] as const,
    list: (filters: Record<string, any>) => [...QUERY_KEYS.products.lists(), filters] as const,
    paginated: (params: Record<string, any>) => [...QUERY_KEYS.products.all, 'paginated', params] as const,
    detail: (slug: string) => [...QUERY_KEYS.products.all, 'detail', slug] as const,
    featured: () => [...QUERY_KEYS.products.all, 'featured'] as const,
  },
  categories: {
    all: ['categories'] as const,
    list: () => [...QUERY_KEYS.categories.all, 'list'] as const,
  },
  cart: {
    all: ['cart'] as const,
    detail: () => [...QUERY_KEYS.cart.all, 'detail'] as const,
  },
  orders: {
    all: ['orders'] as const,
    lists: () => [...QUERY_KEYS.orders.all, 'list'] as const,
    detail: (id: string) => [...QUERY_KEYS.orders.all, 'detail', id] as const,
  },
  reviews: {
    all: ['reviews'] as const,
    list: (productId: string) => [...QUERY_KEYS.reviews.all, 'list', productId] as const,
  },
  blog: {
    all: ['blog'] as const,
    posts: (params?: Record<string, any>) => [...QUERY_KEYS.blog.all, 'posts', params] as const,
    post: (slug: string) => [...QUERY_KEYS.blog.all, 'post', slug] as const,
    categories: () => [...QUERY_KEYS.blog.all, 'categories'] as const,
  },
  core: {
    team: () => ['team'] as const,
    faqs: (params?: Record<string, any>) => ['faqs', params] as const,
    caseStudies: () => ['case-studies'] as const,
  },
} as const;
