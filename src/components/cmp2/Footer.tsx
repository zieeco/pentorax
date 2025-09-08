import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    products: [
      'Solar Panels',
      'Inverters',
      'Batteries',
      'Monitoring Systems',
      'Accessories'
    ],
    solutions: [
      'Residential Solar',
      'Commercial Solar',
      'Industrial Solar',
      'Off-Grid Systems',
      'Hybrid Systems'
    ],
    company: [
      'About Us',
      'Our Team',
      'Careers',
      'News & Updates',
      'Case Studies'
    ],
    support: [
      'Customer Support',
      'Installation Guide',
      'Warranty',
      'Maintenance',
      'FAQ'
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <img 
                src="https://images.pexels.com/photos/9875415/pexels-photo-9875415.jpeg?auto=compress&cs=tinysrgb&w=200&h=60&fit=crop" 
                alt="Arnergy Logo" 
                className="h-10 w-auto mb-4 brightness-0 invert"
              />
              <p className="text-gray-300 leading-relaxed">
                Leading the solar revolution in Africa with innovative, reliable, 
                and sustainable energy solutions for homes, businesses, and industries.
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <Phone className="h-5 w-5 mr-3 text-green-400" />
                <span>+234 800 ARNERGY</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Mail className="h-5 w-5 mr-3 text-green-400" />
                <span>info@arnergy.com</span>
              </div>
              <div className="flex items-start text-gray-300">
                <MapPin className="h-5 w-5 mr-3 mt-1 text-green-400" />
                <span>123 Solar Street, Victoria Island<br />Lagos, Nigeria</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="bg-gray-800 p-3 rounded-lg hover:bg-green-600 transition-colors group"
                  >
                    <IconComponent className="h-5 w-5 text-gray-300 group-hover:text-white" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Products</h3>
            <ul className="space-y-3">
              {footerLinks.products.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Solutions</h3>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
              <p className="text-gray-300">Get the latest news and updates about solar energy</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
              />
              <button className="bg-green-600 px-6 py-3 rounded-r-lg hover:bg-green-700 transition-colors font-semibold">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Arnergy. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;