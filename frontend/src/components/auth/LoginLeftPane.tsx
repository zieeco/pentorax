/**
 * LoginLeftPane — Decorative left panel for the login page
 */
import { Zap } from 'lucide-react';
import Image from 'next/image';
import { AuthLogo } from '@/components/auth/AuthLogo';

function FloatingBadge({
  name,
  className,
  style,
}: {
  name: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`bg-foreground text-background rounded-full px-4 py-2 text-xs font-bold shadow-xl ${className}`}
      style={style}
    >
      {name}
    </div>
  );
}

export function LoginLeftPane() {
  return (
    <div className="bg-muted/50 relative hidden flex-col overflow-hidden lg:flex lg:w-[50%]">
      <div className="p-6">
        <AuthLogo />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center px-12">
        <FloatingBadge
          name="Solar Power"
          className="absolute top-[22%] left-[18%] animate-bounce"
        />
        <FloatingBadge
          name="Clean Energy"
          className="absolute top-[20%] left-[35%] animate-bounce"
          style={{ animationDelay: '1s' }}
        />
        <div className="relative mb-8 w-full max-w-md">
          <div className="bg-primary/10 absolute inset-0 -z-10 rounded-full blur-[80px]" />
          <div className="border-border/50 bg-card/40 relative rounded-[2.5rem] border p-6 shadow-2xl backdrop-blur-md">
            <Image
              src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80"
              alt="Solar Future"
              width={800}
              height={280}
              className="h-[280px] w-full -rotate-2 transform rounded-[1.5rem] object-cover shadow-lg transition-transform duration-700 hover:rotate-0"
            />
            <div className="bg-primary absolute -right-3 -bottom-3 rounded-2xl p-4 shadow-2xl">
              <Zap className="text-primary-foreground h-6 w-6" />
            </div>
          </div>
        </div>
        <div className="max-w-lg text-center">
          <h2 className="text-foreground mb-4 text-[2.8rem] leading-[1.05] font-black tracking-tight">
            Sweet energy and even <br />
            <span className="border-border bg-card rounded-xl border px-3 py-1 shadow-sm">
              sweeter savings
            </span>
          </h2>
          <p className="text-muted-foreground text-base font-medium">
            Made for remote teams and sustainable households everywhere.
          </p>
        </div>
      </div>
    </div>
  );
}
