# JULZ Developer Blueprint (GEMINI.md)

This blueprint is designed for AI developers, agents, and engineers to instantly understand, maintain, and replicate the compilation systems, data structures, and configurations of the JULZ website.

---

## 1. Core Architecture & Stack

* **SSG:** Hugo Extended (compiled with Go and LibSass/Dart Sass).
* **Asset Pipeline:** Hugo Pipes (`resources.Get` → `toCSS` → `minify` → `fingerprint`).
* **CMS:** Decap CMS (Headless, Git-based).
* **Deploy Target:** Netlify (using Netlify forms and redirects).
* **Chronology:** Founded in Kenya in 2016 by Stephen Ajulu; established in 2023.

---

## 2. Compilation Rules & Asset Pipelines

### Stylesheet Compilation
Stylesheets are compiled from SASS. In `layouts/_default/baseof.html`, the resource pipeline is declared as:
```html
<link rel="stylesheet" href="{{ (resources.Get "sass/main.scss" | toCSS (dict "indentWidth" 4 "outputStyle" "nested" "precision" 10 "targetPath" "css/main.css") | fingerprint).Permalink }}">
```
* **Fingerprinting:** Essential for cache-busting during local dev. The file compiles as `/css/main.[hash].css`.
* **Important:** If SCSS changes do not render, clear cache directories using:
  ```powershell
  Remove-Item -Path "resources/_gen" -Recurse -Force
  Remove-Item -Path "public" -Recurse -Force
  hugo
  ```

---

## 3. Data Models & Frontmatter Schema

The site utilizes two main content layout paradigms:

### Paradigm A: Advanced Layout (`layout: advanced`)
Used on the Homepage, About, Manifesto, Collective, and Forge pages. It loops through a dynamic `sections` array declared in frontmatter:
```yaml
layout: advanced
sections:
  - type: hero_section
    section_id: main-hero
    title: "Page Header"
    content: "Markdown body"
  - type: grid_section
    col_number: three
    grid_items:
      - title: "Card Title"
        content: "Card body text"
  - type: cta_section
    bg_color: translucent # Options: none, dark, translucent, black, accent
    actions:
      - label: "Click here"
        url: "/contact/"
        style: button
```
* **Execution:** Handled by [layouts/_default/advanced.html](file:///C:/Users/ajulu/Desktop/PROJECTS/Dev%20PROJECTS/www.julz.co/layouts/_default/advanced.html), which loads the respective partial:
  `{{ partial (print $section.type ".html") (dict "section" $section "Site" $.Site) }}`

### Paradigm B: Collection Pages (`layout: post` / `layout: project`)
Used for articles in `content/blog/` and Hold creations in `content/hold/`:
* **Blog post fields:** title, subtitle, date, excerpt, thumb_image, thumb_image_alt, image, image_alt, categories, tags, syndication (syndicated URLs for POSSE), body.
* **Hold fields:** title, subtitle, date, excerpt, thumb_image, image, body.

---

## 4. Custom Layout Logics

### Read Time & Metadata
Rendered in `layouts/_default/post.html` using:
* `{{ .ReadingTime }} min read`
* `{{ .Date.Format "January 02, 2006" }}`

### Smart Table of Contents (TOC)
Displays only if the post word count is greater than 500 words:
```html
{{ if gt .WordCount 500 }}
<div class="post__toc">
  <h4 class="post__toc-title">Table of Contents</h4>
  {{ .TableOfContents }}
</div>
{{ end }}
```

### Related Posts Engine
Looks up related pages based on taxonomy intersections:
```html
{{ $related := .Site.RegularPages.Related . | first 2 }}
{{ if $related }}
  {{/* Render related posts */}}
{{ else }}
  {{/* Fallback to Next / Previous posts */}}
{{ end }}
```

---

## 5. SEO, AI & IndieWeb Specifications

### JSON-LD Metadata (SEO/GEO)
Structured schemas are loaded in the head of `baseof.html`:
* `Organization` Schema: Active on all pages, detailing founder, founding date, logo, and domain.
* `BlogPosting` Schema: Active on `post.html` layouts, detailing publication date, author, headline, and excerpt.

### Microformats2 (IndieWeb)
Classes are integrated into post structures:
* `.h-entry` (The article container)
* `.p-name` (The title)
* `.p-summary` (The subtitle/excerpt)
* `.dt-published` (The date)
* `.e-content` (The main content body)
* `.u-syndication` (The syndicated copy links)
* `.p-author h-card` (Author profile markup - Stephen Ajulu)

---

## 6. Headless CMS (Decap CMS)

Decap CMS configurations are defined in [static/admin/config.yml](file:///C:/Users/ajulu/Desktop/PROJECTS/Dev%20PROJECTS/www.julz.co/static/admin/config.yml). It maps:
* **Pages Collection:** File-based collection editing `_index.md`, `about.md`, and `manifesto.md`.
* **Blog Collection:** Folder-based collection editing files inside `content/blog/`.
* **Hold Collection:** Folder-based collection editing files inside `content/hold/`.
* **Git Gateway:** Connects Decap CMS directly to your GitHub repository using Netlify Identity.
