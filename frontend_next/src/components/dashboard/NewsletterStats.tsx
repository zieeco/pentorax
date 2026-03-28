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
      <Card className="bg-brand-indigo group hover:shadow-brand-indigo/10 overflow-hidden rounded-[2.5rem] border-gray-100 shadow-sm transition-all duration-300 hover:shadow-lg">
        <CardContent className="relative p-8">
          <Users className="absolute -right-4 -bottom-4 h-32 w-32 text-white/5 transition-transform duration-500 group-hover:scale-110" />
          <p className="text-[10px] font-black tracking-[0.2em] text-white/60 uppercase">
            Total Audience
          </p>
          <p className="mt-2 text-4xl font-black text-white">{total.toLocaleString()}</p>
        </CardContent>
      </Card>

      <Card className="group overflow-hidden rounded-[2.5rem] border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg">
        <CardContent className="flex items-center justify-between p-8">
          <div>
            <p className="text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase">
              Active Growth
            </p>
            <p className="text-brand-green mt-2 text-4xl font-black">{active.toLocaleString()}</p>
          </div>
          <div className="bg-brand-green/10 flex h-16 w-16 items-center justify-center rounded-[1.5rem]">
            <UserCheck className="text-brand-green h-8 w-8" />
          </div>
        </CardContent>
      </Card>

      <Card className="group overflow-hidden rounded-[2.5rem] border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg">
        <CardContent className="flex items-center justify-between p-8">
          <div>
            <p className="text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase">
              Churn Rate
            </p>
            <p className="mt-2 text-4xl font-black text-gray-400">{inactive.toLocaleString()}</p>
          </div>
          <div className="flex h-16 w-16 items-center justify-center rounded-[1.5rem] border border-gray-100 bg-gray-50">
            <UserX className="h-8 w-8 text-gray-300" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
