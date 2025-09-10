import React from 'react';
import {
  Home,
  Building2,
  Factory,
  MapPin,
  Sun,
  Zap,
  Battery,
  CheckCircle,
  ArrowRight,
  Award,
  TrendingUp,
} from 'lucide-react';

const StarIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
  <svg
    className={`h-5 w-5 ${filled ? 'text-yellow-400' : 'text-gray-300'}`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.368-2.448a1 1 0 00-1.176 0l-3.368 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.07 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
  </svg>
);

const Rating: React.FC<{ score: number; label: string }> = ({
  score,
  label,
}) => (
  <div className="flex" aria-label={`${label}: ${score} out of 5`}>
    {[...Array(5)].map((_, i) => (
      <StarIcon key={i} filled={i < score} />
    ))}
  </div>
);

interface SolutionItemProps {
  image: string;
  title: string;
  ratingLabel: string;
  ratingScore: number;
  description: string;
}

const SolutionItem: React.FC<SolutionItemProps> = ({
  image,
  title,
  ratingLabel,
  ratingScore,
  description,
}) => (
  <div className="group flex h-full flex-col space-y-4">
    {/* Image with zoom + overlay */}
    <div className="relative overflow-hidden">
      <img
        src={image}
        alt={title}
        className="h-40 w-full transform object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-400 opacity-0 transition-opacity duration-500 group-hover:opacity-50"></div>
    </div>

    {/* Divider line */}
    <hr className="border-gray-300" />

    {/* Content with fade-in effect */}
    <div className="flex flex-1 flex-col opacity-90 transition-opacity duration-500 group-hover:opacity-100">
      <h3 className="text-lg font-bold text-gray-800">{title}</h3>
      <div className="my-2 flex items-center">
        <span className="mr-2 text-sm font-medium text-gray-600">
          {ratingLabel}
        </span>
        <Rating score={ratingScore} label={ratingLabel} />
      </div>
      <p className="mt-auto text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

const Solutions: React.FC = () => {
  const solutionItems: SolutionItemProps[] = [
    {
      image: 'public/roof.jpeg',
      title: 'Residential Solar Solutions',
      ratingLabel: 'Customer Ratings',
      ratingScore: 5,
      description:
        'Stable, healthy, and noiseless electricity that meets the energy and comfort needs of homes.',
    },
    {
      image:
        'https://unsplash.com/photos/a-close-up-of-a-solar-panel-on-a-building-2SfssudtyIA',
      title: 'Commercial Solar Solutions',
      ratingLabel: 'Operational Efficiency',
      ratingScore: 5,
      description:
        'Reliable, cost-effective, and sustainable energy solutions tailored for businesses.',
    },
    {
      image: 'public/industrial.png',
      title: 'Industrial Solar Solutions',
      ratingLabel: 'Energy Savings',
      ratingScore: 4,
      description:
        'Power factories and large-scale operations with high-capacity solar energy.',
    },
    {
      image: 'public/grid.png',
      title: 'Off-Grid Solar Systems',
      ratingLabel: 'Reliability',
      ratingScore: 5,
      description:
        'Stay powered in remote areas with fully independent off-grid solar systems.',
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50/30 to-cyan-50/30 py-20 font-sand lg:pt-28">
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced header */}
        <div className="mb-12">
          <div className="mb-4 inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-600">
            <Zap className="mr-2 h-4 w-4" />
            Powered by Innovation
          </div>
          <h2 className="bg-gradient-to-r from-gray-800 via-blue-700 to-cyan-600 bg-clip-text text-left text-4xl font-bold text-transparent lg:text-5xl">
            Our Solar Solutions
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 space-y-6 md:grid-cols-2 md:space-y-0 lg:grid-cols-4">
          {/* {solutionItems.map((item, index) => (
            <SolutionItem key={index} {...item} />
          ))} */}
          {solutionItems.map((item, index) => (
            <div
              key={index}
              className="transform transition-all duration-500 hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <SolutionItem {...item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;

