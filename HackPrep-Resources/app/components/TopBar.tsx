"use client";

import React from "react";
import { 
  Search, 
  Bell, 
  ChevronDown 
} from "lucide-react";

import { usePathname } from "next/navigation";

export default function TopBar() {
  const pathname = usePathname();
  const pageTitle = pathname === "/" ? "Explore Ideas" : pathname === "/my-plane" ? "My Plan" : "Dashboard";

  return (
    <header className="h-20 border-b border-[var(--hp-border)] bg-white sticky top-0 z-30 px-8 flex items-center justify-between">
      {/* Title Section */}
      <div>
        <h2 className="text-xl font-black text-[var(--hp-dark)]">{pageTitle}</h2>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Welcome back, Alex</p>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-6">
        {/* Search Bar */}
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[var(--hp-primary)] transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search ideas..." 
            className="bg-gray-100/50 border border-gray-100 rounded-xl pl-12 pr-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[var(--hp-primary)]/20 focus:bg-white w-64 transition-all"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2.5 bg-gray-100/50 border border-gray-100 rounded-xl text-gray-500 hover:text-[var(--hp-primary)] hover:bg-white transition-all">
          <Bell size={20} />
          <div className="absolute top-2.5 right-3 w-2 h-2 bg-[var(--hp-primary)] rounded-full border-2 border-white" />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="h-10 w-10 bg-[var(--hp-dark)] rounded-xl flex items-center justify-center text-white font-black text-sm">
            AJ
          </div>
          <div className="hidden md:block">
            <h4 className="text-sm font-black text-[var(--hp-dark)] leading-none mb-1">Alex Johnson</h4>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Pro Plan</p>
          </div>
          <ChevronDown size={16} className="text-gray-400 ml-1" />
        </div>
      </div>
    </header>
  );
}
