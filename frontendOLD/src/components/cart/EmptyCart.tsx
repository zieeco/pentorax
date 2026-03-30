/**
 * EmptyCart Component  
 * Displays empty cart state with CTA
 */
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function EmptyCart() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-md mx-auto">
        <div className="mb-6 inline-flex items-center justify-center w-24 h-24 rounded-full bg-muted">
          <ShoppingBag className="h-12 w-12 text-muted-foreground" />
        </div>
        
        <h2 className="text-3xl font-bold mb-3">Your cart is empty</h2>
        
        <p className="text-muted-foreground mb-8">
          Looks like you haven't added anything to your cart yet. 
          Start shopping to find the perfect solar energy solutions!
        </p>

        <Button asChild size="lg" className="min-w-[200px]">
          <Link to="/shop">
            Start Shopping
          </Link>
        </Button>

        <div className="mt-8 pt-8 border-t">
          <p className="text-sm text-muted-foreground mb-4">Popular Categories</p>
          <div className="flex flex-wrap justify-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/products/solar-panels">Solar Panels</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/products/inverters">Inverters</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/products/batteries">Batteries</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
