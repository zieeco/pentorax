'use client';

import {
  Bell,
  ChevronRight,
  CreditCard,
  Globe,
  Key,
  LogOut,
  Save,
  Settings,
  Shield,
  User,
} from 'lucide-react';
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

export default function SettingsPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 space-y-8 duration-700">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="flex items-center gap-3 text-3xl font-black tracking-tight text-gray-900">
            <Settings className="text-primary h-8 w-8" />
            Control Center
          </h1>
          <p className="mt-1 font-medium text-gray-500">
            Manage your account preferences, security, and global PentoraX settings.
          </p>
        </div>
        <Button className="bg-primary shadow-primary/20 gap-2 rounded-xl font-bold shadow-xl">
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Navigation Sidebar */}
        <Card className="h-fit rounded-[2rem] border-gray-100 bg-white p-4 shadow-sm">
          <div className="space-y-1">
            {[
              { label: 'Profile Settings', icon: User, active: true },
              { label: 'Notifications', icon: Bell },
              { label: 'Security & Privacy', icon: Shield },
              { label: 'Team Members', icon: Globe },
              { label: 'API & Webhooks', icon: Key },
              { label: 'Billing Details', icon: CreditCard },
            ].map((item, i) => (
              <Button
                key={i}
                variant={item.active ? 'secondary' : 'ghost'}
                className={`h-12 w-full justify-between rounded-xl px-4 text-sm font-bold ${item.active ? 'bg-primary/5 text-primary hover:bg-primary/10' : 'hover:text-primary text-gray-500 hover:bg-gray-50'}`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-4 w-4" /> {item.label}
                </div>
                <ChevronRight className={`h-3 w-3 ${item.active ? 'opacity-100' : 'opacity-0'}`} />
              </Button>
            ))}
          </div>
          <Separator className="my-6 bg-gray-50" />
          <Button
            variant="ghost"
            className="h-12 w-full justify-start gap-3 rounded-xl px-4 text-sm font-bold text-red-500 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="h-4 w-4" /> Log Out
          </Button>
        </Card>

        {/* Content Area */}
        <div className="space-y-8 lg:col-span-3">
          <Card className="overflow-hidden rounded-[2.5rem] border-gray-100 bg-white shadow-sm">
            <CardHeader className="border-b border-gray-50 bg-gray-50/30 p-8 pb-4">
              <CardTitle className="text-xl font-black text-gray-900">
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 p-8">
              <div className="flex items-center gap-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-[2rem] border-2 border-white bg-gray-100 text-3xl font-black text-gray-300 shadow-xl">
                  JD
                </div>
                <div>
                  <Button className="h-auto rounded-xl px-4 py-2 text-xs font-bold">
                    Update Avatar
                  </Button>
                  <p className="mt-2 text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                    Recommended: 200×200px PNG
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="ml-1 text-[10px] font-black tracking-widest text-gray-400 uppercase">
                    Full Name
                  </label>
                  <Input
                    defaultValue="John Doe"
                    className="focus:border-primary h-12 rounded-xl border-transparent bg-gray-50 font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="ml-1 text-[10px] font-black tracking-widest text-gray-400 uppercase">
                    Email Address
                  </label>
                  <Input
                    defaultValue="john.doe@pentorax.com"
                    className="focus:border-primary h-12 rounded-xl border-transparent bg-gray-50 font-bold"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden rounded-[2.5rem] border-gray-100 bg-white shadow-sm">
            <CardHeader className="border-b border-gray-50 bg-gray-50/30 p-8 pb-4">
              <CardTitle className="text-xl font-black text-gray-900">
                Email Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-8">
              {[
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
              ].map((item, i) => (
                <div key={i} className="group flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="group-hover:text-primary text-sm font-black text-gray-900 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs font-medium text-gray-500">{item.desc}</p>
                  </div>
                  <Switch defaultChecked={i < 2} className="data-[state=checked]:bg-primary" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
