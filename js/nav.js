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

  // Dropdown: hover-intent (280ms close delay) + click toggle + Escape + outside-click.
  document.querySelectorAll(".drop").forEach(function (drop) {
    var btn = drop.querySelector("button");
    if (!btn) return;
    var timer;
    function open() { clearTimeout(timer); drop.classList.add("open"); btn.setAttribute("aria-expanded", "true"); }
    function close() { clearTimeout(timer); drop.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); }
    btn.addEventListener("click", function () { drop.classList.contains("open") ? close() : open(); });
    drop.addEventListener("pointerenter", function (e) { if (e.pointerType === "mouse") open(); });
    drop.addEventListener("pointerleave", function (e) { if (e.pointerType !== "mouse") return; clearTimeout(timer); timer = setTimeout(close, 280); });
    drop.addEventListener("keydown", function (e) { if (e.key === "Escape") { close(); btn.focus(); } });
    document.addEventListener("click", function (e) { if (!drop.contains(e.target)) close(); });
  });

  // Scroll reveals: no-ops for reduced-motion users (CSS gates the initial state).
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
