import { QueryClient } from '@tanstack/react-query';

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 5,
      retryDelay: 1000,
      gcTime: 1000 * 60 * 10, // 10 minutes
    },
  },
});
