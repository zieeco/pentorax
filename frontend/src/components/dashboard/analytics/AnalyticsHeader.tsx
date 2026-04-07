'use client';

import { BarChart3, Calendar, Download } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';

export function AnalyticsHeader() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-foreground flex items-center gap-3 text-3xl font-black tracking-tight">
          <BarChart3 className="text-primary h-8 w-8" />
          Advanced Analytics
        </h1>
        <p className="text-muted-foreground mt-1 font-medium">
          Real-time insights into your energy ecosystem.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" className="border-border bg-card rounded-xl font-bold">
          <Calendar className="mr-2 h-4 w-4" />
          Last 30 Days
        </Button>
        <Button className="gap-2 rounded-xl font-bold">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>
    </div>
  );
}
