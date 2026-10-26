const menuToggle = document.querySelector('[data-menu-toggle]');
const mobileMenu = document.querySelector('[data-mobile-menu]');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

window.dataLayer = window.dataLayer || [];

let scrollFrameRequested = false;

const updateScrollEffects = () => {
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

// Desk hours in Central time, mirroring hoursFull in scripts/lib/site.mjs:
// Mon–Sat 7 AM–7 PM, Sun 7 AM–12 PM. Keyed by day of week, Sunday = 0.
const deskHours = { 0: [7, 12], 1: [7, 19], 2: [7, 19], 3: [7, 19], 4: [7, 19], 5: [7, 19], 6: [7, 19] };
const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const deskStatus = () => {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', { timeZone: 'America/Chicago', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' })
      .formatToParts(new Date())
      .map(({ type, value }) => [type, value]),
  );
  const [opens, closes] = deskHours[weekdays.indexOf(parts.weekday)];
  const hour = Number(parts.hour) + Number(parts.minute) / 60;

  if (hour >= opens && hour < closes) return { open: true, label: 'Open now · Call us' };
  return { open: false, label: hour < opens ? 'Opens today 7 AM CT' : 'Opens tomorrow 7 AM CT' };
};

const statusLabels = document.querySelectorAll('.header-phone small, .mobile-call-copy small');

const updateDeskStatus = () => {
  const { open, label } = deskStatus();
  statusLabels.forEach((element) => {
    element.textContent = label;
    element.dataset.openState = open ? 'open' : 'closed';
  });
};

updateDeskStatus();
window.setInterval(updateDeskStatus, 60_000);

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
      desk_open: deskStatus().open,
    });
    // Clarity is already installed. Record actual phone intent there as well as
    // in dataLayer; neither event claims that a call was answered or booked.
    if (typeof window.clarity === 'function') window.clarity('event', 'phone_click');
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

document.querySelectorAll('[data-print]').forEach(button => {
  button.addEventListener('click', () => window.print());
});

document.querySelectorAll('[data-site-meta]').forEach((element) => {
  element.textContent = `${window.location.hostname || 'local'} · ${document.lastModified}`;
});

// Sizing calculator: PSAI chart lookup for events, OSHA Table D-1 for job sites,
// and 2010 ADA counts (5%, at least one) per restroom location.
document.querySelectorAll('[data-sizing-calc]').forEach((calc) => {
  const chart = JSON.parse(calc.dataset.psaiChart);
  const result = calc.querySelector('[data-sizing-result]');
  const field = (name) => calc.querySelector(`[data-sizing-${name}]`);
  const whole = (input, fallback) => Math.max(1, Math.floor(Number(input.value)) || fallback);
  const plural = (count, word) => `${count} ${word}${count === 1 ? '' : 's'}`;

  const eventResult = () => {
    const crowd = whole(field('crowd'), 1);
    const hours = Number(field('hours').value);
    const row = chart.find(([size]) => size >= crowd);
    if (!row) return `<strong>Over 20,000 people?</strong> Ask the vendor for a site plan; the calculator covers crowds up to 20,000.`;
    const units = row[hours];
    const clusters = Math.min(whole(field('clusters'), 1), units);
    const perCluster = Math.ceil(units / clusters);
    const accessible = clusters * Math.max(1, Math.ceil(perCluster * 0.05));
    const basis = crowd < row[0] ? `the ${row[0].toLocaleString('en-US')}-person row, the closest chart row at or above ${crowd.toLocaleString('en-US')}` : `the ${row[0].toLocaleString('en-US')}-person row`;
    return `<strong>${plural(units, 'unit')}</strong> as a starting point, including at least ${plural(accessible, 'accessible unit')} across ${plural(clusters, 'location')}.<span>PSAI chart, ${basis}, ${plural(hours, 'hour')}, no pumping during the event.</span>`;
  };

  const constructionResult = () => {
    const workers = whole(field('workers'), 1);
    if (workers <= 20) return `<strong>1 toilet facility</strong> is the OSHA minimum for ${plural(workers, 'worker')}.<span>29 CFR 1926.51(c)(1), Table D-1: 20 or fewer employees.</span>`;
    const perGroup = workers >= 200 ? 50 : 40;
    const count = Math.ceil(workers / perGroup);
    return `<strong>${plural(count, 'toilet seat')} and ${plural(count, 'urinal')}</strong> is the OSHA minimum for ${workers.toLocaleString('en-US')} workers.<span>29 CFR 1926.51(c)(1), Table D-1: one seat and one urinal per ${perGroup} workers. State Plans may be stricter.</span>`;
  };

  const update = () => {
    const mode = calc.querySelector('[data-sizing-mode]:checked').value;
    calc.querySelectorAll('[data-sizing-fields]').forEach((group) => { group.hidden = group.dataset.sizingFields !== mode; });
    result.innerHTML = mode === 'event' ? eventResult() : constructionResult();
  };

  calc.addEventListener('input', update);
  calc.addEventListener('change', update);
  update();
});
