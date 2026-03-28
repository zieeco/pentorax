'use client';

/**
 * ProductCard component - Premium product display for the shop
 * Refactored to use Next.js Link and Image components.
 * Incorporates premium glassmorphism and animated effects.
 */
import { Eye, ShoppingCart, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useAddToCart } from '@/hooks/cart-hooks';
import type { Product } from '@/types/product';

const formatPrice = (price: string | number) => {
  const num = typeof price === 'string' ? parseFloat(price) : price;
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(num);
};

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addToCart = useAddToCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart.mutate(
      { productId: product.id, quantity: 1 },
      {
        onSuccess: () => toast.success(`${product.name} added to cart`),
        onError: () => toast.error('Failed to add to cart'),
      }
    );
  };

  const discountPercentage = product.discount_percentage || 0;

  return (
    <Card className="group hover:shadow-primary/5 relative flex h-full flex-col overflow-hidden rounded-[2rem] border-gray-100 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
      <Link
        href={`/shop/${product.slug}`}
        className="relative aspect-square overflow-hidden bg-gray-50"
      >
        <Image
          src={product.featured_image || '/placeholder-product.png'}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.is_featured && (
            <Badge className="bg-primary/90 rounded-lg border-none px-3 py-1 text-[10px] font-black text-white uppercase shadow-lg backdrop-blur-md">
              Featured
            </Badge>
          )}
          {discountPercentage > 0 && (
            <Badge
              variant="destructive"
              className="rounded-lg border-none px-3 py-1 text-[10px] font-black uppercase shadow-lg"
            >
              -{discountPercentage}%
            </Badge>
          )}
        </div>

        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 translate-y-12 transform items-center gap-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <Button
            size="icon"
            variant="secondary"
            className="h-10 w-10 rounded-xl bg-white/90 shadow-xl backdrop-blur-md hover:bg-white"
          >
            <Eye className="h-4 w-4 text-gray-900" />
          </Button>
        </div>
      </Link>

      <CardContent className="flex flex-1 flex-col p-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[10px] font-black tracking-widest text-gray-400 uppercase">
            Solar Energy
          </span>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span className="text-[10px] font-black text-gray-900">4.9</span>
          </div>
        </div>

        <Link href={`/shop/${product.slug}`}>
          <h3 className="group-hover:text-primary mb-2 line-clamp-2 text-lg leading-tight font-black text-gray-900 transition-colors">
            {product.name}
          </h3>
        </Link>

        <p className="mb-4 line-clamp-2 text-xs leading-relaxed font-medium text-gray-500">
          {product.short_description}
        </p>

        <div className="mt-auto flex items-baseline gap-2">
          <span className="text-primary text-xl font-black">{formatPrice(product.price)}</span>
          {product.compare_at_price &&
            parseFloat(String(product.compare_at_price)) > parseFloat(String(product.price)) && (
              <span className="text-sm font-bold text-gray-400 line-through decoration-gray-300">
                {formatPrice(product.compare_at_price)}
              </span>
            )}
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button
          className="shadow-primary/10 h-12 w-full rounded-2xl font-black shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-95"
          onClick={handleAddToCart}
          disabled={addToCart.isPending}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {addToCart.isPending ? 'Adding...' : 'Add to Cart'}
        </Button>
      </CardFooter>
    </Card>
  );
}
