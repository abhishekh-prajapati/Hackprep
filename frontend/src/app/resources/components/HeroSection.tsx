'use client';
import React from 'react';

export default function HeroSection() {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #ffffff 0%, var(--bg-secondary) 100%)',
      borderRadius: '24px',
      padding: '48px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      overflow: 'hidden',
      border: '1px solid var(--border)',
      marginBottom: '40px',
      position: 'relative',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)'
    }}>
      <div style={{ flex: 1, zIndex: 1 }}>
        <h1 style={{ color: 'var(--text-primary)', fontSize: '3rem', fontWeight: 800, marginBottom: '16px' }}>
          Resource Library
        </h1>
        <p style={{ fontSize: '1.1rem', maxWidth: '500px', marginBottom: '32px' }}>
          Everything you need to accelerate your hackathon journey. From production-ready starter kits to industry-standard design systems and expert guides.
        </p>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <span className="badge" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>320+ Templates</span>
          <span className="badge" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>Verified APIs</span>
        </div>
      </div>

      <div style={{ 
        flex: 1, 
        display: 'flex', 
        justifyContent: 'flex-end',
        position: 'relative'
      }}>
        <div style={{
          width: '450px',
          height: '300px',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(255, 102, 0, 0.2)',
          border: '1px solid var(--accent-muted)'
        }}>
          <img 
            src="/hero.png" 
            alt="Resource Library Hero" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>
        {/* Decorative glow */}
        <div style={{
          position: 'absolute',
          top: '50%',
          right: '-10%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(255, 102, 0, 0.15) 0%, transparent 70%)',
          zIndex: 0,
          transform: 'translateY(-50%)'
        }}></div>
      </div>
    </div>
  );
}
