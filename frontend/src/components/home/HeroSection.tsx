'use client';

/**
 * HeroSection — Full-screen hero with parallax + animated elements
 * Original: frontend/src/components/landing/Hero.tsx
 * Sub-components: FloatingParticles, EnergyFlows, StatsOverlay (all under 150 lines)
 */
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

function FloatingParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => (
    <div
      key={i}
      className="bg-primary absolute h-2 w-2 animate-pulse rounded-full opacity-30"
      style={{
        left: `${(i * 5.3) % 100}%`,
        top: `${(i * 7.7) % 100}%`,
        animationDelay: `${(i * 0.15) % 3}s`,
      }}
    />
  ));
  return <>{particles}</>;
}

function EnergyFlows() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="text-primary absolute top-1/4 left-0 h-0.5 w-full animate-pulse bg-gradient-to-r from-transparent via-current to-transparent opacity-60" />
      <div
        className="text-secondary absolute top-2/4 right-0 h-0.5 w-full animate-pulse bg-gradient-to-l from-transparent via-current to-transparent opacity-40"
        style={{ animationDelay: '1s' }}
      />
      <div
        className="text-primary absolute top-3/4 left-0 h-0.5 w-full animate-pulse bg-gradient-to-r from-transparent via-current to-transparent opacity-50"
        style={{ animationDelay: '2s' }}
      />
    </div>
  );
}

function StatsOverlay() {
  return (
    <div className="border-border/10 bg-background/5 absolute top-1/4 right-8 transform rounded-lg border p-4 backdrop-blur-sm transition-all duration-1000 hover:scale-105">
      <div className="text-center">
        <div className="text-primary text-2xl font-black italic">50%</div>
        <div className="text-[10px] font-black tracking-widest text-white/70 uppercase">
          Energy Costs Saving
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsVisible(true));
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="bg-brand-dark relative h-screen overflow-hidden text-white">
      <div
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center bg-no-repeat opacity-60"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      />
      <div className="from-brand-dark via-brand-dark/50 absolute inset-0 bg-gradient-to-r to-transparent" />
      <FloatingParticles />
      <EnergyFlows />
      <StatsOverlay />

      <div className="relative z-10 container mx-auto flex h-full items-center px-4 sm:px-6 lg:px-8">
        <div className="flex w-full flex-col items-center lg:flex-row">
          <div
            className={`transform text-center transition-all duration-1000 lg:w-3/5 lg:text-left ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            <h1 className="font-quicksand mb-8 text-5xl leading-none font-black tracking-tighter md:text-7xl lg:text-[4rem]">
              Together, powering a <br />
              <span className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-transparent">
                sustainable energy future
              </span>{' '}
              <br />
              <span className="animate-pulse">with optimal benefits</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg font-medium text-white/70 md:text-xl lg:mx-0">
              Enjoy 24/7 uninterrupted power with top-quality and reliable solar solutions.
            </p>
            <div className="mt-12">
              <Link
                href="/contact"
                className="bg-primary text-primary-foreground group hover:bg-primary/90 relative inline-flex transform items-center space-x-4 overflow-hidden rounded-2xl px-10 py-5 text-lg font-black tracking-widest shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <span className="font-quicksand relative z-10">Get A Free Quote Today</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
