// Local, accessible call continuity only. No analytics requests or availability claims.
(() => {
  const bar = document.querySelector('[data-mobile-call-bar]');
  const heroAction = document.querySelector('[data-element="hero-primary-action"]');
  const finalAction = document.getElementById('final-action');
  const urgentAction = document.querySelector('[data-cta-location="urgent"]');
  const menu = document.getElementById('menu-toggle');
  if (!bar || !heroAction || !finalAction) return;
  const mobile = window.matchMedia('(max-width: 860px)');
  let pending = false;
  const update = () => {
    pending = false;
    const afterHeroAction = heroAction.getBoundingClientRect().bottom <= 0;
    const beforeFinalAction = finalAction.getBoundingClientRect().top > innerHeight + 80;
    const urgentRect = urgentAction?.getBoundingClientRect();
    const urgentVisible = urgentRect && urgentRect.top >= 0 && urgentRect.bottom <= innerHeight;
    const menuOpen = menu?.getAttribute('aria-expanded') === 'true';
    const focused = bar.contains(document.activeElement);
    bar.hidden = !mobile.matches || menuOpen || (!focused && !(afterHeroAction && beforeFinalAction && !urgentVisible));
  };
  const schedule = () => {
    if (pending) return;
    pending = true;
    requestAnimationFrame(update);
  };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  window.addEventListener('pageshow', schedule);
  bar.addEventListener('focusout', schedule);
  mobile.addEventListener('change', schedule);
  if (menu) new MutationObserver(schedule).observe(menu, { attributes: true, attributeFilter: ['aria-expanded'] });
  update();
})();
