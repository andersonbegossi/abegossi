import { vi } from 'vitest';

/**
 * jsdom ships no `matchMedia`, and the theme asks it for the OS preference.
 * `vitest.setup.ts` installs the light-preference stub for every test; a test
 * that cares about the dark preference re-stubs with `prefersDark: true`.
 */
export function stubMatchMedia({ prefersDark = false } = {}): void {
  vi.stubGlobal(
    'matchMedia',
    vi.fn((query: string) => ({
      matches: prefersDark && query.includes('prefers-color-scheme: dark'),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  );
}
