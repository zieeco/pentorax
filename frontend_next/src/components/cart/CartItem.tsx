'use client';

/**
 * CartItem Component - Premium shopping cart item display
 * Refactored for Next.js 16 and premium styling.
 */
import { Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface CartItemProps {
  item: {
    id: string;
    product: {
      id: string;
      name: string;
      slug: string;
      price: number;
      featured_image?: string;
    };
    quantity: number;
    subtotal: number;
  };
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onRemove: (itemId: string) => void;
  isUpdating?: boolean;
  isRemoving?: boolean;
}

export function CartItem({
  item,
  onUpdateQuantity,
  onRemove,
  isUpdating,
  isRemoving,
}: CartItemProps) {
  return (
    <Card className="rounded-[2rem] border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="flex flex-col gap-6 sm:flex-row">
        {/* Product Image */}
        <Link
          href={`/shop/${item.product.slug}`}
          className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-2xl bg-gray-50 sm:h-32 sm:w-32"
        >
          <Image
            src={item.product.featured_image || '/placeholder-product.png'}
            alt={item.product.name}
            fill
            className="object-cover transition-transform duration-500 hover:scale-110"
          />
        </Link>

        {/* Product Details */}
        <div className="flex min-w-0 flex-1 flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-4">
              <Link
                href={`/shop/${item.product.slug}`}
                className="hover:text-primary line-clamp-2 text-xl leading-tight font-black text-gray-900 transition-colors"
              >
                {item.product.name}
              </Link>
              <p className="text-primary text-xl font-black whitespace-nowrap">
                ₦{item.subtotal.toLocaleString()}
              </p>
            </div>
            <p className="mt-2 text-xs font-black tracking-widest text-gray-400 uppercase">
              ₦{item.product.price.toLocaleString()} per unit
            </p>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center rounded-xl border border-gray-100 bg-gray-50 p-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                disabled={isUpdating || item.quantity <= 1}
                className="h-8 w-8 rounded-lg font-black hover:bg-white"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </Button>

              <span className="min-w-[2.5rem] px-4 text-center text-sm font-black text-gray-900">
                {item.quantity}
              </span>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                disabled={isUpdating}
                className="h-8 w-8 rounded-lg font-black hover:bg-white"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemove(item.id)}
              disabled={isRemoving}
              className="text-destructive hover:text-destructive hover:bg-destructive/5 h-10 rounded-xl px-4 text-[10px] font-black tracking-widest uppercase"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Discard
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
