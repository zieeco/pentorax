'use client';

/**
 * CareersPage — Human capital deployment
 * Strategic acquisition of elite talent for the clean-tech revolution.
 * Adheres to 150-line rule.
 */
import { ArrowRight, Briefcase, Globe2, Heart, Rocket } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const jobs = [
  {
    title: 'Solar PV Design Engineer',
    type: 'Full-time',
    location: 'Lagos, NG',
    dept: 'Engineering',
  },
  { title: 'Senior Full-stack Developer', type: 'Remote', location: 'Global', dept: 'Digital Ops' },
  { title: 'Customer Experience Lead', type: 'Full-time', location: 'Abuja, NG', dept: 'Sales' },
  {
    title: 'Project Operations Manager',
    type: 'Full-time',
    location: 'Nairobi, KE',
    dept: 'Operations',
  },
];

export default function CareersPage() {
  const scrollToJobs = () => {
    document.getElementById('job-openings')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* High-Stakes Hero */}
      <section className="relative overflow-hidden border-b border-gray-100 bg-gray-50/50 py-32">
        <div className="relative z-10 container mx-auto px-4 text-center lg:px-8">
          <Badge className="bg-primary/20 text-primary mb-8 rounded-full border-none px-4 py-1 text-[10px] font-black tracking-widest uppercase italic">
            Join the Movement
          </Badge>
          <h1 className="mb-8 text-6xl leading-none font-black tracking-tighter text-gray-900 lowercase italic md:text-8xl">
            Work that <br />
            <span className="text-primary not-italic text-shadow-sm">matters.</span>
          </h1>
          <p className="mx-auto mb-16 max-w-2xl text-xl leading-relaxed font-medium text-gray-500 lowercase">
            We are acquiring bold thinkers and relentless executors to democratize renewable energy
            assets across the global estate.
          </p>
          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Button
              onClick={scrollToJobs}
              size="lg"
              className="bg-primary shadow-primary/20 h-20 rounded-[2rem] px-12 font-black tracking-widest text-white uppercase italic shadow-2xl transition-all hover:bg-gray-900"
            >
              View Openings
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-20 rounded-[2rem] border-2 border-gray-200 px-12 font-black tracking-widest text-gray-900 uppercase italic transition-all hover:bg-gray-900 hover:text-white"
            >
              <Link href="/about">Our Culture</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Perk Matrix */}
      <section className="container mx-auto px-4 py-24 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          {[
            {
              icon: Heart,
              title: 'Health Protocol',
              desc: 'Comprehensive medical coverage and family wellness assets.',
            },
            {
              icon: Rocket,
              title: 'Rapid Scaling',
              desc: 'High-velocity career trajectory with clear leadership cut-over.',
            },
            {
              icon: Globe2,
              title: 'Network-First',
              desc: 'Flexible work orchestration and global co-working stipends.',
            },
          ].map((p, i) => (
            <Card
              key={i}
              className="group rounded-[3.5rem] border-gray-100 bg-white p-12 text-center shadow-sm transition-all duration-700 hover:shadow-2xl"
            >
              <div className="mb-10 flex justify-center">
                <div className="group-hover:bg-primary/5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-50 transition-colors">
                  <p.icon className="group-hover:text-primary h-8 w-8 text-gray-400 transition-colors" />
                </div>
              </div>
              <h3 className="mb-4 text-2xl leading-none font-black tracking-tighter lowercase italic">
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed font-medium tracking-tight text-gray-500 lowercase">
                {p.desc}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Deployment Opportunities */}
      <section id="job-openings" className="border-y border-white/5 bg-gray-900 py-24 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="mb-20 text-center text-4xl leading-none font-black tracking-tighter uppercase italic md:text-6xl">
            Open <br />
            <span className="text-primary not-italic">Protocols.</span>
          </h2>
          <div className="mx-auto max-w-4xl space-y-6">
            {jobs.map((job, i) => (
              <div
                key={i}
                className="group flex flex-col justify-between rounded-[2.5rem] border border-white/10 bg-white/5 p-10 shadow-2xl backdrop-blur-sm transition-all duration-500 hover:bg-white hover:text-gray-900 md:flex-row md:items-center"
              >
                <div className="mb-6 md:mb-0">
                  <Badge className="bg-primary/20 text-primary mb-3 border-none text-[9px] font-black tracking-widest uppercase italic">
                    Division: {job.dept}
                  </Badge>
                  <h4 className="text-2xl leading-none font-black tracking-tighter lowercase italic">
                    {job.title}
                  </h4>
                  <div className="mt-4 flex flex-wrap gap-6 text-xs font-black tracking-widest text-white/40 uppercase group-hover:text-gray-500">
                    <span className="flex items-center gap-2">
                      <Briefcase className="h-3 w-3" /> {job.type}
                    </span>
                    <span>Location: {job.location}</span>
                  </div>
                </div>
                <Button
                  asChild
                  variant="ghost"
                  className="text-primary hover:bg-primary/10 p-0 font-black tracking-widest uppercase italic transition-colors group-hover:text-gray-900 md:p-6"
                >
                  <Link href="/contact" className="flex items-center gap-3">
                    Initiate Apply{' '}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
