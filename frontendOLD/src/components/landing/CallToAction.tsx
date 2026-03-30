import React from 'react';
import { Link } from 'react-router-dom';

const CallToAction: React.FC = () => {
  return (
    <section 
      className="relative bg-cover bg-center py-24 sm:py-32"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1920&q=80')" }}
    >
      <div className="absolute inset-0 bg-blue-900 opacity-70"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center text-white">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold max-w-4xl mx-auto">
          Bill Gates, PentoraX Discuss Accelerating Renewable Energy Adoption in Nigeria
        </h2>
        <div className="mt-8">
          <Link
            to="/blog"
            className="inline-block bg-white text-blue-600 font-bold px-8 py-3 rounded-md shadow-lg hover:bg-gray-100 transition-colors"
          >
            Read Full Story
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
