/**
 * CheckoutPage - Order checkout (refactored)
 * Uses modular components for better maintainability
 */
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useCart, useCreateOrder, useInitializePayment } from '@/hooks';
import { useIsAuthenticated } from '@/stores/auth';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import OrderSummary from '@/components/checkout/OrderSummary';
import EmptyCart from '@/components/cart/EmptyCart';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  const { data: cart, isLoading: cartLoading } = useCart();
  const createOrder = useCreateOrder();
  const initializePayment = useInitializePayment();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please login to checkout');
      navigate('/login?redirect=/checkout');
    }
  }, [isAuthenticated, navigate]);

  const handleCheckout = async (formData: any) => {
    if (!cart || cart.items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    try {
      // Create order
      const orderResponse = await createOrder.mutateAsync(formData);
      const order = orderResponse.data;

      // Initialize payment
      const paymentResponse = await initializePayment.mutateAsync(order.id);

      // Redirect to Paystack
      if (paymentResponse.data.authorization_url) {
        window.location.href = paymentResponse.data.authorization_url;
      } else {
        toast.success('Order created successfully!');
        navigate(`/orders/${order.id}`);
      }
    } catch (error) {
      toast.error('Failed to process order');
      console.error(error);
    }
  };

  // Loading state
  if (cartLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-full max-w-4xl px-4">
          <Skeleton className="h-[600px] w-full rounded-3xl" />
        </div>
      </div>
    );
  }

  // Empty cart
  if (!cart || cart.items.length === 0) {
    return <EmptyCart />;
  }

  const isProcessing = createOrder.isPending || initializePayment.isPending;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 pb-20">
      {/* Premium Header */}
      <div className="bg-primary text-white pt-24 pb-12 rounded-b-[3rem] shadow-2xl relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[128px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none translate-y-1/2 -translate-x-1/2" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Secure Checkout
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Complete your order with confidence. Your payment is secured by Paystack.
          </p>
        </div>
      </div>

      {/* Checkout Content */}
      <div className="max-w-7xl mx-auto px-4 mt-8 relative z-20">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Checkout Form - Main Content */}
          <div className="lg:col-span-8">
            <CheckoutForm onSubmit={handleCheckout} isSubmitting={isProcessing} />
          </div>

          {/* Order Summary - Sidebar */}
          <div className="lg:col-span-4 sticky top-8">
            <OrderSummary items={cart.items} total={cart.total} />
            
            {/* Trust Badges */}
            <div className="mt-6 flex flex-col items-center gap-2 text-center text-xs text-muted-foreground bg-white dark:bg-neutral-900 p-4 rounded-xl shadow-sm border border-border/50">
               <div className="flex items-center gap-2 mb-1">
                 <span className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 p-1.5 rounded-full">
                   🔒
                 </span>
                 <span className="font-medium">SSL Encrypted Payment</span>
               </div>
               <p>Your personal data is protected.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
