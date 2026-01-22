# jQuery to Vanilla JavaScript Migration Guide

## Current jQuery Usage in main.js

The site currently uses jQuery for:
1. DOM selection and manipulation
2. Event handling
3. Scrolling functionality (scrolly, scrollex plugins)
4. Panel functionality

## Migration Strategy

### Phase 1: Replace Simple jQuery Calls

#### Before (jQuery):
```javascript
var $window = $(window);
var $body = $('body');
var $header = $('#header');
```

#### After (Vanilla JS):
```javascript
var $window = window;
var $body = document.body;
var $header = document.getElementById('header');
```

### Phase 2: Replace Event Listeners

#### Before (jQuery):
```javascript
$window.on('load', function() {
  window.setTimeout(function() {
    $body.removeClass('is-preload');
  }, 100);
});
```

#### After (Vanilla JS):
```javascript
window.addEventListener('load', function() {
  setTimeout(function() {
    document.body.classList.remove('is-preload');
  }, 100);
});
```

### Phase 3: Replace Plugins

The main challenge is replacing:
- `jquery.scrolly.min.js` - Smooth scrolling
- `jquery.scrollex.min.js` - Scroll-based animations
- Panel functionality

#### Smooth Scrolling Replacement:
```javascript
// Native smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
```

#### Scroll Observer Replacement:
```javascript
// Use Intersection Observer API
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.remove('inactive');
    }
  });
}, {
  threshold: 0.5,
  rootMargin: '5vh 0px'
});

document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});
```

## Benefits of Removing jQuery

1. **Bundle Size**: Reduce ~30KB (minified + gzipped)
2. **Performance**: Faster DOM operations
3. **Modern Standards**: Use native browser APIs
4. **Maintenance**: Fewer dependencies to update

## Implementation Steps

1. Create `main-vanilla.js` with vanilla JS equivalents
2. Test all functionality thoroughly
3. Update HTML to load new script
4. Remove jQuery and plugin files
5. Update service worker cache list

## Estimated Impact

- **Before**: ~85KB JavaScript (jQuery + plugins + custom)
- **After**: ~25KB JavaScript (vanilla + custom)
- **Savings**: ~60KB (~70% reduction)

## Browser Compatibility

All vanilla JS replacements work in:
- Chrome 51+
- Firefox 55+
- Safari 10+
- Edge 15+

(Covers 98%+ of users)
