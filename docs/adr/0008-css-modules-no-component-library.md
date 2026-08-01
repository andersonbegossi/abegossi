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
  ours to author screen by screen. The header is the open case: `header.module.css` is a
  `flex-wrap: nowrap` row holding brand, four nav links and the theme toggle, with no
  breakpoint — narrow viewports are unverified.
- No generated component API or docs site. Shared UI is discovered by reading
  `src/components/`, which is fine at this size and would not be at ten times it.
- This ADR is about a seven-screen portfolio with finished visuals. It is not a general
  verdict on shadcn, and a future product-shaped app in this repo would deserve its own
  decision.
