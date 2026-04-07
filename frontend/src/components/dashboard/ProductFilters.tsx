'use client';

/**
 * ProductFilters — Catalog search, category filter, and view toggles
 * Extracted from products/page.tsx for 150-line rule compliance
 */
import { Filter, LayoutGrid, List as ListIcon, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ProductFiltersProps {
  searchInput: string;
  onSearchInputChange: (val: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  categoryFilter: string;
  onCategoryFilterChange: (val: string) => void;
  categories: any[];
}

export function ProductFilters({
  searchInput,
  onSearchInputChange,
  onSearchSubmit,
  categoryFilter,
  onCategoryFilterChange,
  categories,
}: ProductFiltersProps) {
  return (
    <Card className="border-border overflow-hidden rounded-[2rem] shadow-sm">
      <CardContent className="p-6">
        <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
          <form onSubmit={onSearchSubmit} className="relative w-full lg:w-96">
            <Search className="text-muted-foreground absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Search products, SKUs..."
              className="border-border bg-muted/30 focus-visible:border-primary rounded-xl py-5 pl-10 font-medium shadow-none transition-all"
              value={searchInput}
              onChange={(e) => onSearchInputChange(e.target.value)}
            />
          </form>

          <div className="flex w-full flex-wrap items-center gap-3 lg:w-auto">
            <Select value={categoryFilter} onValueChange={onCategoryFilterChange}>
              <SelectTrigger className="border-border bg-muted/30 h-10 w-full rounded-xl font-bold shadow-none sm:w-48">
                <div className="flex items-center gap-2">
                  <Filter className="text-muted-foreground h-3.5 w-3.5" />
                  <SelectValue placeholder="All Categories" />
                </div>
              </SelectTrigger>
              <SelectContent className="rounded-xl p-1">
                <SelectItem value="all" className="rounded-lg font-bold">
                  All Categories
                </SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.slug} className="rounded-lg font-bold">
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="border-border bg-muted/30 hidden rounded-xl border p-1 sm:flex">
              <Button
                variant="ghost"
                size="icon"
                className="text-primary bg-background h-8 w-8 rounded-lg shadow-sm"
              >
                <ListIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground h-8 w-8 rounded-lg"
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
