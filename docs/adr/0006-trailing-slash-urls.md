# ADR 0006 — Directory-style URLs with a trailing slash

**Status:** accepted (2026-07-25)

## Context

The static export (ADR 0001) can emit either `out/about.html` or
`out/about/index.html`. The two shapes give a page two possible URLs — `/about`
and `/about/` — and canonical tags, `hreflang` alternates and the sitemap must
all agree on exactly one of them (ADR 0002, ADR 0005). Picking the shape after
those are built means rewriting them.

## Decision

`trailingSlash: true` in `next.config.ts`. Every route exports as
`<route>/index.html` and its canonical URL ends in a slash: `/`, `/about/`,
`/pt/blog/<slug>/`.

## Consequences

- One canonical URL shape; canonical, `hreflang`, sitemap and internal `<Link>`
  hrefs all agree without special-casing.
- Serves correctly from any static host that resolves a directory to
  `index.html`, not just Vercel — the export stays portable.
- Hand-written links must include the trailing slash, or the host issues an extra
  redirect. `next/link` adds it automatically.
