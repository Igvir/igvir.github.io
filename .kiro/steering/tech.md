# Technology & Build

## Tech Stack

- **HTML5** — semantic markup, no templating engine or static site generator
- **CSS3** — custom properties (CSS variables) for theming, SASS source in `assets/sass/`
- **JavaScript (ES6+)** — vanilla JS, no framework. jQuery is present but the main logic uses `main-vanilla.js`
- **Font Awesome** — icon library (self-hosted webfonts)
- **Google Fonts** — Lato, Source Code Pro (loaded externally)
- **Service Worker** — offline caching and PWA support (`sw.js`)
- **reCAPTCHA v3** — spam protection on contact form
- **Formspree** — form submission backend (no server-side code)

## Design Template

Based on HTML5 UP template (CCA 3.0 License). Core template styles are in `assets/css/main.css`; project customizations go in `assets/css/custom.css`.

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
