import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Cpu } from 'lucide-react';
import SEO from '@/components/SEO';

const InvertersPage: React.FC = () => {
  // TODO: Replace with API call - useQuery('inverters', fetchInverters)
  const products = [
    {
      id: 1,
      name: 'Titan Hybrid Inverter v3',
      slug: 'titan-hybrid-v3',
      price: 1450.00,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1620214948402-b1324422333d?auto=format&fit=crop&w=600&q=80',
      specs: '10kW Single Phase, Smart IoT',
      inStock: true
    },
    {
      id: 2,
      name: 'PentoraX Grid-Tie Inverter',
      slug: 'pentorax-grid-tie',
      price: 980.00,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80',
      specs: '5kW Grid-Tie, 97.5% Efficiency',
      inStock: true
    },
    {
      id: 3,
      name: 'Industrial 3-Phase Inverter',
      slug: 'industrial-3phase',
      price: 3200.00,
      rating: 5,
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=600&q=80',
      specs: '50kW Three Phase, Industrial Grade',
      inStock: true
    },
  ];

  return (
    <>
      <SEO
        title="Solar Inverters | Hybrid, Grid-Tie & Off-Grid Inverters"
        description="High-efficiency solar inverters with smart IoT control. Hybrid, grid-tie, and off-grid inverters from 5kW to 50kW. 10-year warranty."
        keywords="solar inverters, hybrid inverters, grid-tie inverters, off-grid inverters, buy solar inverters"
        ogImage="/inverters.png"
      />

      <div className="bg-gray-50 py-24 min-h-screen">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <Cpu className="h-10 w-10 text-primary" />
              <h1 className="text-4xl font-extrabold text-gray-900">
                Solar <span className="text-primary">Inverters</span>
              </h1>
            </div>
            <p className="text-gray-600 max-w-2xl text-lg">
              Smart inverters with advanced MPPT technology and IoT connectivity. Hybrid, grid-tie, and off-grid solutions with 10-year warranty.
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-gray-100 group">
                <Link to={`/shop/${product.slug}`} className="block">
                  <div className="h-64 overflow-hidden relative">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    {product.inStock && (
                      <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        In Stock
                      </div>
                    )}
                  </div>
                  <div className="p-8">
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, idx) => (
                        <Star 
                          key={idx} 
                          className={`h-4 w-4 ${idx < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} 
                        />
                      ))}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-gray-500 text-sm mb-6">{product.specs}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-2xl font-black text-primary">${product.price.toFixed(2)}</span>
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          // TODO: Add to cart
                        }}
                        className="p-3 bg-gray-900 text-white rounded-xl hover:bg-primary transition-colors shadow-lg shadow-black/5 active:scale-90"
                      >
                        <ShoppingCart className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-primary to-blue-700 rounded-3xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Not Sure Which Inverter You Need?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Our technical team can help you select the right inverter for your solar system
            </p>
            <Link 
              to="/contact" 
              className="inline-block bg-secondary px-8 py-4 rounded-lg font-bold text-gray-900 hover:scale-105 transition-transform"
            >
              Get Technical Support
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvertersPage;
