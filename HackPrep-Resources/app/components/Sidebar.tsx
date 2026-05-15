"use client";

import React from "react";
import { 
  LayoutGrid, 
  Compass, 
  GitCompare, 
  BookOpen, 
  Monitor, 
  Package, 
  User,
  Zap,
  Plus
} from "lucide-react";
import { motion } from "framer-motion";
import { useSavedIdeas } from "@/lib/context";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Sidebar() {
  const { unseenCount } = useSavedIdeas();
  const pathname = usePathname();

  const menuItems = [
    { icon: Compass, label: "Explore Ideas", href: "/" },
    { icon: BookOpen, label: "My Plan", href: "/my-plane", count: unseenCount },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-72 bg-white border-r border-[var(--hp-border)] flex flex-col z-40">
      {/* Logo Section */}
      <div className="p-8 pb-10 flex items-center gap-4">
        <div className="h-12 w-12 bg-[var(--hp-primary)] rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
          <Zap size={24} className="text-white fill-white" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-[var(--hp-dark)] tracking-tight">HackPrep</h1>
          <p className="text-[10px] font-black text-[var(--hp-primary)] uppercase tracking-[0.2em] -mt-1">AI Co-Pilot</p>
        </div>
      </div>

      {/* Main Menu Label */}
      <div className="px-8 mb-4">
        <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.15em]">Main Menu</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-200 group relative ${
                isActive 
                  ? "bg-gray-100/80 text-[var(--hp-dark)]" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-[var(--hp-dark)]"
              }`}
            >
              {isActive && (
                <motion.div 
                  layoutId="active-indicator"
                  className="absolute left-0 top-1/4 bottom-1/4 w-1.5 bg-[var(--hp-primary)] rounded-r-full"
                />
              )}
              <item.icon size={22} className={isActive ? "text-[var(--hp-primary)]" : "text-gray-400 group-hover:text-[var(--hp-primary)] transition-colors"} />
              <span className="font-bold text-[15px] flex-1 text-left">{item.label}</span>
              {item.count !== undefined && item.count > 0 && (
                <span className="bg-[var(--hp-primary)] text-white text-[10px] font-black px-2 py-1 rounded-lg">
                  {item.count}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Section */}
      <div className="p-6 space-y-4">
        {/* Status Indicator */}
        <div className="flex items-center gap-3 px-4 py-3.5 bg-gray-100/50 rounded-2xl border border-gray-100">
          <div className="h-2.5 w-2.5 rounded-full bg-[var(--hp-success)] animate-pulse" />
          <span className="text-sm font-bold text-gray-500">AI Engine Active</span>
        </div>

        {/* New Project Button */}
        <button className="w-full flex items-center justify-center gap-2 bg-[var(--hp-primary)] hover:bg-[var(--hp-primary-dark)] text-white py-4 rounded-2xl font-black shadow-xl shadow-orange-500/20 transition-all active:scale-95">
          <Plus size={20} strokeWidth={3} />
          <span>New Project</span>
        </button>
      </div>
    </aside>
  );
}
