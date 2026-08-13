const menuToggle = document.querySelector('[data-menu-toggle]');
const mobileMenu = document.querySelector('[data-mobile-menu]');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

window.dataLayer = window.dataLayer || [];

document.documentElement.classList.add('js-motion');

const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
scrollProgress.setAttribute('aria-hidden', 'true');
document.body.prepend(scrollProgress);

let scrollFrameRequested = false;

const updateScrollEffects = () => {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;

  scrollProgress.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
  document.body.classList.toggle('has-scrolled', window.scrollY > 18);
  scrollFrameRequested = false;
};

window.addEventListener(
  'scroll',
  () => {
    if (!scrollFrameRequested) {
      window.requestAnimationFrame(updateScrollEffects);
      scrollFrameRequested = true;
    }
  },
  { passive: true },
);

updateScrollEffects();

document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
  link.addEventListener('click', () => {
    const placement = link.dataset.ctaLocation
      || (link.matches('.mobile-call') && 'mobile_sticky')
      || (link.closest('.mobile-menu') && 'mobile_menu')
      || (link.closest('.site-header') && 'header')
      || (link.closest('.location-call-card') && 'location_call_card')
      || (link.closest('.location-hero-actions') && 'location_hero')
      || (link.closest('.state-intro-copy') && 'state_intro')
      || (link.closest('.state-planning-card') && 'rental_planning')
      || (link.closest('.location-faq-layout') && 'faq')
      || (link.closest('.location-final-cta, .cta-panel') && 'final_cta')
      || (link.closest('.footer') && 'footer')
      || 'page_content';

    window.dataLayer.push({
      event: 'phone_click',
      page_path: window.location.pathname,
      location_state: document.body.dataset.locationState || undefined,
      cta_placement: placement,
      cta_text: link.textContent.trim().replace(/\s+/g, ' '),
      phone_number: link.getAttribute('href')?.replace(/^tel:/, ''),
    });
  });
});

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    document.body.classList.toggle('menu-open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.classList.remove('menu-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

document.querySelectorAll('[data-faq-item]').forEach((item) => {
  const button = item.querySelector('[data-faq-button]');

  button?.addEventListener('click', () => {
    const isOpen = item.classList.toggle('open');
    button.setAttribute('aria-expanded', String(isOpen));
  });
});

const testimonialTrack = document.querySelector('[data-testimonial-track]');
const testimonialSet = document.querySelector('[data-testimonial-set]');

if (testimonialTrack && testimonialSet) {
  const testimonialClone = testimonialSet.cloneNode(true);
  testimonialClone.removeAttribute('data-testimonial-set');
  testimonialClone.setAttribute('aria-hidden', 'true');
  testimonialTrack.append(testimonialClone);
  testimonialTrack.classList.add('is-ready');
}

const revealSelectors = [
  '.hero-copy',
  '.hero-call-card',
  '.hero-visual',
  '.page-hero-inner',
  '.section-heading',
  '.trust-item',
  '.product-card',
  '.rental-guide-intro',
  '.rental-guide-card',
  '.use-card',
  '.process-photo',
  '.step-card',
  '.feature-art',
  '.feature-list-item',
  '.stat',
  '.testimonial-card',
  '.faq-item',
  '.cta-panel',
  '.story-visual',
  '.standards-photo',
  '.about-process-photo',
  '.story-copy',
  '.value-card',
  '.standard-item',
  '.contact-card',
  '.quote-info-photo',
  '.contact-delivery-photo',
  '.quote-form',
  '.blog-featured',
  '.blog-card',
  '.newsletter',
  '.location-call-card',
  '.state-intro-photo',
  '.state-intro-copy',
  '.location-option-card',
  '.state-planning-card',
  '.location-use-grid article',
  '.location-process-steps article',
  '.hub-content-points article',
  '.home-location-regions article',
  '.related-location-links a',
];

const revealElements = document.querySelectorAll(revealSelectors.join(','));
const staggerContainers = document.querySelectorAll(
  '.trust-grid, .product-grid, .rental-guide-grid, .use-grid, .steps, .stats-grid, .testimonial-grid, .value-grid, .standards-grid, .blog-grid, .location-options-grid, .location-use-grid, .location-process-steps, .state-card-grid, .hub-content-points, .home-location-regions, .related-location-links',
);

staggerContainers.forEach((container) => {
  [...container.children].forEach((item, index) => {
    item.style.setProperty('--reveal-delay', `${Math.min(index, 5) * 75}ms`);
  });
});

revealElements.forEach((element) => {
  element.classList.add('reveal');

  if (element.matches('.hero-copy, .rental-guide-intro, .story-copy, .contact-card, .state-intro-copy')) {
    element.classList.add('reveal-left');
  }

  if (element.matches('.hero-visual, .hero-call-card, .story-visual, .quote-form, .location-call-card, .state-intro-photo')) {
    element.classList.add('reveal-right');
  }
});

if (reducedMotion || !('IntersectionObserver' in window)) {
  revealElements.forEach((element) => element.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -45px' },
  );

  revealElements.forEach((element) => revealObserver.observe(element));
}

const animatedStats = document.querySelectorAll('.stat strong');

if (!reducedMotion && 'IntersectionObserver' in window) {
  const statObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const element = entry.target;
        const match = element.textContent.trim().match(/([\d.]+)(.*)/);

        if (!match) return;

        const target = Number(match[1]);
        const suffix = match[2];
        const duration = 900;
        const startTime = performance.now();

        const count = (currentTime) => {
          const elapsed = Math.min((currentTime - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - elapsed, 3);
          element.textContent = `${Math.round(target * eased)}${suffix}`;

          if (elapsed < 1) window.requestAnimationFrame(count);
        };

        window.requestAnimationFrame(count);
        observer.unobserve(element);
      });
    },
    { threshold: 0.8 },
  );

  animatedStats.forEach((stat) => statObserver.observe(stat));
}

const pressableElements = document.querySelectorAll(
  '.btn, .filter-btn, .product-card, .use-card, .step-card, .value-card, .testimonial-card, .blog-card, .location-option-card, .state-link-card, .related-location-links a, .home-state-links a',
);

pressableElements.forEach((element) => {
  const release = () => element.classList.remove('is-pressed');

  element.addEventListener('pointerdown', () => element.classList.add('is-pressed'));
  element.addEventListener('pointerup', release);
  element.addEventListener('pointercancel', release);
  element.addEventListener('pointerleave', release);
});

document.querySelectorAll('.btn, .filter-btn, .faq-question').forEach((element) => {
  element.addEventListener('pointerdown', (event) => {
    if (reducedMotion || (event.pointerType === 'mouse' && event.button !== 0)) return;

    const ripple = document.createElement('span');
    const bounds = element.getBoundingClientRect();
    const size = Math.max(bounds.width, bounds.height) * 1.8;

    ripple.className = 'touch-ripple';
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - bounds.left - size / 2}px`;
    ripple.style.top = `${event.clientY - bounds.top - size / 2}px`;

    element.append(ripple);
    ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
  });
});

document.querySelectorAll('[data-demo-form]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = form.querySelector('[data-form-message]');
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton?.textContent;

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Request received';
    }

    message?.classList.add('show');
    form.reset();

    window.setTimeout(() => {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      }
    }, 2500);
  });
});

const filterButtons = document.querySelectorAll('[data-blog-filter]');
const blogCards = document.querySelectorAll('[data-blog-card]');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const category = button.dataset.blogFilter;

    filterButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');

    blogCards.forEach((card) => {
      const shouldShow = category === 'all' || card.dataset.category === category;
      card.style.display = shouldShow ? '' : 'none';

      if (shouldShow && !reducedMotion) {
        card.animate(
          [
            { opacity: 0, transform: 'translateY(16px) scale(0.98)' },
            { opacity: 1, transform: 'translateY(0) scale(1)' },
          ],
          { duration: 360, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
        );
      }
    });
  });
});

document.querySelectorAll('[data-current-year]').forEach((element) => {
  element.textContent = new Date().getFullYear();
});
