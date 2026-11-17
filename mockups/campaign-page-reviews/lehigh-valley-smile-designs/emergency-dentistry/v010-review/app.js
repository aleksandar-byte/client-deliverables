(() => {
  document.documentElement.classList.add('js');
  const trigger = document.getElementById('menu-toggle');
  const menu = document.getElementById('main-menu');
  if (!trigger || !menu) return;
  trigger.hidden = false;
  const close = (restoreFocus = false) => {
    menu.classList.remove('is-open');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.firstChild.textContent = 'Menu ';
    if (restoreFocus) trigger.focus();
  };
  trigger.addEventListener('click', () => {
    const open = trigger.getAttribute('aria-expanded') !== 'true';
    menu.classList.toggle('is-open', open);
    trigger.setAttribute('aria-expanded', String(open));
    trigger.firstChild.textContent = open ? 'Close ' : 'Menu ';
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.classList.contains('is-open')) close(true);
  });
  const wide = window.matchMedia('(min-width: 861px)');
  wide.addEventListener('change', event => { if (event.matches) close(); });
})();
