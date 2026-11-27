/* Kickabout League: motion figures and prototype lightbox (same component as EMA Interaction) */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var PLAY = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M7 4v16l13-8z"/></svg>';
  var PAUSE = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';

  /* Motion figures: loop only while visible, never under reduced motion until asked, always pausable */
  /* A phone that plays in step with another (two screens of one moment): it follows its lead's play, pause and time */
  document.querySelectorAll('.vid[data-follow]').forEach(function (box) {
    var lead = document.querySelector('.vid[data-lead="' + box.dataset.follow + '"] video'), f = box.querySelector('video');
    if (!lead || !f) return;
    lead.addEventListener('play', function () { f.currentTime = lead.currentTime; var p = f.play(); if (p && p.catch) p.catch(function () {}); });
    lead.addEventListener('pause', function () { f.pause(); });
    lead.addEventListener('timeupdate', function () { if (Math.abs(f.currentTime - lead.currentTime) > 0.12) f.currentTime = lead.currentTime; });
  });

  document.querySelectorAll('.vid:not([data-follow])').forEach(function (box) {
    var v = box.querySelector('video'), b = box.querySelector('.vid__toggle');
    var wanted = !reduce;
    function paint() {
      var on = !v.paused;
      b.innerHTML = (on ? PAUSE : PLAY) + '<span>' + (on ? 'Pause' : 'Play') + '</span>';
      b.setAttribute('aria-label', (on ? 'Pause' : 'Play') + ' ' + (box.dataset.label || 'animation'));
    }
    function tryPlay() { var p = v.play(); if (p && p.catch) p.catch(function () { paint(); }); }
    v.addEventListener('play', paint); v.addEventListener('pause', paint);
    b.addEventListener('click', function () { wanted = v.paused; if (wanted) tryPlay(); else v.pause(); });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting && wanted) tryPlay(); else if (!e.isIntersecting) v.pause(); });
      }, { threshold: 0.35 }).observe(box);
    } else if (wanted) { tryPlay(); }
    paint();
  });

  /* Prototype lightbox */
  var dlg = document.getElementById('proto');
  if (!dlg || typeof dlg.showModal !== 'function') return;
  var frame = dlg.querySelector('iframe'), dev = dlg.querySelector('.proto__device'), title = dlg.querySelector('.proto__title');
  var opener = null;
  function fit() {
    if (window.innerWidth <= 640) { dev.style.transform = ''; return; }
    var s = Math.min(1, (window.innerHeight - 96) / 876, (window.innerWidth - 48) / 417);
    dev.style.transform = 'scale(' + s.toFixed(3) + ')';
  }
  function open(src, name, from) {
    opener = from; title.textContent = name;
    frame.title = name; frame.src = src;
    dlg.classList.toggle('proto--watch', /watch\.html/.test(src));
    dlg.showModal(); fit();
    dlg.querySelector('.proto__close').focus();
  }
  function close() { dlg.close(); }
  dlg.addEventListener('close', function () { frame.src = 'about:blank'; if (opener) opener.focus(); });
  dlg.querySelector('.proto__close').addEventListener('click', close);
  dlg.addEventListener('click', function (e) { if (e.target === dlg || e.target.classList.contains('proto__stage')) close(); });
  window.addEventListener('resize', function () { if (dlg.open) fit(); });
  document.querySelectorAll('[data-proto]').forEach(function (el) {
    el.addEventListener('click', function (e) { e.preventDefault(); open(el.getAttribute('data-proto'), el.getAttribute('data-proto-name'), el); });
  });
})();
