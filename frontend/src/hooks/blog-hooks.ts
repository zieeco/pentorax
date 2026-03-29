/**
 * Blog application React Query hooks
 * Posts, Categories, Post Detail
 */
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { blogApi, type BlogCategory, type BlogPost } from '@/services/blog.service';
import { QUERY_KEYS } from './api-constants';
import { defaultQueryOptions, normalizeListResponse } from './api-utils';

export function useBlogPosts(
  params?: { category?: string; search?: string },
  options?: Omit<UseQueryOptions<BlogPost[]>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: QUERY_KEYS.blog.posts(params),
    queryFn: async () => {
      const resp = await blogApi.posts(params);
      return normalizeListResponse<BlogPost>(resp.data);
    },
    ...defaultQueryOptions,
    ...options,
  });
}

export function useBlogPost(
  slug: string,
  options?: Omit<UseQueryOptions<BlogPost>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: QUERY_KEYS.blog.post(slug),
    queryFn: async () => {
      const resp = await blogApi.post(slug);
      return resp.data;
    },
    ...defaultQueryOptions,
    ...options,
  });
}

export function useBlogCategories(
  options?: Omit<UseQueryOptions<BlogCategory[]>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: QUERY_KEYS.blog.categories(),
    queryFn: async () => {
      const resp = await blogApi.categories();
      return normalizeListResponse<BlogCategory>(resp.data);
    },
    ...defaultQueryOptions,
    ...options,
  });
}
