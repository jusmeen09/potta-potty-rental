const stateSearch = document.querySelector('[data-state-search]');
const stateCards = [...document.querySelectorAll('[data-state-card]')];
const stateRegions = [...document.querySelectorAll('[data-state-region]')];
const stateEmpty = document.querySelector('[data-state-empty]');

if (stateSearch && stateCards.length) {
  stateSearch.addEventListener('input', () => {
    const query = stateSearch.value.trim().toLowerCase();
    let visibleCount = 0;

    stateCards.forEach((card) => {
      const matches = !query || card.dataset.stateName?.includes(query);
      card.hidden = !matches;
      if (matches) visibleCount += 1;
    });

    stateRegions.forEach((region) => {
      region.hidden = !region.querySelector('[data-state-card]:not([hidden])');
    });

    if (stateEmpty) stateEmpty.hidden = visibleCount > 0;
  });
}
