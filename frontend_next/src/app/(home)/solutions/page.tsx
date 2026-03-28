'use client';

/**
 * SolutionsPage — The Pentoral Core Infrastructure Hub
 * High-stakes architectural overview of tailored energy solutions.
 * Adheres to 150-line rule.
 */
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle,
  Factory,
  Home,
  ShieldCheck,
  SunMedium,
  Zap,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const sectors = [
  {
    id: 'residential',
    icon: Home,
    title: 'Residential',
    desc: 'Elite home solar infrastructure for modern estates.',
    img: 'https://images.unsplash.com/photo-1513694490325-244a22538b7a?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'commercial',
    icon: Building2,
    title: 'Commercial',
    desc: 'Corporate OpEx optimization through localized energy.',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'industrial',
    icon: Factory,
    title: 'Industrial',
    desc: 'Megawatt-scale resiliency for manufacturing hubs.',
    img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80',
  },
];

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Immersive Header */}
      <section className="relative overflow-hidden bg-gray-900 py-32 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=40')] bg-cover bg-center opacity-10" />
        <div className="relative z-10 container mx-auto px-4 text-center lg:px-8">
          <Badge className="bg-primary/20 text-primary mb-8 rounded-full border-none px-4 py-1 text-[10px] font-black uppercase italic">
            Architecture Hub
          </Badge>
          <h1 className="mb-8 text-6xl leading-none font-black tracking-tighter italic md:text-9xl">
            Tailored <br />
            <span className="text-primary not-italic">Infrastructure.</span>
          </h1>
          <p className="mx-auto max-w-2xl text-xl font-medium text-white/50 lowercase">
            Localized energy production across the entire industrial spectrum.
          </p>
        </div>
      </section>

      {/* Solutions Spectrum */}
      <section className="space-y-32 py-32">
        {sectors.map((sector, i) => (
          <div
            key={sector.id}
            className={`container mx-auto px-4 lg:px-8 ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''} flex flex-col items-center gap-20 lg:flex-row`}
          >
            <div className="lg:w-1/2">
              <div className="mb-8 flex items-center gap-4">
                <div className="bg-primary shadow-primary/20 flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-lg">
                  <sector.icon className="h-6 w-6" />
                </div>
                <span className="text-xs font-black tracking-[0.3em] text-gray-400 uppercase">
                  {sector.title} Phase
                </span>
              </div>
              <h2 className="mb-8 text-4xl leading-none font-black tracking-tighter text-gray-900 lowercase italic md:text-6xl">
                {sector.title} <span className="text-primary">Optimization.</span>
              </h2>
              <p className="mb-10 text-lg leading-relaxed font-medium tracking-tight text-gray-500 lowercase">
                {sector.desc} Transitioning to a decentralized power model with Tier-1 energy
                assets.
              </p>
              <div className="mb-12 grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((_, j) => (
                  <div
                    key={j}
                    className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-4"
                  >
                    <ShieldCheck className="text-primary h-4 w-4" />
                    <span className="text-[10px] font-black text-gray-400 uppercase">
                      Validated Proto {j + 1}
                    </span>
                  </div>
                ))}
              </div>
              <Button
                asChild
                size="lg"
                className="hover:bg-primary h-16 rounded-2xl bg-gray-900 px-10 font-black tracking-widest text-white uppercase italic transition-all"
              >
                <Link href={`/solutions/${sector.id}`} className="flex items-center gap-3">
                  Explore {sector.title} <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="group relative h-[550px] overflow-hidden rounded-[3rem] border-8 border-gray-50 shadow-2xl lg:w-1/2">
              <Image
                src={sector.img}
                alt={sector.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-gray-900/80 to-transparent p-8">
                <Badge className="border-white/20 bg-white/20 text-white backdrop-blur-md">
                  Asset: {sector.id}_infra_v1
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Mission Critical CTA */}
      <section className="relative overflow-hidden bg-gray-900 py-32">
        <div className="bg-primary/20 absolute top-0 right-0 -mt-64 -mr-64 h-[800px] w-[800px] rounded-full blur-[160px]" />
        <div className="relative z-10 container mx-auto px-4 text-center lg:px-8">
          <h2 className="mb-12 text-5xl font-black tracking-tighter text-white uppercase italic md:text-7xl">
            Initiate <br />
            <span className="text-primary not-italic">Integration.</span>
          </h2>
          <Button
            asChild
            size="lg"
            className="bg-secondary shadow-secondary/20 h-24 rounded-[2rem] px-16 text-lg font-black tracking-widest text-gray-900 uppercase italic shadow-2xl transition-all hover:bg-white"
          >
            <Link href="/contact" className="flex items-center gap-4">
              Secure Audit Protocol <ArrowRight className="h-6 w-6" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
