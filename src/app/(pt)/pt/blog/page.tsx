import { ScreenStub } from '@/components/screen-stub';
import { getDictionary } from '@/lib/i18n';
import { screenMetadata } from '@/lib/metadata';

const t = getDictionary('pt');

export const metadata = screenMetadata('pt', '/blog');

/* Stub until the blog content pipeline ticket. */
export default function BlogPage() {
  return <ScreenStub title={t.blog.title} subtitle={t.blog.subtitle} />;
}
