'use client';

import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { cn } from '@/lib/utils';

interface SidebarNavItemProps {
  icon: LucideIcon;
  label: string;
  path: string;
  isActive: boolean;
  collapsed?: boolean;
}

export const SidebarNavItem: React.FC<SidebarNavItemProps> = ({
  icon: Icon,
  label,
  path,
  isActive,
  collapsed = false,
}) => {
  if (collapsed) {
    return (
      <Link
        href={path}
        className={cn(
          'flex items-center justify-center rounded-xl p-3 transition-all',
          isActive
            ? 'bg-brand-primary shadow-brand-primary/20 text-brand-light shadow-lg'
            : 'text-brand-light/40 hover:bg-brand-light/5 hover:text-brand-light'
        )}
        title={label}
      >
        <Icon className="h-5 w-5" />
      </Link>
    );
  }

  return (
    <Link
      href={path}
      className={cn(
        'flex w-full items-center space-x-3 rounded-xl px-4 py-3 transition-all',
        isActive
          ? 'bg-brand-primary shadow-brand-primary/20 text-brand-light shadow-lg'
          : 'text-brand-light/40 hover:bg-brand-light/5 hover:text-brand-light'
      )}
    >
      <Icon className="h-5 w-5" />
      <span className="font-bold">{label}</span>
    </Link>
  );
};
