import React from 'react';
import { Link } from 'react-router-dom';
import { Factory, Zap, Shield, Gauge, Settings, ArrowRight } from 'lucide-react';
import SEO from '@/components/SEO';

const IndustrialPage: React.FC = () => {
  const capabilities = [
    { icon: <Zap className="h-8 w-8" />, title: 'MW-Scale Systems', desc: 'Handle the heaviest industrial loads' },
    { icon: <Shield className="h-8 w-8" />, title: 'Zero Downtime', desc: 'Uninterrupted power for manufacturing' },
    { icon: <Gauge className="h-8 w-8" />, title: 'Advanced Cooling', desc: 'High-voltage power electronics' },
    { icon: <Settings className="h-8 w-8" />, title: 'Hybrid Management', desc: 'Seamless switching between sources' },
  ];

  const applications = [
    {
      title: 'Manufacturing Plants',
      desc: 'Continuous power for production lines and heavy machinery',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Warehouses & Logistics',
      desc: 'Reliable energy for 24/7 operations and cold storage',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Data Centers',
      desc: 'Mission-critical power with redundant backup systems',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80'
    },
  ];

  return (
    <>
      <SEO
        title="Industrial Solar Solutions | Large-Scale Solar Power Systems"
        description="MW-scale solar systems for industrial operations. Zero downtime with hybrid energy management. Advanced cooling and high-voltage power electronics."
        keywords="industrial solar, factory solar power, manufacturing solar energy, large scale solar, MW solar systems"
        ogImage="/industrial-solar.png"
      />

      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-r from-primary to-blue-700 py-20 text-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center space-x-3 mb-6">
              <Factory className="h-10 w-10" />
              <span className="text-2xl font-bold uppercase tracking-widest">Industrial Solar</span>
            </div>
            <h1 className="mb-6 text-5xl font-extrabold lg:text-6xl">
              Scale Your Power with Massive Reliability
            </h1>
            <p className="mb-8 max-w-2xl text-xl opacity-90">
              Industrial operations require zero downtime. Our MW-scale systems integrate advanced cooling and high-voltage power electronics to handle the heaviest loads.
            </p>
            <Link 
              to="/contact" 
              className="inline-block bg-secondary px-8 py-4 rounded-lg font-bold text-gray-900 hover:scale-105 transition-transform"
            >
              Request Industrial Audit
            </Link>
          </div>
        </section>

        {/* Capabilities */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-4xl font-bold">Industrial-Grade Capabilities</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {capabilities.map((cap, i) => (
                <div key={i} className="rounded-2xl bg-gray-50 p-8 text-center hover:shadow-lg transition-shadow">
                  <div className="mb-4 flex justify-center text-primary">{cap.icon}</div>
                  <h3 className="mb-2 text-xl font-bold">{cap.title}</h3>
                  <p className="text-gray-600">{cap.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hybrid Energy Management */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">Uninterrupted Manufacturing</h2>
                <p className="text-xl text-gray-600 mb-8">
                  Our hybrid energy management system switches seamlessly between solar, battery, and grid power to ensure your operations never stop.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 bg-white rounded-lg">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Solar Priority</h4>
                      <p className="text-gray-600 text-sm">System automatically uses solar power during daylight hours</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-4 bg-white rounded-lg">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Battery Backup</h4>
                      <p className="text-gray-600 text-sm">Instant switchover to battery during outages or peak demand</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-4 bg-white rounded-lg">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Grid Integration</h4>
                      <p className="text-gray-600 text-sm">Seamless grid connection for additional power when needed</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80" 
                  alt="Industrial Facility" 
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Applications */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-4 text-center text-4xl font-bold">Industrial Applications</h2>
            <p className="mb-12 text-center text-xl text-gray-600">Powering diverse industrial operations</p>
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
            <h2 className="mb-6 text-4xl font-bold">Power Your Industrial Future</h2>
            <p className="mb-8 text-xl opacity-90">Get a customized MW-scale solar solution</p>
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-2 rounded-lg bg-secondary px-8 py-4 font-bold text-gray-900 hover:scale-105 transition-transform"
            >
              Schedule Industrial Audit
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default IndustrialPage;
