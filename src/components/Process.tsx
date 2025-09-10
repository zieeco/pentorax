import React, { useState } from 'react';
import {
  Headphones,
  CheckCircle,
  Clock,
  Users,
  Award,
  ArrowRight,
  MessageCircle,
  ClipboardCheck,
  Settings,
  ShieldCheck,
} from 'lucide-react';

interface ProcessStepProps {
  step: number;
  title: string;
  description: string;
  details: string[];
  icon: React.ReactNode;
  duration: string;
  isActive?: boolean;
}

const ProcessStep: React.FC<ProcessStepProps> = ({
  step,
  title,
  description,
  details,
  icon,
  duration,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div
      className="group relative flex h-full flex-col"
      onMouseEnter={() => {
        setIsHovered(true);
        setTimeout(() => setShowDetails(true), 200);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowDetails(false);
      }}
    >
      {/* Step number and connector line */}
      <div className="mb-6 flex items-center">
        <div
          className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full font-bold text-white transition-all duration-500 ${
            isHovered
              ? 'scale-110 bg-gradient-to-r from-blue-600 to-cyan-600 shadow-lg shadow-blue-500/30'
              : 'bg-gray-400 shadow-md'
          }`}
        >
          {step}
          {/* Subtle pulse ring on hover */}
          <div
            className={`absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 transition-all duration-1000 ${
              isHovered ? 'scale-150 opacity-0' : 'scale-100 opacity-0'
            }`}
          ></div>
        </div>
        {step < 4 && (
          <div
            className={`ml-4 h-0.5 flex-1 transition-all duration-700 ${
              isHovered
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 shadow-sm shadow-blue-500/20'
                : 'bg-gray-300'
            }`}
          ></div>
        )}
      </div>

      {/* Content card */}
      <div
        className={`relative flex-1 rounded-xl border border-gray-100 bg-white p-6 shadow-lg transition-all duration-500 ${
          isHovered
            ? '-translate-y-2 border-blue-200 shadow-2xl shadow-blue-500/10'
            : ''
        }`}
      >
        {/* Subtle gradient overlay on hover */}
        <div
          className={`absolute inset-0 rounded-xl bg-gradient-to-br from-blue-50/50 via-transparent to-cyan-50/30 transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        ></div>

        <div className="relative z-10">
          {/* Icon and duration */}
          <div className="mb-4 flex items-center justify-between">
            <div
              className={`rounded-full p-3 transition-all duration-300 ${
                isHovered
                  ? 'scale-110 bg-blue-100 shadow-sm shadow-blue-500/20'
                  : 'bg-gray-100'
              }`}
            >
              <div
                className={`transition-colors duration-300 ${
                  isHovered ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                {icon}
              </div>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="mr-1 h-4 w-4" />
              {duration}
            </div>
          </div>

          {/* Title and description */}
          <h3
            className={`mb-3 text-xl font-bold transition-colors duration-300 ${
              isHovered ? 'text-blue-600' : 'text-gray-800'
            }`}
          >
            {title}
          </h3>

          <p className="mb-4 leading-relaxed text-gray-600">{description}</p>

          {/* Details list with animation */}
          <div
            className={`space-y-2 overflow-hidden transition-all duration-500 ${
              showDetails ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            {details.map((detail, index) => (
              <div
                key={index}
                className={`flex transform items-start text-sm text-gray-700 transition-all duration-500 ${
                  showDetails ? 'translate-x-0' : '-translate-x-4'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CheckCircle className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                {detail}
              </div>
            ))}
          </div>

          {/* Learn more link */}
          <div
            className={`mt-4 transform border-t border-gray-100 pt-4 transition-all duration-300 ${
              isHovered
                ? 'translate-y-0 opacity-100'
                : 'translate-y-2 opacity-0'
            }`}
          >
            <button className="flex items-center text-sm font-medium text-blue-600 transition-colors hover:text-blue-700">
              Learn More
              <ArrowRight className="ml-1 h-4 w-4 transition-transform hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PentoraxProcess: React.FC = () => {
  const processSteps: ProcessStepProps[] = [
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
        'Detailed proposal with 3D modeling',
      ],
      icon: <MessageCircle className="h-6 w-6" />,
      duration: '1-2 days',
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
        'Final cost breakdown and financing options',
      ],
      icon: <ClipboardCheck className="h-6 w-6" />,
      duration: '3-5 days',
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
        'Safety inspections and certifications',
      ],
      icon: <Settings className="h-6 w-6" />,
      duration: '1-3 days',
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
        'Performance optimization updates',
      ],
      icon: <ShieldCheck className="h-6 w-6" />,
      duration: '25+ years',
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50/30 to-cyan-50/30 py-20 font-sand">
      {/* Enhanced background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* Additional floating elements */}
      <div className="absolute left-10 top-20 h-32 w-32 rounded-full bg-gradient-to-br from-blue-400/5 to-cyan-400/5 blur-xl"></div>
      <div className="absolute right-16 top-40 h-24 w-24 rounded-full bg-gradient-to-br from-cyan-400/5 to-blue-400/5 blur-xl"></div>
      <div className="absolute bottom-32 left-1/4 h-28 w-28 rounded-full bg-gradient-to-br from-blue-300/5 to-purple-300/5 blur-xl"></div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center rounded-full bg-blue-100/80 px-4 py-2 text-sm font-medium text-blue-600 backdrop-blur-sm">
            <Users className="mr-2 h-4 w-4" />
            Our Proven Process
          </div>
          <h2 className="mb-6 bg-gradient-to-r from-gray-800 via-blue-700 to-cyan-600 bg-clip-text text-4xl font-bold text-transparent drop-shadow-sm lg:text-5xl">
            What Will Pentorax Offer You?
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600 drop-shadow-sm">
            From initial consultation to long-term support, we guide you through
            every step of your solar journey with expertise and care
          </p>
        </div>

        {/* Process steps */}
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <div
              key={index}
              className="transform transition-all duration-500"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <ProcessStep {...step} />
            </div>
          ))}
        </div>

        {/* Bottom stats/guarantees */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            {
              icon: <Award className="h-8 w-8" />,
              title: 'Quality Guarantee',
              description: '25-year warranty on all installations',
              color: 'blue',
            },
            {
              icon: <Users className="h-8 w-8" />,
              title: 'Expert Team',
              description: 'Certified professionals with 10+ years experience',
              color: 'green',
            },
            {
              icon: <Headphones className="h-8 w-8" />,
              title: '24/7 Support',
              description: 'Round-the-clock technical assistance',
              color: 'purple',
            },
          ].map((item, index) => (
            <div
              key={index}
              className="group rounded-xl border border-white/30 bg-white/70 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:bg-white/90 hover:shadow-lg hover:shadow-blue-500/10"
            >
              <div
                className={`inline-flex h-16 w-16 items-center justify-center bg-${item.color}-100/80 mb-4 rounded-full shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-md`}
              >
                <div className={`text-${item.color}-600`}>{item.icon}</div>
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-800">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <button className="transform rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-4 font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30">
            Start Your Solar Journey Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default PentoraxProcess;
