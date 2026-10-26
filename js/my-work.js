/* ===== BEGIN BLOCK: .my-work ===== */
(function () {
  var root = document.querySelector(".my-work");
  if (!root) return;

  var grid = root.querySelector(".js-grid");
  var cards = Array.prototype.slice.call(grid.querySelectorAll(".card"));
  var tabsNav = root.querySelector(".js-tabs");
  var tabs = Array.prototype.slice.call(root.querySelectorAll(".js-tabs .my-work__tab"));
  var trigger = root.querySelector(".js-tabs-trigger");
  var triggerLabel = root.querySelector(".js-tabs-trigger-label");

  var chevron = root.querySelector(".js-more-bottom");
  var expandLabel = root.querySelector(".js-expand-label");
  var moreTop = root.querySelector(".js-more-top");
  var moreTopLabel = root.querySelector(".js-more-top-label");
  var moreTopPlus = root.querySelector(".js-more-top-plus");
  var moreTopMinus = root.querySelector(".js-more-top-minus");
  var swapBtn = root.querySelector(".js-swap");

  var currentFilter = "all";
  var visibleCount = 0;

  /* stepped reveal: initial 2 rows on every breakpoint, each step +3 rows
     (mobile +2). */
  function columnCount() {
    var t = getComputedStyle(grid).gridTemplateColumns.split(" ").length;
    return t > 0 ? t : 1;
  }
  function isMobile() { return columnCount() === 1; }
  function initialRows() { return 2; }
  function stepRows() { return isMobile() ? 2 : 3; }
  function initialCount() { return columnCount() * initialRows(); }
  function stepSize() { return columnCount() * stepRows(); }

  /* a card can belong to several categories: data-category="ux-product strategy" */
  function inCategory(card, cat) {
    return (card.dataset.category || "").split(/\s+/).indexOf(cat) !== -1;
  }
  function categoryCount(cat) {
    return cards.filter(function (c) { return inCategory(c, cat); }).length;
  }
  function matchingCards() {
    return cards.filter(function (card) {
      return currentFilter === "all" || inCategory(card, currentFilter);
    });
  }

  /* control bar: a filter tab with zero cards is not rendered (ALL always
     shows). No test case triggers this now, but the logic is here for when
     real data is fed. */
  function syncTabs() {
    tabs.forEach(function (tab) {
      var f = tab.dataset.filter;
      if (f === "all") return;
      tab.classList.toggle("is-empty", categoryCount(f) === 0);
    });
  }

  function resetReveal() {
    visibleCount = Math.min(initialCount(), matchingCards().length);
  }

  function render() {
    var matches = matchingCards();
    var floor = Math.min(initialCount(), matches.length);
    if (visibleCount < floor) visibleCount = floor;
    if (visibleCount > matches.length) visibleCount = matches.length;

    cards.forEach(function (card) {
      var pos = matches.indexOf(card);
      if (pos !== -1 && pos < visibleCount) { card.removeAttribute("hidden"); }
      else { card.setAttribute("hidden", ""); }
    });

    var fullyExpanded = visibleCount >= matches.length;
    var hasHidden = matches.length > initialCount();

    /* view more: three states —
       disabled "view more +"  : everything already fits in one row
       enabled  "view more +"  : more than one row exists, not yet expanded
       enabled  "view less -"  : expanded past one row; clicking collapses
       Disabled always shows the plus (per chat), never the minus. */
    if (moreTop) {
      var noToggle = !hasHidden; // total fits within the initial single row
      moreTop.setAttribute("aria-disabled", String(noToggle));
      if (moreTopLabel) moreTopLabel.textContent = (!noToggle && fullyExpanded) ? "view less" : "view more";
      var showMinus = !noToggle && fullyExpanded;
      if (moreTopPlus) { if (showMinus) moreTopPlus.setAttribute("hidden", ""); else moreTopPlus.removeAttribute("hidden"); }
      if (moreTopMinus) { if (showMinus) moreTopMinus.removeAttribute("hidden"); else moreTopMinus.setAttribute("hidden", ""); }
    }

    /* chevron: removed entirely only when the first view shows everything;
       otherwise present, flipping down (reveal) -> up (collapse) */
    if (chevron) {
      if (!hasHidden) {
        chevron.setAttribute("hidden", "");
      } else {
        chevron.removeAttribute("hidden");
        chevron.classList.toggle("is-expanded", fullyExpanded);
        chevron.setAttribute("aria-expanded", String(fullyExpanded));
        chevron.setAttribute("aria-label", fullyExpanded ? "Collapse" : "Reveal more");
        if (expandLabel) expandLabel.textContent = fullyExpanded ? "show less" : "view more";
      }
    }
  }

  function reveal() {
    var matches = matchingCards();
    visibleCount = Math.min(visibleCount + stepSize(), matches.length);
    render();
  }
  function collapse() {
    resetReveal();
    render();
  }

  function setFilter(filter, label) {
    currentFilter = filter;
    if (triggerLabel && label) triggerLabel.textContent = label;
    resetReveal();
    render();
  }

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) {
        t.classList.remove("is-active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");
      setFilter(tab.dataset.filter, tab.textContent);
      closeMobileDropdown();
    });
  });

  function closeMobileDropdown() {
    if (!tabsNav) return;
    tabsNav.classList.remove("is-open");
    if (trigger) trigger.setAttribute("aria-expanded", "false");
  }
  if (trigger) {
    trigger.addEventListener("click", function () {
      var open = tabsNav.classList.toggle("is-open");
      trigger.setAttribute("aria-expanded", String(open));
    });
  }

  function toggleReveal() {
    var matches = matchingCards();
    if (visibleCount >= matches.length) { collapse(); }
    else { reveal(); }
  }

  /* view more: toggles reveal <-> collapse, mirroring the chevron exactly */
  if (moreTop) {
    moreTop.addEventListener("click", function () {
      if (moreTop.getAttribute("aria-disabled") === "true") return;
      toggleReveal();
    });
  }

  /* chevron: reveal while rows remain, collapse once fully expanded */
  if (chevron) {
    chevron.addEventListener("click", toggleReveal);
  }

  /* face swap: the brand face (photo + logo) is the default, set in the HTML
     with .card--brand and aria-pressed="true"; the illustrations are the
     easter egg one click away */
  if (swapBtn) {
    var brandOn = swapBtn.getAttribute("aria-pressed") === "true";
    swapBtn.addEventListener("click", function () {
      brandOn = !brandOn;
      cards.forEach(function (card) { card.classList.toggle("card--brand", brandOn); });
      swapBtn.setAttribute("aria-pressed", String(brandOn));
    });
  }

  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () { resetReveal(); render(); }, 150);
  });

  syncTabs();
  resetReveal();
  render();
})();
/* ===== END BLOCK ===== */
