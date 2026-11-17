(() => {
  const button = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-menu]");
  const setOpen = (open) => {
    button.setAttribute("aria-expanded", String(open));
    menu.dataset.open = String(open);
  };
  button.addEventListener("click", () => setOpen(button.getAttribute("aria-expanded") !== "true"));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && button.getAttribute("aria-expanded") === "true") {
      setOpen(false);
      button.focus();
    }
  });
  menu
    .querySelectorAll("a")
    .forEach((link) => link.addEventListener("click", () => setOpen(false)));
  const day = new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", weekday: "long" })
    .format(new Date())
    .toLowerCase();
  const hours = {
    monday: "8am–5pm",
    tuesday: "8am–5pm",
    wednesday: "8am–1pm",
    thursday: "8am–5pm",
    friday: "8am–2pm",
    saturday: "Closed",
    sunday: "Closed",
  };
  document.querySelectorAll("[data-hours-summary]").forEach((el) => {
    el.textContent = "Today · " + day[0].toUpperCase() + day.slice(1) + " " + hours[day];
  });
})();

(() => {
  document.querySelectorAll("[data-practice-gallery]").forEach((gallery) => {
    const slides = [...gallery.querySelectorAll("[data-gallery-slide]")];
    const controls = gallery.querySelector("[data-gallery-controls]");
    const status = gallery.querySelector("[data-gallery-status]");
    let index = 0;
    const show = (next) => {
      index = (next + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        slide.hidden = i !== index;
      });
      gallery.dataset.activeIndex = String(index);
      status.textContent = `Photo ${index + 1} of ${slides.length}`;
    };
    gallery.querySelector("[data-gallery-prev]").addEventListener("click", () => show(index - 1));
    gallery.querySelector("[data-gallery-next]").addEventListener("click", () => show(index + 1));
    gallery.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        show(index + (event.key === "ArrowRight" ? 1 : -1));
      }
    });
    show(0);
    controls.hidden = false;
  });
})();
