'use client';

import { Package } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { TableCell, TableRow } from '@/components/ui/table';
import { ProductActions } from './ProductActions';

interface ProductTableRowProps {
  product: any;
  isSelected: boolean;
  onSelectRow: (id: string, checked: boolean) => void;
  onDelete: (slug: string) => void;
  onDuplicate: (slug: string) => void;
}

export function ProductTableRow({
  product,
  isSelected,
  onSelectRow,
  onDelete,
  onDuplicate,
}: ProductTableRowProps) {
  return (
    <TableRow className="group border-border/50 hover:bg-muted/30 transition-colors">
      <TableCell className="px-6 py-5">
        <Checkbox
          checked={isSelected}
          onCheckedChange={(checked) => onSelectRow(product.id, !!checked)}
          className="rounded-md"
        />
      </TableCell>
      <TableCell className="px-4 py-5">
        <div className="flex items-center gap-4">
          <div className="border-border bg-muted relative h-14 w-14 overflow-hidden rounded-2xl border transition-shadow group-hover:shadow-md">
            {product.featured_image ? (
              <Image
                src={product.featured_image}
                alt={product.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <div className="bg-primary/10 rounded-xl p-2">
                  <Package className="text-primary h-6 w-6" />
                </div>
              </div>
            )}
            {!product.is_active && (
              <div className="bg-background/60 absolute inset-0 z-10 flex items-center justify-center backdrop-blur-[1px]">
                <span className="text-muted-foreground text-[8px] font-black tracking-tighter uppercase">
                  Draft
                </span>
              </div>
            )}
          </div>
          <div className="min-w-0">
            <div className="group-hover:text-primary text-foreground max-w-[240px] truncate font-black transition-colors">
              {product.name}
            </div>
            <div className="mt-1 flex items-center gap-2">
              <Badge
                variant="secondary"
                className="bg-muted text-muted-foreground border-none px-1.5 py-0 text-[9px] font-bold uppercase"
              >
                {product.category_name}
              </Badge>
              <span className="text-muted-foreground/40 text-[10px] font-medium">
                #{product.sku || 'NO-SKU'}
              </span>
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell className="px-4 py-5 font-bold">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <div
              className={`h-1.5 w-1.5 rounded-full ${product.stock_quantity > 10 ? 'bg-secondary' : 'bg-accent'}`}
            />
            <span className="text-muted-foreground text-sm font-black">
              {product.stock_quantity} in stock
            </span>
          </div>
          <div className="bg-muted h-1 w-24 overflow-hidden rounded-full">
            <div
              className={`h-full rounded-full ${product.stock_quantity > 10 ? 'bg-secondary' : 'bg-accent'}`}
              style={{ width: `${Math.min(100, (product.stock_quantity / 50) * 100)}%` }}
            />
          </div>
        </div>
      </TableCell>
      <TableCell className="px-4 py-5">
        <div className="text-foreground text-base font-black">
          ₦{Number(product.price).toLocaleString()}
        </div>
        {product.compare_at_price && (
          <div className="text-muted-foreground text-[11px] font-bold line-through">
            ₦{Number(product.compare_at_price).toLocaleString()}
          </div>
        )}
      </TableCell>
      <TableCell className="px-4 py-5">
        <div className="flex flex-col gap-1.5">
          <Badge
            className={`w-fit rounded-xl border px-3 py-1 text-[9px] font-black uppercase shadow-none ${product.is_active ? 'bg-secondary/10 text-secondary border-secondary/20' : 'border-border bg-muted text-muted-foreground'}`}
          >
            {product.is_active ? 'Active' : 'Draft'}
          </Badge>
          {product.is_featured && (
            <Badge className="bg-primary/10 text-primary border-primary/20 w-fit rounded-xl border px-3 py-1 text-[9px] font-black uppercase shadow-none">
              Featured
            </Badge>
          )}
        </div>
      </TableCell>
      <TableCell className="px-6 py-5 text-right">
        <ProductActions product={product} onDelete={onDelete} onDuplicate={onDuplicate} />
      </TableCell>
    </TableRow>
  );
}
