(() => {
  'use strict';
  const bar = document.querySelector('[data-mobile-scroll-cta]');
  const heroActions = document.querySelector('#service-hero [data-hero-actions]');
  const finalAction = document.querySelector('#final-action');
  if (!bar || !heroActions || !finalAction) return;
  const phone = window.matchMedia('(max-width:650px)');
  let frame;
  const update = () => {
    frame = undefined;
    const show = phone.matches && heroActions.getBoundingClientRect().bottom <= 0 && finalAction.getBoundingClientRect().top > window.innerHeight + 40;
    if (!show && bar.contains(document.activeElement)) return;
    bar.hidden = !show;
    bar.inert = !show;
  };
  const schedule = () => { if (frame === undefined) frame = window.requestAnimationFrame(update); };
  window.addEventListener('scroll', schedule, {passive:true});
  window.addEventListener('resize', schedule, {passive:true});
  phone.addEventListener('change', schedule);
  bar.addEventListener('focusout', schedule);
  document.addEventListener('focusin', event => {
    if (bar.hidden || bar.contains(event.target) || !(event.target instanceof HTMLElement)) return;
    if (event.target.getBoundingClientRect().bottom > window.innerHeight - bar.getBoundingClientRect().height - 12) {
      event.target.scrollIntoView({block:'center', behavior:'auto'});
    }
  });
  schedule();
})();
