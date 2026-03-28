'use client';

/**
 * Newsletter Unsubscribe Page
 * Handles unsubscribe requests from email links using the token param.
 * Adheres to 150-line rule and premium shadcn-only UI.
 */
import { ArrowRight, CheckCircle, Home, Loader2, Mail, XCircle } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNewsletterUnsubscribe } from '@/hooks/newsletter-hooks';

function UnsubscribeContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const { mutate: unsubscribe, isPending, isSuccess, isError, error } = useNewsletterUnsubscribe();
  const [hasAttempted, setHasAttempted] = useState(false);

  useEffect(() => {
    if (token && !hasAttempted) {
      const frame = requestAnimationFrame(() => {
        setHasAttempted(true);
        unsubscribe(token);
      });
      return () => cancelAnimationFrame(frame);
    }
  }, [token, hasAttempted, unsubscribe]);

  if (!token) {
    return (
      <Card className="animate-in fade-in zoom-in w-full max-w-md rounded-[2.5rem] border-gray-100 bg-white/80 p-12 text-center shadow-2xl backdrop-blur-xl duration-500">
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-red-50">
          <XCircle className="h-10 w-10 text-red-500" />
        </div>
        <h1 className="mb-4 text-3xl leading-tight font-black text-gray-900 italic">
          Link Invalid
        </h1>
        <p className="mb-10 px-4 text-[10px] leading-relaxed font-medium tracking-widest text-gray-500 uppercase">
          This secure transmission link is incorrect or has expired. Please verify your source.
        </p>
        <Button
          asChild
          className="shadow-primary/20 hover:bg-primary group h-14 w-full rounded-2xl bg-gray-900 font-black tracking-widest text-white uppercase shadow-xl transition-all"
        >
          <Link href="/" className="flex items-center justify-center gap-2">
            Return to Base <Home className="h-4 w-4" />
          </Link>
        </Button>
      </Card>
    );
  }

  return (
    <Card className="animate-in fade-in zoom-in w-full max-w-md rounded-[2.5rem] border-gray-100 bg-white/80 p-12 shadow-2xl backdrop-blur-xl duration-500">
      {isPending ? (
        <div className="py-8 text-center">
          <Loader2 className="text-primary mx-auto mb-8 h-16 w-16 animate-spin" />
          <h1 className="mb-4 text-3xl font-black text-gray-900 italic">Processing...</h1>
          <p className="animate-pulse text-[10px] font-black tracking-[0.3em] text-gray-400 uppercase">
            Encryption Protocol Syncing
          </p>
        </div>
      ) : isSuccess ? (
        <div className="text-center">
          <div className="mx-auto mb-10 flex h-24 w-24 items-center justify-center rounded-[2rem] bg-green-50 shadow-inner">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="mb-4 text-3xl font-black text-gray-900 italic">Unsubscribed.</h1>
          <p className="mb-10 text-sm leading-relaxed font-medium text-gray-500 lowercase">
            Your intelligence link has been successfully severed. You will no longer receive
            periodic updates from our grid.
          </p>
          <div className="space-y-4">
            <Button
              asChild
              className="shadow-primary/20 bg-primary group h-14 w-full rounded-2xl font-black tracking-widest uppercase shadow-xl"
            >
              <Link href="/" className="flex items-center justify-center gap-2">
                Home <Home className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="h-14 w-full rounded-2xl font-black tracking-widest text-gray-400 uppercase hover:text-gray-900"
            >
              <Link href="/shop" className="flex items-center justify-center gap-2">
                Browse Gear <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div className="mx-auto mb-10 flex h-24 w-24 items-center justify-center rounded-[2rem] bg-red-50">
            <XCircle className="h-12 w-12 text-red-600" />
          </div>
          <h1 className="mb-4 text-3xl leading-tight font-black text-gray-900 italic">
            Sync Error
          </h1>
          <p className="mb-10 text-[10px] leading-relaxed font-medium tracking-widest text-gray-500 uppercase">
            {(error as any)?.response?.data?.error ||
              'Unsubscribe protocol failed. The link may have already been executed.'}
          </p>
          <div className="flex flex-col gap-4">
            <Button
              asChild
              className="shadow-primary/20 h-14 rounded-2xl bg-gray-900 font-black tracking-widest uppercase shadow-xl"
            >
              <Link href="/">Back to Home</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="flex h-14 items-center gap-2 rounded-2xl border-gray-100 font-black tracking-widest text-gray-400 uppercase hover:text-gray-900"
            >
              <a href="mailto:support@pentorax.com">
                <Mail className="h-4 w-4" /> Contact Intel
              </a>
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}

export default function UnsubscribePage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-50 p-6">
      {/* Decorative Background Elements */}
      <div className="bg-primary/10 absolute top-0 right-0 -mt-48 -mr-48 h-[500px] w-[500px] rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 -mb-48 -ml-48 h-[500px] w-[500px] rounded-full bg-blue-100/50 blur-[120px]" />

      <div className="relative z-10 container flex justify-center">
        <Suspense fallback={<Loader2 className="text-primary h-12 w-12 animate-spin" />}>
          <UnsubscribeContent />
        </Suspense>
      </div>
    </div>
  );
}
