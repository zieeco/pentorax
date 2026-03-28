'use client';

import { Copy, Edit, Eye, MoreHorizontal, Package, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TableCell, TableRow } from '@/components/ui/table';

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
    <TableRow className="group border-gray-50 transition-colors hover:bg-gray-50/30">
      <TableCell className="px-6 py-5">
        <Checkbox
          checked={isSelected}
          onCheckedChange={(checked) => onSelectRow(product.id, !!checked)}
          className="rounded-md"
        />
      </TableCell>
      <TableCell className="px-4 py-5">
        <div className="flex items-center gap-4">
          <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-gray-50 bg-gray-100 transition-shadow group-hover:shadow-md">
            {product.featured_image ? (
              <Image
                src={product.featured_image}
                alt={product.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <Package className="h-6 w-6 text-gray-300" />
              </div>
            )}
            {!product.is_active && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 backdrop-blur-[1px]">
                <span className="text-[8px] font-black tracking-tighter text-gray-500 uppercase">
                  Draft
                </span>
              </div>
            )}
          </div>
          <div className="min-w-0">
            <div className="group-hover:text-primary max-w-[240px] truncate font-black text-gray-900 transition-colors">
              {product.name}
            </div>
            <div className="mt-1 flex items-center gap-2">
              <Badge
                variant="secondary"
                className="border-none bg-gray-50 px-1.5 py-0 text-[9px] font-bold text-gray-500 uppercase"
              >
                {product.category_name}
              </Badge>
              <span className="text-[10px] font-medium text-gray-300">
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
              className={`h-1.5 w-1.5 rounded-full ${product.stock_quantity > 10 ? 'bg-brand-green' : 'bg-brand-yellow'}`}
            />
            <span className="text-sm font-black text-gray-600">
              {product.stock_quantity} in stock
            </span>
          </div>
          <div className="h-1 w-24 overflow-hidden rounded-full bg-gray-100">
            <div
              className={`h-full rounded-full ${product.stock_quantity > 10 ? 'bg-brand-green' : 'bg-brand-yellow'}`}
              style={{ width: `${Math.min(100, (product.stock_quantity / 50) * 100)}%` }}
            />
          </div>
        </div>
      </TableCell>
      <TableCell className="px-4 py-5">
        <div className="text-base font-black text-gray-900">
          ₦{Number(product.price).toLocaleString()}
        </div>
        {product.compare_at_price && (
          <div className="text-[11px] font-bold text-gray-400 line-through">
            ₦{Number(product.compare_at_price).toLocaleString()}
          </div>
        )}
      </TableCell>
      <TableCell className="px-4 py-5">
        <div className="flex flex-col gap-1.5">
          <Badge
            className={`w-fit rounded-xl border px-3 py-1 text-[9px] font-black uppercase shadow-none ${product.is_active ? 'bg-brand-green/10 text-brand-green border-brand-green/20' : 'border-gray-200 bg-gray-100 text-gray-500'}`}
          >
            {product.is_active ? 'Active' : 'Draft'}
          </Badge>
          {product.is_featured && (
            <Badge className="bg-brand-indigo/10 text-brand-indigo border-brand-indigo/20 w-fit rounded-xl border px-3 py-1 text-[9px] font-black uppercase shadow-none">
              Featured
            </Badge>
          )}
        </div>
      </TableCell>
      <TableCell className="px-6 py-5 text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-xl text-gray-400 hover:bg-gray-100 hover:text-gray-900"
            >
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 rounded-2xl border-gray-100 p-2 shadow-xl"
          >
            <DropdownMenuLabel className="px-3 py-2 text-[10px] font-black text-gray-400 uppercase">
              Quick Actions
            </DropdownMenuLabel>
            <DropdownMenuItem asChild className="cursor-pointer rounded-xl py-2.5 font-bold">
              <Link href={`/dashboard/products/${product.slug}/edit`}>
                <Edit className="mr-3 h-4 w-4 text-gray-400" /> Edit Product
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer rounded-xl py-2.5 font-bold"
              onClick={() => onDuplicate(product.slug)}
            >
              <Copy className="mr-3 h-4 w-4 text-gray-400" /> Duplicate
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer rounded-xl py-2.5 font-bold">
              <Link href={`/shop/${product.slug}`} target="_blank">
                <Eye className="mr-3 h-4 w-4 text-gray-400" /> Preview Live
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-2 bg-gray-50" />
            <DropdownMenuItem
              className="text-destructive focus:bg-destructive/5 focus:text-destructive cursor-pointer rounded-xl py-2.5 font-bold"
              onClick={() => onDelete(product.slug)}
            >
              <Trash2 className="mr-3 h-4 w-4" /> Delete Permanently
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
