'use client';

import { TrendingDown, TrendingUp } from 'lucide-react';
import React from 'react';
import { Card } from '@/components/ui/card';

const stats = [
  {
    label: 'Net Revenue',
    value: '₦4,285,000',
    change: '+24.5%',
    icon: TrendingUp,
    color: 'text-secondary',
    bg: 'bg-secondary/10',
  },
  {
    label: 'Avg. Order Value',
    value: '₦82,400',
    change: '+12.3%',
    icon: TrendingUp,
    color: 'text-secondary',
    bg: 'bg-secondary/10',
  },
  {
    label: 'Conversion Rate',
    value: '3.45%',
    change: '-2.1%',
    icon: TrendingDown,
    color: 'text-destructive',
    bg: 'bg-destructive/10',
  },
  {
    label: 'Customer LTV',
    value: '₦215,000',
    change: '+8.4%',
    icon: TrendingUp,
    color: 'text-secondary',
    bg: 'bg-secondary/10',
  },
];

export function AnalyticsStatsGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <Card
          key={i}
          className="border-border bg-card rounded-3xl p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-muted-foreground text-[10px] font-black tracking-widest uppercase">
                {stat.label}
              </p>
              <p className="text-foreground mt-1 text-2xl font-black">{stat.value}</p>
            </div>
            <div className={`rounded-xl p-2 ${stat.bg}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </div>
          <div className={`mt-4 flex items-center gap-1 text-[11px] font-bold ${stat.color}`}>
            {stat.change} <span className="text-muted-foreground ml-1">vs last period</span>
          </div>
        </Card>
      ))}
    </div>
  );
}
