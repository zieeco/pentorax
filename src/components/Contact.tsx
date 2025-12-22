
import React from 'react';

const Contact: React.FC = () => {
  return (
    <section className="relative bg-gray-50 py-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-white shadow-xl rounded-lg p-8 md:p-12 lg:flex lg:items-center">
          <div className="lg:w-1/2">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">Questions? Speak To Our Experts</h2>
            <p className="mt-4 text-gray-600 max-w-lg">
              Our experts are always available to speak with you and share valuable insights and details regarding your requests, as well as guide you towards finding the right solar solutions that meet your energy needs and align with your budget.
            </p>
            <div className="mt-8">
              <a href="#" className="inline-flex items-center border-2 border-orange-500 text-orange-500 font-semibold px-8 py-3 rounded-md hover:bg-orange-500 hover:text-white transition-colors text-lg">
                Get FREE Consultation
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
          <div className="hidden lg:block lg:w-1/2 mt-10 lg:mt-0">
             <div className="relative h-full flex justify-end items-center">
                <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-800 rounded-full"></div>
                <img src="https://i.imgur.com/2s4P3mI.png" alt="Expert on call" className="relative z-10 w-auto h-[500px] object-contain -mr-12" />
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
