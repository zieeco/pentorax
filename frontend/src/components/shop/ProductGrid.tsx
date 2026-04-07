'use client';

/**
 * ProductGrid component - Responsive masonry-style grid for shop products
 * Extracted from shop/page.tsx for 150-line rule compliance.
 */
import { Skeleton } from '@/components/ui/skeleton';
import type { Product } from '@/types/product';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
}

export function ProductGrid({ products, isLoading }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="border-border bg-card/50 animate-pulse space-y-4 rounded-[2rem] border p-4"
          >
            <Skeleton className="aspect-square w-full rounded-3xl" />
            <div className="space-y-2 px-2">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="mt-4 h-8 w-1/2" />
            </div>
            <Skeleton className="h-12 w-full rounded-2xl" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="bg-muted/30 mb-6 flex h-20 w-20 items-center justify-center rounded-full">
          <span className="text-4xl">🔍</span>
        </div>
        <h3 className="text-foreground mb-2 text-xl font-black">No matching products</h3>
        <p className="text-muted-foreground mx-auto max-w-xs text-sm font-medium">
          We couldn&apos;t find what you&apos;re looking for. Try adjusting your filters or search
          terms.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
