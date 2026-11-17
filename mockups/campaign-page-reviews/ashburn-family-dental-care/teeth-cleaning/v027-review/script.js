(() => {
  const menu = document.querySelector("#mobile-menu");
  document.querySelector(".menu-close").addEventListener("click", () => {
    menu.open = false;
    menu.querySelector("summary").focus();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.open) {
      menu.open = false;
      menu.querySelector("summary").focus();
    }
  });
  const updateHours = () => {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York",
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).formatToParts(new Date());
    const get = (t) => parts.find((p) => p.type === t)?.value;
    const day = get("weekday"),
      mins = Number(get("hour")) * 60 + Number(get("minute"));
    const workday = !["Saturday", "Sunday"].includes(day),
      open = workday && mins >= 480 && mins < 1020;
    document.querySelector("#open-status").hidden = !open;
    document.querySelector("#today-hours").textContent = workday ? "8am-5pm" : "Closed";
    document
      .querySelector("#weekly-hours summary")
      .setAttribute(
        "aria-label",
        "Today, " + (workday ? "8am to 5pm" : "closed") + ". Show all office hours",
      );
  };
  updateHours();
})();
