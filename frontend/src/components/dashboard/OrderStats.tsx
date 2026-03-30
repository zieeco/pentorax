'use client';

import { FileText, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface OrderStatsProps {
  total: number;
  pending: number;
  revenue: number;
}

export function OrderHeader() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-foreground flex items-center gap-3 text-3xl font-black tracking-tight">
          <ShoppingBag className="text-primary h-8 w-8" />
          Order Management
        </h1>
        <p className="text-muted-foreground mt-1 font-medium">
          Track and fulfill customer orders globally.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          className="border-border bg-background gap-2 rounded-xl font-bold shadow-sm"
        >
          <FileText className="h-4 w-4" />
          Export CSV
        </Button>
      </div>
    </div>
  );
}

export function OrderStats({ total, pending, revenue }: OrderStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <Card className="bg-primary border-border shadow-primary/20 rounded-3xl p-6 text-white shadow-sm">
        <p className="text-[10px] font-black tracking-widest uppercase opacity-60">Total Orders</p>
        <p className="mt-1 text-3xl font-black">{total}</p>
      </Card>
      <Card className="border-border rounded-3xl p-6 shadow-sm">
        <p className="text-muted-foreground text-[10px] font-black tracking-widest uppercase">
          Pending Fulfillment
        </p>
        <p className="text-foreground mt-1 text-3xl font-black">{pending}</p>
      </Card>
      <Card className="border-border rounded-3xl p-6 shadow-sm">
        <p className="text-muted-foreground text-[10px] font-black tracking-widest uppercase">
          Total Sales
        </p>
        <p className="text-foreground mt-1 text-3xl font-black">₦{revenue.toLocaleString()}</p>
      </Card>
    </div>
  );
}
