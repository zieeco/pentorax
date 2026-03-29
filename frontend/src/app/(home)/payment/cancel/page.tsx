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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-50 p-6">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 -mt-48 -ml-48 h-[600px] w-[600px] rounded-full bg-amber-100/30 blur-[140px]" />
      <div className="absolute right-0 bottom-0 -mr-48 -mb-48 h-[600px] w-[600px] rounded-full bg-gray-200/50 blur-[140px]" />

      <Card className="animate-in fade-in slide-in-from-bottom-6 relative z-10 w-full max-w-2xl rounded-[3rem] border-gray-100 bg-white/80 p-8 shadow-2xl backdrop-blur-2xl duration-700 md:p-16">
        <div className="text-center">
          <div className="mx-auto mb-10 flex h-24 w-24 items-center justify-center rounded-[2.5rem] bg-amber-50 shadow-inner">
            <ShieldAlert className="h-12 w-12 text-amber-600" />
          </div>

          <Badge className="mb-6 rounded-full border-none bg-amber-100 px-4 py-1 text-[10px] leading-none font-black tracking-widest text-amber-700 uppercase">
            Transaction Aborted
          </Badge>

          <h1 className="mb-6 text-4xl leading-none font-black tracking-tighter text-gray-900 lowercase italic md:text-6xl">
            Payment <br />
            <span className="text-amber-600 not-italic">Cancelled.</span>
          </h1>

          <p className="mx-auto mb-12 max-w-md leading-relaxed font-medium text-gray-500 lowercase">
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
              className="group h-16 rounded-2xl border-gray-100 text-sm font-black tracking-widest text-gray-400 uppercase hover:text-gray-900"
            >
              <Link href="/support" className="flex items-center justify-center gap-3">
                <Headset className="h-4 w-4" /> Get Assistance
              </Link>
            </Button>
          </div>

          <div className="mt-12 border-t border-gray-50 pt-8">
            <Link
              href="/shop"
              className="hover:text-primary group flex items-center justify-center gap-2 text-xs font-black tracking-widest text-gray-400 uppercase transition-colors"
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
