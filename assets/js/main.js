(() => {
  "use strict";
  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const navButton = document.getElementById("menuToggle");
  const nav = document.getElementById("navLinks");
  const themeMeta = document.querySelector('meta[name="theme-color"]');

  function setTheme(theme) {
    root.dataset.theme = theme;
    if (themeToggle) {
      themeToggle.textContent = theme === "dark" ? "☼" : "☾";
      themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
      themeToggle.title = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";
    }
    if (themeMeta) themeMeta.content = theme === "dark" ? "#0b1020" : "#f4f7fc";
    try { localStorage.setItem("suraj-portfolio-theme", theme); } catch (_) {}
  }
  setTheme(root.dataset.theme || "dark");
  themeToggle?.addEventListener("click", () => setTheme(root.dataset.theme === "dark" ? "light" : "dark"));

  function closeMenu() {
    nav?.classList.remove("open");
    navButton?.setAttribute("aria-expanded", "false");
    navButton?.setAttribute("aria-label", "Open navigation");
  }
  navButton?.addEventListener("click", () => {
    const open = navButton.getAttribute("aria-expanded") === "true";
    nav?.classList.toggle("open", !open);
    navButton.setAttribute("aria-expanded", String(!open));
    navButton.setAttribute("aria-label", open ? "Open navigation" : "Close navigation");
  });
  nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", event => { if (event.key === "Escape") closeMenu(); });

  const filters = [...document.querySelectorAll(".filter")];
  const cards = [...document.querySelectorAll(".project-card")];
  const projectCount = document.getElementById("projectCount");
  filters.forEach(button => button.addEventListener("click", () => {
    const key = button.dataset.filter;
    filters.forEach(item => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    let shown = 0;
    cards.forEach(card => {
      const display = key === "all" || card.dataset.category === key;
      card.hidden = !display;
      if (display) shown++;
    });
    if (projectCount) projectCount.textContent = "Showing " + shown + " project" + (shown === 1 ? "" : "s");
  }));

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -24px 0px" });
    revealItems.forEach(item => observer.observe(item));
  } else revealItems.forEach(item => item.classList.add("visible"));

  const topButton = document.getElementById("backTop");
  function updateTopButton() { topButton?.classList.toggle("visible", window.scrollY > 500); }
  window.addEventListener("scroll", updateTopButton, { passive: true });
  topButton?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  updateTopButton();
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();