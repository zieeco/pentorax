/**
 * SiteHeader — Main public site header (sticky, desktop + mobile)
 * Original: frontend/src/components/landing/Header.tsx
 * Decomposed into: TopHeader + NavItem + MobileNav sub-components
 */
'use client';

import { ExternalLink, Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MobileNav } from './MobileNav';
import { NavItem } from './NavItem';
import { TopHeader } from './TopHeader';

const NAV_LINKS = [
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

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-12 z-40 mt-12 bg-white shadow-sm">
      <TopHeader />
      <div className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" aria-label="PentoraX Home" className="flex items-center">
              <Image
                src="/pentorax.jpeg"
                alt="PentoraX Logo"
                width={90}
                height={90}
                className="mt-[-16px] object-contain"
              />
              <span className="font-quicksand text-primary mt-[-8px] ml-[-30px] text-[2rem] font-extrabold">
                PentoraX
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="font-quicksand hidden items-center text-[14px] lg:flex">
              {NAV_LINKS.map((item, i) => (
                <NavItem key={item.name} {...item} isLast={i === NAV_LINKS.length - 1} />
              ))}
            </nav>

            <div className="hidden items-center gap-2 lg:flex">
              <Button
                asChild
                variant="outline"
                className="border-primary text-primary hover:bg-primary shadow-primary/10 rounded-xl border-2 font-bold shadow-lg hover:text-white"
              >
                <Link href="/shop">
                  Shop Now <ExternalLink className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Trigger */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(true)}
                className="text-gray-600"
              >
                <Menu className="h-7 w-7" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <MobileNav isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} navLinks={NAV_LINKS} />
    </header>
  );
}
