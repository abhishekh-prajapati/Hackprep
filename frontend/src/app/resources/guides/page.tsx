'use client';
import React from 'react';

import { ArrowLeft, BookOpen, Clock, ChevronRight, Zap, Target, Users } from 'lucide-react';
import Link from 'next/link';

const allGuides = [
  { 
    id: 'pitch-strategy',
    title: 'Winning Pitch Strategy', 
    category: 'Presentation',
    time: '8 min read', 
    desc: 'How to structure your demo to impress judges in under 3 minutes.',
    icon: <Zap size={24} color="#f59e0b" />
  },
  { 
    id: 'team-forming',
    title: 'Effective Team Forming', 
    category: 'Teamwork',
    time: '5 min read', 
    desc: 'Finding the right balance of skills and personality in your team.',
    icon: <Users size={24} color="#3b82f6" />
  },
  { 
    id: 'prototyping-tools',
    title: 'Rapid Prototyping Tools', 
    category: 'Development',
    time: '12 min read', 
    desc: 'The best tools for building high-fidelity MVPs in record time.',
    icon: <Clock size={24} color="#ef4444" />
  },
  { 
    id: 'api-best-practices',
    title: 'API Integration Best Practices', 
    category: 'Development',
    time: '10 min read', 
    desc: 'Securely and efficiently connecting third-party services.',
    icon: <Target size={24} color="#10b981" />
  }
];

export default function GuidesPage() {
  return (
    <>

      <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '60px' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', marginBottom: '32px', fontWeight: 600 }}>
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <BookOpen size={40} color="var(--accent)" />
            <h1 style={{ margin: 0 }}>Hackathon Resource Center</h1>
          </div>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '700px' }}>
            Expert advice and technical guides to help you build, ship, and win your next hackathon.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '24px' }}>
          {allGuides.map((guide) => (
            <div key={guide.id} className="card" style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
              <div style={{ 
                padding: '16px', 
                backgroundColor: 'var(--bg-primary)', 
                borderRadius: '16px', 
                border: '1px solid var(--border)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
              }}>
                {guide.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span className="badge" style={{ fontSize: '0.65rem' }}>{guide.category}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{guide.time}</span>
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{guide.title}</h3>
                <p style={{ fontSize: '0.9rem', marginBottom: '16px' }}>{guide.desc}</p>
                <Link href={`/guides/${guide.id}`}>
                  <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Read Guide
                    <ChevronRight size={14} />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
