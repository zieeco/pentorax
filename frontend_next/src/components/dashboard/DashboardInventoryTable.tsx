'use client';

/**
 * DashboardInventoryTable — Live inventory table with restock + mark offline actions
 * Extracted from dashboard/page.tsx for 150-line rule compliance
 */
import { MapPin, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Product } from '@/types/product';

function getStockStatus(prod: Product) {
  if (prod.stock_quantity === 0) return { label: 'Out of Stock', variant: 'destructive' as const };
  if (prod.stock_quantity <= (prod.low_stock_threshold || 5))
    return { label: 'Low Stock', variant: 'secondary' as const };
  return { label: 'In Stock', variant: 'default' as const };
}

function getHealth(prod: Product) {
  if (prod.stock_quantity === 0) return 0;
  const ratio = prod.stock_quantity / (prod.low_stock_threshold || 5);
  if (ratio <= 1) return Math.round(ratio * 60 + 20);
  return Math.min(100, Math.round(80 + (ratio / 10) * 20));
}

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
    <Card className="overflow-hidden rounded-[2rem] border-gray-100 shadow-sm lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between border-b border-gray-50 px-8 py-6">
        <CardTitle className="text-lg font-black">Live Inventory Status</CardTitle>
        <Button variant="link" asChild className="text-primary p-0 font-bold">
          <Link href="/dashboard/products">View Detailed Inventory</Link>
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow className="border-none hover:bg-transparent">
              <TableHead className="px-8 py-4 text-[10px] font-black tracking-widest text-gray-400 uppercase">
                Product
              </TableHead>
              <TableHead className="px-6 py-4 text-[10px] font-black tracking-widest text-gray-400 uppercase">
                Stock
              </TableHead>
              <TableHead className="px-6 py-4 text-[10px] font-black tracking-widest text-gray-400 uppercase">
                Health
              </TableHead>
              <TableHead className="px-6 py-4 text-center text-[10px] font-black tracking-widest text-gray-400 uppercase">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading
              ? Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <TableRow key={i}>
                      <TableCell className="px-8 py-5">
                        <div className="h-4 w-48 animate-pulse rounded-lg bg-gray-100" />
                      </TableCell>
                      <TableCell className="px-6 py-5">
                        <div className="h-4 w-16 animate-pulse rounded-lg bg-gray-100" />
                      </TableCell>
                      <TableCell className="px-6 py-5">
                        <div className="h-4 w-24 animate-pulse rounded-lg bg-gray-100" />
                      </TableCell>
                      <TableCell className="px-6 py-5 text-center">
                        <div className="mx-auto h-8 w-8 animate-pulse rounded-lg bg-gray-100" />
                      </TableCell>
                    </TableRow>
                  ))
              : products.map((prod) => {
                  const status = getStockStatus(prod);
                  const health = getHealth(prod);
                  return (
                    <TableRow key={prod.id} className="group transition-colors hover:bg-gray-50/50">
                      <TableCell className="px-8 py-5">
                        <div className="group-hover:text-primary font-bold text-gray-900 transition-colors">
                          {prod.name}
                        </div>
                        <div className="mt-1 flex items-center text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                          <MapPin className="mr-1 h-2.5 w-2.5" />
                          {prod.sku || 'N/A'}
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-5">
                        <Badge
                          variant={status.variant}
                          className="rounded-lg text-[9px] font-black uppercase"
                        >
                          {prod.stock_quantity} units
                        </Badge>
                      </TableCell>
                      <TableCell className="px-6 py-5">
                        <div className="min-w-[100px] space-y-1.5">
                          <Progress value={health} className="h-1.5" />
                          <div className="flex justify-between text-[9px] font-black text-gray-400">
                            <span>HEALTH</span>
                            <span className={health < 50 ? 'text-destructive' : 'text-emerald-500'}>
                              {health}%
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-5 text-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="hover:text-primary h-8 w-8 rounded-lg text-gray-400"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48 rounded-xl p-2">
                            <DropdownMenuItem
                              asChild
                              className="cursor-pointer rounded-lg py-2 text-xs font-bold"
                            >
                              <Link href={`/dashboard/products/${prod.slug}`}>Edit Details</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer rounded-lg py-2 text-xs font-bold"
                              onClick={() =>
                                onRestock({
                                  slug: prod.slug,
                                  name: prod.name,
                                  stock: Number(prod.stock_quantity),
                                })
                              }
                            >
                              Quick Restock
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              variant="destructive"
                              className="cursor-pointer rounded-lg py-2 text-xs font-bold"
                              onClick={() => onMarkOffline(prod.slug)}
                            >
                              Mark as Inactive
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
