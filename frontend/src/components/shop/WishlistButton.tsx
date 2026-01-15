/**
 * WishlistButton component - Toggle product in/out of wishlist
 * @module components/shop
 */

import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAddToWishlist, useRemoveFromWishlist, useIsInWishlist } from '@/hooks';
import { cn } from '@/lib/utils';

interface WishlistButtonProps {
  productId: string;
  variant?: 'default' | 'icon';
  className?: string;
}

export function WishlistButton({ 
  productId, 
  variant = 'default',
  className 
}: WishlistButtonProps) {
  const isInWishlist = useIsInWishlist(productId);
  const addToWishlist = useAddToWishlist();
  const removeFromWishlist = useRemoveFromWishlist();

  const handleClick = () => {
    if (isInWishlist) {
      removeFromWishlist.mutate(productId);
    } else {
      addToWishlist.mutate({ productId });
    }
  };

  const isLoading = addToWishlist.isPending || removeFromWishlist.isPending;

  if (variant === 'icon') {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={handleClick}
        disabled={isLoading}
        className={cn('rounded-full', className)}
        aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <Heart
          className={cn(
            'h-5 w-5 transition-all',
            isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600',
            isLoading && 'opacity-50'
          )}
        />
      </Button>
    );
  }

  return (
    <Button
      variant={isInWishlist ? 'default' : 'outline'}
      onClick={handleClick}
      disabled={isLoading}
      className={cn('gap-2', className)}
    >
      <Heart
        className={cn(
          'h-4 w-4',
          isInWishlist && 'fill-current'
        )}
      />
      {isLoading ? 'Loading...' : isInWishlist ? 'Saved' : 'Save for Later'}
    </Button>
  );
}
