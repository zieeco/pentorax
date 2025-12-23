import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Zap } from 'lucide-react';
import SEO from '@/components/SEO';

const SolarPanelsPage: React.FC = () => {
  // TODO: Replace with API call - useQuery('solar-panels', fetchSolarPanels)
  const products = [
    {
      id: 1,
      name: 'PX-550 Series Mono-PERC',
      slug: 'px-550-mono-perc',
      price: 289.00,
      rating: 5,
      image: 'https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=600&q=80',
      specs: '550W peak power, 21.7% Efficiency',
      inStock: true
    },
    {
      id: 2,
      name: 'PX-450 Poly Solar Panel',
      slug: 'px-450-poly',
      price: 219.00,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&q=80',
      specs: '450W peak power, 19.5% Efficiency',
      inStock: true
    },
    {
      id: 3,
      name: 'PX-600 Bifacial Panel',
      slug: 'px-600-bifacial',
      price: 349.00,
      rating: 5,
      image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=600&q=80',
      specs: '600W peak power, 22.1% Efficiency',
      inStock: true
    },
  ];

  return (
    <>
      <SEO
        title="Solar Panels | High-Efficiency Mono & Poly Solar Panels"
        description="Premium Tier-1 solar panels with up to 22% efficiency. Mono-PERC, Poly, and Bifacial panels with 25-year warranty. Shop now."
        keywords="solar panels, mono-perc panels, bifacial solar panels, high efficiency solar panels, buy solar panels"
        ogImage="/solar-panels.png"
      />

      <div className="bg-gray-50 py-24 min-h-screen">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="h-10 w-10 text-primary" />
              <h1 className="text-4xl font-extrabold text-gray-900">
                Solar <span className="text-primary">Panels</span>
              </h1>
            </div>
            <p className="text-gray-600 max-w-2xl text-lg">
              Premium Tier-1 solar panels with industry-leading efficiency and 25-year performance warranty. Optimized for Nigerian climate conditions.
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
            <h2 className="text-3xl font-bold mb-4">Need Help Choosing the Right Panel?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Our solar experts can help you calculate the perfect system size for your energy needs
            </p>
            <Link 
              to="/contact" 
              className="inline-block bg-secondary px-8 py-4 rounded-lg font-bold text-gray-900 hover:scale-105 transition-transform"
            >
              Get Expert Advice
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SolarPanelsPage;
