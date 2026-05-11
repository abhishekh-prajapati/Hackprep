'use client';

import React, { useState } from 'react';
import styles from './BitmojiStudio.module.css';
import { 
  User, Image as ImageIcon, Shirt, Link, Accessibility, Smile, Sparkles, History,
  Sun, Undo, Redo, Maximize2, Download, ExternalLink, Check, Lightbulb, UserRound
} from 'lucide-react';

export function BitmojiStudio() {
  // Navigation State
  const [activeTab, setActiveTab] = useState('Avatar'); // Top tab: Avatar or Stickers
  const [activeNav, setActiveNav] = useState('Avatar'); // Sidebar
  const [activeCategory, setActiveCategory] = useState('Face'); // Face, Hair, etc.

  // Customization State
  const [selectedShape, setSelectedShape] = useState(0);
  const [selectedSkin, setSelectedSkin] = useState('#fcdcb4');
  const [selectedHairStyle, setSelectedHairStyle] = useState(0);
  const [selectedHairColor, setSelectedHairColor] = useState('#090806');
  const [selectedEye, setSelectedEye] = useState(0);
  
  const [selectedBg, setSelectedBg] = useState(0);
  const [selectedPose, setSelectedPose] = useState(0);
  const [selectedExpression, setSelectedExpression] = useState(0);
  
  const [zoomLevel, setZoomLevel] = useState(1);
  const [aiFilter, setAiFilter] = useState('none');

  // Dummy arrays to generate grids
  const faceShapes = Array(5).fill(0);
  const skinTones = ['#fcdcb4', '#e2b98f', '#c68642', '#8d5524', '#3d2210'];
  const hairStyles = Array(8).fill(0);
  const hairColors = ['#090806', '#2c222b', '#71361a', '#e3a857', '#a52a2a', '#a9a9a9', '#ffffff'];
  const eyes = Array(5).fill(0);
  const backgrounds = Array(4).fill(0);
  const poses = Array(6).fill(0);
  const expressions = Array(6).fill(0);

  const getBgColor = (index: number) => `hsl(${220 + index * 20}, 60%, 20%)`;

  const getAvatarTransform = () => {
    let scale = zoomLevel;
    let rotate = 0;
    if (selectedPose === 1) rotate = 5;
    if (selectedPose === 2) rotate = -5;
    if (selectedPose === 3) scale *= 1.1;
    if (selectedPose === 4) scale *= 0.9;
    if (selectedPose === 5) { rotate = 10; scale *= 1.2; }
    return `scale(${scale}) rotate(${rotate}deg)`;
  };

  const getAvatarFilter = () => {
    let hue = selectedExpression * 30;
    if (aiFilter !== 'none') {
      return `${aiFilter} hue-rotate(${hue}deg)`;
    }
    return `hue-rotate(${hue}deg)`;
  };

  const resetAll = () => {
    setSelectedShape(0);
    setSelectedSkin('#fcdcb4');
    setSelectedHairStyle(0);
    setSelectedHairColor('#090806');
    setSelectedEye(0);
    setSelectedBg(0);
    setSelectedPose(0);
    setSelectedExpression(0);
    setZoomLevel(1);
    setAiFilter('none');
  };

  return (
    <div className={styles.studioContainer}>
      {/* Top Navigation specific to Studio */}
      <div className={styles.topbar}>
        <div className={styles.brand}>
          <img src="/avatar.png" alt="Avatar" className={styles.brandAvatar} />
          <div className={styles.brandText}>
            <span className={styles.brandTitle}>Bitmoji Studio</span>
            <span className={styles.brandSubtitle}>Your vibe, your avatar.</span>
          </div>
        </div>
        
        <div className={styles.tabs}>
          <div 
            className={`${styles.tab} ${activeTab === 'Avatar' ? styles.active : ''}`}
            onClick={() => setActiveTab('Avatar')}
          >
            Avatar
          </div>
          <div 
            className={`${styles.tab} ${activeTab === 'Stickers' ? styles.active : ''}`}
            onClick={() => setActiveTab('Stickers')}
          >
            Stickers
          </div>
        </div>
        
        <div className={styles.topActions}>
          <button className={`${styles.btn} ${styles.btnOutline}`}>
            <Download size={16} /> Save
          </button>
          <button className={`${styles.btn} ${styles.btnPrimary}`}>
            <ExternalLink size={16} /> Export
          </button>
        </div>
      </div>

      <div className={styles.mainArea}>
        {/* Extreme Left Sidebar */}
        <div className={styles.sidebar}>
          <div className={`${styles.navItem} ${activeNav === 'Avatar' ? styles.active : ''}`} onClick={() => setActiveNav('Avatar')} style={{ cursor: 'pointer' }}>
            <User size={24} /> Avatar
          </div>
          <div className={`${styles.navItem} ${activeNav === 'Background' ? styles.active : ''}`} onClick={() => setActiveNav('Background')} style={{ cursor: 'pointer' }}>
            <ImageIcon size={24} /> Background
          </div>
          <div className={`${styles.navItem} ${activeNav === 'Outfit' ? styles.active : ''}`} onClick={() => setActiveNav('Outfit')} style={{ cursor: 'pointer' }}>
            <Shirt size={24} /> Outfit
          </div>
          <div className={`${styles.navItem} ${activeNav === 'Accessories' ? styles.active : ''}`} onClick={() => setActiveNav('Accessories')} style={{ cursor: 'pointer' }}>
            <Link size={24} /> Accessories
          </div>
          <div className={`${styles.navItem} ${activeNav === 'Pose' ? styles.active : ''}`} onClick={() => setActiveNav('Pose')} style={{ cursor: 'pointer' }}>
            <Accessibility size={24} /> Pose
          </div>
          <div className={`${styles.navItem} ${activeNav === 'Expressions' ? styles.active : ''}`} onClick={() => setActiveNav('Expressions')} style={{ cursor: 'pointer' }}>
            <Smile size={24} /> Expressions
          </div>
          <div className={`${styles.navItem} ${activeNav === 'AI Generate' ? styles.active : ''}`} onClick={() => setActiveNav('AI Generate')} style={{ cursor: 'pointer' }}>
            <Sparkles size={24} /> AI Generate
          </div>
          <div className={`${styles.navItem} ${activeNav === 'History' ? styles.active : ''}`} onClick={() => setActiveNav('History')} style={{ cursor: 'pointer' }}>
            <History size={24} /> History
          </div>
        </div>

        {/* Customizer Panel */}
        <div className={styles.customizer}>
          <div className={styles.sectionTitle}>Customize</div>
          
          <div className={styles.iconTabs}>
            <div className={`${styles.iconTab} ${activeCategory === 'Face' ? styles.active : ''}`} onClick={() => setActiveCategory('Face')} style={{ cursor: 'pointer' }}>
              <div className={styles.iconCircle}><UserRound size={20} /></div>
              Face
            </div>
            <div className={`${styles.iconTab} ${activeCategory === 'Hair' ? styles.active : ''}`} onClick={() => setActiveCategory('Hair')} style={{ cursor: 'pointer' }}>
              <div className={styles.iconCircle}><User size={20} /></div>
              Hair
            </div>
            <div className={`${styles.iconTab} ${activeCategory === 'Beard' ? styles.active : ''}`} onClick={() => setActiveCategory('Beard')} style={{ cursor: 'pointer' }}>
              <div className={styles.iconCircle}><User size={20} /></div>
              Beard
            </div>
            <div className={`${styles.iconTab} ${activeCategory === 'Eyes' ? styles.active : ''}`} onClick={() => setActiveCategory('Eyes')} style={{ cursor: 'pointer' }}>
              <div className={styles.iconCircle}><User size={20} /></div>
              Eyes
            </div>
            <div className={`${styles.iconTab} ${activeCategory === 'Brows' ? styles.active : ''}`} onClick={() => setActiveCategory('Brows')} style={{ cursor: 'pointer' }}>
              <div className={styles.iconCircle}><User size={20} /></div>
              Brows
            </div>
          </div>

          <div className={styles.controlSection}>
            <div className={styles.controlLabel}>Face Shape</div>
            <div className={styles.grid5}>
              {faceShapes.map((_, i) => (
                <div 
                  key={i} 
                  className={`${styles.shapeOption} ${selectedShape === i ? styles.active : ''}`}
                  onClick={() => setSelectedShape(i)}
                >
                   <img src="/avatar.png" className={styles.shapeImg} style={{ filter: 'grayscale(1) brightness(1.5)' }} />
                </div>
              ))}
            </div>
          </div>

          <div className={styles.controlSection}>
            <div className={styles.controlLabel}>Skin Tone</div>
            <div className={styles.grid5} style={{ gap: '16px' }}>
              {skinTones.map((color, i) => (
                <div 
                  key={i} 
                  className={`${styles.colorCircle} ${selectedSkin === color ? styles.active : ''}`} 
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedSkin(color)}
                />
              ))}
            </div>
          </div>

          <div className={styles.controlSection}>
            <div className={styles.controlLabel}>Hair Style</div>
            <div className={styles.grid4}>
              {hairStyles.map((_, i) => (
                <div 
                  key={i} 
                  className={`${styles.shapeOption} ${selectedHairStyle === i ? styles.active : ''}`}
                  onClick={() => setSelectedHairStyle(i)}
                >
                  <img src="/avatar.png" className={styles.shapeImg} />
                </div>
              ))}
            </div>
          </div>

          <div className={styles.controlSection}>
            <div className={styles.controlLabel}>Hair Color</div>
            <div className={styles.grid5} style={{ gap: '16px' }}>
              {hairColors.map((color, i) => (
                <div 
                  key={i} 
                  className={`${styles.colorCircle} ${selectedHairColor === color ? styles.active : ''}`} 
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedHairColor(color)}
                />
              ))}
            </div>
          </div>

          <div className={styles.controlSection}>
            <div className={styles.controlLabel}>Eyes</div>
            <div className={styles.grid5}>
              {eyes.map((_, i) => (
                <div 
                  key={i} 
                  className={`${styles.shapeOption} ${selectedEye === i ? styles.active : ''}`}
                  onClick={() => setSelectedEye(i)}
                >
                  <div style={{ width: 12, height: 6, background: '#333', borderRadius: '50%' }} />
                </div>
              ))}
            </div>
          </div>

          <div className={styles.aiCard}>
            <div className={styles.aiHeader}>
              <Sparkles size={16} /> AI Avatar
            </div>
            <div className={styles.aiText}>Create your avatar in any style you can imagine.</div>
            <div className={styles.aiAvatars}>
              <div className={styles.aiAvatarItem} onClick={() => setAiFilter('none')} style={{ cursor: 'pointer' }}>
                <img src="/avatar.png" className={styles.aiAvatarImg} style={{ border: aiFilter === 'none' ? '2px solid #8b5cf6' : '' }} />
                3D Render
              </div>
              <div className={styles.aiAvatarItem} onClick={() => setAiFilter('saturate(2)')} style={{ cursor: 'pointer' }}>
                <img src="/avatar.png" className={styles.aiAvatarImg} style={{ filter: 'saturate(2)', border: aiFilter === 'saturate(2)' ? '2px solid #8b5cf6' : '' }} />
                Cartoon
              </div>
              <div className={styles.aiAvatarItem} onClick={() => setAiFilter('contrast(1.5) grayscale(1)')} style={{ cursor: 'pointer' }}>
                <img src="/avatar.png" className={styles.aiAvatarImg} style={{ filter: 'contrast(1.5) grayscale(1)', border: aiFilter === 'contrast(1.5) grayscale(1)' ? '2px solid #8b5cf6' : '' }} />
                Pixel Art
              </div>
              <div className={styles.aiAvatarItem} onClick={() => setAiFilter('hue-rotate(90deg)')} style={{ cursor: 'pointer' }}>
                <img src="/avatar.png" className={styles.aiAvatarImg} style={{ filter: 'hue-rotate(90deg)', border: aiFilter === 'hue-rotate(90deg)' ? '2px solid #8b5cf6' : '' }} />
                Anime
              </div>
            </div>
            <button className={styles.btnAi} onClick={() => setAiFilter('none')}>Reset AI Style</button>
          </div>
        </div>

        {/* Central Preview Panel */}
        <div className={styles.previewPanel}>
          <div className={styles.undoRedo}>
            <button className={styles.iconBtn} onClick={resetAll} title="Undo All"><Undo size={18} /></button>
            <button className={styles.iconBtn} title="Redo (Disabled)"><Redo size={18} /></button>
          </div>
          
          <div className={styles.avatarDisplay} style={{ background: getBgColor(selectedBg), transition: 'background 0.3s ease' }}>
            <img 
              src="/avatar.png" 
              alt="Avatar Preview" 
              className={styles.avatarImage} 
              style={{ 
                transform: getAvatarTransform(), 
                filter: getAvatarFilter(), 
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' 
              }} 
            />
          </div>

          <div className={styles.controlsOverlay}>
            <Sun size={18} color="var(--text-secondary)" />
            <input 
              type="range" 
              min="0.5" 
              max="2" 
              step="0.05" 
              value={zoomLevel} 
              onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
              className={styles.slider} 
            />
            <Maximize2 size={18} color="var(--text-secondary)" style={{ cursor: 'pointer' }} onClick={() => setZoomLevel(1)} />
          </div>
        </div>

        {/* Right Panel */}
        <div className={styles.rightPanel}>
          <div className={styles.controlSection}>
            <div className={styles.rightHeader}>
              <span className={styles.rightTitle}>Background</span>
              <span className={styles.seeAll}>See all</span>
            </div>
            <div className={styles.grid4} style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
              {backgrounds.map((_, i) => (
                <div 
                  key={i} 
                  className={`${styles.gridItem} ${selectedBg === i ? styles.active : ''}`}
                  onClick={() => setSelectedBg(i)}
                >
                  <div style={{ width: '100%', height: '100%', background: getBgColor(i) }} />
                  {selectedBg === i && <div className={styles.checkBadge}><Check size={12} /></div>}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.controlSection}>
            <div className={styles.rightHeader}>
              <span className={styles.rightTitle}>Pose</span>
              <span className={styles.seeAll}>See all</span>
            </div>
            <div className={styles.grid3}>
              {poses.map((_, i) => (
                <div 
                  key={i} 
                  className={`${styles.gridItem} ${selectedPose === i ? styles.active : ''}`}
                  onClick={() => setSelectedPose(i)}
                >
                  <img src="/avatar.png" className={styles.gridItemImg} style={{ transform: `scale(${1 + i*0.1})` }} />
                </div>
              ))}
            </div>
          </div>

          <div className={styles.controlSection}>
            <div className={styles.rightHeader}>
              <span className={styles.rightTitle}>Expression</span>
              <span className={styles.seeAll}>See all</span>
            </div>
            <div className={styles.grid3}>
              {expressions.map((_, i) => (
                <div 
                  key={i} 
                  className={`${styles.gridItem} ${selectedExpression === i ? styles.active : ''}`}
                  onClick={() => setSelectedExpression(i)}
                >
                  <img src="/avatar.png" className={styles.gridItemImg} style={{ filter: `hue-rotate(${i * 30}deg)` }} />
                </div>
              ))}
            </div>
          </div>

          <div className={styles.tipCard}>
            <Lightbulb size={20} color="#eab308" style={{ flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
              Tip: Use AI Generate to explore unique styles and outfits!
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
