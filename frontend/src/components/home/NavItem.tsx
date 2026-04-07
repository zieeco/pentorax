/**
 * NavItem — Desktop navigation item with optional dropdown
 * Used inside SiteHeader navigation
 */
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

interface NavDropdownItem {
  label: string;
  path: string;
}

interface NavItemProps {
  name: string;
  path: string;
  dropdown?: NavDropdownItem[];
  isLast?: boolean;
}

export function NavItem({ name, path, dropdown, isLast }: NavItemProps) {
  return (
    <div className="group relative flex items-center">
      <Link
        href={path}
        className="font-quicksand text-foreground hover:text-primary flex items-center py-6 font-black tracking-widest transition-colors"
      >
        {name}
        {dropdown && <ChevronDown className="ml-1 h-4 w-4" />}
      </Link>
      {!isLast && <span className="text-muted-foreground/30 mx-3 font-black">|</span>}

      {dropdown && (
        <div className="border-border bg-card absolute top-full left-0 z-50 mt-0 hidden w-64 rounded-2xl border py-4 shadow-2xl transition-all group-hover:block">
          {dropdown.map((sub) => (
            <Link
              key={sub.label}
              href={sub.path}
              className="font-quicksand text-foreground hover:bg-primary/5 hover:text-primary flex w-full items-center px-6 py-3 text-left text-sm font-black transition-colors"
            >
              {sub.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
