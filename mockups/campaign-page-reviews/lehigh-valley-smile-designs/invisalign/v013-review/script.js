document.documentElement.classList.add("js");
(() => {
  const trigger = document.getElementById("menu-toggle");
  const menu = document.getElementById("site-menu");
  const close = document.getElementById("menu-close");
  const label = trigger.querySelector("[data-menu-label]");
  const icon = trigger.querySelector("[data-menu-icon]");
  const closeMenu = (returnFocus = false) => {
    menu.hidden = true;
    trigger.setAttribute("aria-expanded", "false");
    label.textContent = "Menu";
    icon.textContent = "+";
    if (returnFocus) trigger.focus();
  };
  trigger.addEventListener("click", () => {
    if (trigger.getAttribute("aria-expanded") === "true") closeMenu(true);
    else {
      menu.hidden = false;
      trigger.setAttribute("aria-expanded", "true");
      label.textContent = "Close";
      icon.textContent = "×";
      close.focus();
    }
  });
  close.addEventListener("click", () => closeMenu(true));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !menu.hidden) closeMenu(true);
  });
  document.addEventListener("click", event => {
    if (!menu.hidden && !menu.contains(event.target) && !trigger.contains(event.target)) closeMenu();
  });
  document.addEventListener("focusin", event => {
    if (!menu.hidden && !menu.contains(event.target) && !trigger.contains(event.target)) closeMenu();
  });
  menu.addEventListener("click", event => { if (event.target.closest("a")) closeMenu(); });
  window.matchMedia("(min-width: 861px)").addEventListener("change", event => {
    if (event.matches) closeMenu();
  });

  const schedule = {
    Monday: "9am–7pm", Tuesday: "8am–5pm", Wednesday: "8:30am–7pm",
    Thursday: "7am–5pm", Friday: "9:30am–2pm", Saturday: "8:30am–12:30pm", Sunday: "Closed",
  };
  const todayHours = (instant) => {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York", weekday: "long", day: "numeric",
    }).formatToParts(instant);
    const weekday = parts.find((part) => part.type === "weekday").value;
    const day = Number(parts.find((part) => part.type === "day").value);
    const occurrence = Math.floor((day - 1) / 7) + 1;
    return weekday === "Saturday" && ![1, 3].includes(occurrence) ? "Closed" : schedule[weekday];
  };
  const updateHours = () => {
    const text = `Today ${todayHours(new Date())}`;
    document.getElementById("today-hours").textContent = text;
    document.querySelector("#hero-hours summary").setAttribute("aria-label", `${text}. Show all office hours`);
  };
  updateHours();
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) updateHours();
  });

  // Native details stays open without JavaScript. Adapt only its initial default;
  // an explicit patient choice persists if the viewport later changes.
  const comparison = document.querySelector('[data-element="comparison-disclosure"]');
  if (comparison) {
    const narrow = window.matchMedia("(max-width: 600px)");
    let manuallyToggled = false;
    const applyDefault = () => {
      if (!manuallyToggled) comparison.open = !narrow.matches;
    };
    const summary = comparison.querySelector("summary");
    summary.addEventListener("click", () => { manuallyToggled = true; });
    summary.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") manuallyToggled = true;
    });
    narrow.addEventListener("change", applyDefault);
    applyDefault();
  }
})();
