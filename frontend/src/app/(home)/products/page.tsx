'use client';

/**
 * ProductsPage — Hardware Catalog
 * Premium overview of Tier-1 solar hardware components.
 * Adheres to 150-line rule.
 */
import { ArrowRight, Factory, ShieldCheck, ShoppingCart, Star, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const hardware = [
  {
    name: 'PX-550 Series Mono-PERC',
    category: 'Panels',
    price: '₦185,000',
    rating: 5,
    specs: '550W peak power, 21.7% Efficiency',
    img: 'https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=600&q=80',
    link: '/shop',
  },
  {
    name: 'Titan Hybrid Inverter v3',
    category: 'Inverters',
    price: '₦1,450,000',
    rating: 4.9,
    specs: '10kW Single Phase, Smart IoT',
    img: 'https://images.unsplash.com/photo-1620214948402-b1324422333d?auto=format&fit=crop&w=600&q=80',
    link: '/shop',
  },
  {
    name: 'PentoraX LiFePO4 Wall',
    category: 'Storage',
    price: '₦2,100,000',
    rating: 5,
    specs: '5.1kWh, 6000+ Cycles',
    img: 'https://images.unsplash.com/photo-1611317546394-0495349e7f9d?auto=format&fit=crop&w=600&q=80',
    link: '/shop',
  },
  {
    name: 'Smart Energy Optimizer',
    category: 'Accessories',
    price: '₦125,000',
    rating: 4.8,
    specs: 'Real-time AI balancing',
    img: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=600&q=80',
    link: '/shop',
  },
];

export default function ProductsPage() {
  const [filter, setFilter] = useState('All');
  const items = filter === 'All' ? hardware : hardware.filter((h) => h.category === filter);

  return (
    <div className="min-h-screen bg-gray-50/50 pb-24">
      {/* Immersive Banner */}
      <div className="relative overflow-hidden bg-gray-900 py-32 text-white">
        <div className="bg-primary/10 absolute top-0 right-0 -mt-96 -mr-96 h-[800px] w-[800px] rounded-full blur-[160px]" />
        <div className="relative z-10 container mx-auto px-4 lg:px-8">
          <Badge className="bg-primary/20 text-primary mb-6 rounded-full border-none px-4 py-1 text-[10px] font-black uppercase">
            Tier-1 Hardware
          </Badge>
          <h1 className="mb-6 text-5xl leading-none font-black tracking-tight md:text-7xl">
            Hardware <br />
            <span className="text-primary italic">Catalog.</span>
          </h1>
          <p className="max-w-xl text-lg leading-relaxed font-medium text-gray-400">
            Sourced from elite global manufacturers. Stress-tested in PentoraX labs for
            Africa&apos;s harshest environments.
          </p>
        </div>
      </div>

      {/* Filter Matrix */}
      <div className="relative z-20 container mx-auto -mt-8 px-4 lg:px-8">
        <div className="mb-16 flex w-fit flex-wrap gap-3 rounded-[2rem] border border-gray-100 bg-white/80 p-3 shadow-xl shadow-gray-200/50 backdrop-blur-xl">
          {['All', 'Panels', 'Inverters', 'Storage', 'Accessories'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-2xl px-8 py-3 text-[10px] font-black tracking-widest uppercase transition-all ${filter === f ? 'bg-gray-900 text-white shadow-lg' : 'text-gray-400 hover:text-gray-900'}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Catalog Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {items.map((p, i) => (
            <div
              key={i}
              className="group flex flex-col overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white shadow-sm transition-all duration-700 hover:shadow-2xl"
            >
              <Link href={p.link} className="relative h-72 overflow-hidden bg-gray-100">
                <Image
                  src={p.img}
                  alt={p.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                  <Badge className="rounded-full border-none bg-white/90 px-4 text-[9px] font-black text-gray-900 uppercase shadow-sm backdrop-blur-md">
                    {p.category}
                  </Badge>
                  <Badge className="bg-primary/90 rounded-full border-none px-4 text-[9px] font-black text-white uppercase shadow-sm backdrop-blur-md">
                    Verified
                  </Badge>
                </div>
              </Link>
              <div className="flex flex-1 flex-col p-10">
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, idx) => (
                    <Star
                      key={idx}
                      className={`h-3 w-3 ${idx < Math.floor(p.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-100'}`}
                    />
                  ))}
                </div>
                <h3 className="group-hover:text-primary mb-2 truncate text-xl leading-tight font-black text-gray-900 transition-colors">
                  {p.name}
                </h3>
                <p className="mb-8 text-xs leading-relaxed font-bold tracking-widest text-gray-400 uppercase">
                  {p.specs}
                </p>
                <div className="mt-auto flex items-center justify-between border-t border-gray-50 pt-6">
                  <span className="text-2xl font-black text-gray-900 italic">{p.price}</span>
                  <Button
                    size="icon"
                    className="hover:bg-primary h-12 w-12 rounded-2xl bg-gray-900 shadow-xl shadow-gray-200 transition-all group-hover:scale-110"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enterprise CTA */}
      <div className="container mx-auto mt-24 px-4 lg:px-8">
        <div className="bg-primary shadow-primary/20 relative overflow-hidden rounded-[3rem] p-12 text-white shadow-2xl lg:p-20">
          <div className="absolute top-0 right-0 -mt-32 -mr-32 h-96 w-96 rounded-full bg-white/10 blur-[100px]" />
          <div className="relative z-10 grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-4xl leading-none font-black tracking-tight italic md:text-6xl">
                Procurement Guidance Required?
              </h2>
              <p className="max-w-xl text-lg font-medium text-white/80">
                Our technical advisory council provides precision analysis for industrial and
                commercial scale solar infrastructure.
              </p>
            </div>
            <div className="flex flex-col gap-6 sm:flex-row lg:justify-end">
              <div className="flex items-center gap-4 rounded-[2rem] border border-white/20 bg-white/10 p-6 backdrop-blur-md">
                <ShieldCheck className="text-secondary h-8 w-8" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-black tracking-widest uppercase">
                    Warranty Matrix
                  </span>
                  <span className="font-black italic">25YR COVERAGE</span>
                </div>
              </div>
              <Button className="bg-secondary h-20 rounded-[2rem] px-12 text-sm font-black tracking-widest text-gray-900 uppercase shadow-xl transition-all hover:bg-white">
                Consult Expert
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
