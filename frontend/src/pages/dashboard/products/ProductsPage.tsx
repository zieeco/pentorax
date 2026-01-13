/**
 * ProductsPage - Main component
 * Orchestrates product management functionality
 */
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus, Package, Loader2 } from 'lucide-react';
import { ProductsTable } from '@/components/products/ProductsTable';
import { ProductTableSkeleton } from '@/components/products/ProductTableSkeleton';
import { ProductsFilters } from '@/components/products/ProductsFilters';
import { ProductsPagination } from '@/components/products/ProductsPagination';
import { useProductsPage } from '@/hooks/useProductsPage';

export default function ProductsPage() {
  const {
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
  } = useProductsPage();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3">
            <Package className="h-8 w-8 text-primary" />
            Products
          </h1>
          <p className="text-gray-500 mt-1">Manage your product catalog</p>
        </div>
        <Button asChild>
          <Link to="/dashboard/products/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <ProductsFilters
        searchInput={searchInput}
        categoryFilter={categoryFilter}
        categories={categories}
        onSearchInputChange={handleSearchInputChange}
        onSearch={handleSearch}
        onCategoryChange={handleCategoryChange}
      />

      {/* Loading State */}
      {isLoading ? (
        <ProductTableSkeleton />
      ) : products.length === 0 ? (
        /* Empty State */
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="text-center py-20">
            <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">No products found</p>
            <Button asChild>
              <Link to="/dashboard/products/new">
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Product
              </Link>
            </Button>
          </div>
        </div>
      ) : (
        <>
          {/* Products Table */}
          <ProductsTable
            products={products}
            selectedIds={selectedIds}
            isAllSelected={isAllSelected}
            isSomeSelected={isSomeSelected}
            onSelectRow={handleSelectRow}
            onSelectAll={handleSelectAll}
            onClearSelection={handleClearSelection}
            onDelete={handleDelete}
            onDuplicate={handleDuplicate}
            onBulkDelete={handleBulkDelete}
            onBulkActivate={handleBulkActivate}
            onBulkDeactivate={handleBulkDeactivate}
          />

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
    </div>
  );
}
