(() => {
  const menu = document.querySelector("#main-menu");
  const trigger = document.querySelector("#menu-toggle");
  const smallScreen = window.matchMedia("(max-width: 1000px)");
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      document.querySelectorAll(".nav-group[open]").forEach((group) => {
        group.open = false;
      });
      if (menu.open) {
        menu.open = false;
        trigger.focus();
      }
    }
  });
  document.querySelectorAll(".nav-group").forEach((group) =>
    group.addEventListener("toggle", () => {
      if (group.open)
        document.querySelectorAll(".nav-group").forEach((other) => {
          if (other !== group) other.open = false;
        });
    }),
  );
  const floating = document.querySelector("[data-floating-cta]");
  const heroActions = document.querySelector(".hero-actions");
  const warning = document.querySelector(".medical-alert");
  const urgentCall = document.querySelector("[data-element=\"urgent-call\"]");
  const finalAction = document.querySelector(".final-action");
  const visible = (element, margin = 0) => {
    const box = element.getBoundingClientRect();
    return box.bottom > 0 && box.top < window.innerHeight + margin;
  };
  const updateFloating = () => {
    const active = document.activeElement;
    const keyboard = window.visualViewport && window.innerHeight - window.visualViewport.height > 120;
    const focusedElsewhere = active && active !== document.body && active !== document.documentElement && !floating.contains(active);
    floating.hidden = !smallScreen.matches || heroActions.getBoundingClientRect().bottom > 0 || visible(warning) || visible(urgentCall) || visible(finalAction, 100) || menu.open || keyboard || focusedElsewhere;
  };
  const observer = new IntersectionObserver(updateFloating, { threshold: [0, 1], rootMargin: "0px 0px 100px 0px" });
  [heroActions, warning, urgentCall, finalAction].forEach((element) => observer.observe(element));
  window.addEventListener("scroll", updateFloating, { passive: true });
  window.addEventListener("resize", updateFloating);
  window.visualViewport?.addEventListener("resize", updateFloating);
  menu.addEventListener("toggle", updateFloating);
  document.addEventListener("focusin", updateFloating);
  document.addEventListener("focusout", () => requestAnimationFrame(updateFloating));
  updateFloating();
  const status = document.querySelector("#hours-status");
  const hoursDay = document.querySelector("#hours-day");
  const hoursToday = document.querySelector("#hours-today-time");
  const hoursToggle = document.querySelector("#weekly-hours > summary");
  const updateHours = () => {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York",
      weekday: "long",
      hour: "numeric",
      minute: "numeric",
      hourCycle: "h23",
    }).formatToParts(new Date());
    const part = (name) => parts.find((value) => value.type === name)?.value;
    const weekday = !["Saturday", "Sunday"].includes(part("weekday"));
    const minutes = Number(part("hour")) * 60 + Number(part("minute"));
    const isOpen = weekday && minutes >= 480 && minutes < 1020;
    status.dataset.hoursState = isOpen ? "open" : "closed";
    const text = isOpen ? "Open now" : "";
    if (status.textContent !== text) status.textContent = text;
    status.hidden = !isOpen;
    const todayLabel = "Today";
    const todayHours = isOpen ? "8am–5pm" : "Closed";
    if (hoursDay.textContent !== todayLabel) hoursDay.textContent = todayLabel;
    if (hoursToday.textContent !== todayHours) hoursToday.textContent = todayHours;
    hoursToday.hidden = false;
    const toggleName = todayLabel + ", " + todayHours + ". Show all office hours";
    if (hoursToggle.getAttribute("aria-label") !== toggleName) hoursToggle.setAttribute("aria-label", toggleName);
  };
  updateHours();
  window.setInterval(updateHours, 60000);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) updateHours();
  });
  const revealAfterHours = () => {
    if (window.location.hash !== "#faq-after-hours") return;
    const answer = document.querySelector("#faq-after-hours");
    answer.open = true;
    requestAnimationFrame(() => {
      answer.querySelector("summary").focus({ preventScroll: true });
      answer.scrollIntoView({ block: "center", behavior: "instant" });
    });
  };
  document.querySelectorAll('a[href="#faq-after-hours"]').forEach((link) => {
    link.addEventListener("click", () => requestAnimationFrame(revealAfterHours));
  });
  window.addEventListener("hashchange", revealAfterHours);
  revealAfterHours();
})();
