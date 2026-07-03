// ============================================================
// APP STORE URL — the ONE constant to update at launch.
// Paste the App Store link (https://apps.apple.com/app/...)
// between the quotes and every CTA on the site goes live.
// Leave empty ("") to show the honest "Coming soon" badge.
// ============================================================
var APP_STORE_URL = "";

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
