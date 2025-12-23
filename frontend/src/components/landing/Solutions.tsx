import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  // TrendingUp,
} from 'lucide-react';

const StarIcon: React.FC<{
  filled: boolean;
  index?: number;
  animate?: boolean;
}> = ({ filled, index = 0, animate = false }) => (
  <svg
    className={`h-5 w-5 ${filled ? 'text-yellow-400' : 'text-gray-300'} transition-all duration-300 ${animate ? 'animate-pulse' : ''}`}
    fill="currentColor"
    viewBox="0 0 20 20"
    style={{ animationDelay: `${index * 100}ms` }}
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.368-2.448a1 1 0 00-1.176 0l-3.368 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.07 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
  </svg>
);

const Rating: React.FC<{ score: number; label: string; animate?: boolean }> = ({
  score,
  label,
  animate = false,
}) => (
  <div className="flex" aria-label={`${label}: ${score} out of 5`}>
    {[...Array(5)].map((_, i) => (
      <StarIcon key={i} filled={i < score} index={i} animate={animate} />
    ))}
  </div>
);

// Floating background icons
const FloatingIcon: React.FC<{
  icon: React.ReactNode;
  delay: string;
  position: string;
}> = ({ icon, delay, position }) => (
  <div
    className={`absolute animate-bounce text-blue-300 opacity-5 ${position}`}
    style={{ animationDelay: delay, animationDuration: '4s' }}
  >
    {icon}
  </div>
);

interface SolutionItemProps {
  image: string;
  title: string;
  ratingLabel: string;
  ratingScore: number;
  description: string;
  icon?: React.ReactNode;
  features?: string[];
  stats?: { value: string; label: string }[];
  badge?: string;
  testimonial?: string;
  link?: string;
}

const SolutionItem: React.FC<SolutionItemProps> = ({
  image,
  title,
  ratingLabel,
  ratingScore,
  description,
  icon,
  features = [],
  stats = [],
  badge,
  testimonial,
  link,
}) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div
      className="group relative flex h-full flex-col space-y-4"
      onMouseEnter={() => {
        setIsHovered(true);
        setTimeout(() => setShowDetails(true), 200);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowDetails(false);
      }}
    >
      {/* Image with zoom + overlay + enhancements */}
      <div className="relative overflow-hidden">
        {/* Badge */}
        {badge && (
          <div className="absolute left-2 top-2 z-20 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-2 py-1 text-xs font-bold text-white shadow-lg">
            <Award className="mr-1 inline h-3 w-3" />
            {badge}
          </div>
        )}

        <img
          src={image}
          alt={title}
          className="h-40 w-full transform object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-400 opacity-0 transition-opacity duration-500 group-hover:opacity-50"></div>

        {/* Icon overlay */}
        {icon && (
          <div
            className={`absolute right-2 top-2 transform rounded-full bg-white/90 p-2 shadow-lg backdrop-blur-sm ${isHovered ? 'rotate-12 scale-110' : 'scale-100'} transition-all duration-300`}
          >
            <div className="text-blue-600">{icon}</div>
          </div>
        )}

        {/* Efficiency bar overlay */}
        <div
          className={`absolute bottom-2 left-2 right-2 transform ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} transition-all duration-500`}
        >
          <div className="rounded-lg bg-white/90 p-2 backdrop-blur-sm">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs font-medium text-gray-700">
                Efficiency
              </span>
              <span className="text-xs font-bold text-green-600">
                {ratingScore * 20}%
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-gray-200">
              <div
                className="h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-1000"
                style={{ width: `${ratingScore * 20}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider line */}
      <hr className="border-gray-300" />

      {/* Content with fade-in effect + enhancements */}
      <div className="flex flex-1 flex-col opacity-90 transition-opacity duration-500 group-hover:opacity-100">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-800 transition-colors duration-300 group-hover:text-blue-600">
            {title}
          </h3>
          <ArrowRight
            className={`h-4 w-4 transform text-blue-600 ${isHovered ? 'translate-x-1' : ''} transition-transform duration-300`}
          />
        </div>

        <div className="my-2 flex items-center justify-between">
          <div className="flex items-center">
            <span className="mr-2 text-sm font-medium text-gray-600">
              {ratingLabel}
            </span>
            <Rating
              score={ratingScore}
              label={ratingLabel}
              animate={isHovered}
            />
          </div>
          <span className="text-sm font-semibold text-amber-600">
            {ratingScore}.0
          </span>
        </div>

        {/* Stats */}
        {stats.length > 0 && (
          <div className="mb-3 grid grid-cols-2 gap-2">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`transform rounded-lg bg-gray-50 p-2 text-center transition-all duration-300 ${
                  isHovered ? 'scale-105' : ''
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-sm font-bold text-blue-600">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        <p className="mb-3 mt-auto text-sm text-gray-600">{description}</p>

        {/* Feature list with staggered animations */}
        {features.length > 0 && (
          <div
            className={`mb-3 space-y-1 overflow-hidden transition-all duration-500 ${showDetails ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}
          >
            {features.slice(0, 3).map((feature, index) => (
              <div
                key={index}
                className={`flex transform items-center text-xs text-gray-700 transition-all duration-500 ${
                  showDetails ? 'translate-x-0' : '-translate-x-4'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CheckCircle className="mr-2 h-3 w-3 flex-shrink-0 text-green-500" />
                {feature}
              </div>
            ))}
          </div>
        )}

        {/* Testimonial */}
        {testimonial && (
          <div
            className={`mb-3 transform rounded-lg border-l-2 border-blue-400 bg-blue-50 p-2 transition-all duration-500 ${
              isHovered
                ? 'translate-y-0 opacity-100'
                : 'translate-y-2 opacity-0'
            }`}
          >
            <p className="text-xs italic text-gray-700">"{testimonial}"</p>
          </div>
        )}

        {/* Learn More Button */}
        <button
          onClick={() => link && navigate(link)}
          className={`mt-auto flex transform items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg ${
            isHovered ? 'shadow-lg' : ''
          }`}
        >
          <span>Learn More</span>
          <ArrowRight className="ml-2 h-3 w-3" />
        </button>
      </div>
    </div>
  );
};

const Solutions: React.FC = () => {
  // Enhanced solution items with additional data
  const solutionItems: SolutionItemProps[] = [
    {
      image: 'public/roof.png',
      title: 'Residential Solar Solutions',
      ratingLabel: 'Customer Ratings',
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
      image: 'public/commercial.png',
      title: 'Commercial Solar Solutions',
      ratingLabel: 'Operational Efficiency',
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
      image: 'public/industrial.png',
      title: 'Industrial Solar Solutions',
      ratingLabel: 'Energy Savings',
      ratingScore: 4,
      description:
        'Power factories and large-scale operations with high-capacity solar energy.',
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
      image: 'public/grid.png',
      title: 'Off-Grid Solar Systems',
      ratingLabel: 'Reliability',
      ratingScore: 5,
      description:
        'Stay powered in remote areas with fully independent off-grid solar systems.',
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

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50/30 to-cyan-50/30 py-20 font-sand lg:pt-28">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingIcon
          icon={<Sun className="h-12 w-12" />}
          delay="0s"
          position="top-10 left-10"
        />
        <FloatingIcon
          icon={<Zap className="h-8 w-8" />}
          delay="2s"
          position="top-20 right-20"
        />
        <FloatingIcon
          icon={<Battery className="h-10 w-10" />}
          delay="4s"
          position="bottom-20 left-20"
        />
        <FloatingIcon
          icon={<Sun className="h-6 w-6" />}
          delay="1s"
          position="top-1/3 right-10"
        />
        <FloatingIcon
          icon={<Zap className="h-8 w-8" />}
          delay="3s"
          position="bottom-1/3 left-10"
        />

        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='0.05'%3E%3Ccircle cx='4' cy='4' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced header */}
        <div className="mb-12">
          {/* <div className="mb-4 inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-600">
            <Zap className="mr-2 h-4 w-4" />
            Powered by Innovation
          </div> */}
          <h2 className="bg-gradient-to-r from-gray-800 via-blue-700 to-cyan-600 bg-clip-text text-left text-4xl font-bold text-transparent lg:text-5xl">
            Our Solar Solutions
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 space-y-6 md:grid-cols-2 md:space-y-0 lg:grid-cols-4">
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

        {/* Enhanced stats section */}
        {/* <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-4">
          {[
            {
              icon: <TrendingUp className="h-6 w-6" />,
              value: '99.9%',
              label: 'System Uptime',
              color: 'blue',
            },
            {
              icon: <Home className="h-6 w-6" />,
              value: '1000+',
              label: 'Happy Customers',
              color: 'green',
            },
            {
              icon: <Sun className="h-6 w-6" />,
              value: '50MW+',
              label: 'Energy Generated',
              color: 'amber',
            },
            {
              icon: <CheckCircle className="h-6 w-6" />,
              value: '25 Yrs',
              label: 'Warranty Coverage',
              color: 'purple',
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="group rounded-xl border border-white/20 bg-white/60 p-4 text-center backdrop-blur-sm transition-all duration-300 hover:bg-white/80"
            >
              <div
                className={`inline-flex h-12 w-12 items-center justify-center bg-${stat.color}-100 mb-3 rounded-full transition-transform duration-300 group-hover:scale-110`}
              >
                <div className={`text-${stat.color}-600`}>{stat.icon}</div>
              </div>
              <h3 className="mb-1 text-2xl font-bold text-gray-800">
                {stat.value}
              </h3>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default Solutions;
