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
    <section className="bg-background text-foreground relative overflow-hidden py-24">
      <div className="bg-primary/10 pointer-events-none absolute top-0 left-1/4 h-96 w-96 rounded-full blur-[128px]" />
      <div className="bg-secondary/10 pointer-events-none absolute right-1/4 bottom-0 h-96 w-96 rounded-full blur-[128px]" />

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
              <h2 className="font-quicksand text-foreground text-4xl leading-[1.1] font-black tracking-tight lg:text-5xl">
                Questions? <br />
                <span className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-transparent">
                  Let&apos;s Solve Them.
                </span>
              </h2>
              <p className="text-muted-foreground max-w-xl text-lg leading-relaxed">
                Our team of energy experts is ready to analyze your needs and design the perfect
                solar solution for your home or business.
              </p>
            </div>
            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-quicksand h-14 rounded-full px-8 text-base shadow-lg"
                asChild
              >
                <Link href="/contact" className="">
                  Book Free Consultation <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <div className="bg-muted border-border flex h-14 items-center gap-4 rounded-full border px-6">
                <Phone className="text-primary h-5 w-5" />
                <span className="text-foreground font-black">+234 808 159 8604</span>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="grid gap-4">
            <div className="border-border bg-muted/50 hover:bg-card group relative rounded-3xl border p-6 transition-all duration-500 hover:shadow-xl">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110">
                  <Phone className="text-primary h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-quicksand group-hover:text-primary text-foreground mb-1 text-lg font-black transition-colors">
                    Direct Line
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Speak directly with a senior engineer, not a bot.
                  </p>
                </div>
              </div>
            </div>
            <div className="border-border bg-muted/50 hover:bg-card group relative rounded-3xl border p-6 transition-all duration-500 hover:shadow-xl">
              <div className="flex items-start gap-4">
                <div className="bg-secondary/10 flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110">
                  <Mail className="text-secondary h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-quicksand group-hover:text-secondary text-foreground mb-1 text-lg font-black transition-colors">
                    Email Support
                  </h3>
                  <p className="text-muted-foreground text-sm">support@pentorax.com</p>
                  <p className="text-muted-foreground/70 mt-1 text-xs">
                    Typical response time: &lt; 2 hours
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="border-border bg-muted/50 hover:bg-card flex flex-col items-center justify-center gap-2 rounded-3xl border p-4 text-center transition-all duration-300 hover:shadow-lg">
                <Clock className="text-muted-foreground group-hover:text-primary h-6 w-6 transition-colors" />
                <span className="text-muted-foreground group-hover:text-foreground text-sm font-black">
                  24/7 Response
                </span>
              </div>
              <div className="border-border bg-muted/50 hover:bg-card flex flex-col items-center justify-center gap-2 rounded-3xl border p-4 text-center transition-all duration-300 hover:shadow-lg">
                <ShieldCheck className="text-muted-foreground group-hover:text-secondary h-6 w-6 transition-colors" />
                <span className="text-muted-foreground group-hover:text-foreground text-sm font-black">
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
