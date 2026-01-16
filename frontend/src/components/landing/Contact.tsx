
import React from 'react';
import { Phone, MessageCircle, Calendar, ArrowRight } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-blue-50 py-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-white shadow-2xl rounded-2xl overflow-hidden">
          <div className="lg:flex lg:items-stretch">
            {/* Left Content */}
            <div className="lg:w-1/2 p-8 md:p-12 lg:p-16">
              <div className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-6">
                Expert Support
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Questions? Speak To Our Experts
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Our experts are always available to speak with you and share valuable insights and details regarding your requests, as well as guide you towards finding the right solar solutions that meet your energy needs and align with your budget.
              </p>

              {/* Contact Options */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Call Us Directly</p>
                    <p className="text-gray-600">+234 808 159 8604</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Email Support</p>
                    <p className="text-gray-600">support@pentorax.com</p>
                  </div>
                </div>
              </div>

              <a 
                href="/contact" 
                className="inline-flex items-center gap-2 bg-orange-500 text-white font-bold px-8 py-4 rounded-xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/30 hover:shadow-xl hover:scale-105"
              >
                Get FREE Consultation
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>

            {/* Right Visual */}
            <div className="hidden lg:block lg:w-1/2 relative bg-gradient-to-br from-blue-600 to-blue-800 p-16">
              {/* Decorative Elements */}
              <div className="absolute top-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 left-10 w-60 h-60 bg-blue-400/20 rounded-full blur-3xl"></div>
              
              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-center">
                <div className="space-y-6">
                  {/* Stat Card 1 */}
                  <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 transform hover:scale-105 transition-transform">
                    <div className="flex items-center gap-4">
                      <div className="h-14 w-14 bg-white/20 rounded-xl flex items-center justify-center">
                        <Phone className="h-7 w-7 text-white" />
                      </div>
                      <div className="text-white">
                        <p className="text-3xl font-bold">24/7</p>
                        <p className="text-blue-100">Available Support</p>
                      </div>
                    </div>
                  </div>

                  {/* Stat Card 2 */}
                  <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 transform hover:scale-105 transition-transform ml-8">
                    <div className="flex items-center gap-4">
                      <div className="h-14 w-14 bg-white/20 rounded-xl flex items-center justify-center">
                        <Calendar className="h-7 w-7 text-white" />
                      </div>
                      <div className="text-white">
                        <p className="text-3xl font-bold">1000+</p>
                        <p className="text-blue-100">Consultations Done</p>
                      </div>
                    </div>
                  </div>

                  {/* Stat Card 3 */}
                  <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 transform hover:scale-105 transition-transform">
                    <div className="flex items-center gap-4">
                      <div className="h-14 w-14 bg-white/20 rounded-xl flex items-center justify-center">
                        <MessageCircle className="h-7 w-7 text-white" />
                      </div>
                      <div className="text-white">
                        <p className="text-3xl font-bold">100%</p>
                        <p className="text-blue-100">Expert Guidance</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Badge */}
                <div className="absolute -bottom-6 -right-6 bg-orange-500 text-white px-6 py-3 rounded-full font-bold shadow-2xl rotate-12 transform hover:rotate-0 transition-transform">
                  Free Consultation!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
