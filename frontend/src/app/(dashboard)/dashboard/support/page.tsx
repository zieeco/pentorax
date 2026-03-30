'use client';

import {
  BookOpen,
  ChevronRight,
  ExternalLink,
  FileQuestion,
  LifeBuoy,
  MessageCircle,
  PhoneCall,
  Search,
  ShieldCheck,
} from 'lucide-react';
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function SupportPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 space-y-8 duration-700">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-foreground flex items-center gap-3 text-3xl font-black tracking-tight">
            <LifeBuoy className="text-primary h-8 w-8" />
            Support Center
          </h1>
          <p className="text-muted-foreground mt-1 font-medium">
            How can we help you today? Search our knowledge base or contact a specialist.
          </p>
        </div>
        <Button className="gap-2 rounded-xl font-bold">
          <MessageCircle className="h-4 w-4" />
          Live Chat
        </Button>
      </div>

      {/* Search Bar Big */}
      <Card className="shadow-primary/10 bg-primary relative overflow-hidden rounded-[2.5rem] border-none p-12 shadow-xl">
        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <h2 className="mb-6 text-2xl font-black text-white">Search our knowledge base</h2>
          <div className="group relative">
            <Search className="text-muted-foreground/50 absolute top-1/2 left-5 h-5 w-5 -translate-y-1/2" />
            <Input
              placeholder="Describe your issue..."
              className="bg-background rounded-2xl border-transparent py-8 pr-6 pl-14 text-lg font-bold shadow-2xl shadow-black/10 focus:ring-4 focus:ring-white/20"
            />
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {['Order Tracking', 'Solar Panel Maintenance', 'Billing Issues', 'API Integration'].map(
              (tag, i) => (
                <Badge
                  key={i}
                  className="cursor-pointer rounded-full border-none bg-white/10 px-4 py-1.5 text-[10px] font-bold tracking-widest text-white uppercase transition-colors hover:bg-white/20"
                >
                  {tag}
                </Badge>
              )
            )}
          </div>
        </div>
        <div className="absolute top-0 left-0 -mt-32 -ml-32 h-64 w-64 animate-pulse rounded-full bg-white/5 blur-3xl" />
        <div className="absolute right-0 bottom-0 -mr-48 -mb-48 h-96 w-96 rounded-full bg-black/10 blur-3xl" />
      </Card>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {[
          {
            icon: FileQuestion,
            title: 'FAQs',
            desc: 'Find quick answers to common questions about PentoraX services.',
            link: 'Browse FAQs',
          },
          {
            icon: BookOpen,
            title: 'Guides & Docs',
            desc: 'Detailed documentation for installations and developer API usage.',
            link: 'Read Guides',
          },
          {
            icon: PhoneCall,
            title: 'Contact Support',
            desc: 'Our dedicated team is available 24/7 for critical energy issues.',
            link: 'Get in Touch',
          },
        ].map((item, i) => (
          <Card
            key={i}
            className="group border-border bg-card rounded-[2rem] p-8 shadow-sm transition-all hover:shadow-md"
          >
            <div className="group-hover:bg-primary/10 bg-muted/30 mb-6 w-fit rounded-2xl p-4 transition-colors">
              <item.icon className="text-primary h-6 w-6" />
            </div>
            <h3 className="text-foreground mb-2 text-xl font-black">{item.title}</h3>
            <p className="text-muted-foreground mb-6 text-sm leading-relaxed font-medium">
              {item.desc}
            </p>
            <Button
              variant="ghost"
              className="text-primary h-auto p-0 font-black transition-all group-hover:gap-2 hover:bg-transparent"
            >
              {item.link}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Card>
        ))}
      </div>

      {/* Standalone Alert Card */}
      <Card className="border-secondary/20 bg-secondary/5 rounded-[2rem] border p-8">
        <div className="flex items-center gap-6">
          <div className="bg-secondary/10 rounded-2xl p-4">
            <ShieldCheck className="text-secondary h-6 w-6" />
          </div>
          <div>
            <h4 className="text-secondary text-lg font-black">99.9% Uptime SLA reached</h4>
            <p className="text-secondary/70 text-sm font-bold">
              PentoraX ensures your energy management never goes down. Check our status page for
              more info.
            </p>
          </div>
          <Button
            variant="outline"
            className="border-secondary/20 text-secondary bg-background ml-auto gap-2 rounded-xl font-bold"
          >
            Status Page <ExternalLink className="h-3 w-3" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
