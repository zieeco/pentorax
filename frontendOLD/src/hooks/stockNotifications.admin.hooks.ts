/**
 * React Query hooks for Stock Notifications Admin
 * Manages stock notification subscriptions in admin dashboard
 * @module hooks/stockNotifications.admin
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { stockNotificationsApi } from '@/services';
import { toast } from 'sonner';

/**
 * Hook to fetch paginated stock notifications list
 */
export const useStockNotifications = (params?: {
  page?: number;
  per_page?: number;
  search?: string;
  is_read?: boolean;
  is_archived?: boolean;
  is_notified?: boolean;
  product_id?: string;
}) => {
  return useQuery({
    queryKey: ['stock-notifications', params],
    queryFn: () => stockNotificationsApi.list(params),
  });
};

/**
 * Hook to fetch notification statistics
 */
export const useStockNotificationStats = () => {
  return useQuery({
    queryKey: ['stock-notifications-stats'],
    queryFn: () => stockNotificationsApi.getStats(),
  });
};

/**
 * Hook to mark notification as read
 */
export const useMarkReadNotification = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => stockNotificationsApi.markRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stock-notifications'] });
      queryClient.invalidateQueries({ queryKey: ['stock-notifications-stats'] });
      toast.success('Marked as read');
    },
    onError: () => {
      toast.error('Failed to mark as read');
    },
  });
};

/**
 * Hook to mark notification as unread
 */
export const useMarkUnreadNotification = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => stockNotificationsApi.markUnread(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stock-notifications'] });
      queryClient.invalidateQueries({ queryKey: ['stock-notifications-stats'] });
      toast.success('Marked as unread');
    },
    onError: () => {
      toast.error('Failed to mark as unread');
    },
  });
};

/**
 * Hook to archive notification
 */
export const useArchiveNotification = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => stockNotificationsApi.archive(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stock-notifications'] });
      queryClient.invalidateQueries({ queryKey: ['stock-notifications-stats'] });
      toast.success('Notification archived');
    },
    onError: () => {
      toast.error('Failed to archive notification');
    },
  });
};

/**
 * Hook to unarchive notification
 */
export const useUnarchiveNotification = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => stockNotificationsApi.unarchive(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stock-notifications'] });
      queryClient.invalidateQueries({ queryKey: ['stock-notifications-stats'] });
      toast.success('Notification unarchived');
    },
    onError: () => {
      toast.error('Failed to unarchive notification');
    },
  });
};

/**
 * Hook to send custom email to single subscriber
 */
export const useSendCustomEmail = () => {
  return useMutation({
    mutationFn: ({ id, subject, message }: { id: string; subject: string; message: string }) =>
      stockNotificationsApi.sendCustomEmail(id, subject, message),
    onSuccess: () => {
      toast.success('Email sent successfully');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.error || 'Failed to send email');
    },
  });
};

/**
 * Hook to send bulk emails
 */
export const useBulkSendEmail = () => {
  return useMutation({
    mutationFn: ({ ids, subject, message }: { ids: string[]; subject: string; message: string }) =>
      stockNotificationsApi.bulkSendEmail(ids, subject, message),
    onSuccess: (response: any) => {
      const sent = response.data?.sent || 0;
      const failed = response.data?.failed || 0;
      toast.success(`Sent ${sent} emails successfully${failed > 0 ? `, ${failed} failed` : ''}`);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.error || 'Failed to send emails');
    },
  });
};
