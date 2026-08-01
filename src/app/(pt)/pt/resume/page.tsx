import { ScreenStub } from '@/components/screen-stub';
import { getDictionary } from '@/lib/i18n';
import { screenMetadata } from '@/lib/metadata';

const t = getDictionary('pt');

export const metadata = screenMetadata('pt', '/resume');

/* Stub until the About & Resume ticket. */
export default function ResumePage() {
  return <ScreenStub title={t.resume.title} subtitle={t.resume.summary} />;
}
