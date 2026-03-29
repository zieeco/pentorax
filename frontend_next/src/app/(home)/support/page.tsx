'use client';

/**
 * SupportPage — Mission-critical technical operations
 * Precision-engineered hub for hardware support and diagnostics.
 * Adheres to 150-line rule.
 */
import { Activity, Clock, Phone, ShieldCheck, UserCheck } from 'lucide-react';
import { TicketPortal } from '@/components/resources/TicketPortal';
import { WarrantyChecker } from '@/components/resources/WarrantyChecker';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Ops Center Header */}
      <section className="group border-b border-gray-100 bg-gray-50 py-24">
        <div className="relative container mx-auto px-4 text-center lg:px-8">
          <Badge className="bg-primary/10 text-primary mx-auto mb-8 flex w-fit items-center gap-2 rounded-full border-none px-4 py-1 text-[10px] font-black tracking-widest uppercase italic shadow-inner">
            <Activity className="h-3 w-3 animate-pulse text-green-500" />
            Operations Center Active
          </Badge>
          <h1 className="mb-8 text-5xl leading-none font-black tracking-tighter text-gray-900 lowercase italic md:text-8xl">
            Technical <br />
            <span className="text-primary not-italic">Support.</span>
          </h1>
          <p className="mx-auto max-w-2xl text-xl font-medium text-gray-500 lowercase shadow-sm">
            Real-time troubleshooting and remote diagnostics for your energy assets.
          </p>

          <div className="relative z-10 mt-12 flex flex-wrap justify-center gap-6">
            <Button
              asChild
              variant="outline"
              className="group h-16 rounded-2xl border-gray-100 bg-white px-8 shadow-sm transition-all hover:shadow-xl"
            >
              <a href="tel:+2348081598604" className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 transition-all group-hover:bg-green-600 group-hover:text-white">
                  <Phone className="h-4 w-4 text-green-600 group-hover:text-white" />
                </div>
                <div className="text-left">
                  <p className="text-[9px] font-black text-gray-400 uppercase">Voice Line</p>
                  <p className="text-sm font-black italic">+234 808 159 8604</p>
                </div>
              </a>
            </Button>
            <div className="flex h-16 items-center gap-4 rounded-2xl border border-gray-100 bg-white px-8 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                <Clock className="text-primary h-4 w-4" />
              </div>
              <div className="text-left">
                <p className="text-[9px] font-black text-gray-400 uppercase">Response Offset</p>
                <p className="text-sm font-black italic">~ 4 Minutes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Operations Grid */}
      <section className="container mx-auto px-4 py-24 lg:px-8">
        <div className="grid items-stretch gap-12 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <WarrantyChecker />
          </div>
          <div className="lg:col-span-2">
            <TicketPortal />
          </div>
        </div>
      </section>

      {/* Supporting Infrastructure Value Matrix */}
      <section className="border-t border-gray-50 py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-16 md:grid-cols-3">
            {[
              {
                icon: UserCheck,
                title: 'Field Engineers',
                desc: 'Every agent is a trained hardware tech, not a generic proxy.',
              },
              {
                icon: Activity,
                title: 'Remote Diagnostics',
                desc: 'Resolving 80% of software-related anomalies via neural link.',
              },
              {
                icon: ShieldCheck,
                title: 'Enhanced Cover',
                desc: 'Extend your factory warranty protocols by up to 10 years.',
              },
            ].map((v, i) => (
              <div key={i} className="group flex gap-8">
                <div className="bg-primary/5 group-hover:bg-primary flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.5rem] shadow-inner transition-all group-hover:text-white">
                  <v.icon className="h-7 w-7" />
                </div>
                <div>
                  <h4 className="mb-3 text-xl leading-none font-black tracking-tighter lowercase italic">
                    {v.title}
                  </h4>
                  <p className="text-sm leading-relaxed font-medium tracking-tight text-gray-500 lowercase">
                    {v.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
