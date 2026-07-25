/**
 * Backing store for the `next/navigation` mock installed in `vitest.setup.ts`.
 * `renderRoute` sets the pathname so the rendered chrome sees the same URL the
 * visitor would be on.
 */
let pathname = '/';

export function setTestPathname(next: string): void {
  pathname = next;
}

export function getTestPathname(): string {
  return pathname;
}
