import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, TrendingDown, Clock, BarChart3, Award, ArrowRight } from 'lucide-react';
import SEO from '@/components/SEO';

const CommercialPage: React.FC = () => {
  const benefits = [
    { icon: <TrendingDown className="h-8 w-8" />, title: 'Reduce Costs by 40%', desc: 'Slash operational expenses with solar energy' },
    { icon: <Clock className="h-8 w-8" />, title: '4-6 Year ROI', desc: 'Fast return on investment period' },
    { icon: <BarChart3 className="h-8 w-8" />, title: 'Peak Shaving', desc: 'Avoid high-tariff periods automatically' },
    { icon: <Award className="h-8 w-8" />, title: 'ESG Compliance', desc: 'Meet sustainability goals and targets' },
  ];

  const applications = [
    {
      title: 'Offices & Corporate Buildings',
      desc: 'Reduce operational costs for office complexes and corporate headquarters',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Retail & Shopping Centers',
      desc: 'Power shopping malls and retail stores with sustainable energy',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Hotels & Hospitality',
      desc: 'Provide reliable power for hotels, resorts, and hospitality venues',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
    },
  ];

  return (
    <>
      <SEO
        title="Commercial Solar Solutions | Business Solar Power Systems"
        description="Boost your business bottom line with commercial solar. Reduce operational expenses by 40% with 4-6 year ROI. Peak-shaving technology and ESG compliance."
        keywords="commercial solar, business solar panels, office solar power, retail solar energy, corporate solar solutions"
        ogImage="/commercial-solar.png"
      />

      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-r from-primary to-blue-700 py-20 text-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center space-x-3 mb-6">
              <Building2 className="h-10 w-10" />
              <span className="text-2xl font-bold uppercase tracking-widest">Commercial Solar</span>
            </div>
            <h1 className="mb-6 text-5xl font-extrabold lg:text-6xl">
              Boosting Business Bottom Lines
            </h1>
            <p className="mb-8 max-w-2xl text-xl opacity-90">
              PentoraX helps businesses reduce operational expenses by up to 40%. Our commercial systems offer an average ROI period of just 4-6 years.
            </p>
            <Link 
              to="/contact" 
              className="inline-block bg-secondary px-8 py-4 rounded-lg font-bold text-gray-900 hover:scale-105 transition-transform"
            >
              Request Business Audit
            </Link>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-4xl font-bold">Commercial Solar Benefits</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {benefits.map((benefit, i) => (
                <div key={i} className="rounded-2xl bg-gray-50 p-8 text-center hover:shadow-lg transition-shadow">
                  <div className="mb-4 flex justify-center text-primary">{benefit.icon}</div>
                  <h3 className="mb-2 text-xl font-bold">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Business Optimization */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">Maximize Business Efficiency</h2>
                <p className="text-xl text-gray-600 mb-8">
                  Our commercial solar systems are designed to optimize your business operations with advanced energy management and cost-saving features.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 bg-white rounded-lg">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Peak Shaving Technology</h4>
                      <p className="text-gray-600 text-sm">Automatically avoid high-tariff periods to maximize savings</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-4 bg-white rounded-lg">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Real-Time Monitoring</h4>
                      <p className="text-gray-600 text-sm">Track energy production and costs with advanced analytics</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-4 bg-white rounded-lg">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">ESG Compliance</h4>
                      <p className="text-gray-600 text-sm">Meet sustainability goals and reduce carbon footprint</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80" 
                  alt="Commercial Building" 
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Applications */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-4 text-center text-4xl font-bold">Industries We Serve</h2>
            <p className="mb-12 text-center text-xl text-gray-600">Tailored solutions for every business type</p>
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
            <h2 className="mb-6 text-4xl font-bold">Transform Your Business Energy</h2>
            <p className="mb-8 text-xl opacity-90">Get a customized solar solution for your business</p>
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-2 rounded-lg bg-secondary px-8 py-4 font-bold text-gray-900 hover:scale-105 transition-transform"
            >
              Schedule Free Audit
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default CommercialPage;
