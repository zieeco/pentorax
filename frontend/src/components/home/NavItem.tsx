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
        className="hover:text-primary flex items-center py-6 font-bold text-gray-700 transition-colors"
      >
        {name}
        {dropdown && <ChevronDown className="ml-1 h-4 w-4" />}
      </Link>
      {!isLast && <span className="mx-3 text-gray-200">|</span>}

      {dropdown && (
        <div className="absolute top-full left-0 z-50 mt-0 hidden w-52 rounded-xl border border-gray-100 bg-white py-2 shadow-2xl group-hover:block">
          {dropdown.map((sub) => (
            <Link
              key={sub.label}
              href={sub.path}
              className="hover:bg-primary/5 hover:text-primary flex w-full items-center px-4 py-2.5 text-left text-sm text-gray-700 transition-colors"
            >
              {sub.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
