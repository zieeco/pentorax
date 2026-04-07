'use client';

/**
 * SolutionsPage — The Pentoral Core Infrastructure Hub
 * High-stakes architectural overview of tailored energy solutions.
 * Adheres to 150-line rule.
 */
import { ArrowRight, Building2, Factory, Home, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

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
    <div className="bg-background min-h-screen">
      {/* Immersive Header */}
      <section className="bg-brand-dark relative overflow-hidden py-32 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=40')] bg-cover bg-center opacity-10" />
        <div className="relative z-10 container mx-auto px-4 text-center lg:px-8">
          <Badge className="bg-primary/20 text-primary mb-8 rounded-full border-none px-4 py-1 text-[10px] font-black tracking-widest uppercase italic">
            Architecture Hub
          </Badge>
          <h1 className="mb-8 text-6xl leading-none font-black tracking-tighter uppercase italic md:text-9xl">
            Tailored <br />
            <span className="text-primary not-italic">Infrastructure.</span>
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl font-medium lowercase">
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
                <div className="bg-primary shadow-primary/20 text-primary-foreground flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg">
                  <sector.icon className="h-7 w-7" />
                </div>
                <span className="text-muted-foreground text-[10px] font-black tracking-[0.3em] uppercase italic">
                  {sector.title} Phase
                </span>
              </div>
              <h2 className="text-foreground mb-8 text-4xl leading-none font-black tracking-tighter lowercase italic md:text-7xl">
                {sector.title} <span className="text-primary not-italic">Optimization.</span>
              </h2>
              <p className="text-muted-foreground mb-10 text-lg leading-relaxed font-medium lowercase">
                {sector.desc} Transitioning to a decentralized power model with Tier-1 energy
                assets.
              </p>
              <div className="mb-12 grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((_, j) => (
                  <div
                    key={j}
                    className="border-border bg-muted hover:bg-primary/5 flex items-center gap-3 rounded-[1.5rem] border p-5 transition-colors"
                  >
                    <ShieldCheck className="text-primary h-5 w-5" />
                    <span className="text-muted-foreground text-[10px] font-black tracking-widest uppercase italic">
                      Validated Proto {j + 1}
                    </span>
                  </div>
                ))}
              </div>
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground h-20 rounded-2xl px-12 font-black tracking-widest uppercase italic shadow-lg transition-all hover:scale-105"
              >
                <Link href={`/solutions/${sector.id}`} className="flex items-center gap-4">
                  Explore {sector.title}{' '}
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
            <div className="group border-muted hover:shadow-primary/10 relative h-[600px] overflow-hidden rounded-[3.5rem] border-8 shadow-2xl transition-all lg:w-1/2">
              <Image
                src={sector.img}
                alt={sector.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="from-brand-dark/90 absolute inset-x-0 bottom-0 bg-gradient-to-t to-transparent p-10">
                <Badge className="border-white/10 bg-white/10 text-[10px] font-black tracking-widest text-white uppercase italic backdrop-blur-md">
                  Asset: {sector.id}_infra_v1
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Mission Critical CTA */}
      <section className="bg-brand-dark relative overflow-hidden py-32">
        <div className="bg-primary/20 absolute top-0 right-0 -mt-64 -mr-64 h-[800px] w-[800px] rounded-full blur-[160px]" />
        <div className="relative z-10 container mx-auto px-4 text-center lg:px-8">
          <h2 className="mb-12 text-5xl font-black tracking-tighter text-white uppercase italic md:text-8xl">
            Initiate <br />
            <span className="text-primary not-italic">Integration.</span>
          </h2>
          <Button
            asChild
            size="lg"
            className="bg-secondary text-secondary-foreground shadow-secondary/20 hover:text-brand-dark h-24 rounded-[2.5rem] px-16 text-lg font-black tracking-widest uppercase italic shadow-2xl transition-all hover:bg-white"
          >
            <Link href="/contact" className="flex items-center gap-4">
              Secure Audit Protocol <ArrowRight className="h-7 w-7" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
