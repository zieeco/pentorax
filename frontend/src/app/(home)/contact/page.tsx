'use client';

/**
 * ContactPage — Mission-critical inquiry nexus
 * Precision-engineered layout for lead capture and collaboration.
 * Adheres to 150-line rule.
 */
import { ContactForm } from '@/components/resources/ContactForm';
import { ContactInfo } from '@/components/resources/ContactInfo';
import { Badge } from '@/components/ui/badge';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 pb-24">
      {/* High-Stakes Header */}
      <section className="relative overflow-hidden border-b border-gray-100 bg-gray-900 py-32">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=1600&q=40')] bg-cover bg-center opacity-10" />
        <div className="relative z-10 container mx-auto px-4 text-center lg:px-8">
          <Badge className="bg-primary/20 text-primary mb-8 rounded-full border-none px-4 py-1 text-[10px] leading-none font-black tracking-widest uppercase italic">
            Global Link
          </Badge>
          <h1 className="mb-8 text-6xl leading-none font-black tracking-tighter text-white lowercase italic md:text-9xl">
            Let&apos;s <br />
            <span className="text-primary not-italic">Connect.</span>
          </h1>
          <p className="mx-auto max-w-2xl text-xl leading-relaxed font-medium text-white/50 lowercase">
            Our energy architects are ready to assist with your infrastructure requirements.
          </p>
        </div>
      </section>

      {/* Main Interaction Hub */}
      <section className="container mx-auto px-4 py-24 lg:px-8">
        <div className="flex flex-col items-stretch gap-20 lg:flex-row">
          <div className="lg:w-3/5">
            <ContactForm />
          </div>
          <div className="lg:w-2/5">
            <ContactInfo />
          </div>
        </div>
      </section>
    </div>
  );
}
