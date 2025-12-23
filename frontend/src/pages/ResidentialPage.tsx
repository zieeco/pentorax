import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Zap, Smartphone, Shield, TrendingDown, ArrowRight } from 'lucide-react';
import SEO from '@/components/SEO';

const ResidentialPage: React.FC = () => {
  const features = [
    { icon: <Zap className="h-8 w-8" />, title: 'Quiet Operation', desc: 'Noiseless solar panels and inverters' },
    { icon: <Smartphone className="h-8 w-8" />, title: 'Smart Monitoring', desc: 'Track energy production via mobile app' },
    { icon: <Shield className="h-8 w-8" />, title: 'Net Metering', desc: 'Sell excess power back to the grid' },
    { icon: <TrendingDown className="h-8 w-8" />, title: 'Cost Savings', desc: 'Up to 80% reduction in electricity bills' },
  ];

  const applications = [
    {
      title: 'Single-Family Homes',
      desc: 'Perfect for individual houses with rooftop solar installations',
      image: 'https://images.unsplash.com/photo-1513694490325-244a22538b7a?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Townhouses & Villas',
      desc: 'Scalable systems for multi-unit residential properties',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Residential Estates',
      desc: 'Community solar solutions for gated communities',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
    },
  ];

  return (
    <>
      <SEO
        title="Residential Solar Solutions | Home Solar Power Systems"
        description="Energy independence for modern homes. Quiet, smart solar-plus-storage systems with up to 80% reduction in electricity bills. 25-year warranty."
        keywords="home solar panels, residential solar Nigeria, solar for homes, home energy storage, solar battery backup"
        ogImage="/residential-solar.png"
      />

      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-r from-primary to-blue-700 py-20 text-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center space-x-3 mb-6">
              <Home className="h-10 w-10" />
              <span className="text-2xl font-bold uppercase tracking-widest">Residential Solar</span>
            </div>
            <h1 className="mb-6 text-5xl font-extrabold lg:text-6xl">
              Energy Independence for Modern Homes
            </h1>
            <p className="mb-8 max-w-2xl text-xl opacity-90">
              Say goodbye to blackouts and rising electricity bills with our smart solar-plus-storage systems designed for aesthetics and performance.
            </p>
            <Link 
              to="/contact" 
              className="inline-block bg-secondary px-8 py-4 rounded-lg font-bold text-gray-900 hover:scale-105 transition-transform"
            >
              Get Free Quote
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-4xl font-bold">Why Choose Residential Solar?</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, i) => (
                <div key={i} className="rounded-2xl bg-gray-50 p-8 text-center hover:shadow-lg transition-shadow">
                  <div className="mb-4 flex justify-center text-primary">{feature.icon}</div>
                  <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Complete Solution */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">Complete Home Energy Solution</h2>
                <p className="text-xl text-gray-600 mb-8">
                  Our residential systems include everything you need for complete energy independence - from high-efficiency solar panels to smart battery storage.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 bg-white rounded-lg">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Solar Panels</h4>
                      <p className="text-gray-600 text-sm">High-efficiency Tier 1 panels with 25-year warranty</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-4 bg-white rounded-lg">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Battery Storage</h4>
                      <p className="text-gray-600 text-sm">High-density lithium batteries for 24/7 power availability</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-4 bg-white rounded-lg">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Smart Monitoring</h4>
                      <p className="text-gray-600 text-sm">Mobile app control with real-time analytics and optimization</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1513694490325-244a22538b7a?auto=format&fit=crop&w=1000&q=80" 
                  alt="Modern Home with Solar" 
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Applications */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-4 text-center text-4xl font-bold">Residential Applications</h2>
            <p className="mb-12 text-center text-xl text-gray-600">Perfect for every type of home</p>
            <div className="grid gap-8 md:grid-cols-3">
              {applications.map((app, i) => (
                <div key={i} className="group overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all">
                  <div className="relative h-64">
                    <img 
                      src={app.image} 
                      alt={app.title} 
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  </div>
                  <div className="p-6 bg-white">
                    <h3 className="text-2xl font-bold mb-2">{app.title}</h3>
                    <p className="text-gray-600">{app.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gray-900 py-20 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-6 text-4xl font-bold">Ready to Go Solar?</h2>
            <p className="mb-8 text-xl opacity-90">Join thousands of homeowners saving on energy costs</p>
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-2 rounded-lg bg-secondary px-8 py-4 font-bold text-gray-900 hover:scale-105 transition-transform"
            >
              Schedule Free Consultation
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default ResidentialPage;
