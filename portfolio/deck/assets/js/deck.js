(() => {
  'use strict';

  const W = 1920, H = 1080, AR = W / H;
  const stage = document.getElementById('stage');
  const world = document.getElementById('world');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------- tree ---------- */
  const nodes = [];
  const byId = {};
  (function index(n, parent, depth) {
    n.parent = parent; n.depth = depth;
    n.kids = n.children || [];
    n.order = nodes.length;
    nodes.push(n); byId[n.id] = n;
    n.kids.forEach(c => index(c, n, depth + 1));
  })(window.DECK_TREE, null, 0);
  const root = nodes[0];

  /* ---------- layout (world units, root slot = 1920 x 1080) ---------- */
  function contentSize(n) {
    const ar = n.ar || AR;
    return ar >= AR ? { w: W, h: W / ar } : { w: H * ar, h: H };
  }
  // focal element of native slides: [data-focus] measured once off screen
  (function measureNative() {
    const box = document.createElement('div');
    box.style.cssText = 'position:absolute;left:-99999px;top:0;width:1920px;height:1080px;visibility:hidden';
    stage.appendChild(box);
    nodes.forEach(n => {
      if (!n.native || !n.kids.length) return;
      const t = document.getElementById('t-' + n.id);
      box.innerHTML = ''; box.appendChild(t.content.cloneNode(true));
      const f = box.querySelector('[data-focus]');
      if (!f) return;
      const r = f.getBoundingClientRect(), b = box.getBoundingClientRect();
      const k = b.width / W;
      n.focus = [(r.left - b.left) / k, (r.top - b.top) / k, r.width / k, r.height / k];
    });
    box.remove();
  })();

  function place(n, slot) {
    n.slot = slot;
    if (n.view) {
      const p = n.parent, c = p.content;
      n.rect = { x: c.x + n.view[0] * c.w, y: c.y + n.view[1] * c.h, w: n.view[2] * c.w, h: n.view[3] * c.h };
      return;
    }
    const cs = contentSize(n);
    const es = slot.w / W;
    n.size = cs; n.es = es;
    n.content = { x: slot.x + (W - cs.w) / 2 * es, y: slot.y + (H - cs.h) / 2 * es, w: cs.w * es, h: cs.h * es };
    n.rect = slot;
    const frames = n.kids.filter(k => !k.view);
    const views = n.kids.filter(k => k.view);
    const m = frames.length;
    if (m) {
      // children live inside the slide's prominent element, so every zoom goes through it
      let F = { x: slot.x + slot.w * 0.1, y: slot.y + slot.h * 0.1, w: slot.w * 0.8, h: slot.h * 0.8 };
      if (n.focus) F = { x: n.content.x + n.focus[0] * es, y: n.content.y + n.focus[1] * es, w: n.focus[2] * es, h: n.focus[3] * es };
      const gap = 0.06;
      const cw = Math.min(0.5 * slot.w, F.w * 0.92 / (m + (m - 1) * gap), F.h * 0.92 * AR);
      const ch = cw / AR;
      const total = m * cw + (m - 1) * cw * gap;
      let x = F.x + (F.w - total) / 2;
      const y = F.y + (F.h - ch) / 2;
      frames.forEach(k => { place(k, { x, y, w: cw, h: ch }); x += cw * (1 + gap); });
    }
    views.forEach(v => place(v, null));
  }
  place(root, { x: 0, y: 0, w: W, h: H });

  function camFor(n) {
    const r = n.rect;
    const w = Math.max(r.w, r.h * AR);
    return { x: r.x + r.w / 2 - w / 2, y: r.y + r.h / 2 - w / AR / 2, w };
  }

  /* ---------- frames ---------- */
  const ACC = '.cs-list li, .body li, .body .lead, .statement p, .req .rh, .req .rr, .pp, .flow g, .flow .e, .bb-client, .ev, .bb-rules > div, .ct .phone, .ct-notes h3, .ct-notes li, .edge .legend, .edge section, .lofi figure, .lofi-note';
  const frames = nodes.filter(n => !n.view);
  frames.forEach(n => {
    const el = document.createElement('section');
    el.className = 'frame';
    el.style.width = n.size.w + 'px';
    el.style.height = n.size.h + 'px';
    el.setAttribute('aria-label', n.label);
    if (n.native) {
      const t = document.getElementById('t-' + n.id);
      el.appendChild(t.content.cloneNode(true));
      el.classList.add('native');
      el.querySelectorAll(ACC).forEach((x, i) => { x.classList.add('acc'); x.style.setProperty('--a', i); });
      el.querySelectorAll('.hd .kicker, .hd .title, .big-title').forEach(x => { x.dataset.share = x.textContent.trim(); });
      n.bg = t.dataset.bg || '#FCFCFC';
    } else {
      const img = document.createElement('img');
      img.alt = n.label; img.decoding = 'async'; img.draggable = false;
      img.dataset.src = n.src;
      el.appendChild(img);
      // builds: a plain string is a full slide image; an object is a patch laid over one region,
      // stacked above the live text so the text under it dissolves with the artwork (fx: 'dissolve').
      // A patch can carry its own overlays (slide coordinates), shown only while it is on.
      const ov = (o, dx, dy) => {
        const d = document.createElement('div');
        d.className = 'ov ov-' + o.style + (o.anim ? ' letter' : '');
        d.style.cssText = `left:${o.x - dx}px;top:${o.y - dy}px;font-size:${o.fs}px;line-height:${o.h}px;font-weight:${o.weight};color:${o.color}` + (o.stroke ? `;-webkit-text-stroke:${o.stroke}px ${o.color}` : '');
        d.textContent = o.text;
        if (o.style === 'title' && !dx && !dy) d.dataset.share = o.text;
        return d;
      };
      n.stepEls = [];
      const patches = [];
      (n.steps || []).forEach(s => {
        const im = document.createElement('img');
        im.alt = ''; im.decoding = 'async'; im.draggable = false;
        let st = im;
        if (typeof s === 'string') { im.dataset.src = s; im.className = 'step'; el.appendChild(im); }
        else {
          st = document.createElement('div');
          st.className = 'step patch' + (s.fx ? ' fx-' + s.fx : '') + (s.src ? '' : ' bare');
          st.style.cssText = `left:${s.x}px;top:${s.y}px;width:${s.w}px;height:${s.h}px`;
          if (s.src) { im.dataset.src = s.src; st.appendChild(im); }
          // thin rules in slide coordinates (bracket extensions and ticks)
          (s.rules || []).forEach(r => {
            const d = document.createElement('div');
            d.className = 'rule';
            d.style.cssText = `left:${r.x - s.x}px;top:${r.y - s.y}px;width:${r.w}px;height:${r.h}px;background:${r.c || '#000'}`;
            st.appendChild(d);
          });
          (s.overlays || []).forEach(o => st.appendChild(ov(o, s.x, s.y)));
          patches.push(st);
        }
        n.stepEls.push(st);
      });
      (n.overlays || []).forEach(o => el.appendChild(ov(o, 0, 0)));
      patches.forEach(p => el.appendChild(p));
    }
    el.style.background = n.bg || '#FCFCFC';
    n.el = el;
    n.step = 0;
    world.appendChild(el);
  });

  // split lettering targets into characters once
  document.querySelectorAll('.letter').forEach(el => {
    const text = el.textContent;
    el.textContent = '';
    el.setAttribute('aria-label', text);
    let i = 0;
    text.split(/(\s+)/).forEach(part => {
      if (!part) return;
      if (/^\s+$/.test(part)) { el.appendChild(document.createTextNode(part)); return; }
      const w = document.createElement('span');
      w.className = 'w'; w.setAttribute('aria-hidden', 'true');
      [...part].forEach(ch => {
        const s = document.createElement('span');
        s.className = 'c'; s.textContent = ch; s.style.setProperty('--i', i++);
        w.appendChild(s);
      });
      el.appendChild(w);
    });
    el.classList.add('shown');
  });

  function loadImages(n) {
    if (!n || !n.el) return;
    n.el.querySelectorAll('img[data-src]').forEach(img => { img.src = img.dataset.src; img.removeAttribute('data-src'); });
  }

  /* ---------- camera ---------- */
  let cam = camFor(root);
  let current = root;
  const smooth = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

  // who is on screen: at rest only the current frame; during a move the two ends crossfade
  let showing = null;   // { a: frame, b: frame, p: 0..1, mode: 'zoom'|'pan'|'inplace', dir: 1|-1 }
  function render() {
    const k = W / cam.w;
    const cur = frameOf(current);
    for (const n of frames) {
      let op = 0, inplace = null;
      if (!showing) op = n === cur ? 1 : 0;
      else if (showing.mode === 'inplace') {
        if (n === showing.a) { op = 1 - showing.p; inplace = -showing.p; }
        else if (n === showing.b) { op = showing.p; inplace = 1 - showing.p; }
      } else if (n === showing.a || n === showing.b) {
        if (showing.mode === 'pan') op = 1;
        else {
          const x = n === showing.a ? 1 - showing.p : showing.p;
          op = smooth(0.3, 0.7, x);
        }
      }
      if (n.zoomable && (current.view && current.parent === n || showing && (showing.na && showing.na.view && showing.na.parent === n))) op = Math.max(op, showing && showing.mode === 'zoom' && n !== showing.a && n !== showing.b ? 0 : 1);
      let sx, sy, r;
      if (inplace !== null) {
        r = 1; sx = (W - n.size.w) / 2 + inplace * 90 * showing.dir; sy = (H - n.size.h) / 2;
      } else {
        r = n.es * k;
        sx = (n.content.x - cam.x) * k; sy = (n.content.y - cam.y) * k;
      }
      const sw = n.size.w * r, sh = n.size.h * r;
      const off = sx > W || sy > H || sx + sw < 0 || sy + sh < 0;
      if (op < 0.004 || off) {
        if (n.vis) { n.el.style.display = 'none'; n.vis = false; }
        continue;
      }
      if (!n.vis) { n.el.style.display = 'block'; n.vis = true; loadImages(n); }
      n.el.style.transform = `translate3d(${sx}px,${sy}px,0) scale(${r})`;
      n.el.style.opacity = op;
    }
  }

  /* ---------- transitions ---------- */
  const DEFAULTS = { speed: 1, ease: 5, settle: 600, accents: true };
  const cfg = Object.assign({}, DEFAULTS);
  try { Object.assign(cfg, JSON.parse(localStorage.getItem('deck-settings') || '{}')); } catch (e) {}
  const ease = t => { const p = cfg.ease; return t < 0.5 ? Math.pow(2, p - 1) * Math.pow(t, p) : 1 - Math.pow(-2 * t + 2, p) / 2; };

  function interp(a, b, t) {
    if (Math.abs(a.w - b.w) / a.w < 1e-6) {
      return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t, w: a.w };
    }
    const w = a.w * Math.pow(b.w / a.w, t);
    const fx = (b.x * a.w - a.x * b.w) / (a.w - b.w);
    const fy = (b.y * a.w - a.y * b.w) / (a.w - b.w);
    return { x: fx + (a.x - fx) * w / a.w, y: fy + (a.y - fy) * w / a.w, w };
  }

  function chain(n) { const c = []; for (let p = n; p; p = p.parent) c.unshift(p); return c; }

  function path(a, b) {
    const ca = chain(a), cb = chain(b);
    let i = 0;
    while (i < ca.length && i < cb.length && ca[i] === cb[i]) i++;
    const lca = ca[i - 1];
    if (lca === a) return [b];                    // deeper: zoom in
    if (lca === b) return [b];                    // back up: zoom out
    const a1 = ca[i], b1 = cb[i];                 // same level under the common parent
    const steps = [];
    if (a1 !== a) steps.push(a1);
    steps.push(b1);
    if (b1 !== b) steps.push(b);
    return steps;
  }

  let anim = null;
  const queue = [];

  /* ---------- shared elements: pinned or carried while the rest moves ---------- */
  const pinLayer = document.getElementById('pins');
  const SHARED = window.DECK_SHARED || {};
  let pinState = null, pinTimer = null;
  const offX = f => (W - f.size.w) / 2, offY = f => (H - f.size.h) / 2;
  function clearPins() {
    clearTimeout(pinTimer);
    if (!pinState) return;
    pinState.holes.forEach(h => h.remove());
    pinState.hidden.forEach(e => { e.style.visibility = ''; });
    pinLayer.innerHTML = '';
    pinState = null;
  }
  function setupPins(fa, fb) {
    clearPins();
    if (fa === fb) return null;
    const st = { holes: [], hidden: [], carries: [], keep: false };
    // raster: identical pixels in both slides, cut out once at build time
    const sh = SHARED[fa.id + '>' + fb.id] || SHARED[fb.id + '>' + fa.id];
    if (sh && fa.size.w === fb.size.w) {
      const img = document.createElement('img');
      img.src = sh.src; img.alt = '';
      img.style.cssText = `left:${sh.x + offX(fa)}px;top:${sh.y + offY(fa)}px;width:${sh.w}px;height:${sh.h}px`;
      pinLayer.appendChild(img);
      [fa, fb].forEach(f => {
        const h = document.createElement('div');
        h.className = 'hole';
        h.style.cssText = `left:${sh.x}px;top:${sh.y}px;width:${sh.w}px;height:${sh.h}px;background:${f.bg};-webkit-mask-image:url(${sh.src});mask-image:url(${sh.src})`;
        f.el.appendChild(h); st.holes.push(h);
      });
      st.keep = true;
    }
    // live text with the same words in both: carried from where it was to where it lands
    [fa, fb].forEach(f => { if (!f.vis) { f.el.style.display = 'block'; f.el.style.opacity = 0; f.vis = true; loadImages(f); } });
    const bs = {};
    fb.el.querySelectorAll('[data-share]').forEach(e => { (bs[e.dataset.share] = bs[e.dataset.share] || []).push(e); });
    fa.el.querySelectorAll('[data-share]').forEach(a => {
      const list = bs[a.dataset.share];
      if (!list || !list.length) return;
      const b = list.shift();
      const ra = rectIn(fa, a), rb = rectIn(fb, b);
      const c = a.cloneNode(true);
      c.classList.remove('play'); c.classList.add('shown');
      c.removeAttribute('data-share');
      c.style.position = 'absolute'; c.style.margin = '0'; c.style.left = ra.x + 'px'; c.style.top = ra.y + 'px';
      c.style.fontSize = getComputedStyle(a).fontSize; c.style.lineHeight = getComputedStyle(a).lineHeight;
      c.style.color = getComputedStyle(a).color; c.style.fontWeight = getComputedStyle(a).fontWeight; c.style.fontFamily = getComputedStyle(a).fontFamily;
      c.style.whiteSpace = 'pre'; c.style.transformOrigin = '0 0';
      pinLayer.appendChild(c);
      a.style.visibility = 'hidden'; b.style.visibility = 'hidden';
      st.hidden.push(a, b);
      if (!ra.h || !rb.h) { c.remove(); return; }
      st.carries.push({ c, ra, rb, k: rb.h / ra.h, b });
    });
    st.carries.forEach(x => { x.b.style.visibility = 'hidden'; });
    st.hidden.forEach(e => { e.style.visibility = 'hidden'; });
    if (!st.holes.length && !st.carries.length) return null;
    pinState = st;
    return st;
  }
  function rectIn(f, e) {
    let x = 0, y = 0, n = e;
    while (n && n !== f.el) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; }
    return { x: x + offX(f), y: y + offY(f), w: e.offsetWidth, h: e.offsetHeight };
  }
  function movePins(t) {
    if (!pinState) return;
    pinState.carries.forEach(({ c, ra, rb, k }) => {
      const s_ = 1 + (k - 1) * t;
      c.style.transform = `translate(${(rb.x - ra.x) * t}px,${(rb.y - ra.y) * t}px) scale(${s_})`;
    });
  }
  function endPins(accentsRunning) {
    if (!pinState) return;
    const st = pinState;
    st.carries.forEach(({ c, b }) => { c.remove(); b.style.visibility = ''; });
    st.carries = [];
    st.holes.forEach(h => h.remove()); st.holes = [];
    st.hidden.forEach(e => { e.style.visibility = ''; }); st.hidden = [];
    // the raster cut out stays on top while the next slide's accent wipe passes under it
    if (st.keep && accentsRunning) pinTimer = setTimeout(clearPins, 1250);
    else clearPins();
  }

  function go(target, opts = {}) {
    if (!target || target === current && !anim) return;
    if (anim) { queue.length = 0; queue.push([target, opts]); return; }
    const from = current;
    const stops = path(from, target);
    current = target;
    const pins = (from.view || target.view) ? (clearPins(), null) : setupPins(frameOf(from), frameOf(target));
    onArrive(target, from, opts);
    if (reduceMotion.matches || opts.instant) {
      cam = camFor(target);
      setBg(target);
      render();
      endPins(false);
      afterArrive(target, opts);
      return;
    }
    const segs = [];
    let prev = from;
    stops.forEach((s, i) => {
      const a = camFor(prev), b = camFor(s);
      const zoom = Math.abs(Math.log(b.w / a.w));
      const dist = Math.hypot(b.x - a.x, b.y - a.y) / Math.max(a.w, b.w);
      const isZoom = zoom > 0.01;
      const dur = (isZoom ? 1150 + Math.min(700, zoom * 160) : 950 + Math.min(600, dist * 160)) / cfg.speed;
      if (i > 0 && cfg.settle > 0) segs.push({ a, b: a, dur: cfg.settle / cfg.speed, node: prev, pause: true, fa: frameOf(prev), fb: frameOf(prev) });
      const inplace = !isZoom && pins && stops.length === 1 && s.parent === from.parent && !s.view && !from.view;
      segs.push({ a, b, dur: inplace ? Math.min(dur, 900 / cfg.speed) : dur, node: s, fa: frameOf(prev), fb: frameOf(s), na: prev,
        mode: inplace ? 'inplace' : isZoom ? 'zoom' : 'pan', dir: s.order > prev.order ? 1 : -1 });
      prev = s;
    });
    const total = segs.reduce((a, x) => a + x.dur, 0);
    let si = 0, t0 = performance.now(), done = 0;
    setBg(segs[0].node, segs[0].dur);
    anim = true;
    (function tick(now) {
      const s = segs[si];
      const t = Math.min(1, (now - t0) / s.dur);
      if (s.mode === 'inplace') cam = t < 1 ? s.a : s.b;
      else cam = s.pause ? s.a : interp(s.a, s.b, ease(t));
      showing = s.pause ? { a: s.fa, b: s.fa, p: 1, mode: 'pan', na: s.node } : { a: s.fa, b: s.fb, p: ease(t), mode: s.mode, dir: s.dir, na: s.na };
      if (t >= 1 && si === segs.length - 1) showing = null;
      movePins(ease(Math.min(1, (done + t * s.dur) / total)));
      render();
      if (t < 1) return requestAnimationFrame(tick);
      done += s.dur;
      si++;
      if (si < segs.length) { t0 = now; if (!segs[si].pause) setBg(segs[si].node, segs[si].dur); return requestAnimationFrame(tick); }
      anim = null;
      showing = null; render();
      endPins(false);
      afterArrive(target, opts);
      if (queue.length) { const [n, o] = queue.shift(); go(n, o); }
    })(t0);
  }

  function frameOf(n) { return n.view ? n.parent : n; }
  function setBg(n, dur = 0) {
    stage.style.transition = dur ? `background-color ${dur}ms ease` : 'none';
    stage.style.background = frameOf(n).bg || '#FCFCFC';
  }

  function onArrive(n, from, opts) {
    history.replaceState(null, '', '#' + n.id);
    markSeen(n);
    updateNav(n);
    const f = frameOf(n);
    loadImages(f);
    n.kids.forEach(k => loadImages(frameOf(k)));
    // a build slide opens on its first state, or on its last one when you step back into it
    if (f.stepEls && f.stepEls.length && (!from || frameOf(from) !== f)) setStep(f, opts.back ? f.stepEls.length : 0, true);
    f.el.classList.remove('enter');
    if (opts.forward && cfg.accents) f.el.classList.add('pre');
    const carried = new Set(pinState ? pinState.carries.map(x => x.b) : []);
    if (opts.forward) f.el.querySelectorAll('.letter').forEach(l => { if (!carried.has(l)) l.classList.remove('shown', 'play'); });
    else f.el.querySelectorAll('.letter').forEach(l => { l.classList.remove('play'); l.classList.add('shown'); });
    frames.forEach(fr => { fr.el.classList.toggle('current', fr === f); if (fr !== f) fr.el.classList.remove('pre'); });
  }
  function afterArrive(n, opts) {
    const f = frameOf(n);
    if (opts.forward) {
      f.el.querySelectorAll('.letter:not(.shown)').forEach(l => { void l.offsetWidth; l.classList.add('play'); });
    }
    if (f.el.classList.contains('pre')) { void f.el.offsetWidth; f.el.classList.remove('pre'); f.el.classList.add('enter'); }
  }

  /* ---------- order ---------- */
  // instant: no transition. A dissolve build plays forward only; stepping back is a cut, as in Figma.
  function setStep(n, s, instant) {
    n.step = s;
    (n.stepEls || []).forEach((img, i) => {
      const on = i < s;
      if (img.classList.contains('on') === on) return;
      if (instant || (!on && img.classList.contains('fx-dissolve'))) {
        img.classList.add('cut');
        img.classList.toggle('on', on);
        void img.offsetWidth;
        img.classList.remove('cut');
      } else img.classList.toggle('on', on);
    });
  }
  function next() {
    const f = frameOf(current);
    if (!current.view && f.steps && f.step < f.steps.length) return setStep(f, f.step + 1);
    const n = nodes[current.order + 1];
    if (n) go(n, { forward: true });
  }
  function prev() {
    const f = frameOf(current);
    if (!current.view && f.steps && f.step > 0) return setStep(f, f.step - 1);
    const n = nodes[current.order - 1];
    if (n) go(n, { back: true });
  }
  function up() { if (current.parent) go(current.parent, {}); }

  /* ---------- navigation: hamburger, accordion for the first levels, flyouts deeper ---------- */
  // menu tiers: Home (link) · Intro (group of the intro slides) · Case Studies (cases › slides › deeper)
  const nav = document.getElementById('nav');
  const mapBtn = nav.querySelector('.map');
  const panel = nav.querySelector('.panel');
  const tree = nav.querySelector('.tree');
  const flyLayer = nav.querySelector('.flys');
  const seen = new Set();
  try { JSON.parse(localStorage.getItem('deck-seen') || '[]').forEach(id => seen.add(id)); } catch (e) {}
  function markSeen(n) { seen.add(n.id); try { localStorage.setItem('deck-seen', JSON.stringify([...seen])); } catch (e) {} }
  const expanded = new Set();
  const lines = [];               // every rendered item, accordion and flyout, for repainting states
  const casesNode = byId['cases'];
  const introGroup = { id: 'intro', label: 'Intro', group: true, kids: root.kids.filter(k => k !== casesNode) };
  const menuKids = nd => nd === root ? [] : nd.kids;
  const tierOf = nd => nd === root || nd.group ? 0 : nd.depth - 1;   // visual level in the menu
  const ACCORDION = 2;            // tiers 0 and 1 unfold in the panel; deeper items with children open flyouts

  function item(nd, tier) {
    const li = document.createElement('li');
    li.dataset.id = nd.id;
    li.style.setProperty('--t', tier);
    const line = document.createElement('div');
    line.className = 'line';
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'go'; b.textContent = nd.label;
    if (nd.group) b.addEventListener('click', () => toggle(nd));
    else b.addEventListener('click', () => { setOpen(false); go(nd, { forward: nd.order > current.order }); });
    line.appendChild(b);
    li.appendChild(line);
    lines.push({ nd, li });
    return { li, line };
  }
  function toggle(nd) { expanded.has(nd.id) ? expanded.delete(nd.id) : expanded.add(nd.id); closeFlys(0); paint(); }

  function build(list, tier) {
    const ul = document.createElement('ul');
    ul.className = 'lvl';
    ul.style.setProperty('--d', tier);
    list.forEach(nd => {
      const { li, line } = item(nd, tier);
      const kids = menuKids(nd);
      if (kids.length && tier < ACCORDION) {
        const tg = document.createElement('button');
        tg.type = 'button'; tg.className = 'tg';
        tg.setAttribute('aria-label', 'Show ' + nd.label + ' slides');
        tg.addEventListener('click', () => toggle(nd));
        line.appendChild(tg);
        li.appendChild(build(kids, tier + 1));
      } else if (kids.length) {
        addFlyTrigger(nd, li, line, 0);
      } else {
        line.addEventListener('mouseenter', () => { if (tier >= ACCORDION) closeFlys(0); });
      }
      ul.appendChild(li);
    });
    return ul;
  }

  // flyouts
  const flys = [];
  let flyT = null;
  function addFlyTrigger(nd, li, line, level) {
    li.classList.add('has-fly');
    const tg = document.createElement('button');
    tg.type = 'button'; tg.className = 'ft';
    tg.setAttribute('aria-label', 'Show ' + nd.label + ' slides');
    tg.setAttribute('aria-haspopup', 'true');
    tg.addEventListener('click', () => { clearTimeout(flyT); openFly(nd, line, level); const f = flys[level]; if (f) f.querySelector('.go').focus(); });
    line.appendChild(tg);
    line.addEventListener('mouseenter', () => { clearTimeout(flyT); flyT = setTimeout(() => openFly(nd, line, level), 140); });
    line.addEventListener('mouseleave', () => clearTimeout(flyT));
  }
  function closeFlys(from) {
    while (flys.length > from) {
      const f = flys.pop();
      f._anchor.classList.remove('flyopen');
      for (let i = lines.length - 1; i >= 0; i--) if (f.contains(lines[i].li)) lines.splice(i, 1);
      f.remove();
    }
  }
  function openFly(nd, anchor, level) {
    if (flys[level] && flys[level]._node === nd) return;
    closeFlys(level);
    const ul = document.createElement('ul');
    ul.className = 'fly';
    ul.style.setProperty('--d', tierOf(nd) + 1);
    ul._node = nd; ul._anchor = anchor;
    ul.setAttribute('aria-label', nd.label);
    nd.kids.forEach(k => {
      const { li, line } = item(k, tierOf(k));
      if (k.kids.length) addFlyTrigger(k, li, line, level + 1);
      else line.addEventListener('mouseenter', () => closeFlys(level + 1));
      ul.appendChild(li);
    });
    flyLayer.appendChild(ul);
    flys.push(ul);
    anchor.classList.add('flyopen');
    // place it beside its anchor, in stage pixels
    const sr = stage.getBoundingClientRect(), k = sr.width / W;
    const ar = anchor.getBoundingClientRect();
    const left = (ar.right - sr.left) / k;
    const h = ul.offsetHeight;
    let top = (ar.top - sr.top) / k;
    top = Math.max(16, Math.min(top, H - h - 16));
    ul.style.left = left + 'px';
    ul.style.top = top + 'px';
    paint();
  }

  tree.appendChild(build([root, introGroup, casesNode], 0));
  panel.addEventListener('scroll', () => closeFlys(0), { passive: true });

  function paint() {
    const path = new Set(chain(current).map(n => n.id));
    if (introGroup.kids.includes(current)) path.add('intro');
    path.delete('home'); if (current === root) path.add('home');
    lines.forEach(({ nd, li }) => {
      li.classList.toggle('open', expanded.has(nd.id));
      li.classList.toggle('onpath', path.has(nd.id));
      li.classList.toggle('here', nd === current);
      li.classList.toggle('seen', seen.has(nd.id));
      const tg = li.querySelector(':scope > .line > .tg');
      if (tg) tg.setAttribute('aria-expanded', expanded.has(nd.id));
      const b = li.querySelector(':scope > .line > .go');
      if (nd === current) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current');
    });
  }
  function updateNav(n) {
    if (introGroup.kids.includes(n)) expanded.add('intro');
    chain(n).forEach(x => { if (x !== root && tierOf(x) < ACCORDION) expanded.add(x.id); });   // current path stays unfolded
    paint();
  }
  function setOpen(o) {
    nav.classList.toggle('open', o);
    mapBtn.setAttribute('aria-expanded', o);
    if (o) {
      paint();
      // show where we are: the deepest accordion line on the current path
      const onpath = [...tree.querySelectorAll('li.onpath > .line')];
      const last = onpath[onpath.length - 1];
      if (last) last.scrollIntoView({ block: 'center' });
    } else closeFlys(0);
  }
  mapBtn.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
  document.addEventListener('pointerdown', e => { if (nav.classList.contains('open') && !nav.contains(e.target)) setOpen(false); });
  function closeNav() { setOpen(false); }
  function fillRows() { paint(); }

  /* ---------- settings ---------- */
  const setBtn = document.getElementById('settings-btn');
  const setPanel = document.getElementById('settings');
  function saveCfg() { try { localStorage.setItem('deck-settings', JSON.stringify(cfg)); } catch (e) {} }
  function syncCfg() {
    setPanel.querySelectorAll('[data-k]').forEach(inp => {
      const k = inp.dataset.k;
      if (inp.type === 'checkbox') inp.checked = !!cfg[k]; else inp.value = cfg[k];
      const out = setPanel.querySelector('output[for="' + inp.id + '"]');
      if (out) out.textContent = k === 'speed' ? cfg[k].toFixed(2) + '×' : k === 'settle' ? (cfg[k] / 1000).toFixed(1) + ' s' : k === 'ease' ? ['', 'Linear', 'Soft', 'Smooth', 'Strong', 'Extra'][Math.round(cfg[k])] || cfg[k] : '';
    });
  }
  setPanel.querySelectorAll('[data-k]').forEach(inp => inp.addEventListener('input', () => {
    cfg[inp.dataset.k] = inp.type === 'checkbox' ? inp.checked : parseFloat(inp.value);
    syncCfg(); saveCfg();
  }));
  setPanel.querySelector('.reset').addEventListener('click', () => { Object.assign(cfg, DEFAULTS); syncCfg(); saveCfg(); });
  setPanel.querySelector('.clear-seen').addEventListener('click', () => { seen.clear(); markSeen(current); fillRows(0); });
  function setSettings(o) { if (!o) setBtn.blur(); setPanel.classList.toggle('open', o); setBtn.setAttribute('aria-expanded', o); setBtn.classList.toggle('on', o); }
  setBtn.addEventListener('click', () => setSettings(!setPanel.classList.contains('open')));
  document.addEventListener('pointerdown', e => { if (setPanel.classList.contains('open') && !setPanel.contains(e.target) && !setBtn.contains(e.target)) setSettings(false); });
  syncCfg();

  /* ---------- input ---------- */
  document.addEventListener('keydown', e => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (setPanel.contains(document.activeElement) && e.key !== 'Escape') return;
    const inNav = nav.classList.contains('open');
    switch (e.key) {
      case 'ArrowRight': case 'ArrowDown': case 'PageDown': case ' ':
        if (inNav && e.key !== 'PageDown') return;
        e.preventDefault(); next(); break;
      case 'ArrowLeft': case 'ArrowUp': case 'PageUp': case 'Backspace':
        if (inNav && e.key !== 'PageUp') return;
        e.preventDefault(); prev(); break;
      case 'Escape':
        if (setPanel.classList.contains('open')) setSettings(false);
        else if (flys.length) closeFlys(flys.length - 1);
        else if (nav.classList.contains('open')) { closeNav(); mapBtn.focus(); }
        else up();
        break;
      case 'Home': e.preventDefault(); go(root, {}); break;
      case 'End': e.preventDefault(); go(nodes[nodes.length - 1], { forward: true }); break;
      case 'm': case 'M': setOpen(!nav.classList.contains('open')); break;
    }
  });
  let tx = null, ty = null;
  stage.addEventListener('touchstart', e => { if (nav.contains(e.target)) return; tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, { passive: true });
  stage.addEventListener('touchend', e => {
    if (tx === null) return;
    const dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty;
    tx = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.3) (dx < 0 ? next : prev)();
  }, { passive: true });

  /* ---------- fit stage to window ---------- */
  function fit() {
    const s = Math.min(window.innerWidth / W, window.innerHeight / H);
    stage.style.transform = `translate(-50%,-50%) scale(${s})`;
  }
  window.addEventListener('resize', fit);
  fit();

  /* ---------- start ---------- */
  const start = byId[decodeURIComponent(location.hash.slice(1))] || root;
  current = start;
  cam = camFor(start);
  setBg(start);
  onArrive(start, null, { forward: start === root });
  render();
  requestAnimationFrame(() => afterArrive(start, { forward: start === root }));
  window.addEventListener('hashchange', () => {
    const n = byId[decodeURIComponent(location.hash.slice(1))];
    if (n && n !== current) go(n, { forward: n.order > current.order });
  });
  // warm the cache for the rest of the deck once the first frame is up
  window.addEventListener('load', () => {
    let i = 0;
    (function warm() {
      const batch = frames.slice(i, i + 6); i += 6;
      batch.forEach(f => f.el.querySelectorAll('img[data-src]').forEach(img => { const p = new Image(); p.src = img.dataset.src; }));
      if (i < frames.length) setTimeout(warm, 120);
    })();
  });

  window.__deck = { go: id => go(byId[id], { instant: true }), byId, nodes, next, prev, get current() { return current.id; } };
})();
