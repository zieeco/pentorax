/**
 * ForgotPasswordLeftPane — Decorative left panel for the forgot password page
 */
import { LifeBuoy } from 'lucide-react';
import { AuthLogo } from '@/components/auth/AuthLogo';

export function ForgotPasswordLeftPane() {
  return (
    <div className="relative hidden flex-col overflow-hidden bg-[#fdf2f2] lg:flex lg:w-[50%]">
      <div className="p-6">
        <AuthLogo />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center px-12">
        <div className="relative mb-8 w-full max-w-sm">
          <div className="absolute inset-0 -z-10 rounded-full bg-red-500/5 blur-[80px]" />
          <div className="flex -rotate-2 items-center justify-center rounded-[2.5rem] border border-red-50 bg-white p-10 shadow-2xl">
            <div className="rounded-full bg-red-50 p-6">
              <LifeBuoy className="h-20 w-20 animate-spin text-red-500" />
            </div>
          </div>
        </div>
        <div className="text-center">
          <h2 className="mb-3 text-[3.2rem] leading-tight font-black text-gray-900">
            Security first.
          </h2>
          <p className="text-base font-medium text-gray-500">
            Protecting your energy assets starts with a secure account.
          </p>
        </div>
      </div>
    </div>
  );
}
