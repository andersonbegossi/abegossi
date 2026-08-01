import { RootDocument } from '@/components/root-document';
import { localeMetadata } from '@/lib/metadata';

/**
 * Root layout for the Portuguese site under `/pt/` (ADR 0002). Two root layouts
 * is what lets each locale declare its own `<html lang>` in a static export —
 * there is no request to switch on.
 */
export const metadata = localeMetadata('pt');

export default function PortugueseLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument locale="pt">{children}</RootDocument>;
}
