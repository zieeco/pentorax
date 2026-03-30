'use client';

/**
 * DashboardInventoryTable — Live inventory table with restock + mark offline actions
 * Refactored to satisfy the 150-line rule by delegating to sub-components.
 */
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { Product } from '@/types/product';
import { InventoryRow } from './inventory/InventoryRow';
import { InventorySkeleton } from './inventory/InventorySkeleton';

interface DashboardInventoryTableProps {
  products: Product[];
  isLoading: boolean;
  onRestock: (item: { slug: string; name: string; stock: number }) => void;
  onMarkOffline: (slug: string) => void;
}

export function DashboardInventoryTable({
  products,
  isLoading,
  onRestock,
  onMarkOffline,
}: DashboardInventoryTableProps) {
  return (
    <Card className="border-border overflow-hidden rounded-[2rem] shadow-sm lg:col-span-2">
      <CardHeader className="border-border/50 flex flex-row items-center justify-between border-b px-8 py-6">
        <CardTitle className="text-foreground text-lg font-black">Live Inventory Status</CardTitle>
        <Button variant="link" asChild className="text-primary p-0 font-bold">
          <Link href="/dashboard/products">View Detailed Inventory</Link>
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow className="border-none hover:bg-transparent">
              <TableHead className="text-muted-foreground px-8 py-4 text-[10px] font-black tracking-widest uppercase">
                Product
              </TableHead>
              <TableHead className="text-muted-foreground px-6 py-4 text-center text-[10px] font-black tracking-widest uppercase">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <InventorySkeleton />
            ) : (
              products.map((prod) => (
                <InventoryRow
                  key={prod.id}
                  product={prod}
                  onRestock={onRestock}
                  onMarkOffline={onMarkOffline}
                />
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
