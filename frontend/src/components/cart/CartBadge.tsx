/**
 * CartBadge Component
 * Displays cart icon with item count badge
 */
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks';
import { Button } from '@/components/ui/button';

export default function CartBadge() {
  const { data: cart } = useCart();
  const itemCount = cart?.item_count || 0;

  return (
    <Button variant="ghost" size="icon" className="relative" asChild>
      <Link to="/cart" aria-label={`Cart with ${itemCount} items`}>
        <ShoppingCart className="h-5 w-5" />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-[11px] font-bold text-white flex items-center justify-center">
            {itemCount > 9 ? '9+' : itemCount}
          </span>
        )}
      </Link>
    </Button>
  );
}
