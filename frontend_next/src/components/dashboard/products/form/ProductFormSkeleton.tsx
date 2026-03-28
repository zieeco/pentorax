/**
 * ProductFormSkeleton - Loading skeleton for product form
 * Ported from Vite to Next.js
 */
import { Skeleton } from '@/components/ui/skeleton';

export function ProductFormSkeleton() {
  return (
    <div className="animate-in fade-in mx-auto max-w-6xl space-y-8 duration-500">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-3">
          <Skeleton className="h-10 w-48 rounded-xl" />
          <Skeleton className="h-4 w-64 rounded-lg" />
        </div>
        <Skeleton className="h-14 w-40 rounded-2xl shadow-sm" />
      </div>

      {/* Three Column Grid Skeleton */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-[320px_1fr_320px] xl:grid-cols-[380px_1fr_380px]">
        {/* Left Column - Inventory & Actions */}
        <div className="space-y-6">
          <Skeleton className="h-72 w-full rounded-[2rem]" />
          <Skeleton className="h-16 w-full rounded-2xl" />
          <Skeleton className="h-16 w-full rounded-2xl" />
          <Skeleton className="bg-destructive/5 h-16 w-full rounded-2xl" />
        </div>

        {/* Middle Column - Basic Info & Pricing */}
        <div className="space-y-6">
          <Skeleton className="h-[28rem] w-full rounded-[2rem]" />
          <Skeleton className="h-48 w-full rounded-[2rem]" />
        </div>

        {/* Right Column - Categorization & Visuals */}
        <div className="space-y-6">
          <Skeleton className="h-48 w-full rounded-[2rem]" />
          <Skeleton className="h-[24rem] w-full rounded-[2rem]" />
        </div>
      </div>
    </div>
  );
}
