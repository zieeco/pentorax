/**
 * OrderHistoryPage
 * Displays user's order history
 */
import { Link } from 'react-router-dom';
import { useOrders } from '@/hooks';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';
import OrderCard from '@/components/orders/OrderCard';

export default function OrderHistoryPage() {
  const { data: orders, isLoading } = useOrders();

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-8 w-48 mb-8" />
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </div>
    );
  }

  // Empty state
  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="bg-gradient-to-r from-primary to-secondary py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-white">Order History</h1>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <div className="mb-6 inline-flex items-center justify-center w-24 h-24 rounded-full bg-muted">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>

            <h2 className="text-3xl font-bold mb-3">No orders yet</h2>

            <p className="text-muted-foreground mb-8">
              You haven't placed any orders. Start shopping to see your order history here!
            </p>

            <Button asChild size="lg">
              <Link to="/shop">Start Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Orders list
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-primary to-secondary py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white">Order History</h1>
          <p className="text-white/90 mt-2">
            {orders.length} {orders.length === 1 ? 'order' : 'orders'}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-4">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
}
