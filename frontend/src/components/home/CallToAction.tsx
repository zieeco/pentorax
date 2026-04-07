/**
 * CallToAction — Full-width CTA section with background image
 * Original: frontend/src/components/landing/CallToAction.tsx
 */
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function CallToAction() {
  return (
    <section
      className="relative bg-cover bg-center py-24 sm:py-32"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1920&q=80')",
      }}
    >
      <div className="bg-brand-dark/80 absolute inset-0 opacity-80" />
      <div className="relative z-10 container mx-auto px-4 text-center text-white lg:px-8">
        <h2 className="font-quicksand mx-auto max-w-4xl text-3xl leading-tight font-black tracking-tighter sm:text-4xl md:text-5xl">
          Bill Gates, PentoraX Discuss Accelerating Renewable Energy Adoption in Nigeria
        </h2>
        <div className="mt-8">
          <Button
            asChild
            className="font-quicksand hover:bg-muted bg-background text-primary h-16 rounded-2xl px-12 font-black tracking-widest shadow-xl transition-all"
          >
            <Link href="/blog">Read Full Story</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
