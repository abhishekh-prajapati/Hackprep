"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Settings, Zap, LogOut, User, ChevronDown, Command } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Avatar } from './Avatar';

export function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);


  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-border bg-white/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-8">
        
        {/* Brand & Search */}
        <div className="flex items-center gap-8 flex-1">
         {/* Branding removed from Navbar, only in Sidebar */}
         <div className="flex-1" />

          <div className="relative hidden md:block max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-brand-grey" />
            <input
              type="text"
              placeholder="Quick search..."
              className="w-full rounded-lg border border-brand-border bg-brand-offwhite/50 py-1.5 pl-9 pr-4 text-[11px] font-medium text-brand-black focus:border-brand-orange/40 focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-orange/5 transition-all"
            />
          </div>
        </div>

        {/* Navigation Actions */}
        <div className="flex items-center gap-6">


          <div className="h-4 w-px bg-brand-border hidden sm:block" />

          <div className="flex items-center gap-4">
            <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-brand-border text-brand-grey transition-all hover:bg-brand-offwhite hover:text-brand-orange">
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-brand-orange ring-2 ring-white" />
            </button>

            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 rounded-xl p-0.5 pr-2 transition-all hover:bg-brand-offwhite"
              >
                <Avatar 
                  username={user?.name || 'User'} 
                  src={user?.profilePhoto} 
                  size={32} 
                  className="rounded-lg border border-brand-border"
                />
                <ChevronDown className={cn("h-3 w-3 text-brand-grey transition-transform", menuOpen && "rotate-180")} />
              </button>

              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-56 origin-top-right rounded-2xl border border-brand-border bg-white p-2 shadow-2xl shadow-brand-black/10 ring-1 ring-black/5 focus:outline-none"
                  >
                    <div className="px-3 py-3 border-b border-brand-border/50 mb-1">
                      <p className="text-[11px] font-bold text-brand-black truncate">{user?.name}</p>
                      <p className="text-[10px] text-brand-grey font-medium truncate">{user?.email}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <Link 
                        href="/profile" 
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-bold text-brand-grey transition hover:bg-brand-offwhite hover:text-brand-orange"
                      >
                        <User className="h-4 w-4" />
                        Profile Settings
                      </Link>
                      <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-xs font-bold text-brand-grey transition hover:bg-brand-offwhite hover:text-brand-orange text-left">
                        <Zap className="h-4 w-4" />
                        Usage Stats
                      </button>
                    </div>

                    <div className="mt-2 pt-1 border-t border-brand-border/50">
                      <button
                        onClick={logout}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-xs font-bold text-red-500 transition hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
