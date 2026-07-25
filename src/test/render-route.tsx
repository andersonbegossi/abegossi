import type { ReactElement } from 'react';
import { render, type RenderResult } from '@testing-library/react';
import { SiteShell } from '@/components/site-shell';
import { setTestPathname } from './router';

/**
 * The route-render seam (spec, Testing Decisions): render a page inside the same
 * chrome the layout wraps it in, then assert on what a visitor would see. Tests
 * never reach for component internals.
 */
export function renderRoute(page: ReactElement, pathname = '/'): RenderResult {
  setTestPathname(pathname);
  return render(<SiteShell>{page}</SiteShell>);
}
