'use client';

import {
  ArrowUpRight,
  BarChart3,
  Calendar,
  Download,
  Filter,
  LineChart,
  PieChart,
  Target,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function AnalyticsPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 space-y-8 duration-700">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="flex items-center gap-3 text-3xl font-black tracking-tight text-gray-900">
            <BarChart3 className="text-primary h-8 w-8" />
            Advanced Analytics
          </h1>
          <p className="mt-1 font-medium text-gray-500">
            Real-time insights into your energy ecosystem.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl border-gray-100 bg-white font-bold">
            <Calendar className="mr-2 h-4 w-4" />
            Last 30 Days
          </Button>
          <Button className="gap-2 rounded-xl font-bold">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: 'Net Revenue',
            value: '₦4,285,000',
            change: '+24.5%',
            icon: TrendingUp,
            color: 'text-green-500',
            bg: 'bg-green-50',
          },
          {
            label: 'Avg. Order Value',
            value: '₦82,400',
            change: '+12.3%',
            icon: TrendingUp,
            color: 'text-green-500',
            bg: 'bg-green-50',
          },
          {
            label: 'Conversion Rate',
            value: '3.45%',
            change: '-2.1%',
            icon: TrendingDown,
            color: 'text-red-500',
            bg: 'bg-red-50',
          },
          {
            label: 'Customer LTV',
            value: '₦215,000',
            change: '+8.4%',
            icon: TrendingUp,
            color: 'text-green-500',
            bg: 'bg-green-50',
          },
        ].map((stat, i) => (
          <Card
            key={i}
            className="rounded-3xl border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-black tracking-widest text-gray-400 uppercase">
                  {stat.label}
                </p>
                <p className="mt-1 text-2xl font-black text-gray-900">{stat.value}</p>
              </div>
              <div className={`rounded-xl p-2 ${stat.bg}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </div>
            <div className={`mt-4 flex items-center gap-1 text-[11px] font-bold ${stat.color}`}>
              {stat.change} <span className="ml-1 text-gray-400">vs last period</span>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Growth Target Glass Card */}
        <Card className="overflow-hidden rounded-[2.5rem] border-gray-100 bg-white shadow-sm lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between p-8 pb-4">
            <CardTitle className="flex items-center gap-2 text-xl font-black text-gray-900">
              <Target className="text-primary h-5 w-5" />
              Performance Projection
            </CardTitle>
            <Badge className="bg-primary/5 text-primary border-primary/10 rounded-lg text-[9px] font-bold uppercase shadow-none">
              Beta
            </Badge>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <div className="flex h-64 items-center justify-center rounded-[2rem] border border-dashed border-gray-200 bg-gray-50/50">
              <div className="text-center">
                <LineChart className="mx-auto mb-4 h-12 w-12 text-gray-200" />
                <p className="font-bold text-gray-400">
                  Interactive data visualizations are being calibrated.
                </p>
                <p className="mt-1 text-[10px] font-medium text-gray-300 uppercase">
                  Ready in v1.4.0
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Insights Column */}
        <div className="space-y-6">
          <Card className="shadow-primary/5 bg-primary relative overflow-hidden rounded-[2rem] border-none p-8 text-white shadow-xl">
            <ArrowUpRight className="absolute -top-4 -right-4 h-32 w-32 opacity-10" />
            <h3 className="text-lg leading-tight font-black">
              Your revenue is on track to hit ₦5M this month.
            </h3>
            <p className="mt-2 text-sm font-medium text-white/70">
              Keep running your &quot;Solar Summer&quot; campaign to maximize customer acquisition.
            </p>
            <Button className="text-primary mt-6 w-full rounded-xl bg-white font-black hover:bg-white/90">
              View Campaign
            </Button>
          </Card>

          <Card className="rounded-[2rem] border-gray-100 bg-white p-6 shadow-sm">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="flex items-center gap-2 text-sm font-black tracking-widest text-gray-400 uppercase">
                <PieChart className="h-4 w-4" />
                Distribution
              </CardTitle>
            </CardHeader>
            <div className="space-y-4 pt-2">
              {[
                { label: 'Residential', value: '45%', color: 'bg-primary' },
                { label: 'Commercial', value: '30%', color: 'bg-brand-indigo' },
                { label: 'Industrial', value: '25%', color: 'bg-brand-green' },
              ].map((item, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span>{item.label}</span>
                    <span>{item.value}</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-50">
                    <div className={`h-full ${item.color}`} style={{ width: item.value }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
