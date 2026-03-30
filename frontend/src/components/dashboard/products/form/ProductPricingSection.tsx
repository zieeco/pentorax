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
    <Card className="border-border bg-card overflow-hidden rounded-[2rem] shadow-sm">
      <CardHeader className="border-border/50 bg-muted/20 border-b p-6">
        <CardTitle className="text-foreground flex items-center space-x-2 text-lg font-black">
          <Zap className="text-primary h-5 w-5" />
          <span>Pricing & Category</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-1.5">
            <Label className="text-muted-foreground ml-1 text-[11px] font-bold tracking-widest uppercase">
              Retail Price (₦)
            </Label>
            <Input
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              className="focus:border-primary border-border bg-muted/20 focus:bg-card rounded-xl px-5 py-6 font-medium shadow-none"
              {...register('price', { required: 'Price is required' })}
            />
            {errors.price && (
              <p className="text-destructive mt-1 text-sm">{errors.price.message as string}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-muted-foreground ml-1 text-[11px] font-bold tracking-widest uppercase">
              Compare Price (₦)
            </Label>
            <Input
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              className="focus:border-primary border-border bg-muted/20 focus:bg-card rounded-xl px-5 py-6 font-medium shadow-none"
              {...register('compare_at_price')}
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-muted-foreground ml-1 text-[11px] font-bold tracking-widest uppercase">
              Category *
            </Label>
            <Controller
              name="category_id"
              control={control}
              rules={{ required: 'Category is required' }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="focus:border-primary border-border bg-muted/20 focus:bg-card rounded-xl px-5 py-6 font-medium shadow-none">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="border-border rounded-xl">
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
              <p className="text-destructive mt-1 text-sm">
                {errors.category_id.message as string}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
