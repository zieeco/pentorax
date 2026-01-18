import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  Mail,
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
  ExternalLink,
  ChevronDown,
  Menu,
  X,
  LogIn,
  UserPlus,
  UserCog,
  LogOut,
  User,
} from 'lucide-react';
import { useAuthStore, useIsAuthenticated, useUser } from '@/stores/auth';
import CartBadge from '@/components/cart/CartBadge';

const ShopNowIcon: React.FC = () => (
  <ExternalLink className="ml-2 h-5 w-5" aria-hidden="true" />
);

const PentoraxLogo: React.FC = () => (
  <div className="space-x-2k flex items-center">
    <img
      src="/pentorax.jpeg"
      alt="Pentorax Logo"
      className="mt-[-20px] h-[7.5rem] w-[7.5rem] object-contain"
    />
    <span className="text-3xdl mt-[-8px] ml-[-41px] font-sand text-[2.59rem] font-extrabold leading-[2.25rem] text-primary">
      PentoraX
    </span>
  </div>
);

const TopHeader: React.FC = () => {
  const isAuthenticated = useIsAuthenticated();
  const user = useUser();
  const { signOut } = useAuthStore();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="fixed top-0 z-50 hidden w-full bg-primary text-white lg:block">
      <div className="container mx-auto flex h-12 items-center justify-between px-4 sm:px-6 lg:px-8">
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

        {/* Socials + Contact + Auth Buttons */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-4 mr-4">
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

          {/* Contact Us Button */}
          <Link
            to="/contact"
            className="flex items-center space-x-2 rounded-md border border-white px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-white hover:text-primary"
          >
            <span>Contact Us</span>
          </Link>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-2 border-l border-white/20 pl-6">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-2 text-xs font-black uppercase tracking-widest text-white/80 hover:text-white transition-colors"
                >
                  <UserCog className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
                <div className="h-4 w-px bg-white/20 mx-2"></div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 text-xs font-black uppercase tracking-widest text-white/80 hover:text-white transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/auth/login"
                  className="flex items-center space-x-2 text-xs font-black uppercase tracking-widest text-white/80 hover:text-white transition-colors"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Sign In</span>
                </Link>
                <div className="h-4 w-px bg-white/20 mx-2"></div>
                <Link
                  to="/auth/signup"
                  className="flex items-center space-x-2 text-xs font-black uppercase tracking-widest text-white/80 hover:text-white transition-colors"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Join</span>
                </Link>
                <div className="h-4 w-px bg-white/20 mx-2"></div>
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-2 text-xs font-black uppercase tracking-widest text-white/80 hover:text-white transition-colors"
                >
                  <UserCog className="h-4 w-4" />
                  <span>Portal</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAuthenticated = useIsAuthenticated();
  const user = useUser();
  const { signOut } = useAuthStore();

  const handleSignOut = async () => {
    await signOut();
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    {
      name: 'About Us',
      path: '/about',
      dropdown: [
        { label: 'Our Story', path: '/about' },
        { label: 'Team', path: '/about/team' },
        { label: 'Careers', path: '/about/careers' },
      ],
    },
    {
      name: 'Energy Solutions',
      path: '/solutions',
      dropdown: [
        { label: 'Residential', path: '/solutions/residential' },
        { label: 'Commercial', path: '/solutions/commercial' },
        { label: 'Industrial', path: '/solutions/industrial' },
        { label: 'Off-Grid', path: '/solutions/off-grid' },
      ],
    },
    {
      name: 'Solar Products',
      path: '/products',
      dropdown: [
        { label: 'Solar Panels', path: '/products/solar-panels' },
        { label: 'Inverters', path: '/products/inverters' },
        { label: 'Batteries', path: '/products/batteries' },
        { label: 'Accessories', path: '/products/accessories' },
      ],
    },
    {
      name: 'Resources',
      path: '/resources',
      dropdown: [
        { label: 'Blog', path: '/blog' },
        { label: 'Case Studies', path: '/case-studies' },
        { label: 'FAQs', path: '/faqs' },
        { label: 'Support', path: '/support' },
        { label: 'Contact Us', path: '/contact' },
      ],
    },
  ];

  return (
    <header className="mt-20 bg-white shadow-sm sticky top-0 z-40">
      <TopHeader />

      <div className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" aria-label="Pentorax Home">
              <PentoraxLogo />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center lg:flex font-sand text-[14px]">
              {navLinks.map((item, index) => (
                <div key={item.name} className="group relative flex items-center">
                  <Link
                    to={item.path}
                    className="flex items-center font-bold text-gray-700 hover:text-primary transition-colors py-6"
                  >
                    {item.name}
                    {item.dropdown && <ChevronDown className="ml-1 h-4 w-4" />}
                  </Link>
                  {index < navLinks.length - 1 && (
                    <span className="mx-3 text-gray-200">|</span>
                  )}

                  {item.dropdown && (
                    <div className="absolute left-0 top-full z-50 hidden w-52 rounded-xl bg-white py-2 shadow-2xl group-hover:block border border-gray-100 mt-0">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.label}
                          to={subItem.path}
                          className="flex items-center w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="hidden items-center gap-2 lg:flex">
              <Link
                to="/shop"
                className="flex items-center rounded-xl border-2 border-primary px-6 py-2.5 font-bold text-primary transition-all hover:bg-primary hover:text-white shadow-lg shadow-primary/10 active:scale-95"
              >
                Shop Now <ShopNowIcon />
              </Link>
              <CartBadge />
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 p-2"
              >
                {isMenuOpen ? (
                  <X className="h-7 w-7" />
                ) : (
                  <Menu className="h-7 w-7" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="bg-white shadow-xl lg:hidden border-t border-gray-100 max-h-[calc(100vh-80px)] overflow-y-auto">
          <nav className="flex flex-col p-4 space-y-1">
            {navLinks.map((item) => (
              <div key={item.name} className="flex flex-col">
                <Link
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex-1 text-left p-3 rounded-xl font-bold text-gray-700 hover:bg-primary/5 hover:text-primary"
                >
                  {item.name}
                </Link>

                {item.dropdown && (
                  <div className="ml-4 flex flex-col border-l-2 border-primary/10 pl-2 py-2 space-y-1">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.label}
                        to={subItem.path}
                        onClick={() => setIsMenuOpen(false)}
                        className="text-left p-2.5 text-sm font-semibold rounded-lg text-gray-600 hover:text-primary"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile Auth Buttons */}
            <div className="pt-4 space-y-3">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center rounded-xl bg-primary text-white px-4 py-3 text-sm font-bold shadow-lg shadow-primary/20"
                  >
                    <UserCog className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="flex w-full items-center justify-center rounded-xl bg-gray-100 px-4 py-3 text-sm font-bold text-gray-900"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to="/auth/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center rounded-xl bg-gray-100 px-4 py-3 text-sm font-bold text-gray-900"
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
                  </Link>
                  <Link
                    to="/auth/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center rounded-xl bg-primary text-white px-4 py-3 text-sm font-bold shadow-lg shadow-primary/20"
                  >
                    <UserPlus className="mr-2 h-4 w-4" />
                    Join
                  </Link>
                </div>
              )}

              <Link
                to="/shop"
                onClick={() => setIsMenuOpen(false)}
                className="flex w-full items-center justify-center rounded-xl border-2 border-primary px-6 py-4 font-bold text-primary transition-all"
              >
                Shop Now <ShopNowIcon />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
