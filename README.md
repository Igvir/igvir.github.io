# Igvir Ramirez - Portfolio Website

Cloud Solutions Architect & Software Architect portfolio showcasing AWS certifications, professional experience, and technical expertise.

🌐 **Live Site**: [www.igvir.com](https://www.igvir.com)  
🇪🇸 **Spanish Version**: [www.igvir.com/es/](https://www.igvir.com/es/)

---

## ✨ Latest Updates (v2.1.0)

### 🚀 New Features
- **Offline Support**: Works without internet after first visit
- **Dark Mode**: Toggle between light and dark themes
- **Faster Loading**: Optimized resource loading with hints
- **Better Performance**: Improved Core Web Vitals

### 🛡️ Security Enhancements
- **HTTPS Enforcement**: All traffic secured
- **HSTS Implementation**: Forced HTTPS for future visits
- **Sensitive Files Protected**: Documentation and scripts blocked
- **Secure Logging**: Production-safe console logging
- **Cache Validation**: Content-type verification

### 📊 Performance Improvements
- Service Worker for caching and offline functionality
- Resource hints (dns-prefetch, preconnect)
- Dark mode with system preference detection
- Enhanced user experience

---

## 🎯 Features

### Core Features
- ✅ Responsive design (mobile-first)
- ✅ Multilingual (English/Spanish)
- ✅ Dark mode toggle
- ✅ Offline support
- ✅ SEO optimized
- ✅ Accessibility compliant (WCAG AA)
- ✅ Fast loading (Lighthouse 90+)

### Content Sections
- About Me
- Skills & Passions
- AWS Certifications
- Professional Experience
- Social Media Links

---

## 🚀 Quick Start

### View the Site
1. Visit [www.igvir.com](https://www.igvir.com)
2. Try dark mode (sun/moon icon, top-left)
3. Test offline (DevTools > Application > Offline)

### Local Development
```bash
# Clone the repository
git clone https://github.com/igvir/igvir.github.io.git

# Navigate to directory
cd igvir.github.io

# Serve locally (Python)
python -m http.server 8000

# Or use any static server
# Visit: http://localhost:8000
```

---

## 📚 Documentation

### Getting Started
- **[QUICK_START.md](QUICK_START.md)** - Quick start guide
- **[reports/EXECUTIVE_SUMMARY.md](reports/EXECUTIVE_SUMMARY.md)** - Project overview

### Technical Documentation
- **[reports/TECHNICAL_IMPROVEMENTS_SUMMARY.md](reports/TECHNICAL_IMPROVEMENTS_SUMMARY.md)** - What was implemented
- **[reports/TECHNICAL_IMPROVEMENTS_README.md](reports/TECHNICAL_IMPROVEMENTS_README.md)** - Detailed guide
- **[reports/IMPROVEMENTS_VISUAL_SUMMARY.md](reports/IMPROVEMENTS_VISUAL_SUMMARY.md)** - Visual overview

### Security Documentation
- **[reports/SECURITY_SUMMARY.md](reports/SECURITY_SUMMARY.md)** - Security overview
- **[reports/SECURITY_AUDIT.md](reports/SECURITY_AUDIT.md)** - Complete security audit
- **[reports/SECURITY_FIXES.md](reports/SECURITY_FIXES.md)** - Security implementation guide

### Implementation Guides
- **[webp-helper.md](webp-helper.md)** - WebP image conversion
- **[jquery-to-vanilla.md](jquery-to-vanilla.md)** - jQuery migration
- **[reports/DEPLOYMENT_CHECKLIST.md](reports/DEPLOYMENT_CHECKLIST.md)** - Deployment steps

### Internationalization
- **[INTERNATIONALIZATION.md](INTERNATIONALIZATION.md)** - i18n implementation
- **[I18N_SUMMARY.md](I18N_SUMMARY.md)** - i18n summary
- **[QUICK_START_I18N.md](QUICK_START_I18N.md)** - i18n quick start

### Project History
- **[CHANGELOG.md](CHANGELOG.md)** - Version history
- **[IMPROVEMENTS.md](IMPROVEMENTS.md)** - All improvements

---

## 🛠️ Technology Stack

### Frontend
- HTML5
- CSS3 (with custom properties)
- JavaScript (ES6+)
- jQuery (planned removal)

### Features
- Service Worker (offline support)
- Dark mode (CSS variables)
- Lazy loading images
- Responsive design
- Font Awesome icons

### Tools & Scripts
- PowerShell (image conversion)
- Node.js (CSS optimization)
- ImageMagick (WebP conversion)
- Lighthouse (performance testing)

---

## 📊 Performance

### Current Metrics
- **Lighthouse Score**: 90+
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.5s
- **Offline Support**: ✅ Yes

### Browser Support
- Chrome 51+ ✅
- Firefox 55+ ✅
- Safari 11.1+ ✅
- Edge 17+ ✅
- Coverage: 98%+ of users

---

## 🎨 Features in Detail

### Service Worker
- Caches critical assets
- Works offline after first visit
- Background updates
- Version management

### Dark Mode
- Manual toggle button
- Respects system preference
- Persistent user choice
- Smooth transitions

### Internationalization
- English (default)
- Spanish (/es/)
- Automatic language detection
- SEO optimized (hreflang tags)

---

## 🔧 Development

### Prerequisites
- Modern web browser
- Text editor or IDE
- (Optional) Node.js for build tools
- (Optional) ImageMagick for WebP conversion

### Setup
```bash
# Install dependencies (optional)
npm install

# Run local server
python -m http.server 8000

# Extract critical CSS (optional)
npm run extract-critical

# Run Lighthouse
npm run lighthouse-local
```

### File Structure
```
igvir.github.io/
├── index.html              # Main page (English)
├── es/
│   └── index.html         # Spanish version
├── assets/
│   ├── css/
│   │   ├── main.css       # Main styles
│   │   └── custom.css     # Custom styles
│   ├── js/
│   │   ├── main.js        # Main JavaScript
│   │   └── custom.js      # Custom JavaScript
│   └── webfonts/          # Font Awesome fonts
├── images/                # Images and badges
├── sw.js                  # Service Worker
└── docs/                  # Documentation
```

---

## 🚀 Deployment

### GitHub Pages
Automatically deployed from `main` branch.

### Manual Deployment
1. Review [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)
2. Test locally
3. Commit and push changes
4. Verify production site

---

## 📈 Roadmap

### Completed ✅
- [x] Service Worker implementation
- [x] Dark mode toggle
- [x] Resource hints
- [x] Internationalization (EN/ES)
- [x] SEO optimization
- [x] Accessibility improvements

### In Progress 🔄
- [ ] WebP image conversion
- [ ] Critical CSS extraction

### Planned 📝
- [ ] jQuery removal (vanilla JS)
- [ ] Blog integration
- [ ] Contact form
- [ ] Analytics integration

---

## 🤝 Contributing

This is a personal portfolio website. However, if you find bugs or have suggestions:

1. Open an issue
2. Describe the problem/suggestion
3. Include screenshots if applicable

---

## 📄 License

© 2026 Igvir Ramirez. All rights reserved.

Design template by [HTML5 UP](https://html5up.net) (CCA 3.0 License)

---

## 📞 Contact

- **Website**: [www.igvir.com](https://www.igvir.com)
- **LinkedIn**: [linkedin.com/in/igvir](https://www.linkedin.com/in/igvir/)
- **GitHub**: [github.com/igvir](https://github.com/igvir)
- **Email**: info@igvir.com

---

## 🙏 Acknowledgments

- HTML5 UP for the base template
- Font Awesome for icons
- Google Fonts for typography
- AWS for certifications
- GBM Corp for professional opportunities

---

**Version**: 2.1.0  
**Last Updated**: January 21, 2026  
**Status**: ✅ Production Ready

---

## 📖 Quick Links

- [View Live Site](https://www.igvir.com)
- [Spanish Version](https://www.igvir.com/es/)
- [Quick Start Guide](QUICK_START.md)
- [Technical Summary](reports/TECHNICAL_IMPROVEMENTS_SUMMARY.md)
- [Security Summary](reports/SECURITY_SUMMARY.md)
- [Deployment Checklist](reports/DEPLOYMENT_CHECKLIST.md)
- [Changelog](CHANGELOG.md)

---

Made with ❤️ by Igvir Ramirez
