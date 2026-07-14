# JULZ System Architecture (ARCHITECTURE.md)

This document maps out the structural layers, z-index hierarchies, compilation pipelines, and layout frameworks of the JULZ website. It is written to enable AI models and developers to replicate the exact system architecture with 100% fidelity.

---

## 1. Technological Stack

* **Static Site Generator (SSG):** Hugo Extended (v0.160.1+).
* **CSS Processor:** LibSass/Dart Sass compiled natively via Hugo Pipes.
* **Content Management System (CMS):** Decap CMS (headless, Git-based gateway).
* **Hosting & Forms Engine:** Netlify (Netlify Forms and redirects).

---

## 2. Rendering Layout & Visual Layers

JULZ features a layered 2.5D visual context. It stacks elements along the Z-axis to allow complex ambient gradients and film grain to show through interactive content.

```
┌─────────────────────────────────────────────────────────┐  Z-Index: 100
│ Mobile Navigation Overlay / Modal Popups                │
└─────────────────────────────────────────────────────────┘
                            │
┌─────────────────────────────────────────────────────────┐  Z-Index: 10
│ Sticky Header Navigation & Dynamic CTA Buttons          │
└─────────────────────────────────────────────────────────┘
                            │
┌─────────────────────────────────────────────────────────┐  Z-Index: 2
│ #site-wrap (Main Content Layout, Glassmorphic Panels)   │
└─────────────────────────────────────────────────────────┘
                            │
┌─────────────────────────────────────────────────────────┐  Z-Index: 1
│ .mesh-background (5 Drifting Balls, 7 Stars, Grain SVG) │
└─────────────────────────────────────────────────────────┘
                            │
┌─────────────────────────────────────────────────────────┐  Z-Index: 0
│ body { background-color: #030008; } (Deep Canvas)        │
└─────────────────────────────────────────────────────────┘
```

---

## 3. The Asset & Stylesheet Pipeline

All SASS/SCSS files are compiled inside `layouts/_default/baseof.html` using Hugo Pipes. The pipeline compiles, minifies, and fingerprints the stylesheet for cache-busting:

```html
<link rel="stylesheet" href="{{ (resources.Get "sass/main.scss" | toCSS (dict "indentWidth" 4 "outputStyle" "nested" "precision" 10 "targetPath" "css/main.css") | minify | fingerprint).Permalink }}">
```

### Cache-Busting Protocol
When modifying the SCSS stylesheets, Hugo's internal build cache must be cleared. Execute the following command in PowerShell to rebuild clean:
```powershell
Remove-Item -Path "resources/_gen" -Recurse -Force
Remove-Item -Path "public" -Recurse -Force
hugo
```

---

## 4. Visual Grid & Styling Systems

### Glassmorphism Tokens
Glassmorphic panels are built utilizing low-opacity backgrounds, thin semi-translucent borders, and heavy backdrop blurs to achieve depth:
* **Background Fills:** `rgba(255, 255, 255, 0.02)` or `rgba(255, 255, 255, 0.03)`
* **Border Styling:** `1px solid rgba(255, 255, 255, 0.05)` or `1px solid rgba(255, 255, 255, 0.08)`
* **Backdrop Blur:** `backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);`

### Stacking Layer Details
* `#site-wrap` must maintain `position: relative; z-index: 2; background: transparent !important;` so that the ambient drift background behind it is visible.
* `.mesh-background` has `position: fixed; z-index: 1; top: 0; left: 0; width: 100vw; height: 100vh; overflow: hidden; pointer-events: none;`.

---

## 5. IndieWeb & POSSE Integration

The site uses Microformats2 metadata tags to enable self-hosted distribution following the POSSE (Publish on Own Site, Syndicate Elsewhere) paradigm:
* **Container:** `.h-entry` (wrapper for blog post layouts).
* **Article Title:** `.p-name` (heading tag class).
* **Subtitle/Summary:** `.p-summary` (excerpt class).
* **Publish Date:** `.dt-published` (time datetime class).
* **Content Body:** `.e-content` (main article markdown body).
* **Syndication Links:** `.u-syndication` (anchors pointing to POSSE duplicates on Twitter/GitHub/Medium).

---

## 6. Single Page Application (SPA) Router & Transitions

To achieve frictionless navigation without page reloads, the platform implements a lightweight, vanilla JS SPA router inside [init.js](file:///C:/Users/ajulu/Desktop/PROJECTS/Dev%20PROJECTS/www.julz.co/static/js/init.js):
* **Event Interception:** Listens to all relative site link click events, cancelling standard browser redirect lifecycles.
* **Transition States:** Triggers an `opacity: 0` and `translateY(8px)` animation on the `#content` main container.
* **Content Swap:** Fetches the new page HTML using `fetch()`, parses it with `DOMParser`, replaces `#content` inner HTML, updates the document title, and pushes the new URL state using `history.pushState()`.
* **Lifecycle Re-binding:** Proactively re-hooks all interaction handlers on swap:
  * Re-hooks navigation toggle listeners.
  * Re-hooks dropdown hover/click listeners.
  * Re-hooks responsive video embed reframe wrappers.
  * Re-triggers Mermaid parser engines on swapped page content.
  * Updates the active/current link highlights in the menu headers.
* **Browser History Support:** Hooks into `popstate` to support native back/forward swipe/click navigation actions.
