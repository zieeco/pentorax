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
    className: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    icon: Clock,
  },
  processing: {
    label: 'Processing',
    className: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    icon: Box,
  },
  shipped: {
    label: 'Shipped',
    className: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
    icon: Package,
  },
  delivered: {
    label: 'Delivered',
    className: 'bg-secondary/10 text-secondary border-secondary/20',
    icon: CheckCircle,
  },
  cancelled: {
    label: 'Cancelled',
    className: 'bg-destructive/10 text-destructive border-destructive/20',
    icon: XCircle,
  },
};

export function OrderCard({ order }: OrderCardProps) {
  const config = statusConfig[order.status] || {
    label: order.status,
    className: 'bg-muted text-muted-foreground border-border',
    icon: Box,
  };
  const StatusIcon = config.icon;

  return (
    <Card className="border-border bg-card group hover:shadow-border/50 rounded-[2rem] p-6 shadow-sm transition-all duration-500 hover:shadow-xl">
      <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex w-full items-center gap-6 sm:w-auto">
          <div className="bg-muted border-border group-hover:bg-primary/5 flex h-16 w-16 items-center justify-center rounded-2xl border transition-colors duration-500">
            <StatusIcon className="text-muted-foreground group-hover:text-primary h-7 w-7 transition-colors" />
          </div>

          <div className="min-w-0">
            <div className="mb-2 flex items-center gap-3">
              <h3 className="text-foreground text-lg leading-none font-black">
                Order #{order.id.slice(0, 8).toUpperCase()}
              </h3>
              <Badge
                className={`rounded-lg border px-3 py-1 text-[10px] font-black uppercase shadow-sm ${config.className}`}
              >
                {config.label}
              </Badge>
            </div>
            <p className="text-muted-foreground mt-1 text-xs font-black tracking-widest uppercase">
              Initiated {formatDistanceToNow(new Date(order.created_at), { addSuffix: true })}
            </p>
          </div>
        </div>

        <div className="flex w-full items-center justify-between gap-8 sm:w-auto sm:gap-12 sm:text-right">
          <div className="flex flex-col">
            <span className="text-muted-foreground mb-1 text-[10px] font-black tracking-widest uppercase">
              Liability
            </span>
            <span className="text-primary text-2xl font-black italic">
              ₦{Number(order.total).toLocaleString()}
            </span>
          </div>

          <Button
            variant="ghost"
            className="hover:bg-primary bg-muted text-foreground hover:text-primary-foreground h-14 w-14 rounded-2xl shadow-sm transition-all duration-300"
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
