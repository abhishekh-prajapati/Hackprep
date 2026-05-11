"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Compass, 
  GitCompare, 
  ClipboardList, 
  Zap, 
  Library, 
  User,
  Plus,
  Layers
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: Layers, label: 'Workspace', href: '/workspace' },
  { icon: Compass, label: 'Explore Ideas', href: '/explore' },
  { icon: GitCompare, label: 'Compare Ideas', href: '/compare' },
  { icon: ClipboardList, label: 'My Plan', href: '/plan' },
  { icon: Library, label: 'Resources', href: '/resources' },
  { icon: User, label: 'Profile', href: '/profile' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen border-r border-brand-border bg-white flex flex-col fixed left-0 top-0 z-50">
      <div className="p-8 flex items-center gap-3">
        <div className="w-9 h-9 bg-brand-black rounded-xl flex items-center justify-center shadow-xl shadow-brand-black/10 relative overflow-hidden group cursor-pointer">
          <Zap className="text-brand-orange w-5 h-5 fill-current relative z-10" />
          <div className="absolute inset-0 bg-brand-orange opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-xl leading-none text-brand-black tracking-tight">HackPrep</span>
          <span className="text-[9px] font-bold text-brand-orange tracking-widest uppercase mt-1">Project Manager</span>
        </div>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-1.5">
        <div className="text-[10px] font-bold text-brand-grey tracking-[0.2em] uppercase mb-5 px-4">
          Core Systems
        </div>
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-300",
                isActive 
                  ? "bg-brand-orange/10 text-brand-orange shadow-sm" 
                  : "text-brand-grey hover:bg-brand-offwhite hover:text-brand-black"
              )}
            >
              <item.icon className={cn("w-5 h-5 transition-colors", isActive ? "text-brand-orange" : "text-brand-grey")} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 space-y-4">
        <div className="bg-brand-offwhite p-4 rounded-xl flex items-center gap-3 border border-brand-border shadow-inner">
          <div className="w-2 h-2 bg-brand-orange rounded-full animate-pulse shadow-[0_0_8px_rgba(255,107,0,0.8)]" />
          <span className="text-[10px] font-bold text-brand-black uppercase tracking-widest">Neural Link Active</span>
        </div>
        <button className="w-full bg-brand-black text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-brand-orange transition-all shadow-xl shadow-brand-black/10 active:scale-[0.98] uppercase tracking-widest">
          <Plus className="w-4 h-4" />
          New Module
        </button>
      </div>
    </aside>
  );
}
