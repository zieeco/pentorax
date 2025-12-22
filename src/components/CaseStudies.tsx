
import React from 'react';

const CaseStudyCard: React.FC<{ image: string; alt: string }> = ({ image, alt }) => (
    <div className="rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
        <img src={image} alt={alt} className="w-full h-64 object-cover" />
    </div>
);

const CaseStudies: React.FC = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-2xl font-semibold text-gray-700 mb-12">Read the case studies of some of our past projects</h2>
                
                <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    <CaseStudyCard image="https://picsum.photos/500/400?image=500" alt="Case Study 1" />
                    <CaseStudyCard image="https://picsum.photos/500/400?image=501" alt="Case Study 2" />
                    <CaseStudyCard image="https://picsum.photos/500/400?image=502" alt="Case Study 3" />
                </div>

                <div className="mt-12">
                    <a href="#" className="inline-flex items-center bg-orange-500 text-white font-semibold px-8 py-3 rounded-md hover:bg-orange-600 transition-colors">
                        More Case Studies
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default CaseStudies;
