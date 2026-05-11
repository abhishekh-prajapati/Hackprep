'use client';

import React, { useState, useEffect } from 'react';
import { Save, Smile } from 'lucide-react';
import styles from '../app/page.module.css';

const SKIN_TONES = ['#fcdcb4', '#e2b98f', '#c68642', '#8d5524', '#3d2210'];
const HAIR_COLORS = ['#090806', '#2c222b', '#71361a', '#e3a857', '#a52a2a', '#a9a9a9', '#4a90e2', '#d81159'];
const BG_COLORS = ['#ff6b00', '#58a6ff', '#2ea043', '#d29922', '#8b5cf6', '#e11d48'];
const EXPRESSIONS = ['😊', '😎', '🤓', '🤩', '🤔', '😴', '🤪', '😇'];

export function BitmojiPanel() {
  const [skin, setSkin] = useState(SKIN_TONES[0]);
  const [hair, setHair] = useState(HAIR_COLORS[0]);
  const [bg, setBg] = useState(BG_COLORS[0]);
  const [expression, setExpression] = useState(EXPRESSIONS[0]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('bitmoji');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.skin) setSkin(data.skin);
        if (data.hair) setHair(data.hair);
        if (data.bg) setBg(data.bg);
        if (data.expression) setExpression(data.expression);
      } catch (e) {}
    }
  }, []);

  const saveBitmoji = () => {
    localStorage.setItem('bitmoji', JSON.stringify({ skin, hair, bg, expression }));
    // Optional: visual feedback
    const btn = document.getElementById('save-bitmoji-btn');
    if (btn) {
      btn.style.color = 'var(--priority-low)';
      setTimeout(() => { btn.style.color = ''; }, 1000);
    }
  };

  if (!mounted) return null; // avoid hydration mismatch

  return (
    <div className={styles.bitmojiPanel}>
      <div className={styles.bitmojiHeader}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Smile size={18} />
          <span style={{ fontWeight: 600 }}>Your Bitmoji</span>
        </div>
        <button 
          id="save-bitmoji-btn"
          onClick={saveBitmoji} 
          className={styles.actionBtn} 
          style={{ width: 32, height: 32 }} 
          title="Save Bitmoji"
        >
          <Save size={14} />
        </button>
      </div>

      {/* Preview */}
      <div className={styles.bitmojiPreviewContainer}>
        <div 
          className={styles.bitmojiAvatar}
          style={{ backgroundColor: bg }}
        >
          <div className={styles.bitmojiHead} style={{ backgroundColor: skin }}>
            <div className={styles.bitmojiHair} style={{ backgroundColor: hair }} />
            <div className={styles.bitmojiFace}>
              {expression}
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className={styles.bitmojiControls}>
        <div className={styles.controlGroup}>
          <label>Skin Tone</label>
          <div className={styles.colorPalette}>
            {SKIN_TONES.map(color => (
              <button 
                key={color} 
                className={`${styles.colorOption} ${skin === color ? styles.selected : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => setSkin(color)}
                title={color}
              />
            ))}
          </div>
        </div>

        <div className={styles.controlGroup}>
          <label>Hair Color</label>
          <div className={styles.colorPalette}>
            {HAIR_COLORS.map(color => (
              <button 
                key={color} 
                className={`${styles.colorOption} ${hair === color ? styles.selected : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => setHair(color)}
                title={color}
              />
            ))}
          </div>
        </div>

        <div className={styles.controlGroup}>
          <label>Background</label>
          <div className={styles.colorPalette}>
            {BG_COLORS.map(color => (
              <button 
                key={color} 
                className={`${styles.colorOption} ${bg === color ? styles.selected : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => setBg(color)}
                title={color}
              />
            ))}
          </div>
        </div>

        <div className={styles.controlGroup}>
          <label>Expression</label>
          <div className={styles.emojiPalette}>
            {EXPRESSIONS.map(emoji => (
              <button 
                key={emoji} 
                className={`${styles.emojiOption} ${expression === emoji ? styles.selected : ''}`}
                onClick={() => setExpression(emoji)}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
