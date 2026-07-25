import { ScreenStub } from '@/components/screen-stub';
import { en } from '@/lib/i18n/en';

/* Stub until the About & Resume ticket. */
export default function ResumePage() {
  return <ScreenStub title={en.resume.title} subtitle={en.resume.summary} />;
}
