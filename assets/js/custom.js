/**
 * Custom JavaScript for Igvir Ramirez Portfolio
 * Enhancements for performance, accessibility, and user experience
 */

(function() {
    'use strict';

    // Dark Mode Toggle
    function initDarkMode() {
        const themeToggle = document.querySelector('.theme-toggle');
        const sunIcon = document.querySelector('.sun-icon');
        const moonIcon = document.querySelector('.moon-icon');
        const html = document.documentElement;

        // Check for saved theme preference or default to system preference
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme) {
            html.setAttribute('data-theme', savedTheme);
            updateIcons(savedTheme === 'dark');
        } else if (systemPrefersDark) {
            html.setAttribute('data-theme', 'dark');
            updateIcons(true);
        }

        function updateIcons(isDark) {
            if (isDark) {
                sunIcon.style.display = 'none';
                moonIcon.style.display = 'block';
            } else {
                sunIcon.style.display = 'block';
                moonIcon.style.display = 'none';
            }
        }

        themeToggle.addEventListener('click', function() {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateIcons(newTheme === 'dark');
        });

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                const newTheme = e.matches ? 'dark' : 'light';
                html.setAttribute('data-theme', newTheme);
                updateIcons(e.matches);
            }
        });
    }

    // Initialize dark mode
    initDarkMode();

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
            // Only log in development
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                console.log('External link clicked:', this.href);
            }
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

    // Service Worker registration for PWA capabilities
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js').then(function(registration) {
                // Only log in development
                if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                    console.log('ServiceWorker registered:', registration.scope);
                }
            }).catch(function(err) {
                // Only log errors in development
                if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                    console.log('ServiceWorker registration failed:', err);
                }
            });
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

    // Contact Form Handler with reCAPTCHA
    function initContactForm() {
        const form = document.getElementById('contact-form');
        const formStatus = document.getElementById('form-status');

        if (!form) return;

        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Show loading state
            const submitButton = form.querySelector('input[type="submit"]');
            const originalButtonText = submitButton.value;
            submitButton.value = 'Sending...';
            submitButton.disabled = true;

            // Hide any previous status
            formStatus.style.display = 'none';

            try {
                // Prepare form data
                const formDataObj = new FormData();
                formDataObj.append('name', document.getElementById('name').value);
                formDataObj.append('email', document.getElementById('email').value);
                formDataObj.append('_replyto', document.getElementById('email').value); // Formspree reply-to field
                formDataObj.append('_subject', document.getElementById('subject').value); // Formspree subject field
                formDataObj.append('message', document.getElementById('message').value);

                // Get reCAPTCHA token if available
                let recaptchaSuccess = false;
                
                // Wait for grecaptcha to be ready
                if (typeof grecaptcha !== 'undefined') {
                    try {
                        // Wait for grecaptcha.ready
                        await new Promise((resolve) => {
                            grecaptcha.ready(() => {
                                console.log('grecaptcha is ready');
                                resolve();
                            });
                        });

                        const recaptchaScript = document.querySelector('script[src*="recaptcha"]');
                        const siteKey = recaptchaScript ? recaptchaScript.src.match(/render=([^&]+)/)?.[1] : null;
                        
                        if (siteKey) {
                            console.log('Executing reCAPTCHA with site key:', siteKey);
                            const token = await grecaptcha.execute(siteKey, { action: 'submit' });
                            if (token) {
                                formDataObj.append('g-recaptcha-response', token);
                                recaptchaSuccess = true;
                                console.log('reCAPTCHA token obtained successfully');
                            } else {
                                console.error('reCAPTCHA execute returned no token');
                            }
                        } else {
                            console.error('Could not find reCAPTCHA site key in script tag');
                        }
                    } catch (recaptchaError) {
                        console.error('reCAPTCHA error:', recaptchaError);
                    }
                } else {
                    console.error('grecaptcha is not defined - script may not have loaded');
                }

                if (!recaptchaSuccess) {
                    console.error('reCAPTCHA failed - form submission will likely be rejected by Formspree');
                    
                    // Show user-friendly error
                    formStatus.style.display = 'block';
                    formStatus.style.backgroundColor = '#fff3cd';
                    formStatus.style.color = '#856404';
                    formStatus.style.border = '1px solid #ffeaa7';
                    formStatus.innerHTML = '⚠️ Security verification failed. Please refresh the page and try again, or email me directly at <a href="mailto:info@igvir.com" style="color: #856404; text-decoration: underline;">info@igvir.com</a>';
                    
                    submitButton.value = originalButtonText;
                    submitButton.disabled = false;
                    return; // Don't submit without reCAPTCHA
                }

                console.log('Submitting form data:', {
                    name: formDataObj.get('name'),
                    email: formDataObj.get('email'),
                    subject: formDataObj.get('_subject'),
                    message: formDataObj.get('message'),
                    hasRecaptcha: recaptchaSuccess
                });

                // Submit to Formspree
                const response = await fetch('https://formspree.io/f/mdaeazkb', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json'
                    },
                    body: formDataObj
                });

                const data = await response.json();

                if (response.ok) {
                    // Success
                    formStatus.style.display = 'block';
                    formStatus.style.backgroundColor = '#d4edda';
                    formStatus.style.color = '#155724';
                    formStatus.style.border = '1px solid #c3e6cb';
                    formStatus.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
                    form.reset();
                } else {
                    // Formspree error
                    console.error('Formspree error response:', {
                        status: response.status,
                        statusText: response.statusText,
                        data: data
                    });
                    throw new Error(data.error || data.errors?.[0]?.message || 'Form submission failed');
                }
            } catch (error) {
                console.error('Form submission error:', error);
                
                // Show error message
                formStatus.style.display = 'block';
                formStatus.style.backgroundColor = '#f8d7da';
                formStatus.style.color = '#721c24';
                formStatus.style.border = '1px solid #f5c6cb';
                formStatus.innerHTML = `❌ Unable to send message. Please email me directly at <a href="mailto:info@igvir.com" style="color: #721c24; text-decoration: underline;">info@igvir.com</a>`;
            } finally {
                // Reset button
                submitButton.value = originalButtonText;
                submitButton.disabled = false;

                // Hide status message after 8 seconds
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 8000);
            }
        });
    }

    // Initialize contact form
    initContactForm();

})();
