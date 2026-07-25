'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { en } from '@/lib/i18n/en';
import { ThemeToggle } from './theme-toggle';
import styles from './header.module.css';

const navItems = [
  { href: '/about', label: en.nav.about },
  { href: '/projects', label: en.nav.projects },
  { href: '/blog', label: en.nav.blog },
  { href: '/resume', label: en.nav.resume },
] as const;

/**
 * The design's language toggle is deliberately absent until the Portuguese
 * locale exists — a visible control must lead somewhere (CONTEXT.md link policy).
 */
export function Header() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className={styles.header}>
      <nav aria-label="Main" className={styles.nav}>
        <Link href="/" aria-label="Home" className={styles.brand}>
          ab<span className={styles.brandDot}>.</span>
        </Link>
        <div className={styles.links}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.link}
              aria-current={isActive(item.href) ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <ThemeToggle />
      </nav>
    </header>
  );
}
