# ADR 0002 — i18n URLs: English at root, Portuguese under /pt/

**Status:** accepted (2026-07-11)

## Context

The design toggles EN/PT client-side on a single URL, which gives the Portuguese
content no URLs of its own. Both languages must be indexable (ADR 0001). English is
the primary audience (international opportunities).

## Decision

English pages live at the root (`/`, `/blog/<slug>`); Portuguese pages live under the
`/pt/` prefix (`/pt/`, `/pt/blog/<slug>`). Every page emits `hreflang` alternates for
its language pair. The header language toggle navigates to the same page in the other
locale (persisting the preference), rather than swapping strings in place.

## Consequences

- Clean unprefixed URLs for the primary language; both languages fully indexed.
- Static generation must enumerate every route twice (en + pt).
- No automatic locale redirect at the root (that would need middleware — ADR 0001);
  visitors land on English and can switch.
