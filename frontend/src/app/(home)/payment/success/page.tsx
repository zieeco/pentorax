'use client';

/**
 * PaymentSuccessPage — Successful Paystack transaction confirmation.
 * Verifies payment via reference and displays high-conversion success state.
 * Adheres to 150-line rule.
 */
import { ArrowRight, CheckCircle, Loader2, ShieldCheck, XCircle } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useVerifyPayment } from '@/hooks/payments-hooks';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const verifyPayment = useVerifyPayment();
  const reference = searchParams.get('reference');

  useEffect(() => {
    if (reference) verifyPayment.mutate(reference);
  }, [reference, verifyPayment]);

  if (verifyPayment.isPending)
    return (
      <Card className="border-border bg-card max-w-lg rounded-[2.5rem] p-12 text-center shadow-2xl">
        <div className="relative mx-auto mb-8 h-24 w-24">
          <div className="border-primary/10 border-t-primary absolute inset-0 animate-spin rounded-full border-4" />
          <Loader2 className="text-primary absolute top-1/2 left-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2" />
        </div>
        <h2 className="text-foreground mb-2 text-2xl font-black italic">
          Authenticating Transaction...
        </h2>
        <p className="text-muted-foreground font-medium">
          Please maintain connection while we verify your solar investment.
        </p>
      </Card>
    );

  if (verifyPayment.isSuccess) {
    const orderId = verifyPayment.data?.data?.order_id;
    return (
      <Card className="animate-in fade-in zoom-in-95 border-border bg-card max-w-xl rounded-[3rem] p-12 text-center shadow-2xl duration-700">
        <div className="border-secondary/20 bg-secondary/10 shadow-secondary/20 relative mb-8 inline-flex h-24 w-24 items-center justify-center rounded-[2rem] border shadow-xl">
          <CheckCircle className="text-secondary h-10 w-10" />
        </div>
        <Badge className="bg-secondary/10 text-secondary mb-4 rounded-full border-none px-4 py-1 text-[10px] font-black uppercase">
          Transaction Validated
        </Badge>
        <h1 className="text-foreground mb-4 text-4xl font-black tracking-tight">
          Mission <span className="text-secondary italic">Accomplished.</span>
        </h1>
        <p className="text-muted-foreground mb-10 px-4 text-lg leading-relaxed font-medium">
          Your order has been secured in our system. A digital transmission containing detailed
          logistics will be dispatched to your terminal shortly.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button
            className="group h-14 rounded-2xl px-8 font-black tracking-widest uppercase transition-all"
            onClick={() => router.push(orderId ? `/orders/${orderId}` : '/orders')}
          >
            Inspect Order{' '}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-foreground h-14 rounded-2xl px-8 font-black tracking-widest uppercase"
            onClick={() => router.push('/shop')}
          >
            Continue Procurement
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="animate-in slide-in-from-bottom-4 border-border bg-card max-w-lg rounded-[2.5rem] p-12 text-center shadow-2xl duration-500">
      <div className="border-destructive/20 bg-destructive/10 mb-8 inline-flex h-20 w-20 items-center justify-center rounded-[1.5rem] border">
        <XCircle className="text-destructive h-10 w-10" />
      </div>
      <h1 className="text-foreground mb-3 text-3xl font-black italic">Validation Error</h1>
      <p className="text-muted-foreground mb-10 px-4 leading-relaxed font-medium">
        Security protocols could not verify this transaction reference. If capital was debited,
        please contact mission control immediately.
      </p>
      <div className="flex flex-col justify-center gap-4 sm:flex-row">
        <Button
          size="lg"
          className="h-14 rounded-2xl px-8 font-black uppercase"
          onClick={() => router.push('/contact')}
        >
          Alert Support
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="h-14 rounded-2xl px-8 font-black uppercase"
          onClick={() => router.push('/shop')}
        >
          Exit to Base
        </Button>
      </div>
    </Card>
  );
}

export default function Page() {
  return (
    <div className="bg-background relative flex min-h-screen items-center justify-center overflow-hidden p-6">
      <div className="bg-primary/5 absolute top-0 right-0 -mt-64 -mr-64 h-[500px] w-[500px] rounded-full blur-[120px]" />
      <div className="bg-secondary/5 absolute bottom-0 left-0 -mb-64 -ml-64 h-[500px] w-[500px] rounded-full blur-[120px]" />
      <Suspense
        fallback={
          <Card className="border-border bg-card max-w-md rounded-[2.5rem] p-12 text-center">
            <Loader2 className="text-primary mx-auto mb-4 h-12 w-12 animate-spin" />
            <p className="text-muted-foreground text-xs font-black tracking-widest uppercase">
              Initializing Session...
            </p>
          </Card>
        }
      >
        <PaymentSuccessContent />
      </Suspense>
    </div>
  );
}
