'use client';

/**
 * EmptyCart Component - Premium zero-state display
 * Refactored for Next.js 16 and high-end visual appeal.
 */
import { ArrowRight, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function EmptyCart() {
  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <div className="mx-auto max-w-md">
        <div className="group border-border bg-muted/30 relative mb-10 inline-flex h-32 w-32 items-center justify-center overflow-hidden rounded-[2.5rem] border shadow-xl">
          <div className="bg-primary/5 absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <ShoppingBag className="text-primary h-12 w-12 transition-transform duration-500 group-hover:scale-110" />
        </div>

        <h2 className="text-foreground mb-4 text-3xl font-black tracking-tight">
          Your Cart is Dormant
        </h2>

        <p className="text-muted-foreground mb-10 leading-relaxed font-medium">
          The future of energy begins with a single selection. Your cart is currently empty and
          awaiting high-performance gear.
        </p>

        <Button
          asChild
          className="shadow-primary/20 group h-14 rounded-2xl px-10 font-black tracking-widest uppercase shadow-xl transition-all hover:scale-105 active:scale-95"
        >
          <Link href="/shop" className="flex items-center gap-2">
            Begin Procurement
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>

        <div className="border-border mt-16 border-t pt-10">
          <p className="text-muted-foreground mb-6 text-[10px] font-black tracking-widest uppercase">
            Core Architectures
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Solar Panels', 'Inverters', 'Batteries'].map((cat) => (
              <Button
                key={cat}
                variant="outline"
                size="sm"
                asChild
                className="hover:bg-primary/5 hover:border-primary/20 hover:text-primary border-border rounded-xl font-bold transition-all"
              >
                <Link href={`/shop?category=${cat.toLowerCase().replace(' ', '-')}`}>{cat}</Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
