# Technology & Build

## Tech Stack

- **HTML5** — semantic markup, no templating engine or static site generator
- **CSS3** — custom properties (CSS variables) for theming; the live site is styled by `/styles.css`
- **JavaScript (ES6+)** — vanilla JS, no framework. The live site logic is in `/script.js`; book data is in `/data/books.js`
- **Tabler Icons** — icon library, loaded as a webfont from jsDelivr CDN (version-pinned with SRI)
- **Google Fonts** — Inter, JetBrains Mono (loaded externally)
- **Service Worker** — offline caching and PWA support (`sw.js`)
- **reCAPTCHA v3** — spam protection on contact form
- **Formspree** — form submission backend (no server-side code)

> Note: the `assets/` tree (HTML5 UP template `main.css`, jQuery, `main-vanilla.js`, Font Awesome, SASS) is legacy from an earlier version and is not loaded by the current `index.html`. Do not add new work there.

## Third-Party Dependencies & CDN Policy

- Pin external CDN resources to an explicit version (never `@latest`) and add Subresource Integrity (`integrity` + `crossorigin`).
- Keep the Content Security Policy in `_headers` and `.htaccess` in sync with the origins the site actually loads (currently: Google Fonts, jsDelivr, Google reCAPTCHA, Formspree).

## Build & Development

There is no build step or bundler. The site is static HTML served directly.

### Local Development

```bash
# Serve with Python
python -m http.server 8000

# Or Node.js
npx http-server -p 8000
```

### Deployment

Push to `main` branch → GitHub Pages auto-deploys.

## Code Conventions

- Use `'use strict'` in JS modules
- Wrap custom JS in an IIFE to avoid global scope pollution
- Console logging only in development (check `window.location.hostname`)
- CSS custom properties defined in `:root` and `[data-theme="dark"]`
- Images use `loading="lazy"` and descriptive `alt` text
- External links use `target="_blank" rel="noopener noreferrer"`
- All interactive elements must have ARIA labels
- Follow semantic versioning in CHANGELOG.md
