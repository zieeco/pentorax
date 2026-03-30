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

// STORAGE UTILS (Intentionally empty - Never use localstorage)
export const persistSession = (_session: any) => {
  // Cookies are handled by the browser
};

export const clearPersistedSession = () => {
  // Cookies are handled by the browser/server
};

export const loadSessionFromStorage = (): any | null => {
  return null;
};

export const getStorageKey = () => 'pentorax-auth';
