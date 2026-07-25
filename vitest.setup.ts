import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach, vi } from 'vitest';
import { stubMatchMedia } from './src/test/match-media';

/**
 * Tests render routes directly rather than through the Next.js router, so the
 * chrome reads its pathname from the store `renderRoute` writes to.
 */
vi.mock('next/navigation', async () => {
  const { getTestPathname } = await import('./src/test/router');
  return { usePathname: () => getTestPathname() };
});

beforeEach(() => {
  stubMatchMedia();
});

afterEach(() => {
  cleanup();
  localStorage.clear();
  document.documentElement.removeAttribute('data-theme');
  vi.unstubAllGlobals();
});
