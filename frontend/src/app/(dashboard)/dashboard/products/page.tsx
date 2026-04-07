'use client';

/**
 * Product Catalog Management Page
 * Refactored: Header, Filters, Table, Pagination, BulkActions extracted
 * Status: Refactored to < 110 lines
 */
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { ProductFilters } from '@/components/dashboard/ProductFilters';
import { ProductHeader } from '@/components/dashboard/ProductHeader';
import { ProductPagination } from '@/components/dashboard/ProductPagination';
import { ProductBulkActions } from '@/components/dashboard/products/ProductBulkActions';
import { ProductTable } from '@/components/dashboard/ProductTable';
import {
  useCategories,
  useDeleteProduct,
  useDuplicateProduct,
  useProductsPaginated,
} from '@/hooks/products-hooks';

export default function ProductsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '');

  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const perPage = parseInt(searchParams.get('per_page') || '20', 10);
  const categoryFilter = searchParams.get('category') || 'all';
  const search = searchParams.get('search') || '';

  const { data: paginatedData, isLoading } = useProductsPaginated({
    page: currentPage,
    per_page: perPage,
    category: categoryFilter === 'all' ? undefined : categoryFilter,
    search: search || undefined,
  });

  const { data: categories = [] } = useCategories();
  const products = paginatedData?.results || [];
  const totalPages = paginatedData?.totalPages || 1;
  const totalCount = paginatedData?.count || 0;

  const deleteProduct = useDeleteProduct();
  const duplicateProduct = useDuplicateProduct();

  const updateParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([k, v]) =>
      !v || v === 'all' ? params.delete(k) : params.set(k, v)
    );
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 space-y-8 duration-700">
      <ProductHeader />
      <ProductFilters
        searchInput={searchInput}
        onSearchInputChange={setSearchInput}
        onSearchSubmit={(e) => {
          e.preventDefault();
          updateParams({ search: searchInput, page: '1' });
        }}
        categoryFilter={categoryFilter}
        onCategoryFilterChange={(v) => updateParams({ category: v, page: '1' })}
        categories={categories}
      />

      <ProductBulkActions
        selectedIds={selectedIds}
        totalDisplayed={products.length}
        onClearSelection={() => setSelectedIds([])}
      />

      <div className="border-border bg-card overflow-hidden rounded-[2.5rem] border shadow-sm">
        <ProductTable
          products={products}
          isLoading={isLoading}
          selectedIds={selectedIds}
          onSelectRow={(id, chk) =>
            setSelectedIds((p) => (chk ? [...p, id] : p.filter((x) => x !== id)))
          }
          onSelectAll={(chk) => setSelectedIds(chk ? products.map((p) => p.id) : [])}
          isAllSelected={products.length > 0 && selectedIds.length === products.length}
          onDelete={(s) =>
            confirm('Delete permanently?') &&
            deleteProduct.mutate(s, { onSuccess: () => toast.success('Product deleted') })
          }
          onDuplicate={(s) =>
            duplicateProduct.mutate(s, { onSuccess: () => toast.success('Product duplicated') })
          }
        />
        <ProductPagination
          currentPage={currentPage}
          perPage={perPage}
          totalCount={totalCount}
          totalPages={totalPages}
          onPageChange={(p) => {
            if (p >= 1 && p <= totalPages) {
              updateParams({ page: String(p) });
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setSelectedIds([]);
            }
          }}
        />
      </div>
    </div>
  );
}
