
import React from 'react';
import { Briefcase, Heart, Rocket, Globe2, ArrowRight } from 'lucide-react';

const Careers: React.FC = () => {
  const jobs = [
    { title: 'Solar PV Design Engineer', type: 'Full-time', location: 'Lagos, NG', dept: 'Engineering' },
    { title: 'Senior Full-stack Developer', type: 'Remote', location: 'Global', dept: 'Digital Ops' },
    { title: 'Customer Experience Lead', type: 'Full-time', location: 'Abuja, NG', dept: 'Sales' },
    { title: 'Project Operations Manager', type: 'Full-time', location: 'Nairobi, KE', dept: 'Operations' }
  ];

  return (
    <div className="bg-white min-h-screen pt-20">
      {/* Hero */}
      <section className="py-24 bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <span className="text-primary font-black uppercase tracking-[0.3em] text-sm mb-4 block">Join the Movement</span>
          <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 mb-8">Work that matters. <br/><span className="text-primary">Innovation that powers.</span></h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">We are looking for bold thinkers and relentless executors to help us democratize renewable energy across Africa.</p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button type="button" className="w-full sm:w-auto bg-primary text-white px-8 py-4 rounded-xl font-bold shadow-xl shadow-primary/20 hover:bg-blue-700 transition-colors">View Openings</button>
            <button type="button" className="w-full sm:w-auto bg-white border-2 border-gray-100 text-gray-900 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-colors">Our Culture</button>
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: <Heart className="h-10 w-10 text-red-500" />, title: 'Health & Wellness', desc: 'Comprehensive medical coverage for you and your family.' },
              { icon: <Rocket className="h-10 w-10 text-primary" />, title: 'Rapid Growth', desc: 'Work in a high-speed environment with clear paths to leadership.' },
              { icon: <Globe2 className="h-10 w-10 text-secondary" />, title: 'Remote-First', desc: 'Flexible work arrangements and co-working stipends.' }
            ].map((p, i) => (
              <div key={i} className="text-center p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:shadow-lg transition-all">
                <div className="flex justify-center mb-6">{p.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{p.title}</h3>
                <p className="text-gray-500">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job List */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Open <span className="text-primary">Opportunities</span></h2>
            <div className="max-w-4xl mx-auto space-y-4">
                {jobs.map((job, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between hover:shadow-md transition-all group">
                        <div className="mb-4 md:mb-0">
                            <span className="text-xs font-bold text-primary uppercase tracking-wider">{job.dept}</span>
                            <h4 className="text-xl font-bold text-gray-900 mt-1">{job.title}</h4>
                            <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500 font-medium">
                                <span className="flex items-center"><Briefcase className="h-4 w-4 mr-1"/> {job.type}</span>
                                <span>{job.location}</span>
                            </div>
                        </div>
                        <button type="button" className="flex items-center text-primary font-bold group-hover:underline">
                            Apply Now <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
