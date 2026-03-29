'use client';

/**
 * NewsletterFilters — Filter toolbar for newsletter dashboard
 * Extracted from newsletter/page.tsx for 150-line rule compliance
 */
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface NewsletterFiltersProps {
  searchTerm: string;
  onSearchChange: (val: string) => void;
  statusFilter: 'all' | 'active' | 'inactive';
  onStatusFilterChange: (val: 'all' | 'active' | 'inactive') => void;
}

export function NewsletterFilters({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}: NewsletterFiltersProps) {
  return (
    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
      <div className="relative w-full md:w-96">
        <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search email or subscriber name..."
          className="focus-visible:ring-primary/20 rounded-2xl border-gray-100 bg-white py-6 pl-10 font-medium shadow-sm transition-all"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="flex rounded-2xl border border-gray-100 bg-gray-100/50 p-1.5">
        {(['all', 'active', 'inactive'] as const).map((filter) => (
          <Button
            key={filter}
            variant="ghost"
            onClick={() => onStatusFilterChange(filter)}
            className={`h-auto rounded-xl px-6 py-2 text-xs font-black tracking-wider uppercase transition-all ${
              statusFilter === filter
                ? 'text-primary bg-white shadow-sm hover:bg-white'
                : 'text-gray-400 hover:bg-transparent hover:text-gray-600'
            }`}
          >
            {filter}
          </Button>
        ))}
      </div>
    </div>
  );
}
