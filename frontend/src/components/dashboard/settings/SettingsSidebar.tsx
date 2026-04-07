'use client';

import { Bell, ChevronRight, CreditCard, Globe, Key, LogOut, Shield, User } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const SETTINGS_NAV = [
  { label: 'Profile Settings', icon: User, active: true },
  { label: 'Notifications', icon: Bell },
  { label: 'Security & Privacy', icon: Shield },
  { label: 'Team Members', icon: Globe },
  { label: 'API & Webhooks', icon: Key },
  { label: 'Billing Details', icon: CreditCard },
];

export function SettingsSidebar() {
  return (
    <Card className="border-border bg-card h-fit rounded-[2rem] p-4 shadow-sm">
      <div className="space-y-1">
        {SETTINGS_NAV.map((item, i) => (
          <Button
            key={i}
            variant={item.active ? 'secondary' : 'ghost'}
            className={`h-12 w-full justify-between rounded-xl px-4 text-sm font-bold ${
              item.active
                ? 'bg-primary/5 text-primary hover:bg-primary/10'
                : 'hover:text-primary text-muted-foreground hover:bg-muted'
            }`}
          >
            <div className="flex items-center gap-3">
              <item.icon className="h-4 w-4" /> {item.label}
            </div>
            <ChevronRight className={`h-3 w-3 ${item.active ? 'opacity-100' : 'opacity-0'}`} />
          </Button>
        ))}
      </div>
      <Separator className="bg-border/50 my-6" />
      <Button
        variant="ghost"
        className="text-destructive hover:bg-destructive/10 hover:text-destructive h-12 w-full justify-start gap-3 rounded-xl px-4 text-sm font-bold"
      >
        <LogOut className="h-4 w-4" /> Log Out
      </Button>
    </Card>
  );
}
