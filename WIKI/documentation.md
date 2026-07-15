# JULZ Sovereign Tech Forge — Project Documentation

This document serves as the comprehensive, actionable, and in-depth technical documentation for the JULZ website project. It outlines the vision, structural topology, custom layout engines, styling architectures, and deployment pipelines of the sovereign tech platform.

---

## 1. Introduction

### What is JULZ?
JULZ is a **Sovereign Tech Forge**—a multidisciplinary, R&D-driven development lab and investment holding that architects, builds, and sustains digital products, symbolic brands, and physical infrastructures designed to harmonize technology with ecological systems. 

### Why does JULZ exist?
JULZ stands in opposition to the speculative, short-term trends of modern venture technology and the digital enclosure of closed proprietary platforms. We exist to build **civilization-grade infrastructure** that:
* Empowers human and cognitive sovereignty.
* Operates on open, transparent, and decentralized standards.
* Merges biology with engineering (biomimicry, solarpunk).
* Endures beyond corporate hype cycles.

### How does JULZ operate?
JULZ functions through three structural pillars:
1. **The Forge (Build):** The R&D laboratory where solarpunk and biomimetic models are engineered into code and physical blueprints.
2. **The Hold (Stewardship):** A long-term holding mechanism that shields acquired brands, tools, and platforms from extractive, short-term capital pressure.
3. **The Collective (Unite):** A guild of synthesizers, architects, and forgers (storytellers, designers, engineers, analysts) collaborating on independent tactical operations.

### Where and When?
* **Founding:** Founded in **Kenya in 2016** by polymath tech professional **Stephen Ajulu**.
* **Establishment:** Established on permanent, sovereign digital foundations in **2023**.

---

## 2. Technology Stack & Pipelines

The JULZ platform is engineered for speed, low energy consumption, maximum audibility, and zero-dependency compliance:

* **Site Generator:** [GoHugo (v0.160.1-extended)](https://gohugo.io/). Selected for its compilation speed (compile times under 400ms), native asset pipelines, and security.
* **Sass Compiler:** Built-in Extended Hugo Sass/SCSS transpilation.
* **Headless CMS:** [Decap CMS (v3.0)](https://decapcms.org/). Fully integrated Git-based headless content editor.
* **Styling:** Vanilla CSS, written in structured SASS (`assets/sass/`), compiled without Tailwind CSS to preserve styling granularity.
* **Scripting:** Minimal, vanilla ES6 JavaScript (`static/js/`) for page load states and navigation toggling.
* **Render Pipeline:** Custom CSS compilation with automatic minification and cryptographic fingerprinting (`toCSS | minify | fingerprint`) to bypass browser caching and ensure high performance.

---

## 3. Directory Structure

```
www.julz.co/
├── assets/
│   └── sass/
│       ├── imports/
│       │   ├── _buttons.scss     # CTA button styling & click scales
│       │   ├── _card.scss        # Card core structures
│       │   ├── _forms.scss       # Default inputs
│       │   ├── _julz-theme.scss  # Animated mesh, grain, glassmorphism, animations
│       │   └── _structure.scss   # Flexbox layout wrap & content grids
│       └── main.scss             # Entry SASS file importing modules
├── content/                      # Content markdown files
│   ├── blog/                     # Journal / Insights articles
│   ├── hold/                     # Project mockups ("The Hold")
│   ├── _index.md                 # Homepage hero configuration
│   ├── about.md                  # Team & Supporting Arms pages
│   ├── ethos.md                  # Values and operating principles page
│   ├── forge.md                  # R&D focus pages
│   ├── join.md                   # Join the Guild application form page
│   └── purpose.md                # Founding charter & architectural trinity page
├── data/
│   └── config.json               # Navigation links, font setups, and theme scheme
├── layouts/                      # Hugo HTML templates
│   ├── _default/
│   │   ├── baseof.html           # Main HTML shell (Mesh, JSON-LD, metadata)
│   │   ├── list.html             # Fallback category listings
│   │   ├── post.html             # Journal single pages (Read time, TOC, Related)
│   │   └── taxonomy.html         # Custom Tag/Category feeds
│   └── partials/
│       ├── footer.html           # Universal copyright, links & Newsletter call
│       ├── header.html           # Navigation bar with slide animations
│       ├── cta_section.html      # Dynamic backgrounds cta partial
│       └── subscription_form.html# Slick merged email-subscribe input
├── static/
│   ├── admin/
│   │   ├── config.yml            # Decap CMS collections & layout configurations
│   │   └── index.html            # Decap CMS dashboard loader
│   ├── images/                   # Uploaded media assets
│   └── js/                       # Navigation & transition JS
└── config.yaml                   # Core Hugo configuration settings
```

---

## 4. Configuration Settings

### Global Parameters (`config.yaml`)
Controls general compilation behaviors:
```yaml
baseURL: "/"
languageCode: "en"
title: "JULZ"
theme: "www.julz.co"
disableKinds: ["taxonomy", "taxonomyTerm"] # Overridden as needed for tag indexes
```

### Aesthetic Configs (`data/config.json`)
Allows non-technical content editors to modify typography and styling schemes globally:
```json
{
  "title": "JULZ",
  "base_font": "fraunces",
  "color_scheme": "dark",
  "accent_color": "violet",
  "header": {
    "title": "JULZ",
    "has_nav": true,
    "nav_links": [...]
  }
}
```

---

## 5. Layout Components & Partials

### Dynamic CTA Sections (`cta_section.html`)
The Call-To-Action component dynamically maps the markdown parameter `bg_color` into CSS hooks:
* `bg-translucent` / `bg-dark`: Instantiates glassmorphic containers with thin border lines (`rgba(255,255,255,0.08)`) and backdrop filters (`blur(12px)`).
* `bg-accent`: Renders a gradient blending purple and violet tints.
* `bg-black`: Renders a flat, dark panel for stark high-contrast sections.

### Merged Newsletter Sign-up (`subscription_form.html`)
A custom-built form following the IndieWeb paradigm:
* The input field and the submit button are merged into a single pill capsule (`border-radius: 50px`).
* Activates a glowing focus ring around the entire capsule when the input gains focus.
* Integrates directly with Netlify Forms using native `data-netlify="true"` parameters.

---

## 6. Advanced Platform Features

### Finer and Subtle Matte Grain Background & Twinkling Mesh
Located in `_julz-theme.scss` under `.mesh-background`:
* **Five Drifting Mesh Balls:** A five-colored atmospheric backdrop composed of three base purple/indigo balls and two solarpunk accent balls (Solarpunk Orange for the sun and Solarpunk Green for nature) drifting slowly via keyframe translation cycles (`drift1` to `drift5` from 14s to 22s).
* **Seven Twinkling & Drifting Stars:** Injects seven absolute star elements that brighten, dim, and shift coordinates dynamically over different cycle periods.
* **Matte Film Grain:** Utilizes a highly compressed SVG turbulence filter (`baseFrequency='1.35'`) set to `opacity: 0.022` with a `backdrop-filter: blur(15px)` overlay to diffuse the colors of the drifting blur balls behind it, presenting an organic textured finish.

### Smart Table of Contents (TOC)
Located in `layouts/_default/post.html`:
* Checks the length of the article body:
  `{{ if gt .WordCount 500 }}`
* Renders the built-in Hugo `.TableOfContents` inside a beautiful glassmorphic container `.post__toc` before the article content, ensuring readability on lengthy essays.

### Related Insights Engine
Queries posts that share similar tags or categories:
* `{{ $related := .Site.RegularPages.Related . | first 2 }}`
* If related posts exist, it renders them in a two-column grid.
* If no tags overlap, it falls back to adjacent Next and Previous post articles.

---

## 7. Decap CMS Integration

We map all Hugo markdown folders and configuration JSON structures into Decap CMS via `static/admin/config.yml`. It supports:
* **Folder Collections:** `blog` (Journal) and `hold` (The Hold), capturing taxonomies, excerpt text, publish dates, and thumbnail imagery.
* **File Collections:** Specific pages (Home, About, Purpose, Ethos, Join), allowing editing of hero headers, grid blocks, and customizable call-to-actions dynamically.

---

## 8. Deployment Workflow

### Local Development
To launch the local development server with hot-reloading:
1. Run `hugo server -D` to compile draft posts.
2. Access the site locally at `http://localhost:1313/`.
3. To clear the SASS compilation cache if styling changes do not reflect, run:
   ```powershell
   Remove-Item -Path "resources/_gen" -Recurse -Force
   Remove-Item -Path "public" -Recurse -Force
   ```

### Production Deployment
The site is pre-configured for deployment on Netlify:
* **Build Command:** `hugo --gc --minify`
* **Publish Directory:** `public`
* **Netlify Forms:** Forms (contact and newsletter) are automatically captured by Netlify's crawler using the `data-netlify="true"` attributes.

---

## 9. Project Blueprints

* **[ARCHITECTURE.md](file:///C:/Users/ajulu/Desktop/PROJECTS/Dev%20PROJECTS/www.julz.co/ARCHITECTURE.md):** System architecture layers, z-index stack hierarchies, compiled pipeline layouts.
* **[DECISIONS.md](file:///C:/Users/ajulu/Desktop/PROJECTS/Dev%20PROJECTS/www.julz.co/DECISIONS.md):** Architectural Decision Records (ADRs) for typography, content guidelines, and layout adjustments.
* **[ANTIGRAVITY.md](file:///C:/Users/ajulu/Desktop/PROJECTS/Dev%20PROJECTS/www.julz.co/ANTIGRAVITY.md):** Pair programming workflows, CLI commands, and Google Antigravity developer guidelines.
* **[SCHEMA.md](file:///C:/Users/ajulu/Desktop/PROJECTS/Dev%20PROJECTS/www.julz.co/SCHEMA.md):** Dynamic section layouts, Decap CMS configuration collections, frontmatter schemas.
* **[DESIGN.md](file:///C:/Users/ajulu/Desktop/PROJECTS/Dev%20PROJECTS/www.julz.co/DESIGN.md):** Exact styling design tokens, glassmorphism filters, tactile animation parameters.
* **[WRITING.md](file:///C:/Users/ajulu/Desktop/PROJECTS/Dev%20PROJECTS/www.julz.co/WRITING.md):** Editorial style definitions, vocabulary parameters, sentence rhythm constraints.
