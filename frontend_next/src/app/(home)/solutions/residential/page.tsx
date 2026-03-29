'use client';

/**
 * ResidentialPage — Elite home solar infrastructure
 * Precision-engineered energy independence for modern residences.
 * Adheres to 150-line rule.
 */
import {
  ArrowRight,
  Cpu,
  Home,
  Shield,
  ShieldCheck,
  Smartphone,
  TrendingDown,
  Zap,
} from 'lucide-react';
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
    icon: Shield,
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
    <div className="min-h-screen bg-gray-50/50 pb-24">
      {/* High-Impact Hero */}
      <section className="relative overflow-hidden bg-gray-900 py-32 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1513694490325-244a22538b7a?auto=format&fit=crop&w=1600&q=40')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-transparent" />
        <div className="relative z-10 container mx-auto px-4 lg:px-8">
          <Badge className="bg-primary/20 text-primary mb-8 ml-1 rounded-full border-none px-4 py-1 text-[10px] font-black uppercase">
            Phase 1: Residential
          </Badge>
          <h1 className="mb-8 text-5xl leading-none font-black tracking-tight italic md:text-7xl">
            Grid <br />
            <span className="text-primary not-italic">Independence.</span>
          </h1>
          <p className="mb-12 max-w-xl text-lg leading-relaxed font-medium text-gray-400">
            Transition your residence to a localized power generation hub. Precision
            solar-plus-storage architecture for the modern estate.
          </p>
          <Button
            asChild
            className="bg-secondary shadow-secondary/20 group h-16 rounded-[2rem] px-10 font-black tracking-widest text-gray-900 uppercase shadow-2xl transition-all hover:bg-white"
          >
            <Link href="/contact" className="flex items-center gap-3">
              Initiate Protocol{' '}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Feature Matrix */}
      <section className="container mx-auto px-4 py-24 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <Card
              key={i}
              className="group rounded-[2.5rem] border-gray-100 bg-white p-10 shadow-sm transition-all duration-500 hover:shadow-xl"
            >
              <div className="group-hover:bg-primary/5 mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-gray-100 bg-gray-50 transition-colors">
                <f.icon className="group-hover:text-primary h-6 w-6 text-gray-400 transition-colors" />
              </div>
              <h3 className="mb-3 text-lg font-black text-gray-900 italic">{f.title}</h3>
              <p className="text-sm leading-relaxed font-medium tracking-tight text-gray-500 uppercase">
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
            <div className="relative h-[600px] overflow-hidden rounded-[3rem] border-8 border-gray-50 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1513694490325-244a22538b7a?auto=format&fit=crop&w=1000&q=80"
                alt="Solar Infrastructure"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="mb-8 text-4xl leading-none font-black text-gray-900 italic md:text-6xl">
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
                    className="flex gap-6 rounded-3xl border border-transparent p-6 transition-colors hover:border-gray-100 hover:bg-gray-50"
                  >
                    <div className="bg-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
                      <item.icon className="text-primary h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="mb-1 text-xs font-black tracking-widest text-gray-900 uppercase">
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

      {/* Mission Control CTA */}
      <section className="container mx-auto px-4 py-24 lg:px-8">
        <div className="relative overflow-hidden rounded-[3rem] bg-gray-900 p-12 text-center text-white shadow-2xl lg:p-20">
          <div className="bg-primary/10 absolute top-0 right-0 h-96 w-96 rounded-full blur-[100px]" />
          <h2 className="mb-6 text-4xl font-black italic">Secure Your Portfolio</h2>
          <p className="mx-auto mb-12 max-w-xl text-lg font-medium text-white/50">
            Join the elite network of homeowners transitioning to localized energy production.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-primary h-20 rounded-[2rem] px-12 text-sm font-black tracking-widest text-white uppercase shadow-xl transition-all hover:bg-white hover:text-gray-900"
          >
            <Link href="/contact" className="flex items-center gap-3">
              Commence Integration <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
