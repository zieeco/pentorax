/**
 * Payments React Query hooks for Next.js 16.
 * Refactored from legacy payments.hooks.ts.
 */

import { useMutation } from '@tanstack/react-query';
import { paymentsApi } from '@/services/payments.service';

/**
 * Initialize Paystack payment for an order
 */
export function useInitializePayment() {
  return useMutation({
    mutationFn: (orderId: string) => paymentsApi.initialize(orderId),
  });
}

/**
 * Verify Paystack payment reference
 */
export function useVerifyPayment() {
  return useMutation({
    mutationFn: (reference: string) => paymentsApi.verify(reference),
  });
}
