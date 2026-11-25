/* Depth modal: "summary on the page, depth in slides".
   Markup: a button.depth__open[data-depth="<dialog id>"] opens dialog.depth,
   which holds .depth__slide sections, .depth__prev / .depth__next and .depth__count.
   Native <dialog> makes the page inert and closes on Esc; this script adds
   slides, arrow keys, swipe, backdrop click and focus return. */
(function () {
  document.querySelectorAll('.depth__open[data-depth]').forEach(function (btn) {
    var dlg = document.getElementById(btn.getAttribute('data-depth'));
    if (!dlg || typeof dlg.showModal !== 'function') return;
    var slides = Array.prototype.slice.call(dlg.querySelectorAll('.depth__slide'));
    var prev = dlg.querySelector('.depth__prev');
    var next = dlg.querySelector('.depth__next');
    var count = dlg.querySelector('.depth__count');
    var close = dlg.querySelector('.depth__close');
    var box = dlg.querySelector('.depth__slides');
    var i = 0;

    slides.forEach(function (s, n) {
      s.setAttribute('role', 'group');
      s.setAttribute('aria-roledescription', 'slide');
      s.setAttribute('aria-label', (n + 1) + ' of ' + slides.length);
    });

    function show(n) {
      var had = document.activeElement;
      i = Math.max(0, Math.min(slides.length - 1, n));
      slides.forEach(function (s, k) { s.hidden = k !== i; });
      if (count) count.textContent = (i + 1) + ' / ' + slides.length;
      if (prev) prev.disabled = i === 0;
      if (next) next.disabled = i === slides.length - 1;
      if (box) box.scrollTop = 0;
      // keep focus inside the dialog when the focused arrow becomes disabled
      if (had && had.disabled) { (had === next ? prev : next).focus(); }
    }

    btn.addEventListener('click', function () {
      show(0);
      dlg.showModal();
      document.documentElement.classList.add('depth-lock');
    });
    dlg.addEventListener('close', function () {
      document.documentElement.classList.remove('depth-lock');
      btn.focus();
    });
    if (close) close.addEventListener('click', function () { dlg.close(); });
    if (prev) prev.addEventListener('click', function () { show(i - 1); });
    if (next) next.addEventListener('click', function () { show(i + 1); });
    // click on the backdrop closes
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); show(i + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); show(i - 1); }
    });
    // swipe
    var x0 = null, y0 = null;
    if (box) {
      box.addEventListener('pointerdown', function (e) { x0 = e.clientX; y0 = e.clientY; });
      box.addEventListener('pointerup', function (e) {
        if (x0 === null) return;
        var dx = e.clientX - x0, dy = e.clientY - y0; x0 = null;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) show(i + (dx < 0 ? 1 : -1));
      });
    }
    show(0);
  });
})();
