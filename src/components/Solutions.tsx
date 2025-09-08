
import React from 'react';

const StarIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
  <svg className={`w-5 h-5 ${filled ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.368-2.448a1 1 0 00-1.176 0l-3.368 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.07 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
  </svg>
);

const Rating: React.FC<{ score: number }> = ({ score }) => (
  <div className="flex">
    {[...Array(5)].map((_, i) => (
      <StarIcon key={i} filled={i < score} />
    ))}
  </div>
);

interface SolutionCardProps {
  image: string;
  title: string;
  ratingLabel: string;
  ratingScore: number;
  description: string;
}

const SolutionCard: React.FC<SolutionCardProps> = ({ image, title, ratingLabel, ratingScore, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
      <img src={image} alt={title} className="w-full h-56 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <div className="flex items-center my-3">
          <span className="text-sm font-medium text-gray-600 mr-2">{ratingLabel}</span>
          <Rating score={ratingScore} />
        </div>
        <p className="text-gray-600">
          {description}
        </p>
      </div>
    </div>
  );
};


const Solutions: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Our Solar Solutions
        </h2>
        <div className="grid md:grid-cols-2 gap-10">
          <SolutionCard
            image="https://picsum.photos/600/400?image=1074"
            title="Residential Solar Solutions"
            ratingLabel="Customer Ratings"
            ratingScore={5}
            description="Get stable, healthy, and noiseless electricity that meets the energy and comfort needs of your home, compound, or housing estates."
          />
          <SolutionCard
            image="https://picsum.photos/600/400?image=257"
            title="Commercial Solar Solutions"
            ratingLabel="Operational Efficiency"
            ratingScore={5}
            description="Enhance your business operations with reliable, cost-effective, and sustainable energy solutions from Arnergy Solar."
          />
        </div>
      </div>
    </section>
  );
};

export default Solutions;
