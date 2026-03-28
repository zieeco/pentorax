'use client';

/**
 * ProductPagination — Catalog pagination controls with info text
 * Extracted from products/page.tsx for 150-line rule compliance
 */
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface ProductPaginationProps {
  currentPage: number;
  perPage: number;
  totalCount: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function ProductPagination({
  currentPage,
  perPage,
  totalCount,
  totalPages,
  onPageChange,
}: ProductPaginationProps) {
  return (
    <div className="flex items-center justify-between border-t border-gray-50 bg-gray-50/30 p-6">
      <p className="text-xs font-bold text-gray-400">
        Showing <span className="text-gray-900">{(currentPage - 1) * perPage + 1}</span> to{' '}
        <span className="text-gray-900">{Math.min(currentPage * perPage, totalCount)}</span> of{' '}
        <span className="text-gray-900">{totalCount}</span> results
      </p>
      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => onPageChange(currentPage - 1)}
              className={`cursor-pointer rounded-xl border-gray-100 bg-white font-bold ${currentPage === 1 && 'pointer-events-none opacity-50'}`}
            />
          </PaginationItem>

          {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
            const pageNum = i + 1;
            return (
              <PaginationItem key={pageNum} className="hidden sm:block">
                <PaginationLink
                  isActive={currentPage === pageNum}
                  onClick={() => onPageChange(pageNum)}
                  className={`cursor-pointer rounded-xl font-black ${currentPage === pageNum ? 'bg-primary text-white' : 'border-gray-100 bg-white'}`}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext
              onClick={() => onPageChange(currentPage + 1)}
              className={`cursor-pointer rounded-xl border-gray-100 bg-white font-bold ${currentPage === totalPages && 'pointer-events-none opacity-50'}`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
