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
  subtotal: number;
  shipping?: number;
  total: number;
}

export function CartSummary({ itemCount, subtotal, shipping, total }: CartSummaryProps) {
  const router = useRouter();

  return (
    <Card className="sticky top-8 rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-xl shadow-gray-200/50">
      <div className="mb-8 flex items-center gap-3">
        <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-xl">
          <ShoppingCart className="text-primary h-5 w-5" />
        </div>
        <h2 className="text-xl font-black text-gray-900">Order Totals</h2>
      </div>

      <div className="mb-8 space-y-4">
        <div className="flex items-center justify-between text-xs font-black tracking-widest text-gray-400 uppercase">
          <span>Subtotal ({itemCount} units)</span>
          <span className="text-gray-900 italic">₦{subtotal.toLocaleString()}</span>
        </div>

        <div className="flex items-center justify-between text-xs font-black tracking-widest text-gray-400 uppercase">
          <span>Logistics</span>
          <span className="text-gray-900 italic">
            {shipping === 0
              ? 'COMPLIMENTARY'
              : shipping !== undefined
                ? `₦${shipping.toLocaleString()}`
                : 'CALCULATED AT CHECKOUT'}
          </span>
        </div>

        <div className="my-2 h-px bg-gray-100" />

        <div className="flex items-center justify-between">
          <span className="text-sm font-black tracking-widest text-gray-900 uppercase">
            Total Liability
          </span>
          <span className="text-primary text-2xl font-black italic">₦{total.toLocaleString()}</span>
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
          className="h-12 w-full rounded-xl text-[10px] font-black tracking-widest text-gray-400 uppercase hover:text-gray-900"
          onClick={() => router.push('/shop')}
        >
          Continue Exploration
        </Button>
      </div>

      <div className="mt-8 space-y-4">
        {[
          { icon: ShieldCheck, text: 'Vault-Grade Security', color: 'text-emerald-500' },
          { icon: Truck, text: 'Expedited Dispatch', color: 'text-blue-500' },
          { icon: RotateCcw, text: '30-Day Reversal Policy', color: 'text-amber-500' },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <item.icon className={`h-4 w-4 ${item.color}`} />
            <span className="text-[10px] font-black tracking-widest text-gray-400 uppercase">
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
