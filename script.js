/**
 * igvir.com — Main Script
 * Theme toggle, language switch, scroll animations, books rendering, mouse tracking
 */

(function() {
  'use strict';

  // ─── Configuration ─────────────────────────────────────────────────────────
  const showUpcoming = false; // Set to true to show books with status "upcoming"

  // ─── Language Management ───────────────────────────────────────────────────
  function getLang() {
    // Detect from URL path
    if (window.location.pathname.startsWith('/es')) return 'es';
    return 'en';
  }

  const currentLang = getLang();

  // ─── Theme Management ─────────────────────────────────────────────────────
  function initTheme() {
    const html = document.documentElement;
    const toggle = document.querySelector('.theme-toggle');
    if (!toggle) return;

    const saved = localStorage.getItem('theme');
    if (saved) {
      html.setAttribute('data-theme', saved);
    }

    toggle.addEventListener('click', function() {
      const current = html.getAttribute('data-theme');
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      let newTheme;
      if (current === 'dark') {
        newTheme = 'light';
      } else if (current === 'light') {
        newTheme = 'dark';
      } else {
        // No explicit theme set, toggle from system preference
        newTheme = systemDark ? 'light' : 'dark';
      }

      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  // ─── Language Toggle ───────────────────────────────────────────────────────
  function initLangToggle() {
    const buttons = document.querySelectorAll('.lang-toggle button');
    buttons.forEach(function(btn) {
      btn.addEventListener('click', function() {
        const lang = this.getAttribute('data-lang');
        if (lang === 'es' && currentLang !== 'es') {
          window.location.href = '/es/';
        } else if (lang === 'en' && currentLang !== 'en') {
          window.location.href = '/';
        }
      });
    });
  }

  // ─── Mobile Menu ───────────────────────────────────────────────────────────
  function initMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.mobile-nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', function() {
      nav.classList.toggle('open');
      const expanded = nav.classList.contains('open');
      toggle.setAttribute('aria-expanded', expanded);
    });

    // Close on link click
    nav.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ─── Scroll Animations ────────────────────────────────────────────────────
  function initScrollAnimations() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-up').forEach(function(el) {
      observer.observe(el);
    });
  }

  // ─── Books Rendering ──────────────────────────────────────────────────────
  function renderBooks() {
    var grid = document.querySelector('[data-books-grid]');
    if (!grid || typeof books === 'undefined') return;

    var published = books.filter(function(b) {
      if (b.status === 'published') return true;
      if (b.status === 'upcoming' && showUpcoming) return true;
      return false;
    }).sort(function(a, b) {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return b.publishedYear - a.publishedYear;
    });

    grid.innerHTML = published.map(function(book, index) {
      return bookCardHTML(book, currentLang, index === 0);
    }).join('');

    grid.dataset.count = published.length;

    // Update stats
    updateBookStats(published);

    // Init mouse tracking on book covers
    initBookMouseTracking();
  }

  function bookCardHTML(book, lang, isFirst) {
    var badge = '';
    if (book.badge && book.badge[lang]) {
      badge = '<span class="book-badge" style="--book-badge-bg:' + book.theme.badgeBg + ';--book-badge-color:' + book.theme.badgeColor + '">' + book.badge[lang] + '</span>';
    }

    var coverSrc = book.cover[lang] || book.cover.es || book.cover.en;
    var coverAlt = book.coverAlt[lang] || book.coverAlt.es || '';
    var loadingAttr = isFirst ? 'eager' : 'lazy';

    var secondaryCta = '';
    var previewLink = book.links.preview;
    if (previewLink && typeof previewLink === 'object') previewLink = previewLink[lang] || previewLink.en;
    if (previewLink && book.cta.secondary) {
      secondaryCta = '<a href="' + previewLink + '" target="_blank" rel="noopener noreferrer" class="book-cta-secondary">' + book.cta.secondary[lang] + '</a>';
    }

    var buyLink = book.links.buy;
    if (buyLink && typeof buyLink === 'object') buyLink = buyLink[lang] || buyLink.en;

    var upcoming = book.status === 'upcoming';
    var primaryLabel = upcoming
      ? (lang === 'es' ? 'Avisarme' : 'Notify me')
      : book.cta.primary[lang];

    return '<article class="book-card" data-book-id="' + book.id + '" id="book-' + book.id + '" style="--book-from:' + book.theme.gradientFrom + ';--book-to:' + book.theme.gradientTo + ';--book-cta-bg:' + book.theme.primaryCtaBg + ';--book-cta-text:' + book.theme.primaryCtaText + '">' +
      badge +
      '<div class="book-cover-wrapper">' +
        '<img class="book-cover" src="' + coverSrc + '" alt="' + coverAlt + '" loading="' + loadingAttr + '" width="160" height="200" />' +
      '</div>' +
      '<h3 class="book-title">' + book.title[lang] + '</h3>' +
      '<p class="book-description">' + book.description[lang] + '</p>' +
      '<div class="book-ctas">' +
        '<a href="' + buyLink + '" target="_blank" rel="noopener noreferrer" class="book-cta-primary">' + primaryLabel + '</a>' +
        secondaryCta +
      '</div>' +
    '</article>';
  }

  function updateBookStats(published) {
    var countEl = document.querySelector('[data-books-count]');
    var langsEl = document.querySelector('[data-books-langs]');

    if (countEl) {
      var bookWord = currentLang === 'es'
        ? (published.length === 1 ? ' libro' : ' libros')
        : (published.length === 1 ? ' book' : ' books');
      countEl.textContent = published.length + bookWord;
    }
    if (langsEl) {
      var langs = [];
      published.forEach(function(b) {
        Object.keys(b.cover).forEach(function(l) {
          if (langs.indexOf(l.toUpperCase()) === -1) langs.push(l.toUpperCase());
        });
      });
      langsEl.textContent = langs.join(' · ');
    }

    // Update hero stats
    var heroBooksStat = document.querySelector('[data-stat-books]');
    if (heroBooksStat) {
      heroBooksStat.textContent = published.length;
    }
  }

  // ─── Book Mouse Tracking (3D tilt) ────────────────────────────────────────
  function initBookMouseTracking() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if ('ontouchstart' in window) return; // Skip on touch devices

    document.querySelectorAll('.book-card').forEach(function(card) {
      card.addEventListener('mousemove', function(e) {
        var rect = card.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width;
        var y = (e.clientY - rect.top) / rect.height;
        var rotateX = (y - 0.5) * -8;
        var rotateY = (x - 0.5) * 8;

        var cover = card.querySelector('.book-cover');
        if (cover) {
          cover.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
        }
      });

      card.addEventListener('mouseleave', function() {
        var cover = card.querySelector('.book-cover');
        if (cover) {
          cover.style.transform = '';
        }
      });
    });
  }

  // ─── Smooth Scroll ─────────────────────────────────────────────────────────
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        var href = this.getAttribute('href');
        if (href === '#') return;
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // ─── Initialize ────────────────────────────────────────────────────────────
  function init() {
    initTheme();
    initLangToggle();
    initMobileMenu();
    initSmoothScroll();
    renderBooks();
    initScrollAnimations();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
