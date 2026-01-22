/*
	Read Only by HTML5 UP - Vanilla JS Version
	Converted from jQuery to vanilla JavaScript
	Eliminates ~30KB of jQuery dependency
*/

(function() {
	'use strict';

	const $window = window;
	const $body = document.body;
	const $header = document.getElementById('header');
	const $nav = document.getElementById('nav');
	const $wrapper = document.getElementById('wrapper');
	let $titleBar = null;

	// Helper functions
	const helpers = {
		// Query selector helper
		qs: (selector, context = document) => context.querySelector(selector),
		qsa: (selector, context = document) => Array.from(context.querySelectorAll(selector)),

		// Add/remove class helpers
		addClass: (el, className) => el && el.classList.add(className),
		removeClass: (el, className) => el && el.classList.remove(className),
		toggleClass: (el, className) => el && el.classList.toggle(className),
		hasClass: (el, className) => el && el.classList.contains(className),

		// Event helpers
		on: (el, event, handler) => el && el.addEventListener(event, handler),
		off: (el, event, handler) => el && el.removeEventListener(event, handler),

		// Get element height
		height: (el) => el ? el.offsetHeight : 0,

		// Smooth scroll to element
		scrollTo: (target, offset = 0, duration = 1000) => {
			const targetEl = typeof target === 'string' ? helpers.qs(target) : target;
			if (!targetEl) return;

			const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - offset;
			const startPosition = window.pageYOffset;
			const distance = targetPosition - startPosition;
			let startTime = null;

			function animation(currentTime) {
				if (startTime === null) startTime = currentTime;
				const timeElapsed = currentTime - startTime;
				const run = ease(timeElapsed, startPosition, distance, duration);
				window.scrollTo(0, run);
				if (timeElapsed < duration) requestAnimationFrame(animation);
			}

			// Easing function
			function ease(t, b, c, d) {
				t /= d / 2;
				if (t < 1) return c / 2 * t * t + b;
				t--;
				return -c / 2 * (t * (t - 2) - 1) + b;
			}

			requestAnimationFrame(animation);
		}
	};

	// Breakpoints
	breakpoints({
		xlarge:   [ '1281px',  '1680px' ],
		large:    [ '1025px',  '1280px' ],
		medium:   [ '737px',   '1024px' ],
		small:    [ '481px',   '736px'  ],
		xsmall:   [ null,      '480px'  ],
	});

	// Play initial animations on page load
	helpers.on($window, 'load', function() {
		setTimeout(function() {
			helpers.removeClass($body, 'is-preload');
		}, 100);
	});

	// Polyfill: Object fit for older browsers
	if (!browser.canUse('object-fit')) {
		helpers.qsa('.image[data-position]').forEach(function(imageEl) {
			const img = helpers.qs('img', imageEl);
			if (!img) return;

			// Apply img as background
			imageEl.style.backgroundImage = `url("${img.src}")`;
			imageEl.style.backgroundPosition = imageEl.dataset.position;
			imageEl.style.backgroundSize = 'cover';
			imageEl.style.backgroundRepeat = 'no-repeat';

			// Hide img
			img.style.opacity = '0';
		});
	}

	// Header Panel - Navigation
	if ($nav) {
		const $nav_a = helpers.qsa('a', $nav);
		const sections = [];

		$nav_a.forEach(function($link) {
			helpers.addClass($link, 'scrolly');

			// Click handler
			helpers.on($link, 'click', function(e) {
				const href = $link.getAttribute('href');

				// External link? Bail
				if (!href || href.charAt(0) !== '#') return;

				e.preventDefault();

				// Deactivate all links
				$nav_a.forEach(link => helpers.removeClass(link, 'active'));

				// Activate link and lock it
				helpers.addClass($link, 'active');
				helpers.addClass($link, 'active-locked');

				// Scroll to section
				const offset = breakpoints.active('<=medium') ? helpers.height($titleBar) : 0;
				helpers.scrollTo(href, offset, 1000);
			});

			// Setup section scrolling detection
			const id = $link.getAttribute('href');
			const $section = helpers.qs(id);

			if (!$section) return;

			// Store section info
			sections.push({
				link: $link,
				section: $section,
				id: id
			});

			// Initialize section as inactive
			helpers.addClass($section, 'inactive');
		});

		// Scroll spy - activate nav links based on scroll position
		let ticking = false;
		helpers.on($window, 'scroll', function() {
			if (!ticking) {
				window.requestAnimationFrame(function() {
					updateActiveSection();
					ticking = false;
				});
				ticking = true;
			}
		});

		function updateActiveSection() {
			const scrollPos = window.pageYOffset + window.innerHeight / 2;

			sections.forEach(function(item) {
				const sectionTop = item.section.offsetTop;
				const sectionBottom = sectionTop + item.section.offsetHeight;

				if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
					// Activate section
					helpers.removeClass(item.section, 'inactive');

					// Update nav if no locked links
					const hasLocked = $nav_a.some(link => helpers.hasClass(link, 'active-locked'));
					if (!hasLocked) {
						$nav_a.forEach(link => helpers.removeClass(link, 'active'));
						helpers.addClass(item.link, 'active');
					} else if (helpers.hasClass(item.link, 'active-locked')) {
						helpers.removeClass(item.link, 'active-locked');
					}
				} else {
					// Deactivate section
					helpers.addClass(item.section, 'inactive');
				}
			});
		}

		// Initial check
		updateActiveSection();
	}

	// Title Bar (mobile menu)
	if ($header) {
		$titleBar = document.createElement('div');
		$titleBar.id = 'titleBar';
		$titleBar.innerHTML = `
			<a href="#header" class="toggle"></a>
			<span class="title">${helpers.qs('#logo').innerHTML}</span>
		`;
		$body.appendChild($titleBar);

		// Panel functionality
		const panel = {
			delay: 500,
			hideOnClick: true,
			hideOnSwipe: true,
			resetScroll: true,
			resetForms: true,
			side: 'right',
			visibleClass: 'header-visible',

			hide: function(event) {
				if (!helpers.hasClass($body, panel.visibleClass)) return;

				if (event) {
					event.preventDefault();
					event.stopPropagation();
				}

				helpers.removeClass($body, panel.visibleClass);

				setTimeout(function() {
					if (panel.resetScroll) {
						$header.scrollTop = 0;
					}
					if (panel.resetForms) {
						helpers.qsa('form', $header).forEach(form => form.reset());
					}
				}, panel.delay);
			},

			toggle: function(event) {
				event.preventDefault();
				event.stopPropagation();
				helpers.toggleClass($body, panel.visibleClass);
			}
		};

		// Setup header panel
		$header.style.msOverflowStyle = '-ms-autohiding-scrollbar';
		$header.style.webkitOverflowScrolling = 'touch';

		// Hide on click
		if (panel.hideOnClick) {
			helpers.qsa('a', $header).forEach(function($a) {
				$a.style.webkitTapHighlightColor = 'rgba(0,0,0,0)';

				helpers.on($a, 'click', function(event) {
					const href = $a.getAttribute('href');
					const target = $a.getAttribute('target');

					if (!href || href === '#' || href === '' || href === '#header') return;

					event.preventDefault();
					event.stopPropagation();

					panel.hide();

					setTimeout(function() {
						if (target === '_blank') {
							window.open(href);
						} else {
							window.location.href = href;
						}
					}, panel.delay + 10);
				});
			});
		}

		// Touch events for swipe
		let touchPosX = null;
		let touchPosY = null;

		helpers.on($header, 'touchstart', function(event) {
			touchPosX = event.touches[0].pageX;
			touchPosY = event.touches[0].pageY;
		});

		helpers.on($header, 'touchmove', function(event) {
			if (touchPosX === null || touchPosY === null) return;

			const diffX = touchPosX - event.touches[0].pageX;
			const diffY = touchPosY - event.touches[0].pageY;

			if (panel.hideOnSwipe) {
				const boundary = 20;
				const delta = 50;
				let shouldHide = false;

				if (panel.side === 'right') {
					shouldHide = (Math.abs(diffY) < boundary) && (diffX < -delta);
				}

				if (shouldHide) {
					touchPosX = null;
					touchPosY = null;
					panel.hide();
					return false;
				}
			}

			// Prevent vertical scrolling past boundaries
			const th = $header.offsetHeight;
			const ts = $header.scrollHeight - $header.scrollTop;

			if (($header.scrollTop < 0 && diffY < 0) || (ts > (th - 2) && ts < (th + 2) && diffY > 0)) {
				event.preventDefault();
				event.stopPropagation();
			}
		});

		// Prevent event bubbling
		helpers.on($header, 'click', function(event) {
			event.stopPropagation();
		});

		helpers.on($header, 'touchend', function(event) {
			event.stopPropagation();
		});

		// Hide panel on body click
		helpers.on($body, 'click', function(event) {
			panel.hide(event);
		});

		helpers.on($body, 'touchend', function(event) {
			panel.hide(event);
		});

		// Toggle button
		helpers.qsa('a[href="#header"]').forEach(function($toggle) {
			helpers.on($toggle, 'click', function(event) {
				panel.toggle(event);
			});
		});
	}

	// Scrolly links (smooth scroll)
	helpers.qsa('.scrolly').forEach(function($link) {
		helpers.on($link, 'click', function(event) {
			const href = $link.getAttribute('href');
			
			if (!href || href.charAt(0) !== '#') return;
			
			event.preventDefault();
			
			const offset = breakpoints.active('<=medium') ? helpers.height($titleBar) : 0;
			helpers.scrollTo(href, offset, 1000);
		});
	});

})();
