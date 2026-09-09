// Antigravity Logistics — no-JS fallback
// <html> starts with class="no-js" in the markup; flipping it here means
// .reveal content only stays hidden-until-scrolled when JS actually runs.
// If this file fails to load, the no-js CSS rule keeps everything visible.
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

  // Close menu when a link is tapped (mobile)
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
      img.addEventListener('error', markLoaded); // don't shimmer forever if a file is missing
    }
  });
});

// Scroll reveal — fade/rise elements into view as they enter the viewport
document.addEventListener('DOMContentLoaded', function () {
  var revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  if (!('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(function (el) { observer.observe(el); });
});