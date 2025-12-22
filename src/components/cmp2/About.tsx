import React from 'react';
import { Award, Users, Globe, Lightbulb } from 'lucide-react';

const About = () => {
  const stats = [
    { number: '15+', label: 'Years Experience', icon: Award },
    { number: '10,000+', label: 'Happy Customers', icon: Users },
    { number: '50MW+', label: 'Energy Generated', icon: Lightbulb },
    { number: '20+', label: 'Countries Served', icon: Globe }
  ];

  const values = [
    {
      title: 'Innovation',
      description: 'Constantly pushing the boundaries of solar technology to deliver cutting-edge solutions.',
      icon: '🚀'
    },
    {
      title: 'Sustainability',
      description: 'Committed to creating a cleaner, greener future for generations to come.',
      icon: '🌱'
    },
    {
      title: 'Quality',
      description: 'Using only the highest quality components and materials in all our installations.',
      icon: '⭐'
    },
    {
      title: 'Service',
      description: 'Providing exceptional customer service and support throughout your solar journey.',
      icon: '🤝'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            About Arnergy
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Leading the solar revolution in Africa with innovative, reliable, and sustainable energy solutions
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center group">
                <div className="bg-green-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-100 transition-colors">
                  <IconComponent className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Content */}
          <div className="space-y-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Powering Africa's Energy Future
            </h3>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Founded with a vision to democratize access to clean energy across Africa, 
                Arnergy has been at the forefront of the solar revolution for over 15 years. 
                We understand the unique energy challenges facing our continent and have 
                developed solutions specifically tailored to African conditions.
              </p>
              <p>
                Our team of experienced engineers, technicians, and energy experts work 
                tirelessly to deliver solar solutions that are not only efficient and 
                reliable but also affordable and accessible to communities across Africa.
              </p>
              <p>
                From small residential installations to large-scale commercial and 
                industrial projects, we've successfully deployed over 50MW of solar 
                capacity, helping thousands of customers reduce their energy costs saving
                and carbon footprint.
              </p>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/9875371/pexels-photo-9875371.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
              alt="Arnergy team"
              className="w-full h-96 object-cover rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-green-600 text-white p-6 rounded-xl shadow-lg">
              <div className="text-2xl font-bold">15+</div>
              <div className="text-sm opacity-90">Years of Excellence</div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-12">
            Our Core Values
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {value.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-20 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 lg:p-12 text-center text-white">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">
            Our Mission
          </h3>
          <p className="text-lg sm:text-xl leading-relaxed max-w-4xl mx-auto opacity-95">
            To accelerate Africa's transition to clean, renewable energy by providing 
            innovative, reliable, and affordable solar solutions that empower communities, 
            businesses, and industries to thrive while protecting our planet for future generations.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;