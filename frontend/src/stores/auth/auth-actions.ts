import { authApi } from '@/services/auth.service';
import { toast } from 'sonner';
import { extractUserMetadata } from '@/utils/authHelpers';
import type { AuthStoreSetter, AuthResponse, AuthErrorResponse } from './auth-types';
import { handleAuthError, persistSession, clearPersistedSession } from './auth-utils';
import { cartApi } from '@/services';

// SIGN IN
export const createSignInAction = (set: AuthStoreSetter) => async (
  email: string,
  password: string
): Promise<AuthResponse<any>> => {
  set({ isLoading: true });

  try {
    const data = await authApi.login(email, password);

    if (data.user) {
      const metadata = extractUserMetadata(data.user);
      const session = {
        access_token: data.access_token,
        token_type: data.token_type,
        user: data.user
      };
      
      set({
        session,
        user: data.user,
        role: metadata.role,
        isAuthenticated: true,
        isLoading: false,
      });

      persistSession(session);
      
      console.log('[AuthStore] Sign in successful. Role:', metadata.role);
      return { data: data.user, error: null };
    }

    set({ isLoading: false });
    return { data: null, error: null };
  } catch (error: any) {
    const errorMsg = error.response?.data?.detail || error.message || 'Sign in failed';
    toast.error(errorMsg);
    set({ isLoading: false });
    return { data: null, error };
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
    const user = await authApi.register(email, password, fullName, metadata);

    console.log('[AuthStore] Sign up successful:', user?.email);
    toast.success('Registration successful! You can now sign in.');
    set({ isLoading: false });
    return { data: user, error: null };
  } catch (error: any) {
    const errorMsg = error.response?.data?.detail || error.message || 'Sign up failed';
    toast.error(errorMsg);
    set({ isLoading: false });
    return { data: null, error };
  }
};

// FORGOT PASSWORD
export const createForgotPasswordAction = (set: AuthStoreSetter) => async (
  email: string
): Promise<AuthErrorResponse> => {
  set({ isLoading: true });

  try {
    await authApi.forgotPassword(email);
    toast.success('Password reset email sent');
    set({ isLoading: false });
    return { error: null };
  } catch (error: any) {
    const errorMsg = error.response?.data?.detail || error.message || 'Failed to send reset email';
    toast.error(errorMsg);
    set({ isLoading: false });
    return { error };
  }
};

// UPDATE PASSWORD
export const createUpdatePasswordAction = (set: AuthStoreSetter) => async (
  newPassword: string
): Promise<AuthErrorResponse> => {
  set({ isLoading: true });

  try {
    await authApi.updatePassword(newPassword);
    toast.success('Password updated successfully');
    set({ isLoading: false });
    return { error: null };
  } catch (error: any) {
    const errorMsg = error.response?.data?.detail || error.message || 'Failed to update password';
    toast.error(errorMsg);
    set({ isLoading: false });
    return { error };
  }
};

// RESEND VERIFICATION EMAIL
export const createResendVerificationAction = () => async (
  email: string
): Promise<AuthErrorResponse> => {
  try {
    // Implement resend if available in Django
    console.log('[AuthStore] Resend verification not implemented yet');
    return { error: null };
  } catch (error: any) {
    return { error };
  }
};

// SIGN OUT
export const createSignOutAction = (set: AuthStoreSetter) => async (): Promise<void> => {
  set({ isLoading: true });

  try {
    await authApi.logout();
    set({ 
      session: null, 
      user: null, 
      role: null,
      isAuthenticated: false,
    });
    toast.success('Signed out successfully');
    clearPersistedSession();
  } catch (error: any) {
    console.error('[AuthStore] Sign out error:', error);
    // Still clear local state even if server logout fails
    set({ 
      session: null, 
      user: null, 
      role: null,
      isAuthenticated: false,
    });
    clearPersistedSession();
  } finally {
    set({ isLoading: false });
  }
};

// CHECK USER
export const createCheckUserAction = (set: AuthStoreSetter) => async () => {
  set({ isLoading: true });

  try {
    // Try to get user from server to verify session
    const user = await authApi.getCurrentUser();
    const metadata = extractUserMetadata(user);
    const role = metadata.role;

    set({ 
      user, 
      role,
      isAuthenticated: true,
    });

    return { role };
  } catch (error) {
    console.log('[AuthStore] Check user failed, user might not be logged in');
    set({ 
      session: null, 
      user: null, 
      role: null,
      isAuthenticated: false,
    });
    clearPersistedSession();
    return { role: null };
  } finally {
    set({ isLoading: false });
  }
};

// REFRESH SESSION
export const createRefreshSessionAction = (set: AuthStoreSetter) => async (): Promise<void> => {
  // Logic for token refresh if using JWT with refresh tokens
  console.log('[AuthStore] Refresh session not implemented');
};

