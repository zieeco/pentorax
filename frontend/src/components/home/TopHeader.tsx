'use client';

/**
 * TopHeader — Fixed top bar with contact info, socials, and auth links
 * Used inside SiteHeader
 */
import { LogIn, LogOut, Mail, Phone, UserCog, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAuthStore } from '@/stores/auth';

// Social SVGs standardized
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zm2-3a2 2 0 100-4 2 2 0 000 4z" />
  </svg>
);
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
  </svg>
);
const InstagramIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-3.5 w-3.5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
  </svg>
);

export function TopHeader() {
  const { isAuthenticated, signOut } = useAuthStore();

  return (
    <div className="bg-brand-dark fixed top-0 z-50 hidden h-12 w-full text-white lg:block">
      <div className="container mx-auto flex h-full items-center justify-between px-4 lg:px-8">
        {/* Contact Info */}
        <div className="flex items-center space-x-8 text-[10px] font-black tracking-widest">
          <a
            href="tel:+2348081598604"
            className="hover:text-primary flex items-center space-x-2 text-white/70 transition-colors"
          >
            <Phone className="h-3.5 w-3.5" />
            <span>+234 808 159 8604</span>
          </a>
          <a
            href="mailto:support@pentorax.com"
            className="hover:text-primary flex items-center space-x-2 text-white/70 transition-colors"
          >
            <Mail className="h-3.5 w-3.5" />
            <span>support@pentorax.com</span>
          </a>
        </div>

        {/* Social Links + Auth */}
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-5 border-r border-white/10 pr-8">
            <a href="#" className="hover:text-primary text-white/50 transition-colors">
              <LinkedinIcon />
            </a>
            <a href="#" className="hover:text-primary text-white/50 transition-colors">
              <FacebookIcon />
            </a>
            <a href="#" className="hover:text-primary text-white/50 transition-colors">
              <InstagramIcon />
            </a>
          </div>

          <div className="flex items-center space-x-6 text-[10px] font-black tracking-widest">
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className="hover:text-primary flex items-center space-x-2 text-white/70 transition-colors"
                >
                  <UserCog className="h-3.5 w-3.5" />
                  <span>Dashboard</span>
                </Link>
                <Separator orientation="vertical" className="h-4 bg-white/10" />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => signOut()}
                  className="hover:text-destructive flex h-auto items-center space-x-2 p-0 font-black tracking-widest text-white/70 transition-colors hover:bg-transparent"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Sign Out</span>
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="hover:text-primary flex items-center space-x-2 text-white/70 transition-colors"
                >
                  <LogIn className="h-3.5 w-3.5" />
                  <span>Sign In</span>
                </Link>
                <Separator orientation="vertical" className="h-4 bg-white/10" />
                <Link
                  href="/auth/signup"
                  className="hover:text-primary flex items-center space-x-2 text-white/70 transition-colors"
                >
                  <UserPlus className="h-3.5 w-3.5" />
                  <span>Join</span>
                </Link>
              </>
            )}
            <Link
              href="/contact"
              className="bg-primary text-primary-foreground font-quicksand ml-4 rounded-lg px-4 py-1.5 text-[9px] font-black transition-all hover:scale-105 active:scale-95"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
