import type { ReactNode } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/react-query';
// import { DEFAULT_THEME } from '@/constants/default-theme';
// import { OuterErrorBoundary } from '@/prod-components/OuterErrorBoundary';
// import { ThemeProvider } from 'next-themes';
// import { Head } from '@/internal-components/Head';

/**
 * @file AppProvider.tsx
 * @description Wraps the whole app with necessary context providers.
 *
 * ## React Query (TanStack Query) Usage Guide
 *
 * This guide provides a basic overview for using React Query in this project.
 *
 * ### Core Setup
 * The `QueryClientProvider` is set up in this file (`AppProvider.tsx`), making React Query
 * available throughout the application.
 *
 * ### Fetching Data with `useQuery` (GET requests)
 * `useQuery` is for fetching, caching, and synchronizing server data.
 *
 * #### Example (from `ui/src/pages/App.tsx`):
 * ```typescript
 * import { useQuery } from "@tanstack/react-query";
 *
 * const { data, isLoading, isError, error } = useQuery({
 *   queryKey: ["healthCheck"], // Unique key for the query
 *   queryFn: async () => {
 *     const response = await brain.check_health();
 *     const contentType = response.headers.get("content-type");
 *     if (contentType?.includes("application/json")) return response.json();
 *     return response.text();
 *   },
 * });
 * ```
 * **Key `useQuery` Options:**
 * - `queryKey`: Array identifying the query (for caching/refetching).
 * - `queryFn`: Async function returning a promise (data or error).
 *
 * **Key `useQuery` Return Values:**
 * - `data`: Resolved data.
 * - `isLoading`: True on initial fetch.
 * - `isError`: True if `queryFn` errored.
 * - `error`: Error object.
 *
 * ### Modifying Data with `useMutation` (POST, PUT, DELETE)
 * `useMutation` is for server-side data changes.
 *
 * #### Example:
 * ```typescript
 * import { useMutation, useQueryClient } from "@tanstack/react-query";
 * // import type { NewItemPayload, ItemResponse } from "types";
 *
 * const queryClient = useQueryClient();
 * const { mutate, isLoading, isError, error } = useMutation<ItemResponse, Error, NewItemPayload>({
 *   mutationFn: async (newItem: NewItemPayload) => {
 *     const response = await brain.your_create_item_endpoint(newItem);
 *     if (response.status >= 400) {
 *       const errorData = await response.json().catch(() => ({ message: "Request failed" }));
 *       throw new Error(errorData.message || "Failed to create item");
 *     }
 *     return response.json();
 *   },
 *   onSuccess: (data) => {
 *     console.log("Item created:", data);
 *     queryClient.invalidateQueries({ queryKey: ["itemList"] }); // Refetch item list
 *   },
 *   onError: (error) => console.error("Error creating item:", error.message),
 * });
 *
 * // To trigger: mutate({ field: "value" });
 * ```
 * **Key `useMutation` Concepts:**
 * - `mutationFn`: Async function performing the change, returns a promise.
 * - `mutate`: Function to trigger the mutation with variables.
 * - `onSuccess`: Callback on successful `mutationFn`.
 * - `onError`: Callback on `mutationFn` error.
 *
 * For more: [TanStack Query Docs](https://tanstack.com/query/latest/docs/react/overview)
 */

interface Props {
  children: ReactNode;
}

/**
 * A provider wrapping the whole app.
 *
 * You can add multiple providers here by nesting them,
 * and they will all be applied to the app.
 *
 * Note: ThemeProvider is already included in AppWrapper.tsx and does not need to be added here.
 */

export const AppProvider = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster richColors closeButton />
    </QueryClientProvider>
  );
};
