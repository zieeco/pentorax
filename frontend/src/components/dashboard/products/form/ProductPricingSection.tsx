'use client';

/**
 * ProductPricingSection - Pricing and category fields
 * Ported from Vite to Next.js
 */
import { Zap } from 'lucide-react';
import type { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ProductPricingSectionProps {
  register: UseFormRegister<any>;
  control: Control<any>;
  errors: FieldErrors<any>;
  categories: any[];
}

export function ProductPricingSection({
  register,
  control,
  errors,
  categories,
}: ProductPricingSectionProps) {
  return (
    <Card className="overflow-hidden rounded-[2rem] border-gray-100 shadow-sm">
      <CardHeader className="border-b border-gray-100/50 bg-gray-50/50 p-6">
        <CardTitle className="flex items-center space-x-2 text-lg font-black text-gray-900">
          <Zap className="text-primary h-5 w-5" />
          <span>Pricing & Category</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-1.5">
            <Label className="ml-1 text-[11px] font-bold tracking-widest text-gray-400 uppercase">
              Retail Price (₦)
            </Label>
            <Input
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              className="focus:border-primary rounded-xl border-gray-100 bg-gray-50/50 px-5 py-6 font-medium shadow-none focus:bg-white"
              {...register('price', { required: 'Price is required' })}
            />
            {errors.price && (
              <p className="mt-1 text-sm text-red-500">{errors.price.message as string}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="ml-1 text-[11px] font-bold tracking-widest text-gray-400 uppercase">
              Compare Price (₦)
            </Label>
            <Input
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              className="focus:border-primary rounded-xl border-gray-100 bg-gray-50/50 px-5 py-6 font-medium shadow-none focus:bg-white"
              {...register('compare_at_price')}
            />
          </div>

          <div className="space-y-1.5">
            <Label className="ml-1 text-[11px] font-bold tracking-widest text-gray-400 uppercase">
              Category *
            </Label>
            <Controller
              name="category_id"
              control={control}
              rules={{ required: 'Category is required' }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="focus:border-primary rounded-xl border-gray-100 bg-gray-50/50 px-5 py-6 font-medium shadow-none focus:bg-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-gray-100">
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id} className="rounded-lg font-bold">
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category_id && (
              <p className="mt-1 text-sm text-red-500">{errors.category_id.message as string}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
