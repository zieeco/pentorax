export const handleAuthError = (error: unknown, context: string): string => {
  console.error(`[AuthStore] ${context}:`, error);

  if (error && typeof error === 'object' && 'message' in error) {
    const message = (error as { message: string }).message;
    return message;
  }

  return `Failed to ${context.toLowerCase()}`;
};

/**
 * Debounce utility for focus handler
 */
export const debounce = <T extends (...args: any[]) => any>(func: T, delay: number): T => {
  let timeoutId: NodeJS.Timeout;
  return ((...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  }) as T;
};

// LOCAL STORAGE HELPERS
const AUTH_STORAGE_KEY = 'pentorax-auth';

export const persistSession = (session: any) => {
  if (session) {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
  } else {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
};

export const clearPersistedSession = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};

export const getStorageKey = () => AUTH_STORAGE_KEY;
