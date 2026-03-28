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
        <h1 className="flex items-center gap-3 text-3xl font-black tracking-tight text-gray-900">
          <ShoppingBag className="text-primary h-8 w-8" />
          Order Management
        </h1>
        <p className="mt-1 font-medium text-gray-500">
          Track and fulfill customer orders globally.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          className="gap-2 rounded-xl border-gray-100 bg-white font-bold shadow-sm"
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
      <Card className="bg-primary rounded-3xl border-gray-100 p-6 text-white shadow-sm">
        <p className="text-[10px] font-black tracking-widest uppercase opacity-60">Total Orders</p>
        <p className="mt-1 text-3xl font-black">{total}</p>
      </Card>
      <Card className="rounded-3xl border-gray-100 p-6 shadow-sm">
        <p className="text-[10px] font-black tracking-widest text-gray-400 uppercase">
          Pending Fulfillment
        </p>
        <p className="mt-1 text-3xl font-black text-gray-900">{pending}</p>
      </Card>
      <Card className="rounded-3xl border-gray-100 p-6 shadow-sm">
        <p className="text-[10px] font-black tracking-widest text-gray-400 uppercase">
          Total Sales
        </p>
        <p className="mt-1 text-3xl font-black text-gray-900">₦{revenue.toLocaleString()}</p>
      </Card>
    </div>
  );
}
