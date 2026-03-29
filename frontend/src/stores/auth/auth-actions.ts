import { toast } from 'sonner';
import { authApi } from '@/services/auth.service';
import { extractUserMetadata, User, UserMetadata } from '@/utils/authHelpers';
import { broadcastAuthChange } from './auth-listeners';
import type { AuthErrorResponse, AuthResponse, AuthStoreSetter } from './auth-types';
import { getErrorMessage, handleAuthError } from './auth-utils';

// SIGN IN
export const createSignInAction =
  (set: AuthStoreSetter) =>
  async (email: string, password: string): Promise<AuthResponse<any>> => {
    set({ isLoading: true });

    try {
      const data = await authApi.login(email, password);

      if (data.user) {
        const metadata = extractUserMetadata(data.user);
        const session = {
          access_token: data.access_token,
          token_type: data.token_type,
          user: data.user,
        };

        set({
          session,
          user: data.user,
          role: metadata.role,
          isAuthenticated: true,
          isLoading: false,
        });

        console.log('[AuthStore] Sign in successful. Role:', metadata.role);
        broadcastAuthChange('LOGIN');
        return { data: data.user, error: null };
      }

      set({ isLoading: false });
      return { data: null, error: null };
    } catch (error: unknown) {
      const errorMsg = getErrorMessage(error);
      toast.error(errorMsg);
      set({ isLoading: false });
      return { data: null, error };
    }
  };

// SIGN UP
export const createSignUpAction =
  (set: AuthStoreSetter) =>
  async (
    email: string,
    password: string,
    fullName: string,
    metadata?: UserMetadata
  ): Promise<AuthResponse<User>> => {
    set({ isLoading: true });

    try {
      const user = await authApi.register(email, password, fullName, metadata);

      console.log('[AuthStore] Sign up successful:', user?.email);
      toast.success('Registration successful! You can now sign in.');
      set({ isLoading: false });
      return { data: user, error: null };
    } catch (error: unknown) {
      const errorMsg = getErrorMessage(error);
      toast.error(errorMsg);
      set({ isLoading: false });
      return { data: null, error };
    }
  };

// FORGOT PASSWORD
export const createForgotPasswordAction =
  (set: AuthStoreSetter) =>
  async (email: string): Promise<AuthErrorResponse> => {
    set({ isLoading: true });

    try {
      await authApi.forgotPassword(email);
      toast.success('Password reset email sent');
      set({ isLoading: false });
      return { error: null };
    } catch (error: unknown) {
      const errorMsg = getErrorMessage(error);
      toast.error(errorMsg);
      set({ isLoading: false });
      return { error };
    }
  };

// UPDATE PASSWORD
export const createUpdatePasswordAction =
  (set: AuthStoreSetter) =>
  async (newPassword: string): Promise<AuthErrorResponse> => {
    set({ isLoading: true });

    try {
      await authApi.updatePassword(newPassword);
      toast.success('Password updated successfully');
      set({ isLoading: false });
      return { error: null };
    } catch (error: unknown) {
      const errorMsg = getErrorMessage(error);
      toast.error(errorMsg);
      set({ isLoading: false });
      return { error };
    }
  };

// RESEND VERIFICATION EMAIL
export const createResendVerificationAction =
  () =>
  async (_email: string): Promise<AuthErrorResponse> => {
    try {
      console.log('[AuthStore] Resend verification not implemented yet');
      return { error: null };
    } catch (error: unknown) {
      // No toast for this action as per original logic
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
    broadcastAuthChange('LOGOUT');
    toast.success('Signed out successfully');
  } catch (error: unknown) {
    console.error('[AuthStore] Sign out error:', getErrorMessage(error));
    set({
      session: null,
      user: null,
      role: null,
      isAuthenticated: false,
    });
  } finally {
    set({ isLoading: false });
  }
};

// CHECK USER
export const createCheckUserAction = (set: AuthStoreSetter) => async () => {
  set({ isLoading: true });

  try {
    // Try to get user from server to verify session (Cookie based)
    const data = await authApi.getCurrentUser();

    if (data.user) {
      const metadata = extractUserMetadata(data.user);
      const role = metadata.role;
      const session = {
        access_token: data.access_token,
        token_type: data.token_type,
        user: data.user,
      };

      set({
        session,
        user: data.user,
        role,
        isAuthenticated: true,
      });

      return { role };
    }

    throw new Error('User data not found');
  } catch (error: unknown) {
    console.log('[AuthStore] Check user failed, session might be invalid or expired');
    set({
      session: null,
      user: null,
      role: null,
      isAuthenticated: false,
    });
    return { role: null };
  } finally {
    set({ isLoading: false });
  }
};

// REFRESH SESSION
export const createRefreshSessionAction = (_set: AuthStoreSetter) => async (): Promise<void> => {
  console.log('[AuthStore] Refresh session not required for server-side sessions');
};
