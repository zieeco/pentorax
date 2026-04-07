'use client';

/**
 * OffGridPage — Autonomous energy sovereignty
 * Engineered for remote locations and mission-critical independent power.
 * Adheres to 150-line rule.
 */
import { ArrowRight, Battery, MapPin, Radio, Shield, ShieldCheck, Sun, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const features = [
  {
    icon: Battery,
    title: 'Absolute Autonomy',
    desc: 'Zero reliance on external grid infrastructure.',
  },
  {
    icon: Sun,
    title: 'Deep-Cycle Hubs',
    desc: 'High-density LFP arrays for sustained 72-hour discharge.',
  },
  {
    icon: Zap,
    title: 'Weather-Inert',
    desc: 'Hardened enclosures designed for extreme humidity and heat.',
  },
  {
    icon: Shield,
    title: 'Continuous Feed',
    desc: 'Advanced charge orchestration for uninterrupted supply.',
  },
];

export default function OffGridPage() {
  return (
    <div className="bg-background text-foreground min-h-screen pb-24">
      {/* High-Contrast Off-Grid Hero */}
      <section className="bg-brand-dark relative overflow-hidden py-32 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1600&q=40')] bg-cover bg-center opacity-20" />
        <div className="from-brand-dark via-brand-dark/40 absolute inset-0 bg-gradient-to-t to-transparent" />
        <div className="relative z-10 container mx-auto px-4 lg:px-8">
          <Badge className="bg-primary/20 text-primary mb-8 rounded-full border-none px-4 py-1 text-[10px] font-black tracking-widest uppercase italic shadow-sm">
            Phase 4: Autonomous
          </Badge>
          <h1 className="mb-8 text-6xl leading-none font-black tracking-tighter uppercase italic md:text-9xl">
            Zero <br />
            <span className="text-primary not-italic">Grid.</span>
          </h1>
          <p className="text-muted-foreground mb-12 max-w-2xl text-lg leading-relaxed font-medium lowercase">
            Infrastructure-grade power for the edge. Engineered for remote telecommunications,
            research, and luxury isolation.
          </p>
          <Button
            asChild
            className="bg-secondary text-secondary-foreground shadow-secondary/20 hover:text-brand-dark h-20 rounded-[2.5rem] px-16 text-lg font-black tracking-widest uppercase italic shadow-2xl transition-all hover:bg-white"
          >
            <Link href="/contact" className="flex items-center gap-4">
              Initiate Deployment{' '}
              <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Autonomous Capability Matrix */}
      <section className="container mx-auto px-4 py-32 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <Card
              key={i}
              className="bg-card border-border group relative overflow-hidden rounded-[3rem] p-10 shadow-xl transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="bg-muted border-border group-hover:bg-primary group-hover:text-primary-foreground mb-10 flex h-16 w-16 items-center justify-center rounded-[1.5rem] border transition-all duration-500">
                <f.icon className="h-8 w-8" />
              </div>
              <h3 className="text-foreground relative z-10 mb-4 text-2xl font-black lowercase italic">
                {f.title}
              </h3>
              <p className="text-muted-foreground text-[10px] font-black tracking-widest uppercase italic">
                {f.desc}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Deep Technical Integration */}
      <section className="bg-card border-border border-y py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid items-center gap-24 lg:grid-cols-2">
            <div className="group border-muted hover:shadow-primary/10 relative h-[750px] overflow-hidden rounded-[4.5rem] border-[20px] shadow-2xl transition-all">
              <Image
                src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1000&q=80"
                alt="Off-Grid Installation"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="from-brand-dark/60 absolute inset-0 bg-gradient-to-bl to-transparent opacity-60" />
            </div>
            <div>
              <h2 className="text-foreground mb-12 text-5xl leading-none font-black lowercase italic md:text-8xl">
                Unbound <br />
                <span className="text-primary not-italic">Performance.</span>
              </h2>
              <div className="space-y-6">
                {[
                  {
                    icon: MapPin,
                    t: 'Geospatial Agnostic',
                    d: 'Engineered for deployment in any terrain, from desert plains to forest depths.',
                  },
                  {
                    icon: ShieldCheck,
                    t: '72-Hour Reserve',
                    d: 'Massive energy buffering to ensure continuity during prolonged low-irradiance periods.',
                  },
                  {
                    icon: Radio,
                    t: 'Telemetry Link',
                    d: 'Satellite-grade remote monitoring for off-grid system health and optimization.',
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="hover:bg-muted border-border group flex gap-8 rounded-[3rem] border border-transparent p-10 transition-all hover:shadow-lg"
                  >
                    <div className="bg-primary text-primary-foreground flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl shadow-lg transition-transform group-hover:scale-110">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-foreground mb-3 text-[11px] font-black tracking-[0.2em] uppercase italic">
                        {item.t}
                      </h4>
                      <p className="text-muted-foreground text-sm leading-relaxed font-medium lowercase">
                        {item.d}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deployment CTA */}
      <section className="container mx-auto px-4 py-32 lg:px-8">
        <div className="bg-brand-dark relative overflow-hidden rounded-[4.5rem] p-16 text-center text-white shadow-2xl lg:p-32">
          <div className="bg-primary/20 absolute top-0 right-0 -mt-64 -mr-64 h-[800px] w-[800px] rounded-full blur-[160px]" />
          <h2 className="relative z-10 mb-12 text-5xl leading-none font-black tracking-tighter uppercase italic md:text-8xl">
            Command Your <br />
            <span className="text-primary not-italic">Independence.</span>
          </h2>
          <p className="relative z-10 mx-auto mb-16 max-w-3xl text-sm font-black tracking-widest text-white/70 uppercase italic">
            Secure your autonomous energy future today.
          </p>
          <Button
            asChild
            className="bg-secondary text-secondary-foreground shadow-secondary/20 hover:text-brand-dark h-24 rounded-[3rem] px-20 text-lg font-black tracking-widest uppercase italic shadow-2xl transition-all hover:bg-white"
          >
            <Link href="/contact" className="flex items-center gap-6">
              Secure Deployment <ArrowRight className="h-7 w-7" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
