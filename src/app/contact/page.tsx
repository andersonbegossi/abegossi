import { ScreenStub } from '@/components/screen-stub';
import { en } from '@/lib/i18n/en';

/* Stub until the Contact ticket wires the Formspree form. */
export default function ContactPage() {
  return <ScreenStub title={en.contact.title} subtitle={en.contact.subtitle} />;
}
