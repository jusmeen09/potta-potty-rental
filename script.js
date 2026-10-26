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

  if (hour >= opens && hour < closes) return { open: true, label: 'Open now' };
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

// Homepage catalogue: scroll engine, hero depth, rail jumps, and the call sheet.
// The call sheet is a note for the caller. It lives in this browser only and is
// never sent anywhere; the only analytics event carries a unit count, no input.
const catalogue = document.querySelector('main.catalogue');

if (catalogue) {
  const header = document.querySelector('.site-header');
  const index = catalogue.querySelector('.cat-index');
  const setOffsets = () => {
    catalogue.style.setProperty('--cat-hdr', `${header ? header.offsetHeight : 0}px`);
    catalogue.style.setProperty('--cat-index', `${index ? index.offsetHeight : 0}px`);
  };
  setOffsets();
  if ('ResizeObserver' in window && header) new ResizeObserver(setOffsets).observe(header);

  if (window.ScrollCraft) window.ScrollCraft.mount(catalogue);

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  // Hero depth: the field lags, the unit grows toward the viewer from its base, the type holds.
  const hero = catalogue.querySelector('[data-cat-hero]');
  const far = hero?.querySelector('[data-depth="far"]');
  const unit = hero?.querySelector('[data-depth="subject"]');
  if (hero && far && unit && !reducedMotion) {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    let heroVisible = true;
    let pointerX = 0;
    let pointerY = 0;
    let easedX = 0;
    let easedY = 0;
    let frame = 0;
    const paint = () => {
      frame = 0;
      easedX += (pointerX - easedX) * 0.12;
      easedY += (pointerY - easedY) * 0.12;
      const p = clamp(window.scrollY / Math.max(hero.offsetHeight, 1), 0, 1);
      far.style.transform = `translate3d(${(easedX * -10).toFixed(2)}px, ${(p * 56 + easedY * -6).toFixed(2)}px, 0) scale(1.04)`;
      // The unit keeps its base on the floor line: it grows from its base toward the viewer instead of lifting.
      unit.style.transform = `translate3d(${(easedX * 18).toFixed(2)}px, 0, 0) scale(${(1 + p * 0.07 + easedY * 0.01).toFixed(4)})`;
      if (finePointer && heroVisible && (Math.abs(pointerX - easedX) > 0.001 || Math.abs(pointerY - easedY) > 0.001)) frame = requestAnimationFrame(paint);
    };
    const request = () => { if (!frame && heroVisible) frame = requestAnimationFrame(paint); };
    new IntersectionObserver(([entry]) => { heroVisible = entry.isIntersecting; request(); }).observe(hero);
    window.addEventListener('scroll', request, { passive: true });
    if (finePointer) {
      hero.addEventListener('pointermove', (event) => {
        pointerX = event.clientX / window.innerWidth - 0.5;
        pointerY = event.clientY / window.innerHeight - 0.5;
        request();
      });
      hero.addEventListener('pointerleave', () => { pointerX = 0; pointerY = 0; request(); });
    }
    paint();
  }

  // Rail: index links and keyboard focus bring the right unit to the centre.
  const panAct = catalogue.querySelector('[data-sc-act="pan"]');
  const rail = panAct?.querySelector('[data-sc-pan]');
  const scrollToRailItem = (item) => {
    if (!panAct || !rail || !item) return;
    const over = rail.scrollWidth - window.innerWidth;
    const travel = over * (1 + (parseFloat(rail.getAttribute('data-sc-pan')) || 0));
    const actTop = panAct.getBoundingClientRect().top + window.scrollY;
    if (reducedMotion || travel <= 0) {
      window.scrollTo({ top: actTop, behavior: 'instant' });
      item.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'instant' });
      return;
    }
    const centre = item.offsetLeft + item.offsetWidth / 2;
    const p = clamp((centre - window.innerWidth / 2) / travel, 0, 1);
    window.scrollTo({ top: actTop + p * (panAct.offsetHeight - window.innerHeight), behavior: 'instant' });
  };
  catalogue.querySelectorAll('[data-rail-jump]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const item = catalogue.querySelector(link.getAttribute('href'));
      if (!item) return;
      event.preventDefault();
      scrollToRailItem(item);
      history.replaceState(null, '', link.getAttribute('href'));
    });
  });
  panAct?.addEventListener('focusin', (event) => {
    const item = event.target.closest('.cat-object, .cat-rail__lead, .cat-rail__note');
    const box = item?.getBoundingClientRect();
    if (box && (box.left < 0 || box.right > window.innerWidth)) scrollToRailItem(item);
  });

  // Index: mark where the reader is.
  const indexLinks = [...catalogue.querySelectorAll('.cat-index a')];
  const railItems = rail ? [...rail.querySelectorAll('.cat-object')] : [];
  const markIndex = () => {
    const mid = window.innerHeight * 0.5;
    let current = '';
    ['standard', 'how-many', 'prices', 'call-sheet'].forEach((id) => {
      const box = document.getElementById(id)?.getBoundingClientRect();
      if (box && box.top < mid && box.bottom > mid) current = id;
    });
    const stage = panAct?.getBoundingClientRect();
    if (stage && stage.top <= 1 && stage.bottom >= window.innerHeight - 1) {
      let best = Infinity;
      railItems.forEach((item) => {
        const box = item.getBoundingClientRect();
        const distance = Math.abs(box.left + box.width / 2 - window.innerWidth / 2);
        if (distance < best && box.right > 0 && box.left < window.innerWidth) { best = distance; current = item.id; }
      });
    }
    indexLinks.forEach((link) => link.setAttribute('aria-current', String(link.getAttribute('href') === `#${current}`)));
  };
  let indexFrame = 0;
  window.addEventListener('scroll', () => { if (!indexFrame) indexFrame = requestAnimationFrame(() => { indexFrame = 0; markIndex(); }); }, { passive: true });
  markIndex();

}

// The call sheet, on every page that has pickers, a sheet panel or the summary chip.
// It is a note for the caller. It lives in this browser only and is never sent
// anywhere; the only analytics event carries a unit count, no input values.
{
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
  const storeKey = 'star-call-sheet-v1';
  const blank = () => ({ units: {}, people: null, hours: null, chart: null, zip: '', date: '' });
  let sheet = blank();
  try { sheet = { ...blank(), ...JSON.parse(window.localStorage.getItem(storeKey) || '{}') }; } catch { sheet = blank(); }
  const save = () => { try { window.localStorage.setItem(storeKey, JSON.stringify(sheet)); } catch { /* private mode: the sheet still works for this visit */ } };

  const picks = [...document.querySelectorAll('[data-pick]')];
  const sheetScript = document.querySelector('[data-sheet-script]');
  const sheetUnits = document.querySelector('[data-sheet-units]');
  const sheetCrowd = document.querySelector('[data-sheet-crowd]');
  const zipInput = document.querySelector('[data-sheet-zip]');
  const dateInput = document.querySelector('[data-sheet-date]');
  const sheetCounts = [...document.querySelectorAll('[data-sheet-count]')];
  const sheetLinks = [...document.querySelectorAll('.cat-index__sheet')];
  const mini = document.querySelector('[data-cat-mini]');
  const miniText = document.querySelector('[data-mini-text]');
  const miniLink = document.querySelector('[data-mini-link]');
  const sheetSection = document.getElementById('call-sheet');
  const stateName = document.body.dataset.locationState || '';
  if (miniLink && sheetSection) miniLink.setAttribute('href', '#call-sheet');

  const plural = (count, one, many) => `${count} ${count === 1 ? one : many}`;
  const listPhrase = (items) => (items.length < 2 ? items.join('') : `${items.slice(0, -1).join(', ')} and ${items.at(-1)}`);
  const formatDate = (value) => {
    const date = new Date(`${value}T12:00:00`);
    return Number.isNaN(date.getTime()) ? '' : date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  };
  const unitNames = { standard: ['standard unit', 'standard units'], ada: ['ADA unit', 'ADA units'], trailer: ['restroom trailer', 'restroom trailers'], handwash: ['handwashing station', 'handwashing stations'] };
  const totalUnits = () => Object.values(sheet.units).reduce((sum, qty) => sum + qty, 0);
  let headInView = false;
  let sheetInView = false;

  const updateMini = () => {
    if (!mini) return;
    const phone = window.matchMedia('(max-width: 860px)').matches;
    const total = totalUnits();
    mini.hidden = headInView || sheetInView || (phone && total === 0) || (!sheetSection && total === 0);
  };

  const render = () => {
    picks.forEach((pick) => {
      const qty = sheet.units[pick.dataset.pick] || 0;
      pick.querySelector('[data-qty]').textContent = qty;
      pick.querySelector('[data-step="-1"]').disabled = qty === 0;
      pick.classList.toggle('has-units', qty > 0);
    });
    const phrases = Object.entries(unitNames).filter(([key]) => sheet.units[key] > 0).map(([key, [one, many]]) => plural(sheet.units[key], one, many));
    const total = totalUnits();
    const crowd = sheet.people && sheet.hours ? `about ${sheet.people.toLocaleString('en-US')} people over ${plural(sheet.hours, 'hour', 'hours')}` : '';
    const when = sheet.date ? formatDate(sheet.date) : '';
    let line = `Hi, I'm looking for ${phrases.length ? listPhrase(phrases) : 'a porta potty rental'}`;
    if (crowd) line += ` for ${crowd}`;
    if (sheet.zip.length === 5) line += `, delivered to ZIP ${sheet.zip}${stateName ? ` in ${stateName}` : ''}`;
    else if (stateName) line += ` in ${stateName}`;
    if (when) line += ` on ${when}`;
    line += ". What's available, and what would it cost?";
    if (sheetScript) sheetScript.textContent = line;
    if (sheetUnits) sheetUnits.textContent = phrases.length ? listPhrase(phrases) : 'None picked yet. You can add units on this page or ask on the call.';
    if (sheetCrowd) sheetCrowd.textContent = crowd ? `${crowd.charAt(0).toUpperCase()}${crowd.slice(1)}${sheet.chart ? `. The PSAI chart starts at ${plural(sheet.chart, 'unit', 'units')}.` : ''}` : 'Not set';
    sheetCounts.forEach((el) => { el.textContent = total; });
    sheetLinks.forEach((el) => el.classList.toggle('has-units', total > 0));
    if (miniText) miniText.textContent = total ? `Call sheet: ${plural(total, 'unit', 'units')}` : 'Call sheet';
    if (zipInput && document.activeElement !== zipInput) zipInput.value = sheet.zip;
    if (dateInput && document.activeElement !== dateInput) dateInput.value = sheet.date;
    updateMini();
  };

  picks.forEach((pick) => {
    pick.addEventListener('click', (event) => {
      const button = event.target.closest('[data-step]');
      if (!button) return;
      const key = pick.dataset.pick;
      sheet.units[key] = clamp((sheet.units[key] || 0) + Number(button.dataset.step), 0, 99);
      save();
      render();
      window.dataLayer.push({ event: 'call_sheet_update', units_total: totalUnits(), page_path: window.location.pathname });
    });
  });
  zipInput?.addEventListener('input', () => { sheet.zip = zipInput.value.replace(/\D/g, '').slice(0, 5); zipInput.value = sheet.zip; save(); render(); });
  dateInput?.addEventListener('change', () => { sheet.date = dateInput.value; save(); render(); });
  document.querySelector('[data-sheet-clear]')?.addEventListener('click', () => { sheet = blank(); save(); render(); });
  const copyButton = document.querySelector('[data-sheet-copy]');
  copyButton?.addEventListener('click', async () => {
    const text = `${sheetScript.textContent}\nCall +1 (833) 920-1299`;
    try {
      await navigator.clipboard.writeText(text);
      copyButton.textContent = 'Copied';
    } catch {
      copyButton.textContent = 'Copy failed. Select the text instead.';
    }
    window.setTimeout(() => { copyButton.textContent = 'Copy the sheet'; }, 2200);
  });

  // Sizing from the PSAI special-event chart: the smallest row at or above the crowd.
  const size = document.querySelector('[data-size]');
  if (size) {
    const chart = JSON.parse(size.dataset.psaiChart);
    const people = size.querySelector('[data-size-people]');
    const hours = size.querySelector('[data-size-hours]');
    const result = size.querySelector('[data-size-result]');
    const apply = size.querySelector('[data-size-apply]');
    let current = null;
    const compute = () => {
      const crowd = Math.max(1, Math.floor(Number(people.value)) || 1);
      const h = Number(hours.value);
      const row = chart.find(([rowCrowd]) => rowCrowd >= crowd);
      if (!row) {
        current = null;
        result.innerHTML = '<strong>Over 20,000 people</strong><small>Ask the vendor for a site plan; the chart here stops at 20,000.</small>';
        apply.disabled = true;
        return;
      }
      const units = row[h];
      const accessible = Math.max(1, Math.ceil(units * 0.05));
      current = { people: crowd, hours: h, chart: units };
      result.innerHTML = `<strong>${plural(units, 'unit', 'units')}</strong><small>Including at least ${plural(accessible, 'accessible unit', 'accessible units')}. PSAI chart, ${row[0].toLocaleString('en-US')}-person row, ${plural(h, 'hour', 'hours')}, no pumping during the event.</small>`;
      apply.disabled = false;
    };
    size.addEventListener('input', compute);
    size.addEventListener('change', compute);
    apply.addEventListener('click', () => {
      if (!current) return;
      Object.assign(sheet, current);
      save();
      render();
      apply.textContent = 'Added to your call sheet';
      window.setTimeout(() => { apply.textContent = 'Put this on my call sheet'; }, 2200);
    });
    if (sheet.people) people.value = sheet.people;
    if (sheet.hours) hours.value = sheet.hours;
    compute();
  }

  // The summary chip shows between the page head and the sheet itself.
  const head = document.querySelector('[data-cat-hero], [data-page-head]');
  if (head) new IntersectionObserver(([entry]) => { headInView = entry.isIntersecting; updateMini(); }, { threshold: 0.15 }).observe(head);
  if (sheetSection) new IntersectionObserver(([entry]) => { sheetInView = entry.isIntersecting; updateMini(); }).observe(sheetSection);

  render();
}
