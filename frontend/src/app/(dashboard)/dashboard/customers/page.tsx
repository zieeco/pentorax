'use client';

import {
  Calendar,
  Filter,
  Mail,
  MoreHorizontal,
  Phone,
  Search,
  UserPlus,
  Users,
} from 'lucide-react';
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function CustomersPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 space-y-8 duration-700">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="flex items-center gap-3 text-3xl font-black tracking-tight text-gray-900">
            <Users className="text-primary h-8 w-8" />
            Customer Management
          </h1>
          <p className="mt-1 font-medium text-gray-500">
            Manage your customer base and view their activity.
          </p>
        </div>
        <Button className="gap-2 rounded-xl font-bold">
          <UserPlus className="h-4 w-4" />
          Add Customer
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {[
          { label: 'Total Customers', value: '1,284', change: '+12%', color: 'bg-primary' },
          { label: 'Active Now', value: '42', change: '+5%', color: 'bg-brand-green' },
          { label: 'New This Month', value: '156', change: '+18%', color: 'bg-brand-indigo' },
          { label: 'Churn Rate', value: '2.4%', change: '-0.5%', color: 'bg-brand-yellow' },
        ].map((stat, i) => (
          <Card
            key={i}
            className="group relative overflow-hidden rounded-3xl border-gray-100 p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div
              className={`absolute top-0 right-0 h-24 w-24 ${stat.color}/5 -mt-8 -mr-8 rounded-full transition-transform group-hover:scale-110`}
            />
            <p className="text-[10px] font-black tracking-widest text-gray-400 uppercase">
              {stat.label}
            </p>
            <div className="mt-2 flex items-end justify-between">
              <p className="text-3xl font-black text-gray-900">{stat.value}</p>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${stat.change.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}
              >
                {stat.change}
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters & Table Placeholder */}
      <Card className="overflow-hidden rounded-[2.5rem] border-gray-100 bg-white shadow-sm">
        <div className="flex flex-col items-center justify-between gap-4 border-b border-gray-50 bg-gray-50/30 p-8 md:flex-row">
          <div className="group relative w-full md:w-96">
            <Search className="group-focus-within:text-primary absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-gray-400 transition-colors" />
            <Input
              placeholder="Search customers..."
              className="focus:border-primary rounded-2xl border-gray-100 bg-white py-6 pr-4 pl-11 text-sm font-bold shadow-none"
            />
          </div>
          <div className="flex w-full items-center gap-3 md:w-auto">
            <Button
              variant="outline"
              className="flex-1 gap-2 rounded-xl border-gray-100 bg-white font-bold md:flex-none"
            >
              <Filter className="h-4 w-4 text-gray-400" />
              Filters
            </Button>
          </div>
        </div>

        <div className="p-24 text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-50">
            <Users className="h-10 w-10 text-gray-200" />
          </div>
          <h3 className="text-2xl font-black text-gray-900">
            Your customer directory is being built
          </h3>
          <p className="mx-auto mt-2 max-w-md font-medium text-gray-500">
            In our Next.js 16 architecture, we&apos;re optimizing the data flow for large customer
            lists. This module is coming online shortly.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button variant="outline" className="rounded-xl font-bold">
              Import CSV
            </Button>
            <Button className="rounded-xl font-bold">Sync with CRM</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
