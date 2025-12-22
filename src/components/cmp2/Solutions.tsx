import React from 'react';
import { Home, Building, Factory, ArrowRight } from 'lucide-react';

const Solutions = () => {
  const solutions = [
    {
      icon: Home,
      title: 'Residential Solar',
      description: 'Power your home with clean, renewable energy. Reduce electricity bills and increase property value.',
      benefits: ['Up to 90% bill reduction', 'Increase home value', '25-year warranty', 'Net metering available'],
      image: 'https://images.pexels.com/photos/9875415/pexels-photo-9875415.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
      color: 'green'
    },
    {
      icon: Building,
      title: 'Commercial Solar',
      description: 'Scalable solar solutions for businesses. Reduce operational costs and demonstrate environmental responsibility.',
      benefits: ['Significant cost savings', 'Tax incentives', 'Corporate sustainability', 'Scalable systems'],
      image: 'https://images.pexels.com/photos/9875264/pexels-photo-9875264.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
      color: 'blue'
    },
    {
      icon: Factory,
      title: 'Industrial Solar',
      description: 'Large-scale solar installations for industrial facilities. Maximize energy independence and efficiency.',
      benefits: ['Massive scale deployment', 'Energy independence', 'Reduced carbon footprint', 'Custom solutions'],
      image: 'https://images.pexels.com/photos/9875228/pexels-photo-9875228.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
      color: 'purple'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Solar Solutions for Every Need
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you're a homeowner, business owner, or industrial facility, we have the perfect solar solution for you
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="space-y-16">
          {solutions.map((solution, index) => {
            const IconComponent = solution.icon;
            const isEven = index % 2 === 0;
            
            return (
              <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:grid-flow-col-dense' : ''}`}>
                {/* Content */}
                <div className={`space-y-6 ${!isEven ? 'lg:col-start-2' : ''}`}>
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-${solution.color}-100`}>
                    <IconComponent className={`h-8 w-8 text-${solution.color}-600`} />
                  </div>
                  
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                      {solution.title}
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                      {solution.description}
                    </p>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-3">
                    {solution.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center">
                        <div className={`w-2 h-2 bg-${solution.color}-600 rounded-full mr-4`}></div>
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <button className={`inline-flex items-center text-${solution.color}-600 font-semibold hover:text-${solution.color}-700 transition-colors group`}>
                    Learn More About {solution.title}
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Image */}
                <div className={`relative ${!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <div className="relative z-10">
                    <img
                      src={solution.image}
                      alt={solution.title}
                      className="w-full h-80 lg:h-96 object-cover rounded-2xl shadow-2xl"
                    />
                  </div>
                  
                  {/* Background Decoration */}
                  <div className={`absolute top-8 ${isEven ? 'left-8' : 'right-8'} w-full h-full bg-${solution.color}-200 rounded-2xl opacity-20 -z-10`}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Ready to Go Solar?
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Get a free consultation and custom quote for your solar project
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors">
                Get Free Quote
              </button>
              <button className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-600 hover:text-white transition-colors">
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solutions;