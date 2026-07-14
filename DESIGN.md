# JULZ Design Specification (DESIGN.md)

This document contains the exact design tokens, typography specifications, layout rules, and animation systems required to replicate the cyber-premium Solarpunk-Cyberpunk design of the JULZ website. It serves as a detailed blueprint for both humans and AI models.

---

## 1. Design Ethos & Colors

The visual design is a fusion of **cyberpunk** (high-technology neon accents, dark backgrounds, glassmorphic panels) and **solarpunk** (organic layouts, nature-inspired content flow, fine matte grain textures).

### Primary Color Tokens
* **Base Canvas Background:** `#030008` (Deep Space Black)
* **Text Primary:** `#ffffff` (High contrast)
* **Text Secondary:** `rgba(255, 255, 255, 0.7)` (Faded grey)
* **Text Muted/Placeholder:** `rgba(255, 255, 255, 0.4)`
* **Active Status Green:** `#00e676` (Biological heartbeat)
* **Warm Sun Orange:** `#ff8f00` (Organic solar accent)

### Mesh Gradient Accents
These accent colors are used on drifting blur-balls behind the layout wrap:
* **Neon Purple:** `#542bff` (Accent color)
* **Royal Violet:** `#6320d6` (Deep accent color)
* **Digital Indigo/Blue:** `#4322d6` (System color)

---

## 2. Typography System

The site implements a serif-first design to communicate trust, editorial authority, and classical philosophy:

* **Primary Font Stack:** `Fraunces`, `Playfair Display`, `Georgia`, `serif`
* **Heading Weights:** `500` (Medium) / `600` (Semi-bold)
* **Body Font Weights:** `400` (Regular) / `500` (Medium)
* **Line Heights:**
  * Headings: `1.15` to `1.2`
  * Body text: `1.6` (Ensures maximum reading accessibility)
* **Letter Spacing:**
  * Headers: `-0.02em`
  * Labels/Metadata: `0.05em` (Uppercase tracker)

---

## 3. Stacking Context & Background Spec

The canvas is split into three strict layers to allow glowing gradients and grain textures to sit behind readable text:

```
[ LAYER 3: Content ]    #site-wrap (z-index: 2, background: transparent)
         ▲
[ LAYER 2: Textures ]   .mesh-background (z-index: 1, background: transparent)
                        ├── .mesh-ball (three drifting blur circles)
                        └── ::after (SVG Noise + Backdrop Blur)
         ▲
[ LAYER 1: Canvas ]     body (z-index: 0, background: #030008)
```

### Layer 1: Body
Set body and all base variations to use the deep black canvas:
```css
body, .palette-dark {
  background: #030008 !important;
}
```

### Layer 2: Mesh & Grain
The background wrapper covers the entire viewport and disables clicks:
```css
.mesh-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  background: transparent !important;
  overflow: hidden;
  pointer-events: none;
}
```

#### Finer & Subtle Film Grain (The Overlay)
We inject an SVG turbulence filter into the pseudo-element `::after` to create a fine-grain matte finish:
```css
.mesh-background::after {
  content: "";
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.35' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  opacity: 0.022;
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  z-index: 5;
  pointer-events: none;
}
```

#### Drifting Blur-Balls
The background is animated by three absolute circles that scale and drift via GPU-accelerated transforms:
```css
.mesh-ball {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.45;
  z-index: 1;
  transform-origin: center;
}

.mesh-ball-1 {
  width: 55vw; height: 55vw; background: #542bff;
  top: -10%; left: -10%;
  animation: drift1 16s infinite alternate ease-in-out;
}
.mesh-ball-2 {
  width: 65vw; height: 65vw; background: #6320d6;
  bottom: -20%; right: -10%;
  animation: drift2 20s infinite alternate ease-in-out;
}
.mesh-ball-3 {
  width: 50vw; height: 50vw; background: #4322d6;
  top: 35%; left: 25%;
  animation: drift3 14s infinite alternate ease-in-out;
}
.mesh-ball-4 {
  width: 45vw; height: 45vw; background: #ff8f00; /* Solarpunk sun orange */
  top: 10%; right: -15%; opacity: 0.15;
  animation: drift4 22s infinite alternate ease-in-out;
}
.mesh-ball-5 {
  width: 50vw; height: 50vw; background: #00e676; /* Solarpunk nature green */
  bottom: -10%; left: -15%; opacity: 0.12;
  animation: drift5 18s infinite alternate ease-in-out;
}
```

#### Twinkling Stars (Subtle background details)
To introduce depth, seven small circular elements twinkle slowly across the canvas:
```css
.mesh-star {
  position: absolute;
  width: 2px; height: 2px;
  background: #ffffff;
  border-radius: 50%;
  pointer-events: none;
  opacity: 0.25;
  box-shadow: 0 0 4px #ffffff, 0 0 8px rgba(255, 255, 255, 0.4);
  animation: twinkle 4s infinite ease-in-out;
  z-index: 2;
}

@keyframes twinkle {
  0% { transform: scale(0.8); opacity: 0.2; }
  50% {
    transform: scale(1.2); opacity: 0.8;
    box-shadow: 0 0 6px #ffffff, 0 0 12px rgba(255, 255, 255, 0.8);
  }
  100% { transform: scale(0.8); opacity: 0.2; }
}
```

---

## 4. Glassmorphism Specification

To create cyber-premium panels that float above the moving gradient, cards use low opacity fills, backdrop blurs, and thin borders:

```css
.post-card, .project-card, .card, .testimonial, .section--form form, .post__toc, .section__bg.bg-translucent {
  background: rgba(255, 255, 255, 0.03) !important;
  backdrop-filter: blur(12px) !important;
  -webkit-backdrop-filter: blur(12px) !important;
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
  border-radius: 12px;
  padding: 1.5em;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
}
```

---

## 5. Micro-interactions & Tactile Animations

We implement simulated physical behaviors (tactile feedback) to make the UI feel responsive:

### 1. Card Hover Lift & Active Compress
Hovering causes cards to glide up and scale. Clicking compresses them down to mimic a physical button:
```css
.post-card:hover, .project-card:hover, .card:hover, .testimonial:hover {
  border-color: rgba(99, 32, 214, 0.4) !important;
  box-shadow: 0 20px 40px -15px rgba(84, 43, 255, 0.25), 0 0 1px 1px rgba(84, 43, 255, 0.15) inset;
  transform: translateY(-6px) scale(1.015);
  background: rgba(255, 255, 255, 0.05) !important;
}
.post-card:active, .project-card:active, .card:active {
  transform: translateY(-2px) scale(0.99);
  transition: all 0.1s ease !important;
}
```

### 2. Button Interactive Feedback
```css
.button:hover, button[type="submit"]:hover {
  transform: translateY(-2px) scale(1.04) !important;
  box-shadow: 0 8px 20px rgba(84, 43, 255, 0.35) !important;
}
.button:active, button[type="submit"]:active {
  transform: translateY(1px) scale(0.97) !important;
}
```

### 3. Navbar Underline Slide
Hovering slides an underline from the center:
```css
.navbar__menu a::after, .menu__item a::after {
  content: "";
  position: absolute;
  width: 100%; height: 2px; bottom: -4px; left: 0;
  background-color: #542bff;
  transform: scaleX(0);
  transform-origin: bottom right;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.navbar__menu a:hover::after, .menu__item a:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
```

---

## 6. Full-Viewport Centering Specification

To isolate vertical and horizontal centering exclusively to the landing page, we use a conditional class hook `.body-home` on the `body` tag:

```css
.body-home {
  overflow: hidden;
  height: 100vh;
}
.body-home .site {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.body-home .site-header, .body-home .site-footer {
  margin: 0 !important;
  padding: 1em 0;
}
.body-home .site-content {
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
  align-items: center !important;
  flex-grow: 1;
  width: 100%;
}
.body-home .hero-full-center {
  width: 100%;
  margin: 0 !important;
  padding: 0 !important;
}
```
This guarantees a zero-scrollbar, vertically balanced layout, holding the header at the top, the centered hero copy in the middle, and the footer at the bottom.
