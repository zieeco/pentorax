'use client';

/**
 * Auth Confirmation Page — shows success/info messages after auth actions
 * Mirrors frontend/src/pages/auth/AuthConfirmationPage.tsx
 */
import { ArrowRight, CheckCircle2, Info } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AuthLogo } from '@/components/auth/AuthLogo';
import { Button } from '@/components/ui/button';

type ConfirmationType = 'signup' | 'recovery' | 'email-verified' | 'info';

interface ConfirmationContent {
  title: string;
  message: string;
  type: 'success' | 'info';
  bgColor: string;
  headline: string;
}

function getContent(type: ConfirmationType): ConfirmationContent {
  switch (type) {
    case 'signup':
      return {
        title: 'Account Created Successfully!',
        message:
          "We've sent a verification link to your email. Please check your inbox and verify your account to start managing your solar assets.",
        type: 'success',
        bgColor: 'bg-[#f0fff4]',
        headline: 'Great news!',
      };
    case 'email-verified':
      return {
        title: 'Email Verified!',
        message:
          'Your email has been verified. You can now log in and start your energy journey with PentoraX.',
        type: 'success',
        bgColor: 'bg-[#f0fff4]',
        headline: 'Great news!',
      };
    case 'recovery':
      return {
        title: 'Password Updated Successfully!',
        message: 'Your password has been reset. You can now log in with your new credentials.',
        type: 'success',
        bgColor: 'bg-[#f0fff4]',
        headline: 'Great news!',
      };
    default:
      return {
        title: 'Check Your Email',
        message:
          "We've sent you an email with further instructions. Please check your inbox and follow the link provided.",
        type: 'info',
        bgColor: 'bg-[#eff6ff]',
        headline: 'Heads up.',
      };
  }
}

export default function AuthConfirmationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = (searchParams.get('type') as ConfirmationType) || 'info';
  const content = getContent(type);

  return (
    <div className="font-quicksand flex h-screen flex-col overflow-hidden bg-white lg:flex-row">
      {/* Left Pane — Dynamic */}
      <div
        className={`relative hidden lg:flex lg:w-[50%] ${content.bgColor} flex-col overflow-hidden`}
      >
        <div className="p-6">
          <AuthLogo />
        </div>
        <div className="flex flex-1 flex-col items-center justify-center px-12">
          <div className="relative mb-8 w-full max-w-sm">
            <div className="flex animate-bounce items-center justify-center rounded-[2.5rem] border border-gray-50 bg-white p-12 shadow-2xl">
              {content.type === 'success' ? (
                <CheckCircle2 className="h-20 w-20 text-green-500" />
              ) : (
                <Info className="text-primary h-20 w-20" />
              )}
            </div>
          </div>
          <div className="text-center">
            <h2 className="mb-3 text-[3.2rem] leading-tight font-black text-gray-900">
              {content.headline}
            </h2>
            <p className="text-base font-medium text-gray-500">
              Everything is set for your next energy milestone.
            </p>
          </div>
        </div>
      </div>

      {/* Right Pane — Content */}
      <div className="flex h-screen flex-1 flex-col">
        <div className="p-6" />
        <div className="flex flex-1 items-center justify-center px-6">
          <div className="w-full max-w-[440px] rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-[0_24px_50px_-12px_rgba(0,0,0,0.08)] lg:p-10">
            <h1 className="mb-4 text-[2.2rem] font-black tracking-tight text-gray-900">
              {content.title}
            </h1>
            <p className="mb-8 leading-relaxed font-medium text-gray-500">{content.message}</p>
            <Button
              onClick={() => router.push('/auth/login')}
              className="hover:bg-primary group h-auto w-full rounded-xl bg-gray-900 py-4 text-lg font-bold text-white shadow-xl transition-all active:scale-[0.98]"
            >
              Continue to Sign In
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <div className="mt-6">
              <Link
                href="/"
                className="text-xs font-black tracking-widest text-gray-400 uppercase transition-colors hover:text-gray-900"
              >
                Back to Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
