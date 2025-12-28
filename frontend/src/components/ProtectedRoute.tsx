import React from 'react';
import { Navigate } from 'react-router-dom';
import { useIsAuthenticated, useIsLoading, useIsAdmin, useIsStaff } from '@/stores/auth';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  requireStaff?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAdmin = false,
  requireStaff = false 
}) => {
  const isAuthenticated = useIsAuthenticated();
  const isLoading = useIsLoading();
  const isAdmin = useIsAdmin();
  const isStaff = useIsStaff();

  // Wait for auth to initialize
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  // Redirect to customer dashboard if admin access required but user is not admin
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  // Redirect to customer dashboard if staff access required but user is not staff
  if (requireStaff && !isStaff) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
