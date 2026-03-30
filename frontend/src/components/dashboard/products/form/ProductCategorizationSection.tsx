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
    <Card className="border-border bg-card overflow-hidden rounded-[2rem] shadow-sm">
      <CardHeader className="border-border/50 bg-muted/20 border-b p-6">
        <CardTitle className="text-foreground text-lg font-black">Categorization</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6 p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-foreground text-sm font-bold">Active Status</p>
              <p className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
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
              <p className="text-foreground text-sm font-bold">Featured</p>
              <p className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
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
