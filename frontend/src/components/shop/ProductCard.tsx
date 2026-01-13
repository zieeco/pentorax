/**
 * ProductCard component - Display product in grid
 */
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter } from '../ui/card';
import { Badge } from '../ui/badge';
import { useAddToCart } from '@/hooks';
import { toast } from 'sonner';
import type { Product } from '@/types/product';

// Helper to format price (API returns string)
const formatPrice = (price: string | number) => {
  const num = typeof price === 'string' ? parseFloat(price) : price;
  return num.toLocaleString('en-NG');
};

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addToCart = useAddToCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart.mutate(
      { productId: product.id, quantity: 1 },
      {
        onSuccess: () => {
          toast.success(`${product.name} added to cart`);
        },
        onError: () => {
          toast.error('Failed to add to cart');
        },
      }
    );
  };

  const discountPercentage = product.discount_percentage || 0;

  return (
    <Link to={`/shop/${product.slug}`}>
      <Card className="group h-full overflow-hidden transition-all hover:shadow-lg">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.featured_image || '/placeholder-product.png'}
            alt={product.name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
          {product.is_featured && (
            <Badge className="absolute top-2 left-2 bg-accent">Featured</Badge>
          )}
          {discountPercentage > 0 && (
            <Badge className="absolute top-2 right-2 bg-destructive">
              -{discountPercentage}%
            </Badge>
          )}
        </div>

        <CardContent className="p-4">
          <h3 className="font-semibold text-lg line-clamp-2 mb-2">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {product.short_description}
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-primary">
              ₦{formatPrice(product.price)}
            </span>
            {product.compare_at_price && parseFloat(String(product.compare_at_price)) > parseFloat(String(product.price)) && (
              <span className="text-sm text-muted-foreground line-through">
                ₦{formatPrice(product.compare_at_price)}
              </span>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button
            className="w-full"
            onClick={handleAddToCart}
            disabled={addToCart.isPending}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {addToCart.isPending ? 'Adding...' : 'Add to Cart'}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
