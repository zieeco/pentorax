'use client';

/**
 * ProductImagesButton - Compact button section to open images modal
 * Ported from Vite to Next.js
 */
import { ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProductImagesButtonProps {
  imageCount: number;
  onClick: () => void;
}

export function ProductImagesButton({ imageCount, onClick }: ProductImagesButtonProps) {
  return (
    <Card className="overflow-hidden rounded-[2rem] border-gray-100 shadow-sm">
      <CardHeader className="border-b border-gray-100/50 bg-gray-50/50 p-6">
        <CardTitle className="flex items-center justify-between text-lg font-black text-gray-900">
          <span>Gallery</span>
          <ImageIcon className="h-5 w-5 text-gray-300" />
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        <Button
          type="button"
          variant="outline"
          onClick={onClick}
          className="h-auto w-full gap-3 rounded-xl border-gray-100 bg-white py-6 font-bold shadow-sm hover:bg-gray-50"
        >
          <ImageIcon className="text-primary h-5 w-5" />
          <span>Manage Gallery</span>
          {imageCount > 0 && (
            <span className="bg-primary ml-auto rounded-full px-2 py-0.5 text-[10px] font-black tracking-tighter text-white uppercase">
              {imageCount}
            </span>
          )}
        </Button>
        <p className="mt-3 text-center text-[10px] leading-relaxed font-bold tracking-widest text-gray-400 uppercase">
          {imageCount === 0 ? 'No images added' : `${imageCount} assets in gallery`}
        </p>
      </CardContent>
    </Card>
  );
}
