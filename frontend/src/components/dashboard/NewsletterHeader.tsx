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
        <h1 className="text-foreground flex items-center gap-3 text-3xl font-black tracking-tight">
          <Mail className="text-primary h-8 w-8" />
          Newsletter Analytics
        </h1>
        <p className="text-muted-foreground mt-1 font-medium">
          Manage audience growth and engagement metrics.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          onClick={onExport}
          className="border-border bg-card gap-2 rounded-xl font-bold shadow-sm"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
        <Button
          variant="ghost"
          onClick={onRefresh}
          disabled={isRefetching}
          className="text-muted-foreground gap-2 rounded-xl font-bold"
        >
          <RefreshCw className={`h-4 w-4 ${isRefetching ? 'animate-spin' : ''}`} />
          Sync
        </Button>
      </div>
    </div>
  );
}
