/**
 * Newsletter subscription hooks
 */
import { useMutation } from '@tanstack/react-query';
import { newsletterApi } from '@/services';
import { toast } from 'sonner';

interface SubscribeData {
  email: string;
  full_name: string;
}

interface SubscribeResponse {
  message: string;
  subscriber?: {
    id: string;
    email: string;
    full_name: string;
    created_at: string;
  };
  already_subscribed?: boolean;
  email_sent?: boolean;
}

export function useNewsletterSubscribe() {
  return useMutation<SubscribeResponse, Error, SubscribeData>({
    mutationFn: async (data) => {
      const response = await newsletterApi.subscribe(data);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.already_subscribed) {
        toast.info('Already Subscribed', {
          description: data.message,
        });
      } else {
        toast.success('Successfully Subscribed!', {
          description: data.message,
          duration: 5000,
        });
      }
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.email?.[0] || 
                          error.response?.data?.message || 
                          'Failed to subscribe. Please try again.';
      
      toast.error('Subscription Failed', {
        description: errorMessage,
      });
    },
  });
}

export function useNewsletterUnsubscribe() {
  return useMutation<{ message: string }, Error, string>({
    mutationFn: async (token) => {
      const response = await newsletterApi.unsubscribe(token);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success('Unsubscribed', {
        description: data.message,
      });
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.error || 
                          'Failed to unsubscribe. The link may be invalid or expired.';
      
      toast.error('Unsubscribe Failed', {
        description: errorMessage,
      });
    },
  });
}
