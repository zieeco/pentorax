'use client';

import React from 'react';
import { AnalyticsHeader } from '@/components/dashboard/analytics/AnalyticsHeader';
import { AnalyticsInsights } from '@/components/dashboard/analytics/AnalyticsInsights';
import { AnalyticsStatsGrid } from '@/components/dashboard/analytics/AnalyticsStatsGrid';
import { PerformanceProjection } from '@/components/dashboard/analytics/PerformanceProjection';

export default function AnalyticsPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 space-y-8 duration-700">
      <AnalyticsHeader />
      <AnalyticsStatsGrid />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <PerformanceProjection />
        <AnalyticsInsights />
      </div>
    </div>
  );
}
