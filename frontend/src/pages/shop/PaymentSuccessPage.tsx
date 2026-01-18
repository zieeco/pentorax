/**
 * PaymentSuccessPage
 * Displays after successful Paystack payment
 */
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useVerifyPayment } from '@/hooks';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, Loader2, XCircle } from 'lucide-react';

export default function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const verifyPayment = useVerifyPayment();

  const reference = searchParams.get('reference');

  useEffect(() => {
    if (reference) {
      verifyPayment.mutate(reference);
    }
  }, [reference]);

  // Loading state
  if (verifyPayment.isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="p-12 text-center max-w-md">
          <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Verifying Payment...</h2>
          <p className="text-muted-foreground">
            Please wait while we confirm your payment
          </p>
        </Card>
      </div>
    );
  }

  // Success state
  if (verifyPayment.isSuccess) {
    const orderId = verifyPayment.data?.data?.order_id;

    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="p-12 text-center max-w-lg">
          <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>

          <h1 className="text-3xl font-bold mb-3">Payment Successful!</h1>
          
          <p className="text-muted-foreground mb-8">
            Thank you for your order. Your payment has been processed successfully.
            We'll send you a confirmation email shortly.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" onClick={() => navigate(orderId ? `/orders/${orderId}` : '/orders')}>
              View Order
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate('/shop')}>
              Continue Shopping
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Error state
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="p-12 text-center max-w-lg">
        <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100">
          <XCircle className="h-12 w-12 text-red-600" />
        </div>

        <h1 className="text-3xl font-bold mb-3">Payment Verification Failed</h1>
        
        <p className="text-muted-foreground mb-8">
          We couldn't verify your payment. Please contact support if amount was deducted.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button size="lg" onClick={() => navigate('/contact')}>
            Contact Support
          </Button>
          <Button variant="outline" size="lg" onClick={() => navigate('/shop')}>
            Back to Shop
          </Button>
        </div>
      </Card>
    </div>
  );
}
