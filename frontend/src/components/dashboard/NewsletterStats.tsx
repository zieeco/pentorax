'use client';

/**
 * NewsletterStats — Stats grid for newsletter dashboard
 * Extracted from newsletter/page.tsx for 150-line rule compliance
 */
import { UserCheck, Users, UserX } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface NewsletterStatsProps {
  total: number;
  active: number;
  inactive: number;
}

export function NewsletterStats({ total, active, inactive }: NewsletterStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <Card className="bg-primary group hover:shadow-primary/20 overflow-hidden rounded-[2.5rem] border-none shadow-sm transition-all duration-300 hover:shadow-lg">
        <CardContent className="relative p-8">
          <Users className="absolute -right-4 -bottom-4 h-32 w-32 text-white/5 transition-transform duration-500 group-hover:scale-110" />
          <p className="text-[10px] font-black tracking-[0.2em] text-white/60 uppercase">
            Total Audience
          </p>
          <p className="mt-2 text-4xl font-black text-white">{total.toLocaleString()}</p>
        </CardContent>
      </Card>

      <Card className="group border-border/50 bg-card overflow-hidden rounded-[2.5rem] shadow-sm transition-all duration-300 hover:shadow-lg">
        <CardContent className="flex items-center justify-between p-8">
          <div>
            <p className="text-muted-foreground text-[10px] font-black tracking-[0.2em] uppercase">
              Active Growth
            </p>
            <p className="text-secondary mt-2 text-4xl font-black">{active.toLocaleString()}</p>
          </div>
          <div className="bg-secondary/10 flex h-16 w-16 items-center justify-center rounded-[1.5rem]">
            <UserCheck className="text-secondary h-8 w-8" />
          </div>
        </CardContent>
      </Card>

      <Card className="group border-border/50 bg-card overflow-hidden rounded-[2.5rem] shadow-sm transition-all duration-300 hover:shadow-lg">
        <CardContent className="flex items-center justify-between p-8">
          <div>
            <p className="text-muted-foreground text-[10px] font-black tracking-[0.2em] uppercase">
              Churn Rate
            </p>
            <p className="text-muted-foreground mt-2 text-4xl font-black">
              {inactive.toLocaleString()}
            </p>
          </div>
          <div className="bg-muted/50 border-border/50 flex h-16 w-16 items-center justify-center rounded-[1.5rem] border">
            <UserX className="text-muted-foreground/60 h-8 w-8" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
