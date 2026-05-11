'use client';

import React from 'react';
import { 
  FileText, 
  Plus, 
  Clock, 
  Timer, 
  Bell, 
  Flag, 
  Activity, 
  BarChart3, 
  TrendingUp, 
  CheckCircle2, 
  Users,
  ChevronRight,
  AlertCircle,
  Lightbulb,
  Star
} from 'lucide-react';
import { Avatar } from './Avatar';

const ProjectAnalytics = () => {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'grid',
      gridTemplateColumns: '1.5fr 1fr',
      gridTemplateRows: 'auto 1fr',
      gap: '32px',
      padding: '10px'
    }}>
      {/* 1. Project Overview */}
      <div style={{
        background: 'var(--card-bg)',
        borderRadius: '32px',
        padding: '32px',
        boxShadow: 'var(--elevation-1)',
        border: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: 40, height: 40, background: 'rgba(255, 107, 0, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileText color="#ff6b00" size={20} />
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1a1a1a' }}>Project Overview</h2>
          </div>
          <button style={{
            background: '#ff6b00',
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            padding: '10px 20px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            fontSize: '14px'
          }}>
            <Plus size={18} /> Add New Task
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {[
            { icon: AlertCircle, label: 'Problem Statement', color: '#ff6b00', text: 'Teams struggle with inefficient task management, time tracking, and lack of real-time progress visibility.' },
            { icon: Lightbulb, label: 'Solution Approach', color: '#ffb300', text: 'A unified productivity platform with task management, time tracking, analytics, and team collaboration.' },
            { icon: Star, label: 'Core Features', color: '#ffd600', isTags: true, tags: ['Task Management', 'Time Tracking', 'Analytics', 'Collaboration'] },
            { icon: FileText, label: 'Project Description', color: '#ff6b00', text: 'This platform helps teams plan, track, and deliver projects efficiently with powerful insights and real-time updates.' }
          ].map((item, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '200px 1fr', alignItems: 'flex-start', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: 36, height: 36, background: `${item.color}10`, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <item.icon color={item.color} size={18} />
                </div>
                <span style={{ fontSize: '14px', fontWeight: 600, color: item.color }}>{item.label}</span>
              </div>
              {item.isTags ? (
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {item.tags?.map(tag => (
                    <span key={tag} style={{ padding: '6px 12px', background: 'rgba(255, 107, 0, 0.05)', color: '#ff6b00', borderRadius: '8px', fontSize: '12px', fontWeight: 600 }}>{tag}</span>
                  ))}
                </div>
              ) : (
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{item.text}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 2. Productivity Tools */}
      <div style={{
        background: 'var(--card-bg)',
        borderRadius: '32px',
        padding: '32px',
        boxShadow: 'var(--elevation-1)',
        border: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: 40, height: 40, background: 'rgba(255, 107, 0, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Timer color="#ff6b00" size={20} />
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#2d2d2d' }}>Productivity Tools</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { icon: Clock, title: 'Duration Tracking Clock', desc: 'Track time spent on tasks in real-time' },
            { icon: Timer, title: 'Timer System', desc: 'Focus timer with start, pause and stop' },
            { icon: Bell, title: 'Smart Alarm & Reminders', desc: 'Get notified and never miss a deadline' },
            { icon: Flag, title: 'Sprint Time Management', desc: 'Manage sprint duration and milestones' },
            { icon: Activity, title: 'Real Time Activity Monitoring', desc: 'Monitor team activity in real-time' }
          ].map((tool, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px',
              borderRadius: '20px',
              border: '1px solid rgba(0,0,0,0.03)',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: 44, height: 44, background: 'rgba(255, 107, 0, 0.1)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <tool.icon color="#ff6b00" size={20} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>{tool.title}</span>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{tool.desc}</span>
                </div>
              </div>
              <ChevronRight size={18} color="var(--border-color)" />
            </div>
          ))}
        </div>
      </div>

      {/* 3. Analytics & Insights */}
      <div style={{
        background: '#ffffff',
        borderRadius: '32px',
        padding: '32px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.03)',
        border: '1px solid rgba(255, 107, 0, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: 40, height: 40, background: 'rgba(255, 107, 0, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BarChart3 color="#ff6b00" size={20} />
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>Analytics & Insights</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {/* Chart Placeholder */}
          <div style={{ 
            background: 'rgba(255, 107, 0, 0.02)', 
            borderRadius: '24px', 
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            border: '1px solid rgba(255, 107, 0, 0.05)'
          }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#2d2d2d' }}>Task Completion Overview</span>
            <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: '12px', height: '140px', paddingBottom: '10px' }}>
              {/* Simplified SVG Chart */}
              <svg width="100%" height="100%" viewBox="0 0 300 100" preserveAspectRatio="none">
                <path 
                  d="M0,80 Q30,40 60,60 T120,40 T180,50 T240,30 T300,40" 
                  fill="none" 
                  stroke="#ff6b00" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                />
                <circle cx="120" cy="40" r="4" fill="#ff6b00" />
              </svg>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#9e9e9e' }}>
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {[
              { label: 'Overall Progress', value: '72%', trend: '+ 12%', icon: TrendingUp },
              { label: 'Tasks Completed', value: '128', trend: '+ 18%', icon: CheckCircle2 },
              { label: 'Total Time Tracked', value: '215h', trend: '+ 8%', icon: Clock },
              { label: 'Active Members', value: '24', trend: '+ 15%', icon: Users }
            ].map((stat, i) => (
              <div key={i} style={{
                background: 'var(--card-bg)',
                borderRadius: '20px',
                padding: '16px',
                border: '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                <div style={{ width: 32, height: 32, background: 'rgba(255, 107, 0, 0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <stat.icon color="var(--accent-color)" size={16} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>{stat.value}</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 500 }}>{stat.label}</span>
                </div>
                <span style={{ fontSize: '10px', color: '#10b981', fontWeight: 600 }}>↑ {stat.trend} <span style={{ color: 'var(--text-secondary)' }}>vs last week</span></span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Team Members */}
      <div style={{
        background: '#ffffff',
        borderRadius: '32px',
        padding: '32px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.03)',
        border: '1px solid rgba(255, 107, 0, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: 40, height: 40, background: 'rgba(255, 107, 0, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users color="#ff6b00" size={20} />
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#2d2d2d' }}>Team Members</h2>
          </div>
          <span style={{ fontSize: '12px', color: '#ff6b00', fontWeight: 600, cursor: 'pointer' }}>View All</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            { name: 'Alex Johnson', role: 'Project Manager', tasks: 12, status: 'Online' },
            { name: 'Sarah Williams', role: 'UI/UX Designer', tasks: 8, status: 'Online' },
            { name: 'Michael Brown', role: 'Frontend Developer', tasks: 15, status: 'Away', statusColor: '#ffb300' },
            { name: 'Emily Davis', role: 'Backend Developer', tasks: 10, status: 'Online' },
            { name: 'David Wilson', role: 'QA Engineer', tasks: 7, status: 'Busy', statusColor: '#f43f5e' }
          ].map((member, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Avatar username={member.name} size={44} />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>{member.name}</span>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{member.role}</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: member.statusColor || '#10b981' }} />
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{member.status}</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>{member.tasks}</div>
                  <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>Tasks</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectAnalytics;
