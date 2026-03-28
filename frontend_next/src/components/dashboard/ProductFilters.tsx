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
    <Card className="overflow-hidden rounded-[2rem] border-gray-100 shadow-sm">
      <CardContent className="p-6">
        <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
          <form onSubmit={onSearchSubmit} className="relative w-full lg:w-96">
            <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search products, SKUs..."
              className="rounded-xl border-gray-100 bg-gray-50/50 py-5 pl-10 font-medium shadow-none transition-all focus-visible:bg-white"
              value={searchInput}
              onChange={(e) => onSearchInputChange(e.target.value)}
            />
          </form>

          <div className="flex w-full flex-wrap items-center gap-3 lg:w-auto">
            <Select value={categoryFilter} onValueChange={onCategoryFilterChange}>
              <SelectTrigger className="h-10 w-full rounded-xl border-gray-100 bg-gray-50/50 font-bold shadow-none sm:w-48">
                <div className="flex items-center gap-2">
                  <Filter className="h-3.5 w-3.5 text-gray-400" />
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

            <div className="hidden rounded-xl border border-gray-100 bg-gray-50/50 p-1 sm:flex">
              <Button
                variant="ghost"
                size="icon"
                className="text-primary h-8 w-8 rounded-lg bg-white shadow-sm"
              >
                <ListIcon className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-gray-400">
                <LayoutGrid className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
