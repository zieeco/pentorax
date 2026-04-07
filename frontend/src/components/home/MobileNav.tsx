/**
 * MobileNav — Mobile menu overlay for SiteHeader
 */
'use client';

import { ExternalLink, LogIn, LogOut, UserCog, UserPlus } from 'lucide-react';
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
      <SheetContent
        side="right"
        className="bg-background text-foreground w-[320px] overflow-y-auto"
      >
        <SheetHeader>
          <SheetTitle className="font-quicksand text-primary text-left font-black tracking-tighter">
            PentoraX
          </SheetTitle>
        </SheetHeader>
        <nav className="mt-4 flex flex-col space-y-1">
          {navLinks.map((item) => (
            <div key={item.name} className="flex flex-col">
              <Link
                href={item.path}
                onClick={onClose}
                className="font-quicksand text-foreground hover:bg-primary/5 hover:text-primary rounded-xl p-3 font-black transition-all"
              >
                {item.name}
              </Link>
              {item.dropdown && (
                <div className="border-border ml-4 flex flex-col space-y-1 border-l-2 py-2 pl-2">
                  {item.dropdown.map((sub) => (
                    <Link
                      key={sub.label}
                      href={sub.path}
                      onClick={onClose}
                      className="font-quicksand text-muted-foreground hover:text-primary rounded-lg p-2.5 text-sm font-black transition-all"
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
              <Button
                asChild
                variant="default"
                onClick={onClose}
                className="h-14 w-full rounded-xl font-black tracking-widest shadow-lg"
              >
                <Link href="/dashboard" className="font-quicksand">
                  <UserCog className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
              <Button
                variant="outline"
                className="font-quicksand h-14 w-full rounded-xl font-black tracking-widest"
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
              <Button
                asChild
                variant="outline"
                onClick={onClose}
                className="h-14 rounded-xl font-black tracking-widest"
              >
                <Link href="/auth/login" className="font-quicksand">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Link>
              </Button>
              <Button
                asChild
                variant="default"
                onClick={onClose}
                className="h-14 rounded-xl font-black tracking-widest shadow-lg"
              >
                <Link href="/auth/signup" className="font-quicksand">
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
            className="border-primary text-primary hover:bg-primary/5 h-14 w-full rounded-xl border-2 font-black tracking-widest shadow-lg"
          >
            <Link href="/shop" className="font-quicksand">
              Shop Now <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
