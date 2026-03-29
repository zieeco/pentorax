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
    <Card className="sticky top-8 rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-xl shadow-gray-200/50">
      <div className="mb-8 flex items-center gap-3">
        <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-xl">
          <ShoppingBag className="text-primary h-5 w-5" />
        </div>
        <h2 className="text-xl font-black text-gray-900">Procurement Summary</h2>
      </div>

      <div className="scrollbar-hide mb-8 max-h-[40vh] space-y-6 overflow-y-auto pr-2">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between gap-4">
            <div className="min-w-0">
              <p className="line-clamp-1 truncate text-sm font-black text-gray-900">
                {item.product.name}
              </p>
              <p className="mt-1 text-[10px] font-black tracking-widest text-gray-400 uppercase">
                Qty: {item.quantity}
              </p>
            </div>
            <span className="text-sm font-black text-gray-900 italic">
              {formatPrice(item.subtotal)}
            </span>
          </div>
        ))}
      </div>

      <div className="mb-6 h-px bg-gray-100" />

      <div className="mb-8 space-y-4">
        <div className="flex items-center justify-between text-xs font-black tracking-widest text-gray-400 uppercase">
          <span>Base Value</span>
          <span className="text-gray-900 italic">{formatPrice(total)}</span>
        </div>
        <div className="flex items-center justify-between text-xs font-black tracking-widest text-gray-400 uppercase">
          <span>Logistics</span>
          <span className="text-emerald-500 italic">COMPLIMENTARY</span>
        </div>
        <div className="flex items-center justify-between border-t border-gray-50 pt-2">
          <span className="text-sm font-black tracking-widest text-gray-900 uppercase">
            Aggregate Total
          </span>
          <span className="text-primary text-2xl font-black italic">{formatPrice(total)}</span>
        </div>
      </div>

      <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-4">
        <ShieldCheck className="text-primary h-5 w-5" />
        <p className="text-[10px] leading-relaxed font-black text-gray-500 uppercase">
          Secure payment processing via Paystack API infrastructure.
        </p>
      </div>
    </Card>
  );
}
