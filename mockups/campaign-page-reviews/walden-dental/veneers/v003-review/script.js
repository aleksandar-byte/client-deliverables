const menuButton = document.querySelector('.menu-toggle');
const mainMenu = document.querySelector('[data-menu]');
if (menuButton && mainMenu) {
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    mainMenu.classList.toggle('is-open', open);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      menuButton.setAttribute('aria-expanded', 'false');
      mainMenu.classList.remove('is-open');
      document.querySelectorAll('.nav-dropdown.is-open').forEach(item => {
        item.classList.remove('is-open');
        item.querySelector('button')?.setAttribute('aria-expanded', 'false');
      });
    }
  });
}
document.querySelectorAll('.nav-dropdown > button').forEach(button => {
  button.addEventListener('click', () => {
    const parent = button.closest('.nav-dropdown');
    const open = button.getAttribute('aria-expanded') !== 'true';
    document.querySelectorAll('.nav-dropdown.is-open').forEach(item => {
      if (item !== parent) {
        item.classList.remove('is-open');
        item.querySelector('button')?.setAttribute('aria-expanded', 'false');
      }
    });
    parent?.classList.toggle('is-open', open);
    button.setAttribute('aria-expanded', String(open));
  });
});
const videoFrame = document.querySelector('[data-video-id="832712679"]');
videoFrame?.querySelector('.play-button')?.addEventListener('click', () => {
  const iframe = document.createElement('iframe');
  iframe.src = 'https://player.vimeo.com/video/832712679?autoplay=1';
  iframe.title = 'Walden Dental patient testimonial about front-tooth care';
  iframe.allow = 'autoplay; fullscreen; picture-in-picture';
  iframe.allowFullscreen = true;
  iframe.referrerPolicy = 'strict-origin-when-cross-origin';
  iframe.tabIndex = 0;
  videoFrame.replaceChildren(iframe);
  videoFrame.classList.add('is-playing');
  iframe.focus();
});
for (const selector of ['.case-list details', '.faq-list details']) {
  const group = document.querySelectorAll(selector);
  group.forEach(detail => detail.addEventListener('toggle', () => {
    if (detail.open) group.forEach(other => { if (other !== detail) other.open = false; });
  }));
}
