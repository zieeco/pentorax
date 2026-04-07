'use client';

/**
 * CareersPage — Human capital deployment
 * Strategic acquisition of elite talent for the clean-tech revolution.
 * Adheres to 150-line rule.
 */
import { Globe2, Heart, Rocket } from 'lucide-react';
import Link from 'next/link';
import { JobListing } from '@/components/about/JobListing';
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

const perks = [
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
];

export default function CareersPage() {
  const scrollToJobs = () => {
    document.getElementById('job-openings')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-background min-h-screen pb-24">
      {/* High-Stakes Hero */}
      <section className="border-border bg-muted/30 relative overflow-hidden border-b py-32">
        <div className="relative z-10 container mx-auto px-4 text-center lg:px-8">
          <Badge className="bg-primary/20 text-primary mb-8 rounded-full border-none px-4 py-1 text-[10px] font-black tracking-widest uppercase italic">
            Join the Movement
          </Badge>
          <h1 className="text-foreground mb-8 text-6xl leading-none font-black tracking-tighter lowercase italic md:text-8xl">
            Work that <br />
            <span className="text-primary not-italic text-shadow-sm">matters.</span>
          </h1>
          <p className="text-muted-foreground mx-auto mb-16 max-w-2xl text-xl leading-relaxed font-medium lowercase">
            We are acquiring bold thinkers and relentless executors to democratize renewable energy
            assets across the global estate.
          </p>
          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Button
              onClick={scrollToJobs}
              size="lg"
              className="bg-primary shadow-primary/20 hover:bg-brand-dark h-20 rounded-[2rem] px-12 font-black tracking-widest text-white uppercase italic shadow-2xl transition-all"
            >
              View Openings
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-border text-foreground hover:bg-brand-dark h-20 rounded-[2rem] border-2 px-12 font-black tracking-widest uppercase italic transition-all hover:text-white"
            >
              <Link href="/about">Our Culture</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Perk Matrix */}
      <section className="container mx-auto px-4 py-24 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          {perks.map((p, i) => (
            <Card
              key={i}
              className="border-border bg-card group rounded-[3.5rem] p-12 text-center shadow-sm transition-all duration-700 hover:shadow-2xl"
            >
              <div className="mb-10 flex justify-center">
                <div className="bg-muted group-hover:bg-primary/5 flex h-16 w-16 items-center justify-center rounded-2xl transition-colors">
                  <p.icon className="text-muted-foreground group-hover:text-primary h-8 w-8 transition-colors" />
                </div>
              </div>
              <h3 className="text-foreground mb-4 text-2xl leading-none font-black tracking-tighter lowercase italic">
                {p.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-medium tracking-tight lowercase">
                {p.desc}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Deployment Opportunities */}
      <section id="job-openings" className="bg-brand-dark border-y border-white/5 py-24 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="mb-20 text-center text-4xl leading-none font-black tracking-tighter uppercase italic md:text-6xl">
            Open <br />
            <span className="text-primary not-italic">Protocols.</span>
          </h2>
          <div className="mx-auto max-w-4xl space-y-6">
            {jobs.map((job, i) => (
              <JobListing key={i} job={job} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
