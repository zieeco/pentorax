/**
 * Landing Page — (home) route group root
 * Original: frontend/src/pages/LandingPage.tsx
 * Composes all ported landing section components
 */
import { CallToAction } from '@/components/home/CallToAction';
import { ContactSection } from '@/components/home/ContactSection';
import { CustomerStoriesSection } from '@/components/home/CustomerStoriesSection';
import { HeroSection } from '@/components/home/HeroSection';
import { JourneySection } from '@/components/home/JourneySection';
import { ProcessSection } from '@/components/home/ProcessSection';
import { SolutionsSection } from '@/components/home/SolutionsSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';

export const metadata = {
  title: 'PentoraX - Leading Solar Energy Solutions in Africa',
  description:
    'Transform your energy future with PentoraX. Premium solar panel installations, inverters, and batteries for residential, commercial, and industrial needs across Africa.',
};

export default function HomePage() {
  return (
    <div className="bg-background font-quicksand text-foreground">
      <HeroSection />
      <SolutionsSection />
      <ProcessSection />
      <CallToAction />
      <JourneySection />
      <TestimonialsSection />
      <CustomerStoriesSection />
      <ContactSection />
    </div>
  );
}
