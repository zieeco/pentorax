/**
 * RelatedProducts component - Display related products based on category
 * @module components/shop
 */
import { useRelatedProducts } from '@/hooks';
import { ProductCard } from './ProductCard';
import { Skeleton } from '../ui/skeleton';

interface RelatedProductsProps {
  currentProductId: string;
  categoryId: string;
  limit?: number;
}

export function RelatedProducts({ 
  currentProductId, 
  categoryId,
  limit = 4 
}: RelatedProductsProps) {
  const { data: relatedProducts = [], isLoading } = useRelatedProducts(
    currentProductId,
    categoryId,
    { limit }
  );

  // Don't render if no related products
  if (!isLoading && relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: limit }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-square w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
