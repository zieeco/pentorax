import React from 'react';
import { Navigate } from 'react-router-dom';
import { useIsAuthenticated, useIsLoading } from '@/stores/auth';
import { getRoleBasedRedirect } from '@/utils/authHelpers';
import { useAuthStore } from '@/stores/auth';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface AuthRedirectProps {
  children: React.ReactNode;
}

/**
 * Redirects authenticated users away from auth pages (login, signup, etc.)
 * to their role-based dashboard
 */
const AuthRedirect: React.FC<AuthRedirectProps> = ({ children }) => {
  const isAuthenticated = useIsAuthenticated();
  const isLoading = useIsLoading();
  const role = useAuthStore((state) => state.role);

  // Wait for auth to initialize
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // If user is authenticated, redirect to their dashboard
  if (isAuthenticated) {
    const redirectPath = getRoleBasedRedirect(role);
    return <Navigate to={redirectPath} replace />;
  }

  // Not authenticated, show the auth page
  return <>{children}</>;
};

export default AuthRedirect;
