'use client';

/**
 * CommercialPage — Business energy optimization
 * Maximizing corporate profitability through localized solar infrastructure.
 * Adheres to 150-line rule.
 */
import {
  ArrowRight,
  Award,
  BarChart3,
  Building2,
  Clock,
  ShieldCheck,
  TrendingDown,
  Zap,
} from 'lucide-react';
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
    <div className="min-h-screen bg-gray-50/50 pb-24">
      {/* High-Contrast Corporate Hero */}
      <section className="relative overflow-hidden bg-gray-900 py-32 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=40')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-transparent" />
        <div className="relative z-10 container mx-auto px-4 lg:px-8">
          <Badge className="bg-primary/20 text-primary font-sand mb-8 ml-1 rounded-full border-none px-4 py-1 text-[10px] font-black uppercase italic">
            Enterprise Phase
          </Badge>
          <h1 className="mb-8 text-5xl leading-none font-black tracking-tight italic md:text-8xl">
            Corporate <br />
            <span className="text-primary not-italic">Optimization.</span>
          </h1>
          <p className="mb-12 max-w-xl text-lg leading-relaxed font-medium text-gray-400">
            Infrastructure-scale solar solutions for the modern corporation. Hedging against energy
            volatility with precision-engineered hardware.
          </p>
          <Button
            asChild
            className="bg-secondary shadow-secondary/20 group h-16 rounded-[2rem] px-12 font-black tracking-widest text-gray-900 uppercase shadow-2xl transition-all hover:bg-white"
          >
            <Link href="/contact" className="flex items-center gap-3 italic">
              Request Audit{' '}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Corporate Benefit Matrix */}
      <section className="container mx-auto px-4 py-24 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <Card
              key={i}
              className="group hover:border-b-primary rounded-[2.5rem] border-b-4 border-gray-100 border-b-transparent bg-white p-10 shadow-sm transition-all duration-700 hover:shadow-xl"
            >
              <div className="group-hover:bg-primary mb-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-gray-100 bg-gray-50 shadow-sm transition-all duration-500 group-hover:text-white">
                <b.icon className="h-6 w-6 transition-colors" />
              </div>
              <h3 className="mb-4 text-xl leading-tight font-black text-gray-900 italic">
                {b.title}
              </h3>
              <p className="text-xs leading-relaxed font-black tracking-widest text-gray-400 uppercase">
                {b.desc}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Industrial Scale Validation */}
      <section className="border-y border-gray-100 bg-white py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid items-center gap-20 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <h2 className="mb-10 text-4xl leading-none font-black text-gray-900 italic md:text-6xl">
                Industrial-Grade <br />
                <span className="text-primary not-italic">Resiliency.</span>
              </h2>
              <div className="space-y-4">
                {[
                  {
                    t: 'Tier-1 Module Deployment',
                    d: 'Utility-scale bifacial arrays for maximum irradiance capture.',
                  },
                  {
                    icon: ShieldCheck,
                    t: 'Advanced Power Analytics',
                    d: 'Cloud-integrated performance metrics and predictive maintenance.',
                  },
                  {
                    icon: Zap,
                    t: 'Infrastructure Integration',
                    d: 'Seamless cut-over protocols for high-availability IT & hardware zones.',
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="group flex gap-6 rounded-[2.5rem] border border-transparent p-8 transition-all hover:border-gray-100 hover:bg-gray-50"
                  >
                    <div className="group-hover:bg-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-900 text-white transition-colors">
                      <span className="text-xs font-black italic">{i + 1}</span>
                    </div>
                    <div>
                      <h4 className="mb-2 text-[10px] font-black tracking-widest text-gray-900 uppercase italic">
                        {item.t}
                      </h4>
                      <p className="text-sm leading-relaxed font-medium text-gray-500">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="group relative order-1 h-[650px] overflow-hidden rounded-[3rem] border-[16px] border-gray-50 shadow-2xl lg:order-2">
              <Image
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80"
                alt="Corporate Energy Hub"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise CTA Matrix */}
      <section className="container mx-auto px-4 py-24 lg:px-8">
        <div className="relative overflow-hidden rounded-[3rem] bg-gray-900 p-12 text-center text-white shadow-2xl lg:p-24">
          <div className="bg-primary/20 absolute top-0 left-0 -mt-64 -ml-64 h-[600px] w-[600px] rounded-full blur-[140px]" />
          <h2 className="mb-8 text-4xl leading-none font-black tracking-tight uppercase italic md:text-6xl">
            Optimize Your <br />
            Energy <span className="text-primary">Portfolio.</span>
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-xl leading-relaxed font-medium text-white/60 lowercase">
            hedging against grid instability with Tier-1 energy assets.
          </p>
          <Button
            asChild
            className="bg-primary h-20 rounded-[2rem] px-16 text-xs font-black tracking-[0.2em] text-white uppercase shadow-2xl transition-all hover:bg-white hover:text-gray-900 active:scale-95"
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
