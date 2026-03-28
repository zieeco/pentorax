'use client';

/**
 * OrderHistoryPage — User order dashboard
 * Displays authenticated user's procurement history.
 * Adheres to 150-line rule.
 */
import { ArrowRight, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { OrderCard } from '@/components/orders/OrderCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useOrders } from '@/hooks/orders-hooks';

export default function OrderHistoryPage() {
  const { data: orders = [], isLoading } = useOrders();

  if (isLoading)
    return (
      <div className="container mx-auto px-4 py-20 lg:px-8">
        <Skeleton className="mb-12 h-10 w-48 rounded-xl" />
        <div className="mx-auto max-w-4xl space-y-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 w-full rounded-[2rem]" />
          ))}
        </div>
      </div>
    );

  if (!orders || orders.length === 0)
    return (
      <div className="min-h-screen bg-gray-50/50">
        <div className="bg-gray-900 py-24 text-white">
          <div className="container mx-auto px-4 text-center lg:px-8">
            <h1 className="mb-4 text-4xl leading-none font-black tracking-tight md:text-6xl">
              Order <span className="text-primary italic">History.</span>
            </h1>
          </div>
        </div>
        <div className="container mx-auto px-4 py-24 text-center">
          <div className="mx-auto max-w-md">
            <div className="mb-10 inline-flex h-28 w-28 items-center justify-center rounded-[2.5rem] border border-gray-100 bg-white shadow-xl shadow-gray-200/50">
              <ShoppingBag className="h-12 w-12 text-gray-300" />
            </div>
            <h2 className="mb-4 text-3xl font-black text-gray-900 italic">No Records Found</h2>
            <p className="mb-10 px-4 leading-relaxed font-medium text-gray-500">
              Your procurement record is currently empty. Start shopping to build your clean energy
              portfolio.
            </p>
            <Button
              asChild
              className="shadow-primary/20 group h-14 rounded-2xl px-10 font-black tracking-widest uppercase shadow-xl transition-all hover:scale-105 active:scale-95"
            >
              <Link href="/shop" className="flex items-center gap-2">
                Procure Gear{' '}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50/50 pb-24">
      <div className="bg-gray-900 py-24 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-4 flex items-center gap-4">
            <Badge className="bg-primary/20 text-primary rounded-full border-none px-4 py-1 text-[10px] font-black uppercase">
              Archive Phase
            </Badge>
            <span className="text-xs font-black tracking-widest text-gray-400 uppercase italic">
              {orders.length} Records Locked
            </span>
          </div>
          <h1 className="text-4xl leading-none font-black tracking-tight md:text-6xl">
            Procurement <br />
            <span className="text-primary italic">Archives.</span>
          </h1>
        </div>
      </div>

      <div className="container mx-auto -mt-10 px-4 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-6">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
}
