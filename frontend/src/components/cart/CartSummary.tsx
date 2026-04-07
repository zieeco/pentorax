'use client';

/**
 * CartSummary Component - Premium order checkout box
 * Refactored for Next.js 16 and glassmorphic styling.
 */
import { RotateCcw, ShieldCheck, ShoppingCart, Truck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface CartSummaryProps {
  itemCount: number;
  subtotal: string | number;
  shipping?: string | number;
  total: string | number;
}

export function CartSummary({ itemCount, subtotal, shipping, total }: CartSummaryProps) {
  const router = useRouter();

  return (
    <Card className="border-border bg-card sticky top-8 rounded-[2.5rem] border p-8 shadow-xl">
      <div className="mb-8 flex items-center gap-3">
        <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-xl">
          <ShoppingCart className="text-primary h-5 w-5" />
        </div>
        <h2 className="text-foreground text-xl font-black">Order Totals</h2>
      </div>

      <div className="mb-8 space-y-4">
        <div className="text-muted-foreground flex items-center justify-between text-xs font-black tracking-widest uppercase">
          <span>Subtotal ({itemCount} units)</span>
          <span className="text-foreground italic">₦{Number(subtotal).toLocaleString()}</span>
        </div>

        <div className="text-muted-foreground flex items-center justify-between text-xs font-black tracking-widest uppercase">
          <span>Logistics</span>
          <span className="text-foreground italic">
            {shipping === 0 || shipping === '0'
              ? 'COMPLIMENTARY'
              : shipping !== undefined
                ? `₦${Number(shipping).toLocaleString()}`
                : 'CALCULATED AT CHECKOUT'}
          </span>
        </div>

        <div className="border-border/50 my-2 h-px border-t" />

        <div className="flex items-center justify-between">
          <span className="text-foreground text-sm font-black tracking-widest uppercase">
            Total Liability
          </span>
          <span className="text-primary text-2xl font-black italic">
            ₦{Number(total).toLocaleString()}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          className="shadow-primary/20 h-14 w-full rounded-2xl text-sm font-black tracking-widest uppercase shadow-xl transition-all active:scale-95"
          onClick={() => router.push('/checkout')}
          disabled={itemCount === 0}
        >
          Finalize Transaction
        </Button>

        <Button
          variant="ghost"
          className="text-muted-foreground hover:text-foreground h-12 w-full rounded-xl text-[10px] font-black tracking-widest uppercase"
          onClick={() => router.push('/shop')}
        >
          Continue Exploration
        </Button>
      </div>

      <div className="mt-8 space-y-4">
        {[
          { icon: ShieldCheck, text: 'Vault-Grade Security', color: 'text-secondary' },
          { icon: Truck, text: 'Expedited Dispatch', color: 'text-primary' },
          { icon: RotateCcw, text: '30-Day Reversal Policy', color: 'text-accent' },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <item.icon className={`h-4 w-4 ${item.color}`} />
            <span className="text-muted-foreground text-[10px] font-black tracking-widest uppercase">
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
