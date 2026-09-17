---
name: oc-design-system
description: OPITZ CONSULTING corporate design system — brand colors, Open Sans typography, spacing/radius/shadow tokens, logo usage, and how to wire them into this Angular project's Tailwind v4 setup. Use whenever styling a page or component for this app, building new UI, or checking that markup matches OC branding (not default Angular/Material/Tailwind styling).
---

# OC Design System

This project must look like an OPITZ CONSULTING (OC) product, not a default
Angular/Tailwind scaffold. The canonical source of truth for the design
system lives outside this repo at:

```
/Users/flxg/Work/OC/cd-2026-09-18/OPITZ CONSULTING Design System/
```

Read files from there directly when you need more than this skill provides
(e.g. `guidelines/*.html` specimens, `components/**/*.jsx` reference
implementations, `assets/icons/*.svg`). This skill packages the tokens
already integrated into `frontend/` and the rules for using them.

## Where the tokens live in this project

- `frontend/src/styles/oc-tokens.css` — OC custom properties + a Tailwind v4
  `@theme` block mapping them to Tailwind utilities (see below).
- `frontend/src/styles.css` — imports `oc-tokens.css` alongside
  `@import 'tailwindcss';`.
- `frontend/public/oc-logo-mark.svg` — the brand logo mark, served as a
  static asset at `/oc-logo-mark.svg`.

If any of these are missing or a new project needs them, recreate them from
the source tokens at `.../OPITZ CONSULTING Design System/tokens/{colors,typography,fonts,spacing,base}.css`
and `.../assets/logos/oc-logo-mark.svg`.

## Brand palette

| Token | Hex | Use |
|---|---|---|
| `--oc-blue` | `#0066E8` | Primary — links, key fills, primary buttons |
| `--oc-navy` | `#003066` | Deep blue — dark surfaces, secondary emphasis |
| `--oc-red` | `#E82000` | Signal red — sparing, high-stakes emphasis only |
| `--oc-ink` | `#313338` | Near-black — body text, dark UI |
| `--oc-white` | `#ffffff` | Page background |

Blue ramp 50→900: `#f3f8fe #e4eefc #c5dcfb #93bef7 #5c9df2 #2f86f0 #0066e8 #0052ba #003f93 #002a5c`
Gray ramp 50→900: `#f8f9fa #f2f3f5 #e7e8ea #d8d9db #c0c0c0 #8a8c90 #606060 #4a4c52 #313338`
Status: success `#1f8a4c`, warning `#e8920a`, danger `#e82000`, info `#0066e8`

Prefer semantic aliases over raw brand colors in components: `--text-primary`,
`--text-secondary`, `--text-muted`, `--surface-page`, `--surface-subtle`,
`--surface-dark`, `--border-subtle`, `--border-default`, `--accent`,
`--accent-hover`, `--signal`.

All colors are plain hex (no OKLCH in the source system) — keep them as hex
when porting into Tailwind's `@theme`.

## Typography

- Brand font: **Open Sans** (weights 300/400/600/700/800), loaded via Google
  Fonts. Fallback stack: `'Open Sans', 'Segoe UI', system-ui, sans-serif`.
- Monospace accent: `'Consolas', 'SF Mono', ui-monospace, monospace`.
- Headings/display text: Open Sans **ExtraBold (800)**, **UPPERCASE**, tight
  letter-spacing (`-0.02em`) — this is the `.oc-display` pattern. Don't use
  bold-but-lowercase for page titles; that reads as generic, not OC.
- Small labels/eyebrows: `.oc-eyebrow` — extrabold, uppercase, wide tracking,
  accent-colored, often paired with the `.oc-hash` `#` prefix motif (e.g.
  `#PLANUNG`, `#TALKS`).
- Body copy: regular 400 / semibold 600 weight, relaxed line-height (1.65).
- Type scale (rem): 2xs .6875 · xs .75 · sm .875 · base 1 · md 1.125 ·
  lg 1.375 · xl 1.75 · 2xl 2.25 · 3xl 3 · 4xl 4 · 5xl 5.5.

## Spacing, radius, shadow, motion

- Spacing scale (4px base): 4, 8, 12, 16, 24, 32, 48, 64, 96px.
- Radii: the brand is rectilinear, not rounded — sm 3px (inputs/tags),
  md 6px (buttons/cards, the default), lg 10px, xl 16px, pill 999px
  (chips/stat bubbles only). Don't default to large rounded corners.
- Shadows: soft, cool-neutral, ink-tinted (`rgba(49,51,56,…)`) — never a
  generic black drop shadow.
- Motion: calm, no bounce/overshoot. Durations 120/200/320ms,
  `cubic-bezier(0.2,0,0,1)` standard ease.

## Logo

- Use `/oc-logo-mark.svg` (served from `frontend/public/`) for the mark.
  Never recolor the signal waves inside it or stretch/distort it.
- On light backgrounds use the default mark; on navy/dark or photo
  backgrounds use a white/reverse tone if the surrounding design system
  provides one (`components/brand/Logo.jsx` shows the `tone="white"` pattern
  — port the same idea to Angular, don't invent a different reversal).

## Voice / visual conventions

- Corporate-tech, clean, geometric, high-contrast, white-dominant with
  blue/navy and sparing red accents.
- The `#` hashtag is a recurring device for section eyebrows.
- Icons: flat, single-color, `currentColor` fills — never emoji, never
  multi-color icon sets.
- German-first content when the app's user-facing copy is German (this
  project's domain language is German per `OVERVIEW.md`).

## Wiring into Tailwind v4 (this project's setup)

This project uses Tailwind v4's CSS-first config (`@import 'tailwindcss'` in
`src/styles.css`, no `tailwind.config.ts`). Expose OC tokens as Tailwind
utilities via an `@theme` block, e.g. in `frontend/src/styles/oc-tokens.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,400;1,600&display=swap');

:root {
  --oc-blue: #0066E8;
  --oc-navy: #003066;
  --oc-red: #E82000;
  --oc-ink: #313338;
  /* ...full ramps/semantic aliases from the source tokens/*.css files */
}

@theme {
  --color-oc-blue: var(--oc-blue);
  --color-oc-navy: var(--oc-navy);
  --color-oc-red: var(--oc-red);
  --color-oc-ink: var(--oc-ink);
  --font-sans: 'Open Sans', 'Segoe UI', system-ui, sans-serif;
  --font-display: 'Open Sans', 'Segoe UI', system-ui, sans-serif;
  --radius-md: 6px;
  --radius-lg: 10px;
}
```

Then import it once from `src/styles.css`:

```css
@import 'tailwindcss';
@import './styles/oc-tokens.css';
```

Use the resulting utilities directly in templates: `bg-oc-blue`,
`text-oc-navy`, `font-sans`, `rounded-md`, etc. Keep `.oc-display` /
`.oc-eyebrow` / `.oc-hash` as small global helper classes (in the same
tokens file or a shared stylesheet) rather than re-deriving them ad hoc per
component, so headings stay consistent across the app.

## When reviewing UI code

Flag as off-brand:
- Default Angular Material or unstyled browser-native controls left as-is.
- Large border-radius (`rounded-xl`/`rounded-full`) on ordinary cards/buttons.
- Black drop shadows or heavy shadows instead of the soft ink-tinted ones.
- Any font stack that isn't Open Sans (or the documented Consolas mono
  accent) for OC-branded surfaces.
- Emoji or multi-color icon sets in place of the flat `currentColor` icon
  style.
