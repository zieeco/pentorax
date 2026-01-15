/**
 * RecentlyViewed component - Display recently viewed products
 * Uses localStorage to track user's browsing history
 * @module components/shop
 */
import { useEffect, useState } from 'react';
import { ProductCard } from './ProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import type { Product } from '@/types/product';

interface RecentlyViewedProps {
  currentProductId: string;
  maxItems?: number;
}

const STORAGE_KEY = 'recently_viewed_products';
const MAX_STORED_ITEMS = 10;

export function RecentlyViewed({ currentProductId, maxItems = 4 }: RecentlyViewedProps) {
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadRecentProducts = async () => {
      try {
        // Get product IDs from localStorage
        const stored = localStorage.getItem(STORAGE_KEY);
        const productIds: string[] = stored ? JSON.parse(stored) : [];

        // Filter out current product and limit to maxItems
        const relevantIds = productIds
          .filter(id => id !== currentProductId)
          .slice(0, maxItems);

        if (relevantIds.length === 0) {
          setIsLoading(false);
          return;
        }

        // Fetch product details for each ID
        // Note: In production, you'd want to batch this into a single API call
        const products = await Promise.all(
          relevantIds.map(async (id) => {
            try {
              const response = await fetch(`/api/products/${id}/`);
              if (!response.ok) return null;
              return await response.json();
            } catch {
              return null;
            }
          })
        );

        // Filter out any failed fetches
        const validProducts = products.filter((p): p is Product => p !== null);
        setRecentProducts(validProducts);
      } catch (error) {
        console.error('Failed to load recently viewed products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRecentProducts();
  }, [currentProductId, maxItems]);

  // Don't render if no recent products
  if (!isLoading && recentProducts.length === 0) {
    return null;
  }

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Recently Viewed</h2>
      
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: maxItems }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Helper function to track product views
 * Call this when a product page is viewed
 */
export function trackProductView(productId: string) {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const productIds: string[] = stored ? JSON.parse(stored) : [];

    // Remove if already exists (to move to front)
    const filtered = productIds.filter(id => id !== productId);

    // Add current product to the beginning
    const updated = [productId, ...filtered].slice(0, MAX_STORED_ITEMS);

    // Save back to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to track product view:', error);
  }
}
