'use client';
import React from 'react';
import TopBar from '../components/TopBar';
import { ArrowLeft, User, Shield, CreditCard, Award, Settings } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  return (
    <>
      <TopBar />
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', marginBottom: '32px', fontWeight: 600 }}>
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        <div className="card" style={{ padding: '40px', display: 'flex', gap: '32px', alignItems: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            border: '4px solid var(--accent)',
            padding: '4px',
            backgroundColor: 'var(--bg-primary)'
          }}>
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" 
              alt="Profile" 
              style={{ width: '100%', height: '100%', borderRadius: '50%' }}
            />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <h1 style={{ margin: 0, fontSize: '2rem' }}>Alex Chen</h1>
              <span className="badge" style={{ backgroundColor: 'var(--accent)', color: 'white' }}>Pro</span>
            </div>
            <p style={{ margin: 0, fontSize: '1.1rem' }}>Full Stack Developer & Hackathon Enthusiast</p>
            <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 700, fontSize: '1.2rem' }}>14</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Projects</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 700, fontSize: '1.2rem' }}>8</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Wins</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div className="card">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <Shield size={20} color="var(--accent)" />
              Account Security
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <p style={{ fontSize: '0.9rem', margin: 0 }}>Two-Factor Auth: <strong>Enabled</strong></p>
              <p style={{ fontSize: '0.9rem', margin: 0 }}>Email: <strong>alex.c@hackprep.io</strong></p>
              <button className="btn-secondary" style={{ marginTop: '8px', width: 'fit-content' }}>Update Password</button>
            </div>
          </div>

          <div className="card">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <CreditCard size={20} color="var(--accent)" />
              Subscription
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <p style={{ fontSize: '0.9rem', margin: 0 }}>Current Plan: <strong>HackPrep Pro</strong></p>
              <p style={{ fontSize: '0.9rem', margin: 0 }}>Next Billing: <strong>June 12, 2026</strong></p>
              <button className="btn-primary" style={{ marginTop: '8px', width: 'fit-content' }}>Manage Billing</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
