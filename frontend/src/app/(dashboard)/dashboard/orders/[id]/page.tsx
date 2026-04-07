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
    color: 'bg-accent/10 text-accent border-accent/20',
  },
  processing: {
    label: 'Processing',
    color: 'bg-primary/10 text-primary border-primary/20',
  },
  shipped: { label: 'Shipped', color: 'bg-primary/10 text-primary border-primary/20' },
  delivered: {
    label: 'Delivered',
    color: 'bg-secondary/10 text-secondary border-secondary/20',
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
        <div className="bg-muted h-8 w-1/4 rounded-xl" />
        <div className="bg-muted h-64 w-full rounded-[2rem]" />
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
            <h1 className="text-foreground text-3xl font-black tracking-tight">
              Order #{order.id.slice(0, 8).toUpperCase()}
            </h1>
            <div className="mt-1 flex items-center gap-2">
              <Badge
                className={`rounded-lg border px-2.5 py-1 text-[10px] font-black uppercase shadow-none ${status.color}`}
              >
                {status.label}
              </Badge>
              <span className="text-muted-foreground text-sm font-medium">
                Placed on {format(new Date(order.created_at), 'MMM dd, yyyy')},{' '}
                {format(new Date(order.created_at), 'h:mm a')}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="border-border bg-background rounded-xl font-bold"
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
          <Card className="border-border bg-card overflow-hidden rounded-[2.5rem] shadow-sm">
            <CardHeader className="px-8 pt-8 pb-4">
              <CardTitle className="text-foreground text-xl font-black">Order Items</CardTitle>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/50 hover:bg-transparent">
                    <TableHead className="text-muted-foreground pl-0 text-[10px] font-black tracking-widest uppercase">
                      Product
                    </TableHead>
                    <TableHead className="text-muted-foreground text-center text-[10px] font-black tracking-widest uppercase">
                      Qty
                    </TableHead>
                    <TableHead className="text-muted-foreground pr-0 text-right text-[10px] font-black tracking-widest uppercase">
                      Total
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items.map((item) => (
                    <TableRow key={item.id} className="border-border/50 hover:bg-transparent">
                      <TableCell className="py-4 pl-0">
                        <div className="flex items-center gap-4">
                          <div className="border-border bg-muted/30 relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border">
                            {item.product.featured_image ? (
                              <Image
                                src={item.product.featured_image}
                                alt={item.product.name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <Package className="text-muted-foreground/30 m-3 h-6 w-6" />
                            )}
                          </div>
                          <div>
                            <p className="text-foreground font-bold">{item.product.name}</p>
                            <p className="text-muted-foreground text-xs font-medium">
                              ₦{Number(item.price).toLocaleString()} each
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-foreground text-center font-bold">
                        ×{item.quantity}
                      </TableCell>
                      <TableCell className="text-foreground pr-0 text-right text-base font-black">
                        ₦{(item.quantity * Number(item.price)).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="border-border/50 mt-8 ml-auto max-w-xs space-y-3 border-t pt-8">
                <div className="text-muted-foreground flex justify-between text-sm font-bold">
                  <span>Subtotal</span>
                  <span className="text-foreground">₦{Number(order.total).toLocaleString()}</span>
                </div>
                <div className="text-muted-foreground flex justify-between text-sm font-bold">
                  <span>Shipping</span>
                  <span className="text-foreground">Free</span>
                </div>
                <Separator className="bg-border/50" />
                <div className="text-foreground flex items-center justify-between pt-2">
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
          <Card className="border-border bg-card overflow-hidden rounded-[2rem] shadow-sm">
            <CardHeader className="border-border/50 bg-muted/20 border-b px-6 pt-6 pb-2">
              <CardTitle className="text-muted-foreground text-sm font-black tracking-widest uppercase">
                Customer Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div className="flex items-start gap-3">
                <div className="bg-muted/30 rounded-lg p-2">
                  <User className="text-muted-foreground h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-foreground truncate text-sm font-black">
                    {order.shipping_name}
                  </p>
                  <p className="text-muted-foreground truncate text-xs font-medium">
                    {order.user || 'Guest Checkout'}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-muted/30 rounded-lg p-2">
                  <Mail className="text-muted-foreground h-4 w-4" />
                </div>
                <p className="text-muted-foreground truncate text-sm font-bold">{order.user}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card overflow-hidden rounded-[2rem] shadow-sm">
            <CardHeader className="border-border/50 bg-muted/20 border-b px-6 pt-6 pb-2">
              <CardTitle className="text-muted-foreground text-sm font-black tracking-widest uppercase">
                Shipping & Payment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="text-primary mt-0.5 h-4 w-4" />
                  <div className="text-muted-foreground text-sm leading-relaxed font-bold">
                    {order.shipping_address}
                    <br />
                    {order.shipping_city}, {order.shipping_state}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-primary h-4 w-4" />
                  <span className="text-muted-foreground text-sm font-bold">
                    {order.shipping_phone}
                  </span>
                </div>
              </div>
              <Separator className="bg-border/50" />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-muted-foreground flex items-center gap-2 text-sm font-bold">
                    <CreditCard className="h-4 w-4" /> Payment
                  </div>
                  <span className="text-foreground text-sm font-black uppercase">
                    Bank Transfer
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-muted-foreground flex items-center gap-2 text-sm font-bold">
                    <Truck className="h-4 w-4" /> Fulfillment
                  </div>
                  <span className="text-foreground text-sm font-black uppercase">
                    {order.status}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
