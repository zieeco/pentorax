'use client';

/**
 * Modern Orders Management Page
 * Refactored: OrderHeader, OrderStats, OrderFilters, OrdersTable extracted
 * Status: Refactored to < 150 lines
 */
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { OrderFilters } from '@/components/dashboard/OrderFilters';
import { OrdersTable } from '@/components/dashboard/OrdersTable';
import { OrderHeader, OrderStats } from '@/components/dashboard/OrderStats';
import { useOrders, useUpdateOrderStatus } from '@/hooks/orders-hooks';

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const { data: orders = [], isLoading, refetch } = useOrders();
  const updateOrderStatus = useUpdateOrderStatus();

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.shipping_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (order.user && order.user.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, statusFilter]);

  const stats = useMemo(
    () => ({
      total: orders.length,
      pending: orders.filter((o) => o.status === 'pending').length,
      revenue: orders.reduce((sum, o) => sum + Number(o.total || 0), 0),
    }),
    [orders]
  );

  const handleStatusChange = (orderId: string, newStatus: string) => {
    updateOrderStatus.mutate(
      { orderId, status: newStatus as any },
      {
        onSuccess: () => toast.success(`Order ${orderId.slice(0, 8)} marked as ${newStatus}`),
        onError: () => toast.error('Failed to update order status'),
      }
    );
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 space-y-8 duration-700">
      <OrderHeader />
      <OrderStats {...stats} />
      <OrderFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        onRefresh={() => refetch()}
      />
      <OrdersTable
        orders={filteredOrders}
        isLoading={isLoading}
        onStatusChange={handleStatusChange}
        onClearFilters={() => {
          setSearchTerm('');
          setStatusFilter('all');
        }}
      />
    </div>
  );
}
