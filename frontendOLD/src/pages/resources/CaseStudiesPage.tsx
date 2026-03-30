import React from 'react';
import SEO from '@/components/SEO';

const CaseStudiesPage: React.FC = () => {
  const caseStudies = [
    {
      id: 1,
      title: 'Lagos Office Solar Installation',
      description: 'Complete solar transformation for a 5-story commercial building in Victoria Island',
      image: 'https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?auto=format&fit=crop&w=800&q=80',
      location: 'Lagos, Nigeria',
      capacity: '250kW',
      savings: '65% reduction in energy costs'
    },
    {
      id: 2,
      title: 'Factory Rooftop Solar Array',
      description: 'Industrial-scale solar installation for manufacturing facility',
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80',
      location: 'Ogun State, Nigeria',
      capacity: '500kW',
      savings: '70% reduction in operational costs'
    },
    {
      id: 3,
      title: 'Off-Grid Solar System',
      description: 'Complete off-grid solution for remote telecommunications tower',
      image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80',
      location: 'Abuja, Nigeria',
      capacity: '100kW',
      savings: '100% diesel elimination'
    },
    {
      id: 4,
      title: 'Residential Estate Solar Project',
      description: 'Community solar installation for 50-home residential estate',
      image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80',
      location: 'Lekki, Lagos',
      capacity: '150kW',
      savings: '60% reduction in electricity bills'
    },
    {
      id: 5,
      title: 'Hospital Hybrid Solar System',
      description: 'Critical power backup with solar and battery storage',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80',
      location: 'Port Harcourt, Nigeria',
      capacity: '300kW',
      savings: '55% cost savings with 24/7 reliability'
    },
    {
      id: 6,
      title: 'Shopping Mall Solar Installation',
      description: 'Large-scale commercial solar for major retail center',
      image: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=800&q=80',
      location: 'Abuja, Nigeria',
      capacity: '400kW',
      savings: '68% reduction in energy expenses'
    }
  ];

  return (
    <>
      <SEO
        title="Case Studies | PentoraX Solar Projects"
        description="Explore our successful solar energy projects across Nigeria. Real results from commercial, industrial, and residential solar installations."
        keywords="solar case studies, solar projects Nigeria, commercial solar installation, residential solar success stories"
        ogImage="/case-studies-header.png"
      />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-blue-700 py-20 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="mb-6 text-5xl font-extrabold">
              Our <span className="text-secondary">Success Stories</span>
            </h1>
            <p className="mx-auto max-w-2xl text-xl">
              Discover how we've helped businesses and homes across Nigeria transition to clean, reliable solar energy
            </p>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
              {caseStudies.map((study) => (
                <div
                  key={study.id}
                  className="group overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-2xl"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={study.image}
                      alt={study.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-bold text-gray-900">
                        {study.capacity}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                      {study.title}
                    </h3>
                    <p className="mb-4 text-gray-600">{study.description}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-gray-500">
                        <svg
                          className="mr-2 h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {study.location}
                      </div>
                      <div className="flex items-center font-semibold text-green-600">
                        <svg
                          className="mr-2 h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                          />
                        </svg>
                        {study.savings}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-6 text-4xl font-bold text-gray-900">
              Ready to Start Your <span className="text-primary">Solar Journey?</span>
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600">
              Join hundreds of satisfied customers who have made the switch to clean energy
            </p>
            <a
              href="/contact"
              className="inline-block rounded-lg bg-primary px-8 py-4 font-bold text-white shadow-lg transition-all hover:scale-105 hover:bg-blue-700"
            >
              Get Your Free Quote
            </a>
          </div>
        </section>
      </div>
    </>
  );
};

export default CaseStudiesPage;
