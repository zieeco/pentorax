'use client';

/**
 * ProductInventorySection - Inventory management fields
 * Ported from Vite to Next.js
 */
import { Package } from 'lucide-react';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ProductInventorySectionProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

export function ProductInventorySection({ register, errors }: ProductInventorySectionProps) {
  return (
    <Card className="overflow-hidden rounded-[2rem] border-gray-100 shadow-sm">
      <CardHeader className="border-b border-gray-100/50 bg-gray-50/50 p-6">
        <CardTitle className="flex items-center space-x-2 text-lg font-black text-gray-900">
          <Package className="text-primary h-5 w-5" />
          <span>Inventory</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6 p-6">
        <div className="space-y-1.5">
          <Label className="ml-1 text-[11px] font-bold tracking-widest text-gray-400 uppercase">
            SKU (Stock Keeping Unit)
          </Label>
          <Input
            placeholder="e.g., SP-500W-001"
            className="focus:border-primary rounded-xl border-gray-100 bg-gray-50/50 px-5 py-6 font-medium shadow-none focus:bg-white"
            {...register('sku')}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="ml-1 text-[11px] font-bold tracking-widest text-gray-400 uppercase">
              Stock Qty
            </Label>
            <Input
              type="number"
              min="0"
              placeholder="0"
              className="focus:border-primary rounded-xl border-gray-100 bg-gray-50/50 px-5 py-6 font-medium shadow-none focus:bg-white"
              {...register('stock_quantity')}
            />
          </div>

          <div className="space-y-1.5">
            <Label className="ml-1 text-[11px] font-bold tracking-widest text-gray-400 uppercase">
              Low Alert
            </Label>
            <Input
              type="number"
              min="0"
              placeholder="5"
              className="focus:border-primary rounded-xl border-gray-100 bg-gray-50/50 px-5 py-6 font-medium shadow-none focus:bg-white"
              {...register('low_stock_threshold')}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-blue-100/50 bg-blue-50/50 p-4">
          <p className="text-xs font-medium text-blue-600">
            <span className="font-bold">Tip:</span> Low stock alerts trigger when quantity reaches
            or falls below the threshold.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
