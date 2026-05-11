'use client';
import React from 'react';
import { Search, Bell, Settings } from 'lucide-react';
import { useSearch } from '../context/SearchContext';
import Link from 'next/link';

export default function TopBar() {
  const { searchQuery, setSearchQuery } = useSearch();

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 'var(--topbar-height)',
      padding: '0 24px',
      marginBottom: '24px'
    }}>
      <div style={{
        position: 'relative',
        width: '400px'
      }}>
        <Search size={18} style={{
          position: 'absolute',
          left: '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'var(--text-secondary)'
        }} />
        <input 
          type="text" 
          placeholder="Search resources, templates, or docs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '10px 12px 10px 40px',
            borderRadius: '10px',
            backgroundColor: 'var(--bg-primary)',
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
            outline: 'none',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
          }}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <div style={{ display: 'flex', gap: '16px', color: 'var(--text-secondary)' }}>
          <Bell size={20} style={{ cursor: 'pointer' }} />
          <Settings size={20} style={{ cursor: 'pointer' }} />
        </div>
        
        <Link href="/profile" style={{ display: 'flex', alignItems: 'center', gap: '12px', borderLeft: '1px solid var(--border)', paddingLeft: '24px', cursor: 'pointer' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>Alex Chen</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--accent)' }}>Pro Member</div>
          </div>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-tertiary)',
            overflow: 'hidden',
            border: '2px solid var(--accent)'
          }}>
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Avatar" />
          </div>
        </Link>
      </div>
    </div>
  );
}
