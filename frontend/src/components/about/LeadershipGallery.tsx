'use client';

import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const leadership = [
  {
    name: 'Dr. Sarah Chen',
    role: 'Chief Executive',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Marcus Adebayo',
    role: 'Head of Infrastructure',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Elena Rodriguez',
    role: 'Operations Lead',
    img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Julian Smith',
    role: 'Principal Engineer',
    img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
  },
];

export function LeadershipGallery() {
  return (
    <section className="border-border bg-muted/30 border-y py-24">
      <div className="container mx-auto px-4 text-center lg:px-8">
        <h2 className="text-foreground mb-4 text-4xl leading-none font-black tracking-tighter uppercase italic md:text-6xl">
          The <span className="text-primary not-italic">Visionaries.</span>
        </h2>
        <p className="text-muted-foreground mb-20 text-[10px] font-black tracking-[0.4em] uppercase">
          Mission-critical expertise behind the revolution
        </p>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {leadership.map((member, i) => (
            <div key={i} className="group text-left">
              <div className="group-hover:border-primary border-background relative mb-6 h-96 overflow-hidden rounded-[2.5rem] border-4 shadow-xl transition-all duration-1000">
                <Image
                  src={member.img}
                  alt={member.name}
                  fill
                  className="object-cover grayscale transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0"
                />
              </div>
              <h4 className="text-foreground text-xl font-black tracking-tighter lowercase italic">
                {member.name}
              </h4>
              <p className="text-primary text-[10px] font-black tracking-widest uppercase">
                {member.role}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-20">
          <Button
            asChild
            className="hover:bg-brand-dark/90 bg-brand-dark h-16 rounded-2xl px-12 font-black tracking-widest text-white uppercase transition-all"
          >
            <Link href="/about/team" className="flex items-center gap-4 italic">
              Command Center <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
