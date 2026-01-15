/**
 * Wishlist-related React Query hooks
 * Provides hooks for managing user wishlists with automatic caching and synchronization
 * @module hooks/wishlist
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { wishlistApi } from '@/services/api';
import { QUERY_KEYS } from './api.constants';
import { toast } from 'sonner';

/**
 * Hook to fetch current user's wishlist
 * @returns React Query result with wishlist data
 */
export const useWishlist = () => {
  return useQuery({
    queryKey: QUERY_KEYS.wishlist.list,
    queryFn: async () => {
      const response = await wishlistApi.get();
      return response.data;
    },
  });
};

/**
 * Hook to add item to wishlist
 * Automatically invalidates wishlist cache on success
 */
export const useAddToWishlist = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ productId, notes }: { productId: string; notes?: string }) =>
      wishlistApi.addItem(productId, notes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.wishlist.list });
      toast.success('Added to wishlist');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.error || 'Failed to add to wishlist');
    },
  });
};

/**
 * Hook to remove item from wishlist
 * Automatically invalidates wishlist cache on success
 */
export const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (productId: string) => wishlistApi.removeItem(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.wishlist.list });
      toast.success('Removed from wishlist');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.error || 'Failed to remove from wishlist');
    },
  });
};

/**
 * Hook to clear entire wishlist
 * Automatically invalidates wishlist cache on success
 */
export const useClearWishlist = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => wishlistApi.clear(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.wishlist.list });
      toast.success('Wishlist cleared');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.error || 'Failed to clear wishlist');
    },
  });
};

/**
 * Hook to check if product is in wishlist
 * @param productId - Product ID to check
 * @returns boolean indicating if product is in wishlist
 */
export const useIsInWishlist = (productId: string) => {
  const { data: wishlist } = useWishlist();
  
  return wishlist?.items?.some((item: any) => item.product.id === productId) || false;
};
