import { QueryClient } from '@tanstack/react-query';

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes - data stays fresh
      gcTime: 1000 * 60 * 10, // 10 minutes - cache persists in memory
      refetchOnWindowFocus: false, // Don't refetch on tab focus
      refetchOnMount: false, // Don't refetch on component remount if data exists
      refetchOnReconnect: false, // Don't refetch when internet reconnects
      retry: 1, // Only retry failed requests once
      retryDelay: 1000, // Wait 1 second before retry
    },
  },
});
