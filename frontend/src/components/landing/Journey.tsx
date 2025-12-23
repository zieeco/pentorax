
import React, { useState, useEffect, useRef } from 'react';

interface CountUpProps {
  end: number;
  decimals?: number;
  suffix?: string;
  duration?: number;
}

const CountUp: React.FC<CountUpProps> = ({ end, decimals = 0, suffix = "", duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Easing function: easeOutExpo
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(easedProgress * end);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration, isVisible]);

  return (
    <span ref={countRef}>
      {decimals === 0 
        ? Math.floor(count).toLocaleString() 
        : count.toFixed(decimals)}
      {suffix}
    </span>
  );
};

interface StatItemProps {
  target: number;
  decimals?: number;
  suffix: string;
  label: string;
  sublabel?: string;
}

const StatItem: React.FC<StatItemProps> = ({ target, decimals = 0, suffix, label, sublabel }) => (
  <div className="group flex flex-col items-center text-center p-2">
    <div className="space-y-0.5">
      <div className="text-4xl lg:text-6xl font-black text-gray-900 tracking-tighter transition-colors duration-300 group-hover:text-primary">
        <CountUp end={target} decimals={decimals} suffix={suffix} />
      </div>
      <p className="text-[11px] font-extrabold text-gray-500 uppercase tracking-[0.2em] transition-colors group-hover:text-gray-900">
        {label}
      </p>
      {sublabel && (
        <p className="text-[10px] font-bold text-gray-400 italic mt-1 max-w-[150px] mx-auto">
          {sublabel}
        </p>
      )}
    </div>
  </div>
);

const Journey: React.FC = () => {
  const stats = [
    { 
      target: 9.8, 
      decimals: 1,
      suffix: "GWh+", 
      label: "Energy Generated"
    },
    { 
      target: 9.3, 
      decimals: 1,
      suffix: "MWp+", 
      label: "PV Capacity"
    },
    { 
      target: 23.8, 
      decimals: 1,
      suffix: "MWh+", 
      label: "Storage (BESS)"
    },
    { 
      target: 23000, 
      decimals: 0,
      suffix: "MT+", 
      label: "CO2 Displaced"
    },
    { 
      target: 200, 
      decimals: 0,
      suffix: "k+", 
      label: "Trees Grown", 
      sublabel: "Sequestered Carbon Equivalent"
    },
    { 
      target: 2.2, 
      decimals: 1,
      suffix: "M", 
      label: "Diesel Avoided", 
      sublabel: "Litres Equivalent"
    }
  ];

  return (
    <section className="relative py-16 bg-white overflow-hidden font-sand">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0052CC 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
      <div className="absolute top-0 right-0 w-1/4 h-1/4 bg-gradient-to-bl from-primary/5 to-transparent blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-secondary/5 to-transparent blur-3xl"></div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-[9px] font-black uppercase tracking-[0.3em] mb-4">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
            </span>
            <span>Impact Metrics</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mb-3 tracking-tight">
            Our Journey <span className="text-primary">In Numbers</span>
          </h2>
          <div className="h-1 w-12 bg-primary mx-auto rounded-full mb-4"></div>
          <p className="text-base text-gray-500 max-w-xl mx-auto font-medium leading-snug">
            Reporting our global environmental footprint and key energy milestones achieved through continuous innovation.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {stats.map((stat, index) => (
            <StatItem 
              key={index}
              target={stat.target}
              decimals={stat.decimals}
              suffix={stat.suffix}
              label={stat.label}
              sublabel={stat.sublabel}
            />
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-[9px] font-bold uppercase tracking-widest">
            Verified by PentoraX Labs 2024
          </p>
          <div className="flex items-center space-x-4">
            <span className="text-[9px] font-black text-gray-300 uppercase">Tier 1 Compliance</span>
            <div className="h-4 w-px bg-gray-200"></div>
            <span className="text-[9px] font-black text-gray-300 uppercase">ISO 14001 Standards</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;
