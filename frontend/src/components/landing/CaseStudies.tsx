import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CaseStudyCard: React.FC<{ image: string; alt: string }> = ({ image, alt }) => (
  <div className="rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
    <img src={image} alt={alt} className="w-full h-64 object-cover" />
  </div>
);

const CaseStudies: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-700 mb-12">
          Read the case studies of some of our past projects
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <CaseStudyCard 
            image="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=500&q=80" 
            alt="Commercial Solar Installation" 
          />
          <CaseStudyCard 
            image="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=500&q=80" 
            alt="Residential Solar Project" 
          />
          <CaseStudyCard 
            image="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=500&q=80" 
            alt="Industrial Solar System" 
          />
        </div>

        <div className="mt-12">
          <Link 
            to="/case-studies" 
            className="inline-flex items-center bg-primary text-white font-semibold px-8 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            More Case Studies
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
