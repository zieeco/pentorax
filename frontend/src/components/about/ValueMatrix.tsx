'use client';

import { ShieldCheck, Target, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';

const values = [
  {
    icon: Target,
    title: 'Strategic Mission',
    desc: 'Accelerating the global transition to localized renewable energy via intelligent infrastructure.',
  },
  {
    icon: ShieldCheck,
    title: 'Architectural Vision',
    desc: 'A world where power is a clean, abundant resource integrated into the global substrate.',
  },
  {
    icon: Zap,
    title: 'Neural Innovation',
    desc: 'Leveraging AI-driven energy grids to optimize consumption across international borders.',
  },
];

export function ValueMatrix() {
  return (
    <section className="container mx-auto px-4 py-24 lg:px-8">
      <div className="grid gap-12 md:grid-cols-3">
        {values.map((v, i) => (
          <Card
            key={i}
            className="border-border bg-muted/50 group relative overflow-hidden rounded-[3rem] border-none p-10 shadow-sm transition-all hover:shadow-2xl"
          >
            <div className="text-foreground absolute top-0 right-0 p-8 opacity-10 transition-opacity group-hover:opacity-20">
              <v.icon className="h-16 w-16" />
            </div>
            <div className="relative z-10">
              <div className="bg-primary shadow-primary/20 text-primary-foreground mb-8 flex h-12 w-12 items-center justify-center rounded-xl shadow-lg">
                <v.icon className="h-5 w-5" />
              </div>
              <h3 className="text-foreground mb-4 text-2xl leading-tight font-black tracking-tighter uppercase italic">
                {v.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed font-medium tracking-tight lowercase">
                {v.desc}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
