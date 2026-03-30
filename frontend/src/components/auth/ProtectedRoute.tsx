'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import {
  useAuthStore,
  useIsAdmin,
  useIsAuthenticated,
  useIsLoading,
  useIsStaff,
} from '@/stores/auth';

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
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const isAdmin = useIsAdmin();
  const isStaff = useIsStaff();

  useEffect(() => {
    // Redirect logic after auth has initialized AND not currently checking state
    if (isInitialized && !isLoading) {
      if (!isAuthenticated) {
        router.replace('/auth/login');
      } else if (requireAdmin && !isAdmin) {
        router.replace('/dashboard');
      } else if (requireStaff && !isStaff) {
        router.replace('/dashboard');
      }
    }
  }, [
    isInitialized,
    isLoading,
    isAuthenticated,
    isAdmin,
    isStaff,
    requireAdmin,
    requireStaff,
    router,
  ]);

  // Wait for auth to initialize or handle redirects
  if (!isInitialized || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50/50">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Handle unauthorized states directly in render to prevent flicker
  if (!isAuthenticated || (requireAdmin && !isAdmin) || (requireStaff && !isStaff)) {
    return null; // The useEffect will handle redirection
  }

  return <>{children}</>;
};

export default ProtectedRoute;
