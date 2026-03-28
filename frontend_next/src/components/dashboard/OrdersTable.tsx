'use client';

import { ArrowUpDown, ShoppingBag } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { OrderTableRow } from './orders/OrderTableRow';

interface OrderTableProps {
  orders: any[];
  isLoading: boolean;
  onStatusChange: (orderId: string, newStatus: string) => void;
  onClearFilters: () => void;
}

export function OrdersTable({
  orders,
  isLoading,
  onStatusChange,
  onClearFilters,
}: OrderTableProps) {
  return (
    <Card className="overflow-hidden rounded-[2rem] border-gray-100 shadow-sm">
      <Table>
        <TableHeader className="bg-gray-50/50">
          <TableRow className="border-none hover:bg-transparent">
            <TableHead className="group cursor-pointer px-8 py-4 text-[10px] font-black tracking-widest text-gray-400 uppercase">
              Order <ArrowUpDown className="ml-1 inline h-2.5 w-2.5" />
            </TableHead>
            <TableHead className="px-6 py-4 text-[10px] font-black tracking-widest text-gray-400 uppercase">
              Customer
            </TableHead>
            <TableHead className="px-6 py-4 text-[10px] font-black tracking-widest text-gray-400 uppercase">
              Date
            </TableHead>
            <TableHead className="px-6 py-4 text-[10px] font-black tracking-widest text-gray-400 uppercase">
              Total
            </TableHead>
            <TableHead className="px-6 py-4 text-[10px] font-black tracking-widest text-gray-400 uppercase">
              Status
            </TableHead>
            <TableHead className="px-6 py-4 text-center text-[10px] font-black tracking-widest text-gray-400 uppercase">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array(8)
              .fill(0)
              .map((_, i) => (
                <TableRow key={i}>
                  <TableCell className="px-8 py-5">
                    <div className="h-4 w-20 animate-pulse rounded-lg bg-gray-100" />
                  </TableCell>
                  <TableCell className="px-6 py-5">
                    <div className="h-4 w-40 animate-pulse rounded-lg bg-gray-100" />
                  </TableCell>
                  <TableCell className="px-6 py-5">
                    <div className="h-4 w-24 animate-pulse rounded-lg bg-gray-100" />
                  </TableCell>
                  <TableCell className="px-6 py-5">
                    <div className="h-4 w-16 animate-pulse rounded-lg bg-gray-100" />
                  </TableCell>
                  <TableCell className="px-6 py-5">
                    <div className="h-4 w-24 animate-pulse rounded-lg bg-gray-100" />
                  </TableCell>
                  <TableCell className="px-6 py-5 text-center">
                    <div className="mx-auto h-8 w-8 animate-pulse rounded-lg bg-gray-100" />
                  </TableCell>
                </TableRow>
              ))
          ) : orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-64 text-center">
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="rounded-full bg-gray-50 p-4">
                    <ShoppingBag className="h-8 w-8 text-gray-300" />
                  </div>
                  <p className="font-bold text-gray-400">No orders found matching your criteria</p>
                  <Button
                    variant="link"
                    className="text-primary font-bold"
                    onClick={onClearFilters}
                  >
                    Clear all filters
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order) => (
              <OrderTableRow key={order.id} order={order} onStatusChange={onStatusChange} />
            ))
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
