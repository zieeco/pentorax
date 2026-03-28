'use client';

/**
 * CaseStudiesPage — Mission-critical asset logs
 * Precision-engineered repository for institutional knowledge and performance metrics.
 * Adheres to 150-line rule.
 */
import { ArrowRight, TrendingUp, Zap } from 'lucide-react';
import Link from 'next/link';
import { CaseStudyCard } from '@/components/resources/CaseStudyCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const caseStudies = [
  {
    id: 1,
    title: 'Lagos Office Solar Installation',
    description:
      'Complete solar transformation for a 5-story commercial building in Victoria Island',
    image:
      'https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?auto=format&fit=crop&w=800&q=80',
    location: 'Lagos, Nigeria',
    capacity: '250kW',
    savings: '65% reduction in energy costs',
  },
  {
    id: 2,
    title: 'Factory Rooftop Solar Array',
    description: 'Industrial-scale solar installation for manufacturing facility',
    image:
      'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80',
    location: 'Ogun State, Nigeria',
    capacity: '500kW',
    savings: '70% reduction in operational costs',
  },
  {
    id: 3,
    title: 'Off-Grid Solar System',
    description: 'Complete off-grid solution for remote telecommunications tower',
    image:
      'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80',
    location: 'Abuja, Nigeria',
    capacity: '100kW',
    savings: '100% diesel elimination',
  },
  {
    id: 4,
    title: 'Residential Estate Solar Project',
    description: 'Community solar installation for 50-home residential estate',
    image:
      'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80',
    location: 'Lekki, Lagos',
    capacity: '150kW',
    savings: '60% reduction in electricity bills',
  },
  {
    id: 5,
    title: 'Hospital Hybrid Solar System',
    description: 'Critical power backup with solar and battery storage',
    image:
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80',
    location: 'Port Harcourt, Nigeria',
    capacity: '300kW',
    savings: '55% cost savings with 24/7 reliability',
  },
  {
    id: 6,
    title: 'Shopping Mall Solar Installation',
    description: 'Large-scale commercial solar for major retail center',
    image:
      'https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=800&q=80',
    location: 'Abuja, Nigeria',
    capacity: '400kW',
    savings: '68% reduction in energy expenses',
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-white pb-24">
      {/* High-Stakes Hero */}
      <section className="relative overflow-hidden bg-gray-900 py-32 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=1600&q=40')] bg-cover bg-center opacity-20" />
        <div className="relative z-10 container mx-auto px-4 text-center lg:px-8">
          <Badge className="bg-primary/20 text-primary mb-8 rounded-full border-none px-4 py-1 text-[10px] font-black tracking-widest uppercase italic shadow-sm">
            Validated Results
          </Badge>
          <h1 className="mb-8 text-6xl leading-none font-black tracking-tighter lowercase italic md:text-9xl">
            Our Success <br />
            <span className="text-primary not-italic">Stories.</span>
          </h1>
          <p className="mx-auto max-w-2xl text-xl font-medium text-white/50 lowercase shadow-sm">
            Verified metrics from Businesses and Estates across the global network.
          </p>
        </div>
      </section>

      {/* Narrative Matrix */}
      <section className="container mx-auto px-4 py-24 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((study) => (
            <CaseStudyCard key={study.id} study={study} />
          ))}
        </div>
      </section>

      {/* Transition CTA */}
      <section className="group relative overflow-hidden border-y border-gray-100 bg-gray-50 py-32">
        <div className="bg-primary/5 group-hover:bg-primary/10 absolute top-0 right-0 h-[40rem] w-[40rem] translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px] transition-all duration-1000" />
        <div className="relative z-10 container mx-auto px-4 text-center lg:px-8">
          <h2 className="mb-12 text-5xl leading-none font-black tracking-tighter text-gray-900 uppercase italic md:text-7xl">
            Ready to <br />
            <span className="text-primary not-italic">Deploy?</span>
          </h2>
          <Button
            asChild
            size="lg"
            className="hover:bg-primary group h-24 rounded-[2.5rem] bg-gray-900 px-16 text-white italic shadow-2xl transition-all"
          >
            <Link href="/contact" className="flex items-center gap-6">
              Initialize Deployment{' '}
              <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-2" />
            </Link>
          </Button>
          <p className="mt-8 text-xs font-black tracking-[0.3em] text-gray-400 uppercase italic">
            Join 500+ satisfied asset holders.
          </p>
        </div>
      </section>
    </div>
  );
}
