/* =========================================================
   ScentFinder – stores.js
   1. Store sample data (STORES)
   2. Verification labels and what they mean
   3. Store templates (cards, seller rows, store modal)
   4. Trusted Stores page logic

   The stores below are real Malaysian sellers, taken from
   public information (checked September 2026).
   Labels follow one rule: a store is only called
   "Official Brand Store" or "Verified Retailer" when an
   official source confirms it. Everyone else is a
   "Listed Seller" until you confirm them yourself, for
   example on the brand's official store locator.
   Ratings are left empty (null) because we have no
   reliable source for them.
   ========================================================= */

'use strict';

/* ---------------------------------------------------------
   1. STORE DATA
   link: "#" means there is no real website yet (demo).
   rating: null means "Not rated".
   --------------------------------------------------------- */
const STORES = [
  {
    id: 1,
    name: 'Dior Malaysia',
    platform: 'Official Website',
    location: 'Kuala Lumpur',
    type: 'Official Brand Store',
    verification: 'Official Brand Store',
    rating: null,
    description: 'Dior\'s own online boutique for Malaysia, plus Dior boutiques such as Dior Beauty at Pavilion Kuala Lumpur. Sells Dior perfumes only.',
    link: 'https://www.dior.com/en_my',
    isDemo: false
  },
  {
    id: 2,
    name: 'Chanel Malaysia',
    platform: 'Official Website',
    location: 'Kuala Lumpur, Selangor & Penang',
    type: 'Official Brand Store',
    verification: 'Official Brand Store',
    rating: null,
    description: 'Chanel\'s own Malaysian website, with fragrance and beauty boutiques at Pavilion KL, Mid Valley Megamall, Sunway Pyramid, IOI City Mall and Gurney Plaza Penang. Sells Chanel perfumes only.',
    link: 'https://www.chanel.com/my/fragrance/',
    isDemo: false
  },
  {
    id: 3,
    name: 'Sephora Malaysia',
    platform: 'Website & Stores',
    location: 'Nationwide',
    type: 'Established Perfume Retailer',
    verification: 'Listed Seller',
    rating: null,
    description: 'Well-known beauty retailer with stores and an online shop, selling fragrances from many brands including Dior. Confirm authorised status on the brand\'s store locator.',
    link: 'https://www.sephora.my/categories/fragrance',
    isDemo: false
  },
  {
    id: 4,
    name: 'Parkson',
    platform: 'Website & Stores',
    location: 'Nationwide',
    type: 'Established Perfume Retailer',
    verification: 'Listed Seller',
    rating: null,
    description: 'Department store chain with an official online store. Its fragrance section includes brands such as YSL Beauty.',
    link: 'https://parksononline.com.my/beauty/fragrances.html',
    isDemo: false
  },
  {
    id: 5,
    name: 'ZALORA Malaysia',
    platform: 'Online Store',
    location: 'Online (Nationwide)',
    type: 'Online Marketplace Seller',
    verification: 'Listed Seller',
    rating: null,
    description: 'Online fashion and beauty store with Dior and Chanel perfume sections. Check who the seller is on each product page before buying.',
    link: 'https://www.zalora.com.my/',
    isDemo: false
  }
];

/* ---------------------------------------------------------
   2. VERIFICATION LABELS
   Order = most trusted first. Descriptions explain what
   each label means so users are never misled.
   --------------------------------------------------------- */
const VERIFICATION_INFO = {
  'Official Brand Store': {
    className: 'badge-official',
    icon: 'shield',
    description: 'Run by the perfume brand itself, such as the brand\'s own website or boutique. Usually the safest place to buy.'
  },
  'Verified Retailer': {
    className: 'badge-verified',
    icon: 'check',
    description: 'A retailer whose authorised status has been confirmed from an official source, such as the brand\'s store locator.'
  },
  'Community Recommended': {
    className: 'badge-community',
    icon: 'users',
    description: 'Recommended by fragrance buyers. Helpful, but it is not an official verification.'
  },
  'Listed Seller': {
    className: 'badge-listed',
    icon: 'info',
    description: 'Listed in the directory but not verified. Check reviews, return policy and seller details carefully before buying.'
  }
};

const VERIFICATION_ORDER = Object.keys(VERIFICATION_INFO);

/* ---------------------------------------------------------
   3. HELPERS & TEMPLATES
   --------------------------------------------------------- */
function getStoreById(id) {
  return STORES.find(store => store.id === Number(id));
}

/* Stores for one perfume, most verified first */
function getStoresForPerfume(perfume) {
  return perfume.stores
    .map(getStoreById)
    .filter(Boolean)
    .sort((a, b) => VERIFICATION_ORDER.indexOf(a.verification) - VERIFICATION_ORDER.indexOf(b.verification)
      || (b.rating || 0) - (a.rating || 0));
}

function getPerfumesAtStore(storeId) {
  return PERFUMES.filter(perfume => perfume.stores.includes(Number(storeId)));
}

/* Draws a simple gold monogram from the store's initials.
   (Real brand logos are trademarks, so we don't copy them.) */
function storeLogo(store, size = 56) {
  const initials = store.name
    .split(/\s+/)
    .filter(word => /^[A-Za-z]/.test(word))
    .slice(0, 2)
    .map(word => word[0].toUpperCase())
    .join('');
  return `
    <svg class="store-logo" width="${size}" height="${size}" viewBox="0 0 120 120" role="img" aria-label="${escapeHTML(store.name)} monogram">
      <circle cx="60" cy="60" r="60" fill="#161514"/>
      <circle cx="60" cy="60" r="53" fill="none" stroke="#C6A15B" stroke-width="1.2"/>
      <text x="60" y="60" dy=".36em" text-anchor="middle" fill="#C6A15B"
        font-family="'Bodoni Moda', Didot, Georgia, serif" font-size="${initials.length > 1 ? 36 : 44}">${initials}</text>
    </svg>`;
}

function getVerificationBadge(label) {
  const info = VERIFICATION_INFO[label] || VERIFICATION_INFO['Listed Seller'];
  return `<span class="badge ${info.className}">${icon(info.icon)}${escapeHTML(label)}</span>`;
}

function formatRating(store) {
  if (!store.rating) return '<span class="muted">Not rated</span>';
  return `<span class="rating">${icon('star', 'icon-fill')}${store.rating.toFixed(1)}</span>`;
}

/* Real links open in a new tab; demo links ("#") show a message instead */
function storeLinkButton(store, label, classes) {
  if (store.link && store.link !== '#') {
    return `<a href="${store.link}" class="${classes}" target="_blank" rel="noopener noreferrer">${label} ${icon('external')}<span class="visually-hidden">(opens in a new tab)</span></a>`;
  }
  return `<button type="button" class="${classes}" data-store-link="${store.id}">${label} ${icon('external')}</button>`;
}

function createStoreCard(store, index = 0) {
  return `
    <article class="store-card" style="--i:${index}">
      <div class="store-card-head">
        ${storeLogo(store, 56)}
        <div>
          <h3>${escapeHTML(store.name)}</h3>
          <p class="store-location">${icon('mapPin')}${escapeHTML(store.location)}</p>
        </div>
      </div>
      <div class="store-badges">
        ${getVerificationBadge(store.verification)}
        ${store.type !== store.verification ? `<span class="tag">${store.type}</span>` : ''}
        ${store.isDemo ? '<span class="tag tag-demo">Sample data</span>' : ''}
      </div>
      <p class="store-desc">${escapeHTML(store.description)}</p>
      <dl class="store-meta">
        <div><dt>Platform</dt><dd>${store.platform}</dd></div>
        <div><dt>Rating</dt><dd>${formatRating(store)}</dd></div>
      </dl>
      <div class="store-actions">
        <button class="btn btn-gold btn-sm" type="button" data-store-view="${store.id}">View Store</button>
        ${storeLinkButton(store, 'Website', 'btn btn-ghost btn-sm')}
      </div>
    </article>`;
}

/* A compact row for the "Where to Buy" list on the details page */
function createSellerRow(store) {
  return `
    <article class="seller-row">
      ${storeLogo(store, 48)}
      <div class="seller-info">
        <h3 class="seller-name">${escapeHTML(store.name)}</h3>
        <p class="seller-sub">
          <span>${icon('store')}${store.platform}</span>
          <span>${icon('mapPin')}${escapeHTML(store.location)}</span>
        </p>
      </div>
      <div class="seller-status">
        ${getVerificationBadge(store.verification)}
        ${formatRating(store)}
      </div>
      <div class="seller-action">
        ${storeLinkButton(store, 'Visit Store', 'btn btn-outline btn-sm')}
      </div>
    </article>`;
}

function openStoreModal(id) {
  const store = getStoreById(id);
  if (!store) return;

  const perfumes = getPerfumesAtStore(store.id);
  const info = VERIFICATION_INFO[store.verification];

  openModal(`
    <div class="store-modal">
      <div class="store-modal-head">
        ${storeLogo(store, 72)}
        <div>
          <h2 id="modal-title">${escapeHTML(store.name)}</h2>
          <p class="store-location">${icon('mapPin')}${escapeHTML(store.location)}</p>
        </div>
      </div>
      <div class="store-badges">
        ${getVerificationBadge(store.verification)}
        ${store.type !== store.verification ? `<span class="tag">${store.type}</span>` : ''}
        ${store.isDemo ? '<span class="tag tag-demo">Sample data</span>' : ''}
      </div>
      <p class="store-desc" style="margin-top: 1rem">${escapeHTML(store.description)}</p>
      <dl class="store-meta">
        <div><dt>Platform</dt><dd>${store.platform}</dd></div>
        <div><dt>Rating</dt><dd>${formatRating(store)}</dd></div>
      </dl>
      <p class="notice">${icon(info.icon)}<span><strong>${escapeHTML(store.verification)}:</strong> ${info.description}</span></p>
      <h3>Perfumes listed at this store</h3>
      <div class="store-perfume-links">
        ${perfumes.map(p => `<a href="perfume-details.html?id=${p.id}">${escapeHTML(p.brand)} ${escapeHTML(p.name)}</a>`).join('')}
      </div>
      <div class="modal-actions">
        ${storeLinkButton(store, 'Visit Store', 'btn btn-gold')}
        <button class="btn btn-ghost" type="button" data-close-modal>Close</button>
      </div>
    </div>`);
}

/* Home page: the three most trusted stores */
function renderFeaturedStores(selector, count = 3) {
  const container = $(selector);
  if (!container) return;

  const featured = [...STORES]
    .sort((a, b) => VERIFICATION_ORDER.indexOf(a.verification) - VERIFICATION_ORDER.indexOf(b.verification)
      || (b.rating || 0) - (a.rating || 0))
    .slice(0, count);

  container.innerHTML = featured.map(createStoreCard).join('');
}

/* Explains every verification label (Trusted Stores page) */
function renderVerificationLegend(selector) {
  const container = $(selector);
  if (!container) return;

  container.innerHTML = VERIFICATION_ORDER.map(label => `
    <div class="legend-item">
      ${getVerificationBadge(label)}
      <p>${VERIFICATION_INFO[label].description}</p>
    </div>`).join('');
}

/* ---------------------------------------------------------
   4. TRUSTED STORES PAGE
   --------------------------------------------------------- */
function initStoresPage() {
  const grid = $('#store-grid');
  if (!grid) return;

  const searchInput = $('#store-search');
  const locationSelect = $('#filter-location');
  const platformSelect = $('#filter-platform');
  const typeSelect = $('#filter-type');

  // Fill the dropdowns from the data so new stores appear automatically
  const unique = key => [...new Set(STORES.map(store => store[key]))].sort((a, b) => a.localeCompare(b));
  fillSelect(locationSelect, unique('location'));
  fillSelect(platformSelect, unique('platform'));
  fillSelect(typeSelect, unique('type'));

  function renderStores() {
    const query = normalizeText(searchInput.value.trim());
    const results = STORES.filter(store => {
      const text = normalizeText(`${store.name} ${store.description} ${store.location} ${store.platform} ${store.type}`);
      if (query && !text.includes(query)) return false;
      if (locationSelect.value !== 'all' && store.location !== locationSelect.value) return false;
      if (platformSelect.value !== 'all' && store.platform !== platformSelect.value) return false;
      if (typeSelect.value !== 'all' && store.type !== typeSelect.value) return false;
      return true;
    });

    grid.innerHTML = results.map(createStoreCard).join('');
    grid.hidden = results.length === 0;
    $('#store-empty').hidden = results.length > 0;
    $('#store-count').innerHTML = `Showing <strong>${results.length}</strong> of ${STORES.length} stores`;
  }

  searchInput.addEventListener('input', debounce(renderStores, 200));
  [locationSelect, platformSelect, typeSelect].forEach(select => select.addEventListener('change', renderStores));

  $all('[data-clear-stores]').forEach(button => {
    button.addEventListener('click', () => {
      searchInput.value = '';
      locationSelect.value = 'all';
      platformSelect.value = 'all';
      typeSelect.value = 'all';
      renderStores();
    });
  });

  renderVerificationLegend('#verification-legend');
  renderStores();
}
