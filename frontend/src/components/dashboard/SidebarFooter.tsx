'use client';

import { LogOut, Settings } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarFooterProps {
  collapsed: boolean;
  isActive: (path: string) => boolean;
  onSignOut: () => void;
}

export const SidebarFooter: React.FC<SidebarFooterProps> = ({ collapsed, isActive, onSignOut }) => {
  if (collapsed) {
    return (
      <div className="mt-auto space-y-2 p-2">
        <Link
          href="/dashboard/settings"
          className={cn(
            'flex items-center justify-center rounded-xl p-3 transition-all',
            isActive('/dashboard/settings')
              ? 'bg-brand-primary shadow-brand-primary/20 text-brand-light shadow-lg'
              : 'text-brand-light/40 hover:bg-brand-light/5 hover:text-brand-light'
          )}
          title="Settings"
        >
          <Settings className="h-5 w-5" />
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={onSignOut}
          className="text-destructive hover:bg-destructive/10 hover:text-destructive w-full"
          title="Sign Out"
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-auto space-y-2 p-4 pb-8">
      <Link
        href="/dashboard/settings"
        className={cn(
          'flex w-full items-center space-x-3 rounded-xl px-4 py-3 transition-all',
          isActive('/dashboard/settings')
            ? 'bg-brand-primary shadow-brand-primary/20 text-brand-light shadow-lg'
            : 'text-brand-light/40 hover:bg-brand-light/5 hover:text-brand-light'
        )}
      >
        <Settings className="h-5 w-5" />
        <span className="font-bold">Settings</span>
      </Link>
      <Button
        variant="ghost"
        onClick={onSignOut}
        className="group text-destructive hover:bg-destructive/10 hover:text-destructive flex w-full items-center justify-start space-x-3 rounded-xl px-4 py-3"
      >
        <LogOut className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
        <span className="font-bold">Sign Out</span>
      </Button>
    </div>
  );
};
