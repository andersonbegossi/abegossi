import type { ReactNode } from 'react';
import { Header } from './header';
import { Footer } from './footer';
import styles from './site-shell.module.css';

/**
 * The chrome every route renders inside. Kept out of `layout.tsx` so tests can
 * render a route in its real surroundings without an `<html>` document.
 */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className={styles.shell}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}
