/**
 * SolutionsSection — 4-card grid of energy solutions
 * Original: frontend/src/components/landing/Solutions.tsx (450 lines → decomposed)
 * Uses SolutionCard sub-component per SRP
 */
import { Building2, Factory, Home, MapPin } from 'lucide-react';
import { SolutionCard } from './SolutionCard';

const SOLUTIONS = [
  {
    image: '/roof.png',
    title: 'Residential Solar Solutions',
    ratingScore: 5,
    description:
      'Stable, healthy, and noiseless electricity that meets the energy and comfort needs of homes.',
    icon: <Home className="h-5 w-5" />,
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
    icon: <Building2 className="h-5 w-5" />,
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
    icon: <Factory className="h-5 w-5" />,
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
    icon: <MapPin className="h-5 w-5" />,
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
    testimonial: 'Perfect solution for our remote research station.',
    link: '/solutions/off-grid',
  },
];

export function SolutionsSection() {
  return (
    <section className="font-quicksand relative overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50/30 to-cyan-50/30 py-20 lg:pt-28">
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="bg-gradient-to-r from-gray-800 via-blue-700 to-cyan-600 bg-clip-text text-left text-4xl font-bold text-transparent lg:text-5xl">
            Our Solar Solutions
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {SOLUTIONS.map((item, i) => (
            <div key={i} className="transform transition-all duration-500 hover:scale-105">
              <SolutionCard {...item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
