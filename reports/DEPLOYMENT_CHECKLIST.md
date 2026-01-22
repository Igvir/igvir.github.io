# Deployment Checklist - Technical Improvements

## Pre-Deployment Testing

### Local Testing
- [ ] Test service worker registration in browser console
- [ ] Verify offline functionality works
- [ ] Test dark mode toggle on both EN and ES versions
- [ ] Check that theme preference persists after refresh
- [ ] Verify all images load correctly
- [ ] Test navigation and smooth scrolling
- [ ] Check all external links open correctly
- [ ] Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on mobile devices (iOS, Android)

### Performance Testing
- [ ] Run Lighthouse audit (target: 90+ score)
- [ ] Check Core Web Vitals in PageSpeed Insights
- [ ] Verify resource hints are working (Network tab)
- [ ] Check service worker caching (Application tab)
- [ ] Measure page load time (< 2.5s target)

### Accessibility Testing
- [ ] Test keyboard navigation (Tab, Enter, Esc)
- [ ] Verify skip-to-main-content link works
- [ ] Check color contrast in both light and dark modes
- [ ] Test with screen reader (if available)
- [ ] Verify all images have alt text
- [ ] Check ARIA labels on interactive elements

---

## Deployment Steps

### 1. Commit Changes
```bash
git add .
git commit -m "feat: implement technical improvements (service worker, dark mode, resource hints)"
git push origin main
```

### 2. Verify Files Are Uploaded
Check that these new/modified files are in your repository:
- [ ] `sw.js` (new)
- [ ] `index.html` (modified)
- [ ] `es/index.html` (modified)
- [ ] `assets/css/custom.css` (modified)
- [ ] `assets/js/custom.js` (modified)

### 3. Clear CDN Cache (if using)
If using Cloudflare or similar CDN:
- [ ] Purge all cache
- [ ] Wait 5-10 minutes for propagation

### 4. Test Production Site
- [ ] Visit https://www.igvir.com
- [ ] Open DevTools > Application > Service Workers
- [ ] Verify service worker is registered
- [ ] Test dark mode toggle
- [ ] Check offline functionality
- [ ] Test Spanish version: https://www.igvir.com/es/

---

## Post-Deployment Verification

### Immediate Checks (0-5 minutes)
- [ ] Site loads without errors
- [ ] Service worker registers successfully
- [ ] Dark mode toggle works
- [ ] No console errors
- [ ] All images display correctly
- [ ] Navigation works smoothly

### Short-term Checks (1-24 hours)
- [ ] Monitor error logs (if available)
- [ ] Check analytics for unusual bounce rates
- [ ] Verify mobile traffic is working
- [ ] Test from different geographic locations
- [ ] Check social media previews (LinkedIn, Twitter)

### Long-term Monitoring (1-7 days)
- [ ] Monitor Core Web Vitals in Search Console
- [ ] Check Lighthouse scores
- [ ] Review user feedback
- [ ] Monitor page load times
- [ ] Check service worker update mechanism

---

## Rollback Plan

If issues are detected:

### Quick Rollback
```bash
git revert HEAD
git push origin main
```

### Selective Rollback
If only one feature is problematic:

1. **Service Worker Issues**:
   - Remove service worker registration from `custom.js`
   - Delete `sw.js`
   - Clear browser cache

2. **Dark Mode Issues**:
   - Remove dark mode toggle from HTML
   - Remove dark mode CSS from `custom.css`
   - Remove dark mode JS from `custom.js`

3. **Resource Hints Issues**:
   - Remove resource hint tags from HTML `<head>`

---

## Known Issues & Solutions

### Service Worker Not Updating
**Problem**: Old service worker version cached
**Solution**: 
1. Update `CACHE_VERSION` in `sw.js`
2. Clear browser cache
3. Hard refresh (Ctrl+Shift+R)

### Dark Mode Flashing
**Problem**: Brief flash of wrong theme on load
**Solution**: Add inline script in `<head>` to set theme before render

### Offline Page Not Working
**Problem**: 404 when offline
**Solution**: Ensure all cached assets are available

---

## Performance Benchmarks

### Before Improvements
- Lighthouse Score: ~85
- Page Load Time: ~2.5s
- JavaScript Bundle: ~85KB
- Total Page Size: ~450KB

### After Improvements (Target)
- Lighthouse Score: 90+
- Page Load Time: < 2.0s
- JavaScript Bundle: ~85KB (same, will reduce with jQuery removal)
- Total Page Size: ~450KB (will reduce with WebP)

### Measure After Deployment
Record actual metrics:
- Lighthouse Score: _____
- Page Load Time: _____
- First Contentful Paint: _____
- Largest Contentful Paint: _____
- Time to Interactive: _____

---

## Communication Plan

### Stakeholders to Notify
- [ ] Update portfolio README
- [ ] Post on LinkedIn about improvements
- [ ] Tweet about new features (if applicable)
- [ ] Update resume/CV with technical skills

### Documentation Updates
- [ ] Update CHANGELOG.md
- [ ] Update IMPROVEMENTS.md
- [ ] Create release notes (if using GitHub releases)

---

## Next Phase Planning

After successful deployment, plan for:

1. **WebP Image Conversion** (Week 2)
   - Install ImageMagick
   - Run conversion script
   - Update HTML
   - Test and deploy

2. **jQuery Removal** (Week 3-4)
   - Create vanilla JS version
   - Thorough testing
   - Gradual rollout

3. **Critical CSS** (Week 5)
   - Extract critical CSS
   - Inline in HTML
   - Load non-critical async

---

## Emergency Contacts

If critical issues arise:
- Hosting Support: [Your hosting provider]
- DNS Provider: [Your DNS provider]
- CDN Support: [Your CDN provider]

---

## Success Criteria

Deployment is successful when:
- ✅ No console errors
- ✅ Service worker registered
- ✅ Dark mode works on all pages
- ✅ Site works offline
- ✅ Lighthouse score maintained or improved
- ✅ No increase in bounce rate
- ✅ No user complaints

---

## Sign-off

- [ ] All tests passed
- [ ] Performance benchmarks met
- [ ] Accessibility verified
- [ ] Documentation updated
- [ ] Stakeholders notified

**Deployed by**: _________________
**Date**: _________________
**Time**: _________________

---

Last Updated: January 21, 2026
