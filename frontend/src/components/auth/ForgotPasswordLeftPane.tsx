/**
 * ForgotPasswordLeftPane — Decorative left panel for the forgot password page
 */
import { LifeBuoy } from 'lucide-react';
import { AuthLogo } from '@/components/auth/AuthLogo';

export function ForgotPasswordLeftPane() {
  return (
    <div className="bg-destructive/10 relative hidden flex-col overflow-hidden lg:flex lg:w-[50%]">
      <div className="p-6">
        <AuthLogo />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center px-12">
        <div className="relative mb-8 w-full max-w-sm">
          <div className="bg-destructive/5 absolute inset-0 -z-10 rounded-full blur-[80px]" />
          <div className="border-destructive/10 bg-card flex -rotate-2 items-center justify-center rounded-[2.5rem] border p-10 shadow-2xl">
            <div className="bg-destructive/10 rounded-full p-6">
              <LifeBuoy className="text-destructive h-20 w-20 animate-spin" />
            </div>
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-foreground mb-3 text-[3.2rem] leading-tight font-black">
            Security first.
          </h2>
          <p className="text-muted-foreground text-base font-medium">
            Protecting your energy assets starts with a secure account.
          </p>
        </div>
      </div>
    </div>
  );
}
