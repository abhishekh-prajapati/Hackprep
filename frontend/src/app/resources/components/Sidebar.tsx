'use client';
import React from 'react';
import { 
  LayoutDashboard, 
  Lightbulb, 
  GitCompare, 
  Calendar, 
  Mic2, 
  Library,
  PlusCircle
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: false },
  { icon: Lightbulb, label: 'Explore Ideas', active: false },
  { icon: GitCompare, label: 'Compare Ideas', active: false },
  { icon: Calendar, label: 'My Plan', active: false },
  { icon: Mic2, label: 'Pitch Builder', active: false },
  { icon: Library, label: 'Resources', active: true },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
        <div style={{ 
          width: '32px', 
          height: '32px', 
          backgroundColor: 'var(--accent)', 
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          color: 'white'
        }}>H</div>
        <div>
          <h2 style={{ fontSize: '1.2rem', margin: 0, fontWeight: 700 }}>HackPrep</h2>
          <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            AI HACKATHON CO-PILOT
          </div>
        </div>
      </div>

      <nav style={{ flex: 1 }}>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {navItems.map((item, index) => (
            <li key={index}>
              <a href="#" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px',
                borderRadius: '8px',
                color: item.active ? 'var(--accent)' : 'var(--text-secondary)',
                backgroundColor: item.active ? 'var(--accent-muted)' : 'transparent',
                transition: 'all 0.2s',
                borderLeft: item.active ? '3px solid var(--accent)' : '3px solid transparent'
              }}>
                <item.icon size={20} color={item.active ? 'var(--accent)' : 'currentColor'} />
                <span style={{ fontSize: '0.95rem', fontWeight: item.active ? 600 : 400 }}>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div style={{ marginTop: 'auto' }}>
        <button style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          padding: '14px',
          borderRadius: '12px',
          backgroundColor: '#7c3aed',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          fontWeight: 600,
          boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)'
        }}>
          <PlusCircle size={18} />
          <span>New Project</span>
        </button>
      </div>

      <style jsx>{`
        a:hover {
          background-color: var(--bg-tertiary);
          color: white;
        }
      `}</style>
    </aside>
  );
}
