/**
 * SolutionsSection — 4-card grid of energy solutions
 * Original: frontend/src/components/landing/Solutions.tsx (450 lines → decomposed)
 * Uses SolutionCard sub-component per SRP
 */
import { SolutionCard } from './SolutionCard';

const SOLUTIONS = [
  {
    image: '/roof.png',
    title: 'Residential Solar Solutions',
    ratingScore: 5,
    description:
      'Stable, healthy, and noiseless electricity that meets the energy and comfort needs of homes.',
    features: [
      '25-year performance warranty',
      'Smart home integration ready',
      'Professional installation included',
    ],
    stats: [
      { value: '25 yrs', label: 'Warranty' },
      { value: '90%', label: 'Efficiency' },
    ],
    badge: 'Most Popular',
    testimonial: 'Our energy bills dropped by 80% within the first month!',
    link: '/solutions/residential',
  },
  {
    image: '/commercial.png',
    title: 'Commercial Solar Solutions',
    ratingScore: 5,
    description:
      'Reliable, cost-effective, and sustainable energy solutions tailored for businesses.',
    features: [
      'Scalable system architecture',
      'Real-time monitoring dashboard',
      '24/7 technical support',
    ],
    stats: [
      { value: '30%', label: 'Cost Savings' },
      { value: '15 yrs', label: 'ROI Period' },
    ],
    testimonial: 'Reduced our operational costs by 30% in just 6 months.',
    link: '/solutions/commercial',
  },
  {
    image: '/industrial.png',
    title: 'Industrial Solar Solutions',
    ratingScore: 4,
    description: 'Power factories and large-scale operations with high-capacity solar energy.',
    features: [
      'High-capacity systems',
      'Industrial-grade components',
      'Load balancing optimization',
    ],
    stats: [
      { value: '5MW+', label: 'Capacity' },
      { value: '99.5%', label: 'Uptime' },
    ],
    testimonial: 'Our factory now runs 100% on clean solar energy.',
    link: '/solutions/industrial',
  },
  {
    image: '/grid.png',
    title: 'Off-Grid Solar Systems',
    ratingScore: 5,
    description: 'Stay powered in remote areas with fully independent off-grid solar systems.',
    features: [
      'Complete energy independence',
      'Advanced battery storage',
      'Weather-resistant design',
    ],
    stats: [
      { value: '72hrs', label: 'Backup Power' },
      { value: '100%', label: 'Independence' },
    ],
    badge: 'Recommended',
    link: '/solutions/off-grid',
  },
];

export function SolutionsSection() {
  return (
    <section className="bg-muted/30 relative overflow-hidden py-24 lg:py-32">
      <div className="relative container mx-auto px-4 lg:px-8">
        <div className="mb-20 text-center">
          <h2 className="font-quicksand from-foreground via-primary to-secondary mb-8 bg-gradient-to-r bg-clip-text text-4xl font-black tracking-tighter text-transparent lg:text-7xl">
            Our <span className="text-primary">Solar Solutions</span>
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl font-medium">
            Harness the power of the sun with our specialized renewable technologies for every
            scale.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {SOLUTIONS.map((item, i) => (
            <div key={i} className="flex flex-col">
              <SolutionCard {...item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
