'use client';

/**
 * TeamPage — Mission-critical human legacy
 * Orchestrates the brilliant minds behind the solar revolution.
 * Adheres to 150-line rule.
 */
import { ArrowLeft, ArrowRight, LifeBuoy } from 'lucide-react';
import Link from 'next/link';
import { DepartmentSection } from '@/components/about/DepartmentSection';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useTeam } from '@/hooks/core-hooks';

export default function TeamPage() {
  const { data: members = [], isLoading, error } = useTeam();
  const departments = Array.from(new Set(members.map((m) => m.department)));

  if (isLoading) return <TeamSkeleton />;
  if (error) return <TeamError />;

  return (
    <div className="bg-background min-h-screen pb-24">
      {/* High-Contrast Header */}
      <section className="bg-brand-dark relative overflow-hidden py-32 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=40')] bg-cover bg-center opacity-10" />
        <div className="relative z-10 container mx-auto px-4 lg:px-8">
          <Button
            asChild
            variant="ghost"
            className="group mb-12 -ml-4 text-white/70 hover:text-white"
          >
            <Link href="/about" className="flex items-center gap-3 italic">
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />{' '}
              Return to Legacy
            </Link>
          </Button>
          <Badge className="bg-primary/20 text-primary mb-8 rounded-full border-none px-4 py-1 text-[10px] font-black uppercase italic">
            Collective Neural Hub
          </Badge>
          <h1 className="mb-8 text-6xl leading-none font-black tracking-tighter lowercase italic md:text-9xl">
            The <br />
            <span className="text-primary not-italic">Visionaries.</span>
          </h1>
          <p className="max-w-2xl text-xl leading-relaxed font-medium text-white/70 lowercase">
            The mission-critical workforce driving the solar revolution across the global estate.
          </p>
        </div>
      </section>

      {/* Render Departments */}
      {departments.length > 0 ? (
        departments.map((dept) => (
          <DepartmentSection
            key={dept}
            department={dept}
            members={members.filter((m) => m.department === dept)}
          />
        ))
      ) : (
        <EmptyTeam />
      )}

      {/* Career Deployment CTA */}
      <section className="container mx-auto px-4 py-24 lg:px-8">
        <div className="bg-brand-dark relative overflow-hidden rounded-[4rem] p-12 text-center text-white shadow-2xl lg:p-24">
          <div className="bg-primary/20 absolute top-0 left-0 -mt-64 -ml-64 h-[600px] w-[600px] rounded-full blur-[140px]" />
          <h2 className="relative z-10 mb-8 text-4xl font-black tracking-tighter uppercase italic md:text-7xl">
            Deploy Your <br />
            <span className="text-primary not-italic">Potential.</span>
          </h2>
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-background hover:text-foreground relative z-10 h-20 rounded-[2rem] px-16 font-black tracking-widest text-white uppercase italic shadow-xl transition-all"
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

function TeamSkeleton() {
  return (
    <div className="bg-background min-h-screen">
      <div className="bg-brand-dark py-32">
        <div className="container mx-auto px-4">
          <Skeleton className="bg-muted/20 h-32 w-3/4" />
        </div>
      </div>
      <div className="container mx-auto grid gap-10 px-4 py-24 md:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-[450px] rounded-[2.5rem]" />
        ))}
      </div>
    </div>
  );
}

function TeamError() {
  return (
    <div className="bg-muted/30 flex h-screen flex-col items-center justify-center p-8 text-center">
      <LifeBuoy className="text-primary animate-spin-slow mb-6 h-16 w-16" />
      <h2 className="text-foreground mb-4 text-2xl font-black italic">Neural Link Severed</h2>
      <p className="text-muted-foreground mb-8 max-w-sm">
        Failed to synchronize team member assets. System integrity compromised.
      </p>
      <Button
        onClick={() => window.location.reload()}
        className="bg-brand-dark h-14 rounded-xl px-10 font-black text-white italic"
      >
        Retry Protocol
      </Button>
    </div>
  );
}

function EmptyTeam() {
  return (
    <div className="py-32 text-center">
      <p className="text-muted-foreground text-xs font-black tracking-widest uppercase italic">
        No active personnel in current hub.
      </p>
    </div>
  );
}
