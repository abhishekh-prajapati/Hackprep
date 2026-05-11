'use client';

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { SWRConfig } from 'swr';

interface User {
  id: string;
  name: string;
  email: string;
  profilePhoto?: string;
  bio?: string;
  skills?: string[];
  languages?: string[];
  pastHackathons?: string;
  githubId?: string;
  gender?: string;
  totalEvents?: number;
  wins?: number;
  projectsCompleted?: number;
  isOnboardingCompleted: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const hasInitialized = useRef(false);

  // Industrial-grade Logout
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    if (window.location.pathname !== '/login') {
      router.push('/login');
    }
  }, [router]);

  const fetchUserProfile = useCallback(async (authToken: string) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
    try {
      const res = await fetch(`${apiUrl}/users/me`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (res.ok) {
        const userData = await res.json();
        setUser(userData);
        
        const currentPath = window.location.pathname;
        if (!userData.isOnboardingCompleted && currentPath !== '/onboarding') {
          router.push('/onboarding');
        } else if (userData.isOnboardingCompleted && (currentPath === '/login' || currentPath === '/onboarding')) {
           router.push('/');
        }
      } else if (res.status === 401) {
        // ONLY logout on 401 Unauthorized. 
        // Do NOT logout on network errors or 500s.
        logout();
      }
    } catch (error) {
      // Network error - stay silent, keep the token, and let the UI handle the offline state
      console.error('Network error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  }, [logout, router]);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get('token');

    let currentToken = urlToken || localStorage.getItem('token');

    if (urlToken) {
      localStorage.setItem('token', urlToken);
      // Clean up the URL
      const url = new URL(window.location.href);
      url.searchParams.delete('token');
      window.history.replaceState({}, document.title, url.pathname + url.search);
      currentToken = urlToken;
    }

    if (currentToken) {
      setToken(currentToken);
      fetchUserProfile(currentToken);
    } else {
      setLoading(false);
      if (pathname !== '/login') {
        router.push('/login');
      }
    }
  }, [fetchUserProfile, pathname, router]);

  const login = useCallback((newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    fetchUserProfile(newToken);
  }, [fetchUserProfile]);

  const updateUser = useCallback((data: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...data } : null));
  }, []);

  const fetcher = async (url: string) => {
    if (!token) return null;
    try {
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.status === 401) {
        logout();
        return null;
      }
      if (!res.ok) return null; // Let SWR handle the lack of data
      return res.json();
    } catch (err) {
      // Return null on network error to prevent crashing, SWR will retry
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, updateUser }}>
      <SWRConfig value={{ 
        fetcher,
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        shouldRetryOnError: true,
        dedupingInterval: 2000
      }}>
        {children}
      </SWRConfig>
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
