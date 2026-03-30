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
    <Card className="border-border overflow-hidden rounded-[2rem] shadow-sm">
      <CardHeader className="border-border/50 bg-muted/30 border-b p-6">
        <CardTitle className="text-foreground flex items-center space-x-2 text-lg font-black">
          <Package className="text-primary h-5 w-5" />
          <span>Inventory</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6 p-6">
        <div className="space-y-1.5">
          <Label className="text-muted-foreground ml-1 text-[11px] font-bold tracking-widest uppercase">
            SKU (Stock Keeping Unit)
          </Label>
          <Input
            placeholder="e.g., SP-500W-001"
            className="focus:border-primary border-border bg-muted/30 focus:bg-background rounded-xl px-5 py-6 font-medium shadow-none"
            {...register('sku')}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-muted-foreground ml-1 text-[11px] font-bold tracking-widest uppercase">
              Stock Qty
            </Label>
            <Input
              type="number"
              min="0"
              placeholder="0"
              className="focus:border-primary border-border bg-muted/30 focus:bg-background rounded-xl px-5 py-6 font-medium shadow-none"
              {...register('stock_quantity', { required: 'Stock quantity is required' })}
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-muted-foreground ml-1 text-[11px] font-bold tracking-widest uppercase">
              Low Alert
            </Label>
            <Input
              type="number"
              min="0"
              placeholder="5"
              className="focus:border-primary border-border bg-muted/30 focus:bg-background rounded-xl px-5 py-6 font-medium shadow-none"
              {...register('low_stock_threshold')}
            />
          </div>
        </div>

        <div className="border-primary/20 bg-primary/5 rounded-2xl border p-4">
          <p className="text-primary text-xs font-medium">
            <span className="font-bold">Tip:</span> Low stock alerts trigger when quantity reaches
            or falls below the threshold.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
