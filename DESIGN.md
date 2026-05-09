---
name: Thomas Burridge Portfolio
description: Senior-operator portfolio in cool achromatic dark, no accent color.
colors:
  background: "oklch(0.16 0.008 240)"
  foreground: "oklch(0.95 0.005 220)"
  surface-lift: "oklch(0.21 0.010 240)"
  muted-foreground: "oklch(0.72 0.010 220)"
  hairline: "oklch(0.30 0.012 240)"
  destructive: "oklch(0.62 0.16 18)"
typography:
  display:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "clamp(1.875rem, 4.2vw, 3.25rem)"
    fontWeight: 300
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)"
    fontWeight: 300
    lineHeight: 1.1
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
  caption:
    fontFamily: "Geist Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    letterSpacing: "0.18em"
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
components:
  button-primary:
    backgroundColor: "{colors.foreground}"
    textColor: "{colors.background}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.foreground}"
    textColor: "{colors.background}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    padding: "0"
  input-text:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    padding: "0 0 8px 0"
---

# Design System: Thomas Burridge Portfolio

## 1. Overview

**Creative North Star: "The Plate"**

A printing plate, inked but unrolled. A single deep cool surface, ink the colour of pale paper, no decoration. The system holds because typography and weight do all the work. Translated to a portfolio: a founder lands cold, reads the page like a quiet specimen sheet, and acts because the substance is convincing, not because anything is being sold to them.

The system is **dark-only** (no theme toggle) and **achromatic** (no accent color). The tint hue is cool (220–240); every neutral leans imperceptibly toward blue rather than warmth. This is a deliberate departure from the previous warm "Night Edition" palette, and from the editorial-dark + serif lane in general, which is currently saturated across senior-operator landing pages.

Density is moderate, leaning generous. Hierarchy is carried by type scale and weight only; chrome (shadows, gradients, badges) is forbidden by default. Motion is restrained, present only as a response to user state.

**Key Characteristics:**
- Single deep cool surface, pale cool type, no accent.
- One theme (dark). No light variant, no toggle.
- Hue tint stays cool (220–240), low chroma (≤0.012).
- State-only motion: hover, focus. No entrance choreography.
- WCAG 2.2 AA contrast on every interactive surface.

## 2. Colors: The Plate Palette

A cool achromatic system. Hierarchy is contrast and weight, not hue.

### Neutral
- **Plate** (`oklch(0.16 0.008 240)`): The dominant page surface. Cool deep ink, never `#000`. Reads as a coated metal plate viewed in cool light.
- **Plate Lift** (`oklch(0.21 0.010 240)`): Secondary surface for in-page elevation (project images, contact card if needed). Used sparingly; lifting is a tool, not a default.
- **Page Cream** (`oklch(0.95 0.005 220)`): Body text and CTA fills. Soft cool white, never `#fff`.
- **Page Cream Muted** (`oklch(0.72 0.010 220)`): Secondary body text, captions, metadata. Always ≥4.5:1 against Plate.
- **Hairline** (`oklch(0.30 0.012 240)`): Dividers and 1px borders only.

### Semantic (rare)
- **Destructive** (`oklch(0.62 0.16 18)`): Cool-leaning crimson. Reserved exclusively for inline error messages (form validation, network failures). Never decorative, never used outside of error semantics.

### Named Rules

**The No-Accent Rule.** There is no accent color. Status indicators, link borders, primary CTA fills, focus rings, and the available-for-work dot all live in the foreground/muted greyscale. If a designer feels tempted to introduce a hue for emphasis, that pressure is the cue to introduce a typographic move (weight, scale, italic) instead.

**The Cool-Tint-Only Rule.** Every neutral carries a cool tint (hue 220–240, chroma ≤0.012). Warm neutrals (hue 30–80) are forbidden. Pure cool grey at chroma 0 is also forbidden because it reads as the generic-dev-portfolio default; the slight cool tint is what gives the system its character.

**The Greyscale Status Rule.** The "Available for new work" indicator is a filled dot in foreground (`Page Cream`), not a coloured pill. The "Currently full" state uses the muted-foreground colour. Status reads through label, not hue.

## 3. Typography

**Display Font:** Source Serif 4 (with Georgia, serif fallback).
**Body Font:** Geist Sans (with system sans-serif fallback).
**Label/Mono Font:** Geist Mono (used for project numbers, year metadata, eyebrow labels).

**Character:** A serif that knows how to be quiet, paired with a sans that reads as a senior engineer's notebook. Cool achromatic surface lets type carry full weight; without an accent color, the type *is* the brand.

### Hierarchy
- **Display** (light, `clamp(1.875rem, 4.2vw, 3.25rem)`, line-height 1.15): Hero positioning sentence, single instance per page. Large but not heroic.
- **Headline** (light, `clamp(1.75rem, 3.5vw, 2.75rem)`, line-height 1.1): Section openers (Selected Work, About, Contact email).
- **Title** (light, `clamp(1.5rem, 2.5vw, 2rem)`, line-height 1.15): Project titles in text-only entries.
- **Body** (regular, `1.0625rem`, line-height 1.55, max line-length 65–75ch): Project narratives, about copy.
- **Caption / Label** (mono, `0.75rem`, letter-spacing 0.18em, uppercase): Eyebrow labels, project numbers, metadata.

Steps must hold a ratio of at least 1.25 between adjacent levels. Flat scales are forbidden.

### Named Rules
**The Italic-As-Emphasis Rule.** The role highlight in About is set in serif italic at headline scale. Without an accent color, italic is the system's only honest emphasis device. Reserve it for moments that earn it (one or two per page maximum).

**The 65ch Rule.** Body copy is capped at 65–75 characters per line at default zoom. Wider columns are forbidden; they break the reading rhythm the serif depends on.

## 4. Elevation

The system is flat by default. Surfaces sit at the page level; depth is conveyed by type scale, whitespace, and the rare use of `Plate Lift` for a single in-page block.

### Shadow Vocabulary
None at rest. A focus ring (Page Cream Muted at 2px outset) is the only halo permitted, and only on `:focus-visible`.

### Named Rules
**The Flat-By-Default Rule.** No drop shadows on cards, headers, modals, or buttons at rest. Depth is type and contrast.

**The Earned Lift Rule.** A surface may lift to `Plate Lift` only when it carries a different functional role from the page (e.g. a project image container, a code block). Decorative lifting is forbidden.

## 5. Components

### Buttons
- **Shape:** Subtle radius (~8px). No pill, no square corners.
- **Primary:** `Page Cream` fill, `Plate` label. Used at most once per visible region (the send-message CTA in contact). Padding generous (~`12px 24px`).
- **Ghost (default for links and inline CTAs):** Transparent fill, `Page Cream` label, hairline underline that shifts darker on hover.
- **Hover:** Slight darken on background-color (200ms, ease-out-quart). No hue shift; opacity-based, not colour-based.
- **Focus-visible:** 2px `Page Cream Muted` outline at 2px offset.
- **Forbidden:** Coloured fills, gradient fills, oversized "GET STARTED" calls-to-action, animated arrow chevrons that translate-on-hover by more than 3px.

### Cards (use sparingly; nested cards are absolutely forbidden)
- **Corner Style:** Subtle radius (~8–10px) when used.
- **Background:** Page surface OR `Plate Lift` only; never both layered.
- **Shadow Strategy:** None.
- **Border:** Hairline at 1px when separation is needed; otherwise rely on whitespace.
- **Internal Padding:** Generous (~`28px–40px`).
- **Forbidden:** Side-stripe accents (left/right border > 1px). Identical project cards in a 2-up or 3-up grid: the project list varies in shape and weight, it does not march.

### Inputs / Fields
- **Style:** Transparent background, hairline 1px bottom-border only (no full box). No inner shadow.
- **Focus:** Bottom-border shifts to `Page Cream`. No glow, no scale, no hue shift.
- **Error:** Border becomes `Destructive` (oklch 0.62 0.16 18); inline error message appears below the field in `Destructive`. Error state is the only place this hue appears.

### Navigation
- **Style:** Inline text links, `Page Cream Muted` at rest, `Page Cream` on hover. No underlines except on `:focus-visible`.
- **Mobile:** A simple sheet menu with serif links at display scale. No hamburger animation theatre.

### Signature: The Project List
The project section is the single highest-stakes component. The hero entry (project 01) carries a screenshot in the right column on desktop; remaining entries (02–06) are pure stacked editorial text blocks. Each entry presents a small mono number, a serif title, problem-and-outcome paragraphs, a metadata row (year · role · stack as plain text, no badges), and discreet Visit / Code links. Entries vary slightly in scale; they do not march in identical card grids. This is the component that most directly carries the "show, not tell" principle from PRODUCT.md.

## 6. Do's and Don'ts

### Do:
- **Do** use OKLCH values for every color. Tint every neutral toward cool (chroma ≤0.012, hue 220–240); never `#000` or `#fff`.
- **Do** keep the page achromatic. The only hue allowed is `Destructive`, used only in error states.
- **Do** lead each project with one outcome sentence a non-engineer can parse in fifteen seconds.
- **Do** vary spacing for rhythm. Generous around hero and section openers, tighter inside reading blocks.
- **Do** honor `prefers-reduced-motion` for all decorative motion. State changes (hover, focus) remain.
- **Do** ship a visible focus ring on every interactive element.

### Don't:
- **Don't** introduce an accent colour anywhere on the page. No oxblood, no neon, no muted sage, no gold. The discipline IS the brand.
- **Don't** use warm neutrals (hue 30–80). The previous warm "Night Edition" palette was retired on purpose; warm tints break the system.
- **Don't** ship the **generic dev portfolio** lane (PRODUCT.md anti-reference): cool-grey neutrals plus one neon accent, terminal-styled typing-cursor hero, decorative 3D globe, identical project-card grids, skill matrices with percentage bars.
- **Don't** ship the **agency / SaaS marketing** lane: gradient CTAs, hero-metric template, testimonial cards, oversized "GET STARTED" buttons.
- **Don't** use side-stripe borders (left/right border > 1px as a coloured accent). Replace with full borders, background tints, or nothing.
- **Don't** use `background-clip: text` gradients on headings or display type. A single solid color always.
- **Don't** use glassmorphism (backdrop-filter blur cards) decoratively.
- **Don't** use modals as a first thought; exhaust inline and progressive alternatives.
- **Don't** use em dashes or `--` in copy. Commas, colons, semicolons, periods, parentheses.
- **Don't** restate a heading in the paragraph below it. No agency-speak ("we build exceptional digital experiences"). No exclamation points.
- **Don't** animate CSS layout properties. Transform and opacity only; ease out with exponential curves (ease-out-quart / quint / expo).
- **Don't** add a theme toggle. The system is dark-only on purpose.
