# Frontmatter & Decap CMS Schemas (SCHEMA.md)

This document contains the exact schemas, layouts, frontmatter fields, and CMS configurations for the JULZ project, allowing developer tools and AI models to parse or regenerate the site structures accurately.

---

## 1. Frontmatter Formats

JULZ uses two primary frontmatter paradigms:

### Paradigm A: Advanced Layout (`layout: advanced`)
Used for core pages: Home, About, Purpose, Ethos, Join, and Forge. Content is managed dynamically through a list of sections defined in the page frontmatter.

#### Section Types and Fields

##### 1. Hero Section (`type: hero_section`)
* `section_id` (string, required)
* `title` (string, required)
* `class` (string, optional - e.g., `hero-full-center`)
* `content` (markdown, required)
* `actions` (list, optional):
  * `label` (string)
  * `url` (string)
  * `style` (select: `button`, `link`)

##### 2. Grid Section (`type: grid_section`)
* `section_id` (string, required)
* `title` (string, required)
* `subtitle` (string, optional)
* `col_number` (select: `two`, `three`)
* `grid_items` (list, required):
  * `title` (string, required)
  * `subtitle` (string, optional)
  * `image` (image path, optional)
  * `content` (markdown, required)
  * `actions` (list, optional):
    * `label` (string)
    * `url` (string)
    * `style` (select: `button`, `link`, `icon`)
    * `icon` (string, optional - e.g., `twitter`, `instagram`)
    * `new_window` (boolean)

##### 3. Content Section (`type: content_section`)
* `content` (markdown, required - supports raw HTML, class overrides, and code syntax blocks like Mermaid)

##### 4. CTA Section (`type: cta_section`)
* `section_id` (string, required)
* `title` (string, required)
* `content` (markdown, required)
* `image` (image path, optional)
* `image_alt` (string, optional)
* `bg_color` (select: `none`, `dark`, `translucent`, `black`, `accent`)
* `actions` (list, required):
  * `label` (string)
  * `url` (string)
  * `style` (select: `button`, `link`)

##### 5. Custom Styling Override (`custom_css`)
* Any section inside the `sections` array can include a `custom_css` field containing raw CSS rules. These rules are injected as an inline style block directly preceding the section, allowing granular styling overrides.

---

### Global / Page-Level Custom CSS
Every content page (Advanced, Post, Project, or standard markdown page) can define a page-level `custom_css` string in its frontmatter. This string is compiled and injected into the `<head>` of the page, enabling custom styling overrides for that page.

---

### Paradigm B: Collection Pages (`layout: post` / `layout: project`)
Used for standard pages: articles in `content/blog/` and creations in `content/hold/`.

#### Blog Post Fields (`layout: post`)
* `title` (string, required)
* `subtitle` (string, optional)
* `date` (datetime, required)
* `excerpt` (string, required)
* `image` (image path, required)
* `image_alt` (string, required)
* `thumb_image` (image path, required)
* `thumb_image_alt` (string, required)
* `categories` (list of strings, required)
* `tags` (list of strings, required)
* `syndication` (list of URLs, optional - for POSSE integration)
* `body` (markdown content, required)

#### Creation Fields (`layout: project`)
* `title` (string, required)
* `subtitle` (string, optional)
* `date` (datetime, required)
* `excerpt` (string, required)
* `image` (image path, required)
* `image_alt` (string, required)
* `thumb_image` (image path, required)
* `thumb_image_alt` (string, required)
* `body` (markdown content, required)

---

## 2. Decap CMS Configuration (`static/admin/config.yml`)

The complete CMS schema configures collections as follows:

```yaml
backend:
  name: git-gateway
  branch: main

media_folder: "static/images"
public_folder: "/images"

collections:
  - name: "pages"
    label: "Pages"
    delete: false
    files:
      - file: "content/_index.md"
        label: "Homepage"
        name: "home"
        fields: [...]
      - file: "content/about.md"
        label: "About Page"
        name: "about"
        fields: [...]
      - file: "content/purpose.md"
        label: "Purpose Page"
        name: "purpose"
        fields: [...]
      - file: "content/ethos.md"
        label: "Ethos Page"
        name: "ethos"
        fields: [...]
      - file: "content/forge.md"
        label: "The Forge Page"
        name: "forge"
        fields: [...]

  - name: "blog"
    label: "Journal / Insights"
    folder: "content/blog"
    create: true
    slug: "{{slug}}"
    fields: [...]

  - name: "hold"
    label: "The Hold"
    folder: "content/hold"
    create: true
    slug: "{{slug}}"
    fields: [...]

  - name: "settings"
    label: "Global Settings"
    delete: false
    files:
      - file: "data/config.json"
        label: "Site Configurations"
        name: "config"
        fields: [...]
```

---

## 3. Data Schema: Global Configurations (`data/config.json`)

Managed under the `settings` collection:
* `title` (string) - site title name.
* `base_font` (select: `fraunces`, `karla`, `outfit`, `space-grotesk`, `inter`, `playfair-display`, `system-sans`) - controls typography base class in body.
* `color_scheme` (select: `dark`) - base theme color coordinates.
* `accent_color` (select: `violet`, `purple`, `blue`, `green`) - accent styling theme.
* `favicon` (string) - filepath pointer to favicon PNG.
* `header` (object):
  * `logo` (string, optional) - logo image filepath.
  * `logo_alt` (string, optional) - logo accessibility alt description.
  * `title` (string) - fallback text title logo.
  * `has_nav` (boolean) - navigation display toggle.
  * `nav_links` (list):
    * `label` (string)
    * `url` (string)
    * `style` (select: `link`, `button`)
* `footer` (object):
  * `content` (markdown) - footer descriptive summary.
  * `copyright` (string) - copyright notice text.
  * `links` (list):
    * `label` (string)
    * `url` (string)
