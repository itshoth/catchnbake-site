// ============================================================
// APP STORE URL. The app is LIVE. Badges are hard-coded in the
// HTML now; this constant is kept as the single source of truth
// so any straggler [data-app-store] anchor still gets the link.
// ============================================================
var APP_STORE_URL = "https://apps.apple.com/us/app/catch-n-bake/id6762584046";

(function () {
  if (!APP_STORE_URL) return;
  document.querySelectorAll("[data-app-store]").forEach(function (a) {
    a.href = APP_STORE_URL;
    a.hidden = false;
  });
  document.querySelectorAll("[data-store-soon]").forEach(function (s) {
    s.remove();
  });
})();
