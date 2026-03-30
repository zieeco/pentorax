'use client';

import { format } from 'date-fns';
import {
  Calendar,
  CheckCircle,
  Clock,
  MoreHorizontal,
  Package,
  TrendingUp,
  XCircle,
} from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TableCell, TableRow } from '@/components/ui/table';

const statusConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  pending: {
    label: 'Pending',
    color: 'bg-accent/10 text-accent border-accent/20',
    icon: <Clock className="h-3 w-3" />,
  },
  processing: {
    label: 'Processing',
    color: 'bg-primary/10 text-primary border-primary/20',
    icon: <Package className="h-3 w-3" />,
  },
  shipped: {
    label: 'Shipped',
    color: 'bg-primary/10 text-primary border-primary/20',
    icon: <TrendingUp className="h-3 w-3" />,
  },
  delivered: {
    label: 'Delivered',
    color: 'bg-secondary/10 text-secondary border-secondary/20',
    icon: <CheckCircle className="h-3 w-3" />,
  },
  cancelled: {
    label: 'Cancelled',
    color: 'bg-destructive/10 text-destructive border-destructive/20',
    icon: <XCircle className="h-3 w-3" />,
  },
};

interface OrderTableRowProps {
  order: any;
  onStatusChange: (orderId: string, newStatus: string) => void;
}

export function OrderTableRow({ order, onStatusChange }: OrderTableRowProps) {
  const config = statusConfig[order.status] || statusConfig.pending;

  return (
    <TableRow className="group hover:bg-muted/30 transition-colors">
      <TableCell className="px-8 py-5">
        <div className="group-hover:text-primary text-foreground font-black transition-colors">
          #{order.id.slice(0, 8).toUpperCase()}
        </div>
      </TableCell>
      <TableCell className="px-6 py-5">
        <div className="text-foreground leading-none font-bold">{order.shipping_name}</div>
        <div className="text-muted-foreground mt-1 text-[11px] font-medium tracking-tight uppercase">
          {order.user || 'Guest Purchase'}
        </div>
      </TableCell>
      <TableCell className="px-6 py-5">
        <div className="text-muted-foreground flex items-center text-xs font-bold">
          <Calendar className="text-muted-foreground/60 mr-2 h-3.5 w-3.5" />
          {format(new Date(order.created_at), 'MMM d, h:mm a')}
        </div>
      </TableCell>
      <TableCell className="px-6 py-5">
        <div className="text-foreground text-sm font-black">
          ₦{Number(order.total).toLocaleString()}
        </div>
      </TableCell>
      <TableCell className="px-6 py-5">
        <Badge
          className={`flex h-auto w-fit items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[9px] font-black uppercase shadow-none ${config.color}`}
        >
          {config.icon}
          {config.label}
        </Badge>
      </TableCell>
      <TableCell className="px-6 py-5 text-center">
        <div className="flex items-center justify-center gap-2">
          <Select value={order.status} onValueChange={(val) => onStatusChange(order.id, val)}>
            <SelectTrigger className="border-border bg-muted/30 hover:bg-muted h-8 w-32 rounded-lg text-[10px] font-bold shadow-none transition-colors">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl p-1">
              {Object.entries(statusConfig).map(([key, cfg]) => (
                <SelectItem key={key} value={key} className="rounded-lg py-2 text-xs font-bold">
                  {cfg.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-primary text-muted-foreground h-8 w-8 rounded-lg"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 rounded-xl p-2">
              <DropdownMenuItem
                asChild
                className="cursor-pointer rounded-lg py-2 text-xs font-bold"
              >
                <Link href={`/dashboard/orders/${order.id}`}>View Invoices</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer rounded-lg py-2 text-xs font-bold">
                Contact Customer
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive focus:bg-destructive/5 focus:text-destructive cursor-pointer rounded-xl py-2 text-xs font-bold">
                Cancel Order
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TableCell>
    </TableRow>
  );
}
