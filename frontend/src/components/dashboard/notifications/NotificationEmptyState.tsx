'use client';

import { Bell } from 'lucide-react';
import React from 'react';

export function NotificationEmptyState() {
  return (
    <div className="border-border bg-card rounded-[2.5rem] border p-24 text-center shadow-sm">
      <div className="bg-muted/20 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full">
        <Bell className="text-muted-foreground/30 h-10 w-10" />
      </div>
      <p className="text-foreground text-xl font-black">Quiet for now</p>
      <p className="text-muted-foreground font-medium">
        No stock alerts found matching your criteria
      </p>
    </div>
  );
}
