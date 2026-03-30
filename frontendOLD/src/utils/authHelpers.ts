// ============================================
// TYPE DEFINITIONS
// ============================================

/**
 * Native User type
 */
export interface User {
  id: string;
  email: string;
  name?: string;
  role?: UserRole;
  [key: string]: any;
}

/**
 * Native Session type
 */
export interface Session {
  access_token: string;
  token_type: string;
  user: User;
}

/**
 * User roles in Pentorax
 * - customer: Regular customers (default)
 * - staff: Staff members
 * - admin: Platform administrators
 */
export type UserRole = 'customer' | 'staff' | 'admin';

/**
 * Extracted user metadata
 */
export interface UserMetadata {
  role: UserRole | null;
}

// ============================================
// METADATA EXTRACTION
// ============================================

/**
 * Extracts user metadata from User object
 *
 * @param user - User object from session
 * @returns UserMetadata with role
 */
export const extractUserMetadata = (user: User | null): UserMetadata => {
  if (!user) {
    return { role: null };
  }

  const role = user.role as UserRole | undefined;

  // Validate role is one of our allowed values
  if (role && !isValidRole(role)) {
    console.warn(`Invalid role detected: ${role}. Defaulting to 'customer'.`);
    return { role: 'customer' };
  }

  // Default to customer if no role found
  const finalRole = role || 'customer';

  return { role: finalRole };
};


// ============================================
// VALIDATION HELPERS
// ============================================

/**
 * Type guard to check if a string is a valid UserRole
 */
export const isValidRole = (role: string): role is UserRole => {
  return role === 'customer' || role === 'staff' || role === 'admin';
};

/**
 * Check if a role has admin privileges
 */
export const isAdminRole = (role: UserRole | null): boolean => {
  return role === 'admin';
};

/**
 * Check if a role has staff privileges (staff or admin)
 */
export const isStaffRole = (role: UserRole | null): boolean => {
  return role === 'staff' || role === 'admin';
};

/**
 * Check if a role is a customer
 */
export const isCustomerRole = (role: UserRole | null): boolean => {
  return role === 'customer';
};

// ============================================
// PERMISSION HELPERS
// ============================================

/**
 * Check if user can access admin panel
 */
export const canAccessAdminPanel = (role: UserRole | null): boolean => {
  return isAdminRole(role);
};

/**
 * Check if user can access staff features
 */
export const canAccessStaffPanel = (role: UserRole | null): boolean => {
  return isStaffRole(role);
};

/**
 * Check if user can manage products
 */
export const canManageProducts = (role: UserRole | null): boolean => {
  return isStaffRole(role);
};

/**
 * Check if user can manage orders
 */
export const canManageOrders = (role: UserRole | null): boolean => {
  return isStaffRole(role);
};

/**
 * Check if user can manage users
 */
export const canManageUsers = (role: UserRole | null): boolean => {
  return isAdminRole(role);
};

/**
 * Check if user can place orders
 */
export const canPlaceOrders = (role: UserRole | null): boolean => {
  // All authenticated users can place orders
  return role !== null;
};

/**
 * Check if user can view all orders
 */
export const canViewAllOrders = (role: UserRole | null): boolean => {
  return isStaffRole(role);
};

/**
 * Get user-friendly role display name
 */
export const getRoleDisplayName = (role: UserRole | null): string => {
  if (!role) return 'Guest';
  if (role === 'admin') return 'Administrator';
  if (role === 'staff') return 'Staff Member';
  return 'Customer';
};

/**
 * Get role-based redirect path after login/signup
 * @param role - User role
 * @returns Path to redirect to based on role
 */
export const getRoleBasedRedirect = (role: UserRole | null): string => {
  if (isAdminRole(role)) {
    return '/dashboard/admin';
  }
  if (isStaffRole(role)) {
    return '/dashboard/staff';
  }
  // Default for customers and null roles
  return '/dashboard';
};

