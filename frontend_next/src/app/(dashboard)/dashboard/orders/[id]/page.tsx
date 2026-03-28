'use client';

import { format } from 'date-fns';
import {
  ArrowLeft,
  Calendar,
  CreditCard,
  Mail,
  MapPin,
  Package,
  Phone,
  Printer,
  Truck,
  User,
} from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useOrder, useUpdateOrderStatus } from '@/hooks/orders-hooks';

const statusConfig: Record<string, { label: string; color: string }> = {
  pending: {
    label: 'Pending',
    color: 'bg-brand-yellow/10 text-brand-yellow border-brand-yellow/20',
  },
  processing: {
    label: 'Processing',
    color: 'bg-brand-indigo/10 text-brand-indigo border-brand-indigo/20',
  },
  shipped: { label: 'Shipped', color: 'bg-primary/10 text-primary border-primary/20' },
  delivered: {
    label: 'Delivered',
    color: 'bg-brand-green/10 text-brand-green border-brand-green/20',
  },
  cancelled: {
    label: 'Cancelled',
    color: 'bg-destructive/10 text-destructive border-destructive/20',
  },
};

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;
  const { data: order, isLoading, error } = useOrder(orderId);
  const updateStatus = useUpdateOrderStatus();

  const handleStatusChange = (newStatus: any) => {
    updateStatus.mutate(
      { orderId, status: newStatus },
      {
        onSuccess: () => toast.success(`Order status updated to ${newStatus}`),
        onError: () => toast.error('Failed to update status'),
      }
    );
  };

  if (isLoading)
    return (
      <div className="animate-pulse space-y-4 p-8">
        <div className="h-8 w-1/4 rounded-xl bg-gray-100" />
        <div className="h-64 w-full rounded-[2rem] bg-gray-100" />
      </div>
    );
  if (error || !order)
    return <div className="p-8 text-center font-bold text-red-500">Error loading order.</div>;

  const status = statusConfig[order.status] || statusConfig.pending;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 space-y-8 duration-700">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-xl">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-gray-900">
              Order #{order.id.slice(0, 8).toUpperCase()}
            </h1>
            <div className="mt-1 flex items-center gap-2">
              <Badge
                className={`rounded-lg border px-2.5 py-1 text-[10px] font-black uppercase shadow-none ${status.color}`}
              >
                {status.label}
              </Badge>
              <span className="text-sm font-medium text-gray-400">
                Placed on {format(new Date(order.created_at), 'MMM dd, yyyy')},{' '}
                {format(new Date(order.created_at), 'h:mm a')}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="rounded-xl border-gray-100 bg-white font-bold"
            onClick={() => window.print()}
          >
            <Printer className="mr-2 h-4 w-4" />
            Print Invoice
          </Button>
          <Button className="rounded-xl font-bold">Contact Customer</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column: Line Items & Summary */}
        <div className="space-y-8 lg:col-span-2">
          <Card className="overflow-hidden rounded-[2.5rem] border-gray-100 bg-white shadow-sm">
            <CardHeader className="px-8 pt-8 pb-4">
              <CardTitle className="text-xl font-black text-gray-900">Order Items</CardTitle>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-50 hover:bg-transparent">
                    <TableHead className="pl-0 text-[10px] font-black tracking-widest text-gray-400 uppercase">
                      Product
                    </TableHead>
                    <TableHead className="text-center text-[10px] font-black tracking-widest text-gray-400 uppercase">
                      Qty
                    </TableHead>
                    <TableHead className="pr-0 text-right text-[10px] font-black tracking-widest text-gray-400 uppercase">
                      Total
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items.map((item) => (
                    <TableRow key={item.id} className="border-gray-50 hover:bg-transparent">
                      <TableCell className="py-4 pl-0">
                        <div className="flex items-center gap-4">
                          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
                            {item.product.featured_image ? (
                              <Image
                                src={item.product.featured_image}
                                alt={item.product.name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <Package className="m-3 h-6 w-6 text-gray-200" />
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{item.product.name}</p>
                            <p className="text-xs font-medium text-gray-400">
                              ₦{Number(item.price).toLocaleString()} each
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center font-bold text-gray-700">
                        ×{item.quantity}
                      </TableCell>
                      <TableCell className="pr-0 text-right text-base font-black text-gray-900">
                        ₦{(item.quantity * Number(item.price)).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-8 ml-auto max-w-xs space-y-3 border-t border-gray-50 pt-8">
                <div className="flex justify-between text-sm font-bold text-gray-500">
                  <span>Subtotal</span>
                  <span className="text-gray-900">₦{Number(order.total).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-gray-500">
                  <span>Shipping</span>
                  <span className="text-gray-900">Free</span>
                </div>
                <Separator className="bg-gray-50" />
                <div className="flex items-center justify-between pt-2 text-gray-900">
                  <span className="text-lg font-black">Total</span>
                  <span className="text-primary text-2xl font-black">
                    ₦{Number(order.total).toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Customer & Shipping Details */}
        <div className="space-y-8">
          <Card className="overflow-hidden rounded-[2rem] border-gray-100 bg-white shadow-sm">
            <CardHeader className="border-b border-gray-50 bg-gray-50/30 px-6 pt-6 pb-2">
              <CardTitle className="text-sm font-black tracking-widest text-gray-400 uppercase">
                Customer Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-gray-50 p-2">
                  <User className="h-4 w-4 text-gray-400" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-black text-gray-900">{order.shipping_name}</p>
                  <p className="truncate text-xs font-medium text-gray-500">
                    {order.user || 'Guest Checkout'}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-gray-50 p-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                </div>
                <p className="truncate text-sm font-bold text-gray-600">{order.user}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden rounded-[2rem] border-gray-100 bg-white shadow-sm">
            <CardHeader className="border-b border-gray-50 bg-gray-50/30 px-6 pt-6 pb-2">
              <CardTitle className="text-sm font-black tracking-widest text-gray-400 uppercase">
                Shipping & Payment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="text-primary mt-0.5 h-4 w-4" />
                  <div className="text-sm leading-relaxed font-bold text-gray-600">
                    {order.shipping_address}
                    <br />
                    {order.shipping_city}, {order.shipping_state}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-primary h-4 w-4" />
                  <span className="text-sm font-bold text-gray-600">{order.shipping_phone}</span>
                </div>
              </div>
              <Separator className="bg-gray-50" />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-bold text-gray-400">
                    <CreditCard className="h-4 w-4" /> Payment
                  </div>
                  <span className="text-sm font-black text-gray-900 uppercase">Bank Transfer</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-bold text-gray-400">
                    <Truck className="h-4 w-4" /> Fulfillment
                  </div>
                  <span className="text-sm font-black text-gray-900 uppercase">{order.status}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
