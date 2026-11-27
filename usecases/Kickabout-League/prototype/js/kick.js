/* Kickabout League: shared runtime for every persona prototype */
{
const KL = window.KL;
const P = {
  home:'M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z',
  table:'M4 5h16M4 12h16M4 19h16M9 5v14',
  team:'M16 19v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 17.5V19M10 10.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6M20 19v-1.5a3.5 3.5 0 0 0-2.6-3.4M15.5 4.6a3 3 0 0 1 0 5.8',
  user:'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M5 20a7 7 0 0 1 14 0',
  bell:'M18 8a6 6 0 0 0-12 0c0 7-3 8.5-3 8.5h18S18 15 18 8M13.7 20a2 2 0 0 1-3.4 0',
  back:'M15 5l-7 7 7 7', next:'M9 5l7 7-7 7', down:'M6 9l6 6 6-6', x:'M6 6l12 12M18 6 6 18',
  check:'M5 12.5l4.5 4.5L19 7', plus:'M12 5v14M5 12h14', lock:'M7 11V8a5 5 0 0 1 10 0v3M5 11h14v10H5z',
  whistle:'M3 13a5 5 0 1 0 9.6 2H20l1-4h-9.6A5 5 0 0 0 3 13M15 7V4M18 8l2-2',
  mic:'M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3M5 11a7 7 0 0 0 14 0M12 18v3',
  ball:'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18M12 7.5l4 3-1.5 4.5h-5L8 10.5zM12 7.5V3.2M16 10.5l4.3-1.4M14.5 15l2.7 3.7M9.5 15l-2.7 3.7M8 10.5 3.7 9.1',
  cash:'M3 7h18v10H3zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6M6 10v4M18 10v4',
  wallet:'M4 7a2 2 0 0 1 2-2h12v4M4 7v10a2 2 0 0 0 2 2h14V9H6a2 2 0 0 1-2-2M16 14h.01',
  cal:'M4 6h16v14H4zM4 10h16M9 3v5M15 3v5', clock:'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18M12 7v5l3 2',
  gear:'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-2.7-1.1l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.6 1.6 0 0 0 3.6 15H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.1-2.7l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.6 1.6 0 0 0 9.6 4V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0 1.1 2.7h.1a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.4.8',
  shield:'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z', trophy:'M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0zM17 6h3v2a3 3 0 0 1-3 3M7 6H4v2a3 3 0 0 0 3 3',
  chart:'M4 20V10M10 20V4M16 20v-7M22 20H2', flag:'M5 21V4h11l-1.5 4L16 12H5', swap:'M7 4 3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7',
  pin:'M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12M12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4',
  alert:'M12 9v4M12 17h.01M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0',
  edit:'M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16zM13.5 6.5l4 4', camera:'M4 8h3l2-3h6l2 3h3v12H4zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8',
  file:'M6 3h8l5 5v13H6zM14 3v5h5M9 13h6M9 17h6', share:'M12 3v13M7 8l5-5 5 5M5 14v6h14v-6', search:'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16M21 21l-4.3-4.3',
  logout:'M15 4h4v16h-4M10 17l-5-5 5-5M5 12h11', grid:'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z', sign:'M3 17c3 0 4-6 7-6s1 6 4 6 3-3 4-3M3 21h18',
  arrow:'M7 17 17 7M8 7h9v9', stop:'M6 6h12v12H6z', play:'M7 4v16l13-8z', pause:'M7 4h3v16H7zM14 4h3v16h-3z', drag:'M9 5h.01M9 12h.01M9 19h.01M15 5h.01M15 12h.01M15 19h.01',
  card:'M7 3h10v18H7z', bolt:'M13 2 4 14h7l-1 8 9-12h-7z', dollar:'M12 2v20M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6'
};
KL.icon = (n, c = '') => `<svg class="i ${c}" viewBox="0 0 24 24" aria-hidden="true"><path d="${P[n] || ''}"/></svg>`;
/* Fixture row: home, vs, away on a fixed grid so "vs" lines up on every row.
   Long names are cut with an ellipsis; tapping a cut name shows it whole. */
KL.fx = (h, a, sz = 20) => {
  const T = KL.teams, side = (k) => `<span class="fx2__t" data-tip="${T[k].name}" title="${T[k].name}">${KL.crest(k, sz)}<span class="fx2__n">${T[k].short}</span></span>`;
  return `<span class="fx2">${side(h)}<span class="fx2__vs">vs</span>${side(a)}</span>`;
};
KL.crest = (k, s = 30) => {
  const t = KL.teams[k]; const ini = t.short.slice(0, 2).toUpperCase();
  return `<svg class="crest" width="${s}" height="${s * 1.12}" viewBox="0 0 40 45" aria-label="${t.name}"><path d="M20 2 37 8v13c0 11-7.6 18.5-17 22C10.6 39.5 3 32 3 21V8z" fill="${t.color}"/><path d="M20 2 37 8v13c0 11-7.6 18.5-17 22z" fill="rgba(0,0,0,.16)"/><text x="20" y="27" text-anchor="middle" font-family="Poppins,sans-serif" font-weight="700" font-size="13" fill="#0f0f0f">${ini}</text></svg>`;
};
KL.ini = (n) => n.split(' ').map(w => w[0]).slice(0, 2).join('');
KL.money = (v) => '$' + v.toLocaleString('en-US');

/* ---------- app shell ---------- */
const A = KL.app = { stack: [], acts: {}, on: {}, cur: null };
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
KL.$ = $; KL.$$ = $$;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

A.init = (opt) => {
  A.root = $(opt.root || '.app'); A.opt = opt;
  const scr = $$(opt.sel || '.scr', A.root);
  scr.forEach(s => $$('.st', s).forEach((e, i) => { e.style.setProperty('--i', i); e.style.setProperty('--j', (i * 37 + 11) % 52); }));
  buildRail(scr);
  const h = location.hash.slice(1), start = (h && $('#' + CSS.escape(h), A.root) && !opt.noHash) ? h : opt.start;
  A.go(start, { instant: true });
  addEventListener('hashchange', () => { const id = location.hash.slice(1); if (id && id !== A.cur && $('#' + CSS.escape(id), A.root)) A.go(id); });
  document.addEventListener('click', onTap);
  document.addEventListener('pointerdown', (e) => { const t = e.target.closest('.tap'); if (t) t.classList.remove('is-pop'); });
  clock();
};

function buildRail(scr) {
  const list = $('.rail__list'); if (!list) return;
  list.innerHTML = scr.filter(s => s.dataset.code).map(s => `<button class="rail__item" data-jump="${s.id}"><b>${s.dataset.code}</b>${s.dataset.name}</button>`).join('');
  list.addEventListener('click', (e) => { const b = e.target.closest('[data-jump]'); if (b) { A.stack = []; A.go(b.dataset.jump); } });
}

A.go = (id, o = {}) => {
  const next = $('#' + CSS.escape(id), A.root); if (!next || id === A.cur) return;
  const prev = A.cur && $('#' + CSS.escape(A.cur), A.root);
  /* direction: back goes right, forward goes left, tabs follow their order */
  let dx = o.dir || (o.back ? -1 : 1);
  if (!o.dir && prev && prev.dataset.tab && next.dataset.tab) {
    const order = $$('.tabbar [data-tabgo]', A.root).map(b => b.dataset.tabgo);
    dx = order.indexOf(next.dataset.tab) < order.indexOf(prev.dataset.tab) ? -1 : 1;
  }
  A.root.style.setProperty('--dx', dx);
  if (A.cur && !o.back && !o.replace) A.stack.push(A.cur);
  const instant = o.instant || reduce;
  if (prev) {
    prev.classList.remove('is-on', 'is-back', 'is-instant');
    if (!instant) { prev.classList.add('is-out'); clearTimeout(prev._t); prev._t = setTimeout(() => prev.classList.remove('is-out'), 560); }
  }
  next.classList.remove('is-out'); clearTimeout(next._t);
  next.classList.toggle('is-instant', !!instant);
  /* restart the step animations every visit */
  next.classList.remove('is-on'); void next.offsetWidth; next.classList.add('is-on');
  if (!o.keepScroll) next.scrollTop = 0;
  const g = $(':scope > .glow', A.root); if (g && !instant) { g.classList.remove('is-shift'); void g.offsetWidth; g.classList.add('is-shift'); }
  $$('.is-dim,.is-hi', A.root).forEach(e => e.classList.remove('is-dim', 'is-hi'));
  A.cur = id;
  if (!A.opt.noHash) try { history.replaceState(null, '', '#' + id); } catch (e) {}
  $$('.rail__item').forEach(b => b.classList.toggle('is-on', b.dataset.jump === id));
  const tab = next.dataset.tab, bar = $('.tabbar', A.root);
  if (bar) { bar.classList.toggle('is-hidden', !tab); $$('button', bar).forEach(b => b.classList.toggle('is-on', b.dataset.tabgo === tab)); }
  $$('[data-count]', next).forEach(el => setTimeout(() => countUp(el), instant ? 0 : 420));
  $$('.bar i[data-w],.chart i[data-h]', next).forEach(b => { b.style.width = b.style.height = ''; setTimeout(() => { if (b.dataset.w) b.style.width = b.dataset.w + '%'; if (b.dataset.h) b.style.height = b.dataset.h + '%'; }, instant ? 30 : 520); });
  requestAnimationFrame(() => $$('.lq-host', next).forEach(h => KL.liquid.snap(h)));
  A.on[id] && A.on[id](next, o);
};
A.back = () => { const id = A.stack.pop(); if (id) A.go(id, { back: true }); };

/* tap: spotlight the touched box, blur its siblings, pop with stretch, then act */
function onTap(e) {
  const t = e.target.closest('.tap'); if (!t || !A.root || !A.root.contains(t) && !t.closest('.view')) return;
  if (t.closest('.sheet') && !t.dataset.go && !t.dataset.act && !t.dataset.back) { pop(t); return; }
  const act = () => {
    if (t.dataset.back !== undefined) return A.back();
    if (t.dataset.tabgo) { A.stack = []; return A.go(t.dataset.tabgo); }
    if (t.dataset.act && A.acts[t.dataset.act]) A.acts[t.dataset.act](t, e);
    if (t.dataset.go) A.go(t.dataset.go);
  };
  pop(t);
  const leaving = t.dataset.go || t.dataset.back !== undefined || t.dataset.tabgo;
  if (leaving && !reduce && !t.closest('.tabbar')) {
    const grp = t.closest('.fx') || t.parentElement;
    $$('.tap', grp).forEach(s => { if (s !== t && !s.contains(t) && !t.contains(s)) s.classList.add('is-dim'); });
    t.classList.add('is-hi');
    setTimeout(act, 220);
  } else act();
}
function pop(t) { t.classList.remove('is-pop'); void t.offsetWidth; t.classList.add('is-pop'); }
KL.pop = pop;

function countUp(el) {
  const to = parseFloat(el.dataset.count), pre = el.dataset.pre || '', dec = (el.dataset.count.split('.')[1] || '').length;
  if (reduce) { el.textContent = pre + to.toLocaleString('en-US', { minimumFractionDigits: dec }); return; }
  const t0 = performance.now(), d = 900;
  const f = (t) => { const k = Math.min(1, (t - t0) / d), v = to * (1 - Math.pow(1 - k, 3)); el.textContent = pre + v.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec }); if (k < 1) requestAnimationFrame(f); };
  requestAnimationFrame(f);
}
KL.countUp = countUp;

/* liquid indicator: one pill that stretches to the new item, then pulls in and settles */
const LQ_SEL = '.seg,.tabbar,.side';
const L = KL.liquid = {};
const box = (h, b) => ({ x: b.offsetLeft, y: b.offsetTop, w: b.offsetWidth, h: b.offsetHeight });
L.ensure = (h) => { if (h._lq) return h._lq; const q = document.createElement('span'); q.className = 'lq'; h.prepend(q); h.classList.add('lq-host'); h._lq = q; L.snap(h); return q; };
L.place = (q, r) => { q.style.left = r.x + 'px'; q.style.top = r.y + 'px'; q.style.width = r.w + 'px'; q.style.height = r.h + 'px'; };
L.snap = (h) => { const q = h._lq, b = $(':scope > button.is-on', h); if (!q) return; q.style.opacity = b ? 1 : 0; if (b) { L.place(q, box(h, b)); h._at = b; } };
L.move = (h, b) => {
  const q = L.ensure(h), from = h._at && h._at.isConnected ? box(h, h._at) : null, to = box(h, b); h._at = b; q.style.opacity = 1;
  if (!from || reduce || !q.animate || (from.x === to.x && from.y === to.y)) { L.place(q, to); return; }
  const x = Math.min(from.x, to.x), y = Math.min(from.y, to.y), X = Math.max(from.x + from.w, to.x + to.w), Y = Math.max(from.y + from.h, to.y + to.h);
  const horiz = Math.abs(to.x - from.x) >= Math.abs(to.y - from.y);
  const squeeze = horiz ? { y: from.y + from.h * .09, h: from.h * .82 } : { x: from.x + from.w * .04, w: from.w * .92 };
  const over = horiz ? { x: to.x + (to.x > from.x ? 6 : -6), w: to.w - 4 } : { y: to.y + (to.y > from.y ? 4 : -4), h: to.h - 2 };
  const k = (r) => ({ left: r.x + 'px', top: r.y + 'px', width: r.w + 'px', height: r.h + 'px' });
  q.animate([k(from), { ...k({ x, y, w: X - x, h: Y - y, ...squeeze }), offset: .42 }, { ...k({ ...to, ...over }), offset: .72 }, k(to)], { duration: 620, easing: 'cubic-bezier(.3,.7,.2,1)' });
  L.place(q, to);
};
new MutationObserver((ms) => {
  for (const m of ms) {
    if (m.type === 'attributes') { const b = m.target, h = b.parentElement; if (b.tagName === 'BUTTON' && b.classList.contains('is-on') && h && h.matches(LQ_SEL) && h._at !== b) L.move(h, b); }
    else m.addedNodes.forEach(n => { if (n.nodeType !== 1) return; [n, ...n.querySelectorAll(LQ_SEL)].filter(e => e.matches && e.matches(LQ_SEL)).forEach(L.ensure); });
  }
}).observe(document.documentElement, { subtree: true, childList: true, attributes: true, attributeFilter: ['class'] });
addEventListener('DOMContentLoaded', () => $$(LQ_SEL).forEach(L.ensure));
$$(LQ_SEL).forEach(L.ensure);
addEventListener('resize', () => $$('.lq-host').forEach(L.snap));

/* sheet and toast */
KL.sheet = (html, onOpen) => {
  KL.closeSheet(true);
  const v = document.createElement('div'); v.className = 'veil';
  const s = document.createElement('div'); s.className = 'sheet'; s.setAttribute('role', 'dialog'); s.setAttribute('aria-modal', 'true');
  s.innerHTML = '<div class="sheet__grab"></div>' + html;
  A.root.append(v, s); requestAnimationFrame(() => { v.classList.add('is-on'); s.classList.add('is-on'); });
  v.addEventListener('click', () => KL.closeSheet());
  s.addEventListener('click', (e) => { if (e.target.closest('[data-close]')) { pop(e.target.closest('[data-close]')); setTimeout(KL.closeSheet, 160); } });
  onOpen && onOpen(s); return s;
};
KL.closeSheet = (now) => {
  const v = $('.veil', A.root), s = $('.sheet', A.root); if (!s) return;
  if (now) { v && v.remove(); s.remove(); return; }
  v && v.classList.remove('is-on'); s.classList.remove('is-on'); setTimeout(() => { v && v.remove(); s.remove(); }, 420);
};
let tt;
KL.toast = (msg, ic = 'check') => {
  let t = $('.toast', A.root); if (!t) { t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); A.root.append(t); }
  t.innerHTML = KL.icon(ic) + msg; t.classList.remove('is-on'); void t.offsetWidth; t.classList.add('is-on');
  clearTimeout(tt); tt = setTimeout(() => t.classList.remove('is-on'), 2600);
};
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') KL.closeSheet(); });

/* slide to confirm, with a tap alternative */
KL.slider = (el, onDone) => {
  const k = $('.slide__k', el), fill = $('.slide__fill', el), txt = $('.slide__t', el); let x0 = 0, dx = 0, drag = false, armed = false;
  const max = () => el.clientWidth - k.offsetWidth - 10;
  const set = (v) => { k.style.left = (5 + v) + 'px'; fill.style.width = (v + 66) + 'px'; };
  const done = () => { el.classList.add('is-done'); set(max()); txt.textContent = 'Done'; setTimeout(onDone, 380); };
  k.addEventListener('pointerdown', (e) => { drag = true; x0 = e.clientX; k.setPointerCapture(e.pointerId); el.classList.remove('is-done'); });
  k.addEventListener('pointermove', (e) => { if (!drag) return; dx = Math.max(0, Math.min(max(), e.clientX - x0)); set(dx); });
  k.addEventListener('pointerup', () => { if (!drag) return; drag = false; if (dx > max() * .82) done(); else { el.classList.add('is-done'); set(0); } dx = 0; });
  k.addEventListener('click', () => { if (dx) return; if (armed) done(); else { armed = true; txt.textContent = 'Tap again to confirm'; pop(k); } });
  k.setAttribute('role', 'button'); k.setAttribute('tabindex', '0'); k.setAttribute('aria-label', 'Confirm');
  k.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); done(); } });
};

function clock() {
  const s = $('.sbar__time'); if (!s) return; s.textContent = '8:34';
}

/* tooltip for cut names, and [data-fx="HAL,UNM"] placeholders */
document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-tip]'); const old = document.querySelector('.tip'); if (old) old.remove();
  if (!t) return; const n = t.querySelector('.fx2__n') || t; if (n.scrollWidth <= n.clientWidth + 1) return;
  e.stopPropagation(); e.preventDefault();
  const host = t.closest('.app') || document.body, r = t.getBoundingClientRect(), hr = host.getBoundingClientRect();
  const tip = document.createElement('span'); tip.className = 'tip'; tip.textContent = t.dataset.tip; host.appendChild(tip);
  const w = tip.offsetWidth; let x = r.left - hr.left + r.width / 2 - w / 2; x = Math.max(8, Math.min(x, hr.width - w - 8));
  tip.style.left = x + 'px'; tip.style.top = (r.top - hr.top - tip.offsetHeight - 8) + 'px';
  setTimeout(() => tip.classList.add('is-out'), 1800); setTimeout(() => tip.remove(), 2100);
}, true);
document.querySelectorAll('[data-fx]').forEach((el) => { const [h, a] = el.dataset.fx.split(','); el.innerHTML = KL.fx(h, a, +(el.dataset.sz || 20)); });
}
