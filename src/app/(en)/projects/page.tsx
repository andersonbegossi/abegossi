import { ScreenStub } from '@/components/screen-stub';
import { getDictionary } from '@/lib/i18n';
import { screenMetadata } from '@/lib/metadata';

const t = getDictionary('en');

export const metadata = screenMetadata('en', '/projects');

/* Stub until the Projects ticket. */
export default function ProjectsPage() {
  return <ScreenStub title={t.projects.title} subtitle={t.projects.subtitle} />;
}
