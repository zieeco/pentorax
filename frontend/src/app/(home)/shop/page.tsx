'use client';

/**
 * Shop Catalog Page
 * Refactored to use Next.js App Router and premium shadcn/ui.
 * Decomposed into ProductGrid, SidebarFilters (if needed), and CategoryHeader.
 * Adheres to 150-line rule.
 */
import { LayoutGrid, List, Search, SlidersHorizontal } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { ProductGrid } from '@/components/shop/ProductGrid';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCategories, useProducts } from '@/hooks/products-hooks';

export default function ShopPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '');

  const search = searchParams.get('search') || '';
  const categoryFilter = searchParams.get('category') || 'all';

  const { data: products = [], isLoading } = useProducts({
    search: search || undefined,
    category: categoryFilter === 'all' ? undefined : categoryFilter,
  });

  const { data: categories = [] } = useCategories();

  const updateParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([k, v]) =>
      !v || v === 'all' ? params.delete(k) : params.set(k, v)
    );
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="bg-background/50 min-h-screen pb-20">
      {/* Header Banner */}
      <div className="bg-foreground text-background relative overflow-hidden py-24">
        <div className="from-primary/20 to-primary/10 absolute inset-0 bg-gradient-to-r via-transparent" />
        <div className="bg-primary/20 absolute top-0 right-0 -mt-32 -mr-32 h-64 w-64 rounded-full blur-[120px]" />
        <div className="relative z-10 container mx-auto px-4 lg:px-8">
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-4 rounded-full px-4 py-1 text-[10px] font-black uppercase">
            Official Catalog
          </Badge>
          <h1 className="mb-6 text-4xl leading-none font-black tracking-tight md:text-6xl">
            Shop Solar <br />
            <span className="text-primary italic">Solutions.</span>
          </h1>
          <p className="text-background/60 max-w-xl text-lg font-medium">
            Discover a curated range of high-performance solar panels, inverters, and battery
            storage systems designed for African climate resilience.
          </p>
        </div>
      </div>

      <div className="container mx-auto -mt-10 px-4 lg:px-8">
        <div className="flex flex-col gap-10">
          {/* Controls Bar */}
          <div className="border-border bg-card flex flex-col items-center justify-between gap-6 rounded-[2.5rem] p-6 shadow-xl lg:flex-row">
            <div className="relative w-full lg:w-96">
              <Search className="text-muted-foreground absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2" />
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateParams({ search: searchInput });
                }}
              >
                <Input
                  className="focus-visible:ring-primary/20 bg-muted rounded-2xl border-none py-6 pl-12 font-bold"
                  placeholder="Search gear..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </form>
            </div>

            <div className="scrollbar-hide flex w-full items-center gap-2 overflow-x-auto pb-2 lg:w-auto lg:pb-0">
              <Button
                variant={categoryFilter === 'all' ? 'default' : 'ghost'}
                className="h-10 rounded-xl px-6 text-xs font-black uppercase"
                onClick={() => updateParams({ category: 'all' })}
              >
                All
              </Button>
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  variant={categoryFilter === cat.slug ? 'default' : 'ghost'}
                  className="h-10 rounded-xl px-6 text-xs font-black whitespace-nowrap uppercase"
                  onClick={() => updateParams({ category: cat.slug })}
                >
                  {cat.name}
                </Button>
              ))}
            </div>

            <div className="border-border hidden items-center gap-3 border-l pl-6 lg:flex">
              <Button variant="ghost" size="icon" className="text-primary bg-primary/10 rounded-xl">
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground rounded-xl">
                <List className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground rounded-xl">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-8 lg:flex-row">
            <main className="flex-1">
              <div className="mb-8 flex items-center justify-between">
                <p className="text-muted-foreground text-sm font-black tracking-widest uppercase">
                  {isLoading ? 'Scanning Inventory...' : `${products.length} Items Found`}
                </p>
              </div>
              <ProductGrid products={products} isLoading={isLoading} />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
