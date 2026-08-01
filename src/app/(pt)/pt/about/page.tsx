import { ScreenStub } from '@/components/screen-stub';
import { getDictionary } from '@/lib/i18n';
import { screenMetadata } from '@/lib/metadata';

const t = getDictionary('pt');

export const metadata = screenMetadata('pt', '/about');

/* Stub until the About & Resume ticket. */
export default function AboutPage() {
  return <ScreenStub title={t.about.title} />;
}
