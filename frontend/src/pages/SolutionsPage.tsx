import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Building2, Factory, CheckCircle, BarChart3, SunMedium, Zap } from 'lucide-react';
import SEO from '@/components/SEO';

const SolutionsPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Solar Energy Solutions | Residential, Commercial & Industrial"
        description="Tailored solar energy solutions for homes, businesses, and industrial facilities. From single-family homes to massive industrial clusters, we deliver optimized power systems."
        keywords="residential solar, commercial solar, industrial solar, solar solutions Nigeria, business solar power, home solar energy"
        ogImage="/solutions-header.png"
      />
      
      <div className="animate-in fade-in slide-in-from-bottom-5 duration-700">
        {/* Header */}
        <section className="py-20 bg-primary text-white text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-extrabold mb-4">Tailored Energy Solutions</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              From single-family homes to massive industrial clusters, we deliver optimized power systems.
            </p>
          </div>
        </section>

        {/* Solutions Breakdown */}
        <section className="py-24 space-y-32">
          {/* Residential */}
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2">
                <div className="flex items-center space-x-3 text-primary mb-6">
                  <Home className="h-8 w-8" />
                  <span className="text-xl font-bold uppercase tracking-widest">Residential</span>
                </div>
                <h2 className="text-4xl font-bold mb-6">Energy Independence for Modern Homes</h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  Our residential systems are designed for aesthetics and performance. Say goodbye to blackouts and rising electricity bills with our smart solar-plus-storage systems.
                </p>
                <ul className="space-y-4 mb-8">
                  {['Quiet and noiseless operation', 'Smart App monitoring', 'Net metering integration', 'High-density lithium storage'].map((f, i) => (
                    <li key={i} className="flex items-center space-x-3">
                      <CheckCircle className="h-6 w-6 text-green-500" />
                      <span className="font-semibold text-gray-700">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link 
                  to="/solutions/residential" 
                  className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Learn More
                </Link>
              </div>
              <div className="lg:w-1/2 rounded-[3rem] overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1513694490325-244a22538b7a?auto=format&fit=crop&w=1000&q=80" alt="Home" className="w-full h-[500px] object-cover" />
              </div>
            </div>
          </div>

          {/* Commercial */}
          <div className="bg-gray-50 py-24">
            <div className="container mx-auto px-4">
              <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
                <div className="lg:w-1/2">
                  <div className="flex items-center space-x-3 text-primary mb-6">
                    <Building2 className="h-8 w-8" />
                    <span className="text-xl font-bold uppercase tracking-widest">Commercial</span>
                  </div>
                  <h2 className="text-4xl font-bold mb-6">Boosting Business Bottom Lines</h2>
                  <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                    PentoraX helps businesses reduce operational expenses by up to 40%. Our commercial systems offer an average ROI period of just 4-6 years.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-6 mb-8">
                    <div className="p-6 bg-white rounded-2xl shadow-sm">
                      <BarChart3 className="h-10 w-10 text-primary mb-4" />
                      <h4 className="font-bold mb-2">Cost Optimization</h4>
                      <p className="text-sm text-gray-500">Peak-shaving technology to avoid high-tariff periods.</p>
                    </div>
                    <div className="p-6 bg-white rounded-2xl shadow-sm">
                      <SunMedium className="h-10 w-10 text-primary mb-4" />
                      <h4 className="font-bold mb-2">Sustainability</h4>
                      <p className="text-sm text-gray-500">Achieve your ESG goals and carbon footprint targets.</p>
                    </div>
                  </div>
                  <Link 
                    to="/solutions/commercial" 
                    className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Learn More
                  </Link>
                </div>
                <div className="lg:w-1/2 rounded-[3rem] overflow-hidden shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80" alt="Office" className="w-full h-[500px] object-cover" />
                </div>
              </div>
            </div>
          </div>

          {/* Industrial */}
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2">
                <div className="flex items-center space-x-3 text-primary mb-6">
                  <Factory className="h-8 w-8" />
                  <span className="text-xl font-bold uppercase tracking-widest">Industrial</span>
                </div>
                <h2 className="text-4xl font-bold mb-6">Scale Your Power with Massive Reliability</h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  Industrial operations require zero downtime. Our MW-scale systems integrate advanced cooling and high-voltage power electronics to handle the heaviest loads.
                </p>
                <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10 mb-8">
                  <div className="flex items-start space-x-4 mb-6">
                    <Zap className="h-8 w-8 text-primary mt-1" />
                    <div>
                      <h4 className="text-xl font-bold">Uninterrupted Manufacturing</h4>
                      <p className="text-gray-600">Hybrid energy management that switches seamlessly between solar, battery, and grid.</p>
                    </div>
                  </div>
                  <Link 
                    to="/contact" 
                    className="block w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-primary/20 text-center"
                  >
                    Request Industrial Audit
                  </Link>
                </div>
                <Link 
                  to="/solutions/industrial" 
                  className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Learn More
                </Link>
              </div>
              <div className="lg:w-1/2 rounded-[3rem] overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80" alt="Industrial Facility" className="w-full h-[500px] object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Global Reach CTA */}
        <section className="bg-gray-900 py-24 text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">Ready to Power Your Future?</h2>
            <Link 
              to="/contact" 
              className="inline-block bg-secondary text-gray-900 px-12 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-transform shadow-xl shadow-secondary/10"
            >
              Contact an Expert Today
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default SolutionsPage;
