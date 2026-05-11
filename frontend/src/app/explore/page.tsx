"use client";

import React, { useState, useEffect } from 'react';
import { IdeaCard } from '@/components/IdeaCard';
import { 
  Search, 
  Filter, 
  TrendingUp, 
  Sparkles, 
  ChevronDown,
  LayoutGrid,
  List,
  ArrowUpDown,
  Compass,
  ArrowRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

// Mapping backend categories to IdeaCard types
const categoryToType = (category: string): 'AI' | 'FINTECH' | 'SECURITY' => {
  const c = category.toLowerCase();
  if (c.includes('ai') || c.includes('ml')) return 'AI';
  if (c.includes('fintech') || c.includes('wallet') || c.includes('defi')) return 'FINTECH';
  if (c.includes('security') || c.includes('auth')) return 'SECURITY';
  return 'AI'; // Default
};

const categories = [
  "All",
  "AI/ML",
  "FinTech",
  "Health",
  "IoT",
  "DevTools",
  "Climate"
];

interface Idea {
  id: number;
  title: string;
  description: string;
  category: string;
  tags: string[];
  score: number;
  trending: boolean;
  difficulty: string;
  duration: string;
}

export default function ExplorePage() {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIdeas = async () => {
      setLoading(true);
      try {
        const filterParam = activeFilter === 'All' ? '' : activeFilter;
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
        const res = await fetch(`${apiUrl}/ideas/search?q=${query}&filter=${filterParam}`);
        const data = await res.json();
        setIdeas(data);
      } catch (error) {
        console.error("Failed to fetch ideas:", error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchIdeas, 300);
    return () => clearTimeout(timeoutId);
  }, [query, activeFilter]);

  return (
    <div className="flex flex-col min-h-screen bg-brand-offwhite text-brand-black">
      
      <main className="max-w-7xl mx-auto w-full px-8 py-12 lg:px-12 space-y-16 pt-12">
        
        {/* Premium Hero Section */}
        <section className="relative overflow-hidden rounded-[3rem] bg-brand-black p-12 lg:p-20 text-white shadow-2xl shadow-brand-orange/20">
          <div className="relative z-10 max-w-3xl space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-brand-orange font-bold text-[10px] uppercase tracking-[0.3em]"
            >
              <Compass className="h-4 w-4" />
              Intelligence Exploration
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl lg:text-7xl font-black tracking-tight leading-[0.9]"
            >
              Discover the next <br/>
              <span className="text-brand-orange italic underline decoration-white/10 underline-offset-8">BIG IDEA.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-lg font-medium text-white/60 leading-relaxed max-w-xl"
            >
              Vetted blueprints for high-impact projects. From AI-driven automation to secure financial infrastructure, find your next mission here.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 pt-4"
            >
               <button className="flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-xs font-black uppercase tracking-widest text-arctic-navy transition hover:bg-arctic-cyan active:scale-95">
                  Start Building
                  <ArrowRight className="h-4 w-4" />
               </button>
               <button className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-3.5 text-xs font-black uppercase tracking-widest text-white transition hover:bg-white/10 active:scale-95">
                  Learn More
               </button>
            </motion.div>
          </div>

           {/* Abstract Decorations */}
          <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-brand-orange/10 blur-[100px]" />
          <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-brand-orange/20 blur-[80px]" />
        </section>

         {/* Search & Filter Station */}
        <section className="sticky top-24 z-30 flex flex-col md:flex-row gap-6 items-center justify-between p-4 bg-white/70 backdrop-blur-xl border border-brand-border rounded-[2.5rem] shadow-xl shadow-brand-black/5">
          <div className="relative flex-1 w-full group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-grey group-focus-within:text-brand-orange transition-colors" />
            <input 
              type="text" 
              placeholder="Search by keyword, technology, or category..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-white border border-brand-border focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/5 rounded-2xl py-4 pl-14 pr-6 text-sm font-medium outline-none transition-all placeholder:text-brand-grey/40 text-brand-black"
            />
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide px-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={cn(
                  "px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                  activeFilter === cat 
                    ? "bg-brand-black text-white shadow-lg" 
                    : "bg-brand-offwhite text-brand-grey hover:text-brand-black hover:bg-white border border-brand-border"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Results Header */}
        <section className="flex items-end justify-between border-b border-arctic-border pb-8">
           <div className="space-y-1">
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-arctic-blue">
                 Sector Results
              </div>
              <h2 className="text-3xl font-black text-arctic-navy tracking-tight uppercase">
                 {loading ? "Analyzing..." : `${ideas.length} Blueprints`}
              </h2>
           </div>

           <div className="flex items-center gap-3">
              <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-brand-border text-brand-grey hover:text-brand-black hover:border-brand-orange transition-all">
                 <ArrowUpDown className="h-4 w-4" />
              </button>
              <div className="flex bg-brand-offwhite p-1 rounded-xl border border-brand-border">
                 <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-brand-black shadow-sm">
                    <LayoutGrid className="h-4 w-4" />
                 </button>
                 <button className="flex h-8 w-8 items-center justify-center rounded-lg text-brand-grey hover:text-brand-black">
                    <List className="h-4 w-4" />
                 </button>
              </div>
           </div>
        </section>

        {/* Main Ideas Grid */}
        <section className="pb-32">
          <AnimatePresence mode="popLayout">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-96 rounded-[2.5rem] bg-white border border-arctic-border animate-pulse" />
                ))}
              </div>
            ) : ideas.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {ideas.map((idea, index) => (
                  <motion.div
                    key={idea.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(index * 0.02, 0.15) }}
                  >
                    <IdeaCard 
                      title={idea.title}
                      description={idea.description}
                      category={idea.category}
                      tags={idea.tags}
                      type={categoryToType(idea.category)}
                    />
                  </motion.div>
                ))}
              </div>
             ) : (
              <div className="flex flex-col items-center justify-center py-40 text-center space-y-6">
                 <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-offwhite border border-brand-border text-brand-grey/20">
                    <Search className="h-10 w-10" />
                 </div>
                 <div className="space-y-2">
                    <h3 className="text-2xl font-black text-brand-black">No Blueprints Found</h3>
                    <p className="text-sm font-medium text-brand-grey max-w-xs">Try adjusting your search or filters to explore other intelligence sectors.</p>
                 </div>
                 <button 
                   onClick={() => { setQuery(''); setActiveFilter('All'); }}
                   className="rounded-xl bg-brand-black px-8 py-3 text-[10px] font-black uppercase tracking-widest text-white transition-all hover:bg-brand-orange active:scale-95"
                 >
                    Clear All Filters
                 </button>
              </div>
            )}
          </AnimatePresence>
        </section>
      </main>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
