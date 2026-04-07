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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }: { field: any }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Full Name"
                  className="focus:ring-primary h-14 rounded-2xl border-white/20 bg-white/10 font-black text-white placeholder:text-white/50"
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-destructive text-xs" />
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
                  className="focus:ring-primary h-14 rounded-2xl border-white/20 bg-white/10 font-black text-white placeholder:text-white/50"
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-destructive text-xs" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isPending}
          className="font-quicksand bg-primary text-primary-foreground hover:bg-primary/90 h-14 w-full rounded-2xl font-black tracking-widest shadow-lg"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Subscribing...
            </>
          ) : (
            'Subscribe Now'
          )}
        </Button>
      </form>
    </Form>
  );
}
