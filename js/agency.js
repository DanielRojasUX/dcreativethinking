/* D Creative Thinking · agency site v20261118i */
(function () {
  "use strict";

  var doc = document.documentElement;
  doc.classList.add("js");
  /* case study breadcrumbs point back to wherever the visitor came from */
  try { sessionStorage.setItem("dctFrom", "agency"); } catch (e) {}
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---------- Header: always visible, turns solid after the hero ---------- */
  var top = document.querySelector(".js-top");
  var hero = document.getElementById("hero");
  function onScroll() {
    top.classList.toggle("is-solid", !hero || window.scrollY > hero.offsetHeight - 72);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu: focus trap, Esc closes ---------- */
  var toggle = document.querySelector(".js-menu-toggle");
  var menu = document.getElementById("menu");
  var label = toggle.querySelector(".top__toggle-label");
  function setMenu(open, returnFocus) {
    toggle.setAttribute("aria-expanded", String(open));
    label.textContent = open ? "Close" : "Menu";
    top.classList.toggle("is-open", open);
    document.body.style.overflow = open ? "hidden" : "";
    if (open) { var first = menu.querySelector("a"); if (first) first.focus(); }
    else if (returnFocus) toggle.focus();
  }
  toggle.addEventListener("click", function () { setMenu(toggle.getAttribute("aria-expanded") !== "true", false); });
  menu.addEventListener("click", function (e) { if (e.target.closest("a") && top.classList.contains("is-open")) setMenu(false, false); });
  document.addEventListener("keydown", function (e) {
    if (!top.classList.contains("is-open")) return;
    if (e.key === "Escape") setMenu(false, true);
    if (e.key === "Tab") {
      var items = [toggle].concat(Array.prototype.slice.call(menu.querySelectorAll("a")));
      var i = items.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); items[items.length - 1].focus(); }
      else if (!e.shiftKey && i === items.length - 1) { e.preventDefault(); items[0].focus(); }
    }
  });
  window.matchMedia("(min-width: 940px)").addEventListener("change", function (m) { if (m.matches) setMenu(false, false); });

  /* ---------- Hero background video: still under reduced motion ---------- */
  var video = document.querySelector(".js-hero-video");
  function syncVideo() {
    if (!video) return;
    if (reduce.matches) video.pause();
    else { var pr = video.play(); if (pr && pr.catch) pr.catch(function () {}); }
  }
  syncVideo();
  if (reduce.addEventListener) reduce.addEventListener("change", syncVideo);


  /* ---------- Parallax: hero content and video drift as the page slides over ---------- */
  var heroGrid = document.querySelector(".hero__grid");
  var heroVideo = document.querySelector(".js-hero-video");
  var drifts = Array.prototype.slice.call(document.querySelectorAll(".js-drift"));
  if (!reduce.matches) {
    var pTick = false;
    function parallax() {
      pTick = false;
      var vh = window.innerHeight, y = window.scrollY;
      if (hero && heroGrid) {
        var h = hero.offsetHeight, p = Math.min(Math.max(y / h, 0), 1);
        heroGrid.style.transform = "translate3d(0," + (p * -90).toFixed(1) + "px,0)";
        heroGrid.style.opacity = (1 - p * 1.3).toFixed(3);
        if (heroVideo) heroVideo.style.transform = "scale(" + (1 + p * 0.12).toFixed(3) + ")";
      }
      drifts.forEach(function (el, i) {
        var r = el.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) return;
        var off = ((r.top + r.height / 2) - vh / 2) / vh;
        var dir = i % 2 ? -1 : 1;
        el.style.transform = "translate3d(" + (off * 60 * dir).toFixed(1) + "px,0,0)";
      });
    }
    window.addEventListener("scroll", function () { if (!pTick) { pTick = true; requestAnimationFrame(parallax); } }, { passive: true });
    window.addEventListener("resize", parallax);
    parallax();
  }

  /* ---------- Typing: titles type in once when they enter the view ---------- */
  var typers = Array.prototype.slice.call(document.querySelectorAll("[data-type]"));
  if (typers.length && !reduce.matches && "IntersectionObserver" in window) {
    typers.forEach(function (el) {
      var text = el.textContent;
      var sr = document.createElement("span"); sr.className = "sr-only"; sr.textContent = text;
      var box = document.createElement("span"); box.className = "type__chars"; box.setAttribute("aria-hidden", "true");
      var chars = [];
      text.split("").forEach(function (ch) {
        var s = document.createElement("span"); s.className = "ch"; s.textContent = ch; box.appendChild(s); chars.push(s);
      });
      var caret = document.createElement("span"); caret.className = "type__caret";
      box.insertBefore(caret, box.firstChild);
      el.textContent = ""; el.appendChild(sr); el.appendChild(box);
      el._type = { chars: chars, caret: caret, box: box };
    });
    var typeIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        typeIo.unobserve(en.target);
        var t = en.target._type, i = 0;
        var speed = Math.max(28, Math.min(70, 1400 / t.chars.length));
        setTimeout(function step() {
          if (i < t.chars.length) {
            var ch = t.chars[i];
            ch.classList.add("is-on", "is-fresh");
            setTimeout(function () { ch.classList.remove("is-fresh"); }, 160);
            t.box.insertBefore(t.caret, t.chars[i].nextSibling);
            i++; setTimeout(step, speed);
          } else en.target.classList.add("type--done");
        }, en.target.closest(".hero") ? 450 : 150);
      });
    }, { rootMargin: "0px 0px -15% 0px" });
    typers.forEach(function (el) { typeIo.observe(el); });
  }

  /* ---------- Odometer: each digit rolls into place when it enters the view ---------- */
  var odos = Array.prototype.slice.call(document.querySelectorAll(".js-odo"));
  if (odos.length && !reduce.matches && "IntersectionObserver" in window) {
    odos.forEach(function (el) {
      var text = el.textContent.trim();
      el.textContent = "";
      el.classList.add("odo");
      el._digits = [];
      text.split("").forEach(function (d) {
        var col = document.createElement("span"); col.className = "odo__col";
        var strip = document.createElement("span"); strip.className = "odo__strip";
        if (/\d/.test(d)) {
          for (var k = 0; k < 30; k++) { var s = document.createElement("span"); s.textContent = k % 10; strip.appendChild(s); }
          el._digits.push({ strip: strip, target: 20 + Number(d) });
        } else { var s2 = document.createElement("span"); s2.textContent = d; strip.appendChild(s2); }
        col.appendChild(strip); el.appendChild(col);
      });
    });
    var odoIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        odoIo.unobserve(en.target);
        var el = en.target;
        requestAnimationFrame(function () {
          el.classList.add("is-run");
          el._digits.forEach(function (dg, n) {
            dg.strip.style.transitionDelay = (n * 120) + "ms";
            dg.strip.style.transform = "translateY(-" + dg.target + "em)";
          });
        });
      });
    }, { rootMargin: "0px 0px -10% 0px" });
    odos.forEach(function (el) { odoIo.observe(el); });
  }

  /* ---------- Closing section video: loads only when near, still under reduced motion ---------- */
  var lazyVid = document.querySelector(".js-lazy-video");
  if (lazyVid && "IntersectionObserver" in window) {
    var vidIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        vidIo.unobserve(lazyVid);
        Array.prototype.forEach.call(lazyVid.querySelectorAll("source[data-src]"), function (s) { s.src = s.getAttribute("data-src"); });
        lazyVid.preload = "auto";
        lazyVid.load();
        lazyVid.addEventListener("loadeddata", function () {
          lazyVid.classList.add("is-ready");
          if (!reduce.matches) { var pr = lazyVid.play(); if (pr && pr.catch) pr.catch(function () {}); }
        }, { once: true });
      });
    }, { rootMargin: "600px 0px" });
    vidIo.observe(lazyVid);
    if (reduce.addEventListener) reduce.addEventListener("change", function () { if (reduce.matches) lazyVid.pause(); else if (lazyVid.classList.contains("is-ready")) lazyVid.play(); });
  }


  /* ---------- Work: details modal ---------- */
  var wm = document.querySelector(".js-work-modal");
  if (wm && typeof wm.showModal === "function") {
    var wmOpener = null;
    var q = function (s) { return wm.querySelector(s); };
    Array.prototype.forEach.call(document.querySelectorAll(".js-work-more"), function (btn) {
      btn.addEventListener("click", function () {
        var card = btn.closest(".work-card");
        var img = card.querySelector(".work-card__media img");
        var main = card.querySelector(".work-card__cta");
        q(".js-wm-img").src = img.currentSrc || img.src;
        q(".js-wm-img").alt = img.alt;
        q(".js-wm-brand").textContent = card.querySelector(".work-card__brand").textContent;
        q(".js-wm-title").textContent = card.querySelector(".work-card__link").firstChild.textContent;
        q(".js-wm-result").textContent = card.querySelector(".work-card__result").textContent;
        q(".js-wm-details").textContent = card.getAttribute("data-details");
        var cta = q(".js-wm-cta");
        cta.href = main.getAttribute("href");
        cta.textContent = card.getAttribute("data-cta") + (card.getAttribute("data-ext") === "1" ? " ↗" : " →");
        if (card.getAttribute("data-ext") === "1") { cta.target = "_blank"; cta.rel = "noopener"; } else { cta.removeAttribute("target"); cta.removeAttribute("rel"); }
        wmOpener = btn;
        wm.showModal();
        document.body.style.overflow = "hidden";
      });
    });
    var closeWm = function () { wm.close(); };
    q(".js-work-modal-close").addEventListener("click", closeWm);
    wm.addEventListener("click", function (e) { if (e.target === wm) closeWm(); });
    wm.addEventListener("close", function () { document.body.style.overflow = ""; if (wmOpener) wmOpener.focus(); });
  }

  /* ---------- Reveal on scroll ---------- */
  var targets = document.querySelectorAll(".pain, .builds__row, .work-card, .step, .reason, .qa, .problem__close");
  if ("IntersectionObserver" in window && !reduce.matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    Array.prototype.forEach.call(targets, function (t, i) {
      t.classList.add("reveal");
      t.style.transitionDelay = (i % 3) * 70 + "ms";
      io.observe(t);
    });
  }

  /* ---------- Current section in the nav ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll(".menu__link[href^='#']"));
  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (l) {
          if (l.getAttribute("href") === "#" + en.target.id) l.setAttribute("aria-current", "true");
          else l.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    ["hero", "build", "work", "process", "why", "faq", "start", "problem"].forEach(function (id) {
      var s = document.getElementById(id); if (s) spy.observe(s);
    });
  }
})();
