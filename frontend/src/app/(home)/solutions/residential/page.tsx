'use client';

/**
 * ResidentialPage — Elite home solar infrastructure
 * Precision-engineered energy independence for modern residences.
 * Adheres to 150-line rule.
 */
import { ArrowRight, Cpu, ShieldCheck, Smartphone, TrendingDown, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const features = [
  {
    icon: Zap,
    title: 'Stealth Acoustics',
    desc: 'Zero-decibel operation for sensitive residential zones.',
  },
  {
    icon: Smartphone,
    title: 'Neural Control',
    desc: 'AI-driven energy balancing via encrypted mobile link.',
  },
  {
    icon: ShieldCheck,
    title: 'Grid Autonomy',
    desc: 'Seamless failover protocols for absolute energy security.',
  },
  {
    icon: TrendingDown,
    title: 'Capital Efficiency',
    desc: 'Drastic reduction in operational expenditure (OpEx).',
  },
];

export default function ResidentialPage() {
  return (
    <div className="bg-background text-foreground min-h-screen pb-24">
      {/* High-Impact Hero */}
      <section className="bg-brand-dark relative overflow-hidden py-32 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1513694490325-244a22538b7a?auto=format&fit=crop&w=1600&q=40')] bg-cover bg-center opacity-20" />
        <div className="from-brand-dark via-brand-dark/90 absolute inset-0 bg-gradient-to-r to-transparent" />
        <div className="relative z-10 container mx-auto px-4 lg:px-8">
          <Badge className="bg-primary/20 text-primary mb-8 rounded-full border-none px-4 py-1 text-[10px] font-black tracking-widest uppercase italic shadow-sm">
            Phase 1: Residential
          </Badge>
          <h1 className="mb-8 text-6xl leading-none font-black tracking-tighter uppercase italic md:text-9xl">
            Grid <br />
            <span className="text-primary not-italic">Independence.</span>
          </h1>
          <p className="text-muted-foreground mb-12 max-w-2xl text-lg leading-relaxed font-medium lowercase">
            Transition your residence to a localized power generation hub. Precision
            solar-plus-storage architecture for the modern estate.
          </p>
          <Button
            asChild
            className="bg-secondary text-secondary-foreground shadow-secondary/20 hover:text-brand-dark h-20 rounded-[2.5rem] px-16 text-lg font-black tracking-widest uppercase italic shadow-2xl transition-all hover:bg-white"
          >
            <Link href="/contact" className="flex items-center gap-4">
              Initiate Protocol{' '}
              <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Feature Matrix */}
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
                src="https://images.unsplash.com/photo-1513694490325-244a22538b7a?auto=format&fit=crop&w=1000&q=80"
                alt="Solar Architecture"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="from-brand-dark/50 absolute inset-0 bg-gradient-to-tr to-transparent" />
            </div>
            <div>
              <h2 className="text-foreground mb-12 text-5xl leading-none font-black lowercase italic md:text-8xl">
                Total Energy <br />
                <span className="text-primary not-italic">Sovereignty.</span>
              </h2>
              <div className="space-y-6">
                {[
                  {
                    icon: ShieldCheck,
                    t: 'Tier-1 Photovoltaics',
                    d: 'High-density mono-PERC arrays with 25-year structural integrity.',
                  },
                  {
                    icon: Cpu,
                    t: 'Neural Storage',
                    d: 'Lithium Ferro-Phosphate (LiFePO4) storage walls with advanced BMS.',
                  },
                  {
                    icon: Zap,
                    t: 'Intelligent Inversion',
                    d: 'Pure sine-wave hybrid optimization for mission-critical hardware.',
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

      {/* Mission Control CTA */}
      <section className="container mx-auto px-4 py-32 lg:px-8">
        <div className="bg-brand-dark relative overflow-hidden rounded-[4.5rem] p-16 text-center text-white shadow-2xl lg:p-32">
          <div className="bg-primary/20 absolute top-0 right-0 -mt-64 -mr-64 h-[800px] w-[800px] rounded-full blur-[160px]" />
          <h2 className="relative z-10 mb-12 text-5xl leading-none font-black tracking-tighter uppercase italic md:text-8xl">
            Secure Your <br />
            <span className="text-primary not-italic">Portfolio.</span>
          </h2>
          <p className="relative z-10 mx-auto mb-16 max-w-3xl text-2xl leading-relaxed font-medium text-white/70 lowercase">
            Join the elite network of homeowners transitioning to localized energy production.
          </p>
          <Button
            asChild
            className="bg-primary text-primary-foreground h-24 rounded-[3rem] px-20 text-lg font-black tracking-widest uppercase italic shadow-2xl transition-all hover:scale-105"
          >
            <Link href="/contact" className="flex items-center gap-6">
              Commence Integration <ArrowRight className="h-7 w-7" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
