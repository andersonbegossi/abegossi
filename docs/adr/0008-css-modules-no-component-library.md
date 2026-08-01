# ADR 0008 — CSS Modules and no component library

**Status:** accepted (2026-08-01)

## Context

Styling was never explicitly decided — CSS Modules fell out of porting the design
snapshot and then hardened when ADR 0007 cited "the codebase is CSS-Modules-heavy" as a
reason to pick Biome. That is backwards, so the decision is recorded here after the fact.

The default reach for a Next.js project is shadcn/ui: Tailwind, Radix primitives,
`clsx`/`tailwind-merge`/`cva`. Measured against *this* design rather than a generic app,
it does not pay for itself:

- The design's entire interactive surface is 17 `<button>`s, 3 `<input>`s (one search,
  two text/email) and 1 `<textarea>`. There is no dialog, dropdown, popover, combobox,
  tab set or toast in any of the seven screens. Radix's real value — focus trapping,
  roving tabindex, portal-and-dismiss, `aria-modal` wiring — has nothing to attach to.
  Every control the design asks for is a native element that is keyboard-accessible for
  free.
- The token set in `globals.css` is verbatim from the design (`--bg`, `--fg`, `--muted`,
  `--faint`, `--border`, `--card`, `--code`, `--accent-base`, plus a `color-mix` dark
  accent). Adopting shadcn means remapping those onto its
  `background`/`foreground`/`muted`/`card`/`ring` scheme and then overriding component
  defaults back toward the design — cost with no new capability, for visuals that are
  already final.
- The app ships three runtime dependencies (`next`, `react`, `react-dom`) against a
  static export whose stated advantage is TTFB (ADR 0001).

## Decision

Plain CSS Modules. One stylesheet per component or route segment, colocated
(`header.tsx` / `header.module.css`). All colors, spacing and type read from the CSS
custom properties in `src/app/globals.css`; no literal color values outside that file.
No component library and no utility-CSS framework.

If a component that renders over the page and manages focus ever appears — an image
lightbox, a menu-style filter — add that one Radix primitive directly
(`@radix-ui/react-dialog`) and style it with a CSS Module. That is a per-component
dependency, not an adoption of Tailwind or a token migration.

## Consequences

- Styling stays lintable: Biome checks CSS (ADR 0007), which it could not do if styles
  moved into Tailwind class strings.
- Every style is written by hand against the design, so fidelity is high and there are no
  framework defaults to fight — but also no defaults to fall back on.
- In particular, the design snapshot contains **no media queries at all**, so it supplies
  no small-screen guidance and none is inherited from a framework. Responsive rules are
  ours to author screen by screen. The first instance was the header, measured in
  same-origin iframes at fixed widths: every nav label is a single word, so the links
  could not shrink, and below 375px they painted outside their flex item and overlapped
  the theme toggle by exactly `375 - viewport` pixels (55px at 320, 15px at 360). Nothing
  flagged it — the page's `scrollWidth` never exceeded the viewport, so there was no
  horizontal scrollbar and no test could see it, since jsdom does not lay out. Fixed by
  making the link row a scroll container (`overflow-x: auto`, `min-width: 0`) with a
  masked trailing edge as the scroll affordance. At exactly 375px this now clips the last
  ~5px of "Resume" into the fade, where before it borrowed the flex gap — accepted, since
  the alternative is altering the design's link padding.
- Layout regressions of that kind are invisible to the test suite. Verifying a styling
  change means rendering it at real widths in a browser, not running `vitest`.
- No generated component API or docs site. Shared UI is discovered by reading
  `src/components/`, which is fine at this size and would not be at ten times it.
- This ADR is about a seven-screen portfolio with finished visuals. It is not a general
  verdict on shadcn, and a future product-shaped app in this repo would deserve its own
  decision.
