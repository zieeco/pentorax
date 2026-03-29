'use client';

/**
 * ProductInfoSection — Product details, pricing, and buy controls
 * Extracted from ProductDetailPage for 150-line rule compliance.
 */
import { Check, ShieldCheck, ShoppingCart, Star, Truck, Zap } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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

export function ProductInfoSection({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const addToCart = useAddToCart();

  const handleAddToCart = () => {
    addToCart.mutate(
      { productId: product.id, quantity },
      {
        onSuccess: () => toast.success(`${product.name} added to cart`),
        onError: () => toast.error('Failed to add to cart'),
      }
    );
  };

  const discount = product.compare_at_price
    ? Math.round(
        ((Number(product.compare_at_price) - Number(product.price)) /
          Number(product.compare_at_price)) *
          100
      )
    : 0;

  return (
    <div className="space-y-8 lg:py-4">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Badge className="bg-primary/10 text-primary rounded-full border-none px-4 text-[10px] font-black uppercase">
            Official Gear
          </Badge>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span className="text-xs font-black text-gray-900">4.9 (2.4k sales)</span>
          </div>
        </div>
        <h1 className="text-4xl leading-tight font-black tracking-tight text-gray-900 lg:text-5xl">
          {product.name}
        </h1>
        <p className="text-lg leading-relaxed font-medium text-gray-500">
          {product.short_description}
        </p>
      </div>

      <div className="rounded-[2rem] border border-gray-100 bg-gray-50/50 p-8">
        <div className="mb-2 flex items-baseline gap-4">
          <span className="text-primary text-4xl font-black">{formatPrice(product.price)}</span>
          {discount > 0 && (
            <span className="text-lg font-bold text-gray-400 line-through decoration-gray-300">
              {formatPrice(product.compare_at_price!)}
            </span>
          )}
          {discount > 0 && (
            <Badge variant="destructive" className="rounded-lg font-black">
              {discount}% OFF
            </Badge>
          )}
        </div>
        <p className="mb-8 text-[10px] font-black tracking-widest text-gray-400 uppercase">
          Price is VAT inclusive
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex items-center rounded-2xl border border-gray-100 bg-white p-1 shadow-sm">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-xl font-black hover:bg-gray-50"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              -
            </Button>
            <span className="w-12 text-center font-black">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-xl font-black hover:bg-gray-50"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </Button>
          </div>
          <Button
            size="lg"
            className="shadow-primary/20 h-12 flex-1 gap-2 rounded-2xl font-black shadow-xl transition-all active:scale-95"
            onClick={handleAddToCart}
            disabled={!product.in_stock || addToCart.isPending}
          >
            <ShoppingCart className="h-5 w-5" />
            {addToCart.isPending ? 'Propelling into cart...' : 'Add to Order'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-3 rounded-2xl border border-gray-50 bg-white p-4 shadow-sm">
          <ShieldCheck className="h-5 w-5 text-emerald-500" />
          <span className="text-[10px] font-black text-gray-400 uppercase">25 Yr Warranty</span>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-gray-50 bg-white p-4 shadow-sm">
          <Truck className="h-5 w-5 text-blue-500" />
          <span className="text-[10px] font-black text-gray-400 uppercase">Free Lagos Del.</span>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-gray-50 bg-white p-4 shadow-sm">
          <Zap className="h-5 w-5 text-amber-500" />
          <span className="text-[10px] font-black text-gray-400 uppercase">Pro Install</span>
        </div>
      </div>
    </div>
  );
}
