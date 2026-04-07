'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

const NOTIFICATIONS_CONFIG = [
  {
    title: 'New Order Alerts',
    desc: 'Get notified as soon as a customer places a new order.',
  },
  {
    title: 'Stock Reminders',
    desc: 'Receive daily updates on items with low inventory levels.',
  },
  {
    title: 'Marketing Updates',
    desc: 'Stay in the loop with new PentoraX features and offers.',
  },
];

export function EmailNotificationsForm() {
  return (
    <Card className="border-border bg-card overflow-hidden rounded-[2.5rem] shadow-sm">
      <CardHeader className="border-border/50 bg-muted/20 border-b p-8 pb-4">
        <CardTitle className="text-foreground text-xl font-black">Email Notifications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-8">
        {NOTIFICATIONS_CONFIG.map((item, i) => (
          <div key={i} className="group flex items-center justify-between">
            <div className="space-y-0.5">
              <h4 className="group-hover:text-primary text-foreground text-sm font-black transition-colors">
                {item.title}
              </h4>
              <p className="text-muted-foreground text-xs font-medium">{item.desc}</p>
            </div>
            <Switch defaultChecked={i < 2} className="data-[state=checked]:bg-primary" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
