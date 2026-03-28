'use client';

import { Bell, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NotificationHeaderProps {
  onRefresh: () => void;
  isRefetching?: boolean;
}

export function NotificationHeader({ onRefresh, isRefetching }: NotificationHeaderProps) {
  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="flex items-center gap-4 text-4xl font-black tracking-tight text-gray-900">
          <div className="bg-primary/10 rounded-2xl p-3">
            <Bell className="text-primary h-8 w-8" />
          </div>
          Stock Alerts
        </h1>
        <p className="mt-2 ml-1 font-medium text-gray-500">
          Monitor and manage restock notification requests
        </p>
      </div>
      <Button
        variant="outline"
        onClick={onRefresh}
        disabled={isRefetching}
        className="h-12 gap-2 rounded-xl border-gray-100 bg-white px-6 font-bold shadow-sm hover:bg-gray-50"
      >
        <RefreshCw className={`h-4 w-4 ${isRefetching ? 'animate-spin' : ''}`} />
        Update Data
      </Button>
    </div>
  );
}
