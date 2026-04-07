'use client';

/**
 * CheckoutForm Component - Premium order details input
 * Implements react-hook-form with premium shadcn/ui components.
 * Adheres to 150-line rule by delegating fields to DeliveryFields.
 */
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { DeliveryFields } from './DeliveryFields';

const checkoutSchema = z.object({
  shipping_name: z.string().min(2, 'Name is required'),
  shipping_address: z.string().min(10, 'Full address is required'),
  shipping_city: z.string().min(2, 'City is required'),
  shipping_state: z.string().min(2, 'State is required'),
  shipping_phone: z.string().min(11, 'Valid Nigerian phone number required'),
});

export type CheckoutValues = z.infer<typeof checkoutSchema>;

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
    <Card className="border-border bg-card rounded-[2.5rem] border p-8 shadow-xl lg:p-12">
      <div className="mb-10 flex items-center justify-between">
        <h2 className="text-foreground text-2xl font-black italic">Delivery Protocol</h2>
        <Badge className="bg-primary/10 text-primary rounded-full border-none px-4 text-[10px] font-black uppercase">
          Official Shipment
        </Badge>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <DeliveryFields control={form.control} />

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
