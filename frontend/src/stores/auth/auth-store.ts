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
  // Return store state and actions
  return {
    // INITIAL STATE
    session: null,
    user: null,
    role: null,
    isLoading: true,
    isAuthenticated: false,
    isInitialized: false,

    // INITIALIZATION (Client-side only)
    initialize: () => {
      if (typeof window === 'undefined') return () => {};

      const refreshSession = get().refreshSession;
      const cleanupSync = setupCrossTabSync(set);
      const cleanupRefresh = setupAutoRefresh(refreshSession);

      // Perform initial check
      get()
        .checkUser()
        .finally(() => {
          set({ isInitialized: true });
        });

      return () => {
        cleanupSync();
        cleanupRefresh();
      };
    },

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
    refreshSession: createRefreshSessionAction(set),

    // PERMISSION HELPERS
    ...createPermissionHelpers(get),
  };
});
