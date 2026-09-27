/* =========================================================
   ScentFinder – compare.js
   The Compare page (compare.html).
   Shows up to 3 perfumes side by side. The list itself is
   saved in localStorage by main.js (getCompareList etc.),
   so it is shared with the compare buttons on every page.
   ========================================================= */

'use strict';

/* Notes that appear in every selected perfume */
function getSharedNotes(perfumes) {
  if (perfumes.length < 2) return [];
  const noteSets = perfumes.map(p => new Set([...p.topNotes, ...p.middleNotes, ...p.baseNotes]));
  return [...noteSets[0]].filter(note => noteSets.every(set => set.has(note)));
}

function noteChips(notes, shared) {
  return notes
    .map(note => `<span class="note-chip${shared.includes(note) ? ' is-shared' : ''}">${escapeHTML(note)}</span>`)
    .join('');
}

/* Adds a small gold tag to the "best" value in a row */
function bestTag(isBest, text) {
  return isBest ? ` <span class="best-tag">${text}</span>` : '';
}

function renderComparePage() {
  const view = $('#compare-view');
  if (!view) return;

  const perfumes = getCompareList().map(getPerfumeById).filter(Boolean);
  const select = $('#compare-add');

  // Keep the picker in sync: hide perfumes already chosen, disable when full
  $all('option[value]', select).forEach(option => {
    if (option.value) option.hidden = isInCompare(option.value);
  });
  select.disabled = perfumes.length >= COMPARE_LIMIT;
  $('#compare-status').textContent = perfumes.length >= COMPARE_LIMIT
    ? `You have chosen ${COMPARE_LIMIT} perfumes, the maximum. Remove one to add another.`
    : `${perfumes.length} of ${COMPARE_LIMIT} chosen.`;

  if (!perfumes.length) {
    view.innerHTML = `
      <div class="empty-state">
        <h2>Nothing to compare yet</h2>
        <p>Choose perfumes above, tap the compare icon on any perfume card, or let the quiz pick three for you.</p>
        <div class="cta-actions">
          <a href="perfumes.html" class="btn btn-outline">Browse Perfumes</a>
          <a href="quiz.html" class="btn btn-gold">Take the Scent Quiz</a>
        </div>
      </div>`;
    return;
  }

  const shared = getSharedNotes(perfumes);
  const longest = Math.max(...perfumes.map(p => p.longevityHours));
  const cheapest = Math.min(...perfumes.map(p => p.priceMin));
  const several = perfumes.length > 1;

  // Each row: a label and how to show that value for one perfume
  const rows = [
    ['Gender', p => p.gender],
    ['Category', p => p.category],
    ['Fragrance family', p => p.fragranceFamily],
    ['Top notes', p => noteChips(p.topNotes, shared)],
    ['Middle notes', p => noteChips(p.middleNotes, shared)],
    ['Base notes', p => noteChips(p.baseNotes, shared)],
    ['Longevity', p => p.longevity + bestTag(several && p.longevityHours === longest, 'Longest')],
    ['Sillage', p => p.sillage],
    ['Est. price', p => p.price + bestTag(several && p.priceMin === cheapest, 'Lowest')],
    ['Best seasons', p => (p.season.length === 4 ? 'All year' : p.season.join(', '))],
    ['Occasions', p => p.occasions.join(', ')],
    ['Sellers listed', p => {
      const count = p.stores.length;
      return count ? pluralize(count, 'store') : '<span class="muted">None confirmed yet</span>';
    }]
  ];

  view.innerHTML = `
    ${several && shared.length ? `
      <p class="notice compare-shared">${icon('sparkle')}<span><strong>Shared notes:</strong> ${shared.map(escapeHTML).join(', ')}. They are highlighted in gold below.</span></p>` : ''}
    ${!several ? `<p class="notice compare-shared">${icon('info')}<span>Add at least one more perfume to see them side by side.</span></p>` : ''}

    <div class="compare-scroll" tabindex="0" role="region" aria-label="Comparison table, scroll sideways on small screens">
      <table class="compare-table">
        <caption class="visually-hidden">Side-by-side comparison of the selected perfumes</caption>
        <thead>
          <tr>
            <th scope="col"><span class="visually-hidden">Feature</span></th>
            ${perfumes.map(p => `
              <th scope="col">
                <div class="compare-head">
                  <button class="icon-btn compare-remove" type="button" data-compare="${p.id}" aria-label="Remove ${escapeHTML(p.name)} from compare">${icon('close')}</button>
                  <img src="${p.image}" alt="Bottle illustration for ${escapeHTML(p.brand)} ${escapeHTML(p.name)}" width="400" height="480">
                  <span class="label">${escapeHTML(p.brand)}</span>
                  <a class="compare-name" href="perfume-details.html?id=${p.id}">${escapeHTML(p.name)}</a>
                  <span class="muted small">${p.concentration}</span>
                </div>
              </th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${rows.map(([label, getValue]) => `
            <tr>
              <th scope="row">${label}</th>
              ${perfumes.map(p => `<td>${getValue(p)}</td>`).join('')}
            </tr>`).join('')}
          <tr>
            <th scope="row"><span class="visually-hidden">Actions</span></th>
            ${perfumes.map(p => `
              <td><a href="perfume-details.html?id=${p.id}#where-to-buy" class="btn btn-outline btn-sm">Where to buy</a></td>`).join('')}
          </tr>
        </tbody>
      </table>
    </div>`;
}

function initComparePage() {
  const select = $('#compare-add');
  if (!select) return;

  // Fill the picker with every perfume, sorted by brand then name
  [...PERFUMES]
    .sort((a, b) => a.brand.localeCompare(b.brand) || a.name.localeCompare(b.name))
    .forEach(perfume => {
      const option = document.createElement('option');
      option.value = perfume.id;
      option.textContent = `${perfume.brand} ${perfume.name}`;
      select.appendChild(option);
    });

  select.addEventListener('change', () => {
    if (select.value) toggleCompare(Number(select.value));
    select.value = '';
  });

  renderComparePage();
}
