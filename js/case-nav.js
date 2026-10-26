/* ===== BEGIN BLOCK: case-nav =====
   Fixed in-page navigation for case studies that have a brief
   (<nav class="brief">). The brief is the single source: this script
   clones its links (number + title, no description) and the page
   breadcrumb into a bar that appears once the brief has scrolled past
   the top of the screen.
   Desktop (900px and up): breadcrumb row + one row index, the current
   section marked with aria-current.
   Mobile: a floating mask button (top left) opens the same index as a
   panel. Esc, a tap outside or choosing a section closes it; focus stays
   inside while it is open and returns to the button on close. */
(function () {
  "use strict";

  var brief = document.querySelector(".brief");
  if (!brief) return;

  var root = document.documentElement;
  var baseEl = document.querySelector("[data-base]");
  var base = baseEl ? baseEl.getAttribute("data-base") : "../../";
  var mobile = window.matchMedia("(max-width: 899px)");
  root.classList.add("has-case-nav");

  /* ---- build ---- */
  var nav = document.createElement("nav");
  nav.className = "case-nav";
  nav.id = "case-nav";
  nav.setAttribute("aria-label", "Case study sections");

  var crumbsSrc = document.querySelector(".breadcrumb");
  if (crumbsSrc) {
    var crumbs = document.createElement("div");
    crumbs.className = "case-nav__crumbs";
    crumbs.innerHTML = crumbsSrc.innerHTML;
    nav.appendChild(crumbs);
  }

  var list = document.createElement("ul");
  list.className = "case-nav__list";
  var links = [];
  var targets = [];
  Array.prototype.forEach.call(brief.querySelectorAll(".brief__item"), function (item) {
    var id = (item.getAttribute("href") || "").slice(1);
    var target = id && document.getElementById(id);
    if (!target) return;
    var li = document.createElement("li");
    var a = document.createElement("a");
    a.className = "case-nav__link";
    a.href = "#" + id;
    var num = item.querySelector(".brief__num");
    var title = item.querySelector(".brief__title");
    a.innerHTML = '<span class="case-nav__num">' + (num ? num.textContent : "") + "</span>" +
      "<span>" + (title ? title.textContent : id) + "</span>";
    li.appendChild(a);
    list.appendChild(li);
    links.push(a);
    targets.push(target);
  });
  var ink = document.createElement("li");
  ink.className = "case-nav__ink";
  ink.setAttribute("aria-hidden", "true");
  ink.setAttribute("role", "presentation");
  list.appendChild(ink);
  nav.appendChild(list);
  document.body.appendChild(nav);

  /* ---- liquid indicator ---- */
  var inkLeft = null;
  var LEAD = "0.32s cubic-bezier(0.3, 0.9, 0.3, 1)";
  var TRAIL = "0.55s cubic-bezier(0.65, 0, 0.35, 1) 0.05s";
  function moveInk(i, instant) {
    if (mobile.matches || i < 0) { ink.classList.remove("is-on"); return; }
    var a = links[i];
    var left = a.offsetLeft;
    var right = list.clientWidth - (a.offsetLeft + a.offsetWidth);
    if (instant || inkLeft === null) {
      ink.style.transition = "none";
    } else if (left > inkLeft) {          /* moving right: right edge leads */
      ink.style.transition = "left " + TRAIL + ", right " + LEAD + ", opacity 0.2s ease";
    } else {                              /* moving left: left edge leads */
      ink.style.transition = "left " + LEAD + ", right " + TRAIL + ", opacity 0.2s ease";
    }
    ink.style.left = left + "px";
    ink.style.right = right + "px";
    if (instant || inkLeft === null) { void ink.offsetWidth; ink.style.transition = ""; }
    inkLeft = left;
    ink.classList.add("is-on");
  }

  var fab = document.createElement("button");
  fab.type = "button";
  fab.className = "case-nav__fab";
  fab.setAttribute("aria-controls", "case-nav");
  fab.setAttribute("aria-expanded", "false");
  fab.setAttribute("aria-label", "Open section menu");
  fab.innerHTML = '<img src="' + base + 'assets/img/Top-MASK.svg" alt="" width="18" height="27">';
  document.body.appendChild(fab);

  /* ---- show once the brief has left the screen ---- */
  var shown = false;
  function setShown(on) {
    if (on === shown) return;
    shown = on;
    nav.classList.toggle("is-visible", on);
    fab.classList.toggle("is-visible", on);
    if (!on) close(false);
  }

  /* ---- current section ---- */
  var current = -1;
  function setCurrent(i) {
    if (i === current) return;
    if (current > -1) links[current].removeAttribute("aria-current");
    current = i;
    if (i < 0) { moveInk(-1); return; }
    links[i].setAttribute("aria-current", "true");
    moveInk(i, false);
    if (!mobile.matches) {
      var a = links[i];
      var left = a.offsetLeft - 24;
      var right = a.offsetLeft + a.offsetWidth + 48 - list.clientWidth;
      if (list.scrollLeft > left) list.scrollLeft = left;
      else if (list.scrollLeft < right) list.scrollLeft = right;
    }
  }

  /* A click on the index moves the indicator straight to the target and
     holds it there while the page scrolls, instead of sliding through
     every section on the way. */
  var lockIdx = -1, lockTimer = null;
  list.addEventListener("click", function (e) {
    var a = e.target.closest(".case-nav__link");
    if (!a || mobile.matches) return;
    lockIdx = links.indexOf(a);
    setCurrent(lockIdx);
    clearTimeout(lockTimer);
    lockTimer = setTimeout(function () { lockIdx = -1; onScroll(); }, 1500);
  });
  window.addEventListener("scroll", function () {
    if (lockIdx < 0) return;
    clearTimeout(lockTimer);
    lockTimer = setTimeout(function () { lockIdx = -1; onScroll(); }, 160);
  }, { passive: true });

  var ticking = false;
  function update() {
    ticking = false;
    setShown(brief.getBoundingClientRect().bottom <= 0);
    if (lockIdx > -1) return;
    var line = (mobile.matches ? 72 : 96) + 8;
    var idx = -1;
    for (var i = 0; i < targets.length; i++) {
      if (targets[i].getBoundingClientRect().top <= line) idx = i;
    }
    setCurrent(idx);
  }
  window.addEventListener("resize", function () { if (current > -1) moveInk(current, true); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { if (current > -1) moveInk(current, true); });
  function onScroll() {
    if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();

  /* ---- mobile panel ---- */
  function isOpen() { return nav.classList.contains("is-open"); }
  function open() {
    nav.classList.add("is-open");
    fab.setAttribute("aria-expanded", "true");
    fab.setAttribute("aria-label", "Close section menu");
    var first = nav.querySelector("a");
    if (first) first.focus();
  }
  function close(restoreFocus) {
    if (!isOpen()) return;
    nav.classList.remove("is-open");
    fab.setAttribute("aria-expanded", "false");
    fab.setAttribute("aria-label", "Open section menu");
    if (restoreFocus) fab.focus();
  }
  fab.addEventListener("click", function () { if (isOpen()) close(true); else open(); });
  list.addEventListener("click", function (e) { if (e.target.closest("a")) close(false); });
  document.addEventListener("click", function (e) {
    if (isOpen() && !nav.contains(e.target) && !fab.contains(e.target)) close(false);
  });
  document.addEventListener("keydown", function (e) {
    if (!isOpen()) return;
    if (e.key === "Escape") { close(true); return; }
    if (e.key !== "Tab") return;
    var items = [fab].concat(Array.prototype.slice.call(nav.querySelectorAll("a")));
    var i = items.indexOf(document.activeElement);
    if (e.shiftKey && (i <= 0)) { e.preventDefault(); items[items.length - 1].focus(); }
    else if (!e.shiftKey && i === items.length - 1) { e.preventDefault(); items[0].focus(); }
  });
  var onMq = function () { close(false); onScroll(); };
  if (mobile.addEventListener) mobile.addEventListener("change", onMq); else mobile.addListener(onMq);
})();
/* ===== END BLOCK: case-nav ===== */
