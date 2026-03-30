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
          <h1 className="text-foreground flex items-center gap-3 text-3xl font-black tracking-tight">
            <Users className="text-primary h-8 w-8" />
            Customer Management
          </h1>
          <p className="text-muted-foreground mt-1 font-medium">
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
          { label: 'Active Now', value: '42', change: '+5%', color: 'bg-secondary' },
          { label: 'New This Month', value: '156', change: '+18%', color: 'bg-primary' },
          { label: 'Churn Rate', value: '2.4%', change: '-0.5%', color: 'bg-accent' },
        ].map((stat, i) => (
          <Card
            key={i}
            className="group border-border relative overflow-hidden rounded-3xl p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div
              className={`absolute top-0 right-0 h-24 w-24 ${stat.color}/5 -mt-8 -mr-8 rounded-full transition-transform group-hover:scale-110`}
            />
            <p className="text-muted-foreground text-[10px] font-black tracking-widest uppercase">
              {stat.label}
            </p>
            <div className="mt-2 flex items-end justify-between">
              <p className="text-foreground text-3xl font-black">{stat.value}</p>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${stat.change.startsWith('+') ? 'bg-secondary/10 text-secondary' : 'bg-destructive/10 text-destructive'}`}
              >
                {stat.change}
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters & Table Placeholder */}
      <Card className="border-border bg-card overflow-hidden rounded-[2.5rem] shadow-sm">
        <div className="border-border/50 bg-muted/20 flex flex-col items-center justify-between gap-4 border-b p-8 md:flex-row">
          <div className="group relative w-full md:w-96">
            <Search className="group-focus-within:text-primary text-muted-foreground absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 transition-colors" />
            <Input
              placeholder="Search customers..."
              className="focus:border-primary border-border bg-background rounded-2xl py-6 pr-4 pl-11 text-sm font-bold shadow-none"
            />
          </div>
          <div className="flex w-full items-center gap-3 md:w-auto">
            <Button
              variant="outline"
              className="border-border bg-background flex-1 gap-2 rounded-xl font-bold md:flex-none"
            >
              <Filter className="text-muted-foreground h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>

        <div className="p-24 text-center">
          <div className="bg-muted/20 mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full">
            <Users className="text-muted-foreground/30 h-10 w-10" />
          </div>
          <h3 className="text-foreground text-2xl font-black">
            Your customer directory is being built
          </h3>
          <p className="text-muted-foreground mx-auto mt-2 max-w-md font-medium">
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
