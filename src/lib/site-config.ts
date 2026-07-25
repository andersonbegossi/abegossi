/**
 * Every host-dependent value lives here (ADR 0005): canonical URLs, hreflang,
 * sitemap and robots read `baseUrl` and nothing else may hardcode the host, so
 * attaching begossi.dev later is a one-line change.
 */
export const siteConfig = {
  /** Provisional until the custom domain is purchased and attached in Vercel. */
  baseUrl: 'https://abegossi.vercel.app',
  author: 'Anderson Begossi',
  email: 'andersonbegossi@gmail.com',
  github: 'https://github.com/andersonbegossi',
  linkedin: 'https://linkedin.com/in/andersonbegossi-b5065a130',
  /** No `url`: the design's bamse.com.br does not resolve (link policy, CONTEXT.md). */
  employer: { name: 'Bamse' },
  resumePdf: '/Anderson-Begossi-Resume.pdf',
  resumeFileName: 'Anderson-Begossi-Resume.pdf',
  heroPhoto: '/hero-photo.webp',
} as const;
