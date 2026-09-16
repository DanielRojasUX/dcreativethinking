/* ==========================================================================
   dcreativethinking.com  ::  main.js
   ========================================================================== */

/* ===== BEGIN SHARED ===================================================== */
/* No shared behaviour yet. Kept as a marked region so the master can merge
   one copy across blocks. */
/* ===== END SHARED ====================================================== */


/* ===== BEGIN BLOCK: .process =========================================== */
(function () {
  "use strict";

  /* ---- accordion :: each row toggles independently -------------------- */
  var triggers = document.querySelectorAll(".process .js-accordion");
  for (var i = 0; i < triggers.length; i++) {
    triggers[i].addEventListener("click", function () {
      var open = this.getAttribute("aria-expanded") === "true";
      this.setAttribute("aria-expanded", open ? "false" : "true");
    });
  }

  /* ---- read more / read less :: mobile tier only ---------------------- */
  /* Full copy lives in the HTML, so with JS off (or above the breakpoint)
     the reader always gets everything. The control is only mounted while
     the mobile media query matches, and is torn down when it stops. */
  var mobile = window.matchMedia("(max-width: 767px)");
  var collapsibles = [];

  var nodes = document.querySelectorAll(".process [data-collapse]");
  for (var n = 0; n < nodes.length; n++) {
    var el = nodes[n];
    collapsibles.push({
      el: el,
      full: el.textContent,
      limit: parseInt(el.getAttribute("data-collapse"), 10) || 0,
      expanded: false,
      more: null
    });
  }

  function truncate(text, limit) {
    if (text.length <= limit) return text;
    var slice = text.slice(0, limit);
    var lastSpace = slice.lastIndexOf(" ");
    if (lastSpace > 0) slice = slice.slice(0, lastSpace);
    return slice;
  }

  function collapse(item) {
    item.el.textContent = truncate(item.full, item.limit) + "\u2026 ";
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "process__more";
    btn.textContent = "read more \u25be";
    btn.addEventListener("click", function () {
      item.expanded ? collapse(item) : expand(item);
    });
    item.el.appendChild(btn);
    item.more = btn;
    item.expanded = false;
  }

  function expand(item) {
    item.el.textContent = item.full + " ";
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "process__more";
    btn.textContent = "read less \u25b4";
    btn.addEventListener("click", function () {
      collapse(item);
    });
    item.el.appendChild(btn);
    item.more = btn;
    item.expanded = true;
  }

  function restore(item) {
    item.el.textContent = item.full;
    item.more = null;
    item.expanded = false;
  }

  function sync() {
    for (var k = 0; k < collapsibles.length; k++) {
      var item = collapsibles[k];
      if (mobile.matches) {
        if (!item.more) collapse(item);
      } else {
        restore(item);
      }
    }
  }

  sync();
  if (mobile.addEventListener) {
    mobile.addEventListener("change", sync);
  } else if (mobile.addListener) {
    mobile.addListener(sync);           /* older Safari */
  }
})();
/* ===== END BLOCK ======================================================= */
