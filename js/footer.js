/* dcreativethinking.com :: js/main.js
   Component 6 (.footer). Background video autoplay (the Dionne iOS fix),
   gated on prefers-reduced-motion -- reduced-motion users get the poster
   still instead of an autoplaying video, matching the hero block's handling.
   Everything else in this component is native/declarative. */

(function () {
  "use strict";

  var footerVideo = document.getElementById("footerVideo");
  if (footerVideo) {
    var allowsMotion =
      !window.matchMedia ||
      window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

    if (allowsMotion) {
      // re-assert the attributes iOS needs before the play call
      footerVideo.muted = true;
      footerVideo.setAttribute("muted", "");
      footerVideo.setAttribute("playsinline", "");
      footerVideo.setAttribute("webkit-playsinline", "");

      var tryPlay = function () {
        var p = footerVideo.play();
        if (p && typeof p.catch === "function") { p.catch(function () {}); }
      };

      // load and play only when the footer comes near the viewport, so the
      // video never weighs on the first page load
      if ("IntersectionObserver" in window) {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) {
              footerVideo.preload = "auto";
              tryPlay();
              // fallback: iOS sometimes holds playback until it sees an interaction
              document.addEventListener("touchstart", tryPlay, { once: true });
              document.addEventListener("click", tryPlay, { once: true });
              io.disconnect();
            }
          });
        }, { rootMargin: "400px 0px" });
        io.observe(footerVideo);
      } else {
        tryPlay();
      }
    } else {
      // reduced motion: no autoplay, hold on the poster
      footerVideo.removeAttribute("autoplay");
      try { footerVideo.pause(); } catch (e) {}
    }
  }
})();
