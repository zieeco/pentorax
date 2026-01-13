import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useIsAdmin, useIsStaff, useSignOut } from '@/stores/auth';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  FileText,
  Headphones,
  Settings,
  Zap,
  LogOut,
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const location = useLocation();
  const isAdmin = useIsAdmin();
  const isStaff = useIsStaff();
  const signOut = useSignOut();

  const navItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/dashboard', roles: ['admin', 'staff', 'customer'] },
    { icon: Package, label: 'Products', path: '/dashboard/products', roles: ['admin', 'staff'] },
    { icon: ShoppingCart, label: 'Orders', path: '/dashboard/orders', roles: ['admin', 'staff', 'customer'] },
    { icon: Users, label: 'Customers', path: '/dashboard/customers', roles: ['admin'] },
    { icon: BarChart3, label: 'Analytics', path: '/dashboard/analytics', roles: ['admin'] },
    { icon: FileText, label: 'Content', path: '/dashboard/content', roles: ['admin', 'staff'] },
    { icon: Headphones, label: 'Support', path: '/dashboard/support', roles: ['admin', 'staff'] },
  ];

  const filteredNavItems = navItems.filter(item => {
    if (isAdmin) return item.roles.includes('admin');
    if (isStaff) return item.roles.includes('staff');
    return item.roles.includes('customer');
  });

  // Helper function to check if a route is active (including nested routes)
  const isRouteActive = (path: string) => {
    // Exact match for dashboard home
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    // For other routes, check if current path starts with the nav item path
    return location.pathname.startsWith(path);
  };

  if (collapsed) {
    return (
      <aside className="w-20 bg-gray-900 text-white flex flex-col shrink-0">
        {/* Collapsed Logo */}
        <div className="p-4 flex justify-center">
          <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
            <Zap className="h-6 w-6 text-white" />
          </div>
        </div>

        {/* Collapsed Navigation */}
        <nav className="flex-1 px-2 space-y-2 mt-4">
          {filteredNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = isRouteActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center justify-center p-3 rounded-xl transition-all',
                  isActive
                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                )}
                title={item.label}
              >
                <Icon className="h-5 w-5" />
              </Link>
            );
          })}
        </nav>

        {/* Collapsed Settings & Logout */}
        <div className="p-2 mt-auto space-y-2">
          <Link
            to="/dashboard/settings"
            className={cn(
              'flex items-center justify-center p-3 rounded-xl transition-all',
              isRouteActive('/dashboard/settings')
                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            )}
            title="Settings"
          >
            <Settings className="h-5 w-5" />
          </Link>
          <button
            onClick={signOut}
            className="w-full flex items-center justify-center p-3 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-all"
            title="Sign Out"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col">
      {/* Logo */}
      <div className="p-8">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-black tracking-tighter">
            PentoraX{' '}
            <span className="text-xs text-primary block mt-[-4px] uppercase tracking-widest">
              Admin
            </span>
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {filteredNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = isRouteActive(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all',
                isActive
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="font-bold">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Settings & Logout */}
      <div className="p-4 mt-auto space-y-2">
        <Link
          to="/dashboard/settings"
          className={cn(
            'w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all',
            isRouteActive('/dashboard/settings')
              ? 'bg-primary text-white shadow-lg shadow-primary/20'
              : 'text-gray-400 hover:bg-white/5 hover:text-white'
          )}
        >
          <Settings className="h-5 w-5" />
          <span className="font-bold">Settings</span>
        </Link>
        <button
          onClick={signOut}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-all"
        >
          <LogOut className="h-5 w-5" />
          <span className="font-bold">Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
