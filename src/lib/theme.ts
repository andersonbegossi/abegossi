export type Theme = 'light' | 'dark';

/** Storage key carried over from the design prototype. */
export const THEME_STORAGE_KEY = 'ab-theme';

function isTheme(value: unknown): value is Theme {
  return value === 'light' || value === 'dark';
}

function osPrefersDark(): boolean {
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  } catch {
    return false;
  }
}

export function readStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(stored) ? stored : null;
  } catch {
    return null;
  }
}

/** A stored choice wins; otherwise follow the OS. */
export function resolveInitialTheme(): Theme {
  return readStoredTheme() ?? (osPrefersDark() ? 'dark' : 'light');
}

export function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
}

export function storeTheme(theme: Theme): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Private-mode browsers reject writes; the theme still applies for this visit.
  }
}

/**
 * Mirrors `resolveInitialTheme` + `applyTheme` as a blocking inline script. It
 * runs before the first paint so the correct token set is in place immediately —
 * without it the page paints light and then snaps to dark.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t!=='dark'&&t!=='light'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='light'}})()`;
