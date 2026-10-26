/* ==========================================================================
   main.js  ::  component 1 (.hero / .nav)

   Three behaviours live here (3: profile versions by URL hash, see below):
     1. Hero background video autoplay (the Dionne iOS fix), gated so it does
        NOT run under prefers-reduced-motion -- reduced-motion users keep the
        poster still, matching the footer's accessibility handling.
     2. Mobile nav FLYOUT (hamburger). The OPEN state is EXTRAPOLATED: there is
        no mockup for the expanded menu. It floats over the hero as an overlay
        (not an inline bar dropdown) and closes on link-tap, outside-tap, or
        Escape. Exact styling is a default pending the real design.
   ========================================================================== */

/* ===== BEGIN BLOCK: .hero / .nav ===== */
(function () {
  "use strict";

  /* ---- 1. hero video autoplay (Dionne fix, reduced-motion gated) -------- */
  var heroVideo = document.getElementById("heroVideo");
  if (heroVideo) {
    var allowsMotion =
      !window.matchMedia ||
      window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

    if (allowsMotion) {
      // re-assert the attributes iOS needs before the play call
      heroVideo.muted = true;
      heroVideo.setAttribute("muted", "");
      heroVideo.setAttribute("playsinline", "");
      heroVideo.setAttribute("webkit-playsinline", "");

      var tryPlay = function () {
        var p = heroVideo.play();
        if (p && typeof p.catch === "function") { p.catch(function () {}); }
      };

      tryPlay();
      // fallback: iOS sometimes holds playback until it sees an interaction
      document.addEventListener("touchstart", tryPlay, { once: true });
      document.addEventListener("click", tryPlay, { once: true });
    } else {
      // reduced motion: no autoplay, hold on the poster
      heroVideo.removeAttribute("autoplay");
      try { heroVideo.pause(); } catch (e) {}
    }
  }

  /* ---- 2. mobile nav FLYOUT (open state EXTRAPOLATED, no mockup) --------- */
  var toggle = document.querySelector(".js-nav-toggle");
  var list = document.querySelector(".js-nav-list");
  if (toggle && list) {
    var setOpen = function (open) {
      list.classList.toggle("nav__list--open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    };

    // hamburger toggles; stop the bubble so the outside-close below ignores it
    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      setOpen(!list.classList.contains("nav__list--open"));
    });

    // tapping a link closes the flyout (anchor still navigates)
    list.addEventListener("click", function (e) {
      if (e.target.closest(".nav__link")) { setOpen(false); }
    });

    // tapping anywhere outside the nav closes it
    document.addEventListener("click", function (e) {
      if (list.classList.contains("nav__list--open") && !e.target.closest(".nav")) {
        setOpen(false);
      }
    });

    // Escape closes it
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { setOpen(false); }
    });
  }

  /* ---- 3. profile versions by URL hash (e.g. /#uxproduct) ---------------
     The default headline, statement and resume live in the HTML so search
     engines and no-JS visitors always get them. Add a key below to create a
     version: visiting /#key swaps the hero copy and the resume link. Section
     anchors (#work, #contact...) are not keys, so jumping around the page
     keeps whichever version was loaded. */
  var HERO_PROFILES = {
    /* example, fill in when the version copy is ready:
    uxproduct: {
      headline: ["AI Native Systems Builder", "Lead Product Designer"],
      statement: "One or two lines for this profile.",
      resume: "assets/docs/Daniel_Rojas_Resume_UXProduct.pdf"
    },
    */
  };

  var headlineEl = document.querySelector(".js-hero-headline");
  var statementEl = document.querySelector(".js-hero-statement");
  var resumeEl = document.querySelector(".milk__resume");

  var applyProfile = function () {
    var key = (window.location.hash || "").replace("#", "").toLowerCase();
    var profile = HERO_PROFILES[key];
    if (!profile) { return; }

    if (headlineEl && profile.headline && profile.headline.length) {
      headlineEl.textContent = "";
      profile.headline.forEach(function (part, i) {
        if (i > 0) {
          var sep = document.createElement("span");
          sep.className = "hero__headline-sep" + (i === 1 ? " hero__headline-sep--role" : "");
          sep.setAttribute("aria-hidden", "true");
          sep.textContent = "\u00a0/ ";
          headlineEl.appendChild(sep);
        }
        var span = document.createElement("span");
        span.className = "hero__headline-part" + (i === 0 ? " hero__headline-part--role" : "");
        span.textContent = part;
        headlineEl.appendChild(span);
      });
    }
    if (statementEl && profile.statement) { statementEl.textContent = profile.statement; }
    if (resumeEl && profile.resume) { resumeEl.setAttribute("href", profile.resume); }
  };

  applyProfile();
  window.addEventListener("hashchange", applyProfile);
})();
/* ===== END BLOCK ===== */
