'use client';

/**
 * Admin Dashboard Page
 * Redirects or renders admin-specific dashboard content.
 */
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import DashboardPage from '../page';

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute requireAdmin>
      <DashboardPage />
    </ProtectedRoute>
  );
}
