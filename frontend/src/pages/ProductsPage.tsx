import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import SEO from '@/components/SEO';

const ProductsPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const products = [
    {
      name: 'PX-550 Series Mono-PERC',
      category: 'Panels',
      price: '$289.00',
      rating: 5,
      img: 'https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=600&q=80',
      specs: '550W peak power, 21.7% Efficiency',
      link: '/products/solar-panels'
    },
    {
      name: 'Titan Hybrid Inverter v3',
      category: 'Inverters',
      price: '$1,450.00',
      rating: 4.9,
      img: 'https://images.unsplash.com/photo-1620214948402-b1324422333d?auto=format&fit=crop&w=600&q=80',
      specs: '10kW Single Phase, Smart IoT',
      link: '/products/inverters'
    },
    {
      name: 'PentoraX LiFePO4 Wall',
      category: 'Storage',
      price: '$2,100.00',
      rating: 5,
      img: 'https://images.unsplash.com/photo-1611317546394-0495349e7f9d?auto=format&fit=crop&w=600&q=80',
      specs: '5.1kWh, 6000+ Cycles',
      link: '/products/batteries'
    },
    {
      name: 'Smart Energy Optimizer',
      category: 'Accessories',
      price: '$199.00',
      rating: 4.8,
      img: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=600&q=80',
      specs: 'Real-time AI balancing',
      link: '/products/accessories'
    }
  ];

  const filters = ['All', 'Panels', 'Inverters', 'Storage', 'Accessories'];

  const filteredProducts = selectedFilter === 'All' 
    ? products 
    : products.filter(p => p.category === selectedFilter);

  return (
    <>
      <SEO
        title="Solar Products | Premium Solar Panels, Inverters & Batteries"
        description="Premium solar components from Tier-1 manufacturers. Browse our catalog of solar panels, inverters, batteries, and accessories optimized in PentoraX labs."
        keywords="solar panels, solar inverters, solar batteries, solar accessories, buy solar products, solar equipment"
        ogImage="/products-catalog.png"
      />

      <div className="bg-gray-50 py-24 animate-in fade-in duration-700">
        <div className="container mx-auto px-4">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
                Hardware <span className="text-primary">Catalog</span>
              </h1>
              <p className="text-gray-600 max-w-xl">
                Premium components sourced from Tier-1 manufacturers and optimized in our PentoraX labs.
              </p>
            </div>
            <div className="flex gap-4 flex-wrap">
              {filters.map(f => (
                <button 
                  key={f} 
                  onClick={() => setSelectedFilter(f)}
                  className={`px-6 py-2 rounded-full border font-bold transition-all shadow-sm ${
                    selectedFilter === f 
                      ? 'border-primary bg-primary text-white' 
                      : 'border-gray-200 bg-white hover:border-primary hover:text-primary'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((p, i) => (
              <div key={i} className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-gray-100 group">
                <Link to={p.link} className="block">
                  <div className="h-64 overflow-hidden relative">
                    <img 
                      src={p.img} 
                      alt={p.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-primary">
                      {p.category}
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, idx) => (
                        <Star 
                          key={idx} 
                          className={`h-4 w-4 ${idx < Math.floor(p.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} 
                        />
                      ))}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{p.name}</h3>
                    <p className="text-gray-500 text-sm mb-6">{p.specs}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-2xl font-black text-primary">{p.price}</span>
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          // Add to cart logic here
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

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500">No products found in this category.</p>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-20 bg-gradient-to-r from-primary to-blue-700 rounded-3xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Need Help Choosing?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Our solar experts can help you select the perfect components for your energy needs
            </p>
            <Link 
              to="/contact" 
              className="inline-block bg-secondary px-8 py-4 rounded-lg font-bold text-gray-900 hover:scale-105 transition-transform"
            >
              Talk to an Expert
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
