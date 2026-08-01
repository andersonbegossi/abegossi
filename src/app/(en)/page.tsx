import { HomeScreen } from '@/components/home-screen';
import { screenMetadata } from '@/lib/metadata';

export const metadata = screenMetadata('en', '/');

export default function HomePage() {
  return <HomeScreen locale="en" />;
}
