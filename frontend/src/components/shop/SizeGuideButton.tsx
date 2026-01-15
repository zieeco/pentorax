/**
 * SizeGuideButton component - Trigger button for size guide modal
 * @module components/shop
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Ruler } from 'lucide-react';
import { SizeGuide } from './SizeGuide';
import { getSizeGuideForCategory } from '@/data/sizeGuides';
import { cn } from '@/lib/utils';

interface SizeGuideButtonProps {
  categorySlug?: string;
  variant?: 'default' | 'link';
  className?: string;
}

export function SizeGuideButton({ 
  categorySlug,
  variant = 'link',
  className 
}: SizeGuideButtonProps) {
  const [open, setOpen] = useState(false);
  
  // Get size guide data for category
  const sizeGuideData = getSizeGuideForCategory(categorySlug);
  
  // Don't render if no size guide available
  if (!sizeGuideData) {
    return null;
  }

  return (
    <>
      <Button
        variant={variant}
        onClick={() => setOpen(true)}
        className={cn('gap-2', className)}
      >
        <Ruler className="h-4 w-4" />
        {variant === 'link' ? 'View Size Guide' : 'Size Guide'}
      </Button>

      <SizeGuide 
        open={open}
        onOpenChange={setOpen}
        data={sizeGuideData}
      />
    </>
  );
}
