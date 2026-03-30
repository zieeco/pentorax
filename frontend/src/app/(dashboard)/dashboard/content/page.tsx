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
          <h1 className="text-foreground flex items-center gap-3 text-3xl font-black tracking-tight">
            <Layout className="text-primary h-8 w-8" />
            Content Management
          </h1>
          <p className="text-muted-foreground mt-1 font-medium">
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
        <Card className="border-border bg-card h-fit rounded-[2rem] p-6 shadow-sm">
          <p className="text-muted-foreground mb-4 px-2 text-[10px] font-black tracking-widest uppercase">
            Content Types
          </p>
          <div className="space-y-1">
            {['Blog Posts', 'Case Studies', 'Energy Reports', 'Company News'].map((item, i) => (
              <Button
                key={i}
                variant={i === 0 ? 'secondary' : 'ghost'}
                className={`h-11 w-full justify-start rounded-xl text-sm font-bold ${i === 0 ? 'bg-primary/5 text-primary hover:bg-primary/10' : 'hover:text-primary text-muted-foreground hover:bg-muted'}`}
              >
                {item}
              </Button>
            ))}
          </div>
          <Separator className="bg-border/50 my-6" />
          <p className="text-muted-foreground mb-4 px-2 text-[10px] font-black tracking-widest uppercase">
            Status
          </p>
          <div className="space-y-1">
            {['Published', 'Drafts', 'Scheduled', 'Archived'].map((item, i) => (
              <div
                key={i}
                className="group hover:bg-muted flex cursor-pointer items-center justify-between rounded-lg px-2 py-2 transition-colors"
              >
                <span className="group-hover:text-primary text-muted-foreground text-xs font-bold">
                  {item}
                </span>
                <Badge className="bg-muted text-muted-foreground border-none text-[10px] font-bold shadow-none">
                  0
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* List Card */}
        <Card className="border-border bg-card overflow-hidden rounded-[2.5rem] shadow-sm lg:col-span-3">
          <div className="border-border/50 bg-muted/20 flex flex-col items-center justify-between gap-4 border-b p-8 md:flex-row">
            <div className="group relative w-full md:w-80">
              <Search className="group-focus-within:text-primary text-muted-foreground absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 transition-colors" />
              <Input
                placeholder="Search content..."
                className="focus:border-primary border-border bg-background rounded-2xl py-6 pr-4 pl-11 text-sm font-bold shadow-none"
              />
            </div>
          </div>

          <div className="p-24 text-center">
            <div className="bg-muted/20 mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full">
              <FileEdit className="text-muted-foreground/30 h-10 w-10" />
            </div>
            <h3 className="text-foreground text-2xl font-black">
              Your content engine is warming up
            </h3>
            <p className="text-muted-foreground mx-auto mt-2 max-w-sm font-medium">
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
