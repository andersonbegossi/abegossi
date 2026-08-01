import { RootDocument } from '@/components/root-document';
import { ScreenStub } from '@/components/screen-stub';
import { getDictionary } from '@/lib/i18n';
import { defaultLocale } from '@/lib/i18n/locale';
import { localeMetadata } from '@/lib/metadata';

/**
 * One root layout per locale (ADR 0002) means no root layout is left to wrap
 * the 404, so it renders the document itself — `global-not-found` is the file
 * convention for exactly that. Without it a 404 arrives with no `lang`, no
 * theme script and no chrome. A static export serves one 404 for both locales,
 * so it speaks the default one.
 */
export const metadata = localeMetadata(defaultLocale);

export default function GlobalNotFound() {
  const t = getDictionary(defaultLocale);

  return (
    <RootDocument locale={defaultLocale}>
      <ScreenStub title={t.notFound.title} subtitle={t.notFound.subtitle} />
    </RootDocument>
  );
}
