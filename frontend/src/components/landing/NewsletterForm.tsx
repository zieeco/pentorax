/**
 * Newsletter Subscription Form Component
 * Professional, accessible form with validation
 */
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2 } from 'lucide-react';
import { useNewsletterSubscribe } from '@/hooks/newsletter.hooks';

const newsletterSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

const NewsletterForm: React.FC = () => {
  const { mutate: subscribe, isPending } = useNewsletterSubscribe();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = (data: NewsletterFormData) => {
    subscribe(data, {
      onSuccess: () => {
        reset(); // Clear form after successful subscription
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div>
        <input
          type="text"
          placeholder="Full Name"
          {...register('full_name')}
          disabled={isPending}
          className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          aria-label="Full Name"
          aria-invalid={errors.full_name ? 'true' : 'false'}
        />
        {errors.full_name && (
          <p className="text-red-400 text-xs mt-1" role="alert">
            {errors.full_name.message}
          </p>
        )}
      </div>

      <div>
        <input
          type="email"
          placeholder="Email Address"
          {...register('email')}
          disabled={isPending}
          className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          aria-label="Email Address"
          aria-invalid={errors.email ? 'true' : 'false'}
        />
        {errors.email && (
          <p className="text-red-400 text-xs mt-1" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        aria-label={isPending ? 'Subscribing...' : 'Subscribe to Newsletter'}
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Subscribing...
          </>
        ) : (
          'SUBSCRIBE NOW'
        )}
      </button>
    </form>
  );
};

export default NewsletterForm;
