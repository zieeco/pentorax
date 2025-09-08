import React from 'react';
import { Play, ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-green-50 to-blue-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Power Your Future with
                <span className="text-green-600 block">Clean Energy</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl">
                Transform your home or business with our premium solar solutions. 
                Reliable, efficient, and sustainable energy systems designed for the African market.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-all duration-300 flex items-center justify-center group">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-600 hover:text-white transition-all duration-300 flex items-center justify-center">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-green-600">10K+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-green-600">50MW+</div>
                <div className="text-sm text-gray-600">Energy Generated</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-green-600">15+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.pexels.com/photos/9875415/pexels-photo-9875415.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                alt="Solar panels installation"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -top-4 -left-4 bg-white p-4 rounded-xl shadow-lg z-20">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold">24/7</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Support</div>
                  <div className="text-sm text-gray-600">Always Available</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg z-20">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold">5★</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Rated</div>
                  <div className="text-sm text-gray-600">Customer Reviews</div>
                </div>
              </div>
            </div>

            {/* Background Decorations */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-200 rounded-full opacity-20 -z-10"></div>
            <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-blue-200 rounded-full opacity-30 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;