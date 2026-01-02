/**
 * ProductsPagination - Pagination controls with page size selector
 */
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

interface ProductsPaginationProps {
  currentPage: number;
  totalPages: number;
  perPage: number;
  totalCount: number;
  hasNext: boolean;
  hasPrevious: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: string) => void;
}

export function ProductsPagination({
  currentPage,
  totalPages,
  perPage,
  totalCount,
  hasNext,
  hasPrevious,
  onPageChange,
  onPageSizeChange,
}: ProductsPaginationProps) {
  if (totalCount === 0) return null;

  const showingFrom = ((currentPage - 1) * perPage) + 1;
  const showingTo = Math.min(currentPage * perPage, totalCount);

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
      {/* Items per page selector */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500">Items per page:</span>
        <Select 
          value={String(perPage)} 
          onValueChange={onPageSizeChange}
        >
          <SelectTrigger className="w-[80px] h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PAGE_SIZE_OPTIONS.map((size) => (
              <SelectItem key={size} value={String(size)}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-sm text-gray-500">
          Showing {showingFrom} - {showingTo} of {totalCount}
        </span>
      </div>

      {/* Page navigation */}
      {totalPages > 1 && (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={!hasPrevious}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          
          <div className="flex items-center gap-1">
            {/* First page */}
            {currentPage > 2 && (
              <Button
                variant={currentPage === 1 ? "secondary" : "ghost"}
                size="sm"
                onClick={() => onPageChange(1)}
                className="w-8 h-8 p-0"
              >
                1
              </Button>
            )}
            
            {/* Ellipsis before */}
            {currentPage > 3 && (
              <span className="px-2 text-gray-400">...</span>
            )}
            
            {/* Previous page */}
            {currentPage > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onPageChange(currentPage - 1)}
                className="w-8 h-8 p-0"
              >
                {currentPage - 1}
              </Button>
            )}
            
            {/* Current page */}
            <Button
              variant="secondary"
              size="sm"
              className="w-8 h-8 p-0"
            >
              {currentPage}
            </Button>
            
            {/* Next page */}
            {currentPage < totalPages && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onPageChange(currentPage + 1)}
                className="w-8 h-8 p-0"
              >
                {currentPage + 1}
              </Button>
            )}
            
            {/* Ellipsis after */}
            {currentPage < totalPages - 2 && (
              <span className="px-2 text-gray-400">...</span>
            )}
            
            {/* Last page */}
            {currentPage < totalPages - 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onPageChange(totalPages)}
                className="w-8 h-8 p-0"
              >
                {totalPages}
              </Button>
            )}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={!hasNext}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
}