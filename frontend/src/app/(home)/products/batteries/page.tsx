'use client';

/**
 * BatteriesPage — Mission-critical energy storage
 * Precision-engineered repository for LiFePO4 storage assets.
 * Adheres to 150-line rule.
 */
import { ArrowRight, Battery, Loader2, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAddToCart } from '@/hooks/cart-hooks';
import { useProducts } from '@/hooks/products-hooks';
import { Product } from '@/types/product';

export default function BatteriesPage() {
  const { data: products = [], isLoading, isError } = useProducts({ category: 'batteries' });
  const addToCart = useAddToCart();

  const handleAddToCart = (e: React.MouseEvent, id: string, name: string) => {
    e.preventDefault();
    addToCart.mutate(
      { productId: id, quantity: 1 },
      {
        onSuccess: () => toast.success('Asset Locked', { description: `${name} added to cart.` }),
        onError: () => toast.error('Lock Failed', { description: 'Synchronize link failed.' }),
      }
    );
  };

  if (isLoading) return <LoadingGrid />;

  return (
    <div className="min-h-screen bg-white pb-24">
      <section className="relative overflow-hidden bg-gray-900 py-32 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1548333341-97ad215ee2f7?auto=format&fit=crop&w=1600&q=40')] bg-cover bg-center opacity-10" />
        <div className="relative z-10 container mx-auto px-4 lg:px-8">
          <Badge className="bg-primary/20 text-primary mb-8 rounded-full border-none px-4 py-1 text-[10px] leading-none font-black tracking-widest uppercase italic shadow-sm">
            Storage Hub
          </Badge>
          <h1 className="mb-8 text-6xl leading-none font-black tracking-tighter lowercase italic md:text-9xl">
            Storage <br />
            <span className="text-primary not-italic">Batteries.</span>
          </h1>
          <p className="max-w-2xl text-xl font-medium text-white/50 lowercase shadow-sm">
            Long-cycle LiFePO4 assets with smart BMS integration. 6,000+ cycle reliability.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-24 lg:px-8">
        {isError && <ErrorState />}
        {products.length === 0 && !isError && <EmptyState />}

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {products.map((p: Product) => (
            <div
              key={p.id}
              className="group flex flex-col overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white shadow-sm transition-all duration-700 hover:shadow-2xl"
            >
              <Link href={`/shop/${p.slug}`} className="relative h-64 shrink-0 overflow-hidden">
                <Image
                  src={p.featured_image}
                  alt={p.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute bottom-4 left-4 flex gap-2">
                  {p.in_stock && (
                    <Badge className="bg-green-500/90 text-[8px] font-black text-white uppercase italic">
                      In Asset
                    </Badge>
                  )}
                  {p.discount_percentage > 0 && (
                    <Badge className="bg-red-500/90 text-[8px] font-black text-white uppercase italic">
                      -{p.discount_percentage}%
                    </Badge>
                  )}
                </div>
              </Link>
              <div className="flex flex-grow flex-col p-8">
                <h3 className="group-hover:text-primary mb-2 text-xl leading-tight font-black tracking-tighter lowercase italic transition-colors">
                  {p.name}
                </h3>
                <p className="mb-8 line-clamp-2 text-xs font-medium text-gray-400 lowercase">
                  {p.short_description}
                </p>
                <div className="mt-auto flex items-end justify-between">
                  <div className="flex flex-col">
                    <span className="text-2xl font-black tracking-tighter text-gray-900">
                      ₦{Number(p.price).toLocaleString()}
                    </span>
                  </div>
                  <Button
                    onClick={(e) => handleAddToCart(e, p.id, p.name)}
                    disabled={addToCart.isPending}
                    size="icon"
                    className="hover:bg-primary group/btn h-14 w-14 rounded-2xl bg-gray-900 shadow-xl transition-all"
                  >
                    <ShoppingCart className="h-5 w-5 transition-transform group-hover/btn:scale-110" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function LoadingGrid() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white py-32">
      <Loader2 className="text-primary h-10 w-10 animate-spin" />
    </div>
  );
}
function ErrorState() {
  return (
    <div className="rounded-[4rem] border border-red-100 bg-red-50 py-24 text-center">
      <p className="mb-8 text-xs font-extrabold text-red-600 uppercase italic">
        Asset Synchronization Failed.
      </p>
      <Button
        onClick={() => window.location.reload()}
        variant="outline"
        className="border-red-200 text-red-600 transition-all hover:bg-red-600 hover:text-white"
      >
        Retry Link
      </Button>
    </div>
  );
}
function EmptyState() {
  return (
    <div className="rounded-[4rem] bg-gray-50 py-24 text-center">
      <p className="text-[10px] font-black tracking-widest text-gray-400 uppercase italic">
        No active storage assets found in repository.
      </p>
    </div>
  );
}
