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
    color: 'bg-brand-yellow/10 text-brand-yellow border-brand-yellow/20',
    icon: <Clock className="h-3 w-3" />,
  },
  processing: {
    label: 'Processing',
    color: 'bg-brand-indigo/10 text-brand-indigo border-brand-indigo/20',
    icon: <Package className="h-3 w-3" />,
  },
  shipped: {
    label: 'Shipped',
    color: 'bg-primary/10 text-primary border-primary/20',
    icon: <TrendingUp className="h-3 w-3" />,
  },
  delivered: {
    label: 'Delivered',
    color: 'bg-brand-green/10 text-brand-green border-brand-green/20',
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
    <TableRow className="group transition-colors hover:bg-gray-50/50">
      <TableCell className="px-8 py-5">
        <div className="group-hover:text-primary font-black text-gray-900 transition-colors">
          #{order.id.slice(0, 8).toUpperCase()}
        </div>
      </TableCell>
      <TableCell className="px-6 py-5">
        <div className="leading-none font-bold text-gray-900">{order.shipping_name}</div>
        <div className="mt-1 text-[11px] font-medium tracking-tight text-gray-400 uppercase">
          {order.user || 'Guest Purchase'}
        </div>
      </TableCell>
      <TableCell className="px-6 py-5">
        <div className="flex items-center text-xs font-bold text-gray-600">
          <Calendar className="mr-2 h-3.5 w-3.5 text-gray-400" />
          {format(new Date(order.created_at), 'MMM d, h:mm a')}
        </div>
      </TableCell>
      <TableCell className="px-6 py-5">
        <div className="text-sm font-black text-gray-900">
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
            <SelectTrigger className="h-8 w-32 rounded-lg border-gray-100 bg-gray-50/50 text-[10px] font-bold shadow-none transition-colors hover:bg-gray-100">
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
                className="hover:text-primary h-8 w-8 rounded-lg text-gray-400"
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
