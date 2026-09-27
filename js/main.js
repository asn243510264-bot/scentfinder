/* =========================================================
   ScentFinder – main.js
   Shared code used on every page:
    1. Settings
    2. Small helpers
    3. Icons
    4. Header, footer and global UI (search, favorites, modal)
    5. Header scroll effect & mobile menu
    6. Search overlay & search suggestions
    7. Favorites and Compare list (saved in localStorage)
    8. Modal, toast & keyboard support
    9. Back-to-top, smooth scrolling & scroll animations
   10. Page setup (home, guide) and the page "router"

   Script order in every HTML page:
     perfumes.js → stores.js → main.js  (all with "defer")
   ========================================================= */

'use strict';

/* ---------------------------------------------------------
   1. SETTINGS
   --------------------------------------------------------- */
const NAV_LINKS = [
  { page: 'home', label: 'Home', href: 'index.html' },
  { page: 'perfumes', label: 'Perfumes', href: 'perfumes.html' },
  { page: 'quiz', label: 'Scent Quiz', href: 'quiz.html' },
  { page: 'brands', label: 'Brands', href: 'brands.html' },
  { page: 'stores', label: 'Trusted Stores', href: 'stores.html' },
  { page: 'guide', label: 'Perfume Guide', href: 'guide.html' },
  { page: 'about', label: 'About', href: 'about.html' }
];

const FAVORITES_KEY = 'scentfinder-favorites';
const COMPARE_KEY = 'scentfinder-compare';
const COMPARE_LIMIT = 3;
const MOBILE_NAV_BREAKPOINT = 1080;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let returnFocusTo = null;   // element to focus again after closing a popup
let toastTimer = null;
let revealObserver = null;

/* ---------------------------------------------------------
   2. SMALL HELPERS
   --------------------------------------------------------- */
function $(selector, scope = document) {
  return scope.querySelector(selector);
}

function $all(selector, scope = document) {
  return Array.from(scope.querySelectorAll(selector));
}

/* Makes text safe to put inside innerHTML */
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[char]));
}

/* Lowercase and remove accents, so "gio" matches "Giò" */
function normalizeText(value) {
  return String(value).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/* Waits until the user stops typing before running the function */
function debounce(callback, delay = 200) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...args), delay);
  };
}

function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

/* Wraps the first matching word in <mark> for search suggestions */
function highlightMatch(text, query) {
  const word = query.trim().split(/\s+/)[0];
  const index = word ? normalizeText(text).indexOf(normalizeText(word)) : -1;
  if (index === -1) return escapeHTML(text);
  return escapeHTML(text.slice(0, index))
    + '<mark>' + escapeHTML(text.slice(index, index + word.length)) + '</mark>'
    + escapeHTML(text.slice(index + word.length));
}

/* ---------------------------------------------------------
   3. ICONS (simple inline SVG line icons)
   --------------------------------------------------------- */
const ICON_PATHS = {
  search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
  heart: '<path d="M12 20.5s-7.5-4.6-9.2-9.3C1.6 7.9 3.8 4.5 7.2 4.5c2 0 3.6 1.1 4.8 2.8 1.2-1.7 2.8-2.8 4.8-2.8 3.4 0 5.6 3.4 4.4 6.7-1.7 4.7-9.2 9.3-9.2 9.3z"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h10"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  arrowUp: '<path d="M12 19V5M5.5 11.5L12 5l6.5 6.5"/>',
  star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
  mapPin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  external: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  shield: '<path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.3-7.5 9.5-4.3-1.2-7.5-4.9-7.5-9.5V6z"/><path d="M9 12l2 2 4-4"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  filter: '<path d="M4 6h16M7 12h10M10 18h4"/>',
  droplet: '<path d="M12 3s6 6.4 6 11a6 6 0 0 1-12 0c0-4.6 6-11 6-11z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  wind: '<path d="M3 8h11a3 3 0 1 0-3-3M3 16h14a3 3 0 1 1-3 3M3 12h17"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  tag: '<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
  store: '<path d="M3 9l2-5h14l2 5M3 9h18v2a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0zM5 13.5V20h14v-6.5"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5a6.5 6.5 0 0 1 3.5 5.5"/>',
  box: '<path d="M3 7.5L12 3l9 4.5v9L12 21l-9-4.5z"/><path d="M3 7.5L12 12l9-4.5M12 12v9"/>',
  barcode: '<path d="M4 6v12M7 6v12M10 6v12M14 6v12M16 6v12M20 6v12"/>',
  alert: '<path d="M12 3.5l9.5 16.5h-19z"/><path d="M12 10v4M12 17h.01"/>',
  compare: '<rect x="3" y="4" width="7" height="16" rx="1.5"/><rect x="14" y="4" width="7" height="16" rx="1.5"/>',
  sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 16l.7 1.8 1.8.7-1.8.7L19 21l-.7-1.8-1.8-.7 1.8-.7z"/>',
  bottle: '<path d="M10 3h4v3h-4zM9 6h6l1.5 3v11a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1V9z"/>'
};

function icon(name, extraClass = '') {
  return `<svg class="icon ${extraClass}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${ICON_PATHS[name] || ''}</svg>`;
}

/* ---------------------------------------------------------
   4. HEADER, FOOTER & GLOBAL UI
   Written once here so all pages share the same markup.
   --------------------------------------------------------- */
function renderHeader() {
  const header = $('#site-header');
  if (!header) return;

  const currentPage = document.body.dataset.page;
  const links = NAV_LINKS.map(link => {
    const isCurrent = link.page === currentPage;
    return `<li><a href="${link.href}" class="nav-link${isCurrent ? ' is-active' : ''}"${isCurrent ? ' aria-current="page"' : ''}>${link.label}</a></li>`;
  }).join('');

  header.innerHTML = `
    <div class="container header-inner">
      <a href="index.html" class="logo" aria-label="ScentFinder home">Scent<span>Finder</span></a>
      <nav class="main-nav" id="main-nav" aria-label="Main navigation">
        <ul class="nav-list">${links}</ul>
      </nav>
      <div class="header-actions">
        <button class="icon-btn" type="button" data-open-search aria-label="Search perfumes">${icon('search')}</button>
        <a class="icon-btn" href="compare.html" aria-label="Compare perfumes">
          ${icon('compare')}<span class="fav-count" data-compare-count hidden>0</span>
        </a>
        <button class="icon-btn" type="button" data-open-favorites aria-label="Open favorites">
          ${icon('heart')}<span class="fav-count" data-fav-count hidden>0</span>
        </button>
        <button class="icon-btn menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="main-nav">${icon('menu')}</button>
      </div>
    </div>`;
}

function renderFooter() {
  const footer = $('#site-footer');
  if (!footer) return;

  footer.innerHTML = `
    <div class="container footer-grid">
      <div class="footer-brand">
        <a href="index.html" class="logo">Scent<span>Finder</span></a>
        <p>A perfume discovery platform that helps you find original fragrances and reputable places to buy them in Malaysia. ScentFinder does not sell perfumes.</p>
      </div>
      <div class="footer-col">
        <h2>Explore</h2>
        <ul>
          <li><a href="perfumes.html">Perfumes</a></li>
          <li><a href="quiz.html">Scent Quiz</a></li>
          <li><a href="compare.html">Compare</a></li>
          <li><a href="brands.html">Brands</a></li>
          <li><a href="stores.html">Trusted Stores</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h2>Categories</h2>
        <ul>
          <li><a href="perfumes.html?category=Men">Men</a></li>
          <li><a href="perfumes.html?category=Women">Women</a></li>
          <li><a href="perfumes.html?category=Unisex">Unisex</a></li>
          <li><a href="perfumes.html?category=Niche">Niche</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h2>Learn</h2>
        <ul>
          <li><a href="guide.html">Perfume Guide</a></li>
          <li><a href="index.html#how-it-works">How it works</a></li>
          <li><a href="about.html">About</a></li>
        </ul>
      </div>
    </div>
    <div class="container footer-bottom">
      <p>&copy; ${new Date().getFullYear()} ScentFinder. A student web project for learning purposes.</p>
      <p>Prices are indicative and may change. Always confirm with the seller.</p>
    </div>`;
}

/* Search overlay, favorites drawer, modal, toast and back-to-top button */
function renderGlobalUI() {
  document.body.insertAdjacentHTML('beforeend', `
    <div class="search-overlay" id="search-overlay" role="dialog" aria-modal="true" aria-label="Search perfumes">
      <button class="icon-btn search-close" type="button" data-close-search aria-label="Close search">${icon('close')}</button>
      <div class="container search-overlay-inner">
        <form class="search-overlay-form" action="perfumes.html" method="get" role="search">
          ${icon('search')}
          <label for="overlay-search-input" class="visually-hidden">Search perfume, brand or fragrance</label>
          <input type="search" id="overlay-search-input" name="q" placeholder="Search perfume, brand or fragrance..." autocomplete="off">
        </form>
        <ul class="suggestions" id="overlay-suggestions"></ul>
        <p class="search-hint">Try a note like vanilla or oud, a brand like Dior, or a family like woody. Press Enter to see all results.</p>
      </div>
    </div>

    <div class="drawer-backdrop" data-close-favorites></div>
    <aside class="favorites-drawer" id="favorites-drawer" role="dialog" aria-modal="true" aria-labelledby="favorites-title">
      <div class="drawer-head">
        <h2 id="favorites-title">Your favorites</h2>
        <button class="icon-btn" type="button" data-close-favorites aria-label="Close favorites">${icon('close')}</button>
      </div>
      <div class="favorites-list" id="favorites-list"></div>
    </aside>

    <div class="modal" id="modal">
      <div class="modal-backdrop" data-close-modal></div>
      <div class="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="modal-title" tabindex="-1">
        <button class="icon-btn modal-close" type="button" data-close-modal aria-label="Close">${icon('close')}</button>
        <div id="modal-content"></div>
      </div>
    </div>

    <div class="compare-tray" id="compare-tray" role="region" aria-label="Perfumes selected for comparison"></div>

    <div class="toast" id="toast" role="status" aria-live="polite"></div>

    <button class="back-to-top" id="back-to-top" type="button" aria-label="Back to top">${icon('arrowUp')}</button>
  `);
}

/* Stops the page behind a popup from scrolling */
function updateScrollLock() {
  const popupOpen = $('.search-overlay.is-open, .favorites-drawer.is-open, .modal.is-open');
  const menuOpen = document.body.classList.contains('nav-open') && window.innerWidth <= MOBILE_NAV_BREAKPOINT;
  document.body.classList.toggle('no-scroll', Boolean(popupOpen) || menuOpen);
}

/* ---------------------------------------------------------
   5. HEADER SCROLL EFFECT & MOBILE MENU
   --------------------------------------------------------- */
function initHeader() {
  const header = $('#site-header');
  if (!header) return;
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 20);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function setMobileMenu(open) {
  const toggle = $('.menu-toggle');
  if (!toggle) return;
  document.body.classList.toggle('nav-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  toggle.innerHTML = icon(open ? 'close' : 'menu');
  updateScrollLock();
}

function initMobileMenu() {
  const toggle = $('.menu-toggle');
  if (!toggle) return;

  toggle.addEventListener('click', () => setMobileMenu(!document.body.classList.contains('nav-open')));
  $all('.nav-link').forEach(link => link.addEventListener('click', () => setMobileMenu(false)));

  window.addEventListener('resize', debounce(() => {
    if (window.innerWidth > MOBILE_NAV_BREAKPOINT) setMobileMenu(false);
  }, 150));
}

/* ---------------------------------------------------------
   6. SEARCH OVERLAY & SUGGESTIONS
   --------------------------------------------------------- */
function openSearch() {
  returnFocusTo = document.activeElement;
  setMobileMenu(false);
  $('#search-overlay').classList.add('is-open');
  updateScrollLock();
  setTimeout(() => $('#overlay-search-input').focus(), 50);
}

function closeSearch() {
  $('#search-overlay').classList.remove('is-open');
  updateScrollLock();
  if (returnFocusTo) returnFocusTo.focus();
}

/* Shows matching perfumes under a search input while the user types */
function attachSearchSuggestions(input, list) {
  const showSuggestions = debounce(() => {
    const query = input.value.trim();

    if (!query) {
      list.innerHTML = '';
      list.classList.remove('is-visible');
      return;
    }

    const results = getSearchSuggestions(query);
    const seeAllUrl = `perfumes.html?q=${encodeURIComponent(query)}`;

    list.innerHTML = results.length
      ? results.map(perfume => `
          <li class="suggestion-item">
            <a href="perfume-details.html?id=${perfume.id}">
              <img src="${perfume.image}" alt="" width="40" height="48">
              <span>
                <span class="suggestion-name">${highlightMatch(perfume.name, query)}</span>
                <span class="suggestion-meta">${highlightMatch(perfume.brand, query)}, ${perfume.fragranceFamily}</span>
              </span>
            </a>
          </li>`).join('')
        + `<li class="suggestion-item"><a class="suggestion-all" href="${seeAllUrl}">See all results for “${escapeHTML(query)}”</a></li>`
      : `<li class="suggestion-empty">No perfumes match “${escapeHTML(query)}”. Try a brand name or a note like rose.</li>`;

    list.classList.add('is-visible');
  }, 150);

  input.addEventListener('input', showSuggestions);
  input.addEventListener('focus', () => { if (input.value.trim()) showSuggestions(); });

  // Arrow keys move between suggestions
  input.addEventListener('keydown', event => {
    if (event.key === 'ArrowDown') {
      const first = $('a', list);
      if (first) { event.preventDefault(); first.focus(); }
    }
  });

  list.addEventListener('keydown', event => {
    const links = $all('a', list);
    const index = links.indexOf(document.activeElement);
    if (event.key === 'ArrowDown' && index < links.length - 1) {
      event.preventDefault();
      links[index + 1].focus();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      (index > 0 ? links[index - 1] : input).focus();
    }
  });
}

function initSearch() {
  attachSearchSuggestions($('#overlay-search-input'), $('#overlay-suggestions'));
}

/* ---------------------------------------------------------
   7. FAVORITES (stored in the browser with localStorage)
   --------------------------------------------------------- */
function getFavorites() {
  try {
    const saved = JSON.parse(localStorage.getItem(FAVORITES_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch (error) {
    return [];
  }
}

function saveFavorites(favorites) {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    showToast('Favorites could not be saved in this browser.');
  }
}

function isFavorite(id) {
  return getFavorites().includes(Number(id));
}

function toggleFavorite(id) {
  const perfume = getPerfumeById(id);
  if (!perfume) return;

  let favorites = getFavorites();
  if (favorites.includes(perfume.id)) {
    favorites = favorites.filter(favId => favId !== perfume.id);
    showToast(`${perfume.name} removed from favorites`);
  } else {
    favorites.push(perfume.id);
    showToast(`${perfume.name} saved to favorites`);
  }

  saveFavorites(favorites);
  updateFavoriteUI();
}

/* Updates every heart button, the header counter and the drawer list */
function updateFavoriteUI() {
  const favorites = getFavorites();

  $all('[data-fav-count]').forEach(badge => {
    badge.textContent = favorites.length;
    badge.hidden = favorites.length === 0;
  });

  $all('[data-favorite]:not(.fav-remove)').forEach(button => {
    const id = Number(button.dataset.favorite);
    const saved = favorites.includes(id);
    const label = $('.btn-label', button);

    button.classList.toggle('is-favorite', saved);
    button.setAttribute('aria-pressed', String(saved));

    if (label) {
      label.textContent = saved ? 'Saved to favorites' : 'Save to favorites';
    } else {
      const perfume = getPerfumeById(id);
      button.setAttribute('aria-label', `${saved ? 'Remove' : 'Add'} ${perfume.name} ${saved ? 'from' : 'to'} favorites`);
    }
  });

  renderFavoritesList();
}

function renderFavoritesList() {
  const list = $('#favorites-list');
  if (!list) return;

  const favorites = getFavorites().map(getPerfumeById).filter(Boolean);

  if (!favorites.length) {
    list.innerHTML = `
      <div class="drawer-empty">
        ${icon('heart')}
        <p>No favorites yet</p>
        <p>Tap the heart on any perfume to save it here. Favorites stay in this browser.</p>
        <a href="perfumes.html" class="btn btn-outline btn-sm">Explore Perfumes</a>
      </div>`;
    return;
  }

  list.innerHTML = favorites.map(perfume => `
    <article class="fav-item">
      <img src="${perfume.image}" alt="" width="60" height="72">
      <div>
        <p class="label">${escapeHTML(perfume.brand)}</p>
        <h3 class="fav-item-name"><a href="perfume-details.html?id=${perfume.id}">${escapeHTML(perfume.name)}</a></h3>
        <p class="fav-item-price">${perfume.price}</p>
      </div>
      <button class="icon-btn fav-remove" type="button" data-favorite="${perfume.id}" aria-label="Remove ${escapeHTML(perfume.name)} from favorites">${icon('close')}</button>
    </article>`).join('');
}

function openFavorites() {
  returnFocusTo = document.activeElement;
  setMobileMenu(false);
  renderFavoritesList();
  $('#favorites-drawer').classList.add('is-open');
  $('.drawer-backdrop').classList.add('is-open');
  updateScrollLock();
  setTimeout(() => $('#favorites-drawer .icon-btn').focus(), 50);
}

function closeFavorites() {
  $('#favorites-drawer').classList.remove('is-open');
  $('.drawer-backdrop').classList.remove('is-open');
  updateScrollLock();
  if (returnFocusTo) returnFocusTo.focus();
}

/* ---------------------------------------------------------
   7b. COMPARE LIST (up to 3 perfumes, saved in localStorage)
   --------------------------------------------------------- */
function getCompareList() {
  try {
    const saved = JSON.parse(localStorage.getItem(COMPARE_KEY));
    return Array.isArray(saved) ? saved.filter(id => getPerfumeById(id)).slice(0, COMPARE_LIMIT) : [];
  } catch (error) {
    return [];
  }
}

function saveCompareList(list) {
  try {
    localStorage.setItem(COMPARE_KEY, JSON.stringify(list.slice(0, COMPARE_LIMIT)));
  } catch (error) {
    showToast('The compare list could not be saved in this browser.');
  }
}

function isInCompare(id) {
  return getCompareList().includes(Number(id));
}

function toggleCompare(id) {
  const perfume = getPerfumeById(id);
  if (!perfume) return;

  let list = getCompareList();
  if (list.includes(perfume.id)) {
    list = list.filter(item => item !== perfume.id);
    showToast(`${perfume.name} removed from compare`);
  } else if (list.length >= COMPARE_LIMIT) {
    showToast(`You can compare up to ${COMPARE_LIMIT} perfumes. Remove one first.`);
    return;
  } else {
    list.push(perfume.id);
    showToast(`${perfume.name} added to compare`);
  }

  saveCompareList(list);
  updateCompareUI();
}

function clearCompare() {
  saveCompareList([]);
  updateCompareUI();
  showToast('Compare list cleared');
}

/* Updates compare buttons, the header counter, the tray and the compare page */
function updateCompareUI() {
  const list = getCompareList();

  $all('[data-compare-count]').forEach(badge => {
    badge.textContent = list.length;
    badge.hidden = list.length === 0;
  });

  $all('[data-compare]:not(.compare-tray-remove):not(.compare-remove)').forEach(button => {
    const id = Number(button.dataset.compare);
    const selected = list.includes(id);
    const label = $('.btn-label', button);

    button.classList.toggle('is-selected', selected);
    button.setAttribute('aria-pressed', String(selected));

    if (label) {
      label.textContent = selected ? 'Added to compare' : 'Add to compare';
    } else {
      const perfume = getPerfumeById(id);
      button.setAttribute('aria-label', `${selected ? 'Remove' : 'Add'} ${perfume.name} ${selected ? 'from' : 'to'} compare`);
    }
  });

  renderCompareTray();

  if (document.body.dataset.page === 'compare' && typeof renderComparePage === 'function') {
    renderComparePage();
  }
}

/* Small bar at the bottom of the screen showing the selected perfumes */
function renderCompareTray() {
  const tray = $('#compare-tray');
  if (!tray) return;

  const perfumes = getCompareList().map(getPerfumeById).filter(Boolean);
  const show = perfumes.length > 0 && document.body.dataset.page !== 'compare';

  tray.classList.toggle('is-visible', show);
  document.body.classList.toggle('has-compare-tray', show);
  if (!show) {
    tray.innerHTML = '';
    return;
  }

  const emptySlots = Array.from({ length: COMPARE_LIMIT - perfumes.length },
    () => '<span class="compare-tray-slot" aria-hidden="true">+</span>').join('');

  tray.innerHTML = `
    <div class="compare-tray-items">
      ${perfumes.map(perfume => `
        <div class="compare-tray-item">
          <img src="${perfume.image}" alt="" width="34" height="40">
          <span>${escapeHTML(perfume.name)}</span>
          <button class="compare-tray-remove" type="button" data-compare="${perfume.id}" aria-label="Remove ${escapeHTML(perfume.name)} from compare">${icon('close')}</button>
        </div>`).join('')}
      ${emptySlots}
    </div>
    <div class="compare-tray-actions">
      <button class="link-btn" type="button" data-compare-clear>Clear</button>
      <a class="btn btn-gold btn-sm" href="compare.html">Compare (${perfumes.length})</a>
    </div>`;
}

/* ---------------------------------------------------------
   8. MODAL, TOAST & KEYBOARD SUPPORT
   --------------------------------------------------------- */
function openModal(html) {
  returnFocusTo = document.activeElement;
  $('#modal-content').innerHTML = html;
  $('#modal').classList.add('is-open');
  updateScrollLock();
  $('.modal-dialog').scrollTop = 0;
  setTimeout(() => $('.modal-dialog').focus(), 50);
}

function closeModal() {
  $('#modal').classList.remove('is-open');
  updateScrollLock();
  if (returnFocusTo) returnFocusTo.focus();
}

function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 3200);
}

/* Keeps Tab key focus inside an open popup */
function trapFocus(container, event) {
  const focusable = $all('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])', container)
    .filter(element => element.getClientRects().length > 0);
  if (!focusable.length) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && (document.activeElement === first || !container.contains(document.activeElement))) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function initKeyboard() {
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      if ($('#modal').classList.contains('is-open')) closeModal();
      else if ($('#search-overlay').classList.contains('is-open')) closeSearch();
      else if ($('#favorites-drawer').classList.contains('is-open')) closeFavorites();
      else if (document.body.classList.contains('nav-open')) {
        setMobileMenu(false);
        $('.menu-toggle').focus();
      }
      $all('.suggestions').forEach(list => list.classList.remove('is-visible'));
      return;
    }

    if (event.key === 'Tab') {
      const openPopup = $('.modal.is-open .modal-dialog') || $('.search-overlay.is-open') || $('.favorites-drawer.is-open');
      if (openPopup) trapFocus(openPopup, event);
    }
  });
}

/* One click listener handles every button that uses a data- attribute */
function initGlobalClicks() {
  document.addEventListener('click', event => {
    const target = event.target;

    const favoriteButton = target.closest('[data-favorite]');
    if (favoriteButton) {
      toggleFavorite(Number(favoriteButton.dataset.favorite));
      return;
    }

    const compareButton = target.closest('[data-compare]');
    if (compareButton) {
      toggleCompare(Number(compareButton.dataset.compare));
      return;
    }

    if (target.closest('[data-compare-clear]')) return clearCompare();

    const quickViewButton = target.closest('[data-quick-view]');
    if (quickViewButton) {
      openPerfumeModal(Number(quickViewButton.dataset.quickView));
      return;
    }

    const storeViewButton = target.closest('[data-store-view]');
    if (storeViewButton) {
      openStoreModal(Number(storeViewButton.dataset.storeView));
      return;
    }

    if (target.closest('[data-store-link]')) {
      showToast('This is a demo store without a real website yet. Add the real link in js/stores.js.');
      return;
    }

    if (target.closest('[data-open-search]')) return openSearch();
    if (target.closest('[data-close-search]')) return closeSearch();
    if (target.closest('[data-open-favorites]')) return openFavorites();
    if (target.closest('[data-close-favorites]')) return closeFavorites();
    if (target.closest('[data-close-modal]')) return closeModal();

    // Clicking outside a search box hides its suggestions
    if (!target.closest('.search-field')) {
      $all('.search-field .suggestions').forEach(list => list.classList.remove('is-visible'));
    }
  });
}

/* ---------------------------------------------------------
   9. BACK TO TOP, SMOOTH SCROLLING & SCROLL ANIMATIONS
   --------------------------------------------------------- */
function initBackToTop() {
  const button = $('#back-to-top');
  const onScroll = () => button.classList.toggle('is-visible', window.scrollY > 600);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });
}

/* Smoothly scrolls to in-page links like href="#where-to-buy" */
function initSmoothScroll() {
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;

    const id = link.getAttribute('href').slice(1);
    const target = id ? document.getElementById(id) : null;
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
    history.pushState(null, '', `#${id}`);

    // Move keyboard focus to the section (helps screen reader users)
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  });
}

/* Elements with class="reveal" fade in once when scrolled into view */
function initRevealAnimations() {
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    $all('.reveal').forEach(element => element.classList.add('is-visible'));
    return;
  }

  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  $all('.reveal').forEach(element => revealObserver.observe(element));
}

/* ---------------------------------------------------------
   10. PAGE SETUP
   --------------------------------------------------------- */
function initHomePage() {
  renderFeaturedPerfumes('#featured-perfumes', 4);
  renderBrandTiles('#brand-tiles', 8);
  renderFeaturedStores('#featured-stores', 3);

  // Search suggestions for the home search box
  const homeInput = $('#home-search-input');
  const homeList = $('#home-suggestions');
  if (homeInput && homeList) attachSearchSuggestions(homeInput, homeList);

  // Perfume counts in the category list
  $all('[data-category-count]').forEach(element => {
    element.textContent = pluralize(countPerfumesIn(element.dataset.categoryCount), 'perfume');
  });

  // Blotter strips: show how many perfumes are in each family
  const caption = $('#blotter-caption');
  const defaultCaption = caption ? caption.innerHTML : '';
  $all('.blotter').forEach(strip => {
    const family = strip.dataset.family;
    const showCount = () => {
      caption.innerHTML = `<strong>${family}</strong>: ${pluralize(countPerfumesByFamily(family), 'perfume')} in the catalogue`;
    };
    strip.addEventListener('mouseenter', showCount);
    strip.addEventListener('focus', showCount);
    strip.addEventListener('mouseleave', () => { caption.innerHTML = defaultCaption; });
    strip.addEventListener('blur', () => { caption.innerHTML = defaultCaption; });
  });
}

/* Highlights the current section in the guide's table of contents */
function initGuidePage() {
  const links = $all('.guide-toc a');
  if (!links.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(link => {
        link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: '-35% 0px -60% 0px' });

  $all('.guide-step').forEach(step => observer.observe(step));
}

/* The page "router": runs the right setup for each page.
   Each <body> has a data-page attribute, e.g. <body data-page="home"> */
document.addEventListener('DOMContentLoaded', () => {
  renderHeader();
  renderFooter();
  renderGlobalUI();

  initHeader();
  initMobileMenu();
  initSearch();
  initGlobalClicks();
  initKeyboard();
  initBackToTop();
  initSmoothScroll();

  // Function names are strings so that page-only scripts
  // (js/quiz.js and js/compare.js) don't need to load everywhere
  const pageSetup = {
    home: 'initHomePage',
    perfumes: 'initPerfumesPage',
    details: 'initDetailsPage',
    stores: 'initStoresPage',
    brands: 'initBrandsPage',
    guide: 'initGuidePage',
    quiz: 'initQuizPage',
    compare: 'initComparePage'
  };

  const setupName = pageSetup[document.body.dataset.page];
  if (setupName && typeof window[setupName] === 'function') window[setupName]();

  updateFavoriteUI();
  updateCompareUI();
  initRevealAnimations();
});
