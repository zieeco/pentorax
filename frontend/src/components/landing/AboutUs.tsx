
import React from 'react';
import { Target, Zap, ShieldCheck } from 'lucide-react';

const AboutUs: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative py-24 bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img src="https://images.unsplash.com/photo-1497440001374-f26997328c1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="Office" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-7xl font-extrabold mb-6">Our Legacy. <span className="text-secondary">Your Future.</span></h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">PentoraX is more than a solar company; we are a clean-tech movement dedicated to powering every corner of the globe with sustainable energy.</p>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="p-10 rounded-[2rem] bg-gray-50 border border-gray-100 hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <Target className="h-8 w-8 text-primary group-hover:text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">To accelerate the global transition to renewable energy by providing accessible, reliable, and intelligent solar solutions for everyone.</p>
            </div>
            <div className="p-10 rounded-[2rem] bg-gray-50 border border-gray-100 hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <ShieldCheck className="h-8 w-8 text-primary group-hover:text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">A world where energy is no longer a luxury, but a clean, abundant resource that empowers communities and protects our planet.</p>
            </div>
            <div className="p-10 rounded-[2rem] bg-gray-50 border border-gray-100 hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <Zap className="h-8 w-8 text-primary group-hover:text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Core Innovation</h3>
              <p className="text-gray-600 leading-relaxed">We leverage AI and IoT to build smart energy grids that optimize consumption and maximize savings for our customers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Meet the <span className="text-primary">Visionaries</span></h2>
          <p className="text-gray-600 mb-16">The experts behind the PentoraX energy revolution.</p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Dr. Sarah Chen', role: 'CEO & Founder', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80' },
              { name: 'Marcus Adebayo', role: 'Chief Tech Officer', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
              { name: 'Elena Rodriguez', role: 'Head of Operations', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80' },
              { name: 'Julian Smith', role: 'Principal Engineer', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80' }
            ].map((member, i) => (
              <div key={i} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-gray-100">
                <div className="h-72 overflow-hidden">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900">{member.name}</h4>
                  <p className="text-primary font-semibold">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
