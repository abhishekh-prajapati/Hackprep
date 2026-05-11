'use client';
import React from 'react';

export default function QuickStats() {
  return (
    <div className="card">
      <h3 style={{ fontSize: '1rem', marginBottom: '20px', textAlign: 'center' }}>Quick Stats</h3>
      
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>12k+</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Downloads</div>
        </div>
        
        <div style={{ width: '1px', height: '40px', backgroundColor: 'var(--border)' }}></div>
        
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>48</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>New Today</div>
        </div>
      </div>
    </div>
  );
}
