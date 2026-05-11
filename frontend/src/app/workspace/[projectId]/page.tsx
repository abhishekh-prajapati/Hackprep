'use client';

import React, { useState, useEffect, use } from 'react';
import useSWR, { mutate } from 'swr';
import { Task } from '@/types';
import { TaskBoard } from '@/components/TaskBoard';
import { Avatar } from '@/components/Avatar';
import { 
  Plus,
  Share2,
  Lock,
  Copy,
  Check,
  ChevronLeft,
  Zap,
  ChevronDown,
  Circle,
  Clock,
  CheckCircle2,
  Settings2
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import styles from '../page.module.css';
import { cn } from '@/lib/utils';

interface Project {
  id: string;
  title: string;
  inviteCode: string;
  members: any[];
  status: 'PENDING' | 'WORKING' | 'COMPLETED';
  ownerId: string;
}

function WorkspaceSkeleton() {
  return (
    <div className="animate-pulse space-y-8">
      <div className="flex justify-between items-end">
        <div className="space-y-4">
          <div className="h-4 w-24 bg-slate-200 rounded" />
          <div className="h-10 w-64 bg-slate-200 rounded-xl" />
        </div>
        <div className="flex gap-4">
          <div className="h-12 w-24 bg-slate-200 rounded-xl" />
          <div className="h-12 w-32 bg-slate-200 rounded-xl" />
        </div>
      </div>
      <div className="grid grid-cols-5 gap-4">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="h-[60vh] bg-slate-100 rounded-[2rem]" />
        ))}
      </div>
    </div>
  );
}

const statusOptions = [
  { id: 'PENDING', label: 'Pending', icon: Circle, color: 'text-slate-400', bg: 'bg-slate-100', border: 'border-slate-200' },
  { id: 'WORKING', label: 'Working', icon: Clock, color: 'text-brand-orange', bg: 'bg-brand-orange/10', border: 'border-brand-orange/20' },
  { id: 'COMPLETED', label: 'Completed', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-100', border: 'border-green-200' },
];

export default function ProjectWorkspacePage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = use(params);
  const { user, token } = useAuth();
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const { data: project, error: projectError } = useSWR<Project>(
    token ? `/api/projects/${projectId}` : null
  );
  
  const { data: tasks, error: tasksError } = useSWR<Task[]>(
    token ? `/api/tasks?projectId=${projectId}` : null
  );

  const isLoading = !project && !projectError;
  const [localTasks, setLocalTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (tasks) setLocalTasks(tasks);
  }, [tasks]);

  const handleUpdateStatus = async (status: string) => {
    if (!token || !project || project.ownerId !== user?.id) return;
    
    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        mutate(`/api/projects/${projectId}`);
        mutate('/api/projects');
        setIsStatusOpen(false);
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const copyInviteCode = () => {
    if (project) {
      navigator.clipboard.writeText(project.inviteCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const currentStatus = statusOptions.find(s => s.id === project?.status) || statusOptions[0];

  if (projectError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <p className="text-slate-500 font-medium">Failed to load workspace. It might have been deleted or moved.</p>
        <Link href="/workspace" className="text-brand-orange font-bold hover:underline">Back to Spaces</Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>
        <div className={styles.dashboardArea}>
          {isLoading ? (
            <WorkspaceSkeleton />
          ) : (
            <>
              <div className={styles.dashboardHeader}>
                <div className="flex flex-col gap-2">
                  <Link href="/workspace" className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-brand-orange transition-colors mb-2">
                     <ChevronLeft size={12} />
                     Back to Spaces
                  </Link>
                  <div className="flex items-center gap-4">
                    <h1 className="text-4xl font-black text-brand-black tracking-tight">
                      {project?.title}
                    </h1>
                    
                    {/* Minimal Status Dropdown */}
                    <div className="relative">
                      <button 
                        onClick={() => project?.ownerId === user?.id && setIsStatusOpen(!isStatusOpen)}
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all active:scale-90",
                          currentStatus.bg,
                          currentStatus.border,
                          project?.ownerId === user?.id ? "hover:shadow-lg hover:shadow-slate-200/50 cursor-pointer" : "cursor-default"
                        )}
                        title={`Status: ${currentStatus.label}`}
                      >
                        <currentStatus.icon size={18} className={currentStatus.color} />
                      </button>

                      {isStatusOpen && (
                        <div className="absolute top-full left-0 mt-3 w-56 bg-white rounded-[1.5rem] shadow-2xl border border-slate-100 p-2 z-[100] animate-in fade-in zoom-in duration-200">
                          <div className="px-4 py-2 mb-1">
                             <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Project Status</span>
                          </div>
                          {statusOptions.map((option) => (
                            <button
                              key={option.id}
                              onClick={() => handleUpdateStatus(option.id)}
                              className={cn(
                                "w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                                project?.status === option.id 
                                  ? "bg-slate-900 text-white shadow-lg shadow-slate-900/10" 
                                  : "text-slate-500 hover:bg-slate-50 hover:text-brand-black"
                              )}
                            >
                              <option.icon size={16} className={project?.status === option.id ? "text-white" : option.color} />
                              {option.label}
                              {project?.status === option.id && <Check size={14} className="ml-auto text-white" />}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200">
                       <Lock size={12} className="text-slate-400" />
                       <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Private</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                   <div className="flex flex-col items-end gap-2">
                      <div className="flex -space-x-3">
                         {project?.members?.slice(0, 4).map((member: any) => (
                           <Avatar 
                             key={member.id}
                             username={member.name} 
                             src={member.profilePhoto} 
                             size={40} 
                             className="border-[3px] border-white shadow-sm"
                           />
                         ))}
                         {project?.members && project.members.length > 4 && (
                           <div className="w-10 h-10 rounded-full bg-slate-50 border-[3px] border-white flex items-center justify-center text-[10px] font-black text-slate-400 shadow-sm z-10">
                              +{project.members.length - 4}
                           </div>
                         )}
                      </div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                        {project?.members && project.members.length > 0 ? (
                          project.members.length === 1 ? project.members[0].name.split(' ')[0] :
                          project.members.length === 2 ? `${project.members[0].name.split(' ')[0]} & ${project.members[1].name.split(' ')[0]}` :
                          `${project.members[0].name.split(' ')[0]}, ${project.members[1].name.split(' ')[0]} & ${project.members.length - 2} OTHER${project.members.length - 2 > 1 ? 'S' : ''}`
                        ) : 'ACTIVE MEMBERS'}
                      </span>
                   </div>
                   
                   <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setIsInviteOpen(!isInviteOpen)}
                        className="flex items-center gap-2 px-5 py-3.5 rounded-xl border-2 border-slate-200 bg-white text-slate-600 font-bold text-sm transition-all hover:border-brand-orange/30 hover:text-brand-orange active:scale-95"
                      >
                        <Share2 size={18} />
                        <span>Invite</span>
                      </button>
                      <button 
                        onClick={() => {
                          const addBtn = document.querySelector('[class*="taskList"] + div button') as HTMLButtonElement;
                          if (addBtn) addBtn.click();
                        }}
                        className="flex items-center gap-3 bg-brand-black text-white px-6 py-3.5 rounded-xl font-bold text-sm shadow-xl shadow-black/10 hover:bg-brand-orange hover:shadow-brand-orange/20 transition-all active:scale-95"
                      >
                        <Plus size={18} />
                        <span>Add New Task</span>
                      </button>
                   </div>
                </div>
              </div>

              {isInviteOpen && (
                <div className="overflow-hidden mb-8 animate-in slide-in-from-top-4 duration-300">
                  <div className="bg-white border border-slate-200 rounded-[2rem] p-8 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl shadow-slate-200/20">
                     <div className="space-y-2 text-center md:text-left">
                        <h3 className="text-xl font-bold text-slate-900">Invite Members</h3>
                        <p className="text-sm text-slate-500 font-medium">Share this code to let others join your project.</p>
                     </div>
                     <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="flex-1 md:w-48 h-14 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center text-xl font-black tracking-[0.5em] text-brand-orange">
                           {project?.inviteCode}
                        </div>
                        <button 
                          onClick={copyInviteCode}
                          className="h-14 w-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center transition-all hover:bg-brand-orange active:scale-95"
                        >
                          {copied ? <Check size={20} /> : <Copy size={20} />}
                        </button>
                     </div>
                  </div>
                </div>
              )}

              <div className={styles.boardWrapper}>
                <TaskBoard 
                  userProfile={user || { name: 'User', avatar: '' }} 
                  tasks={localTasks} 
                  setTasks={setLocalTasks} 
                  projectId={projectId}
                  members={project?.members || []}
                />
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
