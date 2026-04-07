'use client';

/**
 * CommercialPage — Business energy optimization
 * Maximizing corporate profitability through localized solar infrastructure.
 * Adheres to 150-line rule.
 */
import { ArrowRight, Award, BarChart3, Clock, ShieldCheck, TrendingDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const benefits = [
  {
    icon: TrendingDown,
    title: '40% OpEx Reduction',
    desc: 'Drastically slash overhead through self-generation.',
  },
  {
    icon: Clock,
    title: 'High-Velocity ROI',
    desc: 'Capital recovery within an aggressive 4-6 year window.',
  },
  {
    icon: BarChart3,
    title: 'Peak Shaving',
    desc: 'AI-driven load balancing to bypass premium tariff blocks.',
  },
  {
    icon: Award,
    title: 'ESG Leadership',
    desc: 'Secure industry-leading sustainability credentials.',
  },
];

export default function CommercialPage() {
  return (
    <div className="bg-background min-h-screen pb-24">
      {/* High-Contrast Corporate Hero */}
      <section className="bg-brand-dark relative overflow-hidden py-32 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=40')] bg-cover bg-center opacity-10" />
        <div className="from-brand-dark via-brand-dark absolute inset-0 bg-gradient-to-b to-transparent" />
        <div className="relative z-10 container mx-auto px-4 lg:px-8">
          <Badge className="bg-primary/20 text-primary mb-8 rounded-full border-none px-4 py-1 text-[10px] font-black tracking-widest uppercase italic">
            Enterprise Phase
          </Badge>
          <h1 className="mb-8 text-6xl leading-none font-black tracking-tighter uppercase italic md:text-9xl">
            Corporate <br />
            <span className="text-primary not-italic">Optimization.</span>
          </h1>
          <p className="text-muted-foreground mb-12 max-w-2xl text-lg leading-relaxed font-medium lowercase">
            Infrastructure-scale solar solutions for the modern corporation. Hedging against energy
            volatility with precision-engineered hardware.
          </p>
          <Button
            asChild
            className="bg-secondary text-secondary-foreground shadow-secondary/20 hover:text-brand-dark h-20 rounded-[2.5rem] px-16 text-lg font-black tracking-widest uppercase italic shadow-2xl transition-all hover:bg-white"
          >
            <Link href="/contact" className="flex items-center gap-4">
              Request Audit <ArrowRight className="h-6 w-6" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Corporate Benefit Matrix */}
      <section className="container mx-auto px-4 py-32 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <Card
              key={i}
              className="bg-card border-border group relative overflow-hidden rounded-[3rem] p-10 shadow-xl transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="bg-muted border-border group-hover:bg-primary group-hover:text-primary-foreground mb-10 flex h-16 w-16 items-center justify-center rounded-[1.5rem] border transition-all duration-500">
                <b.icon className="h-8 w-8" />
              </div>
              <h3 className="text-foreground relative z-10 mb-4 text-2xl font-black lowercase italic">
                {b.title}
              </h3>
              <p className="text-muted-foreground text-[10px] font-black tracking-widest uppercase italic">
                {b.desc}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Industrial Scale Validation */}
      <section className="bg-card border-border border-y py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid items-center gap-24 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <h2 className="text-foreground mb-12 text-5xl leading-none font-black lowercase italic md:text-8xl">
                Industrial-Grade <br />
                <span className="text-primary not-italic">Resiliency.</span>
              </h2>
              <div className="space-y-6">
                {[
                  {
                    t: 'Tier-1 Module Deployment',
                    d: 'Utility-scale bifacial arrays for maximum irradiance capture.',
                  },
                  {
                    t: 'Advanced Power Analytics',
                    d: 'Cloud-integrated performance metrics and predictive maintenance.',
                  },
                  {
                    t: 'Infrastructure Integration',
                    d: 'Seamless cut-over protocols for high-availability IT & hardware zones.',
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
            <div className="group border-muted hover:shadow-primary/10 relative order-1 h-[750px] overflow-hidden rounded-[4.5rem] border-[20px] shadow-2xl transition-all lg:order-2">
              <Image
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80"
                alt="Corporate Energy Hub"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="from-brand-dark/50 absolute inset-0 bg-gradient-to-t to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise CTA Matrix */}
      <section className="container mx-auto px-4 py-32 lg:px-8">
        <div className="bg-brand-dark relative overflow-hidden rounded-[4.5rem] p-16 text-center text-white shadow-2xl lg:p-32">
          <div className="bg-primary/20 absolute top-0 left-0 -mt-64 -ml-64 h-[800px] w-[800px] rounded-full blur-[160px]" />
          <h2 className="relative z-10 mb-12 text-5xl leading-none font-black tracking-tighter uppercase italic md:text-8xl">
            Optimize Your <br />
            Energy <span className="text-primary not-italic">Portfolio.</span>
          </h2>
          <p className="relative z-10 mx-auto mb-16 max-w-3xl text-2xl font-medium text-white/70 lowercase">
            hedging against grid instability with Tier-1 energy assets.
          </p>
          <Button
            asChild
            className="bg-primary text-primary-foreground h-24 rounded-[3rem] px-20 text-lg font-black tracking-widest uppercase italic shadow-2xl transition-all hover:scale-105"
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
