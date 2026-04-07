'use client';

import { Copy, Edit, Eye, MoreHorizontal, Trash2 } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ProductActionsProps {
  product: {
    slug: string;
    name: string;
  };
  onDelete: (slug: string) => void;
  onDuplicate: (slug: string) => void;
}

export function ProductActions({ product, onDelete, onDuplicate }: ProductActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:bg-muted hover:text-foreground h-10 w-10 rounded-xl"
        >
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="border-border w-56 rounded-2xl p-2 shadow-xl">
        <DropdownMenuLabel className="text-muted-foreground px-3 py-2 text-[10px] font-black uppercase">
          Quick Actions
        </DropdownMenuLabel>
        <DropdownMenuItem asChild className="cursor-pointer rounded-xl py-2.5 font-bold">
          <Link href={`/dashboard/products/${product.slug}/edit`}>
            <Edit className="text-muted-foreground mr-3 h-4 w-4" /> Edit Product
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer rounded-xl py-2.5 font-bold"
          onClick={() => onDuplicate(product.slug)}
        >
          <Copy className="text-muted-foreground mr-3 h-4 w-4" /> Duplicate
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer rounded-xl py-2.5 font-bold">
          <Link href={`/shop/${product.slug}`} target="_blank">
            <Eye className="text-muted-foreground mr-3 h-4 w-4" /> Preview Live
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-border/50 my-2" />
        <DropdownMenuItem
          className="text-destructive focus:bg-destructive/5 focus:text-destructive cursor-pointer rounded-xl py-2.5 font-bold"
          onClick={() => onDelete(product.slug)}
        >
          <Trash2 className="mr-3 h-4 w-4" /> Delete Permanently
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
