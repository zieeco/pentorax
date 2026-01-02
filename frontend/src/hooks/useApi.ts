// frontend/src/hooks/useApi.ts



/**
 * React Query hooks for API calls
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productsApi, cartApi, ordersApi, paymentsApi, reviewsApi, quotesApi, blogApi, coreApi } from '../services/api';
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

// Paginated products hook for admin dashboard
// Follows ecommerce standard: page, per_page, sort, order
export const useProductsPaginated = (params?: { 
  category?: string; 
  search?: string; 
  min_price?: number; 
  max_price?: number; 
  featured?: boolean;
  in_stock?: boolean;
  page?: number;
  per_page?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}) => {
  return useQuery({
    queryKey: ['products-paginated', params],
    queryFn: async () => {
      const response = await productsApi.list(params);
      const data = response.data;
      const perPage = params?.per_page || 20;
      const currentPage = params?.page || 1;
      const totalCount = data.count || data.results?.length || 0;
      const totalPages = Math.ceil(totalCount / perPage);
      
      return {
        results: data.results || [],
        count: totalCount,
        page: currentPage,
        totalPages,
        hasNext: !!data.next,
        hasPrevious: !!data.previous,
      };
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
      // API returns paginated response or array
      return response.data.results || response.data || [];
    },
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await productsApi.categories();
      // API returns paginated response {results: [...]}
      return response.data.results || response.data || [];
    },
  });
};

// Admin Product Mutations
export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: {
      name: string;
      slug?: string;
      description: string;
      short_description?: string;
      price: string;
      compare_at_price?: string;
      category_id: string;
      featured_image?: string;
      is_active?: boolean;
      is_featured?: boolean;
      sku?: string;
      stock_quantity?: number;
      low_stock_threshold?: number;
    }) => productsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ slug, data }: { slug: string; data: Partial<{
      name: string;
      description: string;
      short_description: string;
      price: string;
      compare_at_price: string;
      category_id: string;
      featured_image: string;
      is_active: boolean;
      is_featured: boolean;
      sku: string;
      stock_quantity: number;
      low_stock_threshold: number;
    }> }) => productsApi.update(slug, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', variables.slug] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (slug: string) => productsApi.delete(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useDuplicateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (slug: string) => productsApi.duplicate(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

// Image upload hook
export const useUploadProductImage = () => {
  return useMutation({
    mutationFn: (file: File) => productsApi.uploadImage(file),
  });
};

// Bulk operations hooks
export const useBulkDeleteProducts = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (ids: string[]) => productsApi.bulkDelete(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useBulkActivateProducts = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (ids: string[]) => productsApi.bulkActivate(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useBulkDeactivateProducts = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (ids: string[]) => productsApi.bulkDeactivate(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
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
      // API returns paginated response {results: [...]}
      return response.data.results || response.data || [];
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

// Core App hooks
export const useTeam = () => {
  return useQuery({
    queryKey: ['team'],
    queryFn: async () => {
      const response = await coreApi.team();
      return response.data.results || response.data;
    },
  });
};

export const useFAQs = (params?: { category?: string; search?: string }) => {
  return useQuery({
    queryKey: ['faqs', params],
    queryFn: async () => {
      const response = await coreApi.faqs(params);
      return response.data.results || response.data;
    },
  });
};

export const useCaseStudies = () => {
  return useQuery({
    queryKey: ['case-studies'],
    queryFn: async () => {
      const response = await coreApi.caseStudies();
      return response.data.results || response.data;
    },
  });
};

export const useSubmitContact = () => {
  return useMutation({
    mutationFn: (data: {
      name: string;
      email: string;
      phone?: string;
      subject: string;
      message: string;
    }) => coreApi.submitContact(data),
  });
};

export const useSubmitTicket = () => {
  return useMutation({
    mutationFn: (data: {
      subject: string;
      category: string;
      description: string;
      customer_name: string;
      customer_email: string;
      customer_phone?: string;
    }) => coreApi.submitTicket(data),
  });
};

export const useCheckWarranty = () => {
  return useMutation({
    mutationFn: (serialNumber: string) => coreApi.checkWarranty(serialNumber),
  });
};

