import { supabase } from '@/utils/supabaseClient';
import { toast } from 'sonner';
import { extractUserMetadata } from '@/utils/authHelpers';
import type { AuthStoreSetter, AuthResponse, AuthErrorResponse } from './auth-types';
import { handleAuthError, persistSession, clearPersistedSession } from './auth-utils';
import { cartApi } from '@/services';

// Helper to get session key from cookies
const getSessionKey = () => {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'sessionid') {
      return value;
    }
  }
  return null;
};

// SIGN IN
export const createSignInAction = (set: AuthStoreSetter) => async (
  email: string,
  password: string
): Promise<AuthResponse<any>> => {
  set({ isLoading: true });

  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      toast.error(handleAuthError(error, 'Sign in'));
      set({ isLoading: false });
      return { data: null, error };
    }

    if (data.user) {
      const metadata = extractUserMetadata(data.user);
      set({
        session: data.session,
        user: data.user,
        role: metadata.role,
        isAuthenticated: true, // CRITICAL: Set isAuthenticated
        isLoading: false,
      });

      // Merge guest cart if exists
      const sessionKey = getSessionKey();
      if (sessionKey) {
        try {
          await cartApi.merge(sessionKey);
          console.log('[Auth] Guest cart merged successfully');
        } catch (mergeError) {
          // Don't fail login if cart merge fails
          console.warn('[Auth] Cart merge failed:', mergeError);
        }
      }

      console.log('[AuthStore] Sign in successful. Role:', metadata.role);
      return { data: data.user, error: null };
    }

    set({ isLoading: false });
    return { data: null, error: null };
  } catch (error) {
    toast.error(handleAuthError(error, 'Sign in exception'));
    set({ isLoading: false });
    return { data: null, error: error as any };
  }
};

// SIGN UP
export const createSignUpAction = (set: AuthStoreSetter) => async (
  email: string,
  password: string,
  fullName: string,
  metadata?: Record<string, any>
): Promise<AuthResponse<any>> => {
  set({ isLoading: true });

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: fullName,
          full_name: fullName,
          ...metadata,
        },
        emailRedirectTo: `${window.location.origin}/auth/confirmation?type=email-verified`,
      },
    });

    if (error) {
      toast.error(handleAuthError(error, 'Sign up'));
      set({ isLoading: false });
      return { data: null, error };
    }

    console.log('[AuthStore] Sign up successful:', data.user?.email);
    set({ isLoading: false });
    return { data: data.user, error: null };
  } catch (error) {
    toast.error(handleAuthError(error, 'Sign up exception'));
    set({ isLoading: false });
    return { data: null, error: error as any };
  }
};

// FORGOT PASSWORD
export const createForgotPasswordAction = (set: AuthStoreSetter) => async (
  email: string
): Promise<AuthErrorResponse> => {
  set({ isLoading: true });

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/dashboard/reset-password`,
    });

    if (error) {
      toast.error(handleAuthError(error, 'Forgot password'));
      set({ isLoading: false });
      return { error };
    }

    console.log('[AuthStore] Password reset email sent to:', email);
    set({ isLoading: false });
    return { error: null };
  } catch (error) {
    toast.error(handleAuthError(error, 'Forgot password exception'));
    set({ isLoading: false });
    return { error: error as any };
  }
};

// UPDATE PASSWORD
export const createUpdatePasswordAction = (set: AuthStoreSetter) => async (
  newPassword: string
): Promise<AuthErrorResponse> => {
  set({ isLoading: true });

  try {
    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      toast.error(handleAuthError(error, 'Update password'));
      set({ isLoading: false });
      return { error };
    }

    console.log('[AuthStore] Password updated successfully');
    set({ isLoading: false });
    return { error: null };
  } catch (error) {
    toast.error(handleAuthError(error, 'Update password exception'));
    set({ isLoading: false });
    return { error: error as any };
  }
};

// RESEND VERIFICATION EMAIL
export const createResendVerificationAction = () => async (
  email: string
): Promise<AuthErrorResponse> => {
  try {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      toast.error(handleAuthError(error, 'Resend verification'));
      return { error };
    }

    console.log('[AuthStore] Verification email resent to:', email);
    return { error: null };
  } catch (error) {
    toast.error(handleAuthError(error, 'Resend verification exception'));
    return { error: error as any };
  }
};

// SIGN OUT
export const createSignOutAction = (set: AuthStoreSetter) => async (): Promise<void> => {
  set({ isLoading: true });

  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error(handleAuthError(error, 'Sign out'));
      throw error;
    }

    set({ 
      session: null, 
      user: null, 
      role: null,
      isAuthenticated: false, // CRITICAL: Set isAuthenticated to false
    });
    toast.success('Signed out successfully');
    clearPersistedSession();
  } catch (error) {
    toast.error(handleAuthError(error, 'Sign out error'));
  } finally {
    set({ isLoading: false });
  }
};

// CHECK USER
export const createCheckUserAction = (set: AuthStoreSetter) => async () => {
  set({ isLoading: true });

  let role = null;

  try {
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) {
      console.error('[AuthStore] Error getting session:', error.message);
      return { role: null };
    }

    const user = session?.user ?? null;
    const metadata = extractUserMetadata(user);
    role = metadata.role;

    set({ 
      session, 
      user, 
      role,
      isAuthenticated: !!session, // CRITICAL: Set isAuthenticated based on session
    });

    if (session) {
      persistSession(session);
    } else {
      clearPersistedSession();
    }

    if (!role && user) {
      console.warn('[AuthStore] Role not found in JWT. App metadata:', user.app_metadata);
    }
  } catch (error) {
    console.error(handleAuthError(error, 'Check user'));
    toast.error('Failed to verify authentication status');
  } finally {
    set({ isLoading: false });
  }

  return { role };
};

// REFRESH SESSION
export const createRefreshSessionAction = (set: AuthStoreSetter) => async (): Promise<void> => {
  try {
    const { data, error } = await supabase.auth.refreshSession();

    if (error) {
      console.error('[AuthStore] Failed to refresh session:', error.message);
      return;
    }

    if (data.session) {
      const metadata = extractUserMetadata(data.session.user);
      set({
        session: data.session,
        user: data.session.user,
        role: metadata.role,
        isAuthenticated: true, // CRITICAL: Set isAuthenticated
      });

      persistSession(data.session);
      console.log('[AuthStore] Session refreshed. Role:', metadata.role);
    }
  } catch (error) {
    console.error('[AuthStore] Exception in refreshSession:', error);
  }
};
