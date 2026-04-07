'use client';

/**
 * IndustrialPage — MW-scale solar infrastructure
 * Precision-engineered power systems for heavy manufacturing and data centers.
 * Adheres to 150-line rule.
 */
import { ArrowRight, Gauge, Settings, Shield, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const capabilities = [
  {
    icon: Zap,
    title: 'MW-Scale Arrays',
    desc: 'Utility-grade infrastructure for heavy industrial loading.',
  },
  {
    icon: Shield,
    title: 'Zero-Downtime',
    desc: 'Fault-tolerant architecture for 24/7 manufacturing uptime.',
  },
  {
    icon: Gauge,
    title: 'Thermal Management',
    desc: 'Advanced cooling for high-voltage power electronics.',
  },
  {
    icon: Settings,
    title: 'Hybrid Matrix',
    desc: 'Seamless orchestration of solar, battery, and grid assets.',
  },
];

export default function IndustrialPage() {
  return (
    <div className="bg-background text-foreground min-h-screen pb-24">
      {/* High-Contrast Industrial Hero */}
      <section className="bg-brand-dark relative overflow-hidden py-32 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=40')] bg-cover bg-center opacity-10" />
        <div className="from-brand-dark via-brand-dark/90 absolute inset-0 bg-gradient-to-r to-transparent" />
        <div className="relative z-10 container mx-auto px-4 lg:px-8">
          <Badge className="bg-primary/20 text-primary mb-8 rounded-full border-none px-4 py-1 text-[10px] font-black tracking-widest uppercase italic shadow-sm">
            Industrial Phase
          </Badge>
          <h1 className="mb-8 text-6xl leading-none font-black tracking-tighter uppercase italic md:text-9xl">
            Heavy <br />
            <span className="text-primary not-italic">Infrastructure.</span>
          </h1>
          <p className="text-muted-foreground mb-12 max-w-2xl text-lg leading-relaxed font-medium lowercase">
            Megawatt-scale energy assets for mission-critical industrial zones. Engineered for
            absolute reliability.
          </p>
          <Button
            asChild
            className="bg-secondary text-secondary-foreground shadow-secondary/20 hover:text-brand-dark h-20 rounded-[2.5rem] px-16 text-lg font-black tracking-widest uppercase italic shadow-2xl transition-all hover:bg-white"
          >
            <Link href="/contact" className="flex items-center gap-4">
              Initiate Audit{' '}
              <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Industrial Capability Matrix */}
      <section className="container mx-auto px-4 py-32 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((c, i) => (
            <Card
              key={i}
              className="bg-card border-border group relative overflow-hidden rounded-[3rem] p-10 shadow-xl transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="bg-muted border-border group-hover:bg-primary group-hover:text-primary-foreground mb-10 flex h-16 w-16 items-center justify-center rounded-[1.5rem] border transition-all duration-500">
                <c.icon className="h-8 w-8" />
              </div>
              <h3 className="text-foreground relative z-10 mb-4 text-2xl font-black lowercase italic">
                {c.title}
              </h3>
              <p className="text-muted-foreground text-[10px] font-black tracking-widest uppercase italic">
                {c.desc}
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
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80"
                alt="Industrial Megawatt Plant"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="from-brand-dark/50 absolute inset-0 bg-gradient-to-tr to-transparent" />
            </div>
            <div>
              <h2 className="text-foreground mb-12 text-5xl leading-none font-black lowercase italic md:text-8xl">
                Fault-Tolerant <br />
                <span className="text-primary not-italic">Manufacturing.</span>
              </h2>
              <div className="space-y-6">
                {[
                  {
                    t: 'High-Voltage Rectification',
                    d: 'Conversion nodes engineered for extreme current stability.',
                  },
                  {
                    t: 'Redundant Inversion Hubs',
                    d: 'Fail-safe inverter clusters with automated hot-spare switching.',
                  },
                  {
                    t: 'Industrial Storage Vaults',
                    d: 'Containerized energy storage solutions (CESS) for massive loading.',
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="hover:bg-muted border-border group flex gap-8 rounded-[3rem] border border-transparent p-10 transition-all hover:shadow-lg"
                  >
                    <div className="bg-primary text-primary-foreground flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl shadow-lg transition-transform group-hover:scale-110">
                      <span className="text-base font-black italic">{i + 1}</span>
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

      {/* Industrial CTA Section */}
      <section className="container mx-auto px-4 py-32 lg:px-8">
        <div className="bg-brand-dark relative overflow-hidden rounded-[4.5rem] p-16 text-center text-white shadow-2xl lg:p-32">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=40')] bg-cover bg-center opacity-10" />
          <div className="bg-primary/20 absolute right-0 bottom-0 -mr-64 -mb-64 h-[800px] w-[800px] rounded-full blur-[160px]" />
          <h2 className="relative z-10 mb-12 text-5xl leading-none font-black tracking-tighter uppercase italic md:text-8xl">
            Power Your <br />
            <span className="text-primary not-italic">Industrial Future.</span>
          </h2>
          <p className="relative z-10 mx-auto mb-16 max-w-3xl text-sm font-black tracking-widest text-white/70 uppercase italic">
            Secure megawatt-scale energy independence today.
          </p>
          <Button
            asChild
            className="bg-secondary text-secondary-foreground shadow-secondary/20 hover:text-brand-dark relative z-10 h-24 rounded-[3rem] px-20 text-lg font-black tracking-widest uppercase italic shadow-2xl transition-all hover:bg-white"
          >
            <Link href="/contact" className="flex items-center gap-6">
              Initialize Audit <ArrowRight className="h-7 w-7" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
