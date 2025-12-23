/**
 * ShopPage - Product catalog with filtering
 */
import { useState } from 'react';
import { useProducts, useCategories } from '../hooks/useApi';
import { ProductGrid } from '../components/shop/ProductGrid';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Search, Filter } from 'lucide-react';

export default function ShopPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [priceRange, setPriceRange] = useState<{ min?: number; max?: number }>({});

  const { data: products = [], isLoading } = useProducts({
    search,
    category: selectedCategory,
    min_price: priceRange.min,
    max_price: priceRange.max,
  });

  const { data: categories = [] } = useCategories();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-4">Shop Solar Products</h1>
          <p className="text-white/90 text-lg">
            Browse our complete range of solar panels, inverters, and batteries
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 space-y-6">
            <div>
              <h3 className="font-semibold mb-3">Search</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Categories</h3>
              <div className="space-y-2">
                <Button
                  variant={!selectedCategory ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setSelectedCategory(undefined)}
                >
                  All Products
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.slug ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory(category.slug)}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Price Range</h3>
              <div className="space-y-2">
                <Input
                  type="number"
                  placeholder="Min price"
                  value={priceRange.min || ''}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) || undefined }))}
                />
                <Input
                  type="number"
                  placeholder="Max price"
                  value={priceRange.max || ''}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) || undefined }))}
                />
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                {isLoading ? 'Loading...' : `${products.length} products found`}
              </p>
            </div>

            <ProductGrid products={products} isLoading={isLoading} />
          </main>
        </div>
      </div>
    </div>
  );
}
