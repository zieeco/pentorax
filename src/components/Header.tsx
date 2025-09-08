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
  <div className="flex items-center space-x-2k">
    <img src={Logo} alt="Pentorax Logo" className="h-20 w-20 object-contain" />
    <span className="ml-[-27px] text-3xl font-normal text-primary">
      pentorax
    </span>
  </div>
);

const TopHeader: React.FC = () => (
  <div className="fixed top-0 z-50 hidden w-full bg-primary text-white lg:block">
    <div className="container mx-auto flex h-12 items-center justify-center gap-[20rem] px-4 py-8 sm:px-6 lg:px-8">
      {/* Contact Info */}
      <div className="flex items-center space-x-6 text-sm">
        <a
          href="tel:07002288888"
          className="flex items-center space-x-2 transition-colors hover:text-secondary"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          <span>07002288888</span>
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
          href="#"
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
    { name: 'Home', href: '#' },
    { name: 'About Us', href: '#', dropdown: ['Our Story', 'Team', 'Careers'] },
    {
      name: 'Energy Solutions',
      href: '#',
      dropdown: ['Residential', 'Commercial', 'Industrial'],
    },
    {
      name: 'Solar Products',
      href: '#',
      dropdown: ['Solar Panels', 'Inverters', 'Batteries', 'Accessories'],
    },
    {
      name: 'Resources',
      href: '#',
      dropdown: ['Blog', 'Case Studies', 'FAQs', 'Support', 'Contact Us'],
    },
  ];

  return (
    <header className="mt-20 bg-white shadow-sm">
      <TopHeader />
      <div className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
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
                          key={subItem}
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-secondary/10 hover:text-secondary"
                        >
                          {subItem}
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
                href="#"
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
              href="#"
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
