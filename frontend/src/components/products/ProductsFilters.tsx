/**
 * ProductsFilters - Search and filter controls
 */
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface ProductsFiltersProps {
  searchInput: string;
  categoryFilter: string;
  categories: Category[];
  onSearchInputChange: (value: string) => void;
  onSearch: (e: React.FormEvent) => void;
  onCategoryChange: (category: string) => void;
}

export function ProductsFilters({
  searchInput,
  categoryFilter,
  categories,
  onSearchInputChange,
  onSearch,
  onCategoryChange,
}: ProductsFiltersProps) {
  return (
    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
      <form onSubmit={onSearch} className="flex gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search products..."
            value={searchInput}
            onChange={(e) => onSearchInputChange(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select 
          value={categoryFilter || 'all'} 
          onValueChange={onCategoryChange}
        >
          <SelectTrigger className="w-[180px]">
            <Filter className="h-4 w-4 mr-2 text-gray-400" />
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.slug}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Button type="submit" variant="secondary">
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </form>
    </div>
  );
}
