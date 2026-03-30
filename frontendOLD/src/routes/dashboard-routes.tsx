/**
 * Dashboard Routes Configuration
 * Protected routes for authenticated users (admin, staff, customers)
 */
import { lazy } from 'react';
import { type RouteObject } from 'react-router-dom';
import ProtectedRoute from '@/components/ProtectedRoute';

// Dashboard pages
const DashboardPage = lazy(() => import('@/pages/dashboard/DashboardPage'));
const ProductsPage = lazy(() => import('@/pages/dashboard/products').then(m => ({ default: m.ProductsPage })));
const ProductFormPage = lazy(() => import('@/pages/dashboard/products').then(m => ({ default: m.ProductFormPage })));
const NotificationsPage = lazy(() => import('@/pages/dashboard/notifications/NotificationsPage'));
const NewsletterPage = lazy(() => import('@/pages/dashboard/newsletter/NewsletterPage'));
const OrdersAdminPage = lazy(() => import('@/pages/dashboard/orders/OrdersAdminPage'));
const BlogAdminPage = lazy(() => import('@/pages/dashboard/BlogAdminPage'));

/**
 * Dashboard routes - all require authentication
 * Some require admin/staff roles
 */
export const dashboardRoutes: RouteObject[] = [
  // Customer dashboard (default)
  {
    index: true,
    element: <DashboardPage />,
  },
  
  // Admin dashboard
  {
    path: 'admin',
    element: (
      <ProtectedRoute requireAdmin>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  
  // Staff dashboard
  {
    path: 'staff',
    element: (
      <ProtectedRoute requireStaff>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  
  // Product management (Admin/Staff)
  {
    path: 'products',
    element: (
      <ProtectedRoute requireStaff>
        <ProductsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: 'products/new',
    element: (
      <ProtectedRoute requireStaff>
        <ProductFormPage />
      </ProtectedRoute>
    ),
  },
  {
    path: 'products/:slug/edit',
    element: (
      <ProtectedRoute requireStaff>
        <ProductFormPage />
      </ProtectedRoute>
    ),
  },
  
  // Stock notifications (Admin/Staff)
  {
    path: 'notifications',
    element: (
      <ProtectedRoute requireStaff>
        <NotificationsPage />
      </ProtectedRoute>
    ),
  },
  
  // Newsletter subscribers (Admin/Staff)
  {
    path: 'newsletter',
    element: (
      <ProtectedRoute requireStaff>
        <NewsletterPage />
      </ProtectedRoute>
    ),
  },
  
  // Order management (Admin/Staff)
  {
    path: 'orders',
    element: (
      <ProtectedRoute requireStaff>
        <OrdersAdminPage />
      </ProtectedRoute>
    ),
  },

  // Content/Blog management (Admin/Staff)
  {
    path: 'content',
    element: (
      <ProtectedRoute requireStaff>
        <BlogAdminPage />
      </ProtectedRoute>
    ),
  },
];
