import type { Metadata } from 'next';
import { getDictionary } from './i18n';
import { htmlLang, localePath, type Locale } from './i18n/locale';
import { siteConfig } from './site-config';

/** Title and description for a locale's root layout — inherited by its pages. */
export function localeMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale);

  return {
    metadataBase: new URL(siteConfig.baseUrl),
    title: `${siteConfig.author} — ${t.home.role}`,
    description: t.home.bio,
  };
}

/**
 * Canonical URL and the `hreflang` pair for one screen (ADR 0002). Every page
 * exports this for its own screen path — the layout cannot, since it would then
 * claim the same canonical URL for every page underneath it.
 */
export function screenMetadata(locale: Locale, screen: string): Metadata {
  return {
    alternates: {
      canonical: url(screen, locale),
      languages: {
        [htmlLang.en]: url(screen, 'en'),
        [htmlLang.pt]: url(screen, 'pt'),
        /** No locale redirect at the root (ADR 0002), so English is the default. */
        'x-default': url(screen, 'en'),
      },
    },
  };
}

/** The site publishes directory-style URLs (ADR 0006), so canonicals end in a slash. */
function url(screen: string, locale: Locale): string {
  const path = localePath(screen, locale);
  return path.endsWith('/') ? path : `${path}/`;
}
