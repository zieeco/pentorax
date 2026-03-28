'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useIsAdmin, useIsAuthenticated, useIsLoading, useIsStaff } from '@/stores/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  requireStaff?: boolean;
}

/**
 * ProtectedRoute component for Next.js 16.
 * Handles authentication and role-based access control.
 * Replaces the legacy react-router-dom based guard.
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAdmin = false,
  requireStaff = false,
}) => {
  const router = useRouter();
  const isAuthenticated = useIsAuthenticated();
  const isLoading = useIsLoading();
  const isAdmin = useIsAdmin();
  const isStaff = useIsStaff();

  useEffect(() => {
    // Redirect logic after auth has initialized
    if (!isLoading) {
      if (!isAuthenticated) {
        router.replace('/auth/login');
      } else if (requireAdmin && !isAdmin) {
        router.replace('/dashboard');
      } else if (requireStaff && !isStaff) {
        router.replace('/dashboard');
      }
    }
  }, [isLoading, isAuthenticated, isAdmin, isStaff, requireAdmin, requireStaff, router]);

  // Wait for auth to initialize or handle redirects
  if (isLoading || !isAuthenticated || (requireAdmin && !isAdmin) || (requireStaff && !isStaff)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50/50">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
