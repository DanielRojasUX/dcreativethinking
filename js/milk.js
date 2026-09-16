/* ==========================================================================
   .milk  ::  view more/less, bio modal, skill detail tooltip
   ========================================================================== */

(function () {
  'use strict';

  var milk = document.querySelector('.milk');
  if (!milk) return;

  /* ---- view more / view less -------------------------------------------- */
  var moreToggle = milk.querySelector('.js-milk-more');
  var extraSkills = milk.querySelectorAll('.milk__skill--extra');

  if (moreToggle && extraSkills.length) {
    moreToggle.addEventListener('click', function () {
      var expanded = moreToggle.getAttribute('aria-expanded') === 'true';
      var next = !expanded;

      extraSkills.forEach(function (row) {
        row.hidden = !next;
      });

      moreToggle.setAttribute('aria-expanded', String(next));
      moreToggle.textContent = next ? 'view less' : 'view more';
    });
  }

  /* ---- bio modal ---------------------------------------------------------
     "show more" opens the full bio in a modal — the card no longer expands
     or scrolls in place. */
  var bioModal = milk.querySelector('.js-milk-bio-modal');
  var bioOpen = milk.querySelector('.js-milk-bio-open');
  var bioClosers = milk.querySelectorAll('.js-milk-bio-close');
  var bioLastFocused = null;

  function openBioModal() {
    if (!bioModal) return;
    bioLastFocused = document.activeElement;
    bioModal.hidden = false;
    document.addEventListener('keydown', onBioKeydown);
    var closeBtn = bioModal.querySelector('.js-milk-bio-close');
    if (closeBtn) closeBtn.focus();
  }

  function closeBioModal() {
    if (!bioModal || bioModal.hidden) return;
    bioModal.hidden = true;
    document.removeEventListener('keydown', onBioKeydown);
    if (bioLastFocused) bioLastFocused.focus();
  }

  function onBioKeydown(event) {
    if (event.key === 'Escape') closeBioModal();
  }

  if (bioOpen) bioOpen.addEventListener('click', openBioModal);
  bioClosers.forEach(function (el) {
    el.addEventListener('click', closeBioModal);
  });

  /* ---- skill detail tooltip ------------------------------------------------
     Click a row to open it, above the row (user is scrolling down, so a
     tooltip opening below can land off-screen). Mouse-out (rollout) closes
     it; Escape and blur too, since rollout has no keyboard/touch equivalent. */
  var card = milk.querySelector('.milk__card');
  var tooltip = milk.querySelector('.js-milk-tooltip');
  var tooltipBody = milk.querySelector('.js-milk-tooltip-body');
  var skillTriggers = milk.querySelectorAll('.js-milk-skill-trigger');
  var activeTrigger = null;

  function showTooltip(trigger) {
    if (!tooltip || !tooltipBody || !card) return;

    tooltipBody.textContent = trigger.getAttribute('data-skill-detail') || '';
    tooltip.hidden = false;
    var top = trigger.offsetTop - tooltip.offsetHeight - 6;
    tooltip.style.top = Math.max(0, top) + 'px';
    tooltip.style.left = trigger.offsetLeft + 'px';
    activeTrigger = trigger;
  }

  function hideTooltip() {
    if (!tooltip || tooltip.hidden) return;
    tooltip.hidden = true;
    activeTrigger = null;
  }

  skillTriggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      if (activeTrigger === trigger) {
        hideTooltip();
      } else {
        showTooltip(trigger);
      }
    });

    trigger.addEventListener('mouseleave', hideTooltip);
    trigger.addEventListener('blur', hideTooltip);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') hideTooltip();
  });

}());
