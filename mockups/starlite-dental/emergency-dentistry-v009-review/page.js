(() => {
  document.documentElement.classList.add('js');
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');
  const closeMenu = () => {
    menu?.removeAttribute('data-open');
    toggle?.setAttribute('aria-expanded', 'false');
  };
  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    menu?.toggleAttribute('data-open', open);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      toggle.focus();
    }
  });
  menu?.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  const hours = {
    Monday: '8am–5pm', Tuesday: '8am–5pm', Wednesday: '8am–1pm',
    Thursday: '8am–5pm', Friday: '8am–2pm', Saturday: 'Closed', Sunday: 'Closed'
  };
  try {
    const day = new Intl.DateTimeFormat('en-US', { weekday: 'long', timeZone: 'America/Chicago' }).format(new Date());
    document.querySelectorAll('[data-today-hours]').forEach(element => {
      element.textContent = hours[day];
    });
  } catch {
    // The complete weekly schedule remains usable in HTML.
  }
})();
