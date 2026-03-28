/**
 * Newsletter Hooks — React Query hooks for the newsletter API
 * Original: frontend/src/hooks/newsletter.hooks.ts
 */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { newsletterApi } from '@/services/newsletter.service';

export type NewsletterSubscriber = {
  id: number;
  email: string;
  full_name: string;
  is_active: boolean;
  created_at: string;
};

export function useNewsletterSubscribe() {
  return useMutation({
    mutationFn: ({ email, full_name }: { email: string; full_name: string }) =>
      newsletterApi.subscribe({ email, full_name }),
    onSuccess: () => toast.success('Successfully subscribed to our newsletter!'),
    onError: () => toast.error('Subscription failed. Please try again.'),
  });
}

export function useNewsletterList(params?: { is_active?: boolean; search?: string }) {
  return useQuery({
    queryKey: ['newsletter', params],
    queryFn: () => newsletterApi.list(params).then((r) => r.data),
  });
}

export function useNewsletterExport() {
  return useMutation({
    mutationFn: () => newsletterApi.export(),
    onSuccess: (response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'newsletter-subscribers.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Export downloaded successfully');
    },
    onError: () => toast.error('Export failed. Please try again.'),
  });
}

export function useNewsletterUnsubscribe() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (token: string) => newsletterApi.unsubscribe(token),
    onSuccess: () => {
      toast.success('Successfully unsubscribed from newsletter');
      queryClient.invalidateQueries({ queryKey: ['newsletter'] });
    },
    onError: () => toast.error('Unsubscribe failed. Please try again.'),
  });
}
