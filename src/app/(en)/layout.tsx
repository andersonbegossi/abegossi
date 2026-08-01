import { RootDocument } from '@/components/root-document';
import { localeMetadata } from '@/lib/metadata';

/**
 * Root layout for the English site, served at the URL root (ADR 0002). It is a
 * route group rather than a path segment, so `(en)/about` is `/about`.
 */
export const metadata = localeMetadata('en');

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
