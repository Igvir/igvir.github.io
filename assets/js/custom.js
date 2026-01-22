/**
 * Custom JavaScript for Igvir Ramirez Portfolio
 * Enhancements for performance, accessibility, and user experience
 */

(function() {
    'use strict';

    // Language detection and redirect (only on first visit)
    function detectAndRedirectLanguage() {
        // Only run on homepage
        if (window.location.pathname !== '/' && window.location.pathname !== '/index.html') {
            return;
        }

        // Check if user has already been redirected
        const hasVisited = sessionStorage.getItem('languageDetected');
        if (hasVisited) {
            return;
        }

        // Get browser language
        const userLang = navigator.language || navigator.userLanguage;
        const langCode = userLang.split('-')[0]; // Get 'es' from 'es-ES'

        // If Spanish and not already on Spanish page, redirect
        if (langCode === 'es') {
            sessionStorage.setItem('languageDetected', 'true');
            window.location.href = '/es/';
        } else {
            sessionStorage.setItem('languageDetected', 'true');
        }
    }

    // Run language detection
    detectAndRedirectLanguage();

    // Lazy loading images - mark as loaded when they appear
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Add smooth scroll behavior for better UX
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Track external link clicks (for analytics if needed)
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.addEventListener('click', function() {
            // Placeholder for analytics tracking
            console.log('External link clicked:', this.href);
        });
    });

    // Add keyboard navigation improvements
    document.addEventListener('keydown', function(e) {
        // ESC key to return to top
        if (e.key === 'Escape') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    // Performance: Preload critical images
    function preloadImages() {
        const criticalImages = [
            'images/avatar.jpg',
            'images/banner5-white-small.png'
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', preloadImages);
    } else {
        preloadImages();
    }

    // Add loading state to page
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Service Worker registration for PWA capabilities (optional)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            // Uncomment when service worker is ready
            // navigator.serviceWorker.register('/sw.js').then(function(registration) {
            //     console.log('ServiceWorker registered:', registration);
            // }).catch(function(err) {
            //     console.log('ServiceWorker registration failed:', err);
            // });
        });
    }

    // Add current year to footer dynamically
    const copyrightElement = document.querySelector('.copyright li:first-child');
    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        copyrightElement.textContent = `© ${currentYear} Igvir Ramirez. All rights reserved.`;
    }

    // Accessibility: Announce page changes to screen readers
    function announcePageChange(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    // Monitor section visibility for navigation updates
    if ('IntersectionObserver' in window) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    const navLink = document.querySelector(`nav a[href="#${id}"]`);
                    if (navLink) {
                        document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
                        navLink.classList.add('active');
                    }
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('section[id]').forEach(section => {
            sectionObserver.observe(section);
        });
    }

})();
