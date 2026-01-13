/**
 * ProductInventorySection - Inventory management fields
 */
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Package } from 'lucide-react';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { ProductFormData } from '@/types/product';

interface ProductInventorySectionProps {
  register: UseFormRegister<ProductFormData>;
  errors: FieldErrors<ProductFormData>;
}

export function ProductInventorySection({
  register,
  errors,
}: ProductInventorySectionProps) {
  return (
    <Card className="border-gray-100 shadow-sm">
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-black text-gray-900 flex items-center space-x-2">
          <Package className="h-5 w-5 text-primary" />
          <span>Inventory</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-4 pt-0 space-y-6">
        <div className="space-y-1.5">
          <Label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
            SKU (Stock Keeping Unit)
          </Label>
          <Input
            placeholder="e.g., SP-500W-001"
            className="px-5 py-4 bg-gray-50 border-transparent focus:bg-white focus:border-primary shadow-sm"
            {...register('sku')}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
              Stock Qty
            </Label>
            <Input
              type="number"
              min="0"
              placeholder="0"
              className="px-5 py-4 bg-gray-50 border-transparent focus:bg-white focus:border-primary shadow-sm"
              {...register('stock_quantity')}
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
              Low Alert
            </Label>
            <Input
              type="number"
              min="0"
              placeholder="5"
              className="px-5 py-4 bg-gray-50 border-transparent focus:bg-white focus:border-primary shadow-sm"
              {...register('low_stock_threshold')}
            />
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-md p-4">
          <p className="text-xs text-blue-600 font-medium">
            <span className="font-bold">Tip:</span> Low stock alerts trigger when quantity
            reaches or falls below the threshold.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
