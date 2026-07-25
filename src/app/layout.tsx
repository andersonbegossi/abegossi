import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { SiteShell } from '@/components/site-shell';
import { en } from '@/lib/i18n/en';
import { siteConfig } from '@/lib/site-config';
import { themeInitScript } from '@/lib/theme';
import './globals.css';

/* The design loads Geist from Google Fonts; Next.js self-hosts the same families. */
const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.baseUrl),
  title: `${siteConfig.author} — ${en.home.role}`,
  description: en.home.bio,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    /* The theme script rewrites `data-theme` before React hydrates. */
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        {/* In <head>, so `data-theme` is set before the stylesheet can paint the
            light tokens — anywhere later leaves a window for a flash. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
