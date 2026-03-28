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

// Inline SVGs for social platforms (not in this lucide-react version)
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zm2-3a2 2 0 100-4 2 2 0 000 4z" />
  </svg>
);
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
  </svg>
);
const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
  </svg>
);

export function TopHeader() {
  const { user, isAuthenticated, signOut } = useAuthStore();

  return (
    <div className="bg-primary fixed top-0 z-50 hidden w-full text-white lg:block">
      <div className="container mx-auto flex h-12 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Contact Info */}
        <div className="flex items-center space-x-6 text-sm">
          <a
            href="tel:+2348081598604"
            className="hover:text-secondary flex items-center space-x-2 transition-colors"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            <span>+234 808 159 8604</span>
          </a>
          <a
            href="mailto:support@pentorax.com"
            className="hover:text-secondary flex items-center space-x-2 transition-colors"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            <span>support@pentorax.com</span>
          </a>
        </div>

        {/* Social Links + Auth */}
        <div className="flex items-center space-x-6">
          <div className="mr-4 flex items-center space-x-4">
            <a href="#" aria-label="LinkedIn" className="hover:text-secondary transition-colors">
              <LinkedinIcon />
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-secondary transition-colors">
              <FacebookIcon />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-secondary transition-colors">
              <InstagramIcon />
            </a>
            <a href="#" aria-label="YouTube" className="hover:text-secondary transition-colors">
              <YoutubeIcon />
            </a>
          </div>
          <Link
            href="/contact"
            className="hover:text-primary flex items-center space-x-2 rounded-md border border-white px-4 py-2 text-sm font-semibold transition-all hover:bg-white"
          >
            <span>Contact Us</span>
          </Link>
          <div
            className="flex items-center space-x-2 pl-6"
            style={{ borderLeft: '1px solid rgba(255,255,255,0.2)' }}
          >
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center space-x-2 text-xs font-black tracking-widest text-white/80 uppercase transition-colors hover:text-white"
                >
                  <UserCog className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
                <Separator orientation="vertical" className="mx-2 h-4 bg-white/20" />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => signOut()}
                  className="flex h-auto items-center space-x-2 p-0 text-xs font-black tracking-widest text-white/80 uppercase hover:bg-transparent hover:text-white"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="flex items-center space-x-2 text-xs font-black tracking-widest text-white/80 uppercase transition-colors hover:text-white"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Sign In</span>
                </Link>
                <Separator orientation="vertical" className="mx-2 h-4 bg-white/20" />
                <Link
                  href="/auth/signup"
                  className="flex items-center space-x-2 text-xs font-black tracking-widest text-white/80 uppercase transition-colors hover:text-white"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Join</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
