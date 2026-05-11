"use client";

import React from 'react';
import useSWR from 'swr';
import { IdeaCard } from '@/components/IdeaCard';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Sparkles, 
  ChevronRight, 
  Rocket, 
  Activity,
  ArrowUpRight,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface Project {
  id: string;
  title: string;
  description: string;
  ownerId: string;
}

interface Task {
  id: string;
  projectId: string;
  columnId: string;
}

const quickActions = [
  { icon: Sparkles, label: "Idea Analysis", sub: "Market research" },
  { icon: Sparkles, label: "Code Pilot", sub: "Generate components" },
  { icon: Sparkles, label: "Pitch Deck", sub: "AI slide maker" },
  { icon: Sparkles, label: "Team Scout", sub: "Find contributors" },
];

function DashboardSkeleton() {
  return (
    <div className="animate-pulse space-y-12">
      <div className="flex justify-between items-end">
        <div className="space-y-4">
          <div className="h-10 w-64 bg-slate-200 rounded-xl" />
          <div className="h-4 w-96 bg-slate-200 rounded" />
        </div>
        <div className="h-12 w-48 bg-slate-200 rounded-xl" />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-32 bg-slate-100 rounded-2xl" />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-8">
        {[1, 2].map(i => (
          <div key={i} className="h-64 bg-slate-100 rounded-[2rem]" />
        ))}
      </div>
    </div>
  );
}

export default function MissionControlDashboard() {
  const { user, token } = useAuth();
  
  const { data: projects, error: projectsError, isLoading: projectsLoading, mutate } = useSWR<Project[]>(
    token ? '/api/projects' : null
  );

  const latestProject = projects?.[0];
  
  const { data: tasks } = useSWR<Task[]>(
    token && latestProject ? `/api/tasks?projectId=${latestProject.id}` : null
  );

  const firstName = user?.name ? user.name.split(' ')[0] : 'Builder';
  const pendingTasks = tasks?.filter(t => t.columnId !== 'completed').length || 0;

  if (projectsLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-brand-offwhite text-brand-black">
        <main className="mx-auto max-w-7xl px-8 py-12 lg:px-12 w-full pt-12">
           <DashboardSkeleton />
        </main>
      </div>
    );
  }

  if (projectsError || (!projects && !projectsLoading && token)) {
    return (
      <div className="flex flex-col min-h-screen bg-brand-offwhite text-brand-black">
        <main className="mx-auto max-w-7xl px-8 py-12 lg:px-12 w-full pt-12 flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
          <div className="h-20 w-20 rounded-full bg-red-50 flex items-center justify-center text-red-500">
             <AlertCircle size={40} />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-black text-brand-black">Connection Error</h1>
            <p className="text-brand-grey max-w-md font-medium">
              We're having trouble reaching the database. Please check if your Supabase project is paused or check your internet connection.
            </p>
          </div>
          <button 
            onClick={() => mutate()}
            className="flex items-center gap-2 bg-brand-black text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-brand-orange transition-all active:scale-95"
          >
            <RefreshCw size={18} />
            Try Again
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-brand-offwhite text-brand-black">
      <main className="mx-auto max-w-7xl px-8 py-12 lg:px-12 w-full space-y-12 pt-12">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-brand-black tracking-tight">
              Hello, <span className="text-brand-orange">{firstName}</span>.
            </h1>
            <p className="text-sm text-brand-grey max-w-xl font-medium">
              {projects && projects.length > 0 ? (
                <>Your space <span className="text-brand-black font-bold">{latestProject?.title}</span> is active. You have <span className="text-brand-orange font-bold">{pendingTasks}</span> pending tasks.</>
              ) : (
                <>Welcome to HackPrep. Create your first space to start building your ideas.</>
              )}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="bg-white border border-brand-border rounded-xl px-5 py-3 flex items-center gap-4 shadow-sm">
                <div className="flex flex-col">
                <span className="text-xs font-bold text-brand-black flex items-center gap-2">
                     <Activity className="w-3.5 h-3.5 text-brand-orange" />
                     {projects?.length || 0} Active Spaces
                   </span>
                </div>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-10">
          
          {/* Main Dashboard Area */}
          <div className="col-span-12 lg:col-span-8 space-y-12">
            
            {/* Quick Actions Grid */}
            <section className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickActions.map((action, i) => (
                  <button key={i} className="group relative overflow-hidden bg-white border border-brand-border rounded-2xl p-6 text-left transition-all hover:border-brand-orange hover:shadow-xl hover:shadow-brand-orange/5">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-offwhite text-brand-black group-hover:bg-brand-orange group-hover:text-white transition-colors">
                       <action.icon className="h-5 w-5" />
                    </div>
                    <div className="text-xs font-bold text-brand-black">{action.label}</div>
                    <div className="mt-1 text-[9px] font-bold text-brand-grey uppercase tracking-widest">{action.sub}</div>
                  </button>
                ))}
              </div>
            </section>

            {/* Active Projects Section */}
            <section className="space-y-6">
              <div className="flex justify-between items-center px-1">
                <h2 className="text-sm font-black uppercase tracking-widest text-slate-400">Your Spaces</h2>
                <Link href="/workspace" className="text-[10px] font-bold text-brand-orange uppercase tracking-widest flex items-center gap-1 hover:underline">
                  View All <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
              
              {projects && projects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projects.slice(0, 2).map((project) => (
                    <Link href={`/workspace/${project.id}`} key={project.id}>
                      <div className="group relative bg-white border border-brand-border rounded-[2rem] p-8 transition-all hover:shadow-2xl hover:shadow-brand-black/5 hover:-translate-y-1 h-full flex flex-col">
                        <div className="flex justify-between items-start mb-6">
                          <div className="space-y-1">
                             <span className="text-[9px] font-bold text-brand-orange uppercase tracking-widest">Active Space</span>
                             <h3 className="text-xl font-bold text-brand-black tracking-tight">{project.title}</h3>
                          </div>
                          <div className="rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest border bg-green-50 text-green-600 border-green-100">
                            Live
                          </div>
                        </div>

                        <p className="text-sm text-brand-grey font-medium line-clamp-2 mb-8 flex-1">
                          {project.description || 'Continue working on your hackathon project architecture and tasks.'}
                        </p>

                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-brand-offwhite">
                          <span className="text-[10px] font-black text-brand-grey uppercase tracking-widest">Go to Workspace</span>
                          <div className="h-8 w-8 rounded-full bg-brand-offwhite flex items-center justify-center text-brand-grey group-hover:bg-brand-orange group-hover:text-white transition-all">
                             <ChevronRight className="h-4 w-4" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="bg-white border-2 border-dashed border-brand-border rounded-[2.5rem] p-12 text-center space-y-4">
                   <div className="text-slate-300 flex justify-center"><Rocket size={40} /></div>
                   <p className="text-brand-grey font-medium">You don't have any active spaces yet.</p>
                   <Link href="/workspace" className="inline-block bg-brand-black text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-brand-orange transition-all">
                     Create Space
                   </Link>
                </div>
              )}
            </section>

            {/* Recommendations Section */}
            <section className="space-y-6">
               <h2 className="text-sm font-black uppercase tracking-widest text-slate-400">Featured Ideas</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <IdeaCard 
                    title="NeuralScribe Pro" 
                    description="An AI tool that writes technical documents for you." 
                    type="AI"
                    category="AI"
                    tags={["AI", "SaaS"]}
                  />
                  <IdeaCard 
                    title="LedgerFlow" 
                    description="Automated auditing for payments using smart contracts." 
                    type="FINTECH"
                    category="FinTech"
                    tags={["Solidity", "Next.js"]}
                  />
                  <IdeaCard 
                    title="ShieldGate" 
                    description="A security layer for small backend services." 
                    type="SECURITY"
                    category="Security"
                    tags={["Auth", "B2B"]}
                  />
               </div>
            </section>
          </div>

          {/* Right Sidebar Sidebar */}
          <aside className="col-span-12 lg:col-span-4 space-y-8">
            
            {/* AI Advisor Card */}
             <div className="relative overflow-hidden rounded-[2.5rem] bg-brand-black p-10 text-white shadow-2xl shadow-brand-orange/20">
              <div className="relative z-10 space-y-6">
                <p className="text-lg font-bold leading-tight">
                  "{firstName}, based on your activity, we recommend finishing the <span className="text-brand-orange">Architecture</span> of your latest space."
                </p>
                <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 py-3.5 text-xs font-bold text-white border border-white/20 transition hover:bg-brand-orange hover:text-brand-black uppercase tracking-widest">
                  View Insights
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-orange/10 blur-[80px]" />
            </div>

            {/* Platform Deadlines */}
             <div className="rounded-[2.5rem] border border-brand-border bg-white p-8 shadow-sm">
              <div className="space-y-6">
                {[
                  { label: "Team Lock", time: "2h 45m", urgent: true },
                  { label: "MVP Demo Day", time: "1d 12h", urgent: false },
                  { label: "Final Submission", time: "2d 0h", urgent: false },
                ].map((dl, i) => (
                  <div key={i} className="flex items-center gap-4 group cursor-pointer">
                    <div className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      dl.urgent ? "bg-brand-orange shadow-[0_0_8px_rgba(255,107,0,0.4)]" : "bg-brand-black"
                    )} />
                    <div className="flex-1">
                      <div className="text-xs font-bold text-brand-black group-hover:text-brand-orange transition-colors">{dl.label}</div>
                      <div className="mt-0.5 text-[9px] font-bold text-brand-grey uppercase tracking-widest">{dl.time} remaining</div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-8 flex w-full items-center justify-center rounded-xl border border-brand-border py-3 text-[10px] font-black uppercase tracking-widest text-brand-grey transition hover:bg-brand-offwhite hover:text-brand-black">
                Full Schedule
              </button>
            </div>

            {/* Promotion Card */}
            <div className="relative overflow-hidden rounded-[2.5rem] bg-arctic-cyan p-8 text-arctic-navy group cursor-pointer shadow-lg shadow-arctic-cyan/10">
               <div className="relative z-10 space-y-4">
                  <h4 className="text-3xl font-black leading-[0.8] tracking-tighter">PITCH <br/>READY?</h4>
                  <button className="rounded-lg bg-arctic-navy px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white transition-transform group-hover:scale-105">
                    Build Deck
                  </button>
               </div>
               <Rocket className="absolute -bottom-4 -right-4 h-24 w-24 text-arctic-navy/10 -rotate-12 transition-transform group-hover:scale-110" />
            </div>

          </aside>
        </div>
      </main>
    </div>
  );
}
