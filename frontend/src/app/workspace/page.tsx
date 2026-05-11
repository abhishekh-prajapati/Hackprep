"use client";

import React, { useState } from 'react';
import useSWR from 'swr';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Folder, 
  Users, 
  Search,
  Zap,
  Lock,
  ChevronRight,
  Trash2,
  Circle,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { Avatar } from '@/components/Avatar';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface Project {
  id: string;
  title: string;
  description: string;
  inviteCode: string;
  memberIds: string[];
  ownerId: string;
  status: 'PENDING' | 'WORKING' | 'COMPLETED';
}

function SpaceListSkeleton() {
  return (
    <div className="animate-pulse space-y-12">
      <div className="flex justify-between items-end">
        <div className="space-y-4">
          <div className="h-12 w-64 bg-slate-200 rounded-xl" />
          <div className="h-4 w-96 bg-slate-200 rounded" />
        </div>
        <div className="flex gap-4">
          <div className="h-12 w-32 bg-slate-200 rounded-2xl" />
          <div className="h-12 w-32 bg-slate-200 rounded-2xl" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="h-64 bg-slate-100 rounded-[2.5rem]" />
        ))}
      </div>
    </div>
  );
}

const statusConfig = {
  PENDING: { label: 'Pending', icon: Circle, color: 'text-slate-400', dot: 'bg-slate-300' },
  WORKING: { label: 'Working', icon: Clock, color: 'text-brand-orange', dot: 'bg-brand-orange' },
  COMPLETED: { label: 'Completed', icon: CheckCircle2, color: 'text-green-600', dot: 'bg-green-500' },
};

export default function ProjectsPage() {
  const { user, token } = useAuth();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const { data: projects, error, isLoading, mutate } = useSWR<Project[]>(
    token ? '/api/projects' : null
  );

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title: newProjectTitle, description: '' }),
      });
      
      if (response.ok) {
        const newProject = await response.json();
        mutate(projects ? [...projects, newProject] : [newProject], false);
        setIsCreateModalOpen(false);
        setNewProjectTitle('');
      }
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  const handleJoinProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    try {
      const response = await fetch('/api/projects/join', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ inviteCode }),
      });
      if (response.ok) {
        const joinedProject = await response.json();
        mutate(projects ? [...projects, joinedProject] : [joinedProject], false);
        setIsJoinModalOpen(false);
        setInviteCode('');
      }
    } catch (error) {
      console.error('Failed to join project:', error);
    }
  };

  const handleDeleteProject = async (projectId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!confirm('Are you sure you want to delete this space?')) return;

    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        mutate(projects?.filter(p => p.id !== projectId), false);
      }
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };

  const filteredProjects = projects?.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  if (isLoading && !projects) {
    return (
      <div className="flex flex-col min-h-screen bg-brand-offwhite">
        <main className="mx-auto max-w-7xl px-8 py-12 lg:px-12 w-full pt-12">
           <SpaceListSkeleton />
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-brand-offwhite">
      <main className="mx-auto max-w-7xl px-8 py-12 lg:px-12 w-full space-y-12 pt-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-3">
            <h1 className="text-5xl font-black tracking-tight text-slate-900">
              My <span className="text-brand-orange">Spaces</span>
            </h1>
            <p className="text-slate-500 font-medium max-w-md">
              Create a new space for your project or join one with a code.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsJoinModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl border-2 border-slate-200 bg-white text-slate-600 font-bold text-sm transition-all hover:border-brand-orange/30 hover:text-brand-orange active:scale-95"
            >
              <Users size={18} />
              Join Space
            </button>
            <button 
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-slate-900 text-white font-bold text-sm shadow-xl shadow-slate-900/10 transition-all hover:bg-brand-orange hover:shadow-brand-orange/20 active:scale-95"
            >
              <Plus size={18} />
              New Space
            </button>
          </div>
        </div>

        {/* Search & Stats */}
        <div className="flex items-center gap-6 mb-12">
           <div className="relative flex-1 group">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-brand-orange transition-colors" />
             <input 
               type="text" 
               placeholder="Search spaces..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-6 text-sm font-medium focus:outline-none focus:border-brand-orange/40 focus:ring-4 focus:ring-brand-orange/5 transition-all"
             />
           </div>
           <div className="hidden lg:flex items-center gap-8 px-8 border-l border-slate-200">
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Spaces</span>
                <span className="text-xl font-bold text-slate-900">{projects?.length || 0}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Active Members</span>
                <span className="text-xl font-bold text-slate-900">
                  {Array.from(new Set(projects?.flatMap(p => p.memberIds || []))).length}
                </span>
              </div>
           </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => {
              const status = statusConfig[project.status || 'PENDING'];
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.02, 0.1) }}
                  className="group relative"
                >
                  <Link href={`/workspace/${project.id}`}>
                    <div className="relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-200 p-8 transition-all hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-1">
                      <div className="flex items-center justify-between mb-8">
                         <div className="h-14 w-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-900 transition-colors group-hover:bg-brand-orange group-hover:text-white">
                            <Folder size={24} />
                         </div>
                         
                         <div className="flex -space-x-2">
                            {(project as any).members?.slice(0, 3).map((member: any) => (
                              <Avatar 
                                key={member.id}
                                username={member.name}
                                src={member.profilePhoto}
                                size={32}
                                className="border-2 border-white shadow-sm"
                              />
                            ))}
                            {(project as any).members && (project as any).members.length > 3 && (
                              <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-50 flex items-center justify-center text-[10px] font-bold text-slate-400 z-10">
                                 +{(project as any).members.length - 3}
                              </div>
                            )}
                         </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold tracking-tight text-slate-900 group-hover:text-brand-orange transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm text-slate-500 font-medium line-clamp-1">
                          {project.description || 'Manage your project tasks here.'}
                        </p>
                      </div>

                      <div className="mt-8 pt-8 border-t border-slate-50 flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                               <Lock size={12} className="text-slate-300" />
                               {project.ownerId === user?.id ? 'ADMIN' : 'MEMBER'}
                            </div>
                            <div className="w-px h-3 bg-slate-200" />
                            {/* Status Indicator in Outer Container (Bottom Bar) */}
                            <div className={cn("flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest", status.color)}>
                               <div className={cn("w-1.5 h-1.5 rounded-full shadow-sm", status.dot)} />
                               {status.label}
                            </div>
                         </div>
                         
                         <div className="flex items-center gap-2">
                            {project.ownerId === user?.id && (
                              <button 
                                onClick={(e) => handleDeleteProject(project.id, e)}
                                className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all"
                              >
                                <Trash2 size={16} />
                              </button>
                            )}
                            <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-brand-orange/10 group-hover:text-brand-orange transition-all">
                               <ChevronRight size={18} />
                            </div>
                         </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {projects?.length === 0 && searchQuery === '' && (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-center space-y-6">
               <div className="h-20 w-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-300">
                  <Zap size={32} />
               </div>
               <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-slate-900">No Spaces Found</h2>
                  <p className="text-slate-500 max-w-sm font-medium">You haven't created any spaces yet. Create your first one to get started!</p>
               </div>
               <button 
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-brand-orange text-white px-8 py-3.5 rounded-2xl font-bold shadow-xl shadow-brand-orange/20 hover:scale-105 transition-transform"
               >
                 Create First Space
               </button>
            </div>
          )}
        </div>
      </main>

      {/* Create Project Modal */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCreateModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[2.5rem] p-10 shadow-2xl"
            >
              <h2 className="text-3xl font-black tracking-tight text-slate-900 mb-2">New Space</h2>
              <p className="text-slate-500 text-sm font-medium mb-8">Enter a name for your new workspace.</p>
              
              <form onSubmit={handleCreateProject} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Space Name</label>
                  <input 
                    autoFocus
                    required
                    type="text" 
                    value={newProjectTitle}
                    onChange={(e) => setNewProjectTitle(e.target.value)}
                    placeholder="e.g. hackprep"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 text-sm font-bold focus:outline-none focus:border-brand-orange/40 focus:bg-white focus:ring-4 focus:ring-brand-orange/5 transition-all"
                  />
                </div>
                <div className="pt-2 flex gap-4">
                   <button 
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="flex-1 py-4 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 transition-colors"
                   >
                     Cancel
                   </button>
                   <button 
                    type="submit"
                    className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-bold shadow-xl shadow-slate-900/10 hover:bg-brand-orange transition-all"
                   >
                     Create Space
                   </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Join Project Modal */}
      <AnimatePresence>
        {isJoinModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsJoinModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[2.5rem] p-10 shadow-2xl"
            >
              <h2 className="text-3xl font-black tracking-tight text-slate-900 mb-2">Join Project</h2>
              <p className="text-slate-500 text-sm font-medium mb-8">Enter the code to join a project.</p>
              
              <form onSubmit={handleJoinProject} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Project Code</label>
                  <input 
                    autoFocus
                    required
                    type="text" 
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                    placeholder="XXXXXX"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 text-center text-xl font-black tracking-[0.5em] text-brand-orange focus:outline-none focus:border-brand-orange/40 focus:bg-white focus:ring-4 focus:ring-brand-orange/5 transition-all"
                  />
                </div>
                <div className="pt-2 flex gap-4">
                   <button 
                    type="button"
                    onClick={() => setIsJoinModalOpen(false)}
                    className="flex-1 py-4 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 transition-colors"
                   >
                     Cancel
                   </button>
                   <button 
                    type="submit"
                    className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-bold shadow-xl shadow-slate-900/10 hover:bg-brand-orange transition-all"
                   >
                     Join Project
                   </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
