'use client';

/**
 * ProductTable — Core product list table with bulk actions and row rendering
 * Extracted from products/page.tsx for 150-line rule compliance
 */
import { Copy, Edit, Eye, MoreHorizontal, Package, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ProductTableRow } from './products/ProductTableRow';

interface ProductTableProps {
  products: any[];
  isLoading: boolean;
  selectedIds: string[];
  onSelectRow: (id: string, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
  isAllSelected: boolean;
  onDelete: (slug: string) => void;
  onDuplicate: (slug: string) => void;
}

export function ProductTable({
  products,
  isLoading,
  selectedIds,
  onSelectRow,
  onSelectAll,
  isAllSelected,
  onDelete,
  onDuplicate,
}: ProductTableProps) {
  return (
    <Card className="border-border bg-card overflow-hidden rounded-[2.5rem] shadow-sm">
      <Table>
        <TableHeader className="bg-muted/30">
          <TableRow className="border-none hover:bg-transparent">
            <TableHead className="w-12 px-6">
              <Checkbox
                checked={isAllSelected}
                onCheckedChange={onSelectAll}
                className="rounded-md"
              />
            </TableHead>
            <TableHead className="px-4 py-4 text-[10px] font-black tracking-widest text-gray-400 uppercase">
              Product Details
            </TableHead>
            <TableHead className="text-muted-foreground px-4 py-4 text-[10px] font-black tracking-widest uppercase">
              Inventory
            </TableHead>
            <TableHead className="text-muted-foreground px-4 py-4 text-[10px] font-black tracking-widest uppercase">
              Pricing
            </TableHead>
            <TableHead className="text-muted-foreground px-4 py-4 text-[10px] font-black tracking-widest uppercase">
              Status
            </TableHead>
            <TableHead className="text-muted-foreground px-6 py-4 text-right text-[10px] font-black tracking-widest uppercase">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array(10)
              .fill(0)
              .map((_, i) => (
                <TableRow key={i} className="border-gray-50">
                  <TableCell className="px-6 py-4">
                    <div className="bg-muted h-4 w-4 animate-pulse rounded" />
                  </TableCell>
                  <TableCell className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-muted h-12 w-12 animate-pulse rounded-xl" />
                      <div className="space-y-2">
                        <div className="bg-muted h-4 w-32 animate-pulse rounded" />
                        <div className="bg-muted h-3 w-20 animate-pulse rounded" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell colSpan={4}>
                    <div className="bg-muted h-4 w-full animate-pulse rounded" />
                  </TableCell>
                </TableRow>
              ))
          ) : products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-96 text-center">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="bg-muted/30 rounded-full p-6">
                    <Package className="text-muted-foreground/50 h-10 w-10" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-foreground text-lg font-black">No products found</p>
                    <p className="text-muted-foreground text-sm font-medium">
                      Try adjusting your search or filters.
                    </p>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
              <ProductTableRow
                key={product.id}
                product={product}
                isSelected={selectedIds.includes(product.id)}
                onSelectRow={onSelectRow}
                onDelete={onDelete}
                onDuplicate={onDuplicate}
              />
            ))
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
