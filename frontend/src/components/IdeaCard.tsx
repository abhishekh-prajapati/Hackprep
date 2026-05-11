import React from 'react';
import { ExternalLink, Cpu, Wallet, Shield, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface IdeaCardProps {
  title: string;
  description: string;
  category: string;
  tags: string[];
  type?: 'AI' | 'FINTECH' | 'SECURITY';
}

export function IdeaCard({ 
  title, 
  description, 
  category, 
  tags,
  type = 'AI'
}: IdeaCardProps) {
  const getIcon = () => {
    switch (type) {
      case 'FINTECH': return <Wallet className="h-3.5 w-3.5" />;
      case 'SECURITY': return <Shield className="h-3.5 w-3.5" />;
      default: return <Cpu className="h-3.5 w-3.5" />;
    }
  };

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[2.5rem] border border-brand-border bg-white transition-all hover:border-brand-orange/30 hover:shadow-2xl hover:shadow-brand-orange/5"
    >
      {/* Visual Header */}
      <div className="relative h-32 overflow-hidden bg-brand-offwhite/50 border-b border-brand-border/30">
         <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-end gap-1 h-12">
               {[0.4, 0.7, 0.5, 0.9, 0.6, 0.8, 0.5, 1, 0.7, 0.8, 0.4, 0.6].map((h, i) => (
                 <div 
                   key={i} 
                   className="w-1.5 rounded-full bg-brand-orange/10 transition-all group-hover:bg-brand-orange/20" 
                   style={{ height: `${h * 100}%` }}
                 />
               ))}
            </div>
         </div>
      </div>

      <div className="flex flex-1 flex-col p-8">
        <h3 className="mb-2 text-xl font-bold tracking-tight text-brand-black transition-colors group-hover:text-brand-orange">{title}</h3>
        <p className="mb-8 text-sm font-medium leading-relaxed text-brand-grey line-clamp-2">
          {description}
        </p>

        <div className="mt-auto space-y-6">
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 2).map((tag, i) => (
              <span key={i} className="rounded-lg bg-brand-offwhite px-2.5 py-1 text-[10px] font-bold text-brand-black border border-brand-border/50">
                {tag}
              </span>
            ))}
            {tags.length > 2 && <span className="text-[9px] font-bold text-brand-grey/40 pt-1.5">+{tags.length - 2} more</span>}
          </div>

          <div className="flex items-center justify-end border-t border-brand-border/50 pt-6">
             <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-orange transition hover:text-brand-black">
                Analyze
                <ArrowRight className="h-3.5 w-3.5" />
             </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
