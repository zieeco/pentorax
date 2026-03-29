'use client';

/**
 * OrderCard Component - Premium order summary for user history
 * Refactored for Next.js 16 and high-end visual appeal.
 */
import { formatDistanceToNow } from 'date-fns';
import { Box, CheckCircle, ChevronRight, Clock, Package, XCircle } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface OrderCardProps {
  order: {
    id: string;
    created_at: string;
    status: string;
    total: number;
    items?: any[]; // For future use
  };
}

const statusConfig: Record<string, { label: string; className: string; icon: any }> = {
  pending: {
    label: 'Pending',
    className: 'bg-amber-50 text-amber-600 border-amber-100',
    icon: Clock,
  },
  processing: {
    label: 'Processing',
    className: 'bg-blue-50 text-blue-600 border-blue-100',
    icon: Box,
  },
  shipped: {
    label: 'Shipped',
    className: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    icon: Package,
  },
  delivered: {
    label: 'Delivered',
    className: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    icon: CheckCircle,
  },
  cancelled: {
    label: 'Cancelled',
    className: 'bg-red-50 text-red-600 border-red-100',
    icon: XCircle,
  },
};

export function OrderCard({ order }: OrderCardProps) {
  const config = statusConfig[order.status] || {
    label: order.status,
    className: 'bg-gray-50 text-gray-600',
    icon: Box,
  };
  const StatusIcon = config.icon;

  return (
    <Card className="group rounded-[2rem] border-gray-100 bg-white p-6 shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-gray-200/50">
      <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex w-full items-center gap-6 sm:w-auto">
          <div className="group-hover:bg-primary/5 flex h-16 w-16 items-center justify-center rounded-2xl border border-gray-100 bg-gray-50 transition-colors duration-500">
            <StatusIcon className="group-hover:text-primary h-7 w-7 text-gray-400 transition-colors" />
          </div>

          <div className="min-w-0">
            <div className="mb-2 flex items-center gap-3">
              <h3 className="text-lg leading-none font-black text-gray-900">
                Order #{order.id.slice(0, 8).toUpperCase()}
              </h3>
              <Badge
                className={`rounded-lg border px-3 py-1 text-[10px] font-black uppercase shadow-sm ${config.className}`}
              >
                {config.label}
              </Badge>
            </div>
            <p className="mt-1 text-xs font-black tracking-widest text-gray-400 uppercase">
              Initiated {formatDistanceToNow(new Date(order.created_at), { addSuffix: true })}
            </p>
          </div>
        </div>

        <div className="flex w-full items-center justify-between gap-8 sm:w-auto sm:gap-12 sm:text-right">
          <div className="flex flex-col">
            <span className="mb-1 text-[10px] font-black tracking-widest text-gray-400 uppercase">
              Liability
            </span>
            <span className="text-primary text-2xl font-black italic">
              ₦{Number(order.total).toLocaleString()}
            </span>
          </div>

          <Button
            variant="ghost"
            className="hover:bg-primary h-14 w-14 rounded-2xl bg-gray-50 text-gray-900 shadow-sm transition-all duration-300 hover:text-white"
            asChild
          >
            <Link href={`/orders/${order.id}`}>
              <ChevronRight className="h-6 w-6" />
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}

function CheckCircleIcon() {
  return <CheckCircle className="h-10 w-10" />;
}
function XCircleIcon() {
  return <XCircle className="h-10 w-10" />;
}
