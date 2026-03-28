'use client';

import { Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface OrderFiltersProps {
  searchTerm: string;
  onSearchChange: (val: string) => void;
  statusFilter: string;
  onStatusChange: (val: string) => void;
  onRefresh: () => void;
}

export function OrderFilters({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  onRefresh,
}: OrderFiltersProps) {
  return (
    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
      <div className="relative w-full md:w-96">
        <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search Order ID, name, or email..."
          className="rounded-xl border-gray-100 bg-white py-5 pl-10 font-medium shadow-sm"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="flex w-full items-center gap-3 md:w-auto">
        <Select value={statusFilter} onValueChange={onStatusChange}>
          <SelectTrigger className="h-10 w-full rounded-xl border-gray-100 bg-white font-bold shadow-sm md:w-48">
            <div className="flex items-center gap-2">
              <Filter className="h-3.5 w-3.5 text-gray-400" />
              <SelectValue placeholder="All Status" />
            </div>
          </SelectTrigger>
          <SelectContent className="rounded-xl p-1">
            <SelectItem value="all" className="rounded-lg font-bold">
              All Orders
            </SelectItem>
            <SelectItem value="pending" className="rounded-lg font-bold">
              Pending
            </SelectItem>
            <SelectItem value="processing" className="rounded-lg font-bold">
              Processing
            </SelectItem>
            <SelectItem value="shipped" className="rounded-lg font-bold">
              Shipped
            </SelectItem>
            <SelectItem value="delivered" className="rounded-lg font-bold">
              Delivered
            </SelectItem>
            <SelectItem value="cancelled" className="rounded-lg font-bold">
              Cancelled
            </SelectItem>
          </SelectContent>
        </Select>
        <Button variant="ghost" className="rounded-xl font-bold text-gray-400" onClick={onRefresh}>
          Refresh
        </Button>
      </div>
    </div>
  );
}
