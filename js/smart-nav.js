/* D Creative Thinking · smart breadcrumb for case studies
   Remembers where the visitor came from (agency site or portfolio) and points
   the case study breadcrumb back there. Direct visits get the agency home plus
   a Portfolio link, so both ways back are always available. */
(function () {
  "use strict";
  var from = null;
  try { from = sessionStorage.getItem("dctFrom"); } catch (e) {}
  if (!from && document.referrer) {
    try {
      var ref = new URL(document.referrer);
      if (ref.host === location.host) from = /^\/portfolio\//.test(ref.pathname) ? "portfolio" : (/^\/usecases\//.test(ref.pathname) ? null : "agency");
    } catch (e) {}
  }
  var home = document.querySelector('a[href="../../portfolio/index.html"]');
  var mid = document.querySelector('a[href="../../portfolio/index.html#work"]');
  if (!home || !mid) return;
  home.href = "../../";
  home.textContent = "Home";
  if (from === "agency") {
    mid.href = "../../#work";
    mid.textContent = "Work";
  } else {
    mid.href = "../../portfolio/index.html#work";
    mid.textContent = "Portfolio";
  }
})();
