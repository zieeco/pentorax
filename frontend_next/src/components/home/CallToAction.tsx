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
      <div className="absolute inset-0 bg-blue-900 opacity-70" />
      <div className="relative z-10 container mx-auto px-4 text-center text-white sm:px-6 lg:px-8">
        <h2 className="mx-auto max-w-4xl text-3xl font-bold sm:text-4xl md:text-5xl">
          Bill Gates, PentoraX Discuss Accelerating Renewable Energy Adoption in Nigeria
        </h2>
        <div className="mt-8">
          <Button
            asChild
            className="rounded-md bg-white px-8 py-3 font-bold text-blue-600 shadow-lg hover:bg-gray-100"
          >
            <Link href="/blog">Read Full Story</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
