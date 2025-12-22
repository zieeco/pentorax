
import React from 'react';

const FeatureItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="flex items-start">
    <svg className="w-5 h-5 text-yellow-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.368-2.448a1 1 0 00-1.176 0l-3.368 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.07 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
    </svg>
    <span className="text-gray-700">{children}</span>
  </li>
);

const Offerings: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">What Will Arnergy Offer You?</h2>
          <p className="mt-4 text-lg text-gray-600">Adopt the Model Solar Solution for Homes and Businesses.</p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          <ul className="space-y-4 lg:w-1/3 text-left">
            <FeatureItem>24/7 uninterrupted power supply.</FeatureItem>
            <FeatureItem>Five (5) years of warranty.</FeatureItem>
            <FeatureItem>Over ten (10) years service life.</FeatureItem>
            <FeatureItem>Flexible funding options.</FeatureItem>
            <FeatureItem>Active after-sales Support.</FeatureItem>
          </ul>

          <div className="lg:w-1/4 flex justify-center">
            <img src="https://i.imgur.com/kPzH4Pj.png" alt="Arnergy Solar Unit" className="max-w-xs w-full" />
          </div>

          <ul className="space-y-4 lg:w-1/3 text-left">
            <FeatureItem>Lasting lithium (LiFePO4) batteries.</FeatureItem>
            <FeatureItem>Modular and scalable system units.</FeatureItem>
            <FeatureItem>Online remote energy management.</FeatureItem>
            <FeatureItem>Clean, stable, and noiseless electricity.</FeatureItem>
            <FeatureItem>Smooth installation and maintenance.</FeatureItem>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Offerings;
