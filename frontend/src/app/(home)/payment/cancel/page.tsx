'use client';

/**
 * PaymentCancelPage — Secure transaction termination handler
 * Provides clear navigation for users who manually aborted the payment flow.
 * Adheres to 150-line rule and premium shadcn-only UI.
 */
import { AlertCircle, ArrowLeft, Headset, ShieldAlert, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function PaymentCancelPage() {
  return (
    <div className="bg-background relative flex min-h-screen items-center justify-center overflow-hidden p-6">
      {/* Dynamic Background */}
      <div className="bg-primary/5 absolute top-0 left-0 -mt-48 -ml-48 h-[600px] w-[600px] rounded-full blur-[140px]" />
      <div className="bg-muted/50 absolute right-0 bottom-0 -mr-48 -mb-48 h-[600px] w-[600px] rounded-full blur-[140px]" />

      <Card className="animate-in fade-in slide-in-from-bottom-6 border-border bg-card/80 relative z-10 w-full max-w-2xl rounded-[3rem] p-8 shadow-2xl backdrop-blur-2xl duration-700 md:p-16">
        <div className="text-center">
          <div className="bg-primary/5 shadow-primary/5 mx-auto mb-10 flex h-24 w-24 items-center justify-center rounded-[2.5rem] shadow-inner">
            <ShieldAlert className="text-primary h-12 w-12" />
          </div>

          <Badge className="bg-primary/10 text-primary mb-6 rounded-full border-none px-4 py-1 text-[10px] leading-none font-black tracking-widest uppercase">
            Transaction Aborted
          </Badge>

          <h1 className="text-foreground mb-6 text-4xl leading-none font-black tracking-tighter lowercase italic md:text-6xl">
            Payment <br />
            <span className="text-primary not-italic">Cancelled.</span>
          </h1>

          <p className="text-muted-foreground mx-auto mb-12 max-w-md leading-relaxed font-medium lowercase">
            Your secure procurement session was terminated. No funds have been deducted from your
            account. Your selected modules remain in your cart.
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Button
              asChild
              className="shadow-primary/20 bg-primary group h-16 rounded-2xl text-sm font-black tracking-widest uppercase shadow-xl"
            >
              <Link href="/checkout" className="flex items-center justify-center gap-3">
                <ShoppingCart className="h-4 w-4" /> Retry Checkout
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="border-border text-muted-foreground hover:text-foreground group h-16 rounded-2xl text-sm font-black tracking-widest uppercase"
            >
              <Link href="/support" className="flex items-center justify-center gap-3">
                <Headset className="h-4 w-4" /> Get Assistance
              </Link>
            </Button>
          </div>

          <div className="border-border mt-12 border-t pt-8">
            <Link
              href="/shop"
              className="text-muted-foreground hover:text-primary group flex items-center justify-center gap-2 text-xs font-black tracking-widest uppercase transition-colors"
            >
              <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />{' '}
              Continue Browsing Gear
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
