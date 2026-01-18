/**
 * Admin Orders Management Page (Refactored)
 */
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ordersApi } from '@/services';
import { useUpdateOrderStatus } from '@/hooks';
import { normalizeListResponse } from '@/hooks/api.utils';
import { ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';
import OrderStatsCards from '@/components/orders/OrderStatsCards';
import OrderFilters from '@/components/orders/OrderFilters';
import OrdersTable from '@/components/orders/OrdersTable';

interface Order {
  id: string;
  email: string;
  total: number;
  status: string;
  created_at: string;
  shipping_name: string;
}

export default function OrdersAdminPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const updateOrderStatus = useUpdateOrderStatus();

  // Fetch all orders (admin view)
  const { data: orders = [], isLoading, error, refetch } = useQuery<Order[]>({
    queryKey: ['admin-orders', statusFilter, searchTerm],
    queryFn: async () => {
      const response = await ordersApi.list();
      // Normalize the response
      let allOrders = Array.isArray(response.data) 
        ? response.data 
        : normalizeListResponse<Order>(response.data);

      // Filter by status
      if (statusFilter !== 'all') {
        allOrders = allOrders.filter((o: Order) => o.status === statusFilter);
      }

      // Filter by search term
      if (searchTerm) {
        allOrders = allOrders.filter((o: Order) => 
          o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          o.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          o.shipping_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      return allOrders;
    },
  });

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatus.mutateAsync({ orderId, status: newStatus });
      toast.success('Order Status Updated');
      refetch();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  // Ensure orders is always an array
  const ordersList = Array.isArray(orders) ? orders : [];

  // Calculate stats
  const stats = {
    total: ordersList.length,
    pending: ordersList.filter(o => o.status === 'pending').length,
    processing: ordersList.filter(o => o.status === 'processing').length,
    delivered: ordersList.filter(o => o.status === 'delivered').length,
    revenue: ordersList.reduce((sum, o) => sum + Number(o.total), 0),
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center mb-2">
          <ShoppingBag className="h-8 w-8 text-primary mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
        </div>
        <p className="text-gray-600">Manage customer orders and update statuses</p>
      </div>

      {/* Stats Cards */}
      <OrderStatsCards stats={stats} />

      {/* Filters */}
      <OrderFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      {/* Orders Table */}
      <OrdersTable
        orders={ordersList}
        isLoading={isLoading}
        error={error}
        searchTerm={searchTerm}
        onStatusChange={handleStatusChange}
        isUpdating={updateOrderStatus.isPending}
      />
    </div>
  );
}
