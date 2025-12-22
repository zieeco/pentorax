
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Subscription */}
          <div>
            <h3 className="font-semibold text-white mb-4">Subscribe to our newsletter</h3>
            <p className="text-sm mb-4">For regular insights on residential and commercial renewable energy solutions.</p>
            <form>
              <input type="text" placeholder="Full Name" className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 mb-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="email" placeholder="Email Address" className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 mb-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 transition-colors">SUBSCRIBE NOW</button>
            </form>
          </div>

          {/* About & Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">Arnergy</h3>
            <p className="text-sm mb-6">A renewable energy and clean tech company offering sustainable solar solutions tailored to address pressing energy needs.</p>
            <ul className="space-y-3 text-sm">
                <li className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg> 07002288888</li>
                <li className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg> support@arnergy.com</li>
                <li className="flex items-start"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg> 1, Industrial Street, Ilupeju, Lagos</li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Management Team</a></li>
                <li><a href="#" className="hover:text-white">Product Specifications</a></li>
                <li><a href="#" className="hover:text-white">Customer Reviews</a></li>
                <li><a href="#" className="hover:text-white">Case Studies</a></li>
                <li><a href="#" className="hover:text-white">Solarbase Login</a></li>
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h3 className="font-semibold text-white mb-4 invisible hidden md:visible">.</h3>
             <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Commercial Solar</a></li>
                <li><a href="#" className="hover:text-white">Residential</a></li>
                <li><a href="#" className="hover:text-white">Blog Posts</a></li>
                <li><a href="#" className="hover:text-white">FAQs</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>All rights reserved © 2025</p>
          <a href="#" className="hover:text-white mt-4 md:mt-0">Arnergy Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
