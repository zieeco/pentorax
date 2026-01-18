/**
 * OrderCard Component
 * Displays a single order summary in list view
 */
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package, ChevronRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface OrderCardProps {
  order: {
    id: string;
    created_at: string;
    status: string;
    total: number;
    item_count: number;
  };
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

export default function OrderCard({ order }: OrderCardProps) {
  return (
    <Card className="p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-4 flex-1">
          <div className="flex-shrink-0">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Package className="h-6 w-6 text-primary" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-semibold text-lg">Order #{order.id.slice(0, 8)}</h3>
              <Badge className={statusColors[order.status] || 'bg-gray-100'}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground mb-1">
              {order.item_count} {order.item_count === 1 ? 'item' : 'items'}
            </p>

            <p className="text-xs text-muted-foreground">
              Placed {formatDistanceToNow(new Date(order.created_at), { addSuffix: true })}
            </p>
          </div>
        </div>

        <div className="text-right flex-shrink-0">
          <p className="text-2xl font-bold text-primary mb-3">
            ₦{order.total.toLocaleString()}
          </p>

          <Button variant="outline" size="sm" asChild>
            <Link to={`/orders/${order.id}`} className="flex items-center gap-1">
              View Details
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}
