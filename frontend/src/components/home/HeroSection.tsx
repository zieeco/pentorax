'use client';

/**
 * HeroSection — Full-screen hero with parallax + animated elements
 * Original: frontend/src/components/landing/Hero.tsx
 * Sub-components: FloatingParticles, EnergyFlows, StatsOverlay (all under 150 lines)
 */
import Link from 'next/link';
import { useEffect, useState } from 'react';

function FloatingParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => (
    <div
      key={i}
      className="absolute h-2 w-2 animate-pulse rounded-full bg-blue-400 opacity-30"
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
      <div className="absolute top-1/4 left-0 h-0.5 w-full animate-pulse bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60" />
      <div
        className="absolute top-2/4 right-0 h-0.5 w-full animate-pulse bg-gradient-to-l from-transparent via-blue-400 to-transparent opacity-40"
        style={{ animationDelay: '1s' }}
      />
      <div
        className="absolute top-3/4 left-0 h-0.5 w-full animate-pulse bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-50"
        style={{ animationDelay: '2s' }}
      />
    </div>
  );
}

function StatsOverlay() {
  return (
    <div className="absolute top-1/4 right-8 transform rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur-sm transition-all duration-1000 hover:scale-105">
      <div className="text-center">
        <div className="text-2xl font-bold text-cyan-300">50%</div>
        <div className="text-xs text-white/80">Energy Costs Saving</div>
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
    <section className="font-quicksand relative h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 text-white">
      <div
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center bg-no-repeat"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 via-blue-900/60 to-gray-800/70" />
      <FloatingParticles />
      <EnergyFlows />
      <StatsOverlay />

      <div className="relative z-10 container mx-auto flex h-full items-center px-4 sm:px-6 lg:px-8">
        <div className="flex w-full flex-col items-center lg:flex-row">
          <div
            className={`transform text-center transition-all duration-1000 lg:w-1/2 lg:text-left ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            <h1 className="mb-6 text-4xl leading-tight font-semibold md:text-5xl lg:text-[3rem]">
              <span className="font-extrabold">Together, Powering a Sustainable Energy Future</span>{' '}
              <br />
              <span className="animate-pulse bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                with Optimal Benefits
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-gray-200 md:text-xl lg:mx-0">
              Enjoy 24/7 uninterrupted power with top-quality and reliable solar solutions.
            </p>
            <div className="mt-8">
              <Link
                href="/contact"
                className="group relative inline-flex transform items-center space-x-3 overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-4 text-lg font-bold text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-cyan-600"
              >
                <span className="relative z-10">Get A Free Quote Today</span>
                <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-white">
                  <div className="h-2 w-2 bg-white" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
