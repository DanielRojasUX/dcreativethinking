/* ===== BEGIN BLOCK: reveal =====
   Scroll reveal for the homepage and every case study (css/reveal.css).
   Marks the content blocks listed below with data-reveal and fades them
   in once their top passes 80% of the screen height, 140ms later, so the
   motion happens where the eye is. Blocks that enter together are
   staggered 70ms apart (max 8 steps). Blocks already on screen at load
   are shown at once, so nothing flashes. Cards added later (More case
   studies, filters, view more) are picked up by a MutationObserver.
   Reduced motion: everything is shown immediately. */
(function () {
  "use strict";

  if (!("IntersectionObserver" in window)) return;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;

  var SELECTORS = [
    /* case studies */
    ".owner", ".brief__item", "main .sec__chip", "main h2", "main .beat",
    "main .lead", "main .statement", "main .figure", "main .mark-tile",
    "main .pms", "main .metric", "main .row", "main .specimen__line",
    "main .stack__sub", "main .actions", ".reflection__cols > div",
    ".more__head", ".more__grid .card",
    /* homepage */
    ".my-work__head", ".my-work__controls", ".my-work__grid .card",
    ".milk__heading", ".milk__bio", ".milk__skill", ".milk__email", ".milk__resume",
    ".process__hero", ".process__phase", ".tst__title", ".tst__grid > *",
    ".footer__row", ".footer__social"
  ].join(",");

  var root = document.documentElement;
  var STEP = 70, MAX_STEPS = 8;
  var BASE = 140;   /* ms after an item crosses the trigger line, so the motion happens in view */

  function show(el, delay) {
    el.style.setProperty("--reveal-delay", delay + "ms");
    el.classList.add("is-revealing");
    /* next frame so the hidden state is painted first */
    window.requestAnimationFrame(function () {
      el.classList.add("is-revealed");
    });
    var done = function (e) {
      if (e && e.target !== el) return;
      el.classList.remove("is-revealing");
      el.style.removeProperty("--reveal-delay");
      el.removeEventListener("transitionend", done);
    };
    el.addEventListener("transitionend", done);
    setTimeout(done, 900 + delay);
  }

  var pending = new Set();
  var io = new IntersectionObserver(function (entries) {
    var batch = entries.filter(function (e) { return e.isIntersecting; })
      .map(function (e) { return e.target; })
      .sort(function (a, b) {
        var ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
        return (ra.top - rb.top) || (ra.left - rb.left);
      });
    batch.forEach(function (el, i) {
      io.unobserve(el);
      pending.delete(el);
      show(el, BASE + Math.min(i, MAX_STEPS) * STEP);
    });
  }, { rootMargin: "0px 0px -20% 0px", threshold: 0 });   /* trigger once the top passes 80% of the screen */

  function mark(scope) {
    var els = (scope || document).querySelectorAll(SELECTORS);
    Array.prototype.forEach.call(els, function (el) {
      if (el.hasAttribute("data-reveal") || el.closest(".hero, .case-nav")) return;
      /* never hide something nested in a block that already reveals */
      var parent = el.parentElement && el.parentElement.closest("[data-reveal]");
      if (parent) return;
      el.setAttribute("data-reveal", "");
      var r = el.getBoundingClientRect();
      if (r.bottom > 0 && r.top < window.innerHeight * 0.92 && r.width > 0) {
        el.classList.add("is-revealed");           /* on screen at load: no animation */
      } else {
        io.observe(el);
        pending.add(el);
      }
    });
  }

  /* At the bottom of the page the last items can never reach the 80% line:
     reveal whatever is on screen once the page cannot scroll further. */
  function atBottom() {
    if (!pending.size) return;
    if (window.innerHeight + window.scrollY < document.documentElement.scrollHeight - 4) return;
    var i = 0;
    pending.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        io.unobserve(el); pending.delete(el);
        show(el, BASE + Math.min(i++, MAX_STEPS) * STEP);
      }
    });
  }
  window.addEventListener("scroll", atBottom, { passive: true });

  root.classList.add("js-reveal");
  mark(document);

  /* cards rendered later (projects.js) or revealed by filters */
  var mo = new MutationObserver(function (list) {
    list.forEach(function (m) {
      Array.prototype.forEach.call(m.addedNodes, function (n) {
        if (n.nodeType === 1) mark(n.parentElement || document);
      });
    });
  });
  mo.observe(document.body, { childList: true, subtree: true });
})();
/* ===== END BLOCK: reveal ===== */
