/**
 * Blog-related React Query hooks
 * @module hooks/blog
 */
import { type UseQueryOptions } from '@tanstack/react-query';
interface BlogPost {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    featured_image: string;
    author: string;
    category: BlogCategory;
    published_at: string;
    created_at: string;
}
interface BlogCategory {
    id: string;
    name: string;
    slug: string;
    description?: string;
}
interface BlogPostsParams {
    category?: string;
    page?: number;
    per_page?: number;
    search?: string;
}
/**
 * Fetch blog posts with optional filters
 */
export declare function useBlogPosts(params?: BlogPostsParams, options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>): import("@tanstack/react-query").UseQueryResult<any, Error>;
/**
 * Fetch single blog post by slug
 */
export declare function useBlogPost(slug: string, options?: Omit<UseQueryOptions<BlogPost>, 'queryKey' | 'queryFn'>): import("@tanstack/react-query").UseQueryResult<BlogPost, Error>;
/**
 * Fetch blog categories
 */
export declare function useBlogCategories(options?: Omit<UseQueryOptions<BlogCategory[]>, 'queryKey' | 'queryFn'>): import("@tanstack/react-query").UseQueryResult<BlogCategory[], Error>;
export {};
