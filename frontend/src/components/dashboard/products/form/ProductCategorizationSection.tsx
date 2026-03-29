'use client';

/**
 * ProductCategorizationSection - Product status and visibility toggles
 * Ported from Vite to Next.js
 */
import type { UseFormSetValue } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

interface ProductCategorizationSectionProps {
  isActive: boolean;
  isFeatured: boolean;
  setValue: UseFormSetValue<any>;
}

export function ProductCategorizationSection({
  isActive,
  isFeatured,
  setValue,
}: ProductCategorizationSectionProps) {
  return (
    <Card className="overflow-hidden rounded-[2rem] border-gray-100 shadow-sm">
      <CardHeader className="border-b border-gray-100/50 bg-gray-50/50 p-6">
        <CardTitle className="text-lg font-black text-gray-900">Categorization</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6 p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-gray-900">Active Status</p>
              <p className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                Visible to customers
              </p>
            </div>
            <Switch
              checked={isActive}
              onCheckedChange={(checked) => setValue('is_active', checked, { shouldDirty: true })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-gray-900">Featured</p>
              <p className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                Top of catalog
              </p>
            </div>
            <Switch
              checked={isFeatured}
              onCheckedChange={(checked) => setValue('is_featured', checked, { shouldDirty: true })}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
