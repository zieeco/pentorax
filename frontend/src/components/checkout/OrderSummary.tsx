'use client';

/**
 * OrderSummary Component - Real-time checkout calculation
 * Refactored for Next.js 16 and premium styling.
 */
import { ShieldCheck, ShoppingBag } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { CartItem } from '@/types/cart';

interface OrderSummaryProps {
  items: CartItem[];
  total: number;
}

const formatPrice = (price: string | number) => {
  const num = typeof price === 'string' ? parseFloat(price) : price;
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(num);
};

export function OrderSummary({ items, total }: OrderSummaryProps) {
  return (
    <Card className="border-border bg-card sticky top-8 rounded-[2.5rem] border p-8 shadow-xl">
      <div className="mb-8 flex items-center gap-3">
        <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-xl">
          <ShoppingBag className="text-primary h-5 w-5" />
        </div>
        <h2 className="text-foreground text-xl font-black">Procurement Summary</h2>
      </div>

      <div className="scrollbar-hide mb-8 max-h-[40vh] space-y-6 overflow-y-auto pr-2">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between gap-4">
            <div className="min-w-0">
              <p className="text-foreground line-clamp-1 truncate text-sm font-black">
                {item.product.name}
              </p>
              <p className="text-muted-foreground mt-1 text-[10px] font-black tracking-widest uppercase">
                Qty: {item.quantity}
              </p>
            </div>
            <span className="text-foreground text-sm font-black italic">
              {formatPrice(item.subtotal)}
            </span>
          </div>
        ))}
      </div>

      <div className="border-border mb-6 h-px border-t" />

      <div className="mb-8 space-y-4">
        <div className="text-muted-foreground flex items-center justify-between text-xs font-black tracking-widest uppercase">
          <span>Base Value</span>
          <span className="text-foreground italic">{formatPrice(total)}</span>
        </div>
        <div className="text-muted-foreground flex items-center justify-between text-xs font-black tracking-widest uppercase">
          <span>Logistics</span>
          <span className="text-secondary italic">COMPLIMENTARY</span>
        </div>
        <div className="border-border flex items-center justify-between border-t pt-2">
          <span className="text-foreground text-sm font-black tracking-widest uppercase">
            Aggregate Total
          </span>
          <span className="text-primary text-2xl font-black italic">{formatPrice(total)}</span>
        </div>
      </div>

      <div className="border-border bg-muted flex items-center gap-4 rounded-2xl border p-4">
        <ShieldCheck className="text-primary h-5 w-5" />
        <p className="text-muted-foreground text-[10px] leading-relaxed font-black uppercase">
          Secure payment processing via Paystack API infrastructure.
        </p>
      </div>
    </Card>
  );
}
