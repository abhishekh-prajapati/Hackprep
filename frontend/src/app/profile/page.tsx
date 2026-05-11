'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/Navbar';
import {
  User,
  GitBranch,
  Trophy,
  Zap,
  Check,
  X,
  Camera,
  Share2,
  Plus,
  LogOut,
  Globe,
  Settings,
  Mail,
  Award,
  FileText,
  Image as ImageIcon,
  ExternalLink,
  Trash2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Experience {
  id: string;
  name: string;
  description: string;
  proofUrl?: string;
}

export default function ProfilePage() {
  const { user, token, updateUser, logout } = useAuth();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const proofInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    profilePhoto: user?.profilePhoto || '',
    bio: user?.bio || '',
    githubId: user?.githubId || '',
    skills: user?.skills || ([] as string[]),
    totalEvents: user?.totalEvents || 0,
    wins: user?.wins || 0,
    projectsCompleted: user?.projectsCompleted || 0,
    experiences: (user as any)?.experiences || [] as Experience[],
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        email: user.email || '',
        profilePhoto: user.profilePhoto || '',
        bio: user.bio || '',
        githubId: user.githubId || '',
        skills: user.skills || [],
        totalEvents: user.totalEvents || 0,
        wins: user.wins || 0,
        projectsCompleted: user.projectsCompleted || 0,
        experiences: (user as any).experiences || [],
      });
    }
  }, [user]);

  const handleSave = async () => {
    setError('');
    
    // Required fields validation
    if (!form.name.trim()) return setError('Name is required');
    if (!form.bio.trim()) return setError('About Me is required');
    if (form.skills.length === 0) return setError('At least one technical skill is required');
    if (!form.githubId.trim()) return setError('GitHub username is required');

    setSaving(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
      const res = await fetch(`${apiUrl}/users/me/onboarding`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...form, isOnboardingCompleted: true }),
      });
      if (res.ok) {
        const updated = await res.json();
        updateUser(updated);
        setEditing(false);
      }
    } catch (err) { console.error(err); } finally { setSaving(false); }
  };

  const addSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const val = e.currentTarget.value.trim();
      if (val && !form.skills.includes(val)) {
        setForm({ ...form, skills: [...form.skills, val] });
        e.currentTarget.value = '';
      }
    }
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      description: '',
    };
    setForm({ ...form, experiences: [newExp, ...form.experiences] });
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setForm({
      ...form,
      experiences: form.experiences.map((exp: Experience) => exp.id === id ? { ...exp, [field]: value } : exp)
    });
  };

  const removeExperience = (id: string) => {
    setForm({
      ...form,
      experiences: form.experiences.filter((exp: Experience) => exp.id !== id)
    });
  };

  const handleProofUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateExperience(id, 'proofUrl', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-arctic-navy pb-20">
      <main className="mx-auto max-w-5xl px-6 pt-12">
        <div className="mb-10 flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
          <div className="flex items-center gap-4">
            {error && <span className="text-xs font-bold text-red-500">{error}</span>}
            <div className="flex gap-2">
              {editing ? (
                <button 
                  onClick={handleSave}
                  disabled={saving}
                  className="rounded-xl bg-arctic-blue px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-arctic-blue/20 transition hover:bg-arctic-navy active:scale-95 disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Profile'}
                </button>
              ) : (
                <button 
                  onClick={() => setEditing(true)}
                  className="rounded-xl bg-arctic-navy px-6 py-2.5 text-xs font-bold text-white shadow-lg transition hover:bg-arctic-blue active:scale-95"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-10">
          {/* Basic Info */}
          <section className="rounded-3xl border border-arctic-border bg-white p-8 shadow-sm">
            <div className="flex flex-col md:flex-row gap-10">
              <div className="relative shrink-0 mx-auto md:mx-0">
                <div className="h-32 w-32 overflow-hidden rounded-[2rem] border-4 border-arctic-canvas bg-white shadow-xl ring-1 ring-arctic-border">
                  {form.profilePhoto ? (
                    <img src={form.profilePhoto} alt="Profile" className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-arctic-grey/20">
                      <User className="h-12 w-12" />
                    </div>
                  )}
                </div>
                {editing && (
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-xl bg-arctic-blue text-white shadow-lg transition hover:scale-110"
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                )}
                <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => setForm({...form, profilePhoto: reader.result as string});
                    reader.readAsDataURL(file);
                  }
                }} />
              </div>

              <div className="flex-1 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-arctic-grey">Name {editing && <span className="text-red-500">*</span>}</label>
                    {editing ? (
                      <input 
                        value={form.name} 
                        onChange={e => setForm({...form, name: e.target.value})} 
                        className="w-full rounded-xl border border-arctic-border bg-[#F8F9FC] px-4 py-3 text-sm outline-none focus:border-arctic-blue"
                      />
                    ) : (
                      <p className="text-lg font-bold">{form.name}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-arctic-grey">Email</label>
                    <p className="text-sm font-medium text-arctic-grey">{form.email}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-arctic-grey">About Me {editing && <span className="text-red-500">*</span>}</label>
                  {editing ? (
                    <textarea 
                      value={form.bio} 
                      onChange={e => setForm({...form, bio: e.target.value})} 
                      rows={3}
                      className="w-full rounded-xl border border-arctic-border bg-[#F8F9FC] px-4 py-3 text-sm outline-none focus:border-arctic-blue resize-none"
                    />
                  ) : (
                    <p className="text-sm font-medium leading-relaxed text-arctic-grey">{form.bio || "No bio yet."}</p>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Experience & Achievements */}
          <section className="rounded-3xl border border-arctic-border bg-white p-8 shadow-sm space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Trophy className="h-5 w-5 text-arctic-blue" />
                <h3 className="font-bold">Experience & Proof</h3>
              </div>
              {editing && (
                <button 
                  onClick={addExperience}
                  className="flex items-center gap-2 rounded-lg bg-arctic-navy px-4 py-2 text-[10px] font-black text-white uppercase tracking-widest shadow-lg hover:bg-arctic-blue transition-colors"
                >
                  <Plus className="h-4 w-4" /> Add Experience
                </button>
              )}
            </div>

            <div className="space-y-6">
              {form.experiences.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                  {form.experiences.map((exp: Experience) => (
                    <div key={exp.id} className="group relative rounded-2xl border border-arctic-border bg-arctic-canvas/30 p-6 transition-all hover:border-arctic-blue/30 hover:bg-white hover:shadow-xl hover:shadow-arctic-navy/5">
                      {editing ? (
                        <div className="space-y-4">
                          <div className="flex justify-between gap-4">
                            <input 
                              placeholder="Experience Name (e.g. HackMumbai 2024)"
                              value={exp.name}
                              onChange={e => updateExperience(exp.id, 'name', e.target.value)}
                              className="flex-1 bg-transparent text-sm font-bold outline-none border-b border-arctic-border/50 focus:border-arctic-blue pb-1"
                            />
                            <button onClick={() => removeExperience(exp.id)} className="text-arctic-grey hover:text-red-500 transition-colors">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <textarea 
                            placeholder="Brief description of your role or project..."
                            value={exp.description}
                            onChange={e => updateExperience(exp.id, 'description', e.target.value)}
                            rows={2}
                            className="w-full bg-transparent text-xs font-medium outline-none border-b border-arctic-border/50 focus:border-arctic-blue pb-1 resize-none"
                          />
                          <div className="flex items-center gap-4">
                             <button 
                               onClick={() => {
                                 const input = document.createElement('input');
                                 input.type = 'file';
                                 input.accept = 'image/*,application/pdf';
                                 input.onchange = (e) => handleProofUpload(exp.id, e as any);
                                 input.click();
                               }}
                               className="flex items-center gap-2 text-[10px] font-bold text-arctic-blue hover:underline"
                             >
                               <FileText className="h-3.5 w-3.5" /> 
                               {exp.proofUrl ? 'Update Certificate' : 'Upload Certificate / Proof'}
                             </button>
                             {exp.proofUrl && <span className="text-[10px] font-bold text-green-500 flex items-center gap-1"><Check className="h-3 w-3" /> Attached</span>}
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start justify-between gap-6">
                          <div className="flex-1 space-y-2">
                             <h4 className="text-sm font-bold text-arctic-navy uppercase tracking-tight">{exp.name || "Untitled Experience"}</h4>
                             <p className="text-xs text-arctic-grey font-medium leading-relaxed">{exp.description || "No description provided."}</p>
                             {exp.proofUrl && (
                               <a 
                                 href={exp.proofUrl} 
                                 target="_blank" 
                                 rel="noopener noreferrer"
                                 className="inline-flex items-center gap-2 mt-4 text-[10px] font-black text-arctic-blue uppercase tracking-widest hover:underline"
                               >
                                 <Award className="h-3.5 w-3.5" /> View Certificate Proof
                               </a>
                             )}
                          </div>
                          <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-white border border-arctic-border text-arctic-navy group-hover:text-arctic-blue transition-colors">
                             <FileText className="h-6 w-6" />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 rounded-2xl border-2 border-dashed border-arctic-border bg-arctic-canvas/20">
                  <Award className="h-12 w-12 text-arctic-grey/20" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-arctic-grey/40">No hackathon certificates or proof added yet.</p>
                </div>
              )}
            </div>
          </section>

          {/* Skills & Connections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-3xl border border-arctic-border bg-white p-8 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <Zap className="h-5 w-5 text-arctic-blue" />
                <h3 className="font-bold">Technical Skills {editing && <span className="text-[10px] text-red-500 uppercase tracking-widest">(Required)</span>}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {form.skills.map(skill => (
                  <div key={skill} className="flex items-center gap-2 rounded-lg bg-arctic-canvas px-3 py-1.5 text-xs font-bold text-arctic-navy">
                    {skill}
                    {editing && <button onClick={() => setForm({...form, skills: form.skills.filter(s => s !== skill)})} className="hover:text-red-500"><X className="h-3 w-3" /></button>}
                  </div>
                ))}
                {editing && (
                  <input 
                    placeholder="Type skill & press Enter"
                    onKeyDown={addSkill}
                    className="flex-1 min-w-[150px] border-b border-arctic-border text-xs py-1.5 outline-none focus:border-arctic-blue"
                  />
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-arctic-border bg-white p-8 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <GitBranch className="h-5 w-5 text-arctic-blue" />
                <h3 className="font-bold">Digital Connections</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-arctic-canvas/50 border border-arctic-border">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm"><Globe className="h-4 w-4" /></div>
                    <span className="text-sm font-bold">GitHub {editing && <span className="text-[10px] text-red-500 uppercase tracking-widest">*</span>}</span>
                  </div>
                  {editing ? (
                    <input 
                      value={form.githubId} 
                      onChange={e => setForm({...form, githubId: e.target.value})} 
                      placeholder="Username"
                      className="w-32 bg-transparent text-right text-sm font-bold outline-none border-b border-arctic-border focus:border-arctic-blue"
                    />
                  ) : (
                    <span className="text-sm font-medium text-arctic-blue">@{form.githubId || 'not linked'}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div className="rounded-3xl border border-arctic-border bg-white p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <Settings className="h-5 w-5 text-arctic-blue" />
              <h3 className="font-bold">Account Options</h3>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-arctic-grey font-medium">Platform Session</p>
              <button onClick={logout} className="flex items-center gap-2 text-xs font-bold text-red-500 hover:underline">
                <LogOut className="h-4 w-4" />
                Logout from System
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
