/**
 * API Configuration Constants
 * Centralized configuration for API requests
 */
export declare const API_DEFAULTS: {
    readonly PAGINATION: {
        readonly DEFAULT_PAGE: 1;
        readonly DEFAULT_PER_PAGE: 20;
        readonly PAGE_SIZE_OPTIONS: readonly [10, 20, 50, 100];
    };
    readonly CACHE: {
        readonly STALE_TIME: number;
        readonly CACHE_TIME: number;
    };
    readonly RETRY: {
        readonly MAX_RETRIES: 3;
        readonly RETRY_DELAY: 1000;
    };
};
export declare const QUERY_KEYS: {
    readonly products: {
        readonly all: readonly ["products"];
        readonly lists: () => readonly ["products", "list"];
        readonly list: (filters: Record<string, any>) => readonly ["products", "list", Record<string, any>];
        readonly paginated: (params: Record<string, any>) => readonly ["products", "paginated", Record<string, any>];
        readonly detail: (slug: string) => readonly ["products", "detail", string];
        readonly featured: () => readonly ["products", "featured"];
        readonly related: (productId: string, categoryId: string) => readonly ["products", "related", string, string];
    };
    readonly categories: {
        readonly all: readonly ["categories"];
        readonly list: () => readonly ["categories", "list"];
    };
    readonly cart: {
        readonly all: readonly ["cart"];
        readonly detail: () => readonly ["cart", "detail"];
    };
    readonly orders: {
        readonly all: readonly ["orders"];
        readonly lists: () => readonly ["orders", "list"];
        readonly detail: (id: string) => readonly ["orders", "detail", string];
    };
    readonly reviews: {
        readonly all: readonly ["reviews"];
        readonly list: (productId: string) => readonly ["reviews", "list", string];
    };
    readonly blog: {
        readonly all: readonly ["blog"];
        readonly posts: (params?: Record<string, any>) => readonly ["blog", "posts", Record<string, any> | undefined];
        readonly post: (slug: string) => readonly ["blog", "post", string];
        readonly categories: () => readonly ["blog", "categories"];
    };
    readonly core: {
        readonly team: () => readonly ["team"];
        readonly faqs: (params?: Record<string, any>) => readonly ["faqs", Record<string, any> | undefined];
        readonly caseStudies: () => readonly ["case-studies"];
    };
};
