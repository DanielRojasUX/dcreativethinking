/* ===== BEGIN BLOCK: projects (More case studies) =====
   Renders the homepage project cards into every case study's
   <div data-projects="more" data-base="../../" data-current="KEY">.
   The card markup below is copied verbatim from the cards in Index.html
   (generated: same order, same classes, so my-work.css styles them exactly
   like the homepage). Paths are root relative and get data-base prepended.
   When a homepage card changes, regenerate this list from Index.html.

   Related: the RELATED_MAX closest projects, ranked by category overlap
     (shared tags / all tags of both cards), then same primary tag (the first
     tag on the card), then homepage order. Projects for the same company
     (ORG line) always come first, even without a shared tag; other projects
     sharing no tag are out.
   View all: every other project, in homepage order.
   Both views show one row; the homepage "view more" control reveals the rest. */
(function () {
  "use strict";

  var RELATED_MAX = 3;

  var PROJECTS = [
    {"key": "dashboard", "className": "card card--brand", "category": "ux-product strategy", "html": "<div class=\"card__badges\"><img class=\"card__glyph\" src=\"assets/img/glyph-1.svg\" alt=\"\" aria-hidden=\"true\"><img class=\"card__glyph\" src=\"assets/img/glyph-2.svg\" alt=\"\" aria-hidden=\"true\"><img class=\"card__glyph\" src=\"assets/img/glyph-3.svg\" alt=\"\" aria-hidden=\"true\"></div><figure class=\"card__figure\"><img class=\"card__illustration\" src=\"assets/img/illus-dashboard.webp\" alt=\"Dashboard Landing illustration\"></figure><div class=\"card__hero\"><picture class=\"card__hero-media\"><img class=\"card__hero-img\" src=\"assets/img/brand-dashboard.png\" alt=\"\"></picture><img class=\"card__logo\" src=\"assets/img/logo-ibm.svg\" alt=\"Kyndryl / IBM\"></div><div class=\"card__body\"><h3 class=\"card__title\"><a class=\"card__link\" href=\"usecases/Dashboard-Landing/dashboard-landing.html\">Dashboard Landing</a></h3><p class=\"card__desc\">Redefining static landing page into a dynamic personalized dashboard</p><hr class=\"card__rule\"><dl class=\"card__meta\"><div><span class=\"card__meta-label\">ORG:</span> Kyndryl / IBM</div><div><span class=\"card__meta-label\">ROLE:</span> Strategy, executive pitch, design ops.</div><div><span class=\"card__meta-label\">OUTCOME:</span> Static link page rebuilt as a modular dashboard across 5+ apps.</div></dl></div>"},
    {"key": "nav", "className": "card card--brand", "category": "ux-product", "html": "<div class=\"card__badges\"><img class=\"card__glyph\" src=\"assets/img/glyph-1.svg\" alt=\"\" aria-hidden=\"true\"><img class=\"card__glyph\" src=\"assets/img/glyph-2.svg\" alt=\"\" aria-hidden=\"true\"><img class=\"card__glyph\" src=\"assets/img/glyph-4.svg\" alt=\"\" aria-hidden=\"true\"></div><figure class=\"card__figure\"><img class=\"card__illustration\" src=\"assets/img/illus-navigation.webp\" alt=\"Navigation Patterns illustration\"></figure><div class=\"card__hero\"><picture class=\"card__hero-media\"><img class=\"card__hero-img\" src=\"assets/img/brand-navigation.png\" alt=\"\"></picture><img class=\"card__logo\" src=\"assets/img/logo-ibm.svg\" alt=\"Kyndryl / IBM\"></div><div class=\"card__body\"><h3 class=\"card__title\"><a class=\"card__link\" href=\"usecases/Navigation-Patterns/navigation-patterns.html\">Navigation Patterns</a></h3><p class=\"card__desc\">Streamline exploration, improving discoverability, ensuring consistency</p><hr class=\"card__rule\"><dl class=\"card__meta\"><div><span class=\"card__meta-label\">ORG:</span> Kyndryl / IBM</div><div><span class=\"card__meta-label\">ROLE:</span> Information architecture, prototyping, testing.</div><div><span class=\"card__meta-label\">OUTCOME:</span> 25% increase in task completion across key journeys.</div></dl></div>"},
    {"key": "color", "className": "card card--brand", "category": "ux-product visual", "html": "<div class=\"card__badges\"><img class=\"card__glyph\" src=\"assets/img/glyph-1.svg\" alt=\"\" aria-hidden=\"true\"><img class=\"card__glyph\" src=\"assets/img/glyph-3.svg\" alt=\"\" aria-hidden=\"true\"><img class=\"card__glyph\" src=\"assets/img/glyph-5.svg\" alt=\"\" aria-hidden=\"true\"></div><figure class=\"card__figure\"><img class=\"card__illustration\" src=\"assets/img/illus-colors.webp\" alt=\"Color Mapping illustration\"></figure><div class=\"card__hero\"><picture class=\"card__hero-media\"><img class=\"card__hero-img\" src=\"assets/img/brand-colors.png\" alt=\"\"></picture><img class=\"card__logo\" src=\"assets/img/logo-ibm.svg\" alt=\"Kyndryl / IBM\"></div><div class=\"card__body\"><h3 class=\"card__title\"><a class=\"card__link\" href=\"usecases/Color-Mapping/color-mapping.html\">Color Mapping</a></h3><p class=\"card__desc\">Transitioning colors while ensuring WCAG 2.1 AA accessibility</p><hr class=\"card__rule\"><dl class=\"card__meta\"><div><span class=\"card__meta-label\">ORG:</span> Kyndryl / IBM</div><div><span class=\"card__meta-label\">ROLE:</span> Design system, token architecture, accessibility.</div><div><span class=\"card__meta-label\">OUTCOME:</span> 95% WCAG 2.1 alignment, 30% fewer usability issues.</div></dl></div>"},
    {"key": "checkin", "className": "card card--brand", "category": "strategy ux-product", "html": "<div class=\"card__badges\"><img class=\"card__glyph\" src=\"assets/img/glyph-2.svg\" alt=\"\" aria-hidden=\"true\"><img class=\"card__glyph\" src=\"assets/img/glyph-3.svg\" alt=\"\" aria-hidden=\"true\"><img class=\"card__glyph\" src=\"assets/img/glyph-5.svg\" alt=\"\" aria-hidden=\"true\"></div><figure class=\"card__figure\"><img class=\"card__illustration\" src=\"assets/img/illus-arcos.webp\" alt=\"Improving Check-in illustration\"></figure><div class=\"card__hero\"><picture class=\"card__hero-media\"><img class=\"card__hero-img\" src=\"assets/img/brand-arcos.png\" alt=\"\"></picture><img class=\"card__logo card__logo--glyph\" src=\"assets/img/logo-arcos.svg\" alt=\"ARCOS\"></div><div class=\"card__body\"><h3 class=\"card__title\"><a class=\"card__link\" href=\"usecases/Improving-CheckIn/improving-checkin.html\">Improving Check-in</a></h3><p class=\"card__desc\">Transforming fragmented on-site check-in process with digital solutions</p><hr class=\"card__rule\"><dl class=\"card__meta\"><div><span class=\"card__meta-label\">ORG:</span> ARCOS</div><div><span class=\"card__meta-label\">ROLE:</span> Journey mapping, service design, high fidelity UI.</div><div><span class=\"card__meta-label\">OUTCOME:</span> Check-in about 80% faster, paper tracking eliminated.</div></dl></div>"},
    {"key": "hotel", "className": "card card--brand", "category": "ux-product strategy", "html": "<div class=\"card__badges\"><img class=\"card__glyph\" src=\"assets/img/glyph-1.svg\" alt=\"\" aria-hidden=\"true\"><img class=\"card__glyph\" src=\"assets/img/glyph-2.svg\" alt=\"\" aria-hidden=\"true\"><img class=\"card__glyph\" src=\"assets/img/glyph-3.svg\" alt=\"\" aria-hidden=\"true\"></div><figure class=\"card__figure\"><img class=\"card__illustration\" src=\"assets/img/illus-hotelnext.webp\" alt=\"Hotel Next illustration\"></figure><div class=\"card__hero\"><picture class=\"card__hero-media\"><img class=\"card__hero-img\" src=\"assets/img/brand-hotelnext.png\" alt=\"\"></picture><img class=\"card__logo\" src=\"assets/img/HN-logo.svg\" alt=\"Hotel Next\"></div><div class=\"card__body\"><h3 class=\"card__title\"><a class=\"card__link\" href=\"usecases/Hotel-Next/hotel-digital-experience.html\">Hotel Next</a></h3><p class=\"card__desc\">A fully digital hotel stay across a Digital Ecosystem</p><hr class=\"card__rule\"><dl class=\"card__meta\"><div><span class=\"card__meta-label\">ORG:</span> Hotel Next / TrueOmni</div><div><span class=\"card__meta-label\">ROLE:</span> Requirements, ecosystem design, prototyping.</div><div><span class=\"card__meta-label\">OUTCOME:</span> App, kiosks and video walls running on one shared CMS.</div></dl></div>"},
    {"key": "creme", "className": "card card--brand", "category": "ux-product visual", "html": "<div class=\"card__badges\"><img class=\"card__glyph\" src=\"assets/img/glyph-1.svg\" alt=\"\" aria-hidden=\"true\"><img class=\"card__glyph\" src=\"assets/img/glyph-3.svg\" alt=\"\" aria-hidden=\"true\"><img class=\"card__glyph\" src=\"assets/img/glyph-5.svg\" alt=\"\" aria-hidden=\"true\"></div><figure class=\"card__figure\"><img class=\"card__illustration\" src=\"assets/img/illus-creme.png\" alt=\"Crème Insurance illustration\"></figure><div class=\"card__hero\"><picture class=\"card__hero-media\"><img class=\"card__hero-img\" src=\"assets/img/brand-creme.png\" alt=\"\"></picture><img class=\"card__logo\" src=\"assets/img/logo-creme.svg\" alt=\"Crème Insurance\"></div><div class=\"card__body\"><h3 class=\"card__title\"><a class=\"card__link\" href=\"usecases/Creme-Insurance/creme-insurance.html\">Crème Insurance</a></h3><p class=\"card__desc\">Modernizing a legacy claims portal into a high-touch enterprise SaaS platform</p><hr class=\"card__rule\"><dl class=\"card__meta\"><div><span class=\"card__meta-label\">ORG:</span> Crème Insurance</div><div><span class=\"card__meta-label\">ROLE:</span> UI design, design system, front end.</div><div><span class=\"card__meta-label\">OUTCOME:</span> Legacy claims portal rebuilt as a working coded prototype.</div></dl></div>"},
    {"key": "livewire", "className": "card card--brand", "category": "visual ux-product", "html": "<div class=\"card__badges\"><img class=\"card__glyph\" src=\"assets/img/glyph-1.svg\" alt=\"\" aria-hidden=\"true\"><img class=\"card__glyph\" src=\"assets/img/glyph-3.svg\" alt=\"\" aria-hidden=\"true\"><img class=\"card__glyph\" src=\"assets/img/glyph-5.svg\" alt=\"\" aria-hidden=\"true\"></div><figure class=\"card__figure\"><img class=\"card__illustration\" src=\"assets/img/illus-livewire.png\" alt=\"LiveWire Dashboard illustration\"></figure><div class=\"card__hero\"><picture class=\"card__hero-media\"><img class=\"card__hero-img\" src=\"assets/img/brand-livewire.png\" alt=\"\"></picture><img class=\"card__logo\" src=\"assets/img/logo-livewire.svg\" alt=\"LiveWire\"></div><div class=\"card__body\"><h3 class=\"card__title\"><a class=\"card__link\" href=\"usecases/LiveWire/livewire-dashboard.html\">LiveWire Dashboard</a></h3><p class=\"card__desc\">Modernizing a Power BI analytics dashboard into a custom SaaS monitoring platform</p><hr class=\"card__rule\"><dl class=\"card__meta\"><div><span class=\"card__meta-label\">ORG:</span> Livewire</div><div><span class=\"card__meta-label\">ROLE:</span> UI design, data visualization, front end.</div><div><span class=\"card__meta-label\">OUTCOME:</span> Power BI report replaced by a custom web app shell.</div></dl></div>"},
    {"key": "nucu", "className": "card card--brand", "category": "visual strategy", "html": "<div class=\"card__badges\"><img class=\"card__glyph\" src=\"assets/img/glyph-1.svg\" alt=\"\" aria-hidden=\"true\"><img class=\"card__glyph\" src=\"assets/img/glyph-3.svg\" alt=\"\" aria-hidden=\"true\"><img class=\"card__glyph\" src=\"assets/img/glyph-5.svg\" alt=\"\" aria-hidden=\"true\"></div><figure class=\"card__figure\"><img class=\"card__illustration\" src=\"assets/img/illus-nucu-studio.png\" alt=\"Illustration of a backstrap loom with a tree growing from its weave\"></figure><div class=\"card__hero\"><picture class=\"card__hero-media\"><img class=\"card__hero-img\" src=\"assets/img/brand-nucu-studio.png\" alt=\"\"></picture><img class=\"card__logo card__logo--mark\" src=\"assets/img/logo-nucu.png\" alt=\"NUCU\"></div><div class=\"card__body\"><h3 class=\"card__title\"><a class=\"card__link\" href=\"usecases/NUCU-Studio/nucu-studio.html\">NUCU Boutique Studio</a></h3><p class=\"card__desc\">Co-founded a handmade bag brand in Chiapas and built its brand, product line and production</p><hr class=\"card__rule\"><dl class=\"card__meta\"><div><span class=\"card__meta-label\">ORG:</span> NUCU, Chiapas</div><div><span class=\"card__meta-label\">ROLE:</span> Co-owner and Creative Director.</div><div><span class=\"card__meta-label\">OUTCOME:</span> Sold across Mexico and exported to Europe and the US by year two.</div></dl></div>"},
    {"key": "nucu-brand", "className": "card card--brand", "category": "visual", "html": "<div class=\"card__badges\"><img class=\"card__glyph\" src=\"assets/img/glyph-1.svg\" alt=\"\" aria-hidden=\"true\"><img class=\"card__glyph\" src=\"assets/img/glyph-3.svg\" alt=\"\" aria-hidden=\"true\"><img class=\"card__glyph\" src=\"assets/img/glyph-5.svg\" alt=\"\" aria-hidden=\"true\"></div><figure class=\"card__figure\"><img class=\"card__illustration\" src=\"assets/img/illus-nucu-branding.png\" alt=\"Illustration of a bird with outspread wings and a woven body\"></figure><div class=\"card__hero\"><picture class=\"card__hero-media\"><img class=\"card__hero-img\" src=\"assets/img/brand-nucu-branding.png\" alt=\"\"></picture><img class=\"card__logo card__logo--mark\" src=\"assets/img/logo-nucu.png\" alt=\"NUCU\"></div><div class=\"card__body\"><h3 class=\"card__title\"><a class=\"card__link\" href=\"usecases/NUCU-Branding/nucu-branding.html\">NUCU Branding</a></h3><p class=\"card__desc\">Brand system for a studio of unique handmade bags: mark, color, type and the rules on every surface</p><hr class=\"card__rule\"><dl class=\"card__meta\"><div><span class=\"card__meta-label\">ORG:</span> NUCU, Chiapas</div><div><span class=\"card__meta-label\">ROLE:</span> Brand creation, guidelines and applications.</div><div><span class=\"card__meta-label\">OUTCOME:</span> One identity on every unique piece, from labels to photographs.</div></dl></div>"},
    {"key": "neverwas", "className": "card card--brand", "category": "ai-content visual", "html": "<div class=\"card__badges\"><img class=\"card__glyph\" src=\"assets/img/glyph-1.svg\" alt=\"\" aria-hidden=\"true\"><img class=\"card__glyph\" src=\"assets/img/glyph-3.svg\" alt=\"\" aria-hidden=\"true\"><img class=\"card__glyph\" src=\"assets/img/glyph-5.svg\" alt=\"\" aria-hidden=\"true\"></div><figure class=\"card__figure\"><img class=\"card__illustration\" src=\"assets/img/illus-neverwas.png\" alt=\"Engraving of a samurai armor on a film tripod, a cloud above and an agave at its roots\"></figure><div class=\"card__hero\"><picture class=\"card__hero-media\"><img class=\"card__hero-img\" src=\"assets/img/brand-neverwas.webp\" alt=\"\"></picture><img class=\"card__logo\" src=\"assets/img/logo-neverwas.svg\" alt=\"Never Was Studios\"></div><div class=\"card__body\"><h3 class=\"card__title\"><a class=\"card__link\" href=\"usecases/Never-Was/never-was.html\">Never Was Studios</a></h3><p class=\"card__desc\">An AI film studio for movies that were never shot: characters, fashion and reels</p><hr class=\"card__rule\"><dl class=\"card__meta\"><div><span class=\"card__meta-label\">ORG:</span> Never Was Studios</div><div><span class=\"card__meta-label\">ROLE:</span> Concept, art direction, AI generation, edit.</div><div><span class=\"card__meta-label\">OUTCOME:</span> Live on Instagram since October 2026, one song per piece.</div></dl></div>"},
    {"key": "sunu", "className": "card card--brand", "category": "ai-content visual", "html": "<div class=\"card__badges\"><img class=\"card__glyph\" src=\"assets/img/glyph-1.svg\" alt=\"\" aria-hidden=\"true\"><img class=\"card__glyph\" src=\"assets/img/glyph-3.svg\" alt=\"\" aria-hidden=\"true\"><img class=\"card__glyph\" src=\"assets/img/glyph-5.svg\" alt=\"\" aria-hidden=\"true\"></div><figure class=\"card__figure\"><img class=\"card__illustration\" src=\"assets/img/illus-sunu.png\" alt=\"Engraving of an anatomical heart with forks lifting pasta from it\"></figure><div class=\"card__hero\"><picture class=\"card__hero-media\"><img class=\"card__hero-img\" src=\"assets/img/brand-sunu.webp\" alt=\"\"></picture><img class=\"card__logo\" src=\"assets/img/logo-sunu.svg\" alt=\"Sunú\"></div><div class=\"card__body\"><h3 class=\"card__title\"><a class=\"card__link\" href=\"usecases/Sunu-Content/sunu-content.html\">Sunú Reels</a></h3><p class=\"card__desc\">Daily reels for a home pasta tray brand: one formula of hook, food in motion and mark, made with AI</p><hr class=\"card__rule\"><dl class=\"card__meta\"><div><span class=\"card__meta-label\">ORG:</span> Sunú</div><div><span class=\"card__meta-label\">ROLE:</span> Content formula, AI generation, music, edit.</div><div><span class=\"card__meta-label\">OUTCOME:</span> 7 reels a week planned, 2 to 3 generations each, no paid ads.</div></dl></div>"}
  ];

  var EXPAND_HTML =
    '<span class="my-work__expand-rule" aria-hidden="true"></span>' +
    '<svg class="my-work__expand-icon" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '<path d="M11.4146 12L0 0H4.74146L12 7.85106L19.2585 0H24L12.5854 12H11.4146Z" fill="currentColor"/></svg>' +
    '<span class="my-work__expand-label">view more</span>' +
    '<span class="my-work__expand-rule" aria-hidden="true"></span>';

  function rebase(html, base) {
    return html.replace(/(src|href)="([^"]+)"/g, function (all, attr, url) {
      if (/^(https?:|mailto:|tel:|#|\/|data:)/.test(url)) return all;
      return attr + '="' + base + url + '"';
    });
  }

  function tags(p) { return p.category.split(/\s+/).filter(Boolean); }

  /* Company, read from the card's ORG line ("Kyndryl / IBM", "NUCU, Chiapas").
     Projects for the same company always lead the Related row. */
  function org(p) {
    var m = /ORG:<\/span>\s*([^<]+)/.exec(p.html);
    return m ? m[1].split(/[,\/]/)[0].trim().toLowerCase() : "";
  }
  function sameOrg(p, current) { var o = org(p); return !!o && o === org(current); }

  function score(p, current) {
    var a = tags(p), b = tags(current);
    var shared = a.filter(function (t) { return b.indexOf(t) !== -1; }).length;
    if (!shared) return 0;
    var union = a.length + b.length - shared;
    return shared / union + (a[0] === b[0] ? 0.01 : 0);
  }

  function build(grid) {
    var base = grid.getAttribute("data-base") || "";
    var currentKey = grid.getAttribute("data-current") || "";
    var current = PROJECTS.filter(function (p) { return p.key === currentKey; })[0];
    var others = PROJECTS.filter(function (p) { return p.key !== currentKey; });

    var cards = {};
    others.forEach(function (p) {
      var el = document.createElement("article");
      el.className = p.className;
      el.setAttribute("data-category", p.category);
      el.setAttribute("data-key", p.key);
      el.innerHTML = rebase(p.html, base);
      cards[p.key] = el;
    });

    var lists = {
      all: others.map(function (p) { return p.key; }),
      related: !current ? [] : others
        .map(function (p, i) { return { key: p.key, o: sameOrg(p, current) ? 1 : 0, s: score(p, current), i: i }; })
        .filter(function (r) { return r.o || r.s > 0; })
        .sort(function (x, y) { return y.o - x.o || y.s - x.s || x.i - y.i; })
        .slice(0, RELATED_MAX)
        .map(function (r) { return r.key; })
    };

    var section = grid.closest(".more") || grid.parentNode;
    var filters = Array.prototype.slice.call(section.querySelectorAll("[data-more-filter]"));

    var expand = document.createElement("button");
    expand.type = "button";
    expand.className = "my-work__expand more__expand";
    expand.innerHTML = EXPAND_HTML;
    grid.parentNode.insertBefore(expand, grid.nextSibling);
    var expandLabel = expand.querySelector(".my-work__expand-label");

    var mode = "related";
    var expanded = false;

    function columns() {
      var n = getComputedStyle(grid).gridTemplateColumns.split(" ").filter(Boolean).length;
      return n > 0 ? n : 1;
    }

    function render() {
      var list = lists[mode];
      var limit = expanded ? list.length : Math.min(columns(), list.length);
      /* order the DOM to the active list so the grid flows in ranked order */
      list.forEach(function (key) { grid.appendChild(cards[key]); });
      Object.keys(cards).forEach(function (key) {
        var pos = list.indexOf(key);
        if (pos !== -1 && pos < limit) cards[key].removeAttribute("hidden");
        else cards[key].setAttribute("hidden", "");
      });
      var hasMore = list.length > columns();
      if (!hasMore) { expand.setAttribute("hidden", ""); }
      else {
        expand.removeAttribute("hidden");
        expand.classList.toggle("is-expanded", expanded);
        expand.setAttribute("aria-expanded", String(expanded));
        expand.setAttribute("aria-label", expanded ? "Show fewer case studies" : "View more case studies");
        expandLabel.textContent = expanded ? "show less" : "view more";
      }
      filters.forEach(function (b) {
        var on = b.getAttribute("data-more-filter") === mode;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-selected", String(on));
      });
    }

    filters.forEach(function (b) {
      b.addEventListener("click", function () {
        mode = b.getAttribute("data-more-filter");
        expanded = false;
        render();
      });
    });
    expand.addEventListener("click", function () { expanded = !expanded; render(); });

    var timer;
    window.addEventListener("resize", function () {
      clearTimeout(timer);
      timer = setTimeout(render, 150);
    });

    var active = filters.filter(function (b) { return b.classList.contains("is-active"); })[0];
    mode = active ? active.getAttribute("data-more-filter") : "related";
    if (!lists[mode] || (mode === "related" && !lists.related.length)) mode = "all";
    render();
  }

  Array.prototype.slice.call(document.querySelectorAll('[data-projects="more"]')).forEach(build);
})();
/* ===== END BLOCK ===== */
