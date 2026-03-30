'use client';

/**
 * Dashboard Overview Page
 * Refactored: Decomposed into DashboardStatsGrid, DashboardInventoryTable, and DashboardForecastAndActivity.
 * Satisfies the 150-line rule (< 100 lines).
 */
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import { DashboardForecastAndActivity } from '@/components/dashboard/DashboardForecastAndActivity';
import { DashboardInventoryTable } from '@/components/dashboard/DashboardInventoryTable';
import { DashboardStatsGrid } from '@/components/dashboard/DashboardStatsGrid';
import { RestockDialog } from '@/components/dashboard/RestockDialog';
import { Button } from '@/components/ui/button';
import { useProductsPaginated, useUpdateProduct } from '@/hooks/products-hooks';
import { useUser } from '@/stores/auth';

type RestockItem = { slug: string; name: string; stock: number };

export default function DashboardPage() {
  const user = useUser();
  const [restockItem, setRestockItem] = useState<RestockItem | null>(null);
  const [newStock, setNewStock] = useState('');
  const { data: productData, isLoading } = useProductsPaginated({ per_page: 5 });
  const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct();
  const products = productData?.results || [];

  const handleMarkOffline = (slug: string) => {
    updateProduct(
      { slug, data: { is_active: false } },
      {
        onSuccess: () => toast.success('Product marked offline'),
        onError: () => toast.error('Failed to mark offline'),
      }
    );
  };

  const handleRestock = () => {
    if (!restockItem) return;
    const quantity = parseInt(newStock, 10);
    if (isNaN(quantity)) {
      toast.error('Please enter a valid number');
      return;
    }
    updateProduct(
      { slug: restockItem.slug, data: { stock_quantity: quantity } },
      {
        onSuccess: () => {
          toast.success('Stock updated successfully');
          setRestockItem(null);
          setNewStock('');
        },
        onError: () => toast.error('Failed to update stock'),
      }
    );
  };

  return (
    <div className="animate-in fade-in space-y-8 duration-700">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-foreground text-3xl font-black tracking-tight">
            Welcome back,{' '}
            {user?.user_metadata?.name?.split(' ')[0] || user?.email?.split('@')[0] || 'there'}! 👋
          </h1>
          <p className="text-muted-foreground mt-1 font-medium">
            Here&apos;s a quick overview of your business performance today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="border-border bg-background rounded-xl font-bold shadow-sm"
          >
            Download Report
          </Button>
          <Button className="shadow-primary/20 gap-2 rounded-xl font-bold shadow-lg" asChild>
            <Link href="/dashboard/products/create">
              <Plus className="h-4 w-4" />
              Add Product
            </Link>
          </Button>
        </div>
      </div>

      <DashboardStatsGrid />

      <div className="grid gap-8 lg:grid-cols-3">
        <DashboardInventoryTable
          products={products}
          isLoading={isLoading}
          onRestock={(item) => {
            setRestockItem(item);
            setNewStock(item.stock.toString());
          }}
          onMarkOffline={handleMarkOffline}
        />
        <DashboardForecastAndActivity />
      </div>

      <RestockDialog
        item={restockItem}
        newStock={newStock}
        isUpdating={isUpdating}
        onStockChange={setNewStock}
        onClose={() => setRestockItem(null)}
        onConfirm={handleRestock}
      />
    </div>
  );
}
