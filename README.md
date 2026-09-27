# ScentFinder – Original Perfume Discovery Platform

ScentFinder is a responsive website that helps people discover original perfumes, learn about fragrance notes and find trusted perfume stores and sellers in Malaysia.

It is **not** an online shop. There is no cart, checkout or payment. When users are ready to buy, the site points them to the seller.

Built with **HTML5, CSS3 and vanilla JavaScript** only. No frameworks, no backend, no database.

---

## How to run it

1. Open the `scentfinder` folder in **Visual Studio Code** (File → Open Folder).
2. Install the **Live Server** extension by Ritwick Dey (if you don't have it).
3. Right-click `index.html` and choose **Open with Live Server**.

You can also double-click `index.html` to open it straight in a browser. Everything works that way too.

> The fonts (Bodoni Moda and Jost) load from Google Fonts, so you need an internet connection to see them. Without internet the site still works and falls back to system fonts.

---

## Pages

| File | Page |
|---|---|
| `index.html` | Home: hero, search, categories, featured perfumes, brands, stores, how it works, authenticity tips, call to action |
| `perfumes.html` | Perfume catalogue with live search, category chips, 7 filters and sorting |
| `perfume-details.html` | One perfume (opened as `perfume-details.html?id=1`): notes, longevity, sillage, seasons, occasions, price, Where to Buy, similar perfumes |
| `stores.html` | Trusted store directory with search and location, platform and store-type filters |
| `brands.html` | Brand directory with search and Designer / Niche / Luxury tabs |
| `guide.html` | How to check if a perfume is original (7 checks, checklist, FAQ) |
| `about.html` | Mission, vision, why ScentFinder, user benefits |
| `quiz.html` | Scent Quiz: 5 questions, then the 3 best-matching perfumes with a match score and reasons |
| `compare.html` | Compare up to 3 perfumes side by side, with shared notes, longest-lasting and lowest-price highlights |

---

## JavaScript features

1. Live perfume search (matches name, brand, family and notes, accent-insensitive)
2. Filtering by brand, gender, fragrance type, price, popularity, season and longevity
3. Sorting (popularity, name, price, longevity)
4. Favorites saved in `localStorage` (heart buttons + favorites drawer + header counter)
5. Search suggestions (header search and home search, keyboard arrow support)
6. Mobile hamburger menu
7. Modals for perfume quick view and store details
8. Smooth scrolling for in-page links
9. Scroll animations (respects the "reduce motion" setting)
10. Back-to-top button
11. Store filtering
12. Dynamic perfume, brand and store cards generated from data
13. Scent Quiz with a points-based matching score (see the comment at the top of `js/quiz.js`)
14. Compare list saved in `localStorage`, with a compare button on every card, a bottom tray and a comparison table

Links also accept URL parameters, for example:
`perfumes.html?brand=Dior`, `perfumes.html?category=Niche`, `perfumes.html?family=Woody`, `perfumes.html?q=vanilla`.

---

## Folder structure

```
scentfinder/
├── index.html
├── perfumes.html
├── perfume-details.html
├── stores.html
├── brands.html
├── guide.html
├── about.html
├── css/
│   ├── style.css          design tokens, components, page styles
│   └── responsive.css     tablet and phone layouts
├── js/
│   ├── main.js            shared features + page "router"
│   ├── perfumes.js        perfume & brand data, catalogue, details, brands pages
│   ├── stores.js          store data, verification labels, stores page
│   ├── quiz.js            Scent Quiz (only loaded on quiz.html)
│   └── compare.js         comparison table (only loaded on compare.html)
├── images/
│   ├── perfumes/          perfume-1.svg ... perfume-20.svg (bottle illustrations)
│   ├── brands/            brand monograms
│   ├── stores/            store monograms
│   └── banners/           favicon, hero illustration, social sharing image
└── README.md
```

### How the code is organised

- The header, footer, search overlay, favorites drawer and modal are written **once** in `js/main.js` and added to every page. This avoids copying the same navigation into 7 files.
- Each `<body>` has a `data-page` attribute (for example `data-page="stores"`). `main.js` reads it and runs the setup for that page.
- Scripts load in this order on every page: `perfumes.js` → `stores.js` → `main.js`, all with `defer`.

---

## Editing the data

### Add a perfume
Open `js/perfumes.js` and copy one object in the `PERFUMES` array. Give it a new `id`, fill in the fields and point `image` to a file in `images/perfumes/`. The `stores` array holds the ids of sellers from `js/stores.js`.

### Add or replace a store
Open `js/stores.js` and edit the `STORES` array, then add the store's `id` to the `stores` list of each perfume it sells in `js/perfumes.js`. Links open in a new tab. Store logos are gold monograms drawn from the store name, so no image file is needed.

### Use real photos
Replace the SVG files in `images/` with your own photos (JPG, PNG or WebP) and update the `image` / `logo` paths in the data. Portrait images around 5:6 (for example 800×960) fit the cards best.

---

## Important notes about the data

- **Perfumes:** names and notes refer to real, well-known fragrances. Prices are indicative example ranges in RM and may change.
- **Images:** bottles and logos are original illustrations and monograms, not product photos or official brand logos.
- **Stores:** real Malaysian sellers (Dior Malaysia, Chanel Malaysia, Sephora Malaysia, Parkson, ZALORA) from public information, checked September 2026. Only the brands' own websites are labelled **Official Brand Store**; the others are **Listed Seller** until confirmed. Ratings are left empty. Perfumes without a confirmed seller show "No confirmed sellers yet".

Before presenting the site as real, only label a seller **Official Brand Store** or **Verified Retailer** if you have confirmed it from an official source, such as the brand's own website or store locator. Otherwise use **Community Recommended** or **Listed Seller**.

---

## Accessibility & SEO

- Semantic HTML5 (`header`, `nav`, `main`, `section`, `article`, `aside`, `footer`)
- Skip-to-content link, visible keyboard focus, labelled form controls
- Keyboard support for menus, modals (Esc to close, focus trapping) and suggestions
- Alt text on images, good colour contrast on the dark theme
- Unique page titles, meta descriptions and Open Graph tags on every page

## Browser support

Latest Chrome, Edge, Firefox and Safari on desktop, Android and iPhone.
