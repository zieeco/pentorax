/**
 * ContactSection — 2-col contact CTA section
 * Original: frontend/src/components/landing/Contact.tsx (108 lines — compliant)
 * Uses shadcn Button + Next.js Link
 */
import { ArrowRight, Clock, Mail, Phone, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function ContactSection() {
  return (
    <section className="relative overflow-hidden bg-white py-24 text-neutral-900">
      <div className="bg-primary/5 pointer-events-none absolute top-0 left-1/4 h-96 w-96 rounded-full blur-[128px]" />
      <div className="bg-secondary/5 pointer-events-none absolute right-1/4 bottom-0 h-96 w-96 rounded-full blur-[128px]" />

      <div className="relative z-10 container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left */}
          <div className="space-y-8">
            <div className="bg-primary/10 text-primary border-primary/10 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
                <span className="bg-primary relative inline-flex h-2 w-2 rounded-full" />
              </span>
              Available Now
            </div>
            <div className="space-y-4">
              <h2 className="text-4xl leading-[1.1] font-bold tracking-tight text-neutral-900 lg:text-5xl">
                Questions? <br />
                <span className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-transparent">
                  Let&apos;s Solve Them.
                </span>
              </h2>
              <p className="max-w-xl text-lg leading-relaxed text-neutral-600">
                Our team of energy experts is ready to analyze your needs and design the perfect
                solar solution for your home or business.
              </p>
            </div>
            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 h-14 rounded-full px-8 text-base text-white shadow-lg"
                asChild
              >
                <Link href="/contact">
                  Book Free Consultation <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <div className="flex h-14 items-center gap-4 rounded-full border border-neutral-200 bg-neutral-100 px-6">
                <Phone className="text-primary h-5 w-5" />
                <span className="font-medium text-neutral-900">+234 808 159 8604</span>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="grid gap-4">
            <div className="group hover:border-primary/20 relative rounded-3xl border border-neutral-200 bg-neutral-50 p-6 transition-all duration-500 hover:bg-white hover:shadow-xl">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110">
                  <Phone className="text-primary h-6 w-6" />
                </div>
                <div>
                  <h3 className="group-hover:text-primary mb-1 text-lg font-semibold text-neutral-900 transition-colors">
                    Direct Line
                  </h3>
                  <p className="text-sm text-neutral-500">
                    Speak directly with a senior engineer, not a bot.
                  </p>
                </div>
              </div>
            </div>
            <div className="group hover:border-secondary/20 relative rounded-3xl border border-neutral-200 bg-neutral-50 p-6 transition-all duration-500 hover:bg-white hover:shadow-xl">
              <div className="flex items-start gap-4">
                <div className="bg-secondary/10 flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110">
                  <Mail className="text-secondary h-6 w-6" />
                </div>
                <div>
                  <h3 className="group-hover:text-secondary mb-1 text-lg font-semibold text-neutral-900 transition-colors">
                    Email Support
                  </h3>
                  <p className="text-sm text-neutral-500">support@pentorax.com</p>
                  <p className="mt-1 text-xs text-neutral-400">
                    Typical response time: &lt; 2 hours
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="group hover:border-primary/20 flex flex-col items-center justify-center gap-2 rounded-3xl border border-neutral-200 bg-neutral-50 p-4 text-center transition-all duration-300 hover:bg-white hover:shadow-lg">
                <Clock className="group-hover:text-primary h-6 w-6 text-neutral-400 transition-colors" />
                <span className="text-sm font-medium text-neutral-600 group-hover:text-neutral-900">
                  24/7 Response
                </span>
              </div>
              <div className="group hover:border-secondary/20 flex flex-col items-center justify-center gap-2 rounded-3xl border border-neutral-200 bg-neutral-50 p-4 text-center transition-all duration-300 hover:bg-white hover:shadow-lg">
                <ShieldCheck className="group-hover:text-secondary h-6 w-6 text-neutral-400 transition-colors" />
                <span className="text-sm font-medium text-neutral-600 group-hover:text-neutral-900">
                  Expert Advice
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
