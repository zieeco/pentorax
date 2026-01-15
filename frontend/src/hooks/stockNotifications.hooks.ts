/**
 * Stock Notification React Query hooks
 * Manages stock notification subscriptions for out-of-stock products
 * @module hooks/stockNotifications
 */

import { useMutation } from '@tanstack/react-query';
import { stockNotificationsApi } from '@/services/api';
import { toast } from 'sonner';

/**
 * Hook to subscribe to stock notifications
 * Shows success message when subscribed
 */
export const useSubscribeStockNotification = () => {
  return useMutation({
    mutationFn: ({ productId, email }: { productId: string; email: string }) =>
      stockNotificationsApi.subscribe(productId, email),
    onSuccess: () => {
      toast.success('You\'ll be notified when this product is back in stock!');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.error || 'Failed to subscribe to notifications';
      toast.error(errorMessage);
    },
  });
};

/**
 * Hook to unsubscribe from stock notifications
 */
export const useUnsubscribeStockNotification = () => {
  return useMutation({
    mutationFn: ({ productId, email }: { productId: string; email: string }) =>
      stockNotificationsApi.unsubscribe(productId, email),
    onSuccess: () => {
      toast.success('Unsubscribed from stock notifications');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.error || 'Failed to unsubscribe');
    },
  });
};
