'use client';

/**
 * Staff Dashboard Page
 * Redirects or renders staff-specific dashboard content.
 */
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import DashboardPage from '../page';

export default function StaffDashboardPage() {
  return (
    <ProtectedRoute requireStaff>
      <DashboardPage />
    </ProtectedRoute>
  );
}
