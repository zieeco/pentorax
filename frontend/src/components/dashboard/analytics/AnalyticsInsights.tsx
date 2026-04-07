'use client';

import { ArrowUpRight, PieChart } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

const distribution = [
  { label: 'Residential', value: '45%', color: 'bg-primary' },
  { label: 'Commercial', value: '30%', color: 'bg-secondary' },
  { label: 'Industrial', value: '25%', color: 'bg-accent' },
];

export function AnalyticsInsights() {
  return (
    <div className="space-y-6">
      <Card className="shadow-primary/10 bg-primary relative overflow-hidden rounded-[2rem] border-none p-8 text-white shadow-xl">
        <ArrowUpRight className="absolute -top-4 -right-4 h-32 w-32 opacity-10" />
        <h3 className="text-lg leading-tight font-black text-white">
          Your revenue is on track to hit ₦5M this month.
        </h3>
        <p className="mt-2 text-sm font-medium text-white/70">
          Keep running your &quot;Solar Summer&quot; campaign to maximize customer acquisition.
        </p>
        <button className="bg-background text-primary hover:bg-background/90 mt-6 w-full rounded-xl py-3 text-sm font-black transition-colors">
          View Campaign
        </button>
      </Card>

      <Card className="border-border bg-card rounded-[2rem] p-6 shadow-sm">
        <CardHeader className="p-0 pb-4">
          <CardTitle className="text-muted-foreground flex items-center gap-2 text-sm font-black tracking-widest uppercase">
            <PieChart className="h-4 w-4" />
            Distribution
          </CardTitle>
        </CardHeader>
        <div className="space-y-4 pt-2">
          {distribution.map((item, i) => (
            <div key={i} className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="text-foreground">{item.value}</span>
              </div>
              <div className="bg-muted h-2 w-full overflow-hidden rounded-full">
                <div className={`h-full ${item.color}`} style={{ width: item.value }} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
