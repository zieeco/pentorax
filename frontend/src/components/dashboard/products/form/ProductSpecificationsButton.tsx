'use client';

/**
 * ProductSpecificationsButton - Compact button section to open specifications modal
 * Ported from Vite to Next.js
 */
import { ListTree } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProductSpecificationsButtonProps {
  specCount: number;
  onClick: () => void;
}

export function ProductSpecificationsButton({
  specCount,
  onClick,
}: ProductSpecificationsButtonProps) {
  return (
    <Card className="overflow-hidden rounded-[2rem] border-gray-100 shadow-sm">
      <CardHeader className="border-b border-gray-100/50 bg-gray-50/50 p-6">
        <CardTitle className="flex items-center justify-between text-lg font-black text-gray-900">
          <span>Specifications</span>
          <ListTree className="h-5 w-5 text-gray-300" />
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        <Button
          type="button"
          variant="outline"
          onClick={onClick}
          className="h-auto w-full gap-3 rounded-xl border-gray-100 bg-white py-6 font-bold shadow-sm hover:bg-gray-50"
        >
          <ListTree className="text-primary h-5 w-5" />
          <span>Manage Specs</span>
          {specCount > 0 && (
            <span className="bg-primary ml-auto rounded-full px-2 py-0.5 text-[10px] font-black tracking-tighter text-white uppercase">
              {specCount}
            </span>
          )}
        </Button>
        <p className="mt-3 text-center text-[10px] leading-relaxed font-bold tracking-widest text-gray-400 uppercase">
          {specCount === 0 ? 'No specifications' : `${specCount} tech details`}
        </p>
      </CardContent>
    </Card>
  );
}
