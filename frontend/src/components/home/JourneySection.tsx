'use client';

/**
 * JourneySection — Animated count-up stats showing environmental impact
 * Original: frontend/src/components/landing/Journey.tsx
 * CountUp and StatItem extracted as sub-components (all under 150 lines)
 */
import { useEffect, useRef, useState } from 'react';
import { Separator } from '@/components/ui/separator';

function CountUp({
  end,
  decimals = 0,
  suffix = '',
  duration = 2000,
}: {
  end: number;
  decimals?: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(eased * end);
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }, [end, duration, isVisible]);

  return (
    <span ref={ref}>
      {decimals === 0 ? Math.floor(count).toLocaleString() : count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

const STATS = [
  { target: 9.8, decimals: 1, suffix: 'GWh+', label: 'Energy Generated' },
  { target: 9.3, decimals: 1, suffix: 'MWp+', label: 'PV Capacity' },
  { target: 23.8, decimals: 1, suffix: 'MWh+', label: 'Storage (BESS)' },
  { target: 23000, suffix: 'MT+', label: 'CO2 Displaced' },
  { target: 200, suffix: 'k+', label: 'Trees Grown', sublabel: 'Sequestered Carbon Equivalent' },
  { target: 2.2, decimals: 1, suffix: 'M', label: 'Diesel Avoided', sublabel: 'Litres Equivalent' },
];

export function JourneySection() {
  return (
    <section className="bg-background relative overflow-hidden py-16">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'radial-gradient(var(--primary) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        <div className="mb-12 text-center">
          <div className="bg-primary/5 border-primary/10 text-primary mb-4 inline-flex items-center space-x-2 rounded-full border px-3 py-1 text-[9px] font-black tracking-[0.3em]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
              <span className="bg-primary relative inline-flex h-1.5 w-1.5 rounded-full" />
            </span>
            <span>Impact Metrics</span>
          </div>
          <h2 className="font-quicksand text-foreground mb-3 text-3xl font-black tracking-tight lg:text-5xl">
            Our Journey <span className="text-primary">In Numbers</span>
          </h2>
          <div className="bg-primary mx-auto mb-4 h-1 w-12 rounded-full" />
          <p className="text-muted-foreground mx-auto max-w-xl text-base font-medium">
            Reporting our global environmental footprint and key energy milestones achieved through
            continuous innovation.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-3">
          {STATS.map((s, i) => (
            <div key={i} className="group flex flex-col items-center p-2 text-center">
              <div className="text-foreground group-hover:text-primary text-4xl font-black tracking-tighter transition-colors duration-300 lg:text-6xl">
                <CountUp end={s.target} decimals={s.decimals} suffix={s.suffix} />
              </div>
              <p className="font-quicksand text-muted-foreground group-hover:text-foreground text-[11px] font-extrabold tracking-[0.2em] transition-colors">
                {s.label}
              </p>
              {s.sublabel && (
                <p className="text-muted-foreground/70 mx-auto mt-1 max-w-[150px] text-[10px] font-bold">
                  {s.sublabel}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
