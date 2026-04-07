'use client';

/**
 * CheckoutPage — Secure order completion
 * Manages checkout flow, payment initialization, and redirects.
 * Adheres to 150-line rule.
 */
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { EmptyCart } from '@/components/cart/EmptyCart';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useCart } from '@/hooks/cart-hooks';
import { useCreateOrder } from '@/hooks/orders-hooks';
import { useInitializePayment } from '@/hooks/payments-hooks';
import { useAuthStore } from '@/stores/auth';

export default function CheckoutPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const { data: cart, isLoading: cartLoading } = useCart();
  const createOrder = useCreateOrder();
  const initializePayment = useInitializePayment();

  useEffect(() => {
    if (!cartLoading && !isAuthenticated) {
      toast.error('Authentication Required');
      router.push('/login?redirect=/checkout');
    }
  }, [isAuthenticated, cartLoading, router]);

  const handleCheckout = async (formData: any) => {
    if (!cart || cart.items.length === 0) return toast.error('Cart Void');
    try {
      const orderResponse = await createOrder.mutateAsync(formData);
      const paymentResponse = await initializePayment.mutateAsync(orderResponse.data.id);
      if (paymentResponse.data.authorization_url) {
        window.location.href = paymentResponse.data.authorization_url;
      } else {
        toast.success('Procurement Successful');
        router.push(`/orders/${orderResponse.data.id}`);
      }
    } catch (e) {
      toast.error('Mission Failed');
    }
  };

  if (cartLoading)
    return (
      <div className="container mx-auto px-4 py-24">
        <Skeleton className="h-[600px] w-full rounded-[2.5rem]" />
      </div>
    );

  if (!cart || cart.items.length === 0) return <EmptyCart />;

  const isProcessing = createOrder.isPending || initializePayment.isPending;

  return (
    <div className="bg-background min-h-screen pb-24">
      <div className="bg-foreground text-background py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <Badge className="bg-primary/20 text-primary mb-4 rounded-full border-none px-4 py-1 text-[10px] font-black uppercase">
            Encryption Phase
          </Badge>
          <h1 className="text-4xl leading-none font-black tracking-tight md:text-6xl">
            Secure <br />
            <span className="text-primary italic">Transmission.</span>
          </h1>
        </div>
      </div>

      <div className="container mx-auto -mt-10 px-4 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <CheckoutForm onSubmit={handleCheckout} isSubmitting={isProcessing} />
          </div>
          <div className="lg:col-span-4">
            <OrderSummary items={cart.items} total={cart.total} />
          </div>
        </div>
      </div>
    </div>
  );
}
