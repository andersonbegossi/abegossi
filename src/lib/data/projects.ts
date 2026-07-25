export type Project = {
  slug: string;
  name: string;
  desc: string;
  tech: readonly string[];
  /** Link policy (CONTEXT.md): omitted while the repository is not public. */
  github?: string;
  /** Omitted while nothing is actually deployed at the target. */
  live?: string;
};

/**
 * Copied from the design snapshot's `projectItems`, with the link policy applied:
 * `stewart-acid-base`, `voce-mais-saude` and `rn-monorepo-starter` are not public,
 * so their GitHub buttons are dropped; the design's placeholder apps.apple.com
 * "Live" link is dropped; begossi.dev links to this repository, and gets no Live
 * link until the domain is purchased.
 */
export const projectsEn: readonly Project[] = [
  {
    slug: 'stewart-acid-base',
    name: 'Stewart Acid-Base',
    desc: 'Clinical decision-support app that applies Stewart’s physicochemical model to acid-base analysis, giving healthcare professionals reliable bedside calculations.',
    tech: ['React Native', 'TypeScript'],
  },
  {
    slug: 'voce-mais-saude',
    name: 'Você + Saúde',
    desc: 'Health-tracking mobile app with a companion Node.js backend — habits, vitals and progress in one place.',
    tech: ['React Native', 'Node.js', 'AdonisJS'],
  },
  {
    slug: 'rn-monorepo-starter',
    name: 'RN Monorepo Starter',
    desc: 'Production-ready React Native template: monorepo layout, shared UI package, theming, testing and CI configured out of the box.',
    tech: ['Expo', 'Turborepo', 'TypeScript'],
  },
  {
    slug: 'begossi-dev',
    name: 'begossi.dev',
    desc: 'This website — a bilingual, themeable portfolio and technical blog focused on typography and performance.',
    tech: ['Next.js', 'MDX', 'i18n'],
    github: 'https://github.com/andersonbegossi/abegossi',
  },
];

/** The two cards the Home screen previews under "Selected work". */
export const featuredProjectsEn = projectsEn.slice(0, 2);
