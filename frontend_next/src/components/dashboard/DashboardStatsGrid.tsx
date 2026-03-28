'use client';

import { DollarSign, Package, ShoppingCart, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const STATS = [
  {
    label: 'Total Revenue',
    value: '₦2.45M',
    trend: '+14%',
    icon: <DollarSign className="h-4 w-4" />,
    color: 'bg-primary',
  },
  {
    label: 'Active Orders',
    value: '1,284',
    trend: '+8%',
    icon: <ShoppingCart className="h-4 w-4" />,
    color: 'bg-brand-green',
  },
  {
    label: 'Total Customers',
    value: '4,912',
    trend: '+22%',
    icon: <Users className="h-4 w-4" />,
    color: 'bg-brand-yellow text-brand-dark',
  },
  {
    label: 'Inventory Health',
    value: '92%',
    trend: '+3%',
    icon: <Package className="h-4 w-4" />,
    color: 'bg-brand-indigo',
  },
];

export function DashboardStatsGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {STATS.map((s, i) => (
        <Card
          key={i}
          className="rounded-3xl border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md"
        >
          <CardContent className="pt-6">
            <div className="mb-4 flex items-center justify-between">
              <div className={`rounded-xl p-2.5 text-white ${s.color}`}>{s.icon}</div>
              <Badge
                variant={s.trend.startsWith('+') ? 'default' : 'destructive'}
                className="rounded-lg text-[10px] font-black"
              >
                {s.trend}
              </Badge>
            </div>
            <p className="text-[10px] font-black tracking-widest text-gray-400 uppercase">
              {s.label}
            </p>
            <p className="mt-1 text-2xl font-black text-gray-900">{s.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
