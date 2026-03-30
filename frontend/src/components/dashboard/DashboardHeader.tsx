'use client';

import { Bell, Search } from 'lucide-react';
import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRole, useUser } from '@/stores/auth';
import { getRoleDisplayName } from '@/utils/authHelpers';

/**
 * DashboardHeader component for Next.js 16.
 * Refactored from legacy implementation to use Shadcn primitives.
 * Strictly adheres to professional naming conventions and dashboard layout.
 */
const DashboardHeader: React.FC = () => {
  const user = useUser();
  const role = useRole();

  return (
    <header className="border-border bg-card flex h-20 shrink-0 items-center justify-between border-b px-8 transition-shadow duration-300">
      {/* Search */}
      <div className="flex flex-1 items-center space-x-4">
        <div className="group relative w-96">
          <Search className="group-focus-within:text-primary text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transition-colors" />
          <Input
            type="text"
            placeholder="Search products, orders, customers..."
            className="focus-visible:ring-primary/20 focus-visible:border-primary border-border bg-muted/30 placeholder:text-muted-foreground w-full rounded-xl border py-2.5 pr-4 pl-10 text-sm transition-all outline-none focus-visible:ring-2"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-6">
        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="hover:text-primary hover:bg-muted relative rounded-xl transition-all"
        >
          <Bell className="h-5 w-5" />
          <span className="border-background absolute top-2.5 right-2.5 h-2 w-2 animate-pulse rounded-full border-2 bg-rose-500 ring-1 ring-rose-500/20"></span>
        </Button>

        {/* User Profile */}
        <div className="border-border flex items-center space-x-3 border-l pl-6">
          <div className="text-right">
            <p className="text-foreground text-sm leading-none font-bold">
              {user?.user_metadata?.name || user?.email?.split('@')[0] || 'User'}
            </p>
            <p className="text-primary mt-1.5 flex items-center justify-end text-[10px] font-black tracking-wider uppercase">
              <span className="bg-primary mr-1.5 h-1.5 w-1.5 rounded-full"></span>
              {getRoleDisplayName(role)}
            </p>
          </div>
          <Avatar className="ring-primary/5 h-10 w-10 rounded-xl ring-2 transition-transform hover:scale-105">
            <AvatarFallback className="bg-primary rounded-xl text-xs font-bold text-white">
              {(
                user?.user_metadata?.name?.charAt(0) ||
                user?.email?.charAt(0) ||
                'U'
              ).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
