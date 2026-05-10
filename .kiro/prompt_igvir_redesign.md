# Prompt: Rediseño de igvir.com — Opción B "Cloud Engineer Portfolio"

## Contexto del proyecto

Estoy rediseñando mi sitio web personal **igvir.com**. Soy **Igvir Ramírez Velásquez**, Cloud Solutions Architect / Software Architect en GBM Corp. con base en San José, Costa Rica. Tengo 6 certificaciones AWS (incluyendo Solutions Architect Professional y AI Practitioner), certificación TOGAF 9, y he publicado dos libros técnicos en Leanpub.

El sitio actual usa la plantilla "Read Only" de HTML5 UP (gratuita, muy reconocible, con un verde menta #49bf9d y layout de columna lateral fija). El contenido es bueno pero el envoltorio se siente genérico y no transmite la seniority del rol. Quiero reemplazarlo completamente.

## Objetivo

Construir un sitio one-page moderno tipo portafolio profesional, con estética inspirada en sitios como Vercel, Linear, Stripe Press y portafolios de ingenieros senior. El sitio debe convertir visitantes en oportunidades de consultoría, lectores de mis libros, y conexiones profesionales — no ser un CV decorado.

## Stack técnico requerido

- **HTML5 + CSS3 + JavaScript vanilla** (sin frameworks, sitio estático para hosting simple)
- Mobile-first responsive design (breakpoints en 640px, 768px, 1024px)
- Soporte completo light/dark mode con `prefers-color-scheme` y toggle manual persistido en localStorage
- Bilingüe EN/ES con toggle en el header (mantener URLs `/` y `/es/`)
- Accesibilidad WCAG 2.1 AA: navegación por teclado, focus states visibles, aria-labels, contraste mínimo 4.5:1, skip-to-content link
- SEO: metadatos Open Graph, Twitter Card, schema.org Person + Book, sitemap.xml, robots.txt
- Performance: lazy loading de imágenes, CSS crítico inline, sin librerías pesadas, Lighthouse score >95

## Sistema de diseño

### Paleta de colores

**Light mode:**
- Background primary: `#FFFFFF`
- Background secondary: `#F7F7F5` (superficies sutiles)
- Background tertiary: `#FAFAF8` (page background)
- Text primary: `#0A0A0A`
- Text secondary: `#5F5E5A`
- Text tertiary: `#888780`
- Border: `rgba(0, 0, 0, 0.08)` (default), `rgba(0, 0, 0, 0.15)` (hover)
- Accent (verde teal, guiño al branding original): `#1D9E75`
- Accent muted: `#E1F5EE`
- Accent dark: `#0F6E56`

**Dark mode:**
- Background primary: `#0A0A0A`
- Background secondary: `#161616`
- Background tertiary: `#1F1F1F`
- Text primary: `#F5F5F5`
- Text secondary: `#A3A3A3`
- Text tertiary: `#737373`
- Border: `rgba(255, 255, 255, 0.1)`, `rgba(255, 255, 255, 0.18)`
- Accent: `#5DCAA5`
- Accent muted: `rgba(29, 158, 117, 0.15)`

### Tipografía

- Sans-serif: `Inter` (Google Fonts) o `system-ui` como fallback
- Mono: `JetBrains Mono` o `ui-monospace, SFMono-Regular, monospace` (para metadatos, etiquetas, números técnicos)
- Pesos: solo 400 (regular) y 500 (medium). NO usar 600 ni 700.
- Escala: h1=32px (48px en desktop), h2=22px, h3=18px, body=15px, small=13px, micro=11px
- Line-height: 1.6 para body, 1.3 para headings, 1.5 para subtítulos
- Sentence case en todo (NO Title Case, NO ALL CAPS excepto en `<code>` y etiquetas mono micro)

### Espaciado y layout

- Container max-width: 1080px, padding lateral 24px (40px en desktop)
- Vertical rhythm en rem: 1rem, 1.5rem, 2rem, 3rem, 4rem
- Border radius: 8px (md, default), 12px (lg, cards), 999px (pills)
- Bordes: 0.5px sólidos (no 1px), color del sistema
- Sin gradientes decorativos en UI general (excepto en las tarjetas de libros, ver sección Books)
- Sin drop shadows (excepto focus rings y la sutil elevación de las portadas de libros)

## Estructura de la página

Orden vertical exacto del sitio:

1. Header (sticky, blur backdrop)
2. Hero
3. Stats row
4. **Books** (sección destacada)
5. Selected work
6. Writing / Blog
7. About / Things I love (versión condensada)
8. Contact
9. Footer

### 1. Header

Sticky en top, altura 60px, backdrop-filter blur(12px), background con 80% opacidad sobre el page bg.

- **Izquierda:** logo `igvir` con un punto teal después (`igvir.`) en font-weight 500, font-size 16px, letter-spacing -0.01em
- **Centro/derecha (desktop):** nav links horizontales — "Work", "Books", "Writing", "About"
- **Derecha extrema:**
  - Toggle EN/ES (dos botones pill pequeños)
  - Toggle dark/light mode (icono sol/luna)
  - Botón "Contact" con fondo `text-primary` y texto `bg-primary` (inverso), padding 6px 14px, radius md
- **Mobile:** hamburger menu que despliega un panel desde top con los mismos enlaces

### 2. Hero

Padding vertical 80px desktop / 48px mobile. Grid 2 columnas en desktop (texto + avatar), una columna stacked en mobile.

Columna izquierda:
- Badge pill con dot animado pulsante teal: "Open to consulting" (font-size 12px, padding 4px 12px, bg accent-muted, color accent-dark)
- H1: dos líneas — "Cloud architectures" / "that actually scale." — el segundo verbo en accent color
- Párrafo de intro (máx 44ch): "I'm Igvir — Software Architect at GBM helping enterprises move to AWS without breaking what works. 6× AWS certified, TOGAF 9, author."
- Dos CTAs: "View work →" (primario, bg text-primary) y "Read the books" (secundario, border)

Columna derecha:
- Avatar circular 96px con iniciales "IR" sobre bg accent-muted, color accent-dark, font-size 32px, font-weight 500
- (Alternativa: foto real con fallback a iniciales si no carga)

### 3. Stats row

Banda horizontal de fondo bg-secondary, padding 24px, border-top y bottom. Grid de 4 columnas (2x2 en mobile).

Cada celda:
- Número grande (24px, weight 500). Primer número en accent color.
- Label debajo en text-secondary, 12px

Datos:
- `6×` AWS certified
- `12+` Years in cloud
- `{N}` Books published — **calcular dinámicamente** desde el conteo de `books.filter(b => b.status === 'published').length` para que se actualice automáticamente al agregar nuevos libros
- `∞` Coffees

### 4. Books — sección destacada

Esta es la sección más importante visualmente. Padding vertical 64px.

**Arquitectura crítica:** la sección debe ser **data-driven**. NO hardcodear cada libro en el HTML. En su lugar, crear un archivo `data/books.js` (o `data/books.json`) que exporte un array de objetos `book`, y renderizar las tarjetas iterando ese array con JavaScript vanilla en el cliente, o con un pequeño script de build si se prefiere generación estática. Esto permite agregar futuras publicaciones editando solo el array, sin tocar HTML/CSS.

**Estructura del schema de cada libro:**

```js
{
  id: "ai-tools",                          // slug único, usado para anclas y analytics
  status: "published",                     // "published" | "upcoming" | "draft" — solo "published" se renderiza, otros pueden mostrarse con badge "Próximamente"
  featured: true,                          // si true, aparece primero en el grid
  publishedYear: 2025,                     // para ordenamiento por defecto (más reciente primero)
  badge: { en: "BESTSELLER", es: "MÁS VENDIDO" },  // opcional, badge superior; si falta, no se renderiza
  title: { en: "AI Tools for Everyday Tasks", es: "IA para Tareas Cotidianas" },
  subtitle: {
    en: "The Complete Beginner's Guide to Working Smarter with AI",
    es: "La guía práctica para quienes quieren hacer más en menos tiempo"
  },
  description: {
    en: "The complete beginner's guide to working smarter with AI — for non-developers.",
    es: "La guía completa para principiantes que quieren trabajar de forma más inteligente con IA — para personas no técnicas."
  },
  cover: {
    en: "/images/books/ai-tools-en.png",
    es: "/images/books/ai-tools-es.png"
  },
  coverAlt: {
    en: "AI Tools for Everyday Tasks book cover",
    es: "Portada del libro IA para Tareas Cotidianas"
  },
  // Atmósfera visual de la tarjeta — extiende la paleta de la portada hacia el fondo
  theme: {
    gradientFrom: "#0d1a4d",
    gradientTo: "#1e2d6b",
    accentColor: "#ff9933",                // color del CTA primario y badges sutiles
    badgeBg: "rgba(255,165,0,0.18)",
    badgeColor: "#ffb84d",
    primaryCtaBg: "#ff9933",
    primaryCtaText: "#0d1a4d"
  },
  links: {
    buy: "https://leanpub.com/ai-tools",
    preview: "https://leanpub.com/ai-tools/read_sample"  // opcional
  },
  cta: {
    primary: { en: "Buy →", es: "Comprar →" },
    secondary: { en: "Preview", es: "Vista previa" }
  }
}
```

**Header de la sección:**
- H2: "Books" / "Libros"
- Subtítulo a la derecha en text-tertiary 12px: "Available on Leanpub" / "Disponibles en Leanpub"
- Párrafo de intro debajo (max-width 50ch): "Practical guides on AI and developer tooling, written for the people I wish I could clone for every project." / versión equivalente en ES.

**Grid responsive:**
- 1 libro publicado → 1 columna full-width (max-width 560px, centrado)
- 2 libros → 2 columnas en desktop, 1 en mobile
- 3 libros → 3 columnas en desktop (≥1024px), 2 en tablet, 1 en mobile
- 4+ libros → grid `repeat(auto-fit, minmax(280px, 1fr))` con gap 16px, y a partir del 5to libro activar scroll horizontal con `scroll-snap-type: x mandatory` en mobile como alternativa
- Gap consistente: 16px

Cada tarjeta de libro tiene padding 28px, border-radius lg, min-height 360px, overflow hidden, y aplica las propiedades del objeto `theme` mediante CSS custom properties inline:

```html
<article class="book-card" style="--book-from: #0d1a4d; --book-to: #1e2d6b; --book-accent: #ff9933;">
  ...
</article>
```

Y en CSS:
```css
.book-card {
  background: linear-gradient(180deg, var(--book-from) 0%, var(--book-to) 100%);
}
```

Esto mantiene el CSS limpio y permite que cada libro defina su propia atmósfera sin clases ad-hoc.

**Estructura interna de cada tarjeta:**
- Badge superior (si `badge` existe en el objeto)
- Imagen de portada centrada (usar `book.cover[currentLang]` para servir la versión correcta), altura ~200px, sombra `0 20px 40px rgba(0,0,0,0.4)`, hover con rotación 3D sutil (`rotateY(-5deg) rotateX(2deg)`) o mouse tracking si está habilitado
- Título del libro en blanco, 16px, weight 500
- Descripción en `rgba(255,255,255,0.65)`, 13px
- Dos botones (CTA primario con `theme.primaryCtaBg`, secundario con `rgba(255,255,255,0.1)`)

**Libros iniciales a incluir en `data/books.js`:**

```js
export const books = [

  // Libro 1 — el más reciente, featured
  {
    id: "kiro",
    status: "published",
    featured: true,
    publishedYear: 2026,
    badge: { en: "NEW · 2026", es: "NUEVO · 2026" },
    title: {
      en: "From Idea to Code in Minutes with Kiro",
      es: "De la Idea al Código en Minutos con Kiro"
    },
    subtitle: {
      en: "Boost your developer productivity with Kiro and AI assistants",
      es: "Aprende a potenciar tu productividad con Kiro"
    },
    description: {
      en: "Learn how to leverage Kiro and AI assistants to ship code faster without sacrificing quality.",
      es: "Aprende a potenciar tu productividad como desarrollador usando Kiro y AI assistants."
    },
    cover: {
      en: "/images/books/kiro-en.png",      // si solo existe versión ES, usar la misma para ambos idiomas
      es: "/images/books/kiro-es.png"
    },
    coverAlt: {
      en: "From Idea to Code in Minutes with Kiro book cover",
      es: "Portada del libro De la Idea al Código en Minutos con Kiro"
    },
    theme: {
      gradientFrom: "#1a0d3d",
      gradientTo: "#2d1561",
      accentColor: "#b794ff",
      badgeBg: "rgba(255,255,255,0.12)",
      badgeColor: "#d4c5ff",
      primaryCtaBg: "#ffffff",
      primaryCtaText: "#2d1561"
    },
    links: {
      buy: "https://leanpub.com/kiro",      // TODO: confirmar URL real
      preview: null
    },
    cta: {
      primary: { en: "Buy →", es: "Comprar →" },
      secondary: { en: "Preview", es: "Vista previa" }
    }
  },

  // Libro 2 — disponible en EN y ES con portadas distintas
  {
    id: "ai-tools",
    status: "published",
    featured: false,
    publishedYear: 2025,
    badge: { en: "BILINGUAL", es: "BILINGÜE" },
    title: {
      en: "AI Tools for Everyday Tasks",
      es: "IA para Tareas Cotidianas"
    },
    subtitle: {
      en: "The Complete Beginner's Guide to Working Smarter with AI",
      es: "La guía práctica para quienes quieren hacer más en menos tiempo"
    },
    description: {
      en: "The complete beginner's guide to working smarter with AI — for non-developers.",
      es: "La guía completa para trabajar de forma más inteligente con IA — pensada para personas no técnicas."
    },
    cover: {
      en: "/images/books/ai-tools-en.png",
      es: "/images/books/ai-tools-es.png"
    },
    coverAlt: {
      en: "AI Tools for Everyday Tasks book cover",
      es: "Portada del libro IA para Tareas Cotidianas"
    },
    theme: {
      gradientFrom: "#0d1a4d",
      gradientTo: "#1e2d6b",
      accentColor: "#ff9933",
      badgeBg: "rgba(255,165,0,0.18)",
      badgeColor: "#ffb84d",
      primaryCtaBg: "#ff9933",
      primaryCtaText: "#0d1a4d"
    },
    links: {
      buy: "https://leanpub.com/ai-tools",
      preview: "https://leanpub.com/ai-tools/read_sample"
    },
    cta: {
      primary: { en: "Buy →", es: "Comprar →" },
      secondary: { en: "Preview", es: "Vista previa" }
    }
  }

  // Para agregar un nuevo libro a futuro, simplemente añadir un objeto más a este array
  // siguiendo el mismo schema. La sección Books se actualiza automáticamente.

];
```

**Lógica de renderizado:**

```js
function renderBooks(lang) {
  const grid = document.querySelector('[data-books-grid]');
  const published = books
    .filter(b => b.status === 'published')
    .sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return b.publishedYear - a.publishedYear;
    });

  grid.innerHTML = published.map(book => bookCardHTML(book, lang)).join('');

  // Ajustar columnas según cantidad
  grid.dataset.count = published.length;
}
```

Y en CSS:
```css
[data-books-grid][data-count="1"] { grid-template-columns: minmax(0, 560px); justify-content: center; }
[data-books-grid][data-count="2"] { grid-template-columns: repeat(2, 1fr); }
[data-books-grid][data-count="3"] { grid-template-columns: repeat(3, 1fr); }
[data-books-grid]:not([data-count="1"]):not([data-count="2"]):not([data-count="3"]) {
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}
@media (max-width: 768px) {
  [data-books-grid] { grid-template-columns: 1fr !important; }
}
```

**Stats row de libros (debajo del grid):**

También debe ser data-driven — calcular dinámicamente desde el array:

```js
const stats = {
  published: books.filter(b => b.status === 'published').length,
  languages: [...new Set(books.flatMap(b => Object.keys(b.cover)))].map(l => l.toUpperCase()).join(' · '),
  platform: 'Leanpub'  // único por ahora; si en el futuro hay más, derivar de los links
};
```

Banda horizontal compacta con bg-secondary, padding 14px 16px, radius md, grid 3 columnas:
- "PUBLISHED" / valor calculado (ej. "2 books")
- "LANGUAGES" / valor calculado (ej. "EN · ES")
- "PLATFORM" / "Leanpub"

Etiquetas en font-mono 11px text-tertiary uppercase, valores debajo 13px weight 500.

**Reglas importantes para Books:**

- Los gradientes de cada tarjeta son la única excepción al "no gradients" del sistema — son intencionales porque extienden la atmósfera de cada portada.
- Las imágenes de portada deben tener `loading="lazy"` excepto la primera del grid (eager) para LCP.
- Si un libro tiene la misma portada para EN y ES (caso del Kiro inicialmente, antes de tener versión inglesa), apuntar ambos campos `cover.en` y `cover.es` al mismo archivo. La estructura debe permitir tanto libros monolingües como bilingües con portadas distintas.
- La carpeta `images/books/` debe seguir convención `{book-id}-{lang}.png`: `ai-tools-en.png`, `ai-tools-es.png`, `kiro-es.png`, etc.
- El selector de idioma del header debe re-renderizar la sección Books al cambiar de EN a ES (cambiar título, subtítulo, descripción, badge, CTA y portada).
- Cada tarjeta debe tener un atributo `data-book-id` para tracking futuro y para que el `id` se use como ancla (`#book-kiro`, `#book-ai-tools`).
- Si en el futuro hay un libro con `status: "upcoming"`, renderizar la tarjeta con un overlay sutil semi-transparente y reemplazar el CTA "Buy" por "Notify me" / "Avisarme" — pero solo si el flag `showUpcoming` global está activo. Por defecto `showUpcoming = false`.

**Documentar en el README cómo agregar un nuevo libro** con un ejemplo paso a paso (ver sección de entregables).

### 5. Selected work

Padding vertical 64px.

Header:
- H2 "Selected work" + label a la derecha: "Anonymized for NDA" en text-tertiary 12px

Grid 2x2 de tarjetas (1 columna en mobile). Cada tarjeta:
- Border 0.5px, radius lg, padding 20px, bg primary
- Hover: border-secondary y subtle translate Y -2px con transition 200ms
- Tags arriba (max 2): badges 11px con bg muted contextual (verde para AWS, morado para Architecture, amber para Leadership, coral para AI)
- Título del proyecto, 15px weight 500
- Descripción 1-2 líneas, 12px text-secondary
- Footer mono 11px text-tertiary con stack técnico o métricas

Proyectos a incluir (ya redactados, puedes ajustarlos):

1. **Banking core to multi-AZ** [AWS, Migration]
   "Led migration of legacy core banking to AWS with zero-downtime cutover."
   `99.99% SLA · -34% TCO`

2. **Retail event mesh** [Architecture, Event-driven]
   "Designed event-driven backbone serving 8M monthly transactions."
   `EventBridge · Lambda · DynamoDB`

3. **Building a cloud guild** [Leadership]
   "Mentored 14 engineers from associate to architect level over 18 months."
   `14 engineers · 9 certifications`

4. **RAG for internal docs** [AI, Bedrock]
   "Retrieval-augmented assistant on Bedrock, indexed 40k internal pages."
   `Bedrock · OpenSearch`

### 6. Writing / Blog

Padding vertical 64px.

Header H2 "Writing" + link "View all →" a https://blog.igvir.com

Lista vertical de 3 entradas (no grid, formato editorial). Cada entrada:
- Línea superior mono 11px text-tertiary: fecha + categoría (ej. "2026 · ESSAY")
- Título del post 16px weight 500
- Excerpt 13px text-secondary, max 2 líneas
- Separador 0.5px entre entradas

Posts:
1. "Why I wrote a book about AI for non-technical people" → blog.igvir.com/why-i-wrote...
2. "The AI that ran a store: Project Vend" → blog.igvir.com/the-ai-that-ran-a-store...
3. (Placeholder para un tercer post — dejar comentario en HTML)

### 7. About / Things I love

Padding vertical 64px. Layout de 2 columnas (1 en mobile).

Columna izquierda (60% width):
- H2 "About"
- Párrafo de bio expandida (3-4 líneas):
  "Computer Science Engineer with strong leadership and project management abilities. I love solving challenging engineering problems, working with software design patterns, and building engineering teams. Currently leading cloud architecture initiatives at GBM Corp."
- Línea: "Pronounce it: eegveer 😄" en text-secondary 13px

Columna derecha (40%):
- Subtítulo mono 11px uppercase: "THINGS I LOVE"
- Lista compacta en 2 columnas internas, font-size 13px, con un dot teal antes de cada item:
  Code · Cloud architecture · Building teams · Public speaking · Volunteering · Running · Books · Coffee · Swimming

### 8. Contact

Padding vertical 64px. Centrado, max-width 600px.

- H2 "Get in touch" centrado
- Párrafo: "Have a project, question, or just want to say hi? Pick whichever channel works best."
- Grid 2 columnas (1 en mobile) de "contact cards":
  - Email — info@igvir.com
  - LinkedIn — /in/igvir
  - Telegram — @igvircr
  - GitHub — /igvir
- Cada card: icono Tabler (24px), label, valor en text-secondary, hover sube border a secondary
- (Opcional: formulario simple debajo con name, email, message — pero solo si hay backend; si no, omitir y mantener solo los enlaces directos)

### 9. Footer

Padding 32px vertical, border-top.

- Izquierda: "© 2026 Igvir Ramírez · San José, Costa Rica · Built with care"
- Derecha: enlaces sociales en línea (LinkedIn, GitHub, Medium, Twitter, Credly, Telegram) — solo texto, 12px text-secondary, gap 14px
- **Eliminar** la atribución a HTML5 UP del footer actual

## Interacciones y micro-detalles

- **Smooth scroll** en anchor links con offset para el header sticky
- **Animación de entrada** en cada sección al hacer scroll: fade-up con `IntersectionObserver` (translateY 12px → 0, opacity 0 → 1, duration 600ms, ease-out). Respetar `prefers-reduced-motion`
- **Cursor sobre books cards:** rotación 3D sutil siguiendo el mouse con `transform: perspective(1000px) rotateX() rotateY()` calculado desde la posición relativa del mouse
- **Dot pulsante** del badge "Open to consulting": animación de 2s en loop con scale 1 → 1.3 y opacity 1 → 0.5
- **Toggle de dark mode** con transición de 200ms en background-color y color (no en todas las propiedades, eso es lento)

## Datos del proyecto

**Contacto y redes:**
- Email: info@igvir.com
- LinkedIn: https://www.linkedin.com/in/igvir/
- Twitter: https://twitter.com/igvir
- GitHub: https://www.github.com/igvir/
- Medium: https://medium.com/@igvirr
- Telegram: https://t.me/igvircr
- Credly: https://www.credly.com/users/igvir/badges
- Blog: https://blog.igvir.com

**Libros publicados** (todo el detalle vive en `data/books.js`, ver sección 4):
- *AI Tools for Everyday Tasks* — disponible en inglés y español, ambas versiones en Leanpub. Portadas distintas por idioma:
  - EN: `/images/books/ai-tools-en.png` → https://leanpub.com/ai-tools (en)
  - ES: `/images/books/ai-tools-es.png` → URL ES por confirmar (puede ser el mismo título de Leanpub con flag de idioma o un slug separado tipo `leanpub.com/ia-tareas-cotidianas`)
- *De la Idea al Código en Minutos con Kiro* — versión española lista, versión en inglés pendiente. Si la versión EN aún no existe, usar la portada ES en ambos idiomas como fallback temporal y marcar TODO en el data file.
  - ES: `/images/books/kiro-es.png` → URL Leanpub por confirmar
  - EN: pendiente — usar misma portada ES temporalmente

## Entregables esperados

1. `index.html` — versión inglés, completo y semántico
2. `es/index.html` — versión español (estructura idéntica, contenido traducido)
3. `styles.css` — un solo archivo con custom properties para el theme
4. `script.js` — toggle de tema, toggle de idioma, smooth scroll, intersection observer para animaciones, mouse-tracking para portadas, **renderizado de la sección Books desde `data/books.js`**
5. `data/books.js` — archivo de configuración de libros, exporta el array `books` con el schema definido en la sección 4
6. `images/` — directorio organizado:
   - `images/avatar.jpg`
   - `images/og-image.png`
   - `images/books/` — subdirectorio con convención `{book-id}-{lang}.png`:
     - `ai-tools-en.png`
     - `ai-tools-es.png`
     - `kiro-es.png`
     - `kiro-en.png` (placeholder o misma que ES si no existe aún)
7. `robots.txt` y `sitemap.xml` — el sitemap debe incluir anclas de cada libro publicado generadas automáticamente desde el array
8. **`README.md` con sección dedicada "Cómo agregar un nuevo libro"** que documente:
   - Paso 1: agregar las imágenes de portada en `images/books/` siguiendo la convención de nombres
   - Paso 2: añadir un nuevo objeto al array `books` en `data/books.js` siguiendo el schema (incluir un objeto-plantilla comentado al final del archivo como referencia)
   - Paso 3: definir los colores del `theme` (recomendación: tomar 2 colores dominantes de la portada y un acento contrastante)
   - Paso 4: probar localmente con `python -m http.server` o equivalente
   - Paso 5: si el libro tiene `status: "upcoming"`, activar el flag `showUpcoming = true` en `script.js` para que se renderice
   - Incluir un ejemplo completo de un tercer libro hipotético comentado, listo para descomentarse
9. README también debe explicar cómo desplegar (Cloudflare Pages, Netlify o GitHub Pages — recomendar uno por simplicidad)

## Restricciones importantes

- **NO usar frameworks ni build tools** (sin React, sin Next, sin Tailwind, sin Vite). HTML/CSS/JS plano servible desde cualquier static host.
- **NO usar librerías de animación** (sin GSAP, sin Framer). Solo CSS transitions + IntersectionObserver vanilla.
- **NO incluir tracking analytics** salvo que yo lo pida explícitamente. Sin Google Analytics, sin píxeles.
- **Iconos:** usar Tabler Icons vía CDN (https://cdn.jsdelivr.net/npm/@tabler/icons-webfont/dist/tabler-icons.min.css) o SVG inline para los pocos íconos que se usen.
- **Fonts:** Google Fonts con `display=swap` y preconnect, o self-hosted si prefieres performance.
- El código debe estar **bien comentado** en secciones clave (sistema de tema, observer, mouse tracking) pero sin comentarios redundantes.

## Tono y voz del contenido

- Profesional pero humano. Primera persona singular ("I design", "I'm Igvir").
- Frases cortas. Sin jerga corporativa vacía ("synergies", "leveraging").
- Honesto sobre lo que sé hacer, sin inflar credenciales.
- Bilingüe natural — el español no debe ser una traducción literal del inglés sino una versión nativa.

---

Genera todos los archivos completos, listos para desplegar. Si necesitas hacer asunciones sobre detalles no especificados (URL exacta del libro de Kiro, copy específico de algún CTA, etc.), hazlas y márcalas con un comentario `<!-- TODO: confirmar -->` para que pueda revisarlas después.
