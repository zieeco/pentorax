/**
 * Authentication Routes Configuration
 * Routes for login, signup, password reset, etc.
 * These routes don't use the main Layout
 */
import { lazy } from 'react';
import { type RouteObject } from 'react-router-dom';
import AuthRedirect from '@/components/AuthRedirect';

// Auth pages
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'));
const SignupPage = lazy(() => import('@/pages/auth/SignupPage'));
const ForgotPasswordPage = lazy(() => import('@/pages/auth/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('@/pages/auth/ResetPasswordPage'));
const AuthConfirmationPage = lazy(() => import('@/pages/auth/AuthConfirmationPage'));

/**
 * Authentication routes - redirect to dashboard if already logged in
 */
export const authRoutes: RouteObject[] = [
  {
    path: '/auth/login',
    element: (
      <AuthRedirect>
        <LoginPage />
      </AuthRedirect>
    ),
  },
  {
    path: '/auth/signup',
    element: (
      <AuthRedirect>
        <SignupPage />
      </AuthRedirect>
    ),
  },
  {
    path: '/auth/forgot-password',
    element: (
      <AuthRedirect>
        <ForgotPasswordPage />
      </AuthRedirect>
    ),
  },
  {
    path: '/auth/reset-password',
    element: (
      <AuthRedirect>
        <ResetPasswordPage />
      </AuthRedirect>
    ),
  },
  {
    path: '/auth/confirmation',
    element: <AuthConfirmationPage />,
  },
];
