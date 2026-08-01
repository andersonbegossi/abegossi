'use client';

import { useEffect, useState } from 'react';
import { getDictionary } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n/locale';
import { applyTheme, resolveInitialTheme, storeTheme, type Theme } from '@/lib/theme';
import styles from './toggle.module.css';

/**
 * The label names the theme you would switch *to*. Both labels are rendered and
 * CSS picks one from `:root[data-theme]`, so the button never shows a stale
 * label in the moment between the pre-hydration script and hydration. The
 * accessible name stays constant, so only the visible glyph swaps.
 */
export function ThemeToggle({ locale }: { locale: Locale }) {
  const [theme, setTheme] = useState<Theme>('light');
  const t = getDictionary(locale);

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
    <button
      type="button"
      onClick={toggle}
      aria-label={t.a11y.toggleTheme}
      className={styles.toggle}
    >
      <span className={styles.whenLight}>{t.theme.dark}</span>
      <span className={styles.whenDark}>{t.theme.light}</span>
    </button>
  );
}
