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
            ? 'bg-primary shadow-primary/20 text-white shadow-lg'
            : 'text-gray-400 hover:bg-white/5 hover:text-white'
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
          ? 'bg-primary shadow-primary/20 text-white shadow-lg'
          : 'text-gray-400 hover:bg-white/5 hover:text-white'
      )}
    >
      <Icon className="h-5 w-5" />
      <span className="font-bold">{label}</span>
    </Link>
  );
};
