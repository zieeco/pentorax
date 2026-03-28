'use client';

/**
 * CartPage — Shopping cart view
 * Manages cart state and composes CartItem and CartSummary.
 * Adheres to 150-line rule.
 */
import { toast } from 'sonner';
import { CartItem } from '@/components/cart/CartItem';
import { CartSummary } from '@/components/cart/CartSummary';
import { EmptyCart } from '@/components/cart/EmptyCart';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useCart, useRemoveFromCart, useUpdateCartItem } from '@/hooks/cart-hooks';

export default function CartPage() {
  const { data: cart, isLoading } = useCart();
  const updateItem = useUpdateCartItem();
  const removeItem = useRemoveFromCart();

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateItem.mutate(
      { itemId, quantity: newQuantity },
      {
        onError: () => toast.error('Quantity calibration failed'),
      }
    );
  };

  const handleRemoveItem = (itemId: string) => {
    removeItem.mutate(itemId, {
      onSuccess: () => toast.success('Agent removed from mission'),
      onError: () => toast.error('Discard operation failed'),
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20 lg:px-8">
        <Skeleton className="mb-12 h-10 w-48 rounded-xl" />
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {[1, 2].map((i) => (
              <Skeleton key={i} className="h-40 w-full rounded-[2rem]" />
            ))}
          </div>
          <Skeleton className="h-[450px] rounded-[2.5rem]" />
        </div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) return <EmptyCart />;

  return (
    <div className="min-h-screen bg-gray-50/50 pb-24">
      <div className="bg-gray-900 py-24 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-4 flex items-center gap-4">
            <Badge className="bg-primary/10 text-primary border-primary/20 rounded-full px-4 py-1 text-[10px] font-black uppercase">
              Review Phase
            </Badge>
            <span className="text-xs font-black tracking-widest text-gray-400 uppercase italic">
              {cart.item_count} Modules Selected
            </span>
          </div>
          <h1 className="mb-4 text-4xl leading-none font-black tracking-tight md:text-6xl">
            Your Integrated <br />
            <span className="text-primary italic">Procurement.</span>
          </h1>
        </div>
      </div>

      <div className="container mx-auto -mt-10 px-4 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
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

          <div className="lg:col-span-1">
            <CartSummary itemCount={cart.item_count} subtotal={cart.total} total={cart.total} />
          </div>
        </div>
      </div>
    </div>
  );
}
