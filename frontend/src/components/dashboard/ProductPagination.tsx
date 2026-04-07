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
    <div className="border-border/50 bg-muted/10 flex items-center justify-between border-t p-6">
      <p className="text-muted-foreground text-xs font-bold">
        Showing <span className="text-foreground">{(currentPage - 1) * perPage + 1}</span> to{' '}
        <span className="text-foreground">{Math.min(currentPage * perPage, totalCount)}</span> of{' '}
        <span className="text-foreground">{totalCount}</span> results
      </p>
      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => onPageChange(currentPage - 1)}
              className={`border-border bg-card cursor-pointer rounded-xl font-bold ${currentPage === 1 && 'pointer-events-none opacity-50'}`}
            />
          </PaginationItem>

          {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
            const pageNum = i + 1;
            return (
              <PaginationItem key={pageNum} className="hidden sm:block">
                <PaginationLink
                  isActive={currentPage === pageNum}
                  onClick={() => onPageChange(pageNum)}
                  className={`cursor-pointer rounded-xl font-black ${currentPage === pageNum ? 'bg-primary text-primary-foreground' : 'border-border bg-card text-foreground'}`}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext
              onClick={() => onPageChange(currentPage + 1)}
              className={`border-border bg-card cursor-pointer rounded-xl font-bold ${currentPage === totalPages && 'pointer-events-none opacity-50'}`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
