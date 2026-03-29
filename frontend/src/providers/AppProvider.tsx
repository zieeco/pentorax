'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { queryClient } from '@/lib/react-query';
import { ThemeProvider } from './ThemeProvider';

interface AppProviderProps {
  children: ReactNode;
}

/**
 * Main AppProvider wrapping the whole app with necessary contexts.
 * Refactored for Next.js 15 and modern state management.
 */
export function AppProvider({ children }: AppProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {children}
        <Toaster richColors closeButton position="top-right" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
