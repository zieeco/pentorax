import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Battery, Sun, Zap, Shield, ArrowRight } from 'lucide-react';
import SEO from '@/components/SEO';

const OffGridPage: React.FC = () => {
  const features = [
    { icon: <Battery className="h-8 w-8" />, title: 'Complete Independence', desc: 'No reliance on unstable grid power' },
    { icon: <Sun className="h-8 w-8" />, title: 'Advanced Storage', desc: 'High-capacity battery systems for extended backup' },
    { icon: <Zap className="h-8 w-8" />, title: 'Weather-Resistant', desc: 'Designed for harsh environmental conditions' },
    { icon: <Shield className="h-8 w-8" />, title: '72-Hour Backup', desc: 'Continuous power even during cloudy days' },
  ];

  const applications = [
    {
      title: 'Remote Locations',
      desc: 'Perfect for areas without grid access or unreliable power supply',
      image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Telecommunications',
      desc: 'Reliable power for cell towers and communication infrastructure',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Research Stations',
      desc: 'Sustainable energy for remote research and monitoring facilities',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80'
    },
  ];

  return (
    <>
      <SEO
        title="Off-Grid Solar Solutions | Independent Solar Power Systems"
        description="Complete energy independence with off-grid solar systems. Advanced battery storage, 72-hour backup, and weather-resistant design for remote locations."
        keywords="off-grid solar, remote solar power, standalone solar systems, solar battery backup, independent energy"
        ogImage="/offgrid-solar.png"
      />

      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-r from-primary to-blue-700 py-20 text-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center space-x-3 mb-6">
              <MapPin className="h-10 w-10" />
              <span className="text-2xl font-bold uppercase tracking-widest">Off-Grid Solar</span>
            </div>
            <h1 className="mb-6 text-5xl font-extrabold lg:text-6xl">
              Complete Energy Independence
            </h1>
            <p className="mb-8 max-w-2xl text-xl opacity-90">
              Stay powered in remote areas with fully independent off-grid solar systems. Advanced battery storage and weather-resistant design ensure reliable power anywhere.
            </p>
            <Link 
              to="/contact" 
              className="inline-block bg-secondary px-8 py-4 rounded-lg font-bold text-gray-900 hover:scale-105 transition-transform"
            >
              Request Off-Grid Quote
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-4xl font-bold">Off-Grid Capabilities</h2>
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

        {/* System Components */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">Fully Autonomous Power System</h2>
                <p className="text-xl text-gray-600 mb-8">
                  Our off-grid systems are engineered for complete energy independence with advanced components that work seamlessly together.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 bg-white rounded-lg">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">High-Capacity Solar Array</h4>
                      <p className="text-gray-600 text-sm">Oversized panels to maximize energy capture in all conditions</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-4 bg-white rounded-lg">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Deep-Cycle Batteries</h4>
                      <p className="text-gray-600 text-sm">Extended storage capacity for 72+ hours of backup power</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-4 bg-white rounded-lg">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Smart Charge Controller</h4>
                      <p className="text-gray-600 text-sm">Intelligent battery management for optimal performance and longevity</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1000&q=80" 
                  alt="Off-Grid Solar Installation" 
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Applications */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-4 text-center text-4xl font-bold">Off-Grid Applications</h2>
            <p className="mb-12 text-center text-xl text-gray-600">Powering remote and independent operations</p>
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
            <h2 className="mb-6 text-4xl font-bold">Go Completely Off-Grid</h2>
            <p className="mb-8 text-xl opacity-90">Get a customized off-grid solar solution</p>
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-2 rounded-lg bg-secondary px-8 py-4 font-bold text-gray-900 hover:scale-105 transition-transform"
            >
              Schedule Consultation
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default OffGridPage;
