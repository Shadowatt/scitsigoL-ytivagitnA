// Antigravity Logistics — no-JS fallback
document.documentElement.classList.remove('no-js');
document.documentElement.classList.add('js');

// Antigravity Logistics — mobile nav toggle
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');

  if (!toggle || !links) return;

  toggle.addEventListener('click', function () {
    var isOpen = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  links.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
});

// Image loader — fade the real image in over the skeleton shimmer once loaded
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.media img').forEach(function (img) {
    var wrapper = img.closest('.media');
    function markLoaded() {
      img.classList.add('is-loaded');
      if (wrapper) wrapper.classList.add('is-loaded');
    }
    if (img.complete && img.naturalWidth > 0) {
      markLoaded();
    } else {
      img.addEventListener('load', markLoaded);
      img.addEventListener('error', markLoaded);
    }
  });
});

// ============================================================================
// Scroll reveal — fade/rise elements into view as they enter the viewport
// ============================================================================
//
// The reveal works in three steps to guarantee the transition actually plays:
//
//   1. Wait one animation frame before observing, so the browser has painted
//      the initial `opacity: 0` / `transform` state.
//
//   2. When an element intersects, wait one more animation frame before
//      adding `is-visible`. Without this, elements already in the viewport
//      on page load would get the class added *before* their initial state
//      is painted, and the transition would be skipped (the "appears from
//      nowhere" bug).
//
//   3. Unobserve after revealing so we don't waste work.
//
document.addEventListener('DOMContentLoaded', function () {
  var revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  // If the browser can't do IntersectionObserver, just show everything.
  if (!('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;

      // Defer the class change by one frame so the initial state is
      // guaranteed to be painted first — this is what makes the
      // transition actually play instead of snapping into place.
      requestAnimationFrame(function () {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  // Defer observation by one frame so initial states are painted first.
  requestAnimationFrame(function () {
    revealEls.forEach(function (el) { observer.observe(el); });
  });
});