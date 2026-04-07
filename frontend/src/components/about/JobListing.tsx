'use client';

import { ArrowRight, Briefcase } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface JobListingProps {
  job: {
    title: string;
    type: string;
    location: string;
    dept: string;
  };
}

export function JobListing({ job }: JobListingProps) {
  return (
    <div className="border-border/50 bg-card/10 group hover:bg-background hover:text-foreground flex flex-col justify-between rounded-[2.5rem] border p-10 shadow-2xl backdrop-blur-sm transition-all duration-500 md:flex-row md:items-center">
      <div className="mb-6 md:mb-0">
        <Badge className="bg-primary/20 text-primary mb-3 border-none text-[9px] font-black tracking-widest uppercase italic">
          Division: {job.dept}
        </Badge>
        <h4 className="text-2xl leading-none font-black tracking-tighter lowercase italic">
          {job.title}
        </h4>
        <div className="text-muted-foreground group-hover:text-muted-foreground mt-4 flex h-4 flex-wrap gap-6 text-xs font-black tracking-widest uppercase">
          <span className="flex items-center gap-2">
            <Briefcase className="h-3 w-3" /> {job.type}
          </span>
          <span>Location: {job.location}</span>
        </div>
      </div>
      <Button
        asChild
        variant="ghost"
        className="text-primary hover:bg-primary/10 group-hover:text-foreground p-0 font-black tracking-widest uppercase italic transition-colors md:p-6"
      >
        <Link href="/contact" className="flex items-center gap-3">
          Initiate Apply{' '}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
        </Link>
      </Button>
    </div>
  );
}
