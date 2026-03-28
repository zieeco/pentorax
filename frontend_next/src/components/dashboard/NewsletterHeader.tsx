'use client';

/**
 * NewsletterHeader — Dashboard header for newsletter with export and sync
 * Extracted from newsletter/page.tsx for 150-line rule compliance
 */
import { Download, Mail, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NewsletterHeaderProps {
  onExport: () => void;
  onRefresh: () => void;
  isRefetching: boolean;
}

export function NewsletterHeader({ onExport, onRefresh, isRefetching }: NewsletterHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="flex items-center gap-3 text-3xl font-black tracking-tight text-gray-900">
          <Mail className="text-primary h-8 w-8" />
          Newsletter Analytics
        </h1>
        <p className="mt-1 font-medium text-gray-500">
          Manage audience growth and engagement metrics.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          onClick={onExport}
          className="gap-2 rounded-xl border-gray-100 bg-white font-bold shadow-sm"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
        <Button
          variant="ghost"
          onClick={onRefresh}
          disabled={isRefetching}
          className="gap-2 rounded-xl font-bold text-gray-400"
        >
          <RefreshCw className={`h-4 w-4 ${isRefetching ? 'animate-spin' : ''}`} />
          Sync
        </Button>
      </div>
    </div>
  );
}
