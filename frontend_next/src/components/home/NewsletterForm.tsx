'use client';

/**
 * NewsletterForm — Footer newsletter subscription, uses shadcn Form/Input/Button
 * Original used native input/button — replaced per rules
 */
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useNewsletterSubscribe } from '@/hooks/newsletter-hooks';

const schema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
});

type FormData = z.infer<typeof schema>;

export function NewsletterForm() {
  const { mutate: subscribe, isPending } = useNewsletterSubscribe();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { full_name: '', email: '' },
  });

  const onSubmit = (data: FormData) => {
    subscribe(data, { onSuccess: () => form.reset() });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }: { field: any }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Full Name"
                  className="border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500"
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs text-red-400" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }: { field: any }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Email Address"
                  className="border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500"
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs text-red-400" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 font-bold text-white hover:bg-blue-700"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Subscribing...
            </>
          ) : (
            'SUBSCRIBE NOW'
          )}
        </Button>
      </form>
    </Form>
  );
}
