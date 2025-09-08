import React from 'react';
import { Battery, Sun, Zap, Shield } from 'lucide-react';

const Products = () => {
  const products = [
    {
      icon: Sun,
      title: 'Solar Panels',
      description: 'High-efficiency monocrystalline and polycrystalline solar panels designed for maximum energy output.',
      features: ['25-year warranty', 'Weather resistant', 'High efficiency'],
      image: 'https://images.pexels.com/photos/9875415/pexels-photo-9875415.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    },
    {
      icon: Zap,
      title: 'Inverters',
      description: 'Advanced power inverters that convert DC to AC power with maximum efficiency and reliability.',
      features: ['Smart monitoring', 'Grid-tie capability', 'MPPT technology'],
      image: 'https://images.pexels.com/photos/9875264/pexels-photo-9875264.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    },
    {
      icon: Battery,
      title: 'Energy Storage',
      description: 'Lithium-ion battery systems for storing solar energy and ensuring power availability 24/7.',
      features: ['Long lifespan', 'Fast charging', 'Smart management'],
      image: 'https://images.pexels.com/photos/9875228/pexels-photo-9875228.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    },
    {
      icon: Shield,
      title: 'Complete Systems',
      description: 'Fully integrated solar power systems with installation, monitoring, and maintenance support.',
      features: ['Professional installation', 'Remote monitoring', 'Full warranty'],
      image: 'https://images.pexels.com/photos/9875371/pexels-photo-9875371.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our Solar Solutions
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive range of solar products and systems designed to meet your energy needs
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => {
            const IconComponent = product.icon;
            return (
              <div key={index} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                {/* Product Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-white p-3 rounded-full shadow-md">
                    <IconComponent className="h-6 w-6 text-green-600" />
                  </div>
                </div>

                {/* Product Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {product.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button className="w-full bg-green-50 text-green-600 py-3 px-4 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition-all duration-300">
                    Learn More
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default Products;