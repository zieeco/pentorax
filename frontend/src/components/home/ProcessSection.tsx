/**
 * ProcessSection — 4-step installation process cards
 * Original: frontend/src/components/landing/Process.tsx (288 → decomposed)
 * ProcessStep extracted as sub-component for 150-line rule compliance
 */

import { ProcessStep } from './ProcessStep';

const STEPS = [
  {
    step: 1,
    title: 'Free Consultation',
    description:
      'We start with understanding your energy needs and assessing your property to design the perfect solar solution.',
    details: [
      'On-site energy audit and assessment',
      'Roof condition and orientation analysis',
      'Custom system sizing and design',
      'Financial analysis and ROI calculation',
    ],
    duration: '1-2 days',
    backgroundImage: '/consultation.png',
  },
  {
    step: 2,
    title: 'System Design & Planning',
    description:
      'Our engineers create a detailed system design optimized for maximum efficiency and your specific requirements.',
    details: [
      'Technical system specifications',
      'Permit applications and approvals',
      'Equipment selection and sourcing',
      'Installation timeline planning',
    ],
    duration: '3-5 days',
    backgroundImage: '/system-design.jpeg',
  },
  {
    step: 3,
    title: 'Professional Installation',
    description:
      'Certified technicians install your system with precision, ensuring optimal performance and safety standards.',
    details: [
      'Professional mounting and wiring',
      'Inverter and monitoring setup',
      'Grid connection and testing',
      'System commissioning and optimization',
    ],
    duration: '1-3 days',
    backgroundImage: '/installation.png',
  },
  {
    step: 4,
    title: 'Ongoing Support',
    description:
      'Comprehensive support and maintenance to ensure your system operates at peak performance for decades.',
    details: [
      '25-year performance warranty',
      'Real-time monitoring and alerts',
      'Regular maintenance and cleaning',
      '24/7 technical support hotline',
    ],
    duration: '25+ years',
    backgroundImage: '/maintenance.png',
  },
];

export function ProcessSection() {
  return (
    <section className="bg-muted/30 relative overflow-hidden py-24">
      <div className="relative container mx-auto px-4 lg:px-8">
        <div className="mb-20 text-center">
          <h2 className="font-quicksand from-foreground via-primary to-secondary mb-8 bg-gradient-to-r bg-clip-text text-4xl font-black tracking-tighter text-transparent lg:text-6xl">
            What Will Pentorax Offer You?
          </h2>
          <p className="text-muted-foreground mx-auto max-w-3xl text-xl font-medium">
            From initial consultation to long-term support, we guide you through every step of your
            solar journey.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <ProcessStep key={i} {...step} isLast={i === STEPS.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
