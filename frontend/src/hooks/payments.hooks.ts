
// ===========================
// Payment Hooks
// ===========================

import { paymentsApi } from '@/services/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '.';

/**
 * Initialize payment for order
 */
export function useInitializePayment() {
  return useMutation({
    mutationFn: (orderId: string) => paymentsApi.initialize(orderId),
  });
}

/**
 * Verify payment
 */
export function useVerifyPayment() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (reference: string) => paymentsApi.verify(reference),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.orders.all });
    },
  });
}