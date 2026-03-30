'use client';

import {
  BarChart3,
  Bell,
  FileText,
  Headphones,
  LayoutDashboard,
  Mail,
  Package,
  ShoppingBag,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { useIsAdmin, useIsStaff, useSignOut } from '@/stores/auth';
import { SidebarFooter } from './SidebarFooter';
import { SidebarNavItem } from './SidebarNavItem';

interface SidebarProps {
  collapsed: boolean;
  onToggle?: () => void;
}

const NAV_ITEMS = [
  {
    icon: LayoutDashboard,
    label: 'Overview',
    path: '/dashboard',
    roles: ['admin', 'staff', 'customer'],
  },
  { icon: Package, label: 'Products', path: '/dashboard/products', roles: ['admin', 'staff'] },
  { icon: ShoppingBag, label: 'Orders', path: '/dashboard/orders', roles: ['admin', 'staff'] },
  {
    icon: Bell,
    label: 'Stock Alerts',
    path: '/dashboard/notifications',
    roles: ['admin', 'staff'],
  },
  { icon: Mail, label: 'Newsletter', path: '/dashboard/newsletter', roles: ['admin', 'staff'] },
  { icon: Users, label: 'Customers', path: '/dashboard/customers', roles: ['admin'] },
  { icon: BarChart3, label: 'Analytics', path: '/dashboard/analytics', roles: ['admin'] },
  { icon: FileText, label: 'Content', path: '/dashboard/content', roles: ['admin', 'staff'] },
  { icon: Headphones, label: 'Support', path: '/dashboard/support', roles: ['admin', 'staff'] },
];

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const pathname = usePathname();
  const isAdmin = useIsAdmin();
  const isStaff = useIsStaff();
  const signOut = useSignOut();

  const filteredNavItems = NAV_ITEMS.filter((item) => {
    if (isAdmin) return item.roles.includes('admin');
    if (isStaff) return item.roles.includes('staff');
    return item.roles.includes('customer');
  });

  const isRouteActive = (path: string) =>
    path === '/dashboard' ? pathname === '/dashboard' : pathname.startsWith(path);

  return (
    <aside
      className={`${collapsed ? 'w-20' : 'w-64'} bg-brand-dark text-brand-light flex shrink-0 flex-col overflow-hidden transition-all duration-300`}
    >
      <Link
        href="/"
        className={`border-brand-light/5 hover:bg-brand-light/5 block border-b p-6 transition-colors ${collapsed ? 'flex justify-center' : ''}`}
      >
        <div className="flex items-center space-x-3">
          <Image
            src="/pentorax.jpeg"
            alt="Pentorax"
            width={40}
            height={40}
            className="h-10 w-10 shrink-0 rounded-lg object-cover"
          />
          {!collapsed && (
            <div className="overflow-hidden">
              <h1 className="text-xl font-bold whitespace-nowrap">Pentorax</h1>
              <p className="text-brand-light/60 text-xs font-black tracking-widest whitespace-nowrap uppercase">
                Solar Energy
              </p>
            </div>
          )}
        </div>
      </Link>

      <nav className={`flex-1 ${collapsed ? 'px-2' : 'px-4'} mt-4 space-y-2`}>
        {filteredNavItems.map((item) => (
          <SidebarNavItem
            key={item.path}
            {...item}
            isActive={isRouteActive(item.path)}
            collapsed={collapsed}
          />
        ))}
      </nav>

      <SidebarFooter collapsed={collapsed} isActive={isRouteActive} onSignOut={signOut} />
    </aside>
  );
};

export default Sidebar;
