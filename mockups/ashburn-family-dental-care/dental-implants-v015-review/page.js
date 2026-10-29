(() => {
  const trigger = document.querySelector(".menu-toggle");
  const menu = document.querySelector("#site-menu");
  const setMenu = (open) => {
    menu.hidden = !open;
    trigger.setAttribute("aria-expanded", String(open));
  };
  trigger.addEventListener("click", () => setMenu(menu.hidden));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !menu.hidden) {
      setMenu(false);
      trigger.focus();
    }
  });
  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenu(false);
  });
  const updateHours = () => {
    const parts = Object.fromEntries(
      new Intl.DateTimeFormat("en-US", {
        timeZone: "America/New_York",
        weekday: "long",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
      })
        .formatToParts(new Date())
        .map((p) => [p.type, p.value]),
    );
    const weekday = !["Saturday", "Sunday"].includes(parts.weekday);
    const minutes = Number(parts.hour) * 60 + Number(parts.minute);
    const open = weekday && minutes >= 480 && minutes < 1020;
    document.querySelector("#hours-status").hidden = !open;
    document.querySelector("#today-hours").textContent = weekday
      ? "8am–5pm"
      : "Closed";
    document
      .querySelector("#weekly-hours summary")
      .setAttribute(
        "aria-label",
        `Today, ${weekday ? "8am to 5pm" : "closed"}. Show all office hours`,
      );
  };
  updateHours();
  window.setInterval(updateHours, 60000);
  document
    .querySelector("#request-form")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      document.querySelector("#form-status").hidden = false;
    });
})();
