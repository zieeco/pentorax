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
    <footer className="bg-gray-800 text-gray-300">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Newsletter */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Subscribe to our newsletter</h3>
            <p className="mb-4 text-sm">
              For regular insights on residential and commercial renewable energy solutions.
            </p>
            <NewsletterForm />
          </div>

          {/* About & Contact */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Pentorax</h3>
            <p className="mb-6 text-sm">
              A renewable energy and clean tech company offering sustainable solar solutions
              tailored to pressing energy needs.
            </p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">📞 07002288888</li>
              <li className="flex items-center gap-2">✉️ support@pentorax.com</li>
              <li className="flex items-start gap-2">📍 1, Industrial Street, Ilupeju, Lagos</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
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
          <div>
            <h3 className="invisible mb-4 hidden font-semibold text-white md:block">.</h3>
            <ul className="space-y-2 text-sm">
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

        <Separator className="mt-12 mb-8 border-gray-700" />

        <div className="flex flex-col items-center justify-between text-sm text-gray-400 md:flex-row">
          <p>&copy; 2026 Pentorax Solar Energy Solutions. All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            Developed by{' '}
            <a
              href="https://github.com/zieeco"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-400 hover:text-blue-300"
            >
              zieeco
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
