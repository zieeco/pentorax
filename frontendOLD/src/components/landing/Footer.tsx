
import React from 'react';
import NewsletterForm from './NewsletterForm';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Subscription */}
          <div>
            <h3 className="font-semibold text-white mb-4">Subscribe to our newsletter</h3>
            <p className="text-sm mb-4">For regular insights on residential and commercial renewable energy solutions.</p>
            <NewsletterForm />
          </div>

          {/* About & Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">Pentorax</h3>
            <p className="text-sm mb-6">A renewable energy and clean tech company offering sustainable solar solutions tailored to address pressing energy needs.</p>
            <ul className="space-y-3 text-sm">
                <li className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg> 07002288888</li>
                <li className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg> support@pentorax.com</li>
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

        {/* Bottom section */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; 2026 Pentorax Solar Energy Solutions. All rights reserved.</p>
            <p className="mt-2 md:mt-0">
              Developed by{' '}
              <a 
                href="https://github.com/zieeco" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
              >
                zieeco
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
