(() => {
  const menuButton = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".main-nav");

  if (menuButton && menu) {
    menuButton.addEventListener("click", () => {
      const open = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!open));
      menu.classList.toggle("is-open", !open);
    });

    menu.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        menuButton.setAttribute("aria-expanded", "false");
        menu.classList.remove("is-open");
      }
    });
  }

  const reviews = [...document.querySelectorAll("[data-review]")];
  const reviewCurrent = document.querySelector("[data-review-current]");
  const reviewButtons = [...document.querySelectorAll("[data-review-direction]")];
  let activeReview = 0;

  const showReview = (index) => {
    activeReview = (index + reviews.length) % reviews.length;
    reviews.forEach((review, reviewIndex) => {
      const active = reviewIndex === activeReview;
      review.hidden = !active;
      review.classList.toggle("is-active", active);
    });

    if (reviewCurrent) {
      reviewCurrent.textContent = String(activeReview + 1).padStart(2, "0");
    }
  };

  reviewButtons.forEach((button) => {
    button.addEventListener("click", () => {
      showReview(activeReview + Number(button.dataset.reviewDirection));
    });
  });

  const revealItems = [...document.querySelectorAll(".reveal")];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  }
})();
