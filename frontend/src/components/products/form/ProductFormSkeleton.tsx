/**
 * ProductFormSkeleton - Loading skeleton for product form
 */
import { Skeleton } from '@/components/ui/skeleton';

export function ProductFormSkeleton() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      {/* Three Column Grid Skeleton */}
      <div className="grid xl:grid-cols-[380px_1fr_380px] lg:grid-cols-[320px_1fr_320px] md:grid-cols-1 gap-4">
        {/* Left Column - Inventory */}
        <div className="space-y-4">
          <Skeleton className="h-64 w-full rounded-lg" />
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>

        {/* Middle Column - Basic Info & Pricing */}
        <div className="space-y-4">
          <Skeleton className="h-96 w-full rounded-lg" />
          <Skeleton className="h-48 w-full rounded-lg" />
        </div>

        {/* Right Column - Categorization & Visuals */}
        <div className="space-y-4">
          <Skeleton className="h-48 w-full rounded-lg" />
          <Skeleton className="h-96 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}
