/**
 * ProductTableSkeleton - Loading skeleton for products table
 */
import { Skeleton } from '@/components/ui/skeleton';

export function ProductTableSkeleton() {
  return (
    <div className="space-y-4">
      {/* Table Header */}
      <div className="grid grid-cols-[auto_1fr_150px_120px_120px_120px_auto] gap-4 px-4 py-3 bg-gray-50 rounded-lg">
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-8" />
      </div>

      {/* Table Rows */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-[auto_1fr_150px_120px_120px_120px_auto] gap-4 px-4 py-4 bg-white border border-gray-100 rounded-lg items-center"
        >
          <Skeleton className="h-4 w-4" />
          <div className="flex items-center gap-3">
            <Skeleton className="h-12 w-12 rounded-md" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-6 w-16 rounded-md" />
          <div className="space-y-1">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-3 w-12" />
          </div>
          <Skeleton className="h-4 w-4" />
        </div>
      ))}
    </div>
  );
}
