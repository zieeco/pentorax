/**
 * React Query hooks for API calls
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productsApi, cartApi, ordersApi, paymentsApi, reviewsApi, quotesApi, blogApi } from '../services/api';
import type { Product, Cart, Order } from '../types';

// Products hooks
export const useProducts = (params?: { category?: string; search?: string; min_price?: number; max_price?: number; featured?: boolean }) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: async () => {
      const response = await productsApi.list(params);
      return response.data.results || [];
    },
  });
};

export const useProduct = (slug: string) => {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: async () => {
      const response = await productsApi.get(slug);
      return response.data;
    },
    enabled: !!slug,
  });
};

export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ['products', 'featured'],
    queryFn: async () => {
      const response = await productsApi.featured();
      return response.data;
    },
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await productsApi.categories();
      return response.data;
    },
  });
};

// Cart hooks
export const useCart = () => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const response = await cartApi.get();
      return response.data;
    },
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ productId, quantity = 1 }: { productId: string; quantity?: number }) =>
      cartApi.addItem(productId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: string; quantity: number }) =>
      cartApi.updateItem(itemId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (itemId: string) => cartApi.removeItem(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};


// Orders hooks
export const useOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const response = await ordersApi.list();
      return response.data.results || [];
    },
  });
};

export const useOrder = (id: string) => {
  return useQuery({
    queryKey: ['order', id],
    queryFn: async () => {
      const response = await ordersApi.get(id);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (orderData: any) => ordersApi.create(orderData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};

// Payments hooks
export const useInitializePayment = () => {
  return useMutation({
    mutationFn: (orderId: string) =>
      paymentsApi.initialize(orderId),
  });
};

export const useVerifyPayment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (reference: string) => paymentsApi.verify(reference),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};

// Reviews hooks
export const useReviews = (productId: string) => {
  return useQuery({
    queryKey: ['reviews', productId],
    queryFn: async () => {
      const response = await reviewsApi.list(productId);
      return response.data;
    },
    enabled: !!productId,
  });
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ productId, data }: { productId: string; data: { rating: number; comment: string } }) =>
      reviewsApi.create(productId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['reviews', variables.productId] });
    },
  });
};

// Quotes hooks
export const useCreateQuote = () => {
  return useMutation({
    mutationFn: (quoteData: { name: string; email: string; phone: string; message: string }) =>
      quotesApi.create(quoteData),
  });
};

// Blog hooks
export const useBlogPosts = (params?: { category?: string; page?: number }) => {
  return useQuery({
    queryKey: ['blog-posts', params],
    queryFn: async () => {
      const response = await blogApi.listPosts(params);
      return response.data;
    },
  });
};

export const useBlogPost = (slug: string) => {
  return useQuery({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      const response = await blogApi.getPost(slug);
      return response.data;
    },
    enabled: !!slug,
  });
};

export const useBlogCategories = () => {
  return useQuery({
    queryKey: ['blog-categories'],
    queryFn: async () => {
      const response = await blogApi.categories();
      return response.data;
    },
  });
};
