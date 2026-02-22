import { extractUserMetadata } from '@/utils/authHelpers';
import type { AuthStoreSetter } from './auth-types';
import { debounce, persistSession, clearPersistedSession, getStorageKey } from './auth-utils';

// CROSS-TAB SYNC

export const setupCrossTabSync = (set: AuthStoreSetter) => {
  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === getStorageKey()) {
      if (event.newValue) {
        const session = JSON.parse(event.newValue);
        const metadata = extractUserMetadata(session.user);

        set({
          session,
          user: session.user,
          role: metadata.role,
          isAuthenticated: true, // CRITICAL: Set isAuthenticated
        });

        console.log('[AuthStore] Session synced from another tab');
      } else {
        set({
          session: null,
          user: null,
          role: null,
          isAuthenticated: false, // CRITICAL: Set isAuthenticated to false
        });

        console.log('[AuthStore] Sign out synced from another tab');
      }
    }
  };

  window.addEventListener('storage', handleStorageChange);
  return () => window.removeEventListener('storage', handleStorageChange);
};

// AUTO-REFRESH ON FOCUS
export const setupAutoRefresh = (refreshSession: () => Promise<void>) => {
  const debouncedRefresh = debounce(async () => {
    console.log('[AuthStore] Window focused, refreshing session...');
    await refreshSession();
  }, 500);

  const handleFocus = () => {
    debouncedRefresh();
  };

  window.addEventListener('focus', handleFocus);
  return () => window.removeEventListener('focus', handleFocus);
};
