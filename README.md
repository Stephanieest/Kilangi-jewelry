# Kilangi — Desktop Website (README)

This repository contains the desktop-focused version of the Kilangi jewellery storefront — a static HTML/CSS/JS site (no build tools required). This README explains the desktop layout, project structure, how to run the site locally, where to customize visuals and content, and tips for testing and deployment.

---

## Project overview

Kilangi is a responsive, accessible storefront built with:
- Semantic HTML (index.html)
- Modular CSS (styles.css) — desktop-first rules included
- Small, focused JS for UI (mobile nav) and optional hover glow (glow.js)

The "desktop version" uses the full-width, multi-column grid layouts and typographic scale designed for large viewports. The codebase also includes a mobile-first variant; both share the same HTML structure and class names for easier maintenance.

---

## Files

- `index.html` — Full site HTML (desktop layout included).
- `styles.css` — Primary stylesheet (desktop rules included).  
  - Variables at the top for colors, spacing, and sizes.
  - Breakpoints are used to switch between mobile and desktop layouts.
- `glow.js` — Optional script to add a gold hover/touch glow to buttons and images.
- `glow.css` (optional) — Glow styles appended to styles.css if you used them separately.
- `README.md` — This file.

> Note: If you received multiple CSS/HTML variations during design iterations, make sure you use the latest `index.html` and `styles.css` pair.

---

## How to view the desktop version locally

1. Clone or copy the project files into a folder.
2. Open `index.html` in a desktop browser (Chrome, Firefox, Safari, Edge).
   - For a simple static server (recommended to avoid file:// restrictions):
     - Python 3:

       python3 -m http.server 8000
       # then open http://localhost:8000
 
     - Node (http-server):

       npx http-server .


---

## Desktop-specific notes

- Layout
  - Desktop uses multi-column CSS Grid across sections:
    - Hero: 2-column (left image + right content)
    - Promo panels: 2-column rectangular panels
    - Collection: multi-column (7 columns in the reference)
    - Gift sections, ethos, testimonials: multi-column grid
  - See top of `styles.css` for CSS variables (colors, max-width, panel height, etc).

- Typography
  - Playfair Display used for headings (e.g., hero, promos, section titles).
  - Montserrat used for body/supporting text.
  - Font stacks are included in `index.html` via Google Fonts.

- Images
  - Desktop expects larger images (1600–2200px wide recommended).
  - Images are used as `background-image` in certain hero/promo panels to preserve cropping control.

- Buttons & CTAs
  - Primary CTAs are styled with stronger shadows and weights on desktop.
  - `.btn-cta`, `.btn-dark`, `.btn-white` are the main CTA classes.

---

## Glow (hover) effect

- Script: `glow.js` — toggles a `.gold-glow` class on hover/focus/tap.
- Styles: glow rules appended to `styles.css` (or in separate `glow.css` if you prefer).
- Installation:
  1. Ensure `glow.js` is included in `index.html` just before `</body>`:
     ```html
     <script src="glow.js" defer></script>
     ```
  2. Make sure the glow CSS is present at the end of `styles.css`.
- Customization:
  - Edit the RGBA gold color in CSS (`rgba(255,197,62,...)`) to change hue/intensity.
  - Tweak blur, spread and transform in the `.gold-glow` rules.

---

## Accessibility & UX

- Keyboard focus:
  - Hover glow also appears on keyboard focus to help keyboard users.
  - Use `:focus-visible` in CSS to fine-tune keyboard indicators.
- Reduced motion:
  - Consider adding `prefers-reduced-motion` media query to tone down transforms for users who prefer less motion.
- Semantic HTML:
  - Content uses headings, landmarks and ARIA attributes for nav toggles.

Example: prefer-reduced-motion snippet:
```css
@media (prefers-reduced-motion: reduce) {
  * { transition: none !important; animation: none !important; }
}
```

---

## Customization checklist

- Colors: change CSS variables at the top of `styles.css`:
  ```css
  --green-deep: #184b47;
  --panel-height: 360px;
  ```
- Fonts: update Google Fonts link in `index.html` or replace with system fonts.
- Images: replace `picsum.photos` placeholders with production image URLs, ideally at appropriate sizes for desktop (1600–2200px width).
- Copy: edit headings, paragraphs and button links in `index.html`.
- SEO: add meta tags, Open Graph tags, and structured data as needed.

---

## Testing

- Check in major browsers on desktop:
  - Chrome, Firefox, Safari, Edge.
- Test responsive breakpoints by resizing the browser:
  - Desktop layout (>= 980px) should show multi-column layout.
  - Tablet / mobile should stack content.
- Accessibility testing:
  - Use keyboard navigation (Tab) to ensure focus states are sensible.
  - Use Lighthouse or axe for automated accessibility audits.

---

## Deployment

This is a static site — deployable to any static hosting environment:
- GitHub Pages
- Netlify
- Vercel
- S3 + CloudFront

Example Netlify steps:
1. Push repository to Git.
2. Connect repository to Netlify and deploy (no build step required).

---

## Troubleshooting

- Fonts not loading:
  - Ensure network access to fonts.googleapis.com.
- Images appear blurry:
  - Replace placeholders with high-resolution assets and adjust `object-fit`/`background-position`.
- Glow effect not showing:
  - Confirm `glow.js` is loaded; check console for errors. Make sure CSS glow rules are present.

---

## What's included in the desktop bundle

- Pixel-accurate promo panels (rectangular)
- 2-column hero with left image and right text
- Collection grid with many columns (desktop)
- Testimonials, Gifts, Ethos, and lab-grown "Future" sections
- Optional gold hover glow effect for buttons/images
