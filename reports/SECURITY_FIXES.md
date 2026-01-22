# Security Fixes - Implementation Guide

**Priority**: HIGH  
**Time Required**: 30 minutes  
**Impact**: Significantly improved security posture

---

## Quick Fixes (Implement Now)

### 1. Enable HTTPS Enforcement ⚡

**File**: `.htaccess`

**Current**:
```apache
# Force HTTPS (uncomment if you have SSL)
# <IfModule mod_rewrite.c>
#     RewriteEngine On
#     RewriteCond %{HTTPS} off
#     RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
# </IfModule>
```

**Fix**: Uncomment these lines
```apache
# Force HTTPS
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteCond %{HTTPS} off
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</IfModule>
```

**Impact**: Prevents man-in-the-middle attacks

---

### 2. Add HSTS Header ⚡

**File**: `.htaccess`

**Add after other security headers**:
```apache
# Strict Transport Security
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
```

**Also add to**: `_headers`
```
/*
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

**Impact**: Forces HTTPS for all future visits

---

### 3. Remove Console Logging ⚡

**File**: `assets/js/custom.js`

**Find and remove/comment**:
```javascript
// Remove these lines:
console.log('External link clicked:', this.href);
console.log('ServiceWorker registered:', registration.scope);
```

**Or wrap in conditional**:
```javascript
// Only log in development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('External link clicked:', this.href);
}
```

**Impact**: Prevents information disclosure

---

### 4. Block Sensitive Files ⚡

**File**: `.htaccess`

**Add at the end**:
```apache
# Block access to sensitive files
<FilesMatch "\.(md|ps1|json|yml|yaml)$">
    Order allow,deny
    Deny from all
</FilesMatch>

# Allow specific files if needed
<Files "site.webmanifest">
    Order allow,deny
    Allow from all
</Files>
```

**Impact**: Prevents information disclosure

---

### 5. Improve CSP (Gradual Approach) ⚡

**File**: `.htaccess` and `_headers`

**Phase 1 - Report Only** (Test first):
```apache
# Test CSP without breaking site
Header always set Content-Security-Policy-Report-Only "default-src 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://www.credly.com https://www.igvir.com; connect-src 'self';"
```

**Phase 2 - Enforce** (After testing):
```apache
# Stricter CSP (remove unsafe-inline)
Header always set Content-Security-Policy "default-src 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://www.credly.com https://www.igvir.com; connect-src 'self';"
```

**Note**: This requires moving inline styles to external CSS

**Impact**: Better XSS protection

---

## Medium Priority Fixes (This Week)

### 6. Verify jQuery Version

**Check version**:
```bash
# Open jquery.min.js and look for version comment
head -n 5 assets/js/jquery.min.js
```

**If outdated**:
1. Download latest jQuery 3.x from https://jquery.com/download/
2. Replace `assets/js/jquery.min.js`
3. Test all functionality

**Or better**: Proceed with jQuery removal (already planned)

---

### 7. Add Cache Validation to Service Worker

**File**: `sw.js`

**Find**:
```javascript
// Cache successful responses
if (response && response.status === 200) {
    const responseClone = response.clone();
    caches.open(CACHE_NAME)
        .then((cache) => cache.put(event.request, responseClone));
}
```

**Replace with**:
```javascript
// Cache successful responses with validation
if (response && response.status === 200) {
    const contentType = response.headers.get('content-type');
    // Only cache expected content types
    if (contentType && (
        contentType.includes('text/html') ||
        contentType.includes('text/css') ||
        contentType.includes('application/javascript') ||
        contentType.includes('image/')
    )) {
        const responseClone = response.clone();
        caches.open(CACHE_NAME)
            .then((cache) => cache.put(event.request, responseClone));
    }
}
```

**Impact**: Prevents cache poisoning

---

### 8. Add Security Meta Tags

**File**: `index.html` and `es/index.html`

**Add in `<head>` section**:
```html
<!-- Additional Security -->
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="format-detection" content="telephone=no">
```

**Impact**: Additional browser security

---

## Testing After Fixes

### 1. Test HTTPS Redirect
```bash
# Should redirect to HTTPS
curl -I http://www.igvir.com
# Look for: Location: https://www.igvir.com/
```

### 2. Test Security Headers
```bash
# Check headers
curl -I https://www.igvir.com
# Look for: Strict-Transport-Security, X-Frame-Options, etc.
```

### 3. Test File Blocking
```bash
# Should return 403 Forbidden
curl -I https://www.igvir.com/README.md
curl -I https://www.igvir.com/package.json
```

### 4. Test Site Functionality
- [ ] Homepage loads correctly
- [ ] Dark mode toggle works
- [ ] Navigation works
- [ ] Images load
- [ ] External links work
- [ ] Service worker registers

### 5. Online Security Tests
- [ ] https://observatory.mozilla.org/
- [ ] https://securityheaders.com/
- [ ] https://www.ssllabs.com/ssltest/

---

## Implementation Checklist

### Immediate (Do Now)
- [ ] Enable HTTPS enforcement (.htaccess)
- [ ] Add HSTS header (.htaccess and _headers)
- [ ] Remove console logging (custom.js)
- [ ] Block sensitive files (.htaccess)
- [ ] Test all changes locally

### This Week
- [ ] Verify jQuery version
- [ ] Add cache validation (sw.js)
- [ ] Add security meta tags (HTML)
- [ ] Test CSP in report-only mode
- [ ] Run online security tests

### This Month
- [ ] Enforce stricter CSP
- [ ] Move inline styles to external CSS
- [ ] Implement SRI for local assets
- [ ] Schedule regular security audits

---

## Rollback Plan

If issues occur after implementing fixes:

### Quick Rollback
```bash
# Revert changes
git checkout HEAD -- .htaccess _headers assets/js/custom.js sw.js

# Or revert specific file
git checkout HEAD -- .htaccess
```

### Selective Rollback

**If HTTPS causes issues**:
```apache
# Comment out HTTPS redirect
# RewriteEngine On
# RewriteCond %{HTTPS} off
# RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

**If HSTS causes issues**:
```apache
# Remove or comment HSTS header
# Header always set Strict-Transport-Security "..."
```

**If file blocking causes issues**:
```apache
# Remove FilesMatch block
# <FilesMatch "\.(md|ps1|json|yml|yaml)$">
#     ...
# </FilesMatch>
```

---

## Expected Results

### Before Fixes
- Security Headers Score: B
- Mozilla Observatory: C
- SSL Labs: A (if HTTPS enabled)

### After Fixes
- Security Headers Score: A
- Mozilla Observatory: A-
- SSL Labs: A+

---

## Monitoring

### What to Monitor

1. **Error Logs**
   - Check for 403 errors (blocked files)
   - Check for CSP violations
   - Check for redirect loops

2. **Performance**
   - Page load times
   - Service worker functionality
   - Cache hit rates

3. **User Reports**
   - Broken functionality
   - Access issues
   - Browser compatibility

### Tools

- Browser DevTools Console
- Server error logs
- Google Search Console
- Analytics (if implemented)

---

## Support

### If You Need Help

1. **Check browser console** for errors
2. **Review server logs** for issues
3. **Test in incognito mode** to rule out cache
4. **Try different browsers** to isolate issues
5. **Rollback if necessary** using git

### Common Issues

**Issue**: Site not redirecting to HTTPS  
**Solution**: Check if mod_rewrite is enabled on server

**Issue**: Files returning 403  
**Solution**: Verify .htaccess syntax, check file permissions

**Issue**: CSP blocking resources  
**Solution**: Use report-only mode first, adjust policy

**Issue**: Service worker not updating  
**Solution**: Increment CACHE_VERSION in sw.js

---

## Summary

### What We're Fixing

1. ✅ Enforcing HTTPS
2. ✅ Adding HSTS
3. ✅ Removing console logs
4. ✅ Blocking sensitive files
5. ✅ Improving CSP
6. ✅ Validating cache
7. ✅ Adding security meta tags

### Time Investment

- Implementation: 30 minutes
- Testing: 15 minutes
- Monitoring: Ongoing

### Security Improvement

- Before: 8.5/10
- After: 9.5/10

---

**Ready to implement?** Start with the Quick Fixes section and test thoroughly!

---

Last Updated: January 21, 2026
