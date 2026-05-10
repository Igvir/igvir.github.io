# Igvir Ramirez — Portfolio Website (v3)

Cloud Solutions Architect & Software Architect portfolio. Modern one-page design with data-driven books section, dark mode, and bilingual support.

🌐 **Live**: [www.igvir.com](https://www.igvir.com)  
🇪🇸 **Español**: [www.igvir.com/es/](https://www.igvir.com/es/)

---

## Quick start

```bash
# Clone
git clone https://github.com/igvir/igvir.github.io.git
cd igvir.github.io

# Serve locally
python -m http.server 8000
# or
npx http-server -p 8000

# Open http://localhost:8000
```

No build step required. Pure HTML/CSS/JS.

---

## Project structure

```
igvir.github.io/
├── index.html          # English version
├── es/index.html       # Spanish version
├── styles.css          # All styles (design system + components)
├── script.js           # Theme, language, animations, books rendering
├── data/
│   └── books.js        # Books data array (add new books here)
├── images/
│   ├── avatar.jpg
│   ├── og-image.png
│   └── books/          # Book covers ({id}-{lang}.png)
├── robots.txt
├── sitemap.xml
├── site.webmanifest
└── CNAME
```

---

## How to add a new book

### Step 1: Add cover images

Place cover images in `images/books/` following the naming convention:

```
images/books/{book-id}-{lang}.png
```

Examples:
- `images/books/new-book-en.png`
- `images/books/new-book-es.png`

If the book only has one language version, use the same file for both:
```
images/books/new-book-es.png  (and point both cover.en and cover.es to this file)
```

### Step 2: Add the book object to `data/books.js`

Open `data/books.js` and add a new object to the `books` array:

```js
{
  id: "new-book",
  status: "published",        // "published" | "upcoming" | "draft"
  featured: false,            // true = appears first
  publishedYear: 2026,
  badge: { en: "NEW", es: "NUEVO" },
  title: {
    en: "Your Book Title",
    es: "Título de Tu Libro"
  },
  subtitle: {
    en: "A subtitle for the book",
    es: "Un subtítulo para el libro"
  },
  description: {
    en: "Short description of the book.",
    es: "Descripción corta del libro."
  },
  cover: {
    en: "/images/books/new-book-en.png",
    es: "/images/books/new-book-es.png"
  },
  coverAlt: {
    en: "Book cover alt text",
    es: "Texto alternativo de la portada"
  },
  theme: {
    gradientFrom: "#1a1a2e",      // Dark color from the cover
    gradientTo: "#16213e",        // Slightly lighter variant
    accentColor: "#e94560",       // Contrasting accent
    badgeBg: "rgba(233,69,96,0.18)",
    badgeColor: "#ff6b81",
    primaryCtaBg: "#e94560",
    primaryCtaText: "#ffffff"
  },
  links: {
    buy: "https://leanpub.com/new-book",
    preview: null                 // or a preview URL
  },
  cta: {
    primary: { en: "Buy →", es: "Comprar →" },
    secondary: { en: "Preview", es: "Vista previa" }
  }
}
```

### Step 3: Choose theme colors

Pick 2 dominant colors from the book cover for `gradientFrom` and `gradientTo`, then choose a contrasting accent for CTAs and badges. Use a tool like [Coolors](https://coolors.co/) or an eyedropper on the cover image.

### Step 4: Test locally

```bash
python -m http.server 8000
```

Verify:
- Book card renders correctly in both EN and ES
- Cover image loads
- CTA links work
- Stats row updates automatically
- Grid layout adjusts (1 col for 1 book, 2 cols for 2, etc.)

### Step 5: Upcoming books

If the book isn't published yet, set `status: "upcoming"`. To show upcoming books on the site, change `showUpcoming` to `true` in `script.js`:

```js
const showUpcoming = true;
```

Upcoming books display with a "Notify me" / "Avisarme" CTA instead of "Buy".

---

## Deployment

Recommended: **GitHub Pages** (current setup).

1. Push changes to `main` branch
2. GitHub Pages auto-deploys
3. Custom domain configured via `CNAME` file

Alternative options:
- **Cloudflare Pages**: Connect repo, set build command to empty, output directory to `/`
- **Netlify**: Same as above, drag-and-drop or connect repo

---

## Tech stack

- HTML5 + CSS3 + vanilla JavaScript
- Inter + JetBrains Mono (Google Fonts)
- Tabler Icons (CDN)
- No frameworks, no build tools, no dependencies

---

## Features

- Responsive (mobile-first, breakpoints at 640/768/1024px)
- Dark/light mode with system preference detection
- Bilingual EN/ES with URL-based routing
- Data-driven books section (edit `data/books.js` only)
- Scroll animations (IntersectionObserver)
- 3D mouse tracking on book covers
- WCAG 2.1 AA accessible
- SEO optimized (OG, Twitter Cards, JSON-LD, hreflang)
- Lighthouse 95+

---

© 2026 Igvir Ramírez. All rights reserved.
