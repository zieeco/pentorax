import { create } from 'zustand';
import {
  createCheckUserAction,
  createForgotPasswordAction,
  createRefreshSessionAction,
  createResendVerificationAction,
  createSignInAction,
  createSignOutAction,
  createSignUpAction,
  createUpdatePasswordAction,
} from './auth-actions';
import { setupAutoRefresh, setupCrossTabSync } from './auth-listeners';
import { createPermissionHelpers } from './auth-permissions';
import type { AuthState } from './auth-types';

// AUTH STORE
export const useAuthStore = create<AuthState>((set, get) => {
  // Setup cross-tab synchronization
  const cleanupCrossTabSync = setupCrossTabSync(set);

  // Create refresh session action
  const refreshSession = createRefreshSessionAction(set);

  // Setup auto-refresh on window focus
  const cleanupAutoRefresh = setupAutoRefresh(refreshSession);

  // Cleanup on unmount (if needed)
  if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', () => {
      cleanupCrossTabSync();
      cleanupAutoRefresh();
    });
  }

  // Return store state and actions
  return {
    // INITIAL STATE
    session: null,
    user: null,
    role: null,
    isLoading: false,
    isAuthenticated: false,

    // STATE SETTERS
    setSession: (session) => set({ session, isAuthenticated: !!session }),
    setUser: (user) => set({ user }),
    setRole: (role) => set({ role }),

    // AUTH ACTIONS
    signIn: createSignInAction(set),
    signUp: createSignUpAction(set),
    forgotPassword: createForgotPasswordAction(set),
    updatePassword: createUpdatePasswordAction(set),
    resendVerificationEmail: createResendVerificationAction(),
    checkUser: createCheckUserAction(set),
    signOut: createSignOutAction(set),
    refreshSession,

    // PERMISSION HELPERS
    ...createPermissionHelpers(get),
  };
});

// INITIALIZE AUTH STATE
// Check user on initial load
useAuthStore.getState().checkUser();
