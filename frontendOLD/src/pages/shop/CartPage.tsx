/**
 * CartPage - Shopping cart view (refactored)
 * Uses modular components for better maintainability
 */
import { useCart, useUpdateCartItem, useRemoveFromCart } from '@/hooks';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import EmptyCart from '@/components/cart/EmptyCart';

export default function CartPage() {
  const { data: cart, isLoading } = useCart();
  const updateItem = useUpdateCartItem();
  const removeItem = useRemoveFromCart();

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateItem.mutate(
      { itemId, quantity: newQuantity },
      {
        onError: () => {
          toast.error('Failed to update quantity');
        },
      }
    );
  };

  const handleRemoveItem = (itemId: string) => {
    removeItem.mutate(itemId, {
      onSuccess: () => toast.success('Item removed from cart'),
      onError: () => toast.error('Failed to remove item'),
    });
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-8 w-48 mb-8" />
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
          <Skeleton className="h-96" />
        </div>
      </div>
    );
  }

  // Empty cart
  if (!cart || cart.items.length === 0) {
    return <EmptyCart />;
  }

  // Cart with items
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white">Shopping Cart</h1>
          <p className="text-white/90 mt-2">
            {cart.item_count} {cart.item_count === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
      </div>

      {/* Cart Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemoveItem}
                isUpdating={updateItem.isPending}
                isRemoving={removeItem.isPending}
              />
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <CartSummary
              itemCount={cart.item_count}
              subtotal={cart.total}
              total={cart.total}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
