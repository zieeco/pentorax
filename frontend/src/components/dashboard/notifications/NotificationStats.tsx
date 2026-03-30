'use client';

import { Card, CardContent } from '@/components/ui/card';

interface NotificationStatsProps {
  stats?: {
    total: number;
    unread: number;
    pending_restock: number;
    notified: number;
    archived: number;
  };
}

export function NotificationStats({ stats }: NotificationStatsProps) {
  if (!stats) return null;

  const items = [
    { label: 'Total', value: stats.total, color: 'bg-muted/50 text-muted-foreground border-muted' },
    {
      label: 'Unread',
      value: stats.unread,
      color: 'bg-accent/10 text-accent border-accent/20',
    },
    {
      label: 'Awaiting',
      value: stats.pending_restock,
      color: 'bg-primary/10 text-primary border-primary/20',
    },
    {
      label: 'Fulfilled',
      value: stats.notified,
      color: 'bg-secondary/10 text-secondary border-secondary/20',
    },
    {
      label: 'Archived',
      value: stats.archived,
      color: 'bg-foreground/5 text-foreground border-foreground/10',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
      {items.map((item, idx) => (
        <Card
          key={idx}
          className={`overflow-hidden rounded-[2rem] border shadow-none ${item.color}`}
        >
          <CardContent className="p-6">
            <p className="text-[10px] font-black tracking-[0.2em] uppercase opacity-60">
              {item.label}
            </p>
            <p className="mt-1 text-3xl font-black">{item.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
