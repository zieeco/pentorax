'use client';

import React, { useState } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Sidebar from '@/components/dashboard/Sidebar';

/**
 * Dashboard Layout for Next.js 16.
 * Refactored from legacy DashboardLayout.tsx.
 * Provides a protected environment with Sidebar and Header.
 */
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <ProtectedRoute>
      <div className="font-sand flex h-screen overflow-hidden bg-gray-50">
        {/* LEFT - Sidebar with transition effects */}
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* RIGHT - Main content area */}
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <DashboardHeader />
          <main className="no-scrollbar flex-1 overflow-y-auto scroll-smooth p-8">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
