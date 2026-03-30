/**
 * CartItem Component
 * Displays a single cart item with image, details, quantity controls, and remove option
 */
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface CartItemProps {
  item: {
    id: string;
    product: {
      id: string;
      name: string;
      slug: string;
      price: number;
      featured_image?: string;
    };
    quantity: number;
    subtotal: number;
  };
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onRemove: (itemId: string) => void;
  isUpdating?: boolean;
  isRemoving?: boolean;
}

export default function CartItem({
  item,
  onUpdateQuantity,
  onRemove,
  isUpdating,
  isRemoving,
}: CartItemProps) {
  const handleDecrease = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleIncrease = () => {
    onUpdateQuantity(item.id, item.quantity + 1);
  };

  return (
    <Card className="p-4">
      <div className="flex gap-4">
        {/* Product Image */}
        <Link to={`/shop/${item.product.slug}`} className="flex-shrink-0">
          <img
            src={item.product.featured_image || '/placeholder-product.png'}
            alt={item.product.name}
            className="w-24 h-24 object-cover rounded-lg hover:opacity-80 transition-opacity"
          />
        </Link>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <Link
            to={`/shop/${item.product.slug}`}
            className="font-semibold text-lg hover:text-primary transition-colors line-clamp-2"
          >
            {item.product.name}
          </Link>
          
          <p className="text-sm text-muted-foreground mt-1">
            ₦{item.product.price.toLocaleString()} each
          </p>

          {/* Quantity Controls */}
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center border rounded-lg">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDecrease}
                disabled={isUpdating || item.quantity <= 1}
                className="h-9 w-9"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </Button>
              
              <span className="px-4 py-2 min-w-[3rem] text-center font-medium">
                {item.quantity}
              </span>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleIncrease}
                disabled={isUpdating}
                className="h-9 w-9"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemove(item.id)}
              disabled={isRemoving}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Remove
            </Button>
          </div>
        </div>

        {/* Subtotal */}
        <div className="text-right flex-shrink-0">
          <p className="font-bold text-xl">
            ₦{item.subtotal.toLocaleString()}
          </p>
        </div>
      </div>
    </Card>
  );
}
