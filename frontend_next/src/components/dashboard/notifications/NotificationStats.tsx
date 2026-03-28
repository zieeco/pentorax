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
    { label: 'Total', value: stats.total, color: 'bg-gray-50 text-gray-900 border-gray-100' },
    {
      label: 'Unread',
      value: stats.unread,
      color: 'bg-yellow-50 text-yellow-700 border-yellow-100',
    },
    {
      label: 'Awaiting',
      value: stats.pending_restock,
      color: 'bg-blue-50 text-blue-700 border-blue-100',
    },
    {
      label: 'Fulfilled',
      value: stats.notified,
      color: 'bg-green-50 text-green-700 border-green-100',
    },
    {
      label: 'Archived',
      value: stats.archived,
      color: 'bg-purple-50 text-purple-700 border-purple-100',
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
