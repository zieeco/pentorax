/**
 * Main Router Configuration
 * Combines all route modules into a single router instance
 */
import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import DashboardLayout from '@/layouts/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { publicRoutes } from './public-routes';
import { authRoutes } from './auth-routes';
import { dashboardRoutes } from './dashboard-routes';

// Newsletter unsubscribe (standalone)
const UnsubscribePage = lazy(() => import('@/pages/UnsubscribePage'));

/**
 * Loading fallback component
 */
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

/**
 * Main application routes
 */
export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Auth routes (no layout) */}
        {authRoutes.map((route, index) => (
          <Route key={`auth-${index}`} path={route.path} element={route.element} />
        ))}

        {/* Newsletter unsubscribe (no layout) */}
        <Route path="/newsletter/unsubscribe" element={<UnsubscribePage />} />

        {/* Protected dashboard routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {dashboardRoutes.map((route, index) => (
            <Route 
              key={`dashboard-${index}`} 
              index={route.index} 
              path={route.path} 
              element={route.element} 
            />
          ))}
        </Route>

        {/* Public routes (with main layout) */}
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                {publicRoutes.map((route, index) => (
                  <Route key={`public-${index}`} path={route.path} element={route.element} />
                ))}
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Suspense>
  );
}
