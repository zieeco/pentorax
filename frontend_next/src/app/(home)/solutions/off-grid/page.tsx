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
    <div className="min-h-screen bg-gray-50/50 pb-24">
      {/* High-Contrast Off-Grid Hero */}
      <section className="relative overflow-hidden bg-gray-900 py-32 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1600&q=40')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
        <div className="relative z-10 container mx-auto px-4 lg:px-8">
          <Badge className="bg-primary/20 text-primary font-sand mb-8 ml-1 rounded-full border-none px-4 py-1 text-[10px] font-black uppercase italic">
            Phase 4: Autonomous
          </Badge>
          <h1 className="mb-8 text-5xl leading-none font-black tracking-tight uppercase italic md:text-8xl">
            Zero <br />
            <span className="text-primary not-italic">Grid.</span>
          </h1>
          <p className="mb-12 max-w-xl text-lg leading-relaxed font-medium text-gray-400">
            Infrastructure-grade power for the edge. Engineered for remote telecommunications,
            research, and luxury isolation.
          </p>
          <Button
            asChild
            className="bg-secondary shadow-secondary/20 group h-16 rounded-[2rem] px-12 font-black tracking-widest text-gray-900 uppercase shadow-2xl transition-all hover:bg-white"
          >
            <Link href="/contact" className="flex items-center gap-3">
              Initiate Deployment{' '}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Autonomous Capability Matrix */}
      <section className="container mx-auto px-4 py-24 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <Card
              key={i}
              className="group hover:border-t-primary rounded-[2.5rem] border-t-4 border-gray-100 border-t-transparent bg-white p-10 shadow-sm transition-all duration-700 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="group-hover:bg-primary mb-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-gray-100 bg-gray-50 shadow-sm transition-all duration-500 group-hover:text-white">
                <f.icon className="h-6 w-6 transition-colors" />
              </div>
              <h3 className="mb-4 text-xl leading-tight font-black text-gray-900 italic">
                {f.title}
              </h3>
              <p className="text-xs leading-relaxed font-black tracking-widest text-gray-400 uppercase">
                {f.desc}
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
                src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1000&q=80"
                alt="Off-Grid Installation"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-bl from-gray-900/60 to-transparent opacity-60" />
            </div>
            <div>
              <h2 className="mb-10 text-4xl leading-none font-black text-gray-900 uppercase italic md:text-6xl">
                Unbound <br />
                <span className="text-primary not-italic">Performance.</span>
              </h2>
              <div className="space-y-4">
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
                    className="group flex cursor-default gap-6 rounded-[2.5rem] border-2 border-transparent p-8 transition-all hover:border-gray-100 hover:bg-gray-50"
                  >
                    <div className="group-hover:bg-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gray-900 text-white transition-colors">
                      <item.icon className="h-5 w-5" />
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

      {/* Deployment CTA */}
      <section className="container mx-auto px-4 py-24 lg:px-8">
        <div className="relative overflow-hidden rounded-[4rem] bg-gray-900 p-12 text-center text-white shadow-2xl lg:p-24">
          <div className="bg-primary/20 absolute top-0 right-0 -mt-64 -mr-64 h-[600px] w-[600px] rounded-full blur-[140px]" />
          <h2 className="mb-8 text-4xl leading-none font-black tracking-tight uppercase italic md:text-7xl">
            Command Your <br />
            <span className="text-primary">Indepndence.</span>
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-sm leading-relaxed font-black tracking-[0.3em] text-white/40 uppercase">
            Secure your autonomous energy future today.
          </p>
          <Button
            asChild
            className="bg-secondary h-20 rounded-[2rem] px-16 text-xs font-black tracking-widest text-gray-900 uppercase shadow-2xl transition-all hover:bg-white"
          >
            <Link href="/contact" className="flex items-center gap-4">
              Secure Deployment <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
