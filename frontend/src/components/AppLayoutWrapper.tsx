'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar } from '@/components/Sidebar';
import { Navbar } from '@/components/Navbar';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { loading } = useAuth();
  
  const isAuthRoute = pathname === '/login' || pathname === '/onboarding';

  // Auth routes don't need the sidebar or loading state
  if (isAuthRoute) {
    return <main className="min-h-screen">{children}</main>;
  }

  return (
    <>
      {!isAuthRoute && <Sidebar />}
      <div className={!isAuthRoute ? 'pl-64 flex flex-col min-h-screen' : 'min-h-screen'}>
        {!isAuthRoute && <Navbar />}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </>
  );
}

export function AppLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <LayoutContent>{children}</LayoutContent>
    </AuthProvider>
  );
}
