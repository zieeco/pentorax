'use client';

import { useTheme as useNextTheme } from 'next-themes';

/**
 * Hook to access theme state and setters.
 * Refactored to use next-themes under the hood.
 */
export const useTheme = () => {
  const { theme, setTheme, systemTheme, resolvedTheme } = useNextTheme();

  return {
    theme: (theme || 'system') as 'light' | 'dark' | 'system',
    setTheme,
    systemTheme: systemTheme as 'light' | 'dark' | undefined,
    resolvedTheme: resolvedTheme as 'light' | 'dark' | undefined,
  };
};
