import { ScreenStub } from '@/components/screen-stub';
import { en } from '@/lib/i18n/en';

/* Stub until the blog content pipeline ticket. */
export default function BlogPage() {
  return <ScreenStub title={en.blog.title} subtitle={en.blog.subtitle} />;
}
