/**
 * ProductPricingSection - Pricing and category fields
 */
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
import { Zap } from 'lucide-react';
import type { UseFormRegister, FieldErrors, Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import type { ProductFormData } from '@/types/product';
import type { Category } from '@/types/product';

interface ProductPricingSectionProps {
  register: UseFormRegister<ProductFormData>;
  control: Control<ProductFormData>;
  errors: FieldErrors<ProductFormData>;
  categories: Category[];
}

export function ProductPricingSection({
  register,
  control,
  errors,
  categories,
}: ProductPricingSectionProps) {
  return (
    <Card className="border-gray-100 shadow-sm">
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-black text-gray-900 flex items-center space-x-2">
          <Zap className="h-5 w-5 text-primary" />
          <span>Pricing & Category</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-4 pt-0">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-1.5">
            <Label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
              Retail Price (₦)
            </Label>
            <Input
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              className="px-5 py-4 bg-gray-50 border-transparent focus:bg-white focus:border-primary shadow-sm"
              {...register('price', { required: 'Price is required' })}
            />
            {errors.price && (
              <p className="text-sm text-red-500 mt-1">{errors.price.message}</p>
            )}
          </div>
          
          <div className="space-y-1.5">
            <Label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
              Compare Price (₦)
            </Label>
            <Input
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              className="px-5 py-4 bg-gray-50 border-transparent focus:bg-white focus:border-primary shadow-sm"
              {...register('compare_at_price')}
            />
          </div>
          
          <div className="space-y-1.5">
            <Label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
              Category *
            </Label>
            <Controller
              name="category_id"
              control={control}
              rules={{ required: 'Category is required' }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="px-5 py-4 bg-gray-50 border-transparent focus:bg-white focus:border-primary shadow-sm">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category_id && (
              <p className="text-sm text-red-500 mt-1">{errors.category_id.message}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
