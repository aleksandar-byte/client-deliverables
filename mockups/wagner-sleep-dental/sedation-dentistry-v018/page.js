document.documentElement.classList.add("js");
const toggle = document.querySelector(".menu-toggle");
const menu = document.querySelector("#site-nav");
function closeMenu() { menu.classList.remove("is-open"); toggle.setAttribute("aria-expanded", "false"); }
toggle.addEventListener("click", () => { const open = toggle.getAttribute("aria-expanded") !== "true"; menu.classList.toggle("is-open", open); toggle.setAttribute("aria-expanded", String(open)); });
document.addEventListener("keydown", e => { if(e.key === "Escape" && menu.classList.contains("is-open")) { closeMenu(); toggle.focus(); } });
menu.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMenu));
const smallScreen = window.matchMedia("(max-width: 767px)");
const startPanel = document.querySelector(".start-panel");
function placeStartPath() {
  const parent = document.querySelector(smallScreen.matches ? ".mobile-start-slot" : ".hero-grid");
  parent.append(startPanel);
}
placeStartPath();
smallScreen.addEventListener("change", placeStartPath);
