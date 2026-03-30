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
    <Card className="border-border bg-card overflow-hidden rounded-[2rem] shadow-sm">
      <CardHeader className="border-border/50 bg-muted/20 border-b p-6">
        <CardTitle className="text-foreground flex items-center justify-between text-lg font-black">
          <span>Specifications</span>
          <ListTree className="text-muted-foreground/30 h-5 w-5" />
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        <Button
          type="button"
          variant="outline"
          onClick={onClick}
          className="border-border bg-card hover:bg-muted h-auto w-full gap-3 rounded-xl py-6 font-bold shadow-sm"
        >
          <ListTree className="text-primary h-5 w-5" />
          <span>Manage Specs</span>
          {specCount > 0 && (
            <span className="bg-primary ml-auto rounded-full px-2 py-0.5 text-[10px] font-black tracking-tighter text-white uppercase">
              {specCount}
            </span>
          )}
        </Button>
        <p className="text-muted-foreground mt-3 text-center text-[10px] leading-relaxed font-bold tracking-widest uppercase">
          {specCount === 0 ? 'No specifications' : `${specCount} tech details`}
        </p>
      </CardContent>
    </Card>
  );
}
