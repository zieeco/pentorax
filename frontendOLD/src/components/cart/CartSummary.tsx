/**
 * CartSummary Component
 * Displays cart totals and checkout button
 */
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';

interface CartSummaryProps {
  itemCount: number;
  subtotal: number;
  shipping?: number;
  total: number;
  onCheckout?: () => void;
}

export default function CartSummary({
  itemCount,
  subtotal,
  shipping,
  total,
  onCheckout,
}: CartSummaryProps) {
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (onCheckout) {
      onCheckout();
    } else {
      navigate('/checkout');
    }
  };

  return (
    <Card className="p-6 sticky top-4">
      <div className="flex items-center gap-2 mb-6">
        <ShoppingCart className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Order Summary</h2>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            Items ({itemCount})
          </span>
          <span className="font-medium">₦{subtotal.toLocaleString()}</span>
        </div>

        {shipping !== undefined ? (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>
            <span className="font-medium">
              {shipping === 0 ? 'FREE' : `₦${shipping.toLocaleString()}`}
            </span>
          </div>
        ) : (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>
            <span className="font-medium">Calculated at checkout</span>
          </div>
        )}

        <div className="border-t pt-3 flex justify-between">
          <span className="text-lg font-bold">Total</span>
          <span className="text-xl font-bold text-primary">
            ₦{total.toLocaleString()}
          </span>
        </div>
      </div>

      <Button
        className="w-full"
        size="lg"
        onClick={handleCheckout}
        disabled={itemCount === 0}
      >
        Proceed to Checkout
      </Button>

      <Button
        variant="outline"
        className="w-full mt-3"
        onClick={() => navigate('/shop')}
      >
        Continue Shopping
      </Button>

      <div className="mt-6 text-xs text-muted-foreground space-y-1">
        <p>✓ Secure checkout</p>
        <p>✓ Free delivery on orders over ₦500,000</p>
        <p>✓ 30-day money-back guarantee</p>
      </div>
    </Card>
  );
}
