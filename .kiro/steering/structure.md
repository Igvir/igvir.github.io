# Project Structure

```
igvir.github.io/
├── index.html                 # Main page (English)
├── es/
│   ├── index.html             # Spanish version
│   └── 404.html               # Spanish 404 page
├── 404.html                   # English 404 page
├── assets/
│   ├── css/
│   │   ├── main.css           # Template base styles (do not edit directly)
│   │   ├── custom.css         # Project customizations and dark mode
│   │   ├── critical.css       # Inlined critical-path CSS
│   │   └── fontawesome-all.min.css
│   ├── js/
│   │   ├── main-vanilla.js    # Main site logic (vanilla JS, replaces jQuery version)
│   │   ├── custom.js          # Custom enhancements (dark mode, forms, SW registration)
│   │   ├── main.js            # Legacy jQuery-based main (kept for reference)
│   │   ├── browser.min.js     # Browser detection utility
│   │   ├── breakpoints.min.js # Responsive breakpoint utility
│   │   └── util.js            # Template utility functions
│   ├── sass/                  # SASS source for main.css
│   └── webfonts/              # Font Awesome font files
├── images/                    # All site images (avatar, banners, cert badges)
├── sw.js                      # Service Worker
├── site.webmanifest           # PWA manifest
├── robots.txt                 # Crawler rules
├── sitemap.xml                # Sitemap for SEO
├── .htaccess                  # Apache config (redirects, caching, security headers)
├── _headers                   # Hosting platform security headers
├── CNAME                      # Custom domain for GitHub Pages
├── CHANGELOG.md               # Version history
├── local-private/             # Dev-only scripts and docs (gitignored)
└── .kiro/                     # Kiro AI assistant configuration
    └── steering/              # Steering rules for AI context
```

## Key Conventions

- **English content** lives at the root; **Spanish content** mirrors it under `es/`.
- **Template files** (`main.css`, `main.js`, utility scripts) should not be modified directly. Use `custom.css` and `custom.js` for changes.
- **`local-private/`** is gitignored and contains development scripts, documentation, and tooling that should never be deployed.
- **Images** are stored flat in `images/` with descriptive filenames.
- Critical CSS is inlined in `<style>` tags in the HTML `<head>` for fast first paint.
