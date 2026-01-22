# Deployment Guide

## GitHub Pages Deployment

Your site is already configured for GitHub Pages. Here's what you need to know:

### Current Setup
- **Repository**: igvir/igvir.github.io
- **Custom Domain**: www.igvir.com (configured via CNAME)
- **Branch**: main (or master)

### Deployment Steps

1. **Commit and Push Changes**
   ```bash
   git add .
   git commit -m "Implement SEO, accessibility, and performance improvements"
   git push origin main
   ```

2. **Verify Deployment**
   - Go to your repository settings
   - Navigate to Pages section
   - Ensure source is set to main branch
   - Check that custom domain is configured

3. **DNS Configuration**
   - Ensure your DNS has these records:
     ```
     CNAME: www.igvir.com → igvir.github.io
     A: igvir.com → GitHub Pages IPs
     ```

### Post-Deployment Checklist

#### Immediate Testing
- [ ] Visit https://www.igvir.com and verify site loads
- [ ] Test all navigation links
- [ ] Verify social media links work
- [ ] Check mobile responsiveness
- [ ] Test keyboard navigation (Tab key)
- [ ] Verify skip-to-content link works

#### SEO Verification
- [ ] Test Open Graph tags: https://www.opengraph.xyz/
- [ ] Test Twitter Cards: https://cards-dev.twitter.com/validator
- [ ] Verify structured data: https://search.google.com/test/rich-results
- [ ] Validate hreflang tags: https://www.aleydasolis.com/english/international-seo-tools/hreflang-tags-generator/
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify both language versions are indexed

#### Internationalization Testing
- [ ] Test language switcher on all pages
- [ ] Verify automatic language detection works
- [ ] Test with browser set to Spanish
- [ ] Test with browser set to English
- [ ] Verify hreflang tags on both versions
- [ ] Check that Spanish 404 page works
- [ ] Verify all translations are accurate

#### Performance Testing
- [ ] Run Lighthouse audit in Chrome DevTools
- [ ] Test on PageSpeed Insights: https://pagespeed.web.dev/
- [ ] Check Core Web Vitals
- [ ] Verify lazy loading works
- [ ] Test caching headers

#### Accessibility Testing
- [ ] Run WAVE accessibility checker: https://wave.webaim.org/
- [ ] Test with screen reader (NVDA or JAWS)
- [ ] Verify keyboard navigation
- [ ] Check color contrast ratios
- [ ] Test with browser zoom at 200%

#### Cross-Browser Testing
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (macOS/iOS)
- [ ] Mobile browsers (iOS Safari, Chrome Android)

#### Security Testing
- [ ] Verify security headers: https://securityheaders.com/
- [ ] Check SSL certificate
- [ ] Test CSP implementation
- [ ] Verify no mixed content warnings

## Alternative Hosting Options

### Netlify

1. **Connect Repository**
   - Sign up at netlify.com
   - Connect your GitHub repository
   - Configure build settings (none needed for static site)

2. **Configure Domain**
   - Add custom domain in Netlify settings
   - Update DNS records as instructed

3. **Benefits**
   - Automatic HTTPS
   - Built-in CDN
   - Form handling
   - Serverless functions support
   - Better _headers support

### Vercel

1. **Import Project**
   - Sign up at vercel.com
   - Import from GitHub
   - Deploy automatically

2. **Configure Domain**
   - Add domain in project settings
   - Update DNS records

3. **Benefits**
   - Edge network
   - Automatic HTTPS
   - Preview deployments
   - Analytics

### Cloudflare Pages

1. **Connect Repository**
   - Sign up at pages.cloudflare.com
   - Connect GitHub repository
   - Configure build

2. **Benefits**
   - Global CDN
   - DDoS protection
   - Web Analytics
   - Workers for serverless

## Optimization Tips

### Before Deployment

1. **Optimize Images**
   ```bash
   # Convert to WebP (if you have tools installed)
   cwebp -q 80 images/avatar.jpg -o images/avatar.webp
   ```

2. **Minify CSS/JS** (if not already done)
   ```bash
   # Using npm packages
   npm install -g clean-css-cli uglify-js
   cleancss -o assets/css/main.min.css assets/css/main.css
   uglifyjs assets/js/custom.js -o assets/js/custom.min.js
   ```

3. **Test Locally**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Or using Node.js
   npx http-server
   ```

### After Deployment

1. **Set up Google Search Console**
   - Add property for www.igvir.com
   - Submit sitemap.xml
   - Monitor indexing status

2. **Configure Analytics**
   - Add Google Analytics or alternative
   - Set up conversion tracking
   - Monitor user behavior

3. **Set up Monitoring**
   - Use UptimeRobot for uptime monitoring
   - Configure alerts for downtime
   - Monitor performance metrics

## Continuous Improvement

### Weekly Tasks
- Check analytics for insights
- Review error logs
- Monitor performance metrics

### Monthly Tasks
- Update certifications if new ones earned
- Review and update content
- Check for broken links
- Update dependencies

### Quarterly Tasks
- Run full accessibility audit
- Review SEO performance
- Update meta descriptions if needed
- Analyze user feedback

## Troubleshooting

### Site Not Updating
1. Clear browser cache (Ctrl+Shift+R)
2. Check GitHub Actions for build errors
3. Verify DNS propagation: https://dnschecker.org/
4. Wait 5-10 minutes for CDN cache to clear

### Images Not Loading
1. Check file paths are correct
2. Verify images are committed to repository
3. Check browser console for errors
4. Verify CORS headers if using external images

### Styles Not Applied
1. Clear browser cache
2. Check CSS file paths
3. Verify CSS files are committed
4. Check for CSS syntax errors

### Security Headers Not Working
1. Verify .htaccess is uploaded (Apache)
2. Check _headers file (Netlify/GitHub Pages)
3. Test with: https://securityheaders.com/
4. Contact hosting support if needed

## Support Resources

- **GitHub Pages Docs**: https://docs.github.com/pages
- **HTML5 UP Support**: https://html5up.net/
- **Web.dev Guides**: https://web.dev/
- **MDN Web Docs**: https://developer.mozilla.org/

---

Last Updated: January 21, 2026
