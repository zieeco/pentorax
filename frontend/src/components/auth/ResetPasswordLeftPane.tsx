/**
 * ResetPasswordLeftPane — Decorative left panel for the reset password page
 */
import { ShieldCheck } from 'lucide-react';
import { AuthLogo } from '@/components/auth/AuthLogo';

export function ResetPasswordLeftPane() {
  return (
    <div className="relative hidden flex-col overflow-hidden bg-[#f0fff4] lg:flex lg:w-[50%]">
      <div className="p-6">
        <AuthLogo />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center px-12">
        <div className="relative mb-8 w-full max-w-sm">
          <div className="absolute inset-0 -z-10 rounded-full bg-green-500/5 blur-[80px]" />
          <div className="flex rotate-3 items-center justify-center rounded-[2.5rem] border border-green-50 bg-white p-10 shadow-2xl">
            <div className="rounded-full bg-green-50 p-6">
              <ShieldCheck className="h-20 w-20 text-green-600" />
            </div>
          </div>
        </div>
        <div className="text-center">
          <h2 className="mb-3 text-[3.2rem] leading-tight font-black text-gray-900">
            You&apos;re almost there.
          </h2>
          <p className="text-base font-medium text-gray-500">
            Create a strong, memorable password to regain access.
          </p>
        </div>
      </div>
    </div>
  );
}
