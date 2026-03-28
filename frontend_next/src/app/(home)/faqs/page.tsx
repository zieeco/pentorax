'use client';

/**
 * FAQsPage — Mission-critical knowledge hub
 * Precision-engineered repository for solar infrastructure intelligence.
 * Adheres to 150-line rule.
 */
import { ArrowRight, BookOpen, FileText, Headset, HelpCircle, Search } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { FAQItem } from '@/components/resources/FAQItem';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useFAQs } from '@/hooks/core-hooks';

export default function FAQsPage() {
  const [search, setSearch] = useState('');
  const { data: faqs = [], isLoading } = useFAQs({ search });

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Search Hero */}
      <section className="relative overflow-hidden border-b border-gray-100 bg-gray-50/50 py-32">
        <div className="relative z-10 container mx-auto px-4 text-center lg:px-8">
          <Badge className="bg-primary/20 text-primary mb-8 rounded-full border-none px-4 py-1 text-[10px] font-black uppercase italic">
            Knowledge Protocol
          </Badge>
          <h1 className="mb-12 text-6xl leading-none font-black tracking-tighter text-gray-900 lowercase italic md:text-9xl">
            Knowledge <br />
            <span className="text-primary not-italic">Matrix.</span>
          </h1>
          <div className="group relative mx-auto max-w-2xl">
            <div className="group-focus-within:text-primary pointer-events-none absolute inset-y-0 left-6 flex items-center text-gray-400 transition-colors">
              <Search className="h-5 w-5" />
            </div>
            <Input
              placeholder="Search for intelligence..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="focus:ring-primary/10 h-20 w-full rounded-[2rem] border-gray-100 bg-white pr-8 pl-16 text-lg font-black lowercase italic shadow-2xl transition-all focus:ring-4"
            />
          </div>
        </div>
      </section>

      {/* Navigation Matrix */}
      <section className="container mx-auto px-4 py-24 lg:px-8">
        <div className="mb-32 grid gap-12 md:grid-cols-3">
          {[
            {
              id: 'support',
              icon: BookOpen,
              title: 'User Manuals',
              desc: 'Step-by-step operating protocols for smart infrastructure.',
              color: 'text-primary',
            },
            {
              id: 'contact',
              icon: Headset,
              title: 'Nexus Support',
              desc: 'Synchronize with energy specialists for 24/7 technical aid.',
              color: 'text-secondary',
            },
            {
              id: 'case-studies',
              icon: FileText,
              title: 'Asset Logs',
              desc: 'Validated performance metrics from successfully deployed hubs.',
              color: 'text-blue-500',
            },
          ].map((item, i) => (
            <Link
              key={i}
              href={`/${item.id}`}
              className="group rounded-[3.5rem] border border-gray-100 bg-white p-12 shadow-sm transition-all duration-700 hover:shadow-2xl"
            >
              <div
                className={`group-hover:bg-primary mb-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-50 shadow-inner transition-all group-hover:text-white`}
              >
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-4 text-2xl leading-none font-black tracking-tighter lowercase italic">
                {item.title}
              </h3>
              <p className="mb-8 text-sm leading-relaxed font-medium text-gray-500 lowercase">
                {item.desc}
              </p>
              <div className="text-primary flex items-center gap-3 text-[10px] font-black tracking-widest uppercase italic transition-transform group-hover:translate-x-2">
                Browse Repository <ArrowRight className="h-3 w-3" />
              </div>
            </Link>
          ))}
        </div>

        {/* FAQ Repository */}
        <div className="mx-auto max-w-4xl">
          <div className="mb-16 flex items-center gap-6">
            <HelpCircle className="text-primary shadow-primary/20 h-8 w-8 shadow-lg" />
            <h2 className="text-4xl leading-none font-black tracking-tighter lowercase italic">
              Frequent <span className="text-primary not-italic">Inquiries.</span>
            </h2>
          </div>

          <div className="relative rounded-[3rem] border border-gray-100 bg-white p-4 shadow-2xl lg:p-12">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <HelpCircle className="h-32 w-32" />
            </div>
            {isLoading ? (
              <p className="py-12 text-center text-xs font-black text-gray-400 uppercase">
                Synchronizing Repository...
              </p>
            ) : faqs.length > 0 ? (
              faqs.map((f, i) => <FAQItem key={i} question={f.question} answer={f.answer} />)
            ) : (
              <p className="py-12 text-center text-xs font-black text-gray-400 uppercase">
                No matching intelligence found.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Global Reach CTA */}
      <section className="relative overflow-hidden border-t border-white/5 bg-gray-900 py-32">
        <div className="relative z-10 container mx-auto px-4 text-center lg:px-8">
          <h2 className="mb-12 text-5xl font-black tracking-tighter text-white uppercase italic md:text-7xl">
            Still Seek <br />
            <span className="text-primary not-italic">Guidance?</span>
          </h2>
          <Button
            asChild
            size="lg"
            className="bg-secondary h-24 rounded-[2.5rem] px-16 font-black tracking-[0.2em] text-gray-900 uppercase italic shadow-2xl transition-all hover:bg-white"
          >
            <Link href="/contact" className="flex items-center gap-6">
              Initialize Expert Link <ArrowRight className="h-6 w-6" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
