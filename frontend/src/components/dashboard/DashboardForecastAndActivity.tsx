'use client';

import { ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RECENT_ACTIVITY = [
  { label: 'Bulk Export', time: '12m ago', status: 'Completed', color: 'secondary' },
  { label: 'Security Audit', time: '4h ago', status: 'Pending', color: 'accent' },
  { label: 'Voucher Update', time: '1d ago', status: 'Completed', color: 'secondary' },
];

export function DashboardForecastAndActivity() {
  return (
    <div className="space-y-6">
      <Card className="border-border bg-brand-dark text-brand-light relative overflow-hidden rounded-[2rem] shadow-sm">
        <div className="bg-brand-primary/20 absolute top-0 right-0 h-32 w-32 translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />
        <CardHeader className="relative z-10">
          <CardTitle className="text-lg font-black">Sales Forecast</CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="mb-6 flex h-32 items-end justify-between gap-2">
            {[45, 65, 35, 85, 55, 75, 95].map((h, i) => {
              const colors = [
                'bg-primary/30 group-hover:bg-primary',
                'bg-secondary/30 group-hover:bg-secondary',
                'bg-accent/30 group-hover:bg-accent',
              ];
              const colorClass = colors[i % colors.length];
              return (
                <div key={i} className="group flex-1">
                  <div
                    className={`${colorClass} rounded-lg transition-all duration-300`}
                    style={{ height: `${h}%` }}
                  />
                </div>
              );
            })}
          </div>
          <div className="border-brand-light/10 flex items-center justify-between border-t pt-4">
            <div>
              <p className="text-brand-light/40 text-[10px] font-black uppercase">
                Expected Growth
              </p>
              <p className="text-brand-secondary text-xl font-black">+28.5%</p>
            </div>
            <Button
              size="icon"
              className="shadow-brand-primary/30 bg-brand-primary hover:bg-brand-primary/90 rounded-xl shadow-xl"
            >
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border rounded-[2rem] shadow-sm">
        <CardHeader>
          <CardTitle className="text-muted-foreground text-sm font-black tracking-widest uppercase">
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {RECENT_ACTIVITY.map((act, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`h-2 w-2 rounded-full shadow-[0_0_8px] ${
                    act.color === 'secondary'
                      ? 'bg-secondary shadow-secondary/60'
                      : act.color === 'accent'
                        ? 'bg-accent shadow-accent/60'
                        : 'bg-primary shadow-primary/60'
                  }`}
                />
                <div>
                  <p className="text-foreground text-sm leading-none font-bold">{act.label}</p>
                  <p className="text-muted-foreground mt-1 text-[10px] font-bold uppercase">
                    {act.time}
                  </p>
                </div>
              </div>
              <Badge
                variant="outline"
                className="h-5 rounded-lg px-2 py-0 text-[9px] font-black uppercase"
              >
                {act.status}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
