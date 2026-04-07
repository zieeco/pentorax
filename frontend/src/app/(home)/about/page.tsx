'use client';

/**
 * AboutPage — The Pentoral Legacy
 * mission-critical transparency for a clean-tech revolution.
 * Adheres to 150-line rule.
 */
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { LeadershipGallery } from '@/components/about/LeadershipGallery';
import { ValueMatrix } from '@/components/about/ValueMatrix';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen pb-24">
      {/* Immersive Hero */}
      <section className="bg-brand-dark relative overflow-hidden py-32 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497440001374-f26997328c1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20" />
        <div className="from-brand-dark via-brand-dark absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t to-transparent" />
        <div className="relative z-10 container mx-auto px-4 text-center lg:px-8">
          <Badge className="bg-primary/20 text-primary mb-8 rounded-full border-none px-4 py-1 text-[10px] font-black uppercase italic">
            The Movement
          </Badge>
          <h1 className="mb-8 text-6xl leading-none font-black tracking-tighter lowercase italic md:text-9xl">
            Our Legacy. <br />
            <span className="text-primary not-italic">Your Future.</span>
          </h1>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed font-medium text-white/70 lowercase">
            PentoraX is more than infrastructure; we are a clean-tech manifestation dedicated to
            powering the global estate with sustainable energy assets.
          </p>
        </div>
      </section>

      {/* Shared Core Values Matrix */}
      <ValueMatrix />

      {/* Leadership Gallery Section */}
      <LeadershipGallery />

      {/* Careers Call-to-Action */}
      <section className="container mx-auto px-4 py-24 lg:px-8">
        <div className="bg-primary relative overflow-hidden rounded-[4rem] p-12 text-center text-white shadow-2xl lg:p-24">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=40')] bg-cover bg-center opacity-10" />
          <h2 className="relative z-10 mb-8 text-4xl leading-none font-black tracking-tighter uppercase italic md:text-7xl">
            Join the <br />
            Revolution.
          </h2>
          <p className="relative z-10 mx-auto mb-12 max-w-xl text-lg leading-relaxed font-medium text-white/85 lowercase">
            Transition your career to clean-tech infrastructure. We are scaling the movement.
          </p>
          <Button
            asChild
            className="hover:bg-brand-dark bg-background text-foreground relative z-10 h-20 rounded-[2rem] px-16 font-black tracking-widest uppercase italic shadow-xl transition-all hover:text-white"
          >
            <Link href="/about/careers" className="flex items-center gap-4">
              View Open Protocols <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
