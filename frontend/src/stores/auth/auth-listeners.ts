import { authApi } from '@/services/auth.service';
import { extractUserMetadata } from '@/utils/authHelpers';
import type { AuthStoreSetter } from './auth-types';
import { debounce } from './auth-utils';

// CROSS-TAB SYNC (Using BroadcastChannel instead of localStorage)
const AUTH_CHANNEL = 'pentorax-auth-channel';

export const setupCrossTabSync = (set: AuthStoreSetter) => {
  if (typeof window === 'undefined') return () => {};

  const channel = new BroadcastChannel(AUTH_CHANNEL);

  channel.onmessage = async (event) => {
    if (event.data === 'LOGIN' || event.data === 'LOGOUT') {
      console.log(`[AuthStore] Auth change detected in another tab: ${event.data}`);

      try {
        // When auth changes in another tab, re-verify locally
        if (event.data === 'LOGIN') {
          const data = await authApi.getCurrentUser();
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
            });
          }
        } else {
          set({
            session: null,
            user: null,
            role: null,
            isAuthenticated: false,
          });
        }
      } catch (error) {
        set({
          session: null,
          user: null,
          role: null,
          isAuthenticated: false,
        });
      }
    }
  };

  return () => channel.close();
};

// Helper to notify other tabs (used in login/logout actions if needed,
// but currently we rely on page refreshes or explicit calls)
export const broadcastAuthChange = (type: 'LOGIN' | 'LOGOUT') => {
  if (typeof window !== 'undefined') {
    const channel = new BroadcastChannel(AUTH_CHANNEL);
    channel.postMessage(type);
    channel.close();
  }
};

// AUTO-REFRESH ON FOCUS
export const setupAutoRefresh = (refreshSession: () => Promise<void>) => {
  const debouncedRefresh = debounce(async () => {
    console.log('[AuthStore] Window focused, refreshing user data...');
    // In cookie-based auth, we just re-check the user
    await refreshSession();
  }, 500);

  const handleFocus = () => {
    debouncedRefresh();
  };

  window.addEventListener('focus', handleFocus);
  return () => window.removeEventListener('focus', handleFocus);
};
