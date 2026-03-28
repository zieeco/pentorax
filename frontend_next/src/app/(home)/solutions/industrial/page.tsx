'use client';

/**
 * IndustrialPage — MW-scale solar infrastructure
 * Precision-engineered power systems for heavy manufacturing and data centers.
 * Adheres to 150-line rule.
 */
import { ArrowRight, Cpu, Factory, Gauge, Settings, Shield, ShieldCheck, Zap } from 'lucide-react';
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
    <div className="min-h-screen bg-gray-50/50 pb-24">
      {/* High-Contrast Industrial Hero */}
      <section className="relative overflow-hidden bg-gray-900 py-32 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=40')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-transparent" />
        <div className="relative z-10 container mx-auto px-4 lg:px-8">
          <Badge className="bg-primary/20 text-primary font-sand mb-8 ml-1 rounded-full border-none px-4 py-1 text-[10px] font-black uppercase italic">
            Industrial Phase
          </Badge>
          <h1 className="mb-8 text-5xl leading-none font-black tracking-tight italic md:text-8xl">
            Heavy <br />
            <span className="text-primary not-italic">Infrastructure.</span>
          </h1>
          <p className="mb-12 max-w-xl text-lg leading-relaxed font-medium text-gray-400 uppercase">
            Megawatt-scale energy assets for mission-critical industrial zones. Engineered for
            absolute reliability.
          </p>
          <Button
            asChild
            className="bg-secondary shadow-secondary/20 group h-16 rounded-[2rem] px-12 font-black tracking-widest text-gray-900 uppercase shadow-2xl transition-all hover:bg-white"
          >
            <Link href="/contact" className="flex items-center gap-3 italic">
              Initiate Audit{' '}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Industrial Capability Matrix */}
      <section className="container mx-auto px-4 py-24 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((c, i) => (
            <Card
              key={i}
              className="group hover:border-l-primary rounded-[2.5rem] border-l-4 border-gray-100 border-l-transparent bg-white p-10 shadow-sm transition-all duration-700 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="group-hover:bg-primary mb-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-gray-100 bg-gray-50 shadow-sm transition-all duration-500 group-hover:text-white">
                <c.icon className="h-6 w-6 transition-colors" />
              </div>
              <h3 className="mb-4 text-xl leading-tight font-black text-gray-900 italic">
                {c.title}
              </h3>
              <p className="text-[10px] leading-relaxed font-black tracking-widest text-gray-400 uppercase">
                {c.desc}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Deep Technical Integration */}
      <section className="border-y border-gray-100 bg-white py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid items-center gap-20 lg:grid-cols-2">
            <div className="group relative h-[650px] overflow-hidden rounded-[3rem] border-[16px] border-gray-50 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80"
                alt="Industrial Megawatt Plant"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-gray-900/60 to-transparent" />
            </div>
            <div>
              <h2 className="mb-10 text-4xl leading-none font-black text-gray-900 uppercase italic md:text-6xl">
                Fault-Tolerant <br />
                <span className="text-primary not-italic">Manufacturing.</span>
              </h2>
              <div className="space-y-4">
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
                    className="group flex cursor-default gap-6 rounded-[2.5rem] border-2 border-transparent p-8 transition-all hover:border-gray-100 hover:bg-gray-50"
                  >
                    <div className="group-hover:bg-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gray-900 text-white transition-colors">
                      <span className="text-sm font-black italic">{i + 1}</span>
                    </div>
                    <div>
                      <h4 className="mb-2 text-[11px] leading-none font-black tracking-widest text-gray-900 uppercase italic">
                        {item.t}
                      </h4>
                      <p className="text-sm leading-relaxed font-medium text-gray-500">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industrial CTA Section */}
      <section className="container mx-auto px-4 py-24 lg:px-8">
        <div className="relative overflow-hidden rounded-[4rem] bg-gray-900 p-12 text-center text-white shadow-2xl lg:p-24">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=40')] bg-cover bg-center opacity-10" />
          <div className="bg-primary/20 absolute right-0 bottom-0 -mr-64 -mb-64 h-[800px] w-[800px] rounded-full blur-[160px]" />
          <h2 className="relative z-10 mb-8 text-4xl leading-none font-black tracking-tight uppercase italic md:text-7xl">
            Power Your <br />
            <span className="text-primary">Industrial Future.</span>
          </h2>
          <p className="relative z-10 mx-auto mb-12 max-w-2xl text-sm leading-relaxed font-black tracking-[0.3em] text-white/40 uppercase">
            Secure megawatt-scale energy independence today.
          </p>
          <Button
            asChild
            className="bg-secondary relative z-10 h-20 rounded-[2rem] px-16 text-sm font-black tracking-widest text-gray-900 uppercase shadow-2xl transition-all hover:bg-white"
          >
            <Link href="/contact" className="flex items-center gap-4">
              Initialize Audit <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
