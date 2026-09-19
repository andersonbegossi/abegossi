import { Geist, Geist_Mono } from 'next/font/google';

/* The design loads Geist from Google Fonts; Next.js self-hosts the same families. */
export const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' });

export const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});
