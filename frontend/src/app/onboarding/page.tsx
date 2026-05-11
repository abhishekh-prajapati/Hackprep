'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import {
  ChevronRight,
  ChevronLeft,
  Check,
  GitBranch,
  User,
  FileText,
  Zap,
  Trophy,
  Camera,
  ArrowRight,
  Sparkles,
  Globe,
  Award,
  ExternalLink,
  MapPin,
  Calendar,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// --- Steps Config -------------------------------------------------------------
const STEPS = [
  { id: 'basics',     label: 'Identity',    icon: User,      headline: "Who are you?",      sub: 'This is how you will be recognized in the community.' },
  { id: 'bio',        label: 'About',       icon: FileText,  headline: 'Your Narrative.',    sub: 'Briefly explain your journey and what drives you.' },
  { id: 'skills',     label: 'Expertise',   icon: Zap,       headline: 'Your Stack.',       sub: 'Select the technologies you have mastered.' },
  { id: 'stats',      label: 'Impact',      icon: Trophy,    headline: 'Your Records.',     sub: 'Quantify your contributions to the ecosystem.' },
  { id: 'experience', label: 'Experience',  icon: Award,     headline: 'Your Proof.',       sub: 'Add hackathon certificates and experiences.' },
  { id: 'avatar',     label: 'Profile',     icon: Camera,    headline: 'The Visuals.',      sub: 'A professional image builds trust with teams.' },
  { id: 'github',     label: 'Connect',     icon: GitBranch, headline: 'Engineering.',      sub: 'Link your workspace to verify your skills.' },
];

const SUGGESTED_SKILLS = [
  'React', 'Next.js', 'TypeScript', 'Python', 'Node.js',
  'Rust', 'Go', 'Solidity', 'Figma', 'FastAPI',
  'PostgreSQL', 'Docker', 'AWS', 'Firebase',
];

const GENDERS = ['Male', 'Female', 'Non-binary', 'Secret'];

// --- Reusable Components ------------------------------------------------------
const Input = ({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className="w-full rounded-2xl border border-arctic-border bg-arctic-canvas/50 px-5 py-4 text-sm font-medium text-arctic-navy placeholder-arctic-grey/30 outline-none transition-all focus:border-arctic-blue focus:bg-white focus:ring-4 focus:ring-arctic-blue/5"
  />
);

const TextArea = ({ ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea
    {...props}
    className="w-full rounded-2xl border border-arctic-border bg-arctic-canvas/50 px-5 py-4 text-sm font-medium text-arctic-navy placeholder-arctic-grey/30 outline-none transition-all focus:border-arctic-blue focus:bg-white focus:ring-4 focus:ring-arctic-blue/5 resize-none"
  />
);

export default function OnboardingPage() {
  const router = useRouter();
  const { user, token, updateUser } = useAuth();

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [direction, setDirection] = useState(1);

  // Form state
  const [name, setName] = useState(user?.name || '');
  const [gender, setGender] = useState('');
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [totalEvents, setTotalEvents] = useState(0);
  const [wins, setWins] = useState(0);
  const [projectsCompleted, setProjectsCompleted] = useState(0);
  const [profilePhoto, setProfilePhoto] = useState(user?.profilePhoto || '');
  const [githubId, setGithubId] = useState('');
  const [experiences, setExperiences] = useState<any[]>(user?.experiences || []);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const addExperience = () => {
    setExperiences([{ id: Math.random().toString(36).substr(2, 9), name: '', description: '' }, ...experiences]);
  };

  const updateExperience = (id: string, field: string, value: string) => {
    setExperiences(experiences.map(exp => exp.id === id ? { ...exp, [field]: value } : exp));
  };

  const handleProofUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => updateExperience(id, 'proofUrl', reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const goNext = () => {
    if (step < STEPS.length - 1) {
      setDirection(1);
      setStep(s => s + 1);
    } else {
      handleSubmit();
    }
  };

  const goBack = () => {
    if (step > 0) {
      setDirection(-1);
      setStep(s => s - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        name, gender, bio, skills,
        totalEvents, wins, projectsCompleted,
        profilePhoto, githubId, experiences
      };
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
      const res = await fetch(`${apiUrl}/users/me/onboarding`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const updated = await res.json();
        updateUser({ ...updated, isOnboardingCompleted: true });
        router.push('/');
      }
    } catch (err) {
      console.error('Onboarding error:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-arctic-grey">Full Legal Name</label>
              <Input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Alex Rivera" autoFocus />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-arctic-grey">Identification</label>
              <div className="grid grid-cols-2 gap-3">
                {GENDERS.map(g => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGender(g)}
                    className={cn(
                      "flex items-center justify-between rounded-2xl border px-6 py-4 text-xs font-bold transition-all",
                      gender === g
                        ? "border-arctic-blue bg-arctic-blue/5 text-arctic-blue ring-1 ring-arctic-blue"
                        : "border-arctic-border bg-white text-arctic-grey hover:border-arctic-blue/30"
                    )}
                  >
                    {g}
                    {gender === g && <div className="h-2 w-2 rounded-full bg-arctic-blue" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-arctic-grey">The Builder Narrative</label>
              <TextArea
                value={bio}
                onChange={e => setBio(e.target.value)}
                placeholder="What have you built? What do you want to build next?"
                rows={6}
                maxLength={280}
              />
              <div className="flex justify-end text-[9px] font-black text-arctic-grey/30 uppercase tracking-widest">
                {bio.length} / 280
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-arctic-grey">Technical Proficiency</label>
              <div className="flex flex-wrap gap-2.5">
                {SUGGESTED_SKILLS.map(s => (
                  <button
                    key={s}
                    onClick={() => setSkills(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])}
                    className={cn(
                      "rounded-xl px-4 py-2.5 text-[10px] font-black uppercase tracking-widest transition-all border",
                      skills.includes(s)
                        ? "bg-arctic-navy text-white border-arctic-navy shadow-lg shadow-arctic-navy/10"
                        : "bg-white text-arctic-grey border-arctic-border hover:border-arctic-blue/30"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="grid grid-cols-1 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {[
              { label: 'Platform Events', value: totalEvents, setter: setTotalEvents, icon: Globe },
              { label: 'Ecosystem Wins', value: wins, setter: setWins, icon: Award },
              { label: 'Live Projects', value: projectsCompleted, setter: setProjectsCompleted, icon: Zap },
            ].map((item, i) => (
              <div key={i} className="group flex items-center gap-6 rounded-[2rem] border border-arctic-border bg-white p-6 transition-all hover:border-arctic-blue hover:shadow-xl hover:shadow-arctic-blue/5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-arctic-canvas text-arctic-navy group-hover:bg-arctic-blue group-hover:text-white transition-colors">
                  <item.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-arctic-grey">{item.label}</label>
                  <input
                    type="number"
                    value={item.value}
                    onChange={e => item.setter(parseInt(e.target.value) || 0)}
                    className="block w-full bg-transparent text-2xl font-black text-arctic-navy outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        );
      case 4:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-arctic-grey">Verified Experience</label>
              <button onClick={addExperience} className="text-[10px] font-bold text-arctic-blue hover:underline">+ Add Entry</button>
            </div>
            
            {experiences.length > 0 ? (
              <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 scrollbar-hide">
                {experiences.map(exp => (
                  <div key={exp.id} className="rounded-2xl border border-arctic-border bg-white p-5 space-y-4 shadow-sm">
                    <input 
                      placeholder="Event or Project Name"
                      value={exp.name}
                      onChange={e => updateExperience(exp.id, 'name', e.target.value)}
                      className="w-full bg-transparent text-sm font-bold outline-none border-b border-arctic-border/50 pb-1 focus:border-arctic-blue"
                    />
                    <textarea 
                      placeholder="Description of your role..."
                      value={exp.description}
                      onChange={e => updateExperience(exp.id, 'description', e.target.value)}
                      rows={2}
                      className="w-full bg-transparent text-xs font-medium outline-none border-b border-arctic-border/50 pb-1 focus:border-arctic-blue resize-none"
                    />
                    <div className="flex items-center gap-3 pt-2">
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
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 rounded-2xl border-2 border-dashed border-arctic-border bg-arctic-canvas/50">
                 <p className="text-[10px] font-black uppercase tracking-widest text-arctic-grey/40">No experiences added.</p>
              </div>
            )}
          </div>
        );
      case 5:
        return (
          <div className="flex flex-col items-center gap-10 py-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="relative group">
              <div className="h-44 w-44 overflow-hidden rounded-[2.5rem] border-[6px] border-white bg-arctic-canvas shadow-2xl ring-1 ring-arctic-border transition-transform group-hover:scale-105">
                {profilePhoto ? (
                  <img src={profilePhoto} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-arctic-grey/10">
                    <User className="h-24 w-24" />
                  </div>
                )}
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-4 -right-4 flex h-14 w-14 items-center justify-center rounded-[1.5rem] bg-arctic-navy text-white shadow-2xl transition-all hover:bg-arctic-blue hover:scale-110 active:scale-95"
              >
                <Camera className="h-6 w-6" />
              </button>
            </div>
            <input type="file" ref={fileInputRef} onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => setProfilePhoto(reader.result as string);
                reader.readAsDataURL(file);
              }
            }} className="hidden" accept="image/*" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-arctic-grey text-center max-w-[200px]">Use a professional photo for better team matching.</p>
          </div>
        );
      case 6:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="rounded-[2.5rem] bg-arctic-navy p-10 text-white shadow-2xl shadow-arctic-navy/20 relative overflow-hidden">
              <div className="relative z-10 space-y-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-arctic-cyan">
                    <GitBranch className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black tracking-tight">Connect Workspace</h3>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">GitHub Verification</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 transition-all focus-within:ring-arctic-cyan focus-within:bg-white/10">
                  <span className="text-sm font-bold text-white/30">github.com/</span>
                  <input
                    value={githubId}
                    onChange={e => setGithubId(e.target.value)}
                    placeholder="username"
                    className="flex-1 bg-transparent text-sm font-bold text-white outline-none placeholder:text-white/10"
                    autoFocus
                  />
                </div>
              </div>
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-arctic-cyan/10 blur-[100px]" />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const progress = ((step + 1) / STEPS.length) * 100;
  const currentStep = STEPS[step];

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-arctic-navy font-sans overflow-x-hidden">
      
      {/* Global Header */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-arctic-border">
         <div className="mx-auto max-w-7xl px-8 flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-arctic-navy text-arctic-cyan">
                  <Sparkles className="h-4 w-4" />
               </div>
               <span className="text-[11px] font-black tracking-[0.2em] uppercase">HACKPREP // PROFILE</span>
            </div>
            <div className="flex items-center gap-4">
               <div className="h-1.5 w-48 rounded-full bg-arctic-canvas overflow-hidden border border-arctic-border">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-arctic-blue transition-all duration-700"
                  />
               </div>
               <span className="text-[10px] font-black text-arctic-grey uppercase tracking-widest">{Math.round(progress)}%</span>
            </div>
         </div>
      </div>

      <main className="mx-auto max-w-7xl px-8 pt-32 pb-20">
        <div className="grid grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Live Preview */}
          <div className="col-span-12 lg:col-span-5 sticky top-32">
             <div className="space-y-10">
                <div className="space-y-2">
                   <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-arctic-blue">Live Preview</h2>
                   <p className="text-[11px] font-bold text-arctic-grey/50 uppercase tracking-widest">This is how your intelligence profile will appear to teams.</p>
                </div>

                {/* Profile Card Preview */}
                <motion.div 
                  layout
                  className="relative overflow-hidden rounded-[3rem] bg-white border border-arctic-border p-10 shadow-3xl shadow-arctic-navy/5 transition-all"
                >
                   <div className="flex flex-col items-center text-center space-y-6">
                      <div className="relative">
                         <div className="h-32 w-32 rounded-[2rem] bg-arctic-canvas border border-arctic-border overflow-hidden">
                            {profilePhoto ? <img src={profilePhoto} className="h-full w-full object-cover" referrerPolicy="no-referrer" /> : <User className="h-full w-full p-8 text-arctic-grey/10" />}
                         </div>
                         {githubId && (
                           <div className="absolute -bottom-2 -right-2 bg-arctic-navy text-white p-2 rounded-xl shadow-lg border-2 border-white">
                              <GitBranch className="h-3.5 w-3.5" />
                           </div>
                         )}
                      </div>
                      
                      <div className="space-y-1.5">
                         <h3 className="text-3xl font-black tracking-tight text-arctic-navy">{name || "Anonymous Builder"}</h3>
                         <div className="flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest text-arctic-grey/60">
                            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> Earth</span>
                            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Level 1</span>
                         </div>
                      </div>

                      <p className="text-sm font-medium text-arctic-grey leading-relaxed line-clamp-3 min-h-[3rem]">
                        {bio || "Your story starts here. Complete the onboarding to define your engineering narrative."}
                      </p>

                      <div className="w-full pt-6 border-t border-arctic-border/50">
                         <div className="flex flex-wrap justify-center gap-2">
                            {skills.length > 0 ? skills.slice(0, 4).map(s => (
                              <span key={s} className="px-3 py-1.5 bg-arctic-canvas rounded-lg text-[9px] font-black uppercase tracking-widest text-arctic-navy">
                                {s}
                              </span>
                            )) : (
                              <span className="text-[10px] font-bold text-arctic-grey/30 uppercase tracking-widest">No skills mapped yet</span>
                            )}
                            {skills.length > 4 && <span className="text-[10px] font-bold text-arctic-blue pt-1">+{skills.length - 4}</span>}
                         </div>
                      </div>

                      <div className="grid grid-cols-3 w-full gap-4 pt-6">
                         {[
                           { label: 'Events', val: totalEvents },
                           { label: 'Wins', val: wins },
                           { label: 'Ships', val: projectsCompleted }
                         ].map(stat => (
                           <div key={stat.label} className="bg-arctic-canvas rounded-2xl p-4 text-center">
                              <div className="text-lg font-black text-arctic-navy leading-none">{stat.val}</div>
                              <div className="text-[9px] font-black uppercase tracking-widest text-arctic-grey mt-1">{stat.label}</div>
                           </div>
                         ))}
                      </div>
                   </div>

                   {/* Background Decor */}
                   <div className="absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-arctic-blue/5 blur-[60px]" />
                </motion.div>

                {/* Status Indicator */}
                <div className="flex items-center gap-4 px-6 py-4 bg-arctic-surface rounded-2xl border border-arctic-blue/10">
                   <div className="flex h-2 w-2 rounded-full bg-arctic-blue animate-pulse" />
                   <p className="text-[10px] font-black uppercase tracking-widest text-arctic-blue">
                      Updating your profile...
                   </p>
                </div>
             </div>
          </div>

          {/* Right Column: Form Station */}
          <div className="col-span-12 lg:col-span-7">
             <div className="mx-auto max-w-xl">
                <div className="space-y-12">
                   
                   {/* Step Info */}
                   <div className="space-y-4">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-arctic-border text-arctic-blue shadow-sm">
                         <currentStep.icon className="h-6 w-6" />
                      </div>
                      <div className="space-y-1">
                         <h1 className="text-4xl font-black tracking-tight text-arctic-navy uppercase">{currentStep.headline}</h1>
                         <p className="text-lg font-medium text-arctic-grey">{currentStep.sub}</p>
                      </div>
                   </div>

                   {/* Form Area */}
                   <div className="min-h-[400px]">
                      {renderStep()}
                   </div>

                   {/* Actions Area */}
                   <div className="flex items-center justify-between pt-12 border-t border-arctic-border">
                      {step > 0 ? (
                        <button
                          onClick={goBack}
                          className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-arctic-grey hover:text-arctic-navy transition-colors"
                        >
                          <ChevronLeft className="h-4 w-4" />
                          Previous Step
                        </button>
                      ) : <div />}

                      <button
                        onClick={goNext}
                        disabled={loading}
                        className="group flex items-center gap-4 rounded-[1.5rem] bg-arctic-navy px-10 py-5 text-xs font-black uppercase tracking-widest text-white shadow-2xl shadow-arctic-navy/20 transition-all hover:bg-arctic-blue hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                      >
                        {loading ? "Processing..." : step === STEPS.length - 1 ? "Create Profile" : "Continue"}
                        {!loading && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
                      </button>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </main>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
