'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import {
  useArchiveNotification,
  useMarkReadNotification,
  useMarkUnreadNotification,
  useStockNotifications,
  useStockNotificationStats,
  useUnarchiveNotification,
} from '@/hooks/stock-notifications-admin-hooks';

const DEFAULT_PAGE_SIZE = 20;

export function useNotificationsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '');

  // Get params from URL
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const perPage = parseInt(searchParams.get('per_page') || String(DEFAULT_PAGE_SIZE), 10);
  const search = searchParams.get('search') || '';
  const filter = searchParams.get('filter') || 'all';

  // Build query params
  const queryParams: any = {
    page: currentPage,
    per_page: perPage,
    search: search || undefined,
  };

  if (filter === 'unread') {
    queryParams.is_read = false;
    queryParams.is_archived = false;
  } else if (filter === 'read') {
    queryParams.is_read = true;
    queryParams.is_archived = false;
  } else if (filter === 'archived') {
    queryParams.is_archived = true;
  } else {
    queryParams.is_archived = false;
  }

  const { data: paginatedData, isLoading, refetch } = useStockNotifications(queryParams);
  const { data: statsData } = useStockNotificationStats();

  const notifications = paginatedData?.data?.results || [];
  const totalCount = paginatedData?.data?.count || 0;
  const totalPages = Math.ceil(totalCount / perPage);

  const markRead = useMarkReadNotification();
  const markUnread = useMarkUnreadNotification();
  const archive = useArchiveNotification();
  const unarchive = useUnarchiveNotification();

  const updateParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (!value) params.delete(key);
      else params.set(key, value);
    });
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  return {
    notifications,
    stats: statsData?.data,
    isLoading: isLoading || isPending,
    totalCount,
    totalPages,
    currentPage,
    perPage,
    searchInput,
    filter,
    selectedIds,
    setSelectedIds,
    handleSearch: (e: React.FormEvent) => {
      e.preventDefault();
      updateParams({ search: searchInput || null, page: null });
    },
    handleSearchInputChange: setSearchInput,
    handleFilterChange: (val: string) => {
      updateParams({ filter: val === 'all' ? null : val, page: null });
      setSelectedIds([]);
    },
    handlePageChange: (page: number) => {
      updateParams({ page: page === 1 ? null : String(page) });
      setSelectedIds([]);
    },
    handlePageSizeChange: (size: string) => {
      updateParams({ per_page: size, page: null });
      setSelectedIds([]);
    },
    handleMarkRead: (id: string) => markRead.mutate(id, { onSuccess: () => refetch() }),
    handleMarkUnread: (id: string) => markUnread.mutate(id, { onSuccess: () => refetch() }),
    handleArchive: (id: string) =>
      archive.mutate(id, {
        onSuccess: () => {
          refetch();
          setSelectedIds((prev) => prev.filter((i) => i !== id));
        },
      }),
    handleUnarchive: (id: string) => unarchive.mutate(id, { onSuccess: () => refetch() }),
    isAllSelected: notifications.length > 0 && selectedIds.length === notifications.length,
    isSomeSelected: selectedIds.length > 0 && selectedIds.length < notifications.length,
  };
}
