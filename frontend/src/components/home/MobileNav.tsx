/**
 * MobileNav — Mobile menu overlay for SiteHeader
 */
'use client';

import { ExternalLink, LogIn, LogOut, UserCog, UserPlus, X } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useAuthStore } from '@/stores/auth';

interface NavLink {
  name: string;
  path: string;
  dropdown?: { label: string; path: string }[];
}

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[];
}

export function MobileNav({ isOpen, onClose, navLinks }: MobileNavProps) {
  const { isAuthenticated, signOut } = useAuthStore();

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="right" className="font-quicksand w-[320px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-primary text-left font-extrabold">PentoraX</SheetTitle>
        </SheetHeader>
        <nav className="mt-4 flex flex-col space-y-1">
          {navLinks.map((item) => (
            <div key={item.name} className="flex flex-col">
              <Link
                href={item.path}
                onClick={onClose}
                className="hover:bg-primary/5 hover:text-primary rounded-xl p-3 font-bold text-gray-700"
              >
                {item.name}
              </Link>
              {item.dropdown && (
                <div className="border-primary/10 ml-4 flex flex-col space-y-1 border-l-2 py-2 pl-2">
                  {item.dropdown.map((sub) => (
                    <Link
                      key={sub.label}
                      href={sub.path}
                      onClick={onClose}
                      className="hover:text-primary rounded-lg p-2.5 text-sm font-semibold text-gray-600"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <Separator className="my-4" />

        <div className="flex flex-col space-y-3 px-1">
          {isAuthenticated ? (
            <>
              <Button asChild variant="default" onClick={onClose} className="w-full rounded-xl">
                <Link href="/dashboard">
                  <UserCog className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
              <Button
                variant="outline"
                className="w-full rounded-xl"
                onClick={() => {
                  signOut();
                  onClose();
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <Button asChild variant="outline" onClick={onClose} className="rounded-xl">
                <Link href="/auth/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Link>
              </Button>
              <Button asChild variant="default" onClick={onClose} className="rounded-xl">
                <Link href="/auth/signup">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Join
                </Link>
              </Button>
            </div>
          )}
          <Button
            asChild
            variant="outline"
            onClick={onClose}
            className="border-primary text-primary w-full rounded-xl border-2 font-bold"
          >
            <Link href="/shop">
              Shop Now <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
