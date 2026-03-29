'use client';

import {
  Calendar,
  Eye,
  FileEdit,
  Filter,
  Layout,
  MoreVertical,
  Plus,
  Search,
  User,
} from 'lucide-react';
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function ContentPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 space-y-8 duration-700">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="flex items-center gap-3 text-3xl font-black tracking-tight text-gray-900">
            <Layout className="text-primary h-8 w-8" />
            Content Management
          </h1>
          <p className="mt-1 font-medium text-gray-500">
            Publish and manage your blog posts, articles, and case studies.
          </p>
        </div>
        <Button className="gap-2 rounded-xl font-bold">
          <Plus className="h-4 w-4" />
          Create New Post
        </Button>
      </div>

      {/* Tabs / Filters Sidebar-like card */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <Card className="h-fit rounded-[2rem] border-gray-100 bg-white p-6 shadow-sm">
          <p className="mb-4 px-2 text-[10px] font-black tracking-widest text-gray-400 uppercase">
            Content Types
          </p>
          <div className="space-y-1">
            {['Blog Posts', 'Case Studies', 'Energy Reports', 'Company News'].map((item, i) => (
              <Button
                key={i}
                variant={i === 0 ? 'secondary' : 'ghost'}
                className={`h-11 w-full justify-start rounded-xl text-sm font-bold ${i === 0 ? 'bg-primary/5 text-primary hover:bg-primary/10' : 'hover:text-primary text-gray-500 hover:bg-gray-50'}`}
              >
                {item}
              </Button>
            ))}
          </div>
          <Separator className="my-6 bg-gray-50" />
          <p className="mb-4 px-2 text-[10px] font-black tracking-widest text-gray-400 uppercase">
            Status
          </p>
          <div className="space-y-1">
            {['Published', 'Drafts', 'Scheduled', 'Archived'].map((item, i) => (
              <div
                key={i}
                className="group flex cursor-pointer items-center justify-between rounded-lg px-2 py-2 transition-colors hover:bg-gray-50"
              >
                <span className="group-hover:text-primary text-xs font-bold text-gray-500">
                  {item}
                </span>
                <Badge className="border-none bg-gray-100 text-[10px] font-bold text-gray-400 shadow-none">
                  0
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* List Card */}
        <Card className="overflow-hidden rounded-[2.5rem] border-gray-100 bg-white shadow-sm lg:col-span-3">
          <div className="flex flex-col items-center justify-between gap-4 border-b border-gray-50 bg-gray-50/30 p-8 md:flex-row">
            <div className="group relative w-full md:w-80">
              <Search className="group-focus-within:text-primary absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-gray-400 transition-colors" />
              <Input
                placeholder="Search content..."
                className="focus:border-primary rounded-2xl border-gray-100 bg-white py-6 pr-4 pl-11 text-sm font-bold shadow-none"
              />
            </div>
          </div>

          <div className="p-24 text-center">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-50">
              <FileEdit className="h-10 w-10 text-gray-200" />
            </div>
            <h3 className="text-2xl font-black text-gray-900">Your content engine is warming up</h3>
            <p className="mx-auto mt-2 max-w-sm font-medium text-gray-500">
              The Next.js 16 blog architecture is currently being finalized. Soon you&apos;ll have a
              glassmorphic editor and AI-assisted drafting tools.
            </p>
            <Button className="bg-primary/5 text-primary hover:bg-primary/10 border-primary/10 mt-8 rounded-xl border font-black shadow-none">
              Configure Editor
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

function Separator({ className }: { className?: string }) {
  return <div className={`h-[1px] w-full ${className}`} />;
}
