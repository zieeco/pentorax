export const handleAuthError = (error: unknown, context: string): string => {
  console.error(`[AuthStore] ${context}:`, error);

  if (error && typeof error === 'object' && 'message' in error) {
    const message = (error as { message: string }).message;
    return message;
  }

  return `Failed to ${context.toLowerCase()}`;
};

interface ApiResponseError {
  response?: {
    data?: {
      detail?: string;
    };
  };
}

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  const apiError = error as ApiResponseError;
  if (apiError.response?.data?.detail) {
    return apiError.response.data.detail;
  }
  return 'An unexpected error occurred';
};

/**
 * Debounce utility for focus handler
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => ReturnType<T>) => {
  let timeoutId: NodeJS.Timeout;
  return ((...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  }) as (...args: Parameters<T>) => ReturnType<T>;
};

// STORAGE UTILS (Intentionally empty - Never use localstorage)
export const persistSession = (_session: unknown) => {
  // Cookies are handled by the browser
};

export const clearPersistedSession = () => {
  // Cookies are handled by the browser/server
};

export const loadSessionFromStorage = (): unknown | null => {
  return null;
};

export const getStorageKey = () => 'pentorax-auth';
