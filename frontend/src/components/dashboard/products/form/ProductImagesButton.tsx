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
    <Card className="border-border bg-card overflow-hidden rounded-[2rem] shadow-sm">
      <CardHeader className="border-border/50 bg-muted/20 border-b p-6">
        <CardTitle className="text-foreground flex items-center justify-between text-lg font-black">
          <span>Gallery</span>
          <ImageIcon className="text-muted-foreground/30 h-5 w-5" />
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        <Button
          type="button"
          variant="outline"
          onClick={onClick}
          className="border-border bg-card hover:bg-muted h-auto w-full gap-3 rounded-xl py-6 font-bold shadow-sm"
        >
          <ImageIcon className="text-primary h-5 w-5" />
          <span>Manage Gallery</span>
          {imageCount > 0 && (
            <span className="bg-primary ml-auto rounded-full px-2 py-0.5 text-[10px] font-black tracking-tighter text-white uppercase">
              {imageCount}
            </span>
          )}
        </Button>
        <p className="text-muted-foreground mt-3 text-center text-[10px] leading-relaxed font-bold tracking-widest uppercase">
          {imageCount === 0 ? 'No images added' : `${imageCount} assets in gallery`}
        </p>
      </CardContent>
    </Card>
  );
}
