const menuButton = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('.primary-nav');

if (menuButton && primaryNav) {
  const closeMenu = () => {
    primaryNav.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
  };

  menuButton.addEventListener('click', () => {
    const willOpen = !primaryNav.classList.contains('is-open');
    primaryNav.classList.toggle('is-open', willOpen);
    menuButton.setAttribute('aria-expanded', String(willOpen));
  });

  primaryNav.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}
