# Architecture Decision Records (DECISIONS.md)

This document contains the Architecture Decision Records (ADRs) for the JULZ project. It outlines the rationale, context, and consequences of critical technical and design choices.

---

## ADR 1: Structural Renaming of Portfolio to "The Hold"

### Context
The term "portfolio" is associated with a transactional, corporate playbook focused on showcasing credentials to win contracts. JULZ operates as a sovereign R&D forge and holding company. Creations must be treated as covenants to be managed, funded, and protected from speculative market pressures over long horizons.

### Decision
We executed a complete structural renaming:
1. Renamed directory `content/portfolio/` to `content/hold/`.
2. Renamed layouts `layouts/_default/portfolio.html` to `hold.html`.
3. Renamed partials `layouts/partials/portfolio_section.html` to `hold_section.html` and `portfolio_item.html` to `hold_item.html`.
4. Updated CMS configuration fields (`config.yml`), stackbit definitions, and navigation links.

### Consequences
All project pages and creations are now structurally bound to the `/hold` namespace, matching our stewardship ideology.

---

## ADR 2: Global Typographical Synchronization (Fraunces Stack)

### Context
Browser default styling resets form elements (inputs, select widgets, CTA button tags) to system sans-serif fonts, breaking the visual harmony of the site. In particular, the merged newsletter sign-up input field and submit button did not inherit the primary serif typography.

### Decision
We injected a global CSS override rule at the top of the SASS theme system:
```css
body, input, button, select, textarea, .button, .newsletter-form, h1, h2, h3, h4, h5, h6, p, a, li, span, div {
  font-family: 'Fraunces', Georgia, serif !important;
}
```

### Consequences
Every text element and form control on the platform displays using the exact same elegant `Fraunces` typeface, ensuring absolute visual cohesion.

---

## ADR 3: Strict Ban on Em-Dashes in Content Copy

### Context
Em-dashes (`—` and `--`) are heavily overused by modern Large Language Models (LLMs) to connect clauses, functioning as a primary indicator of machine-written "AI slop". This degrades the authoritative, human, and polymathic voice of JULZ essays.

### Decision
We banned the use of em-dashes across all articles and core markdown pages. All clauses must be separated using formal punctuation: colons, semicolons, parentheses, or direct sentence breaks.

### Consequences
Editorial copies are much more punchy, natural, and sentence-varied. They read as if written by a human.

---

## ADR 4: Five-Color Ambient Mesh and Twinkling Stars Background

### Context
The background needed to look premium, modern, and reflect the solarpunk-cyberpunk theme (tech purples, solar oranges, nature greens) while introducing subtle depth.

### Decision
We implemented a background system featuring:
1. Three base tech purple/indigo blur balls.
2. Two solarpunk accent balls: Sun Orange (`#ff8f00` at `0.15` opacity) and Nature Green (`#00e676` at `0.12` opacity) running slower drifting keyframe intervals (`drift4` and `drift5` at 22s and 18s).
3. Seven absolute stars that twinkle and translate position dynamically when dimming down to simulate organic movement.

### Consequences
The background feels alive, responsive, and aligns with our ecological and cybernetic branding.

---

## ADR 5: Custom Dark Branded Decap CMS Dashboard

### Context
Decap CMS's default user interface is bright, corporate, and does not match the glassmorphic dark theme of the main JULZ site, creating a jarring experience for editors.

### Decision
We injected custom CSS styles into `static/admin/index.html` to override the CMS UI, dying the editor container background, input fields, labels, and action buttons to a dark, glassmorphic design. We also registered the compiled site stylesheet using `CMS.registerPreviewStyle` to make the preview iframe match the live site.

### Consequences
Editors manage content inside a customized dark-mode dashboard that aligns with the visual identity of the project.
