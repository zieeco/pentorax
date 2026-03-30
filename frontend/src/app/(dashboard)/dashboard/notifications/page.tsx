'use client';

import { Archive, Bell, Mail } from 'lucide-react';
import { useState } from 'react';
import { DashboardPagination } from '@/components/dashboard/DashboardPagination';
import { NotificationFilters } from '@/components/dashboard/notifications/NotificationFilters';
import { NotificationHeader } from '@/components/dashboard/notifications/NotificationHeader';
import { NotificationStats } from '@/components/dashboard/notifications/NotificationStats';
import { NotificationTable } from '@/components/dashboard/notifications/NotificationTable';
import { SendEmailDialog } from '@/components/dashboard/SendEmailDialog';
import { BulkActionsToolbar } from '@/components/ui/bulk-actions-toolbar';
import { Skeleton } from '@/components/ui/skeleton';
import { useBulkSendEmail, useSendCustomEmail } from '@/hooks/stock-notifications-admin-hooks';
import { useNotificationsPage } from '@/hooks/use-notifications-page';

export default function StockNotificationsPage() {
  const page = useNotificationsPage();
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [currentEmailId, setCurrentEmailId] = useState<string | null>(null);

  const sendCustomEmail = useSendCustomEmail();
  const bulkSendEmail = useBulkSendEmail();

  const handleSendEmail = (subject: string, message: string, useAI: boolean = false) => {
    if (currentEmailId) {
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
      bulkSendEmail.mutate(
        { ids: page.selectedIds, subject, message, use_ai: useAI },
        {
          onSuccess: () => {
            setEmailDialogOpen(false);
            page.setSelectedIds([]);
          },
        }
      );
    }
  };

  const bulkActions = [
    {
      id: 'email',
      label: 'Broadcast',
      icon: Mail,
      variant: 'default' as const,
      onClick: () => {
        setCurrentEmailId(null);
        setEmailDialogOpen(true);
      },
    },
    {
      id: 'archive',
      label: 'Archive Search',
      icon: Archive,
      variant: 'secondary' as const,
      onClick: (ids: string[]) => ids.forEach(page.handleArchive),
    },
  ];

  if (page.isLoading && page.notifications.length === 0) {
    return (
      <div className="animate-pulse space-y-10">
        <Skeleton className="h-12 w-1/3 rounded-2xl" />
        <Skeleton className="h-40 w-full rounded-[2rem]" />
        <Skeleton className="h-96 w-full rounded-[2.5rem]" />
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-8 duration-1000">
      <NotificationHeader
        onRefresh={() => page.handlePageChange(1)}
        isRefetching={page.isLoading}
      />
      <NotificationStats stats={page.stats} />
      <NotificationFilters
        filter={page.filter}
        onFilterChange={page.handleFilterChange}
        searchInput={page.searchInput}
        onSearchChange={page.handleSearchInputChange}
        onSearch={page.handleSearch}
      />

      <BulkActionsToolbar
        selectedCount={page.selectedIds.length}
        totalCount={page.notifications.length}
        onClearSelection={() => page.setSelectedIds([])}
        actions={bulkActions}
        selectedIds={page.selectedIds}
        resourceName="notification"
      />

      {page.notifications.length === 0 ? (
        <div className="border-border bg-card rounded-[2.5rem] border p-24 text-center shadow-sm">
          <div className="bg-muted/20 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full">
            <Bell className="text-muted-foreground/30 h-10 w-10" />
          </div>
          <p className="text-foreground text-xl font-black">Quiet for now</p>
          <p className="text-muted-foreground font-medium">
            No stock alerts found matching your criteria
          </p>
        </div>
      ) : (
        <>
          <NotificationTable
            notifications={page.notifications}
            selectedIds={page.selectedIds}
            onSelectRow={(id, checked) =>
              page.setSelectedIds((prev) =>
                checked ? [...prev, id] : prev.filter((i) => i !== id)
              )
            }
            onSelectAll={(checked) =>
              page.setSelectedIds(checked ? page.notifications.map((n: any) => n.id) : [])
            }
            isAllSelected={page.isAllSelected}
            isSomeSelected={page.isSomeSelected}
            onMarkRead={page.handleMarkRead}
            onMarkUnread={page.handleMarkUnread}
            onArchive={page.handleArchive}
            onUnarchive={page.handleUnarchive}
            onOpenEmail={(id) => {
              setCurrentEmailId(id);
              setEmailDialogOpen(true);
            }}
          />
          <div className="mt-8 flex justify-center">
            <DashboardPagination
              currentPage={page.currentPage}
              totalPages={page.totalPages}
              onPageChange={page.handlePageChange}
            />
          </div>
        </>
      )}

      <SendEmailDialog
        open={emailDialogOpen}
        onOpenChange={setEmailDialogOpen}
        onSend={handleSendEmail}
        recipientCount={currentEmailId ? 1 : page.selectedIds.length}
        isLoading={sendCustomEmail.isPending || bulkSendEmail.isPending}
        notificationId={currentEmailId}
        notificationIds={page.selectedIds}
      />
    </div>
  );
}
