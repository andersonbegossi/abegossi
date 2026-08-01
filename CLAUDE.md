# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# abegossi

begossi.dev — Anderson Begossi's portfolio and technical blog. Next.js App Router, fully
statically exported.

## Commands

```bash
npm run dev              # Next dev server
npm run build            # static export into out/
npm run typecheck        # tsc --noEmit (also runs in the pre-commit hook)
npm test                 # vitest run
npm run test:watch
npm run check            # biome lint + format check
npm run check:fix        # biome autofix (what lint-staged runs on commit)
```

Single test file / single case:

```bash
npx vitest run src/app/page.test.tsx
npx vitest run -t 'introduces Anderson'
```

Commits must follow Conventional Commits (commitlint, 72-char header) — `.husky/commit-msg`
enforces it, and `.husky/pre-commit` runs lint-staged plus `typecheck`.

## Read before working

- `CONTEXT.md` — glossary (Screen, Locale, Post, Project card, Accent), fixed facts, and the
  **link policy**. Read it before adding any user-visible link or naming a domain concept.
- `docs/adr/0001`–`0008` — the binding decisions (static export, i18n URL shape, MDX blog,
  Formspree contact, Vercel, trailing-slash URLs, Biome, CSS Modules). Surface a conflict
  explicitly instead of silently overriding an ADR.
- `docs/design/portfolio.dc.html` — the design snapshot this site implements faithfully.
  Tokens, copy and layout come from it verbatim; it is excluded from Biome.

## Architecture

**Static export is a hard constraint.** `next.config.ts` sets `output: 'export'`,
`trailingSlash: true`, `images.unoptimized`. No route handlers, no server actions, no runtime
server features — anything dynamic must be client-side or a third-party endpoint (hence
Formspree for contact, ADR 0004).

**Single source of truth per concern:**

- `src/lib/site-config.ts` — every host-dependent value and external URL. Nothing else may
  hardcode the host; attaching the real domain must stay a one-line change.
- `src/lib/i18n/en.ts` — all UI chrome strings, copied verbatim from the design. Components
  never inline user-visible copy. A `pt` counterpart arrives with the Portuguese locale.
- `src/lib/data/projects.ts` — project cards, with the link policy already applied.
- `src/app/globals.css` — the light/dark token set (`--bg`, `--fg`, `--muted`, `--faint`,
  `--border`, `--card`, `--code`, `--accent`). Component styles are CSS Modules that consume
  these tokens; no component library (ADR 0008).

**Chrome and theming:** `SiteShell` (header + main + footer) is deliberately outside
`layout.tsx` so tests can render a route in its real surroundings without an `<html>`
document. Theme is `data-theme` on `<html>`: `src/lib/theme.ts` exports both the runtime
helpers and `themeInitScript`, a blocking inline script in `<head>` that sets the attribute
before first paint. The two must stay in sync — changing resolution logic means changing both.

**Screens:** each of the seven designed screens is a routed page. Screens whose ticket hasn't
landed render `ScreenStub` so every link the header exposes already resolves. Replace the stub
wholesale when implementing that screen.

## Testing

Vitest + jsdom + Testing Library. Tests render through the `renderRoute` seam
(`src/test/render-route.tsx`), which wraps the page in `SiteShell` and sets the pathname for
the `next/navigation` mock installed in `vitest.setup.ts`. Assert on what a visitor sees
(roles, visible text, real hrefs); do not reach for component internals.

## Agent skills

### Issue tracker

Issues live in this repo's GitHub Issues (andersonbegossi/abegossi), via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Default labels: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `CONTEXT.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.
