import React, { useState } from 'react';
import {
  Phone,
  Mail,
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
  Building2,
  ExternalLink,
  ChevronDown,
  Menu,
  X,
} from 'lucide-react';
import Logo from '@/assets/images/pentorax.jpeg';

const ShopNowIcon: React.FC = () => (
  <ExternalLink className="ml-2 h-5 w-5" aria-hidden="true" />
);

const PentoraxLogo: React.FC = () => (
  <div className="space-x-2k flex items-center">
    <img
      src={Logo}
      alt="Pentorax Logo"
      className="mt-[-20px] h-[7.5rem] w-[7.5rem] object-contain"
    />
    <span className="text-3xdl mt-[-8px] ml-[-41px] font-sand text-[2.59rem] font-extrabold leading-[2.25rem] text-primary">
      PentoraX
    </span>
  </div>
);

const TopHeader: React.FC = () => (
  <div className="fixed top-0 z-50 hidden w-full bg-primary text-white lg:block">
    <div className="container mx-auto flex h-12 items-center justify-center gap-[20rem] px-4 py-8 sm:px-6 lg:px-8">
      {/* Contact Info */}
      <div className="flex items-center space-x-6 text-sm">
        <a
          href="tel:+2348081598604"
          className="flex items-center space-x-2 transition-colors hover:text-secondary"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          <span>+234 808 159 8604</span>
        </a>
        <a
          href="mailto:support@pentorax.com"
          className="flex items-center space-x-2 transition-colors hover:text-secondary"
        >
          <Mail className="h-4 w-4" aria-hidden="true" />
          <span>support@pentorax.com</span>
        </a>
      </div>

      {/* Socials + Contact Button */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-4">
          <a
            href="#"
            aria-label="LinkedIn"
            className="transition-colors hover:text-secondary"
          >
            <Linkedin className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href="#"
            aria-label="Facebook"
            className="transition-colors hover:text-secondary"
          >
            <Facebook className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href="#"
            aria-label="Instagram"
            className="transition-colors hover:text-secondary"
          >
            <Instagram className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href="#"
            aria-label="YouTube"
            className="transition-colors hover:text-secondary"
          >
            <Youtube className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
        <a
          href="/contact"
          className="flex items-center space-x-2 rounded-md border border-white px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-white hover:text-primary"
        >
          <span>Contact Us</span>
          <Building2 className="h-5 w-5" aria-hidden="true" />
        </a>
      </div>
    </div>
  </div>
);

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { 
      name: 'About Us', 
      href: '/about', 
      dropdown: [
        { name: 'Our Story', href: '/about' },
        { name: 'Team', href: '/about/team' },
        { name: 'Careers', href: '/about/careers' },
      ] 
    },
    {
      name: 'Energy Solutions',
      href: '/solutions',
      dropdown: [
        { name: 'Residential', href: '/solutions/residential' },
        { name: 'Commercial', href: '/solutions/commercial' },
        { name: 'Industrial', href: '/solutions/industrial' },
        { name: 'Off-Grid', href: '/solutions/off-grid' },
      ],
    },
    {
      name: 'Solar Products',
      href: '/products',
      dropdown: [
        { name: 'Solar Panels', href: '/products/solar-panels' },
        { name: 'Inverters', href: '/products/inverters' },
        { name: 'Batteries', href: '/products/batteries' },
        { name: 'Accessories', href: '/products/accessories' },
      ],
    },
    {
      name: 'Resources',
      href: '/blog',
      dropdown: [
        { name: 'Blog', href: '/blog' },
        { name: 'Case Studies', href: '/case-studies' },
        { name: 'FAQs', href: '/faqs' },
        { name: 'Support', href: '/support' },
        { name: 'Contact Us', href: '/contact' },
      ],
    },
  ];

  return (
    <header className="mt-20 bg-white shadow-sm">
      <TopHeader />
      <div className="bg-white">
        <div className="containejr mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <a href="/" aria-label="Pentorax Home">
              <PentoraxLogo />
            </a>

            {/* Desktop Nav */}
            <nav
              className="hidden items-center lg:flex font-sand text-[14px]"
              aria-label="Main navigation"
            >
              {navLinks.map((item, index) => (
                <div
                  key={item.name}
                  className="group relative flex items-center"
                >
                  <a
                    href={item.href}
                    className="flex items-center font-medium text-gray-700 hover:text-primary"
                    aria-haspopup={!!item.dropdown}
                    aria-expanded={false}
                  >
                    {item.name}
                    {item.dropdown && <ChevronDown className="ml-1 h-4 w-4" />}
                  </a>
                  {index < navLinks.length - 1 && (
                    <span className="mx-3 text-primary">|</span>
                  )}
                  {item.dropdown && (
                    <div className="absolute left-0 top-full z-50 hidden w-48 rounded-md bg-white py-1 shadow-lg group-hover:block">
                      {item.dropdown.map((subItem) => (
                        <a
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-secondary/10 hover:text-secondary"
                        >
                          {subItem.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Shop Now */}
            <div className="hidden items-center lg:flex">
              <a
                href="/shop"
                className="flex items-center rounded-md border-2 border-primary px-6 py-2 font-semibold text-primary transition-all hover:bg-primary hover:text-white"
              >
                Shop Now <ShopNowIcon />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-primary"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="bg-white shadow-lg lg:hidden" id="mobile-menu">
          <nav className="flex flex-col space-y-4 p-4">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center py-2 text-gray-600 hover:text-primary"
              >
                {item.name}
                {item.dropdown && <ChevronDown className="ml-1 h-4 w-4" />}
              </a>
            ))}
            <a
              href="/shop"
              className="mt-4 flex items-center justify-center rounded-md border-2 border-primary px-6 py-2 font-semibold text-primary transition-all hover:bg-primary hover:text-white"
            >
              Shop Now <ExternalLink className="ml-2 h-5 w-5" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
