import React from 'react';
import multiavatar from '@multiavatar/multiavatar';

export function hexToHSL(hex: string) {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;

  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0;

  if (max !== min) {
    let d = max - min;
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return h * 360;
}

export function getAvatarHue(seed: string): number {
  try {
    const svg = multiavatar(seed);
    const match = svg.match(/style="fill:(#[0-9a-fA-F]{6});"/);
    if (match) {
      return hexToHSL(match[1]);
    }
  } catch (e) {
    // ignore
  }
  return 0;
}

interface AvatarProps {
  username: string;
  size?: number;
  className?: string;
  src?: string;
}

export function Avatar({ username, size = 120, className = '', src }: AvatarProps) {
  if (src) {
    return (
      <div
        className={`avatar-container ${className}`}
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          overflow: 'hidden',
          boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.2), 0 0 0 2px rgba(255, 255, 255, 0.8)',
          background: '#f8fafc',
          flexShrink: 0,
        }}
      >
        <img src={src} alt={username} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
      </div>
    );
  }

  // Generate the SVG string
  const svgCode = multiavatar(username);

  return (
    <div
      className={`avatar-container ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',
        boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.2), 0 0 0 2px rgba(255, 255, 255, 0.8)',
        background: '#f8fafc',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease',
      }}
      dangerouslySetInnerHTML={{ __html: svgCode }}
    />
  );
}
