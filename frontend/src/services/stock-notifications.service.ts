/**
 * Stock Notifications API Service
 * Manages email alerts for out-of-stock products
 */
import { apiClient } from '@/lib/axiosInstance';

export const stockNotificationsApi = {
  /**
   * Subscribe to stock notifications for a product (Public)
   */
  subscribe: (productId: string, email: string) =>
    apiClient.post('/products/stock-notifications/subscribe/', { 
      product_id: productId,
      email 
    }),
  
  /**
   * Unsubscribe from stock notifications (Public)
   */
  unsubscribe: (productId: string, email: string) =>
    apiClient.delete('/products/stock-notifications/unsubscribe/', {
      data: { product_id: productId, email }
    }),
  
  /**
   * List all stock notifications with pagination and filters (Admin/Staff)
   */
  list: (params?: {
    page?: number;
    per_page?: number;
    search?: string;
    is_read?: boolean;
    is_archived?: boolean;
    is_notified?: boolean;
    product_id?: string;
  }) => apiClient.get('/products/stock-notifications/', { params }),
  
  /**
   * Get notification statistics (Admin/Staff)
   */
  getStats: () => apiClient.get('/products/stock-notifications/stats/'),
  
  /**
   * Mark notification as read (Admin/Staff)
   */
  markRead: (id: string) => 
    apiClient.post(`/products/stock-notifications/${id}/mark_read/`),
  
  /**
   * Mark notification as unread (Admin/Staff)
   */
  markUnread: (id: string) => 
    apiClient.post(`/products/stock-notifications/${id}/mark_unread/`),
  
  /**
   * Archive notification (Admin/Staff)
   */
  archive: (id: string) => 
    apiClient.post(`/products/stock-notifications/${id}/archive/`),
  
  /**
   * Unarchive notification (Admin/Staff)
   */
  unarchive: (id: string) => 
    apiClient.post(`/products/stock-notifications/${id}/unarchive/`),
  
  /**
   * Send custom email to a single subscriber (Admin/Staff)
   */
  sendCustomEmail: (id: string, subject: string, message: string) =>
    apiClient.post(`/products/stock-notifications/${id}/send_custom_email/`, {
      subject,
      message
    }),
  
  /**
   * Generate AI-powered email content (Admin/Staff)
   */
  generateEmail: (notificationId?: string, notificationIds?: string[]) =>
    apiClient.post('/products/stock-notifications/generate_email/', {
      notification_id: notificationId,
      notification_ids: notificationIds,
    }),
  
  /**
   * Send custom email to multiple subscribers (Admin/Staff)
   */
  bulkSendEmail: (ids: string[], subject: string, message: string) =>
    apiClient.post('/products/stock-notifications/bulk_send_email/', {
      ids,
      subject,
      message
    }),
};
