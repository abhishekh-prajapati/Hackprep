'use client';

import React, { useState } from 'react';
import { Avatar } from './Avatar';
import { Download, RefreshCw, UserCircle, Save, Settings, Eye, Mail, Briefcase, User as UserIcon, Edit2 } from 'lucide-react';

interface AvatarProfileProps {
  userProfile: {
    username: string;
    displayName: string;
    role: string;
  };
  onSave: (profile: any) => void;
}

export function AvatarProfile({ userProfile, onSave }: AvatarProfileProps) {
  const [username, setUsername] = useState(userProfile.username);
  const [displayName, setDisplayName] = useState(userProfile.displayName);
  const [role, setRole] = useState(userProfile.role);
  const [email, setEmail] = useState('alex.h@hackprep.io');
  const [bio, setBio] = useState('Building the future of developer tools.');
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);

  const generateRandom = () => {
    const randomString = Math.random().toString(36).substring(2, 10);
    setUsername(randomString);
  };

  return (
    <div style={{
      display: 'flex',
      gap: '32px',
      maxWidth: '1000px',
      width: '100%',
      padding: '24px',
      height: '100%',
      overflowY: 'auto'
    }}>
      
      {/* LEFT COLUMN: Avatar Generator */}
      <div style={{
        width: '380px',
        flexShrink: 0,
        background: 'var(--card-bg)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-xl)',
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '32px',
        color: 'var(--text-primary)',
        boxShadow: 'var(--glass-shadow)',
        height: 'fit-content'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
            <UserCircle size={20} color="var(--accent-color)" />
            <h2 style={{ fontSize: '18px', fontWeight: 600 }}>Profile Avatar</h2>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            Your avatar is procedurally generated based on your username seed.
          </p>
        </div>

        <div style={{
          padding: '32px',
          background: 'var(--bg-color)',
          borderRadius: '50%',
          border: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <Avatar username={username} size={160} />
          
          <button 
            onClick={generateRandom}
            style={{
              position: 'absolute',
              bottom: '0px',
              right: '0px',
              background: 'var(--card-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-secondary)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              transition: 'all 0.2s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = 'var(--accent-color)';
              e.currentTarget.style.transform = 'scale(1.05) rotate(15deg)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = 'var(--text-secondary)';
              e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
            }}
            title="Randomize Seed"
          >
            <RefreshCw size={20} />
          </button>
        </div>

        {isEditingAvatar && (
          <div style={{ width: '100%', animation: 'fadeIn 0.3s' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Avatar Seed String
            </label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 16px',
                background: 'var(--bg-color)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-primary)',
                fontSize: '15px',
                outline: 'none',
                transition: 'border-color 0.2s',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
              }}
              placeholder="Enter a string to generate..."
            />
          </div>
        )}

        <div style={{ display: 'flex', gap: '12px', width: '100%', marginTop: 'auto' }}>
          <button 
            onClick={() => setIsEditingAvatar(!isEditingAvatar)}
            style={{
              flex: 1,
              padding: '14px',
              background: 'transparent',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'var(--hover-bg)';
              e.currentTarget.style.borderColor = 'var(--text-secondary)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'var(--border-color)';
            }}
          >
            <Edit2 size={18} /> {isEditingAvatar ? 'Done Editing' : 'Edit Avatar'}
          </button>
          
          <button style={{
            flex: 1,
            padding: '14px',
            background: 'var(--accent-color)',
            color: '#fff',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            fontWeight: 600,
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
          onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
          >
            <Save size={18} /> Save Avatar
          </button>
        </div>
      </div>

      {/* RIGHT COLUMN: Edit Profile Form */}
      <div style={{
        flex: 1,
        background: 'var(--card-bg)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-xl)',
        padding: '32px 40px',
        display: 'flex',
        flexDirection: 'column',
        color: 'var(--text-primary)',
        boxShadow: 'var(--glass-shadow)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', paddingBottom: '24px', borderBottom: '1px solid var(--border-color)' }}>
          <Settings size={24} color="var(--accent-color)" />
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 600 }}>Edit Profile</h2>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>Customize how your profile appears to others on HackPrep.</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            {/* Display Name */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                <UserIcon size={14} /> Display Name
              </label>
              <input 
                type="text" 
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: 'var(--bg-color)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-primary)',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
            </div>

            {/* Role */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                <Briefcase size={14} /> Role / Title
              </label>
              <input 
                type="text" 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: 'var(--bg-color)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-primary)',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
              <Mail size={14} /> Email Address
            </label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                background: 'var(--bg-color)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-primary)',
                fontSize: '14px',
                outline: 'none',
              }}
            />
          </div>

          {/* Bio */}
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
              <UserCircle size={14} /> Short Bio
            </label>
            <textarea 
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              style={{
                width: '100%',
                padding: '12px 16px',
                background: 'var(--bg-color)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-primary)',
                fontSize: '14px',
                outline: 'none',
                resize: 'none'
              }}
            />
          </div>



          <div style={{ marginTop: 'auto', paddingTop: '24px' }}>
            <button 
              onClick={() => onSave({ username, displayName, role })}
              style={{
              padding: '14px 24px',
              background: 'var(--accent-color)',
              color: '#fff',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer',
              transition: 'opacity 0.2s',
              float: 'right'
            }}
            onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
            >
              <Save size={18} /> Save Changes
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
