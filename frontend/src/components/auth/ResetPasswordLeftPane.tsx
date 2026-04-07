/**
 * ResetPasswordLeftPane — Decorative left panel for the reset password page
 */
import { ShieldCheck } from 'lucide-react';
import { AuthLogo } from '@/components/auth/AuthLogo';

export function ResetPasswordLeftPane() {
  return (
    <div className="bg-secondary/10 relative hidden flex-col overflow-hidden lg:flex lg:w-[50%]">
      <div className="p-6">
        <AuthLogo />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center px-12">
        <div className="relative mb-8 w-full max-w-sm">
          <div className="bg-secondary/5 absolute inset-0 -z-10 rounded-full blur-[80px]" />
          <div className="border-secondary/10 bg-card flex rotate-3 items-center justify-center rounded-[2.5rem] border p-10 shadow-2xl">
            <div className="bg-secondary/10 rounded-full p-6">
              <ShieldCheck className="text-secondary h-20 w-20" />
            </div>
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-foreground mb-3 text-[3.2rem] leading-tight font-black">
            You&apos;re almost there.
          </h2>
          <p className="text-muted-foreground text-base font-medium">
            Create a strong, memorable password to regain access.
          </p>
        </div>
      </div>
    </div>
  );
}
