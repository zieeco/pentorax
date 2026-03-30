// ===========================
// Quote Hooks
// ===========================

import { quotesApi } from '@/services';
import { useMutation } from '@tanstack/react-query';

interface QuoteData {
  name: string;
  email: string;
  phone: string;
  message: string;
  products?: string[];
}

/**
 * Submit quote request
 */
export function useCreateQuote() {
  return useMutation({
    mutationFn: (quoteData: QuoteData) => quotesApi.create(quoteData),
  });
}
