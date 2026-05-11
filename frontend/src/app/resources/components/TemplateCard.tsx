'use client';
import React from 'react';
import { Download, Code2, Terminal } from 'lucide-react';
import Link from 'next/link';

interface TemplateProps {
  id: string;
  title: string;
  description: string;
  type: 'react' | 'python';
  tech: string;
}

export default function TemplateCard({ id, title, description, type, tech }: TemplateProps) {
  const Icon = type === 'react' ? Code2 : Terminal;
  
  return (
    <div className="card clickable-card" style={{ 
      flex: 1, 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '20px',
      background: 'linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: '12px',
        backgroundColor: 'var(--bg-tertiary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--accent)',
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
      }}>
        <Icon size={24} />
      </div>
      
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '1.1rem' }}>{title}</h3>
        <p style={{ fontSize: '0.9rem', marginBottom: '0', color: 'var(--text-secondary)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {description}
        </p>
      </div>

      <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
        <span className="badge">
          {tech}
        </span>
        <Link href={`/resources/templates/${id}`} style={{ textDecoration: 'none' }}>
          <button className="btn-secondary" style={{ padding: '6px 16px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Download size={14} />
            Clone
          </button>
        </Link>
      </div>
    </div>
  );
}
