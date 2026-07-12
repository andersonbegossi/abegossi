# ADR 0005 — Hosting on Vercel

**Status:** accepted (2026-07-11)

## Context

Static Next.js output (ADR 0001) can be hosted anywhere; the trade-off is workflow.
A custom domain will be bought later (begossi.dev currently has no DNS).

## Decision

Deploy on Vercel's free tier, connected to `github.com/andersonbegossi/abegossi`.
Pushes to `main` deploy production; PRs get preview URLs. The canonical base URL is a
single site-config constant so attaching the purchased domain is a config change plus
Vercel dashboard step.

## Consequences

- Zero-config deploys and per-PR previews.
- Canonical URLs, `hreflang`, sitemap and robots all read the base-URL constant —
  nothing else may hardcode the host.
- Until the domain purchase, the public URL is `<project>.vercel.app`.
