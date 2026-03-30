/**
 * OrderSummary Component
 * Reusable order summary for cart and checkout pages
 */
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Receipt, ShieldCheck, Truck } from 'lucide-react';

interface OrderSummaryItem {
  id: string;
  product: {
    name: string;
  };
  quantity: number;
  subtotal: number;
}

interface OrderSummaryProps {
  items: OrderSummaryItem[];
  total: number;
  showItems?: boolean;
}

export default function OrderSummary({ items, total, showItems = true }: OrderSummaryProps) {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Card className="p-0 shadow-2xl rounded-3xl border-0 overflow-hidden bg-white dark:bg-neutral-900 sticky top-8">
      {/* Header */}
      <div className="bg-primary/90 ddark:bg-black text-white p-6 flex items-center gap-3">
         <Receipt className="w-6 h-6 text-primary" />
         <h2 className="text-xl font-bold tracking-tight">Order Summary</h2>
      </div>

      <div className="p-6">
        {showItems && (
          <>
            <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-muted">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-start text-sm group">
                  <div className="flex-1 pr-4">
                    <p className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                       {item.product.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Quantity: {item.quantity}</p>
                  </div>
                  <span className="font-semibold whitespace-nowrap">
                    ₦{item.subtotal.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="relative my-6">
               <div className="absolute inset-x-0 top-1/2 border-t-2 border-dashed border-muted-foreground/30"></div>
            </div>
          </>
        )}

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})
            </span>
            <span className="font-medium">₦{total.toLocaleString()}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-2">
               <Truck className="w-3 h-3" /> Shipping
            </span>
            <span className="font-medium text-green-600 dark:text-green-400">Free</span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex justify-between items-end">
             <span className="text-muted-foreground font-medium">Total to Pay</span>
             <div className="text-right">
                <span className="block text-3xl font-extrabold text-primary tracking-tight">
                  ₦{total.toLocaleString()}
                </span>
                <span className="text-xs text-muted-foreground">Including taxes</span>
             </div>
          </div>
        </div>
      </div>
      
      {/* Footer Info */}
      <div className="bg-muted/30 p-4 text-xs text-muted-foreground border-t border-border/50">
        <div className="flex items-center gap-2 mb-2">
           <ShieldCheck className="w-4 h-4 text-primary" />
           <span className="font-medium">Buyer Protection Guarantee</span>
        </div>
        <p>If your order doesn't arrive as described, we'll refund you fully.</p>
      </div>
    </Card>
  );
}
