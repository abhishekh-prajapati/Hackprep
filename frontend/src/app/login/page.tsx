'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Command, Sparkles, Shield, Zap, Globe, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();

  const handleGoogleLogin = () => {
    // Using the proxied path is cleaner and ensures cookie/session headers are handled by the same origin
    window.location.href = '/api/auth/google';
  };

  return (
    <div className="flex min-h-screen bg-white font-sans text-brand-black">
      {/* Left Pane: Visual & Value Prop */}
      <div className="relative hidden w-1/2 flex-col justify-between bg-brand-black p-16 lg:flex">
        <div className="relative z-10">
          <div className="flex items-center gap-3">
             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-brand-orange">
                <Command className="h-6 w-6" />
             </div>
             <span className="text-sm font-black tracking-tighter text-white uppercase">HACKPREP</span>
          </div>
        </div>

        <div className="relative z-10 space-y-12">
          <div className="space-y-4">
             <h2 className="text-6xl font-black tracking-tight text-white leading-[0.9]">
                BUILD THE <br/>FUTURE OF <br/>
                <span className="text-brand-orange italic underline decoration-white/20 underline-offset-8">INTELLIGENCE.</span>
             </h2>
             <p className="max-w-md text-lg font-medium text-white/60 leading-relaxed pt-4">
                Join 5,000+ engineers building the next generation of AI, FinTech, and Secure Infrastructure.
             </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
             {[
               { icon: Sparkles, label: 'AI Powered', sub: 'Project Analysis' },
               { icon: Shield, label: 'Secure', sub: 'Team Matching' },
               { icon: Globe, label: 'Global', sub: 'Network' },
               { icon: Zap, label: 'Rapid', sub: 'Prototyping' },
             ].map((feature, i) => (
               <div key={i} className="flex items-center gap-4 group">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-arctic-cyan transition-colors group-hover:bg-arctic-cyan group-hover:text-arctic-navy">
                     <feature.icon className="h-5 w-5" />
                  </div>
                  <div>
                     <div className="text-[10px] font-black uppercase tracking-widest text-white">{feature.label}</div>
                     <div className="text-[9px] font-bold uppercase tracking-widest text-white/40">{feature.sub}</div>
                  </div>
               </div>
             ))}
          </div>
        </div>

        {/* Decorative Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(6,182,212,0.1)_0%,transparent_50%)]" />
        <div className="absolute bottom-0 right-0 h-64 w-64 bg-arctic-blue/20 blur-[120px]" />
      </div>

      {/* Right Pane: Login Form */}
      <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-sm space-y-12"
        >
          <div className="space-y-3">
             <div className="flex items-center gap-2 text-arctic-blue font-bold text-[10px] uppercase tracking-[0.3em]">
                Authentication Required
             </div>
             <h1 className="text-4xl font-black tracking-tight text-arctic-navy">Welcome back.</h1>
             <p className="text-sm font-medium text-arctic-grey leading-relaxed">
                Enter your credentials to access your mission control dashboard and continue building.
             </p>
          </div>

          <div className="space-y-4">
             <button
               onClick={handleGoogleLogin}
               className="group flex w-full items-center justify-between rounded-2xl border border-arctic-border bg-white px-6 py-4 transition-all hover:border-arctic-blue hover:shadow-xl hover:shadow-arctic-blue/5 active:scale-[0.98]"
             >
               <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-arctic-canvas group-hover:bg-arctic-blue/5 transition-colors">
                     <svg className="h-5 w-5" viewBox="0 0 24 24">
                       <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                       <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                       <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                       <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                     </svg>
                  </div>
                  <span className="text-sm font-bold text-arctic-navy">Sign in with Google</span>
               </div>
               <ArrowRight className="h-4 w-4 text-arctic-grey group-hover:text-arctic-blue transition-colors" />
             </button>

             <div className="flex items-center gap-4 py-4">
                <div className="h-px flex-1 bg-arctic-border/50" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-arctic-grey/40">Secured via OAuth 2.0</span>
                <div className="h-px flex-1 bg-arctic-border/50" />
             </div>

             <button className="flex w-full items-center justify-center rounded-2xl bg-arctic-canvas px-6 py-4 text-xs font-bold text-arctic-grey opacity-50 cursor-not-allowed uppercase tracking-widest">
                Use Enterprise Key
             </button>
          </div>

          <div className="pt-12 text-center">
             <p className="text-[10px] font-bold uppercase tracking-widest text-arctic-grey/40">
                Authorized access only. By continuing, you agree to our <br/>
                <span className="text-arctic-navy hover:underline cursor-pointer">Security Policy</span> and <span className="text-arctic-navy hover:underline cursor-pointer">Terms of Engagement</span>.
             </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
