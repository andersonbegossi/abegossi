'use client';

import { useEffect, useState } from 'react';
import { applyTheme, resolveInitialTheme, storeTheme, type Theme } from '@/lib/theme';
import styles from './theme-toggle.module.css';

/**
 * The label names the theme you would switch *to*. Both labels are rendered and
 * CSS picks one from `:root[data-theme]`, so the button never shows a stale
 * label in the moment between the pre-hydration script and hydration. The
 * accessible name stays constant, so only the visible glyph swaps.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const initial = resolveInitialTheme();
    setTheme(initial);
    applyTheme(initial);
  }, []);

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    applyTheme(next);
    storeTheme(next);
  }

  return (
    <button type="button" onClick={toggle} aria-label="Toggle theme" className={styles.toggle}>
      <span className={styles.whenLight}>DARK</span>
      <span className={styles.whenDark}>LIGHT</span>
    </button>
  );
}
