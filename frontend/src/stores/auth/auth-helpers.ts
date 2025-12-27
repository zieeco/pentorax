import type { User } from '@supabase/supabase-js';

// ============================================
// TYPE DEFINITIONS
// ============================================

/**
 * User roles in SkillForge
 * - student: Regular learners (default)
 * - admin: Platform administrators
 */
export type UserRole = 'student' | 'admin';

/**
 * Extracted user metadata from JWT token
 */
export interface UserMetadata {
  role: UserRole | null;
}

// ============================================
// METADATA EXTRACTION
// ============================================

/**
 * Extracts user metadata from Supabase User object
 *
 * Reads role from app_metadata.role (set by JWT hook in migration 05)
 * Falls back to user_metadata.role for backward compatibility
 * Defaults to 'student' if no role found
 *
 * @param user - Supabase User object from session
 * @returns UserMetadata with role
 *
 * @example
 * ```typescript
 * const { role } = extractUserMetadata(session.user);
 * if (role === 'admin') {
 *   showAdminDashboard();
 * }
 * ```
 */
export const extractUserMetadata = (user: User | null): UserMetadata => {
  if (!user) {
    return { role: null };
  }

  // Primary: Check app_metadata (set by JWT hook)
  let role = user.app_metadata?.role as UserRole | undefined;

  // Fallback: Check user_metadata (for backward compatibility)
  if (!role) {
    role = user.user_metadata?.role as UserRole | undefined;
  }

  // Validate role is one of our allowed values
  if (role && !isValidRole(role)) {
    console.warn(`Invalid role detected: ${role}. Defaulting to 'student'.`);
    role = 'student';
  }

  // Default to student if no role found
  const finalRole = role || 'student';

  return { role: finalRole };
};

// ============================================
// VALIDATION HELPERS
// ============================================

/**
 * Type guard to check if a string is a valid UserRole
 *
 * @param role - String to validate
 * @returns True if role is 'student' or 'admin'
 */
export const isValidRole = (role: string): role is UserRole => {
  return role === 'student' || role === 'admin';
};

/**
 * Check if a role has admin privileges
 *
 * @param role - User role to check
 * @returns True if role is 'admin'
 */
export const isAdminRole = (role: UserRole | null): boolean => {
  return role === 'admin';
};

/**
 * Check if a role is a student
 *
 * @param role - User role to check
 * @returns True if role is 'student'
 */
export const isStudentRole = (role: UserRole | null): boolean => {
  return role === 'student';
};

// ============================================
// PERMISSION HELPERS
// ============================================

/**
 * Check if user can access admin features
 *
 * @param role - User role to check
 * @returns True if user has admin access
 */
export const canAccessAdminPanel = (role: UserRole | null): boolean => {
  return isAdminRole(role);
};

/**
 * Check if user can manage courses
 *
 * @param role - User role to check
 * @returns True if user can create/edit courses
 */
export const canManageCourses = (role: UserRole | null): boolean => {
  return isAdminRole(role);
};

/**
 * Check if user can manage users
 *
 * @param role - User role to check
 * @returns True if user can manage other users
 */
export const canManageUsers = (role: UserRole | null): boolean => {
  return isAdminRole(role);
};

/**
 * Check if user can enroll in courses
 *
 * @param role - User role to check
 * @returns True if user can enroll in courses
 */
export const canEnrollInCourses = (role: UserRole | null): boolean => {
  // Both students and admins can enroll
  return role === 'student' || role === 'admin';
};

/**
 * Check if user can view their own progress
 *
 * @param role - User role to check
 * @returns True if user can view progress
 */
export const canViewProgress = (role: UserRole | null): boolean => {
  // All authenticated users can view their progress
  return role !== null;
};

/**
 * Check if user can view all users' progress
 *
 * @param role - User role to check
 * @returns True if user can view all progress (admin only)
 */
export const canViewAllProgress = (role: UserRole | null): boolean => {
  return isAdminRole(role);
};

/**
 * Get user-friendly role display name
 *
 * @param role - User role
 * @returns Capitalized role name
 */
export const getRoleDisplayName = (role: UserRole | null): string => {
  if (!role) return 'Guest';
  return role === 'admin' ? 'Administrator' : 'Student';
};
