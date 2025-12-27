/**
 * Pentorax Authentication Selectors
 *
 * React hooks for accessing auth state in components.
 * Provides type-safe selectors with optimized re-rendering.
 */

import type { Session, User } from '@supabase/supabase-js';
import { type UserRole } from '@/utils/authHelpers';
import { useAuthStore } from './auth-store';

// ============================================
// CORE STATE SELECTORS
// ============================================

/**
 * Get current user role
 * @returns User role ('customer' | 'staff' | 'admin') or null if not authenticated
 */
export const useRole = (): UserRole | null => useAuthStore((state) => state.role);

/**
 * Get current Supabase session
 * @returns Session object or null
 */
export const useSession = (): Session | null => useAuthStore((state) => state.session);

/**
 * Get current user object
 * @returns Supabase User object or null
 */
export const useUser = (): User | null => useAuthStore((state) => state.user);

/**
 * Get loading state
 * @returns True while checking authentication
 */
export const useIsLoading = (): boolean => useAuthStore((state) => state.isLoading);

/**
 * Get authentication status
 * @returns True if user is authenticated
 */
export const useIsAuthenticated = (): boolean => useAuthStore((state) => state.isAuthenticated);

// ============================================
// ACTION SELECTORS
// ============================================

/**
 * Get refresh session function
 * @returns Function to manually refresh session
 */
export const useRefreshSession = () => useAuthStore((state) => state.refreshSession);

/**
 * Get sign out function
 * @returns Function to sign out user
 */
export const useSignOut = () => useAuthStore((state) => state.signOut);

// ============================================
// ROLE CHECK SELECTORS
// ============================================

/**
 * Check if current user is an admin
 * @returns True if user has admin role
 */
export const useIsAdmin = (): boolean => useAuthStore((state) => state.isAdmin());

/**
 * Check if current user is staff (staff or admin)
 * @returns True if user has staff or admin role
 */
export const useIsStaff = (): boolean => useAuthStore((state) => state.isStaff());

/**
 * Check if current user is a customer
 * @returns True if user has customer role
 */
export const useIsCustomer = (): boolean => useAuthStore((state) => state.isCustomer());

// ============================================
// PERMISSION SELECTORS
// ============================================

/**
 * Check if user can manage products (create/edit/delete)
 * @returns True if user has product management permissions
 */
export const useCanManageProducts = (): boolean => useAuthStore((state) => state.canManageProducts());

/**
 * Check if user can manage orders
 * @returns True if user has order management permissions
 */
export const useCanManageOrders = (): boolean => useAuthStore((state) => state.canManageOrders());

/**
 * Check if user can manage other users
 * @returns True if user has user management permissions
 */
export const useCanManageUsers = (): boolean => useAuthStore((state) => state.canManageUsers());

/**
 * Check if user can place orders
 * @returns True if user can place orders
 */
export const useCanPlaceOrders = (): boolean => useAuthStore((state) => state.canPlaceOrders());

/**
 * Check if user can view all orders (staff/admin only)
 * @returns True if user can view all orders
 */
export const useCanViewAllOrders = (): boolean => useAuthStore((state) => state.canViewAllOrders());

// ============================================
// COMPOSITE SELECTORS
// ============================================

/**
 * Get user display information
 * @returns Object with email and role
 */
export const useUserInfo = () =>
  useAuthStore((state) => ({
    email: state.user?.email ?? null,
    role: state.role,
    isAdmin: state.role === 'admin',
    isStaff: state.role === 'staff' || state.role === 'admin',
    isCustomer: state.role === 'customer',
  }));

/**
 * Get complete auth context
 * @returns Object with all auth state
 */
export const useAuthContext = () =>
  useAuthStore((state) => ({
    session: state.session,
    user: state.user,
    role: state.role,
    isLoading: state.isLoading,
    isAuthenticated: state.isAuthenticated,
    isAdmin: state.isAdmin(),
    isStaff: state.isStaff(),
    isCustomer: state.isCustomer(),
  }));
