'use client';

import { MapPin, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';
import { TableCell, TableRow } from '@/components/ui/table';
import type { Product } from '@/types/product';

interface InventoryRowProps {
  product: Product;
  onRestock: (item: { slug: string; name: string; stock: number }) => void;
  onMarkOffline: (slug: string) => void;
}

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

export function InventoryRow({ product, onRestock, onMarkOffline }: InventoryRowProps) {
  const status = getStockStatus(product);
  const health = getHealth(product);

  return (
    <TableRow className="group hover:bg-muted/30 transition-colors">
      <TableCell className="px-8 py-5">
        <div className="group-hover:text-primary text-foreground font-bold transition-colors">
          {product.name}
        </div>
        <div className="text-muted-foreground mt-1 flex items-center text-[10px] font-bold tracking-wider uppercase">
          <MapPin className="mr-1 h-2.5 w-2.5" />
          {product.sku || 'N/A'}
        </div>
      </TableCell>
      <TableCell className="px-6 py-5">
        <Badge variant={status.variant} className="rounded-lg text-[9px] font-black uppercase">
          {product.stock_quantity} units
        </Badge>
      </TableCell>
      <TableCell className="px-6 py-5">
        <div className="min-w-[100px] space-y-1.5">
          <Progress value={health} className="h-1.5" />
          <div className="text-muted-foreground flex justify-between text-[9px] font-black">
            <span>HEALTH</span>
            <span className={health < 50 ? 'text-destructive' : 'text-secondary font-bold'}>
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
              className="hover:text-primary text-muted-foreground h-8 w-8 rounded-lg"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 rounded-xl p-2">
            <DropdownMenuItem asChild className="cursor-pointer rounded-lg py-2 text-xs font-bold">
              <Link href={`/dashboard/products/${product.slug}`}>Edit Details</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer rounded-lg py-2 text-xs font-bold"
              onClick={() =>
                onRestock({
                  slug: product.slug,
                  name: product.name,
                  stock: Number(product.stock_quantity),
                })
              }
            >
              Quick Restock
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              className="cursor-pointer rounded-lg py-2 text-xs font-bold"
              onClick={() => onMarkOffline(product.slug)}
            >
              Mark as Inactive
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
