
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section 
      className="relative bg-cover bg-center text-white py-24 md:py-32" 
      style={{ backgroundImage: "url('https://picsum.photos/1600/900?image=20')" }}
    >
      <div className="absolute inset-0 bg-gray-800 opacity-60"></div>
      <div 
        className="absolute inset-0 opacity-10"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}}
      ></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              Make Smart Solar Decisions and Enjoy Optimal Benefits
            </h1>
            <p className="mt-6 text-lg md:text-xl max-w-xl mx-auto lg:mx-0">
              Enjoy 24/7 uninterrupted power with top-quality and reliable solar solutions.
            </p>
            <div className="mt-8">
              <a 
                href="#"
                className="inline-block bg-blue-500 text-white font-bold text-lg px-8 py-4 rounded-md shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
              >
                Get Quote + Pricing Now
              </a>
            </div>
          </div>
          <div className="lg:w-1/2 mt-12 lg:mt-0 flex justify-center lg:justify-end">
            <img src="https://i.imgur.com/kPzH4Pj.png" alt="Solar Products" className="w-full max-w-sm" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
