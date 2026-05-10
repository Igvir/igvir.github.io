/**
 * Books data configuration
 * 
 * To add a new book, simply add a new object to this array following the schema below.
 * The Books section will re-render automatically.
 * 
 * Schema:
 * {
 *   id: string,           // unique slug, used for anchors and tracking
 *   status: string,       // "published" | "upcoming" | "draft"
 *   featured: boolean,    // if true, appears first in the grid
 *   publishedYear: number,
 *   badge: { en: string, es: string } | null,
 *   title: { en: string, es: string },
 *   subtitle: { en: string, es: string },
 *   description: { en: string, es: string },
 *   cover: { en: string, es: string },
 *   coverAlt: { en: string, es: string },
 *   theme: {
 *     gradientFrom: string,
 *     gradientTo: string,
 *     accentColor: string,
 *     badgeBg: string,
 *     badgeColor: string,
 *     primaryCtaBg: string,
 *     primaryCtaText: string
 *   },
 *   links: { buy: string, preview: string | null },
 *   cta: {
 *     primary: { en: string, es: string },
 *     secondary: { en: string, es: string }
 *   }
 * }
 */

const books = [

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
      en: "/images/books/kiro-es.png",  // TODO: replace with kiro-en.png when English version is available
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
      buy: { en: "https://leanpub.com/kiro", es: "https://leanpub.com/kiro" },
      amazon: { en: "https://www.amazon.com/dp/B0GQYGPRJY", es: "https://www.amazon.com/dp/B0GQYGPRJY" },
      preview: null
    },
    cta: {
      primary: { en: "Leanpub →", es: "Leanpub →" },
      secondary: { en: "Amazon →", es: "Amazon →" }
    }
  },

  // Libro 2 — disponible en EN y ES con portadas distintas
  {
    id: "ai-tools",
    status: "published",
    featured: false,
    publishedYear: 2025,
    badge: { en: "BILINGUAL", es: "Inglés y Español" },
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
      buy: { en: "https://leanpub.com/ai-tools", es: "https://leanpub.com/ia-tareas-cotidianas" },
      amazon: { en: "https://www.amazon.com/dp/B0GKFM3JVC", es: "https://www.amazon.com/dp/B0GPX2R1PK" },
      preview: null
    },
    cta: {
      primary: { en: "Leanpub →", es: "Leanpub →" },
      secondary: { en: "Amazon →", es: "Amazon →" }
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // TEMPLATE: Copy and uncomment the object below to add a new book.
  // ─────────────────────────────────────────────────────────────────────────────
  //
  // ,{
  //   id: "new-book-slug",
  //   status: "published",
  //   featured: false,
  //   publishedYear: 2026,
  //   badge: { en: "NEW", es: "NUEVO" },
  //   title: { en: "Book Title in English", es: "Título del Libro en Español" },
  //   subtitle: { en: "Subtitle in English", es: "Subtítulo en Español" },
  //   description: { en: "Short description.", es: "Descripción corta." },
  //   cover: { en: "/images/books/new-book-en.png", es: "/images/books/new-book-es.png" },
  //   coverAlt: { en: "Book cover alt text", es: "Texto alt de la portada" },
  //   theme: {
  //     gradientFrom: "#1a1a2e",
  //     gradientTo: "#16213e",
  //     accentColor: "#e94560",
  //     badgeBg: "rgba(233,69,96,0.18)",
  //     badgeColor: "#ff6b81",
  //     primaryCtaBg: "#e94560",
  //     primaryCtaText: "#ffffff"
  //   },
  //   links: { buy: { en: "https://leanpub.com/new-book", es: "https://leanpub.com/nuevo-libro" }, preview: null },
  //   cta: {
  //     primary: { en: "Buy →", es: "Comprar →" },
  //     secondary: { en: "Preview", es: "Vista previa" }
  //   }
  // }

];
