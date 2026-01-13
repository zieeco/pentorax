/**
 * useProductsPage - Custom hook for products page logic
 * Handles URL params, data fetching, and CRUD operations
 */
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useBulkActivateProducts, useBulkDeactivateProducts, useBulkDeleteProducts, useCategories, useDeleteProduct, useDuplicateProduct, useProductsPaginated } from './products.hooks';
import { toast } from 'sonner';

const DEFAULT_PAGE_SIZE = 20;

export function useProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '');

  // Get params from URL
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const perPage = parseInt(searchParams.get('per_page') || String(DEFAULT_PAGE_SIZE), 10);
  const search = searchParams.get('search') || '';
  const categoryFilter = searchParams.get('category') || '';

  // Fetch data
  const { data: paginatedData, isLoading, refetch } = useProductsPaginated({ 
    search: search || undefined, 
    category: categoryFilter || undefined,
    page: currentPage,
    per_page: perPage,
  });
  
  const products = paginatedData?.results || [];
  const totalCount = paginatedData?.count || 0;
  const totalPages = paginatedData?.totalPages || 1;
  const hasNext = paginatedData?.hasNext || false;
  const hasPrevious = paginatedData?.hasPrevious || false;
  
  const { data: categories = [] } = useCategories();
  
  // Mutations
  const deleteProduct = useDeleteProduct();
  const duplicateProduct = useDuplicateProduct();
  const bulkDelete = useBulkDeleteProducts();
  const bulkActivate = useBulkActivateProducts();
  const bulkDeactivate = useBulkDeactivateProducts();

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
  const handleSelectRow = (productId: string, checked: boolean) => {
    setSelectedIds(prev => 
      checked 
        ? [...prev, productId]
        : prev.filter(id => id !== productId)
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? products.map((p: any) => p.id) : []);
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
  const handleCategoryChange = (category: string) => {
    updateParams({ 
      category: category === 'all' ? null : category,
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

  // CRUD handlers
  const handleDelete = async (slug: string) => {
    deleteProduct.mutate(slug, {
      onSuccess: () => {
        toast.success('Product deleted successfully');
        refetch();
      },
      onError: () => {
        toast.error('Failed to delete product');
      },
    });
  };

  const handleDuplicate = (slug: string) => {
    duplicateProduct.mutate(slug, {
      onSuccess: () => {
        toast.success('Product duplicated successfully');
        refetch();
      },
      onError: () => {
        toast.error('Failed to duplicate product');
      },
    });
  };

  const handleBulkDelete = async (ids: string[]) => {
    try {
      await bulkDelete.mutateAsync(ids);
      toast.success(`Deleted ${ids.length} product${ids.length > 1 ? 's' : ''}`);
      setSelectedIds([]);
      refetch();
    } catch (error) {
      toast.error('Failed to delete products');
    }
  };

  const handleBulkActivate = async (ids: string[]) => {
    try {
      await bulkActivate.mutateAsync(ids);
      toast.success(`Activated ${ids.length} product${ids.length > 1 ? 's' : ''}`);
      setSelectedIds([]);
      refetch();
    } catch (error) {
      toast.error('Failed to activate products');
    }
  };

  const handleBulkDeactivate = async (ids: string[]) => {
    try {
      await bulkDeactivate.mutateAsync(ids);
      toast.success(`Deactivated ${ids.length} product${ids.length > 1 ? 's' : ''}`);
      setSelectedIds([]);
      refetch();
    } catch (error) {
      toast.error('Failed to deactivate products');
    }
  };

  const isAllSelected = products.length > 0 && selectedIds.length === products.length;
  const isSomeSelected = selectedIds.length > 0 && !isAllSelected;

  return {
    products,
    isLoading,
    totalCount,
    totalPages,
    currentPage,
    perPage,
    hasNext,
    hasPrevious,
    searchInput,
    categoryFilter,
    selectedIds,
    categories,
    handleSearch,
    handleSearchInputChange,
    handleCategoryChange,
    handlePageChange,
    handlePageSizeChange,
    handleSelectRow,
    handleSelectAll,
    handleClearSelection,
    handleDelete,
    handleDuplicate,
    handleBulkDelete,
    handleBulkActivate,
    handleBulkDeactivate,
    isAllSelected,
    isSomeSelected,
  };
}
