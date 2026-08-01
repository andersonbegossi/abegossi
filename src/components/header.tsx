'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getDictionary } from '@/lib/i18n';
import { localeFromPathname, localePath, screenFromPathname } from '@/lib/i18n/locale';
import { LanguageToggle } from './language-toggle';
import { ThemeToggle } from './theme-toggle';
import styles from './header.module.css';

const navScreens = ['/about', '/projects', '/blog', '/resume'] as const;

/**
 * The chrome reads its locale off the URL rather than taking a prop: every
 * screen is routed per locale (ADR 0002), so the pathname already says which
 * language the visitor is reading and no page has to thread it down.
 */
export function Header() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const screen = screenFromPathname(pathname);
  const t = getDictionary(locale);

  const navLabels: Record<(typeof navScreens)[number], string> = {
    '/about': t.nav.about,
    '/projects': t.nav.projects,
    '/blog': t.nav.blog,
    '/resume': t.nav.resume,
  };

  return (
    <header className={styles.header}>
      <nav aria-label="Main" className={styles.nav}>
        <Link href={localePath('/', locale)} aria-label="Home" className={styles.brand}>
          ab<span className={styles.brandDot}>.</span>
        </Link>
        <div className={styles.links}>
          {navScreens.map((navScreen) => (
            <Link
              key={navScreen}
              href={localePath(navScreen, locale)}
              className={styles.link}
              aria-current={navScreen === screen ? 'page' : undefined}
            >
              {navLabels[navScreen]}
            </Link>
          ))}
        </div>
        <LanguageToggle locale={locale} screen={screen} />
        <ThemeToggle locale={locale} />
      </nav>
    </header>
  );
}
