import type { ReactNode } from 'react';
import { geist, geistMono } from '@/lib/fonts';
import { htmlLang, type Locale } from '@/lib/i18n/locale';
import { themeInitScript } from '@/lib/theme';
import { SiteShell } from './site-shell';
import '@/app/globals.css';

/**
 * The `<html>` document both root layouts render. Each locale needs its own
 * root layout to declare its own `lang` (ADR 0002), and this is the body they
 * share so the two cannot drift apart.
 */
export function RootDocument({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    /* The theme script rewrites `data-theme` before React hydrates. */
    <html
      lang={htmlLang[locale]}
      className={`${geist.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* In <head>, so `data-theme` is set before the stylesheet can paint the
            light tokens — anywhere later leaves a window for a flash. */}
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: the no-flash theme script
            must run before hydration, so it cannot be a React component. Its content is a
            build-time constant from src/lib/theme.ts — no user input reaches it. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
