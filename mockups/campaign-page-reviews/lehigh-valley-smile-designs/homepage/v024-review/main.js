(() => {
  'use strict';

  const run = () => {
    const one = (selector, scope = document) => scope.querySelector(selector);
    const all = (selector, scope = document) => [...scope.querySelectorAll(selector)];
    const scheduleUrl = 'https://www.patientsreach.com/schedule/lvsmile';
    const phoneHref = 'tel:+16108687601';
    // Preserve the original Oxygen sticky header and its existing plum style.
    const originalHeader = document.getElementById('_header-4-127');
    const refreshOriginalHeader = () => originalHeader?.classList.toggle('oxy-sticky-header-active', scrollY > 200);
    addEventListener('scroll', refreshOriginalHeader, {passive:true});
    refreshOriginalHeader();
    const focusable = (scope) => all('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex="0"]', scope)
      .filter((element) => !element.closest('[hidden],[inert]') && element.getClientRects().length);
    const prepareButton = (element) => {
      if (element.matches('button')) { element.type = 'button'; return; }
      element.setAttribute('role', 'button');
      element.tabIndex = 0;
      element.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          element.click();
        }
      });
    };

    // Retain real call and scheduling destinations on the original actions.
    all('a[href^="tel:"]').forEach((link) => {
      const digits = link.getAttribute('href').replace(/\D/g, '').slice(-10);
      if (digits === '6104770353' || digits === '6108687601') link.href = phoneHref;
    });
    all('a[href*="patientsreach.com/schedule/lvsmile"]').forEach((link) => { link.href = scheduleUrl; });
    all('#div_block-369-127 a').forEach((link) => link.removeAttribute('role'));

    const menuButton = one('#div_block-141-127');
    const mobileMenu = one('#div_block-144-127');
    let mobileMenuOpen = false;
    let refreshMobileActions = () => {};

    const setMobileMenu = (open, returnFocus = false) => {
      if (!menuButton || !mobileMenu) return;
      mobileMenuOpen = open;
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      mobileMenu.classList.toggle('oxel_dropdown_buttonv2__submenu--hidden', !open);
      mobileMenu.hidden = !open;
      mobileMenu.inert = !open;
      mobileMenu.setAttribute('aria-hidden', String(!open));
      if (open) mobileMenu.style.removeProperty('display');
      else mobileMenu.style.display = 'none';
      document.body.classList.toggle('v004-menu-open', open);
      refreshMobileActions();
      if (returnFocus) menuButton.focus();
    };

    if (menuButton && mobileMenu) {
      prepareButton(menuButton);
      menuButton.setAttribute('aria-controls', mobileMenu.id);
      setMobileMenu(false);
      // Native buttons provide both Enter and Space activation.
      menuButton.addEventListener('click', () => setMobileMenu(!mobileMenuOpen));
      menuButton.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowDown') {
          event.preventDefault();
          setMobileMenu(true);
          focusable(mobileMenu)[0]?.focus();
        }
      });
      mobileMenu.addEventListener('click', (event) => {
        if (event.target.closest('a[href]:not([href="#"])')) setMobileMenu(false);
      });
      document.addEventListener('click', (event) => {
        if (mobileMenuOpen && !mobileMenu.contains(event.target) && !menuButton.contains(event.target)) setMobileMenu(false);
      });
    }

    // The existing mobile accordion shells keep their original styling.
    const mobileAccordions = all('#div_block-144-127 .oxel_accordion__row').map((button) => {
      const panel = button.nextElementSibling;
      if (!panel?.classList.contains('oxel_accordion__content')) return null;
      prepareButton(button);
      button.setAttribute('aria-controls', panel.id);
      const setOpen = (open) => {
        button.setAttribute('aria-expanded', String(open));
        button.classList.toggle('oxel_accordion__row--active', open);
        panel.classList.toggle('oxel_accordion__content__hidden', !open);
        panel.hidden = !open;
        panel.inert = !open;
        panel.setAttribute('aria-hidden', String(!open));
        if (open) panel.style.removeProperty('display');
        else panel.style.display = 'none';
      };
      setOpen(false);
      button.addEventListener('click', () => setOpen(button.getAttribute('aria-expanded') !== 'true'));
      return { button, panel, setOpen };
    }).filter(Boolean);

    // Desktop dropdowns retain their original hover presentation, with keyboard parity.
    const desktopDropdowns = all('#_header-4-127 .menu-item-has-children').map((item, index) => {
      const trigger = [...item.children].find((element) => element.matches('a'));
      const panel = [...item.children].find((element) => element.matches('ul.sub-menu'));
      if (!trigger || !panel) return null;
      if (!panel.id) panel.id = `v004-desktop-submenu-${index + 1}`;
      trigger.setAttribute('aria-controls', panel.id);
      trigger.setAttribute('aria-haspopup', 'true');
      if (trigger.getAttribute('href') === '#') trigger.setAttribute('role', 'button');
      let open = false;
      let suppressFocus = false;
      const setOpen = (next, returnFocus = false) => {
        open = next;
        trigger.setAttribute('aria-expanded', String(next));
        panel.inert = !next;
        panel.style.visibility = next ? 'visible' : 'hidden';
        panel.style.opacity = next ? '1' : '0';
        item.classList.toggle('v004-dropdown-open', next);
        if (returnFocus) {
          suppressFocus = true;
          trigger.focus();
        }
      };
      setOpen(false);
      trigger.addEventListener('click', (event) => {
        if (trigger.getAttribute('href') === '#') {
          event.preventDefault();
          suppressFocus = false;
          setOpen(!open);
        }
      });
      trigger.addEventListener('keydown', (event) => {
        if (event.key === ' ' || event.key === 'ArrowDown') {
          event.preventDefault();
          suppressFocus = false;
          setOpen(event.key === 'ArrowDown' || !open);
          if (event.key === 'ArrowDown') focusable(panel)[0]?.focus();
        }
      });
      item.addEventListener('mouseenter', () => { suppressFocus = false; setOpen(true); });
      item.addEventListener('mouseleave', () => { if (!item.contains(document.activeElement)) setOpen(false); });
      item.addEventListener('focusin', (event) => { if (event.target !== trigger && !suppressFocus) setOpen(true); });
      item.addEventListener('focusout', (event) => {
        if (!item.contains(event.relatedTarget)) { suppressFocus = false; setOpen(false); }
      });
      return { item, trigger, panel, setOpen, isOpen: () => open };
    }).filter(Boolean);

    // Keep the existing schedule and its first/third Saturday qualification intact.
    const hoursToggle = one('.lvsd-bar__toggle');
    const hoursPanel = one('#lvsd-hours-panel');
    const hoursInner = one('.lvsd-bar__inner');
    const setHours = (open, returnFocus = false) => {
      if (!hoursToggle || !hoursPanel || !hoursInner) return;
      hoursToggle.setAttribute('aria-expanded', String(open));
      hoursToggle.setAttribute('aria-label', open ? 'Hide office hours' : 'Show all office hours');
      hoursPanel.setAttribute('aria-hidden', String(!open));
      hoursPanel.inert = !open;
      hoursInner.classList.toggle('is-open', open);
      if (returnFocus) hoursToggle.focus();
    };
    if (hoursToggle && hoursPanel && hoursInner) {
      prepareButton(hoursToggle);
      hoursToggle.setAttribute('aria-controls', hoursPanel.id);
      setHours(false);
      hoursToggle.addEventListener('click', () => setHours(hoursToggle.getAttribute('aria-expanded') !== 'true'));
      document.addEventListener('click', (event) => {
        if (!hoursInner.contains(event.target)) setHours(false);
      });
    }

    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      if (mobileMenuOpen && (mobileMenu?.contains(event.target) || event.target === menuButton)) {
        event.preventDefault();
        const nested = mobileAccordions.filter(({ panel, button }) => (panel.contains(event.target) || button === event.target) && button.getAttribute('aria-expanded') === 'true').at(-1);
        if (nested) { nested.setOpen(false); nested.button.focus(); }
        else setMobileMenu(false, true);
        return;
      }
      const dropdown = desktopDropdowns.filter(({ item, isOpen }) => item.contains(event.target) && isOpen()).at(-1);
      if (dropdown) { event.preventDefault(); dropdown.setOpen(false, true); return; }
      if (hoursInner?.contains(event.target) && hoursToggle?.getAttribute('aria-expanded') === 'true') {
        event.preventDefault();
        setHours(false, true);
      }
    });

    // A real slide is shown on every change; the state attribute is only an observation hook.
    all('.ct-slider').forEach((slider) => {
      const track = one('.unslider-wrap', slider);
      if (!track) return;
      const slides = [...track.children].filter((slide) => slide.matches('li') && !slide.classList.contains('unslider-clone'));
      if (!slides.length) return;
      const isReview = slider.id === 'slider-136-149';
      slider.setAttribute('role', 'region');
      slider.setAttribute('aria-roledescription', 'carousel');
      slider.setAttribute('aria-label', isReview ? 'Patient reviews' : 'Office photos');
      track.style.width = '100%';
      track.style.marginLeft = '0';
      track.style.left = '0';
      track.style.transform = 'none';
      let controls = one('.v004-review-controls', slider);
      if (!controls) {
        controls = document.createElement('div');
        controls.className = 'v004-review-controls';
        slider.append(controls);
      }
      ['prev', 'next'].forEach((direction) => {
        if (one(`.unslider-arrow.${direction}`, slider)) return;
        const button = document.createElement('button');
        button.type = 'button';
        button.className = `unslider-arrow ${direction}`;
        button.textContent = direction === 'next' ? 'Next' : 'Prev';
        button.setAttribute('aria-label', `${direction === 'next' ? 'Next' : 'Previous'} ${isReview ? 'patient review' : 'office photo'}`);
        controls.append(button);
      });
      const status = document.createElement('span');
      status.className = 'screen-reader-text';
      status.setAttribute('role', 'status');
      status.setAttribute('aria-live', 'polite');
      controls.append(status);
      let index = 0;
      const showSlide = (requested, announce = true) => {
        index = (requested + slides.length) % slides.length;
        slides.forEach((slide, slideIndex) => {
          const active = slideIndex === index;
          slide.hidden = !active;
          slide.inert = !active;
          slide.style.display = active ? 'block' : 'none';
          slide.style.width = '100%';
          slide.style.float = 'none';
          slide.setAttribute('aria-hidden', String(!active));
          slide.setAttribute('aria-label', `${slideIndex + 1} of ${slides.length}`);
          slide.classList.toggle('unslider-active', active);
        });
        track.dataset.currentIndex = String(index);
        slider.dataset.currentIndex = String(index);
        if (announce) status.textContent = `${isReview ? 'Review' : 'Office photo'} ${index + 1} of ${slides.length}`;
      };
      all('.unslider-arrow', slider).forEach((arrow) => {
        if (arrow.matches('button')) arrow.type = 'button';
        arrow.addEventListener('click', (event) => {
          event.preventDefault();
          showSlide(index + (arrow.classList.contains('next') ? 1 : -1));
        });
        if (!arrow.matches('button')) arrow.addEventListener('keydown', (event) => {
          if (event.key === ' ') { event.preventDefault(); arrow.click(); }
        });
      });
      showSlide(0, false);
      // No carousel autoplay: review and office content stays still until requested.
    });

    // Decorative motion is silent, optional, paused when offscreen, and static on phones/reduced motion.
    const heroVideo = one('#section-2-149 video');
    const videoToggle = one('.v004-video-toggle');
    if (heroVideo && videoToggle) {
      const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
      const phoneViewport = matchMedia('(max-width: 767px)');
      let manuallyPaused = false;
      let inView = true;
      heroVideo.muted = true;
      heroVideo.defaultMuted = true;
      heroVideo.playsInline = true;
      const updateVideoButton = () => {
        const playing = !heroVideo.paused;
        videoToggle.textContent = playing ? 'Pause video' : 'Play video';
        videoToggle.setAttribute('aria-label', playing ? 'Pause background video' : 'Play background video');
        videoToggle.setAttribute('aria-pressed', String(playing));
      };
      const reconcileVideo = () => {
        const staticFallback = reduceMotion.matches || phoneViewport.matches;
        heroVideo.autoplay = !staticFallback;
        heroVideo.preload = staticFallback ? 'none' : 'metadata';
        if (staticFallback || manuallyPaused || !inView || document.hidden) heroVideo.pause();
        else heroVideo.play().catch(() => { updateVideoButton(); });
        updateVideoButton();
      };
      videoToggle.addEventListener('click', () => {
        if (heroVideo.paused) {
          manuallyPaused = false;
          heroVideo.play().catch(() => { updateVideoButton(); });
        } else { manuallyPaused = true; heroVideo.pause(); }
        updateVideoButton();
      });
      heroVideo.addEventListener('play', updateVideoButton);
      heroVideo.addEventListener('pause', updateVideoButton);
      heroVideo.addEventListener('error', updateVideoButton);
      reduceMotion.addEventListener('change', reconcileVideo);
      phoneViewport.addEventListener('change', reconcileVideo);
      document.addEventListener('visibilitychange', reconcileVideo);
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; reconcileVideo(); }, {threshold:0.05}).observe(heroVideo);
      }
      reconcileVideo();
    }

    // Reuse the original mobile Call/Book bar only after the hero actions have passed.
    const mobileBar = one('#div_block-369-127');
    const heroActions = one('[data-element="hero-actions"]');
      const finalActions = all('[data-element="closing-action"],#div_block-45-127,#gform_4,.v004-form-continuation');
    if (mobileBar && heroActions) {
      const onScreen = (element) => {
        const rect = element.getBoundingClientRect();
        return !element.hidden && rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < innerHeight;
      };
      refreshMobileActions = () => {
        const rect = heroActions.getBoundingClientRect();
        const topChrome = one('#_header-4-127')?.getBoundingClientRect().bottom || 0;
        const show = innerWidth <= 767 && rect.bottom <= Math.max(0, topChrome) && !mobileMenuOpen && !finalActions.some(onScreen);
        mobileBar.hidden = !show;
        mobileBar.setAttribute('aria-hidden', String(!show));
        if (show) mobileBar.style.removeProperty('display');
        else mobileBar.style.display = 'none';
      };
      let frame = 0;
      const scheduleRefresh = () => {
        if (frame) return;
        frame = requestAnimationFrame(() => { frame = 0; refreshMobileActions(); });
      };
      addEventListener('scroll', scheduleRefresh, {passive:true});
      addEventListener('resize', scheduleRefresh);
      refreshMobileActions();
    }

    // Validate the preserved form locally, then offer the real booking destination.
    // No form data is posted, logged, stored or appended to a scheduling URL.
    const form = one('#gform_4[data-local-form]');
    if (form) {
      form.noValidate = false;
      all('[aria-required="true"]', form).forEach((field) => { field.required = true; });
      const name = one('#input_4_1', form);
      const phone = one('#input_4_3', form);
      const choices = all('#field_4_5 input[type="checkbox"]', form);
      const continuation = one('.v004-form-continuation', form);
      const submit = one('#gform_submit_button_4', form);
      if (submit) { submit.textContent = 'Continue to scheduling'; submit.disabled = false; }
      const validateFields = (markInvalid = false) => {
        name?.setCustomValidity(name.value.trim() ? '' : 'Enter your full name.');
        phone?.setCustomValidity(phone.value.replace(/\D/g, '').length >= 7 ? '' : 'Enter a valid phone number.');
        choices[0]?.setCustomValidity(choices.some((choice) => choice.checked) ? '' : 'Choose a service you are interested in.');
        if (markInvalid) all('input,select,textarea', form).forEach((field) => field.setAttribute('aria-invalid', String(!field.validity.valid)));
      };
      const validateChangedField = (event) => {
        validateFields();
        event.target.setAttribute('aria-invalid', String(!event.target.validity.valid));
      };
      form.addEventListener('input', validateChangedField);
      form.addEventListener('change', validateChangedField);
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        validateFields(true);
        if (!form.reportValidity()) return;
        if (!continuation) return;
        const message = one('p', continuation);
        if (message) message.textContent = 'Choose your visit in our online scheduler. Your details have not been sent.';
        const booking = one('a', continuation);
        if (booking) booking.href = scheduleUrl;
        continuation.hidden = false;
        continuation.style.removeProperty('display');
        booking?.focus();
        refreshMobileActions();
      });
      form.addEventListener('invalid', (event) => event.target.setAttribute('aria-invalid', 'true'), true);
      // Ensure required groups participate in native validation before the first attempt.
      validateFields();
    }

    addEventListener('resize', () => {
      if (mobileMenuOpen && menuButton && !menuButton.getClientRects().length) setMobileMenu(false);
    });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run, {once:true});
  else run();
})();
