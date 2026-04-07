/**
 * SiteFooter — Public site footer with newsletter, links, and contact info
 * Original: frontend/src/components/landing/Footer.tsx
 */
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { NewsletterForm } from './NewsletterForm';

const QUICK_LINKS = [
  { label: 'Management Team', href: '/about/team' },
  { label: 'Product Specifications', href: '/products' },
  { label: 'Customer Reviews', href: '/about#reviews' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Solarbase Login', href: '/auth/login' },
];

const MORE_LINKS = [
  { label: 'Commercial Solar', href: '/solutions/commercial' },
  { label: 'Residential', href: '/solutions/residential' },
  { label: 'Blog Posts', href: '/blog' },
  { label: 'FAQs', href: '/faqs' },
];

export function SiteFooter() {
  return (
    <footer className="bg-brand-dark pb-12 text-white/70">
      <div className="container mx-auto px-4 py-24 lg:px-8">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-4">
          {/* Newsletter */}
          <div className="space-y-6">
            <h3 className="font-quicksand text-xl font-black text-white">
              Subscribe to our newsletter
            </h3>
            <p className="text-sm font-medium">
              For regular insights on residential and commercial renewable energy solutions.
            </p>
            <NewsletterForm />
          </div>

          {/* About & Contact */}
          <div className="space-y-6">
            <h3 className="font-quicksand text-xl font-black text-white">Pentorax</h3>
            <p className="text-sm font-medium">
              A renewable energy and clean tech company offering sustainable solar solutions
              tailored to pressing energy needs.
            </p>
            <ul className="space-y-4 text-xs font-black tracking-widest">
              <li className="flex items-center gap-3">📞 07002288888</li>
              <li className="flex items-center gap-3">✉️ support@pentorax.com</li>
              <li className="flex items-start gap-3">📍 1, Industrial Street, Ilupeju, Lagos</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="font-quicksand text-xl font-black text-white">Quick Links</h3>
            <ul className="space-y-3 text-sm font-medium">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Links */}
          <div className="space-y-6">
            <h3 className="font-quicksand invisible hidden text-xl font-black text-white md:block">
              .
            </h3>
            <ul className="space-y-3 text-sm font-medium">
              {MORE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="mt-20 mb-8 bg-white/10" />

        <div className="flex flex-col items-center justify-between text-[10px] font-black tracking-widest md:flex-row">
          <p className="text-white/50">
            &copy; 2026 Pentorax Solar Energy Solutions. All rights reserved.
          </p>
          <p className="mt-4 md:mt-0">
            Developed by{' '}
            <a
              href="https://github.com/zieeco"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              zieeco
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
