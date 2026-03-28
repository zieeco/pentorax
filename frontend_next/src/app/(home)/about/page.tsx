'use client';

/**
 * AboutPage — The Pentoral Legacy
 * mission-critical transparency for a clean-tech revolution.
 * Adheres to 150-line rule.
 */
import { ArrowRight, ShieldCheck, Target, Users, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const values = [
  {
    icon: Target,
    title: 'Strategic Mission',
    desc: 'Accelerating the global transition to localized renewable energy via intelligent infrastructure.',
  },
  {
    icon: ShieldCheck,
    title: 'Architectural Vision',
    desc: 'A world where power is a clean, abundant resource integrated into the global substrate.',
  },
  {
    icon: Zap,
    title: 'Neural Innovation',
    desc: 'Leveraging AI-driven energy grids to optimize consumption across international borders.',
  },
];

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

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Immersive Hero */}
      <section className="relative overflow-hidden bg-gray-900 py-32 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497440001374-f26997328c1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-gray-900 via-gray-900 to-transparent" />
        <div className="relative z-10 container mx-auto px-4 text-center lg:px-8">
          <Badge className="bg-primary/20 text-primary mb-8 rounded-full border-none px-4 py-1 text-[10px] font-black uppercase italic">
            The Movement
          </Badge>
          <h1 className="mb-8 text-6xl leading-none font-black tracking-tighter lowercase italic md:text-9xl">
            Our Legacy. <br />
            <span className="text-primary not-italic">Your Future.</span>
          </h1>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed font-medium text-white/50 lowercase">
            PentoraX is more than infrastructure; we are a clean-tech manifestation dedicated to
            powering the global estate with sustainable energy assets.
          </p>
        </div>
      </section>

      {/* Core Values Matrix */}
      <section className="container mx-auto px-4 py-24 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          {values.map((v, i) => (
            <Card
              key={i}
              className="group relative overflow-hidden rounded-[3rem] border-none bg-gray-50 p-10 shadow-sm transition-all hover:shadow-2xl"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 transition-opacity group-hover:opacity-20">
                <v.icon className="h-16 w-16" />
              </div>
              <div className="relative z-10">
                <div className="bg-primary shadow-primary/20 mb-8 flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-lg">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="mb-4 text-2xl leading-tight font-black tracking-tighter text-gray-900 uppercase italic">
                  {v.title}
                </h3>
                <p className="leading-relaxed font-medium tracking-tight text-gray-500 lowercase">
                  {v.desc}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Leadership Gallery */}
      <section className="border-y border-gray-100 bg-gray-50 py-24">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <h2 className="mb-4 text-4xl leading-none font-black tracking-tighter text-gray-900 uppercase italic md:text-6xl">
            The <span className="text-primary not-italic">Visionaries.</span>
          </h2>
          <p className="mb-20 text-[10px] font-black tracking-[0.4em] text-gray-400 uppercase">
            Mission-critical expertise behind the revolution
          </p>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {leadership.map((member, i) => (
              <div key={i} className="group text-left">
                <div className="group-hover:border-primary relative mb-6 h-96 overflow-hidden rounded-[2.5rem] border-4 border-white shadow-xl transition-all duration-1000">
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    className="object-cover grayscale transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0"
                  />
                </div>
                <h4 className="text-xl font-black tracking-tighter text-gray-900 lowercase italic">
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
              className="hover:bg-primary h-16 rounded-2xl bg-gray-900 px-12 font-black tracking-widest text-white uppercase transition-all"
            >
              <Link href="/about/team" className="flex items-center gap-4 italic">
                Command Center <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Careers Call-to-Action */}
      <section className="container mx-auto px-4 py-24 lg:px-8">
        <div className="bg-primary relative overflow-hidden rounded-[4rem] p-12 text-center text-white shadow-2xl lg:p-24">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=40')] bg-cover bg-center opacity-10" />
          <h2 className="relative z-10 mb-8 text-4xl leading-none font-black tracking-tighter uppercase italic md:text-7xl">
            Join the <br />
            Revolution.
          </h2>
          <p className="relative z-10 mx-auto mb-12 max-w-xl text-lg leading-relaxed font-medium text-white/70 lowercase">
            Transition your career to clean-tech infrastructure. We are scaling the movement.
          </p>
          <Button
            asChild
            className="relative z-10 h-20 rounded-[2rem] bg-white px-16 font-black tracking-widest text-gray-900 uppercase italic shadow-xl transition-all hover:bg-gray-900 hover:text-white"
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
