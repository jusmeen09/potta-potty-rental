// PSAI special-event chart (extended breakdown), transcribed from
// https://assets.noviams.com/novi-file-uploads/psai/PDFs_and_Documents/psai-extended-chart-2f39b55e.pdf
// Units required with no pumping during the event, 50/50 mix of men and women.
// Each row: [average crowd, units for 1..10 hours]. Rows up to 20,000 cover the
// events this site's callers plan; larger crowds are referred to the vendor.
export const psaiChart = [
  [500, 2, 4, 4, 5, 6, 7, 9, 9, 10, 12],
  [1000, 4, 6, 8, 8, 9, 9, 11, 12, 13, 13],
  [2000, 5, 6, 9, 12, 14, 16, 18, 20, 23, 25],
  [3000, 6, 9, 12, 16, 20, 24, 26, 30, 34, 38],
  [4000, 8, 13, 16, 22, 25, 30, 35, 40, 45, 50],
  [5000, 12, 15, 20, 25, 31, 38, 44, 50, 56, 63],
  [10000, 15, 25, 38, 50, 63, 75, 88, 100, 113, 125],
  [15000, 20, 38, 56, 75, 94, 113, 131, 150, 169, 188],
  [20000, 25, 50, 75, 100, 125, 150, 175, 200, 225, 250],
];

const hourOptions = Array.from({ length: 10 }, (_, index) => index + 1)
  .map((hours) => `<option value="${hours}"${hours === 4 ? ' selected' : ''}>${hours} hour${hours === 1 ? '' : 's'}</option>`)
  .join('');

// Markup only; script.js reads data-psai-chart and fills the live result.
export const sizingCalculator = (phoneHref, phoneDisplay) => `<div class="sizing-calc" data-sizing-calc data-psai-chart='${JSON.stringify(psaiChart)}'>
  <fieldset class="sizing-calc-mode">
    <legend>Site type</legend>
    <label><input type="radio" name="sizing-mode" value="event" checked data-sizing-mode /> Event</label>
    <label><input type="radio" name="sizing-mode" value="construction" data-sizing-mode /> Construction site</label>
  </fieldset>
  <div class="sizing-calc-fields" data-sizing-fields="event">
    <label><span>Average crowd</span><input type="number" inputmode="numeric" min="1" max="20000" step="1" value="200" data-sizing-crowd /></label>
    <label><span>Hours at the event</span><select data-sizing-hours>${hourOptions}</select></label>
    <label><span>Separate restroom locations</span><input type="number" inputmode="numeric" min="1" max="20" step="1" value="1" data-sizing-clusters /></label>
  </div>
  <div class="sizing-calc-fields" data-sizing-fields="construction" hidden>
    <label><span>Workers on site</span><input type="number" inputmode="numeric" min="1" max="5000" step="1" value="25" data-sizing-workers /></label>
  </div>
  <output class="sizing-calc-result" aria-live="polite" data-sizing-result>Use the PSAI chart and OSHA table below to estimate your count.</output>
  <a class="btn btn-call sizing-calc-call" href="tel:${phoneHref}">☎ Call ${phoneDisplay}</a>
  <small class="sizing-calc-note">A starting point from published charts, not a permit minimum. Alcohol, heat, peak arrivals, food service, and local permit conditions can raise the count; confirm the plan with your vendor.</small>
</div>`;
