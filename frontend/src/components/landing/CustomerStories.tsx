import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const PlayIcon: React.FC = () => (
  <svg className="w-16 h-16 text-white opacity-80 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
  </svg>
);

interface StoryCardProps {
  image: string;
  title: string;
}

const StoryCard: React.FC<StoryCardProps> = ({ image, title }) => (
  <div className="relative rounded-lg overflow-hidden shadow-lg group h-64 cursor-pointer">
    <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
    <div className="absolute inset-0 bg-black bg-opacity-40"></div>
    <div className="absolute inset-0 flex items-center justify-center">
      <PlayIcon />
    </div>
  </div>
);

const CustomerStories: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-gray-800">
          Discover Our Reliability Through Customer Experiences
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Listen to the experiences and personal stories of our esteemed customers
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-12 max-w-7xl mx-auto">
          <StoryCard 
            image="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=400&q=80" 
            title="Residential Solar Success Story"
          />
          <StoryCard 
            image="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=400&q=80" 
            title="Commercial Solar Transformation"
          />
          <StoryCard 
            image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80" 
            title="Industrial Solar Implementation"
          />
        </div>

        <div className="mt-12">
          <Link 
            to="/blog" 
            className="inline-flex items-center bg-gray-800 text-white font-semibold px-8 py-3 rounded-md hover:bg-gray-700 transition-colors"
          >
            More Customer Stories
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CustomerStories;
