/**
 * useNotificationsPage - Custom hook for notifications page logic
 * Handles URL params, data fetching, and CRUD operations
 */
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  useStockNotifications,
  useStockNotificationStats,
  useMarkReadNotification,
  useMarkUnreadNotification,
  useArchiveNotification,
  useUnarchiveNotification,
} from '@/hooks';
import { toast } from 'sonner';

const DEFAULT_PAGE_SIZE = 20;

export function useNotificationsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '');

  // Get params from URL
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const perPage = parseInt(searchParams.get('per_page') || String(DEFAULT_PAGE_SIZE), 10);
  const search = searchParams.get('search') || '';
  const filter = searchParams.get('filter') || 'all'; // all, unread, read, archived

  // Build query params based on filter
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
  } else if (filter === 'all') {
    queryParams.is_archived = false;
  }

  // Fetch data
  const { data: paginatedData, isLoading, refetch } = useStockNotifications(queryParams);
  const { data: stats } = useStockNotificationStats();

  const notifications = paginatedData?.data?.results || [];
  const totalCount = paginatedData?.data?.count || 0;
  const totalPages = Math.ceil(totalCount / perPage);
  const hasNext = currentPage < totalPages;
  const hasPrevious = currentPage > 1;

  // Mutations
  const markRead = useMarkReadNotification();
  const markUnread = useMarkUnreadNotification();
  const archive = useArchiveNotification();
  const unarchive = useUnarchiveNotification();

  // Update URL params helper
  const updateParams = (updates: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === '') {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });

    setSearchParams(newParams);
  };

  // Selection handlers
  const handleSelectRow = (notificationId: string, checked: boolean) => {
    setSelectedIds((prev) =>
      checked ? [...prev, notificationId] : prev.filter((id) => id !== notificationId)
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? notifications.map((n: any) => n.id) : []);
  };

  const handleClearSelection = () => setSelectedIds([]);

  // Pagination handlers
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      updateParams({ page: page === 1 ? null : String(page) });
      setSelectedIds([]);
    }
  };

  const handlePageSizeChange = (newSize: string) => {
    updateParams({
      per_page: newSize === String(DEFAULT_PAGE_SIZE) ? null : newSize,
      page: null,
    });
    setSelectedIds([]);
  };

  // Filter handlers
  const handleFilterChange = (newFilter: string) => {
    updateParams({
      filter: newFilter === 'all' ? null : newFilter,
      page: null,
    });
    setSelectedIds([]);
  };

  const handleSearchInputChange = (value: string) => {
    setSearchInput(value);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateParams({
      search: searchInput || null,
      page: null,
    });
  };

  // Action handlers
  const handleMarkRead = async (id: string) => {
    markRead.mutate(id, {
      onSuccess: () => refetch(),
    });
  };

  const handleMarkUnread = async (id: string) => {
    markUnread.mutate(id, {
      onSuccess: () => refetch(),
    });
  };

  const handleArchive = async (id: string) => {
    archive.mutate(id, {
      onSuccess: () => {
        refetch();
        setSelectedIds((prev) => prev.filter((selectedId) => selectedId !== id));
      },
    });
  };

  const handleUnarchive = async (id: string) => {
    unarchive.mutate(id, {
      onSuccess: () => refetch(),
    });
  };

  const isAllSelected = notifications.length > 0 && selectedIds.length === notifications.length;
  const isSomeSelected = selectedIds.length > 0 && !isAllSelected;

  return {
    notifications,
    stats: stats?.data,
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
    refetch,
    isAllSelected,
    isSomeSelected,
  };
}
