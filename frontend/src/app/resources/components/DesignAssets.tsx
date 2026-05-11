'use client';
import React from 'react';
import { Palette, Eye, Layout, Smile } from 'lucide-react';

const assets = [
  { title: 'Quantum UI Kit', desc: 'Figma, Sketch, Adobe XD', icon: Layout },
  { title: 'Pixel Perfect Icons', desc: 'SVG, PNG, Webfont', icon: Smile },
];

export default function DesignAssets() {
  return (
    <div className="card" style={{ marginBottom: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
        <Palette size={18} color="var(--accent)" />
        <h3 style={{ fontSize: '1rem' }}>Design Assets</h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {assets.map((asset, index) => (
          <div key={index} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px',
            borderRadius: '10px',
            backgroundColor: 'var(--bg-tertiary)',
            border: '1px solid var(--border)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '6px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-secondary)'
              }}>
                <asset.icon size={18} />
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{asset.title}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{asset.desc}</div>
              </div>
            </div>
            <Eye size={16} style={{ color: 'var(--text-secondary)', cursor: 'pointer' }} />
          </div>
        ))}
      </div>
      
      <button className="btn-explore">
        View All Assets
        <Eye size={14} />
      </button>
    </div>
  );
}
