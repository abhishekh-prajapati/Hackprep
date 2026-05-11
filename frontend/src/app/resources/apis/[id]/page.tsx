'use client';
import React, { use } from 'react';

import { ChevronLeft, ExternalLink, Copy, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { apiList } from '../../data/resources';

export default function ApiDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  
  if (!resolvedParams) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>;
  
  const api = apiList.find(a => a.id === resolvedParams.id) || apiList[0];

  return (
    <>

      <div className="main-content" style={{ marginLeft: 0, maxWidth: '1000px', margin: '0 auto' }}>
        <Link href="/apis" className="btn-view-all" style={{ marginBottom: '24px', display: 'inline-flex', width: 'fit-content' }}>
          <ChevronLeft size={18} />
          Back to Directory
        </Link>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          marginBottom: '40px',
          padding: '32px',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: '24px',
          border: '1px solid var(--border)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                backgroundColor: api.logo.startsWith('http') ? `${api.color}18` : api.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.8rem',
                fontWeight: 800,
                color: 'white',
                border: api.logo.startsWith('http') ? `1px solid ${api.color}44` : 'none',
                padding: api.logo.startsWith('http') ? '12px' : '0',
                flexShrink: 0,
                boxShadow: `0 8px 24px ${api.color}33`
              }}>
                {api.logo.startsWith('http') ? (
                  <img
                    src={api.logo}
                    alt={api.name}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      if (e.currentTarget.parentElement) {
                        e.currentTarget.parentElement.style.backgroundColor = api.color;
                        e.currentTarget.parentElement.textContent = api.name[0];
                      }
                    }}
                  />
                ) : api.logo}
              </div>
              <h1 style={{ margin: 0 }}>{api.name}</h1>
            </div>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px' }}>
              {api.tagline}
            </p>
          </div>
          <a href={api.link} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            Official Dashboard
            <ExternalLink size={18} />
          </a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '40px' }}>
          {/* Steps */}
          <div>
            <h2 style={{ marginBottom: '24px' }}>Integration Steps</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {api.steps.map((step, index) => (
                <div key={index} style={{ display: 'flex', gap: '20px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent-muted)',
                    color: 'var(--accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    flexShrink: 0
                  }}>
                    {index + 1}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>{step.title}</h3>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: '1.5' }}>{step.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {api.important && (
              <div style={{ 
                marginTop: '40px', 
                padding: '20px', 
                backgroundColor: 'rgba(52, 152, 219, 0.05)', 
                borderRadius: '16px', 
                border: '1px solid rgba(52, 152, 219, 0.2)',
                display: 'flex',
                gap: '12px'
              }}>
                <AlertCircle size={20} color="#3498db" style={{ flexShrink: 0 }} />
                <div>
                  <h4 style={{ margin: '0 0 4px 0', color: '#3498db', fontSize: '0.95rem' }}>Pro Tip</h4>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{api.important}</p>
                </div>
              </div>
            )}
          </div>

          {/* Snippet */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ margin: 0 }}>Basic Usage</h2>
              <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Copy size={14} />
                Copy
              </button>
            </div>
            <div style={{
              backgroundColor: '#1e1e1e',
              color: '#d4d4d4',
              padding: '20px',
              borderRadius: '12px',
              fontFamily: 'monospace',
              fontSize: '0.85rem',
              lineHeight: '1.6',
              overflowX: 'auto',
              border: '1px solid #333'
            }}>
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{api.snippet}</pre>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
