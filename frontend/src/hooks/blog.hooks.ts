/**
 * Blog-related React Query hooks
 * @module hooks/blog
 */

import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { blogApi, type BlogPost } from '@/services';
import { QUERY_KEYS } from './api.constants';
import { defaultQueryOptions } from './api.utils';

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
export function useBlogPosts(
  params?: BlogPostsParams,
  options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: QUERY_KEYS.blog.posts(params),
    queryFn: async () => {
      const response = await blogApi.listPosts(params);
      return response.data;
    },
    ...defaultQueryOptions,
    ...options,
  });
}

/**
 * Fetch single blog post by slug
 */
export function useBlogPost(
  slug: string,
  options?: Omit<UseQueryOptions<BlogPost>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: QUERY_KEYS.blog.post(slug),
    queryFn: async () => {
      const response = await blogApi.getPost(slug);
      return response.data;
    },
    enabled: !!slug,
    ...defaultQueryOptions,
    ...options,
  });
}

/**
 * Fetch blog categories
 */
export function useBlogCategories(
  options?: Omit<UseQueryOptions<BlogCategory[]>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: QUERY_KEYS.blog.categories(),
    queryFn: async () => {
      const response = await blogApi.categories();
      return response.data;
    },
    ...defaultQueryOptions,
    ...options,
  });
}
