// Nav behavior, mobile menu, scroll reveal — vanilla JS.
(function () {
  var nav = document.getElementById('nav');
  var toggle = nav && nav.querySelector('.nav-toggle');
  var links = nav && nav.querySelector('.nav-links');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // sticky nav shadow on scroll
  function onScroll() {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // mobile menu
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // scroll reveal — "emerge from mist", staggered one-by-one.
  // Scroll-driven (not IntersectionObserver) so fast scrolls / anchor jumps
  // can never leave an element stuck hidden.
  var pending = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if (reduce) {
    pending.forEach(function (el) { el.classList.add('in'); });
  } else {
    var check = function () {
      var line = window.innerHeight * 0.85; // reveal once the element's top crosses this
      var entering = [];
      pending = pending.filter(function (el) {
        if (el.getBoundingClientRect().top < line) { entering.push(el); return false; }
        return true;
      });
      entering.sort(function (a, b) {
        return a.getBoundingClientRect().top - b.getBoundingClientRect().top;
      });
      entering.forEach(function (el, i) {
        el.style.transitionDelay = (i * 130) + 'ms';
        el.classList.add('in');
        setTimeout(function () { el.style.transitionDelay = ''; }, i * 130 + 1200);
      });
    };
    var ticking = false;
    var onTick = function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () { check(); ticking = false; });
    };
    window.addEventListener('scroll', onTick, { passive: true });
    window.addEventListener('resize', onTick, { passive: true });
    check(); // reveal whatever is already in view on load
  }
})();
