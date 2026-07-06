// Mobile menu toggle + subtle scroll reveals (Dark Water).
(function () {
  var menu = document.getElementById("mobilenav");
  var openBtn = document.querySelector("[data-nav-open]");
  if (menu && openBtn) {
    var closeBtn = menu.querySelector("[data-nav-close]");
    function setOpen(open) {
      menu.hidden = !open;
      openBtn.setAttribute("aria-expanded", String(open));
      document.documentElement.style.overflow = open ? "hidden" : "";
      if (open && closeBtn) closeBtn.focus();
      if (!open) openBtn.focus();
    }
    openBtn.addEventListener("click", function () { setOpen(true); });
    if (closeBtn) closeBtn.addEventListener("click", function () { setOpen(false); });
    menu.addEventListener("click", function (e) { if (e.target.tagName === "A") setOpen(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !menu.hidden) setOpen(false); });
  }

  // Scroll reveals — no-ops for reduced-motion users (CSS gates the initial state).
  var rv = document.querySelectorAll(".rv");
  if (rv.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    rv.forEach(function (el) { io.observe(el); });
  } else {
    rv.forEach(function (el) { el.classList.add("in"); });
  }
})();
