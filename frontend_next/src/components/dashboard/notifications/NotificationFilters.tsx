'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface NotificationFiltersProps {
  filter: string;
  onFilterChange: (value: string) => void;
  searchInput: string;
  onSearchChange: (value: string) => void;
  onSearch: (e: React.FormEvent) => void;
}

export function NotificationFilters({
  filter,
  onFilterChange,
  searchInput,
  onSearchChange,
  onSearch,
}: NotificationFiltersProps) {
  return (
    <div className="mt-8 flex flex-col gap-6 sm:flex-row">
      <Tabs value={filter} onValueChange={onFilterChange} className="w-full sm:w-auto">
        <TabsList className="h-12 rounded-2xl border border-gray-100 bg-gray-50/50 p-1 shadow-none">
          <TabsTrigger
            value="all"
            className="rounded-xl px-6 font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="unread"
            className="rounded-xl px-6 font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Unread
          </TabsTrigger>
          <TabsTrigger
            value="read"
            className="rounded-xl px-6 font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Read
          </TabsTrigger>
          <TabsTrigger
            value="archived"
            className="rounded-xl px-6 font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Archived
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <form onSubmit={onSearch} className="group relative max-w-md flex-1">
        <Search className="group-focus-within:text-primary absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400 transition-colors" />
        <Input
          placeholder="Search by product or email..."
          value={searchInput}
          onChange={(e) => onSearchChange(e.target.value)}
          className="focus:ring-primary/5 h-12 rounded-2xl border-gray-100 bg-gray-50/50 pl-12 font-medium shadow-none transition-all outline-none focus:bg-white focus:ring-4"
        />
      </form>
    </div>
  );
}
