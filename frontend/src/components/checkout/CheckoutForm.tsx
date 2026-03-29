'use client';

/**
 * CheckoutForm Component - Premium order details input
 * Implements react-hook-form with premium shadcn/ui components.
 */
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const checkoutSchema = z.object({
  shipping_name: z.string().min(2, 'Name is required'),
  shipping_address: z.string().min(10, 'Full address is required'),
  shipping_city: z.string().min(2, 'City is required'),
  shipping_state: z.string().min(2, 'State is required'),
  shipping_phone: z.string().min(11, 'Valid Nigerian phone number required'),
});

type CheckoutValues = z.infer<typeof checkoutSchema>;

interface CheckoutFormProps {
  onSubmit: (data: CheckoutValues) => void;
  isSubmitting: boolean;
}

export function CheckoutForm({ onSubmit, isSubmitting }: CheckoutFormProps) {
  const form = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      shipping_name: '',
      shipping_address: '',
      shipping_city: '',
      shipping_state: 'Lagos',
      shipping_phone: '',
    },
  });

  return (
    <Card className="rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-xl shadow-gray-200/50 lg:p-12">
      <div className="mb-10 flex items-center justify-between">
        <h2 className="text-2xl font-black text-gray-900 italic">Delivery Protocol</h2>
        <Badge className="bg-primary/10 text-primary rounded-full border-none px-4 text-[10px] font-black uppercase">
          Official Shipment
        </Badge>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid gap-8 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="shipping_name"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-[10px] font-black tracking-widest text-gray-400 uppercase">
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-12 rounded-xl border-none bg-gray-50 font-bold"
                      placeholder="John Doe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[10px] font-black uppercase" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shipping_phone"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-[10px] font-black tracking-widest text-gray-400 uppercase">
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-12 rounded-xl border-none bg-gray-50 font-bold"
                      placeholder="080... or 090..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[10px] font-black uppercase" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="shipping_address"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-[10px] font-black tracking-widest text-gray-400 uppercase">
                  Logistics Address
                </FormLabel>
                <FormControl>
                  <Input
                    className="h-12 rounded-xl border-none bg-gray-50 font-bold"
                    placeholder="No. 12 Street, Area, LGA"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[10px] font-black uppercase" />
              </FormItem>
            )}
          />

          <div className="grid gap-8 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="shipping_city"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-[10px] font-black tracking-widest text-gray-400 uppercase">
                    City
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-12 rounded-xl border-none bg-gray-50 font-bold"
                      placeholder="Ikeja"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[10px] font-black uppercase" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shipping_state"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-[10px] font-black tracking-widest text-gray-400 uppercase">
                    State
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-12 rounded-xl border-none bg-gray-50 font-bold"
                      placeholder="Lagos"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[10px] font-black uppercase" />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="shadow-primary/20 mt-6 h-14 w-full rounded-2xl text-sm font-black tracking-widest uppercase shadow-xl transition-all active:scale-95"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Initializing Payment...' : 'Finalize Delivery Protocol'}
          </Button>
        </form>
      </Form>
    </Card>
  );
}
