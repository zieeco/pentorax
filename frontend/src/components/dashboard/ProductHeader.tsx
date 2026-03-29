'use client';

/**
 * ProductHeader — Catalog header with export and add buttons
 * Extracted from products/page.tsx for 150-line rule compliance
 */
import { Download, Package, Plus } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function ProductHeader() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="flex items-center gap-3 text-3xl font-black tracking-tight text-gray-900">
          <Package className="text-primary h-8 w-8" />
          Product Catalog
        </h1>
        <p className="mt-1 font-medium text-gray-500">
          Manage inventories, pricing, and AI-powered descriptions.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          className="gap-2 rounded-xl border-gray-100 bg-white font-bold shadow-sm"
        >
          <Download className="h-4 w-4" />
          Export
        </Button>
        <Button asChild className="shadow-primary/20 gap-2 rounded-xl font-bold shadow-lg">
          <Link href="/dashboard/products/new">
            <Plus className="h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>
    </div>
  );
}
