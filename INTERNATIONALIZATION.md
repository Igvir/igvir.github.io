# Internationalization (i18n) Guide

## Overview

This website supports multiple languages to reach a broader audience. Currently available languages:

- **English (en)**: Default language - https://www.igvir.com/
- **Spanish (es)**: Spanish version - https://www.igvir.com/es/

## Implementation Details

### Directory Structure

```
/
├── index.html              # English version
├── es/
│   ├── index.html         # Spanish version
│   └── 404.html           # Spanish 404 page
├── 404.html               # English 404 page
└── assets/                # Shared assets
```

### Language Detection

The site automatically detects the user's browser language on first visit:

1. Checks `navigator.language` or `navigator.userLanguage`
2. Extracts language code (e.g., 'es' from 'es-ES')
3. Redirects Spanish speakers to `/es/` automatically
4. Uses `sessionStorage` to prevent repeated redirects

**Code location**: `assets/js/custom.js` - `detectAndRedirectLanguage()` function

### Language Switcher

A fixed language switcher appears in the top-right corner of every page:

- **Position**: Fixed top-right
- **Design**: Minimal, semi-transparent background
- **Functionality**: Direct links to language versions
- **Active state**: Highlighted current language

**Styles location**: `assets/css/custom.css` - `.language-switcher` section

### SEO Implementation

#### Hreflang Tags

Each page includes hreflang tags to tell search engines about language versions:

```html
<link rel="alternate" hreflang="en" href="https://www.igvir.com/" />
<link rel="alternate" hreflang="es" href="https://www.igvir.com/es/" />
<link rel="alternate" hreflang="x-default" href="https://www.igvir.com/" />
```

- `hreflang="en"`: English version
- `hreflang="es"`: Spanish version
- `hreflang="x-default"`: Default for unmatched languages

#### Open Graph Locale

Open Graph tags include locale information:

```html
<!-- English -->
<meta property="og:locale" content="en_US" />
<meta property="og:locale:alternate" content="es_ES" />

<!-- Spanish -->
<meta property="og:locale" content="es_ES" />
<meta property="og:locale:alternate" content="en_US" />
```

#### Sitemap

The sitemap includes both language versions with proper hreflang annotations:

```xml
<url>
  <loc>https://www.igvir.com/</loc>
  <xhtml:link rel="alternate" hreflang="es" href="https://www.igvir.com/es/" />
  <xhtml:link rel="alternate" hreflang="en" href="https://www.igvir.com/" />
</url>
```

### HTML Lang Attribute

Each page has the appropriate `lang` attribute:

```html
<!-- English -->
<html lang="en">

<!-- Spanish -->
<html lang="es">
```

## Adding a New Language

To add a new language (e.g., Portuguese):

### 1. Create Language Directory

```bash
mkdir pt
```

### 2. Copy and Translate Content

```bash
cp index.html pt/index.html
cp 404.html pt/404.html
```

### 3. Update HTML

- Change `<html lang="en">` to `<html lang="pt">`
- Update all text content to Portuguese
- Update meta descriptions and titles
- Update Open Graph locale to `pt_BR` or `pt_PT`

### 4. Add Hreflang Tags

Add to all language versions:

```html
<link rel="alternate" hreflang="pt" href="https://www.igvir.com/pt/" />
```

### 5. Update Language Switcher

Add Portuguese option to all pages:

```html
<div class="language-switcher">
    <a href="/" class="lang-link">EN</a>
    <span class="lang-separator">|</span>
    <a href="/es/" class="lang-link">ES</a>
    <span class="lang-separator">|</span>
    <a href="/pt/" class="lang-link">PT</a>
</div>
```

### 6. Update Language Detection

In `assets/js/custom.js`, add Portuguese detection:

```javascript
if (langCode === 'es') {
    window.location.href = '/es/';
} else if (langCode === 'pt') {
    window.location.href = '/pt/';
}
```

### 7. Update Sitemap

Add Portuguese URLs to `sitemap.xml` with hreflang annotations.

### 8. Update Open Graph

Add alternate locale:

```html
<meta property="og:locale:alternate" content="pt_BR" />
```

## Translation Checklist

When translating content, ensure you translate:

- [ ] Page title (`<title>`)
- [ ] Meta description
- [ ] Meta keywords
- [ ] Open Graph title and description
- [ ] Twitter Card title and description
- [ ] All heading text (h1, h2, h3, h4)
- [ ] All paragraph content
- [ ] Navigation menu items
- [ ] Button and link text
- [ ] Alt text for images
- [ ] ARIA labels
- [ ] Footer text
- [ ] Error messages
- [ ] Form labels (if any)
- [ ] Structured data (JSON-LD)

## Best Practices

### Content Parity

- Maintain the same content structure across all languages
- Keep the same number of sections
- Use equivalent images and media
- Ensure all links work in all languages

### URL Structure

- Use subdirectories for languages: `/es/`, `/pt/`, etc.
- Keep English as the root: `/`
- Use consistent URL patterns across languages

### SEO Considerations

- Each language version should have unique meta descriptions
- Translate keywords appropriately for each market
- Use proper locale codes (en_US, es_ES, pt_BR, etc.)
- Submit all language versions to Google Search Console

### User Experience

- Make language switcher easily accessible
- Preserve user's language choice across sessions (optional)
- Don't force redirects on every page load
- Provide clear indication of current language

### Maintenance

- Update all language versions when adding new content
- Keep translations synchronized
- Test all language versions regularly
- Monitor analytics for each language

## Testing

### Manual Testing

1. **Language Detection**
   - Change browser language settings
   - Clear sessionStorage
   - Visit homepage
   - Verify correct redirect

2. **Language Switcher**
   - Click each language option
   - Verify correct page loads
   - Check active state highlighting

3. **SEO Tags**
   - View page source
   - Verify hreflang tags present
   - Check Open Graph locale tags
   - Validate sitemap

### Automated Testing

Use these tools to validate implementation:

- **Hreflang Validator**: https://www.aleydasolis.com/english/international-seo-tools/hreflang-tags-generator/
- **Google Search Console**: Check international targeting
- **Screaming Frog**: Crawl site and check hreflang
- **Sitemap Validator**: https://www.xml-sitemaps.com/validate-xml-sitemap.html

## Analytics

Track language performance separately:

### Google Analytics

Set up content grouping by language:

```javascript
// English
gtag('config', 'GA_MEASUREMENT_ID', {
  'content_group': 'English'
});

// Spanish
gtag('config', 'GA_MEASUREMENT_ID', {
  'content_group': 'Spanish'
});
```

### Metrics to Monitor

- Page views per language
- Bounce rate per language
- Average session duration per language
- Conversion rate per language
- Geographic distribution of visitors

## Common Issues

### Issue: Redirect Loop

**Cause**: Language detection runs on every page load
**Solution**: Use sessionStorage to track if detection already ran

### Issue: Wrong Language Detected

**Cause**: Browser language doesn't match user preference
**Solution**: Provide manual language switcher (already implemented)

### Issue: Search Engines Indexing Wrong Language

**Cause**: Missing or incorrect hreflang tags
**Solution**: Validate hreflang implementation with Google Search Console

### Issue: Duplicate Content Penalty

**Cause**: Search engines see translations as duplicate content
**Solution**: Proper hreflang tags tell search engines these are translations

## Resources

- [Google's International SEO Guide](https://developers.google.com/search/docs/advanced/crawling/localized-versions)
- [Hreflang Best Practices](https://moz.com/learn/seo/hreflang-tag)
- [W3C Internationalization](https://www.w3.org/International/)
- [MDN Web Docs - lang attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)

## Support

For questions or issues with internationalization:

- Check this documentation first
- Review implementation in existing language versions
- Test with browser developer tools
- Validate with SEO tools mentioned above

---

Last Updated: January 21, 2026
