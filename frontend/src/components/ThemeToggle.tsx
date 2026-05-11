'use client';

import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import styles from '../app/page.module.css';

export function ThemeToggle() {
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  if (!mounted) {
    return (
      <button className={styles.actionBtn} aria-label="Toggle Theme">
        <Moon size={18} />
      </button>
    );
  }

  return (
    <button className={styles.actionBtn} onClick={toggleTheme} aria-label="Toggle Theme">
      {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
}
