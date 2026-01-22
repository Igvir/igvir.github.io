# WebP Image Implementation Guide

## How to Use WebP Images with Fallback

After converting images to WebP format, update your HTML to use the `<picture>` element for automatic fallback:

### Example 1: Avatar Image
```html
<picture>
  <source srcset="images/avatar.webp" type="image/webp">
  <img src="images/avatar.jpg" alt="Igvir Ramirez - Cloud Solutions Architect profile photo" />
</picture>
```

### Example 2: Banner Image
```html
<picture>
  <source srcset="images/banner5-white-small.webp" type="image/webp">
  <img src="images/banner5-white-small.png" alt="Professional workspace with white desk" loading="lazy" />
</picture>
```

### Example 3: Certification Badges
```html
<picture>
  <source srcset="images/aws-sysops-admin-2024.webp" type="image/webp">
  <img src="images/aws-sysops-admin-2024.png" 
       alt="AWS Certified SysOps Administrator Associate certification badge" 
       loading="lazy" />
</picture>
```

## Conversion Steps

1. Run the conversion script:
   ```powershell
   .\convert-to-webp.ps1
   ```

2. Update all `<img>` tags in HTML files to use `<picture>` elements

3. Test in multiple browsers to ensure fallback works

## Expected Benefits

- **File Size Reduction**: 25-35% smaller than JPEG/PNG
- **Faster Loading**: Reduced bandwidth usage
- **Better Performance**: Improved Core Web Vitals scores
- **Browser Support**: 95%+ of modern browsers support WebP

## Browser Compatibility

- ✅ Chrome 23+
- ✅ Firefox 65+
- ✅ Edge 18+
- ✅ Safari 14+
- ✅ Opera 12.1+
- ⚠️ IE 11: Falls back to original format
