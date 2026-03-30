/**
 * NotificationsPage - Admin dashboard for managing stock notifications
 */
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {Bell, Mail, Archive, ArchiveRestore, CheckCircle, Circle} from 'lucide-react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { BulkActionsToolbar, type BulkAction } from '@/components/ui/bulk-actions-toolbar';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SendEmailDialog } from '@/components/dashboard/SendEmailDialog';
import { useNotificationsPage } from '@/hooks/useNotificationsPage';
import { useSendCustomEmail, useBulkSendEmail } from '@/hooks';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';

// Pagination component
import { ProductsPagination } from '@/components/products/ProductsPagination';

export default function NotificationsPage() {
  const {
    notifications,
    stats,
    isLoading,
    totalCount,
    totalPages,
    currentPage,
    perPage,
    hasNext,
    hasPrevious,
    searchInput,
    filter,
    selectedIds,
    handleSearch,
    handleSearchInputChange,
    handleFilterChange,
    handlePageChange,
    handlePageSizeChange,
    handleSelectRow,
    handleSelectAll,
    handleClearSelection,
    handleMarkRead,
    handleMarkUnread,
    handleArchive,
    handleUnarchive,
    isAllSelected,
    isSomeSelected,
  } = useNotificationsPage();

  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [currentEmailId, setCurrentEmailId] = useState<string | null>(null);

  const sendCustomEmail = useSendCustomEmail();
  const bulkSendEmail = useBulkSendEmail();

  const handleSendEmail = (subject: string, message: string, useAI: boolean = false) => {
    if (currentEmailId) {
      // Single email
      sendCustomEmail.mutate(
        { id: currentEmailId, subject, message },
        {
          onSuccess: () => {
            setEmailDialogOpen(false);
            setCurrentEmailId(null);
          },
        }
      );
    } else {
      // Bulk email - with optional AI personalization
      bulkSendEmail.mutate(
        { 
          ids: selectedIds, 
          subject: useAI ? '' : subject, 
          message: useAI ? '' : message,
          use_ai: useAI 
        } as any,
        {
          onSuccess: () => {
            setEmailDialogOpen(false);
            handleClearSelection();
          },
        }
      );
    }
  };

  const bulkActions: BulkAction[] = [
    {
      id: 'email',
      label: 'Send Email',
      icon: Mail,
      variant: 'default',
      onClick: () => {
        setCurrentEmailId(null);
        setEmailDialogOpen(true);
      },
    },
    {
      id: 'archive',
      label: 'Archive',
      icon: Archive,
      variant: 'secondary',
      onClick: (ids) => ids.forEach(handleArchive),
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3">
            <Bell className="h-8 w-8 text-primary" />
            Stock Alerts
          </h1>
          <p className="text-gray-500 mt-1">Manage stock notification subscriptions</p>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <StatsCard label="Total" value={stats.total} />
          <StatsCard label="Unread" value={stats.unread} variant="warning" />
          <StatsCard label="Pending Restock" value={stats.pending_restock} variant="info" />
          <StatsCard label="Notified" value={stats.notified} variant="success" />
          <StatsCard label="Archived" value={stats.archived} variant="secondary" />
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Tabs value={filter} onValueChange={handleFilterChange} className="w-full sm:w-auto">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="read">Read</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>
        </Tabs>

        <form onSubmit={handleSearch} className="flex-1 max-w-md">
          <Input
            placeholder="Search by product or email..."
            value={searchInput}
            onChange={(e) => handleSearchInputChange(e.target.value)}
          />
        </form>
      </div>

      {/* Bulk Actions Toolbar */}
      <BulkActionsToolbar
        selectedCount={selectedIds.length}
        totalCount={notifications.length}
        onClearSelection={handleClearSelection}
        actions={bulkActions}
        selectedIds={selectedIds}
        resourceName="notification"
      />

      {/* Table */}
      {notifications.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
          <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No notifications found</p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50/50">
                  <TableHead className="w-12">
                    <Checkbox
                      checked={isAllSelected || (isSomeSelected && 'indeterminate')}
                      onCheckedChange={handleSelectAll}
                      aria-label="Select all"
                    />
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Subscribed</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {notifications.map((notification: any) => (
                  <TableRow key={notification.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedIds.includes(notification.id)}
                        onCheckedChange={(checked) => handleSelectRow(notification.id, !!checked)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {!notification.is_read && (
                          <Badge variant="default" className="text-xs">New</Badge>
                        )}
                        {notification.is_notified && (
                          <Badge variant="secondary" className="text-xs">Notified</Badge>
                        )}
                        {notification.is_archived && (
                          <Badge variant="outline" className="text-xs">Archived</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {notification.product_image && (
                          <img
                            src={notification.product_image}
                            alt={notification.product_name}
                            className="h-10 w-10 rounded object-cover"
                          />
                        )}
                        <span className="font-medium">{notification.product_name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {notification.email}
                    </TableCell>
                    <TableCell>
                      {notification.product_in_stock ? (
                        <Badge variant="default" className="bg-green-600">In Stock</Badge>
                      ) : (
                        <Badge variant="secondary">Out of Stock</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {format(new Date(notification.created_at), 'MMM d, yyyy')}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {!notification.is_read ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleMarkRead(notification.id)}
                            title="Mark as read"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleMarkUnread(notification.id)}
                            title="Mark as unread"
                          >
                            <Circle className="h-4 w-4" />
                          </Button>
                        )}

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setCurrentEmailId(notification.id);
                            setEmailDialogOpen(true);
                          }}
                          title="Send email"
                        >
                          <Mail className="h-4 w-4" />
                        </Button>

                        {!notification.is_archived ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleArchive(notification.id)}
                            title="Archive"
                          >
                            <Archive className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleUnarchive(notification.id)}
                            title="Unarchive"
                          >
                            <ArchiveRestore className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <ProductsPagination
            currentPage={currentPage}
            totalPages={totalPages}
            perPage={perPage}
            totalCount={totalCount}
            hasNext={hasNext}
            hasPrevious={hasPrevious}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </>
      )}

      {/* Send Email Dialog */}
      <SendEmailDialog
        open={emailDialogOpen}
        onOpenChange={setEmailDialogOpen}
        onSend={handleSendEmail}
        recipientCount={currentEmailId ? 1 : selectedIds.length}
        isLoading={sendCustomEmail.isPending || bulkSendEmail.isPending}
        notificationId={currentEmailId}
        notificationIds={selectedIds}
      />
    </div>
  );
}

// Stats Card Component
interface StatsCardProps {
  label: string;
  value: number;
  variant?: 'default' | 'warning' | 'info' | 'success' | 'secondary';
}

function StatsCard({ label, value, variant = 'default' }: StatsCardProps) {
  const colors = {
    default: 'bg-gray-50 border-gray-200',
    warning: 'bg-yellow-50 border-yellow-200',
    info: 'bg-blue-50 border-blue-200',
    success: 'bg-green-50 border-green-200',
    secondary: 'bg-purple-50 border-purple-200',
  };

  return (
    <div className={`rounded-xl border p-4 ${colors[variant]}`}>
      <p className="text-sm font-medium text-gray-600">{label}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}
