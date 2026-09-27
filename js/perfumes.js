/* =========================================================
   ScentFinder – perfumes.js
   1. Perfume sample data (PERFUMES)
   2. Brand data (BRANDS)
   3. Helper functions (search, similar perfumes, counts)
   4. Card and modal templates
   5. Page logic: Perfumes catalogue, Perfume details, Brands

   NOTE: Prices are indicative example ranges in Malaysian
   Ringgit (RM). They are sample data and may change.
   Bottle images are illustrations, not product photos.
   ========================================================= */

'use strict';

/* ---------------------------------------------------------
   1. PERFUME DATA
   "stores" holds the ids of sellers in js/stores.js.
   An empty list [] means no seller has been confirmed yet.
   priceMin / priceMax / longevityHours / popularity are
   numbers used for filtering and sorting.
   --------------------------------------------------------- */
const PERFUMES = [
  {
    id: 1,
    brand: 'Dior',
    name: 'Sauvage',
    concentration: 'Eau de Toilette',
    gender: 'Men',
    category: 'Designer',
    fragranceFamily: 'Aromatic',
    topNotes: ['Calabrian Bergamot', 'Pepper'],
    middleNotes: ['Sichuan Pepper', 'Lavender', 'Pink Pepper', 'Geranium', 'Elemi'],
    baseNotes: ['Ambroxan', 'Cedar', 'Labdanum'],
    longevity: '7-9 hours',
    longevityHours: 7,
    sillage: 'Strong',
    price: 'RM 480 - RM 650',
    priceMin: 480,
    priceMax: 650,
    popularity: 98,
    season: ['Spring', 'Summer', 'Autumn'],
    occasions: ['Daily wear', 'Office', 'Night out'],
    image: 'images/perfumes/perfume-1.svg',
    description: 'A crisp, peppery freshness wrapped around a smooth ambery-woody trail. One of the most recognisable modern men\'s fragrances and an easy crowd-pleaser.',
    stores: [1, 3, 5]
  },
  {
    id: 2,
    brand: 'Chanel',
    name: 'Bleu de Chanel',
    concentration: 'Eau de Parfum',
    gender: 'Men',
    category: 'Designer',
    fragranceFamily: 'Woody',
    topNotes: ['Grapefruit', 'Lemon', 'Mint', 'Pink Pepper'],
    middleNotes: ['Ginger', 'Nutmeg', 'Jasmine'],
    baseNotes: ['Incense', 'Sandalwood', 'Cedar', 'Vetiver', 'Labdanum'],
    longevity: '7-9 hours',
    longevityHours: 7,
    sillage: 'Moderate',
    price: 'RM 600 - RM 780',
    priceMin: 600,
    priceMax: 780,
    popularity: 96,
    season: ['Spring', 'Autumn', 'Winter'],
    occasions: ['Office', 'Formal events', 'Date night'],
    image: 'images/perfumes/perfume-2.svg',
    description: 'Clean citrus opens onto warm incense and polished woods. Versatile and refined, it works from a morning meeting to an evening dinner.',
    stores: [2, 5]
  },
  {
    id: 3,
    brand: 'Chanel',
    name: 'Coco Mademoiselle',
    concentration: 'Eau de Parfum',
    gender: 'Women',
    category: 'Designer',
    fragranceFamily: 'Chypre',
    topNotes: ['Orange', 'Bergamot', 'Grapefruit'],
    middleNotes: ['Rose', 'Jasmine', 'Litchi'],
    baseNotes: ['Patchouli', 'Vetiver', 'Vanilla', 'White Musk'],
    longevity: '8-10 hours',
    longevityHours: 8,
    sillage: 'Strong',
    price: 'RM 650 - RM 820',
    priceMin: 650,
    priceMax: 820,
    popularity: 94,
    season: ['Spring', 'Autumn', 'Winter'],
    occasions: ['Office', 'Formal events', 'Date night'],
    image: 'images/perfumes/perfume-3.svg',
    description: 'Sparkling orange and rose over a modern patchouli base. Elegant and confident, with a clean musky finish that lasts through the day.',
    stores: [2, 5]
  },
  {
    id: 4,
    brand: 'Yves Saint Laurent',
    name: 'Libre',
    concentration: 'Eau de Parfum',
    gender: 'Women',
    category: 'Designer',
    fragranceFamily: 'Floral',
    topNotes: ['Lavender', 'Mandarin', 'Blackcurrant'],
    middleNotes: ['Jasmine', 'Orange Blossom'],
    baseNotes: ['Vanilla', 'Musk', 'Cedar', 'Ambergris'],
    longevity: '8-10 hours',
    longevityHours: 8,
    sillage: 'Strong',
    price: 'RM 520 - RM 720',
    priceMin: 520,
    priceMax: 720,
    popularity: 92,
    season: ['Autumn', 'Winter', 'Spring'],
    occasions: ['Daily wear', 'Night out', 'Date night'],
    image: 'images/perfumes/perfume-4.svg',
    description: 'Lavender, usually found in men\'s fragrances, meets bright orange blossom and creamy vanilla. Bold, warm and very noticeable.',
    stores: [4]
  },
  {
    id: 5,
    brand: 'Lancôme',
    name: 'La Vie Est Belle',
    concentration: 'Eau de Parfum',
    gender: 'Women',
    category: 'Designer',
    fragranceFamily: 'Gourmand',
    topNotes: ['Blackcurrant', 'Pear'],
    middleNotes: ['Iris', 'Jasmine', 'Orange Blossom'],
    baseNotes: ['Praline', 'Vanilla', 'Patchouli', 'Tonka Bean'],
    longevity: '8-12 hours',
    longevityHours: 8,
    sillage: 'Strong',
    price: 'RM 450 - RM 650',
    priceMin: 450,
    priceMax: 650,
    popularity: 93,
    season: ['Autumn', 'Winter'],
    occasions: ['Daily wear', 'Celebrations', 'Date night'],
    image: 'images/perfumes/perfume-5.svg',
    description: 'A sweet, joyful blend of pear, iris and praline. Comforting and long-lasting, it is one of the best-known gourmand perfumes.',
    stores: []
  },
  {
    id: 6,
    brand: 'Giorgio Armani',
    name: 'Acqua di Giò',
    concentration: 'Eau de Toilette',
    gender: 'Men',
    category: 'Designer',
    fragranceFamily: 'Aquatic',
    topNotes: ['Lime', 'Lemon', 'Bergamot', 'Mandarin', 'Neroli'],
    middleNotes: ['Sea Notes', 'Jasmine', 'Rosemary', 'Peach'],
    baseNotes: ['White Musk', 'Cedar', 'Oakmoss', 'Patchouli'],
    longevity: '5-7 hours',
    longevityHours: 5,
    sillage: 'Moderate',
    price: 'RM 350 - RM 520',
    priceMin: 350,
    priceMax: 520,
    popularity: 95,
    season: ['Spring', 'Summer'],
    occasions: ['Daily wear', 'Office', 'Outdoor'],
    image: 'images/perfumes/perfume-6.svg',
    description: 'Citrus and sea air with a soft musky base. A classic for hot, humid weather and one of the safest blind buys for everyday use.',
    stores: []
  },
  {
    id: 7,
    brand: 'Versace',
    name: 'Eros',
    concentration: 'Eau de Toilette',
    gender: 'Men',
    category: 'Designer',
    fragranceFamily: 'Aromatic',
    topNotes: ['Mint', 'Green Apple', 'Lemon'],
    middleNotes: ['Tonka Bean', 'Ambroxan', 'Geranium'],
    baseNotes: ['Vanilla', 'Vetiver', 'Oakmoss', 'Cedar'],
    longevity: '7-9 hours',
    longevityHours: 7,
    sillage: 'Strong',
    price: 'RM 280 - RM 420',
    priceMin: 280,
    priceMax: 420,
    popularity: 91,
    season: ['Autumn', 'Winter', 'Spring'],
    occasions: ['Night out', 'Date night', 'Parties'],
    image: 'images/perfumes/perfume-7.svg',
    description: 'Cool mint and green apple over sweet vanilla and tonka. Loud, playful and made for evenings out.',
    stores: []
  },
  {
    id: 8,
    brand: 'Jean Paul Gaultier',
    name: 'Le Male',
    concentration: 'Eau de Toilette',
    gender: 'Men',
    category: 'Designer',
    fragranceFamily: 'Amber',
    topNotes: ['Lavender', 'Mint', 'Cardamom', 'Bergamot'],
    middleNotes: ['Cinnamon', 'Orange Blossom', 'Cumin'],
    baseNotes: ['Vanilla', 'Tonka Bean', 'Amber', 'Sandalwood'],
    longevity: '6-8 hours',
    longevityHours: 6,
    sillage: 'Moderate',
    price: 'RM 330 - RM 500',
    priceMin: 330,
    priceMax: 500,
    popularity: 90,
    season: ['Autumn', 'Winter'],
    occasions: ['Night out', 'Date night', 'Daily wear'],
    image: 'images/perfumes/perfume-8.svg',
    description: 'Fresh lavender and mint soften into warm vanilla and spice. A 1990s icon that still feels clean, sweet and inviting.',
    stores: []
  },
  {
    id: 9,
    brand: 'Tom Ford',
    name: 'Oud Wood',
    concentration: 'Eau de Parfum',
    gender: 'Unisex',
    category: 'Luxury',
    fragranceFamily: 'Woody',
    topNotes: ['Rosewood', 'Cardamom', 'Chinese Pepper'],
    middleNotes: ['Oud', 'Sandalwood', 'Vetiver'],
    baseNotes: ['Tonka Bean', 'Vanilla', 'Amber'],
    longevity: '6-8 hours',
    longevityHours: 6,
    sillage: 'Moderate',
    price: 'RM 1,100 - RM 1,450',
    priceMin: 1100,
    priceMax: 1450,
    popularity: 88,
    season: ['Autumn', 'Winter'],
    occasions: ['Formal events', 'Office', 'Evening'],
    image: 'images/perfumes/perfume-9.svg',
    description: 'A smooth, approachable oud softened with cardamom, sandalwood and vanilla. Warm and polished rather than smoky or heavy.',
    stores: []
  },
  {
    id: 10,
    brand: 'Maison Francis Kurkdjian',
    name: 'Baccarat Rouge 540',
    concentration: 'Eau de Parfum',
    gender: 'Unisex',
    category: 'Niche',
    fragranceFamily: 'Amber',
    topNotes: ['Saffron', 'Jasmine'],
    middleNotes: ['Amberwood', 'Ambergris'],
    baseNotes: ['Fir Resin', 'Cedar'],
    longevity: '10-12 hours',
    longevityHours: 10,
    sillage: 'Strong',
    price: 'RM 1,350 - RM 1,650',
    priceMin: 1350,
    priceMax: 1650,
    popularity: 97,
    season: ['Autumn', 'Winter', 'Spring'],
    occasions: ['Evening', 'Celebrations', 'Date night'],
    image: 'images/perfumes/perfume-10.svg',
    description: 'Airy saffron and jasmine over a glowing, mineral amber. Famous for its long-lasting trail, and one of the most copied perfumes, so buy carefully.',
    stores: []
  },
  {
    id: 11,
    brand: 'Creed',
    name: 'Aventus',
    concentration: 'Eau de Parfum',
    gender: 'Men',
    category: 'Niche',
    fragranceFamily: 'Chypre',
    topNotes: ['Pineapple', 'Bergamot', 'Blackcurrant', 'Apple'],
    middleNotes: ['Birch', 'Patchouli', 'Jasmine', 'Rose'],
    baseNotes: ['Musk', 'Oakmoss', 'Ambergris', 'Vanilla'],
    longevity: '7-9 hours',
    longevityHours: 7,
    sillage: 'Moderate',
    price: 'RM 1,600 - RM 2,100',
    priceMin: 1600,
    priceMax: 2100,
    popularity: 95,
    season: ['Spring', 'Summer', 'Autumn'],
    occasions: ['Office', 'Formal events', 'Daily wear'],
    image: 'images/perfumes/perfume-11.svg',
    description: 'Juicy pineapple and a light smoky birch over musk and oakmoss. A modern niche classic that is widely counterfeited.',
    stores: []
  },
  {
    id: 12,
    brand: 'Le Labo',
    name: 'Santal 33',
    concentration: 'Eau de Parfum',
    gender: 'Unisex',
    category: 'Niche',
    fragranceFamily: 'Woody',
    topNotes: ['Cardamom', 'Violet'],
    middleNotes: ['Iris', 'Papyrus', 'Ambrox'],
    baseNotes: ['Sandalwood', 'Cedar', 'Leather'],
    longevity: '8-10 hours',
    longevityHours: 8,
    sillage: 'Moderate',
    price: 'RM 950 - RM 1,250',
    priceMin: 950,
    priceMax: 1250,
    popularity: 86,
    season: ['Autumn', 'Winter', 'Spring'],
    occasions: ['Daily wear', 'Office', 'Casual'],
    image: 'images/perfumes/perfume-12.svg',
    description: 'Creamy sandalwood with a dry, leathery edge. Relaxed and distinctive, it feels at home in a city café or a gallery.',
    stores: []
  },
  {
    id: 13,
    brand: 'Byredo',
    name: 'Gypsy Water',
    concentration: 'Eau de Parfum',
    gender: 'Unisex',
    category: 'Niche',
    fragranceFamily: 'Aromatic',
    topNotes: ['Bergamot', 'Lemon', 'Pepper', 'Juniper Berries'],
    middleNotes: ['Incense', 'Pine Needles', 'Orris'],
    baseNotes: ['Amber', 'Vanilla', 'Sandalwood'],
    longevity: '5-7 hours',
    longevityHours: 5,
    sillage: 'Soft',
    price: 'RM 950 - RM 1,300',
    priceMin: 950,
    priceMax: 1300,
    popularity: 80,
    season: ['Spring', 'Summer', 'Autumn'],
    occasions: ['Casual', 'Daily wear', 'Outdoor'],
    image: 'images/perfumes/perfume-13.svg',
    description: 'Citrus, pine and a soft vanilla-sandalwood base. Quiet and outdoorsy, like a walk through a forest.',
    stores: []
  },
  {
    id: 14,
    brand: 'Jo Malone London',
    name: 'Wood Sage & Sea Salt',
    concentration: 'Cologne',
    gender: 'Unisex',
    category: 'Luxury',
    fragranceFamily: 'Fresh',
    topNotes: ['Ambrette Seeds', 'Grapefruit'],
    middleNotes: ['Sea Salt', 'Seaweed'],
    baseNotes: ['Sage', 'Driftwood'],
    longevity: '3-5 hours',
    longevityHours: 3,
    sillage: 'Soft',
    price: 'RM 500 - RM 740',
    priceMin: 500,
    priceMax: 740,
    popularity: 84,
    season: ['Spring', 'Summer'],
    occasions: ['Casual', 'Office', 'Outdoor'],
    image: 'images/perfumes/perfume-14.svg',
    description: 'Mineral sea salt and earthy sage. Light and natural, best for people who prefer a subtle scent close to the skin.',
    stores: []
  },
  {
    id: 15,
    brand: 'Chanel',
    name: 'Chance Eau Tendre',
    concentration: 'Eau de Toilette',
    gender: 'Women',
    category: 'Designer',
    fragranceFamily: 'Floral',
    topNotes: ['Grapefruit', 'Quince'],
    middleNotes: ['Hyacinth', 'Jasmine'],
    baseNotes: ['White Musk', 'Iris', 'Virginia Cedar', 'Amber'],
    longevity: '5-7 hours',
    longevityHours: 5,
    sillage: 'Moderate',
    price: 'RM 560 - RM 720',
    priceMin: 560,
    priceMax: 720,
    popularity: 87,
    season: ['Spring', 'Summer'],
    occasions: ['Daily wear', 'Office', 'Brunch'],
    image: 'images/perfumes/perfume-15.svg',
    description: 'Soft fruity florals with a gentle musky finish. Fresh, light and easy to wear every day.',
    stores: [2, 5]
  },
  {
    id: 16,
    brand: 'Dior',
    name: 'Miss Dior Blooming Bouquet',
    concentration: 'Eau de Toilette',
    gender: 'Women',
    category: 'Designer',
    fragranceFamily: 'Floral',
    topNotes: ['Sicilian Mandarin'],
    middleNotes: ['Peony', 'Damask Rose', 'Apricot', 'Peach'],
    baseNotes: ['White Musk'],
    longevity: '4-6 hours',
    longevityHours: 4,
    sillage: 'Soft',
    price: 'RM 450 - RM 640',
    priceMin: 450,
    priceMax: 640,
    popularity: 85,
    season: ['Spring', 'Summer'],
    occasions: ['Daily wear', 'Brunch', 'Weddings'],
    image: 'images/perfumes/perfume-16.svg',
    description: 'Tender peony and rose with a clean musk. A delicate, romantic floral that stays soft and polite.',
    stores: [1, 3, 5]
  },
  {
    id: 17,
    brand: 'Rabanne',
    name: '1 Million',
    concentration: 'Eau de Toilette',
    gender: 'Men',
    category: 'Designer',
    fragranceFamily: 'Amber',
    topNotes: ['Grapefruit', 'Mint', 'Blood Mandarin'],
    middleNotes: ['Rose', 'Cinnamon', 'Spices'],
    baseNotes: ['Leather', 'Amber', 'Patchouli', 'Woody Notes'],
    longevity: '7-9 hours',
    longevityHours: 7,
    sillage: 'Strong',
    price: 'RM 300 - RM 460',
    priceMin: 300,
    priceMax: 460,
    popularity: 89,
    season: ['Autumn', 'Winter'],
    occasions: ['Night out', 'Parties', 'Date night'],
    image: 'images/perfumes/perfume-17.svg',
    description: 'Sweet spice, cinnamon and leather with a bright citrus opening. A bold party scent with plenty of projection.',
    stores: []
  },
  {
    id: 18,
    brand: 'Valentino',
    name: 'Born in Roma Donna',
    concentration: 'Eau de Parfum',
    gender: 'Women',
    category: 'Designer',
    fragranceFamily: 'Floral',
    topNotes: ['Blackcurrant', 'Pink Pepper', 'Bergamot'],
    middleNotes: ['Jasmine Sambac', 'Jasmine Tea'],
    baseNotes: ['Bourbon Vanilla', 'Cashmeran', 'Guaiac Wood'],
    longevity: '8-10 hours',
    longevityHours: 8,
    sillage: 'Strong',
    price: 'RM 480 - RM 680',
    priceMin: 480,
    priceMax: 680,
    popularity: 83,
    season: ['Autumn', 'Winter', 'Spring'],
    occasions: ['Night out', 'Date night', 'Celebrations'],
    image: 'images/perfumes/perfume-18.svg',
    description: 'Jasmine and vanilla with a soft woody warmth. Modern, sweet and stylish without feeling heavy.',
    stores: []
  },
  {
    id: 19,
    brand: 'Prada',
    name: 'Luna Rossa Carbon',
    concentration: 'Eau de Toilette',
    gender: 'Men',
    category: 'Designer',
    fragranceFamily: 'Fresh',
    topNotes: ['Bergamot', 'Pepper'],
    middleNotes: ['Lavender', 'Metallic Notes'],
    baseNotes: ['Ambroxan', 'Patchouli'],
    longevity: '7-9 hours',
    longevityHours: 7,
    sillage: 'Moderate',
    price: 'RM 340 - RM 520',
    priceMin: 340,
    priceMax: 520,
    popularity: 82,
    season: ['Spring', 'Summer', 'Autumn'],
    occasions: ['Office', 'Daily wear', 'Casual'],
    image: 'images/perfumes/perfume-19.svg',
    description: 'Clean lavender with a cool, slightly metallic freshness. Smart and modern, a good pick for office wear.',
    stores: []
  },
  {
    id: 20,
    brand: 'Kilian Paris',
    name: 'Love, Don\'t Be Shy',
    concentration: 'Eau de Parfum',
    gender: 'Unisex',
    category: 'Luxury',
    fragranceFamily: 'Gourmand',
    topNotes: ['Neroli', 'Pink Pepper', 'Bergamot', 'Coriander'],
    middleNotes: ['Orange Blossom', 'Iris', 'Jasmine', 'Honeysuckle', 'Rose'],
    baseNotes: ['Marshmallow', 'Vanilla', 'Caramel', 'Musk', 'Labdanum'],
    longevity: '8-10 hours',
    longevityHours: 8,
    sillage: 'Strong',
    price: 'RM 1,200 - RM 1,500',
    priceMin: 1200,
    priceMax: 1500,
    popularity: 79,
    season: ['Autumn', 'Winter'],
    occasions: ['Evening', 'Date night', 'Celebrations'],
    image: 'images/perfumes/perfume-20.svg',
    description: 'Orange blossom with sweet marshmallow and caramel. Rich, indulgent and made to be noticed.',
    stores: []
  },
  {
    id: 21,
    brand: 'Lattafa',
    name: 'Khamrah',
    concentration: 'Eau de Parfum',
    gender: 'Unisex',
    category: 'Designer',
    fragranceFamily: 'Amber',
    topNotes: ['Cinnamon', 'Nutmeg', 'Bergamot'],
    middleNotes: ['Dates', 'Praline', 'Tuberose'],
    baseNotes: ['Vanilla', 'Tonka Bean', 'Amberwood', 'Myrrh', 'Benzoin'],
    longevity: '8-10 hours',
    longevityHours: 8,
    sillage: 'Strong',
    price: 'RM 100 - RM 180',
    priceMin: 100,
    priceMax: 180,
    popularity: 94,
    season: ['Autumn', 'Winter'],
    occasions: ['Night out', 'Celebrations', 'Daily wear'],
    image: 'images/perfumes/perfume-21.svg',
    description: 'Warm cinnamon and sweet dates over a rich vanilla base. A hugely popular Middle Eastern perfume that gives a luxurious feel at a much lower price.',
    stores: []
  },
  {
    id: 22,
    brand: 'Carolina Herrera',
    name: 'Good Girl',
    concentration: 'Eau de Parfum',
    gender: 'Women',
    category: 'Designer',
    fragranceFamily: 'Amber',
    topNotes: ['Almond', 'Coffee', 'Bergamot', 'Lemon'],
    middleNotes: ['Tuberose', 'Jasmine Sambac', 'Orange Blossom'],
    baseNotes: ['Tonka Bean', 'Cacao', 'Vanilla', 'Sandalwood'],
    longevity: '8-10 hours',
    longevityHours: 8,
    sillage: 'Strong',
    price: 'RM 400 - RM 620',
    priceMin: 400,
    priceMax: 620,
    popularity: 92,
    season: ['Autumn', 'Winter'],
    occasions: ['Night out', 'Date night', 'Parties'],
    image: 'images/perfumes/perfume-22.svg',
    description: 'Roasted coffee and almond with bright tuberose and dark cacao. Seductive and sweet, with a trail that lasts well into the night.',
    stores: []
  },
  {
    id: 23,
    brand: 'Dolce & Gabbana',
    name: 'Light Blue',
    concentration: 'Eau de Toilette',
    gender: 'Women',
    category: 'Designer',
    fragranceFamily: 'Fresh',
    topNotes: ['Sicilian Lemon', 'Apple', 'Bellflower'],
    middleNotes: ['Bamboo', 'Jasmine', 'White Rose'],
    baseNotes: ['Cedar', 'Musk', 'Amber'],
    longevity: '4-6 hours',
    longevityHours: 4,
    sillage: 'Moderate',
    price: 'RM 300 - RM 480',
    priceMin: 300,
    priceMax: 480,
    popularity: 90,
    season: ['Spring', 'Summer'],
    occasions: ['Daily wear', 'Holidays', 'Brunch'],
    image: 'images/perfumes/perfume-23.svg',
    description: 'Crisp lemon and green apple with a soft musky base. Light and sunny, perfect for Malaysia\'s hot weather.',
    stores: []
  },
  {
    id: 24,
    brand: 'Yves Saint Laurent',
    name: 'Y',
    concentration: 'Eau de Parfum',
    gender: 'Men',
    category: 'Designer',
    fragranceFamily: 'Aromatic',
    topNotes: ['Apple', 'Ginger', 'Bergamot'],
    middleNotes: ['Sage', 'Juniper Berries', 'Geranium'],
    baseNotes: ['Amberwood', 'Tonka Bean', 'Cedar', 'Vetiver', 'Olibanum'],
    longevity: '8-10 hours',
    longevityHours: 8,
    sillage: 'Strong',
    price: 'RM 450 - RM 650',
    priceMin: 450,
    priceMax: 650,
    popularity: 93,
    season: ['Spring', 'Autumn', 'Winter'],
    occasions: ['Office', 'Night out', 'Daily wear'],
    image: 'images/perfumes/perfume-24.svg',
    description: 'Fresh apple and ginger over a smooth woody, ambery base. Clean but bold, and one of the most complimented modern men\'s perfumes.',
    stores: [4]
  },
  {
    id: 25,
    brand: 'Yves Saint Laurent',
    name: 'Black Opium',
    concentration: 'Eau de Parfum',
    gender: 'Women',
    category: 'Designer',
    fragranceFamily: 'Gourmand',
    topNotes: ['Pear', 'Pink Pepper', 'Orange Blossom'],
    middleNotes: ['Coffee', 'Jasmine', 'Bitter Almond'],
    baseNotes: ['Vanilla', 'Patchouli', 'Cedar', 'Cashmere Wood'],
    longevity: '8-10 hours',
    longevityHours: 8,
    sillage: 'Strong',
    price: 'RM 450 - RM 650',
    priceMin: 450,
    priceMax: 650,
    popularity: 93,
    season: ['Autumn', 'Winter'],
    occasions: ['Night out', 'Date night', 'Parties'],
    image: 'images/perfumes/perfume-25.svg',
    description: 'Black coffee and white florals over creamy vanilla. Addictive and energetic, a modern classic for evenings.',
    stores: [4]
  },
  {
    id: 26,
    brand: 'Giorgio Armani',
    name: 'Stronger With You',
    concentration: 'Eau de Toilette',
    gender: 'Men',
    category: 'Designer',
    fragranceFamily: 'Amber',
    topNotes: ['Cardamom', 'Pink Pepper', 'Violet Leaf'],
    middleNotes: ['Sage'],
    baseNotes: ['Chestnut', 'Vanilla', 'Cedar'],
    longevity: '6-8 hours',
    longevityHours: 6,
    sillage: 'Moderate',
    price: 'RM 350 - RM 500',
    priceMin: 350,
    priceMax: 500,
    popularity: 89,
    season: ['Autumn', 'Winter'],
    occasions: ['Date night', 'Daily wear', 'Casual'],
    image: 'images/perfumes/perfume-26.svg',
    description: 'Spicy cardamom softening into sweet chestnut and vanilla. Cosy and approachable, popular as a first "grown-up" perfume.',
    stores: []
  },
  {
    id: 27,
    brand: 'Dior',
    name: 'J\'adore',
    concentration: 'Eau de Parfum',
    gender: 'Women',
    category: 'Designer',
    fragranceFamily: 'Floral',
    topNotes: ['Pear', 'Melon', 'Mandarin'],
    middleNotes: ['Ylang-Ylang', 'Damascus Rose', 'Jasmine'],
    baseNotes: ['Musk', 'Vanilla', 'Cedar'],
    longevity: '7-9 hours',
    longevityHours: 7,
    sillage: 'Moderate',
    price: 'RM 550 - RM 750',
    priceMin: 550,
    priceMax: 750,
    popularity: 90,
    season: ['Spring', 'Summer', 'Autumn'],
    occasions: ['Weddings', 'Office', 'Formal events'],
    image: 'images/perfumes/perfume-27.svg',
    description: 'A radiant bouquet of rose, jasmine and ylang-ylang. Elegant and feminine, one of Dior\'s best-known perfumes.',
    stores: [1, 3, 5]
  },
  {
    id: 28,
    brand: 'Chanel',
    name: 'N°5',
    concentration: 'Eau de Parfum',
    gender: 'Women',
    category: 'Designer',
    fragranceFamily: 'Floral',
    topNotes: ['Aldehydes', 'Ylang-Ylang', 'Neroli', 'Bergamot'],
    middleNotes: ['Iris', 'Jasmine', 'Rose', 'Lily of the Valley'],
    baseNotes: ['Sandalwood', 'Vanilla', 'Vetiver', 'Musk'],
    longevity: '7-9 hours',
    longevityHours: 7,
    sillage: 'Strong',
    price: 'RM 650 - RM 850',
    priceMin: 650,
    priceMax: 850,
    popularity: 88,
    season: ['Autumn', 'Winter', 'Spring'],
    occasions: ['Formal events', 'Evening', 'Weddings'],
    image: 'images/perfumes/perfume-28.svg',
    description: 'Sparkling aldehydes over rose, jasmine and soft woods. The world\'s most famous perfume, powdery and timeless.',
    stores: [2, 5]
  },
  {
    id: 29,
    brand: 'Xerjoff',
    name: 'Naxos',
    concentration: 'Eau de Parfum',
    gender: 'Unisex',
    category: 'Niche',
    fragranceFamily: 'Aromatic',
    topNotes: ['Lavender', 'Bergamot', 'Lemon'],
    middleNotes: ['Honey', 'Cinnamon', 'Jasmine'],
    baseNotes: ['Tobacco Leaf', 'Vanilla', 'Tonka Bean'],
    longevity: '8-10 hours',
    longevityHours: 8,
    sillage: 'Strong',
    price: 'RM 1,200 - RM 1,600',
    priceMin: 1200,
    priceMax: 1600,
    popularity: 87,
    season: ['Autumn', 'Winter', 'Spring'],
    occasions: ['Evening', 'Formal events', 'Date night'],
    image: 'images/perfumes/perfume-29.svg',
    description: 'Lavender and golden honey over sweet tobacco and vanilla. Smooth, rich and very often complimented.',
    stores: []
  },
  {
    id: 30,
    brand: 'Kilian Paris',
    name: 'Angels\' Share',
    concentration: 'Eau de Parfum',
    gender: 'Unisex',
    category: 'Luxury',
    fragranceFamily: 'Gourmand',
    topNotes: ['Cognac'],
    middleNotes: ['Cinnamon', 'Tonka Bean', 'Oak'],
    baseNotes: ['Praline', 'Vanilla', 'Sandalwood'],
    longevity: '8-10 hours',
    longevityHours: 8,
    sillage: 'Strong',
    price: 'RM 1,200 - RM 1,500',
    priceMin: 1200,
    priceMax: 1500,
    popularity: 90,
    season: ['Autumn', 'Winter'],
    occasions: ['Evening', 'Celebrations', 'Date night'],
    image: 'images/perfumes/perfume-30.svg',
    description: 'Boozy cognac with cinnamon and warm praline, inspired by ageing cognac barrels. Indulgent and cosy.',
    stores: []
  },
  {
    id: 31,
    brand: 'Initio Parfums Privés',
    name: 'Oud for Greatness',
    concentration: 'Eau de Parfum',
    gender: 'Unisex',
    category: 'Niche',
    fragranceFamily: 'Woody',
    topNotes: ['Saffron', 'Nutmeg', 'Lavender'],
    middleNotes: ['Oud'],
    baseNotes: ['Patchouli', 'Musk'],
    longevity: '10-12 hours',
    longevityHours: 10,
    sillage: 'Strong',
    price: 'RM 1,300 - RM 1,700',
    priceMin: 1300,
    priceMax: 1700,
    popularity: 86,
    season: ['Autumn', 'Winter'],
    occasions: ['Evening', 'Formal events', 'Celebrations'],
    image: 'images/perfumes/perfume-31.svg',
    description: 'A bold, dark oud lifted by saffron and lavender. Powerful and long-lasting, loved by oud fans.',
    stores: []
  },
  {
    id: 32,
    brand: 'Nishane',
    name: 'Hacivat',
    concentration: 'Extrait de Parfum',
    gender: 'Unisex',
    category: 'Niche',
    fragranceFamily: 'Chypre',
    topNotes: ['Pineapple', 'Grapefruit', 'Bergamot'],
    middleNotes: ['Cedar', 'Patchouli', 'Jasmine'],
    baseNotes: ['Oakmoss', 'Woody Notes'],
    longevity: '8-10 hours',
    longevityHours: 8,
    sillage: 'Strong',
    price: 'RM 900 - RM 1,200',
    priceMin: 900,
    priceMax: 1200,
    popularity: 85,
    season: ['Spring', 'Summer', 'Autumn'],
    occasions: ['Office', 'Daily wear', 'Formal events'],
    image: 'images/perfumes/perfume-32.svg',
    description: 'Juicy pineapple and citrus over dry woods and oakmoss. Fresh and sophisticated, works well in tropical weather.',
    stores: []
  },
  {
    id: 33,
    brand: 'Marc Jacobs',
    name: 'Daisy',
    concentration: 'Eau de Toilette',
    gender: 'Women',
    category: 'Designer',
    fragranceFamily: 'Floral',
    topNotes: ['Strawberry', 'Violet Leaf', 'Grapefruit'],
    middleNotes: ['Gardenia', 'Violet', 'Jasmine'],
    baseNotes: ['Musk', 'Vanilla', 'White Woods'],
    longevity: '4-6 hours',
    longevityHours: 4,
    sillage: 'Soft',
    price: 'RM 300 - RM 480',
    priceMin: 300,
    priceMax: 480,
    popularity: 86,
    season: ['Spring', 'Summer'],
    occasions: ['Daily wear', 'Brunch', 'Casual'],
    image: 'images/perfumes/perfume-33.svg',
    description: 'Fresh strawberry and soft white flowers. Cheerful, youthful and easy to wear every day.',
    stores: []
  },
  {
    id: 34,
    brand: 'Montblanc',
    name: 'Explorer',
    concentration: 'Eau de Parfum',
    gender: 'Men',
    category: 'Designer',
    fragranceFamily: 'Woody',
    topNotes: ['Bergamot', 'Pink Pepper', 'Clary Sage'],
    middleNotes: ['Vetiver', 'Leather'],
    baseNotes: ['Ambroxan', 'Patchouli', 'Cacao'],
    longevity: '6-8 hours',
    longevityHours: 6,
    sillage: 'Moderate',
    price: 'RM 250 - RM 400',
    priceMin: 250,
    priceMax: 400,
    popularity: 87,
    season: ['Spring', 'Autumn', 'Winter'],
    occasions: ['Office', 'Daily wear', 'Casual'],
    image: 'images/perfumes/perfume-34.svg',
    description: 'Bergamot and vetiver over warm ambroxan and patchouli. A versatile, affordable woody scent for everyday use.',
    stores: []
  },
  {
    id: 35,
    brand: 'Versace',
    name: 'Dylan Blue',
    concentration: 'Eau de Toilette',
    gender: 'Men',
    category: 'Designer',
    fragranceFamily: 'Aquatic',
    topNotes: ['Bergamot', 'Grapefruit', 'Fig Leaf', 'Water Notes'],
    middleNotes: ['Violet Leaf', 'Black Pepper', 'Patchouli', 'Ambroxan'],
    baseNotes: ['Mineral Musk', 'Tonka Bean', 'Saffron', 'Incense'],
    longevity: '7-9 hours',
    longevityHours: 7,
    sillage: 'Moderate',
    price: 'RM 280 - RM 420',
    priceMin: 280,
    priceMax: 420,
    popularity: 86,
    season: ['Spring', 'Summer', 'Autumn'],
    occasions: ['Office', 'Daily wear', 'Night out'],
    image: 'images/perfumes/perfume-35.svg',
    description: 'Fresh citrus and sea notes over a warm, musky base. Clean and masculine, great value for daily wear.',
    stores: []
  },
  {
    id: 36,
    brand: 'Lattafa',
    name: 'Asad',
    concentration: 'Eau de Parfum',
    gender: 'Men',
    category: 'Designer',
    fragranceFamily: 'Amber',
    topNotes: ['Black Pepper', 'Pineapple', 'Tobacco'],
    middleNotes: ['Coffee', 'Patchouli', 'Iris'],
    baseNotes: ['Vanilla', 'Amber', 'Benzoin', 'Labdanum'],
    longevity: '8-10 hours',
    longevityHours: 8,
    sillage: 'Strong',
    price: 'RM 90 - RM 160',
    priceMin: 90,
    priceMax: 160,
    popularity: 90,
    season: ['Autumn', 'Winter'],
    occasions: ['Night out', 'Evening', 'Daily wear'],
    image: 'images/perfumes/perfume-36.svg',
    description: 'Spicy pepper and tobacco over sweet vanilla and amber. A bold, affordable Middle Eastern scent popular with young Malaysian men.',
    stores: []
  },
  {
    id: 37,
    brand: 'Dior',
    name: 'Dior Homme Intense',
    concentration: 'Eau de Parfum',
    gender: 'Men',
    category: 'Designer',
    fragranceFamily: 'Woody',
    topNotes: ['Lavender'],
    middleNotes: ['Iris', 'Ambrette', 'Pear'],
    baseNotes: ['Vetiver', 'Cedar'],
    longevity: '8-10 hours',
    longevityHours: 8,
    sillage: 'Moderate',
    price: 'RM 450 - RM 650',
    priceMin: 450,
    priceMax: 650,
    popularity: 88,
    season: ['Autumn', 'Winter'],
    occasions: ['Formal events', 'Office', 'Date night'],
    image: 'images/perfumes/perfume-37.svg',
    description: 'Powdery iris and soft pear over dry vetiver and cedar. Elegant and refined, a favourite for formal occasions.',
    stores: [1, 3, 5]
  },
  {
    id: 38,
    brand: 'Chanel',
    name: 'Allure Homme Sport',
    concentration: 'Eau de Toilette',
    gender: 'Men',
    category: 'Designer',
    fragranceFamily: 'Fresh',
    topNotes: ['Orange', 'Sea Notes', 'Aldehydes'],
    middleNotes: ['Pepper', 'Neroli', 'Cedar'],
    baseNotes: ['Tonka Bean', 'Vanilla', 'White Musk', 'Vetiver'],
    longevity: '6-8 hours',
    longevityHours: 6,
    sillage: 'Moderate',
    price: 'RM 500 - RM 700',
    priceMin: 500,
    priceMax: 700,
    popularity: 86,
    season: ['Spring', 'Summer'],
    occasions: ['Daily wear', 'Sports', 'Office'],
    image: 'images/perfumes/perfume-38.svg',
    description: 'Zesty orange and sea air over a smooth musky vanilla base. Fresh, sporty and easy to wear in hot weather.',
    stores: [2, 5]
  },
  {
    id: 39,
    brand: 'Rabanne',
    name: 'Invictus',
    concentration: 'Eau de Toilette',
    gender: 'Men',
    category: 'Designer',
    fragranceFamily: 'Aquatic',
    topNotes: ['Grapefruit', 'Sea Notes', 'Mandarin'],
    middleNotes: ['Bay Leaf', 'Jasmine'],
    baseNotes: ['Guaiac Wood', 'Oakmoss', 'Patchouli', 'Ambergris'],
    longevity: '6-8 hours',
    longevityHours: 6,
    sillage: 'Strong',
    price: 'RM 280 - RM 450',
    priceMin: 280,
    priceMax: 450,
    popularity: 89,
    season: ['Spring', 'Summer'],
    occasions: ['Daily wear', 'Sports', 'Casual'],
    image: 'images/perfumes/perfume-39.svg',
    description: 'Bright grapefruit and salty sea notes over woods and ambergris. Energetic and fresh, a gym-bag and weekend favourite.',
    stores: []
  },
  {
    id: 40,
    brand: 'Hugo Boss',
    name: 'Boss Bottled',
    concentration: 'Eau de Toilette',
    gender: 'Men',
    category: 'Designer',
    fragranceFamily: 'Woody',
    topNotes: ['Apple', 'Plum', 'Bergamot', 'Lemon'],
    middleNotes: ['Geranium', 'Cinnamon', 'Clove'],
    baseNotes: ['Vanilla', 'Sandalwood', 'Cedar', 'Vetiver'],
    longevity: '6-8 hours',
    longevityHours: 6,
    sillage: 'Moderate',
    price: 'RM 250 - RM 420',
    priceMin: 250,
    priceMax: 420,
    popularity: 87,
    season: ['Autumn', 'Winter', 'Spring'],
    occasions: ['Office', 'Daily wear', 'Formal events'],
    image: 'images/perfumes/perfume-40.svg',
    description: 'Crisp apple and warm cinnamon over creamy sandalwood. A dependable office scent that has stayed popular for decades.',
    stores: []
  },
  {
    id: 41,
    brand: 'Lattafa',
    name: 'Yara',
    concentration: 'Eau de Parfum',
    gender: 'Women',
    category: 'Designer',
    fragranceFamily: 'Gourmand',
    topNotes: ['Orchid', 'Heliotrope', 'Tangerine'],
    middleNotes: ['Tropical Fruits', 'Gourmand Accord'],
    baseNotes: ['Vanilla', 'Musk', 'Sandalwood'],
    longevity: '6-8 hours',
    longevityHours: 6,
    sillage: 'Moderate',
    price: 'RM 80 - RM 150',
    priceMin: 80,
    priceMax: 150,
    popularity: 91,
    season: ['Spring', 'Autumn', 'Winter'],
    occasions: ['Daily wear', 'Casual', 'Brunch'],
    image: 'images/perfumes/perfume-41.svg',
    description: 'Creamy vanilla with soft fruity florals. Sweet, cosy and very affordable, a viral favourite on social media.',
    stores: []
  },
  {
    id: 42,
    brand: 'Gucci',
    name: 'Bloom',
    concentration: 'Eau de Parfum',
    gender: 'Women',
    category: 'Designer',
    fragranceFamily: 'Floral',
    topNotes: ['Rangoon Creeper'],
    middleNotes: ['Jasmine', 'Tuberose'],
    baseNotes: ['Orris', 'Musk'],
    longevity: '6-8 hours',
    longevityHours: 6,
    sillage: 'Moderate',
    price: 'RM 400 - RM 600',
    priceMin: 400,
    priceMax: 600,
    popularity: 85,
    season: ['Spring', 'Summer'],
    occasions: ['Daily wear', 'Office', 'Weddings'],
    image: 'images/perfumes/perfume-42.svg',
    description: 'A lush white-floral bouquet of jasmine and tuberose. Natural-smelling and graceful, like a garden in full bloom.',
    stores: []
  },
  {
    id: 43,
    brand: 'Burberry',
    name: 'Her',
    concentration: 'Eau de Parfum',
    gender: 'Women',
    category: 'Designer',
    fragranceFamily: 'Gourmand',
    topNotes: ['Strawberry', 'Raspberry', 'Blackberry', 'Lemon'],
    middleNotes: ['Violet', 'Jasmine'],
    baseNotes: ['Musk', 'Vanilla', 'Cashmeran', 'Amber'],
    longevity: '7-9 hours',
    longevityHours: 7,
    sillage: 'Moderate',
    price: 'RM 400 - RM 600',
    priceMin: 400,
    priceMax: 600,
    popularity: 86,
    season: ['Spring', 'Autumn'],
    occasions: ['Daily wear', 'Brunch', 'Date night'],
    image: 'images/perfumes/perfume-43.svg',
    description: 'Juicy red berries over soft musk and vanilla. Playful and sweet, with a clean modern finish.',
    stores: []
  },
  {
    id: 44,
    brand: 'Prada',
    name: 'Paradoxe',
    concentration: 'Eau de Parfum',
    gender: 'Women',
    category: 'Designer',
    fragranceFamily: 'Amber',
    topNotes: ['Pear', 'Bergamot', 'Mandarin'],
    middleNotes: ['Neroli', 'Jasmine'],
    baseNotes: ['Amber', 'Musk', 'Vanilla'],
    longevity: '7-9 hours',
    longevityHours: 7,
    sillage: 'Moderate',
    price: 'RM 450 - RM 650',
    priceMin: 450,
    priceMax: 650,
    popularity: 85,
    season: ['Spring', 'Autumn', 'Winter'],
    occasions: ['Office', 'Date night', 'Daily wear'],
    image: 'images/perfumes/perfume-44.svg',
    description: 'Neroli and jasmine over warm amber and musk. Soft, glowing and modern, easy to wear from day to night.',
    stores: []
  },
  {
    id: 45,
    brand: 'Lancôme',
    name: 'Idôle',
    concentration: 'Eau de Parfum',
    gender: 'Women',
    category: 'Designer',
    fragranceFamily: 'Floral',
    topNotes: ['Pear', 'Bergamot', 'Pink Pepper'],
    middleNotes: ['Rose', 'Jasmine'],
    baseNotes: ['White Musk', 'Vanilla', 'Patchouli', 'Cedar'],
    longevity: '6-8 hours',
    longevityHours: 6,
    sillage: 'Moderate',
    price: 'RM 400 - RM 600',
    priceMin: 400,
    priceMax: 600,
    popularity: 84,
    season: ['Spring', 'Summer'],
    occasions: ['Office', 'Daily wear', 'Brunch'],
    image: 'images/perfumes/perfume-45.svg',
    description: 'A clean, bright rose with fresh pear and white musk. Light and polished, great for everyday wear.',
    stores: []
  },
  {
    id: 46,
    brand: 'Viktor&Rolf',
    name: 'Flowerbomb',
    concentration: 'Eau de Parfum',
    gender: 'Women',
    category: 'Designer',
    fragranceFamily: 'Floral',
    topNotes: ['Tea', 'Bergamot', 'Osmanthus'],
    middleNotes: ['Orchid', 'Jasmine', 'Freesia', 'Rose'],
    baseNotes: ['Patchouli', 'Musk'],
    longevity: '8-10 hours',
    longevityHours: 8,
    sillage: 'Strong',
    price: 'RM 450 - RM 680',
    priceMin: 450,
    priceMax: 680,
    popularity: 87,
    season: ['Autumn', 'Winter', 'Spring'],
    occasions: ['Night out', 'Date night', 'Celebrations'],
    image: 'images/perfumes/perfume-46.svg',
    description: 'An explosion of sweet florals over warm patchouli. Rich, feminine and long-lasting.',
    stores: []
  },
  {
    id: 47,
    brand: 'Maison Margiela',
    name: 'Replica Jazz Club',
    concentration: 'Eau de Toilette',
    gender: 'Unisex',
    category: 'Designer',
    fragranceFamily: 'Amber',
    topNotes: ['Pink Pepper', 'Neroli', 'Lemon'],
    middleNotes: ['Rum', 'Clary Sage', 'Vetiver'],
    baseNotes: ['Tobacco Leaf', 'Vanilla', 'Styrax'],
    longevity: '6-8 hours',
    longevityHours: 6,
    sillage: 'Moderate',
    price: 'RM 450 - RM 650',
    priceMin: 450,
    priceMax: 650,
    popularity: 86,
    season: ['Autumn', 'Winter'],
    occasions: ['Evening', 'Casual', 'Date night'],
    image: 'images/perfumes/perfume-47.svg',
    description: 'Boozy rum and sweet tobacco inspired by a cosy jazz bar. Warm and smooth, with a relaxed feel.',
    stores: []
  },
  {
    id: 48,
    brand: 'Tom Ford',
    name: 'Tobacco Vanille',
    concentration: 'Eau de Parfum',
    gender: 'Unisex',
    category: 'Luxury',
    fragranceFamily: 'Amber',
    topNotes: ['Tobacco Leaf', 'Spices'],
    middleNotes: ['Vanilla', 'Cacao', 'Tonka Bean', 'Tobacco Blossom'],
    baseNotes: ['Dried Fruits', 'Woody Notes'],
    longevity: '10-12 hours',
    longevityHours: 10,
    sillage: 'Strong',
    price: 'RM 1,100 - RM 1,450',
    priceMin: 1100,
    priceMax: 1450,
    popularity: 88,
    season: ['Autumn', 'Winter'],
    occasions: ['Evening', 'Formal events', 'Celebrations'],
    image: 'images/perfumes/perfume-48.svg',
    description: 'Rich tobacco and creamy vanilla with spices and dried fruits. Opulent and very long-lasting.',
    stores: []
  },
  {
    id: 49,
    brand: 'Parfums de Marly',
    name: 'Layton',
    concentration: 'Eau de Parfum',
    gender: 'Men',
    category: 'Niche',
    fragranceFamily: 'Aromatic',
    topNotes: ['Apple', 'Lavender', 'Bergamot', 'Mandarin'],
    middleNotes: ['Geranium', 'Violet', 'Jasmine'],
    baseNotes: ['Vanilla', 'Cardamom', 'Sandalwood', 'Pepper'],
    longevity: '8-10 hours',
    longevityHours: 8,
    sillage: 'Strong',
    price: 'RM 1,100 - RM 1,400',
    priceMin: 1100,
    priceMax: 1400,
    popularity: 89,
    season: ['Autumn', 'Winter', 'Spring'],
    occasions: ['Evening', 'Date night', 'Formal events'],
    image: 'images/perfumes/perfume-49.svg',
    description: 'Fresh apple and lavender over creamy vanilla and cardamom. Versatile and crowd-pleasing, a top niche pick for men.',
    stores: []
  },
  {
    id: 50,
    brand: 'Parfums de Marly',
    name: 'Delina',
    concentration: 'Eau de Parfum',
    gender: 'Women',
    category: 'Niche',
    fragranceFamily: 'Floral',
    topNotes: ['Litchi', 'Rhubarb', 'Bergamot', 'Nutmeg'],
    middleNotes: ['Turkish Rose', 'Peony', 'Vanilla'],
    baseNotes: ['Cashmeran', 'Incense', 'Vetiver'],
    longevity: '8-10 hours',
    longevityHours: 8,
    sillage: 'Strong',
    price: 'RM 1,100 - RM 1,450',
    priceMin: 1100,
    priceMax: 1450,
    popularity: 88,
    season: ['Spring', 'Autumn'],
    occasions: ['Weddings', 'Formal events', 'Date night'],
    image: 'images/perfumes/perfume-50.svg',
    description: 'A juicy litchi and Turkish rose bouquet with soft musky woods. Romantic and luxurious, a best-selling niche floral.',
    stores: []
  }
];

/* ---------------------------------------------------------
   2. BRAND DATA
   "type" matches the perfume categories: Designer, Niche, Luxury.
   Logos are simple monograms, not official brand logos.
   --------------------------------------------------------- */
const BRANDS = [
  { name: 'Dior', origin: 'France', type: 'Designer', logo: 'images/brands/dior.svg', description: 'Paris fashion house with a long perfume history, known for fresh modern bestsellers and classic florals.' },
  { name: 'Chanel', origin: 'France', type: 'Designer', logo: 'images/brands/chanel.svg', description: 'One of the most famous names in perfume, known for elegant florals and refined woody scents.' },
  { name: 'Yves Saint Laurent', origin: 'France', type: 'Designer', logo: 'images/brands/yves-saint-laurent.svg', description: 'French couture house whose fragrances are bold, warm and fashion-forward.' },
  { name: 'Lancôme', origin: 'France', type: 'Designer', logo: 'images/brands/lancome.svg', description: 'French beauty brand best known for sweet, feminine gourmand and floral perfumes.' },
  { name: 'Giorgio Armani', origin: 'Italy', type: 'Designer', logo: 'images/brands/giorgio-armani.svg', description: 'Italian fashion house known for clean, fresh fragrances with wide everyday appeal.' },
  { name: 'Versace', origin: 'Italy', type: 'Designer', logo: 'images/brands/versace.svg', description: 'Italian fashion house with loud, sweet and energetic fragrances.' },
  { name: 'Jean Paul Gaultier', origin: 'France', type: 'Designer', logo: 'images/brands/jean-paul-gaultier.svg', description: 'French designer known for playful bottles and warm, sweet, long-lasting scents.' },
  { name: 'Tom Ford', origin: 'United States', type: 'Luxury', logo: 'images/brands/tom-ford.svg', description: 'Luxury fashion brand whose Private Blend line explores rich oud, wood and amber themes.' },
  { name: 'Maison Francis Kurkdjian', origin: 'France', type: 'Niche', logo: 'images/brands/maison-francis-kurkdjian.svg', description: 'Paris perfume house founded by perfumer Francis Kurkdjian, known for luminous, long-lasting scents.' },
  { name: 'Creed', origin: 'France / United Kingdom', type: 'Niche', logo: 'images/brands/creed.svg', description: 'Heritage niche house famous for fruity, fresh and sophisticated men\'s fragrances.' },
  { name: 'Le Labo', origin: 'United States', type: 'Niche', logo: 'images/brands/le-labo.svg', description: 'New York perfumery known for minimalist design and fragrances blended at the counter.' },
  { name: 'Byredo', origin: 'Sweden', type: 'Niche', logo: 'images/brands/byredo.svg', description: 'Stockholm brand with soft, atmospheric fragrances inspired by memories and places.' },
  { name: 'Jo Malone London', origin: 'United Kingdom', type: 'Luxury', logo: 'images/brands/jo-malone-london.svg', description: 'British fragrance house known for light colognes designed to be worn alone or layered.' },
  { name: 'Rabanne', origin: 'France', type: 'Designer', logo: 'images/brands/rabanne.svg', description: 'Formerly Paco Rabanne. Known for bold, sweet and attention-grabbing fragrances.' },
  { name: 'Valentino', origin: 'Italy', type: 'Designer', logo: 'images/brands/valentino.svg', description: 'Roman couture house with modern fragrances built around vanilla, jasmine and woods.' },
  { name: 'Prada', origin: 'Italy', type: 'Designer', logo: 'images/brands/prada.svg', description: 'Milan fashion house with clean, precise and understated fragrances.' },
  { name: 'Kilian Paris', origin: 'France', type: 'Luxury', logo: 'images/brands/kilian-paris.svg', description: 'Luxury perfume house known for rich, indulgent fragrances in refillable bottles.' },
  { name: 'Hugo Boss', origin: 'Germany', type: 'Designer', logo: 'images/brands/hugo-boss.svg', description: 'German fashion brand known for clean, dependable fragrances for everyday wear.' },
  { name: 'Gucci', origin: 'Italy', type: 'Designer', logo: 'images/brands/gucci.svg', description: 'Italian fashion house with fragrances ranging from lush florals to warm, bold scents.' },
  { name: 'Burberry', origin: 'United Kingdom', type: 'Designer', logo: 'images/brands/burberry.svg', description: 'British fashion house with modern, easy-to-wear fruity and fresh fragrances.' },
  { name: 'Viktor&Rolf', origin: 'Netherlands', type: 'Designer', logo: 'images/brands/viktor-rolf.svg', description: 'Dutch fashion house famous for bold, sweet floral perfumes like Flowerbomb.' },
  { name: 'Maison Margiela', origin: 'France', type: 'Designer', logo: 'images/brands/maison-margiela.svg', description: 'Paris fashion house whose Replica line recreates familiar places and memories.' },
  { name: 'Parfums de Marly', origin: 'France', type: 'Niche', logo: 'images/brands/parfums-de-marly.svg', description: 'French niche house inspired by 18th-century royal perfumery, known for rich, long-lasting scents.' },
  { name: 'Lattafa', origin: 'United Arab Emirates', type: 'Designer', logo: 'images/brands/lattafa.svg', description: 'Middle Eastern perfume house from the UAE, known for rich, long-lasting scents at affordable prices.' },
  { name: 'Carolina Herrera', origin: 'United States', type: 'Designer', logo: 'images/brands/carolina-herrera.svg', description: 'Fashion house known for playful bottles and bold, sweet fragrances such as Good Girl.' },
  { name: 'Dolce & Gabbana', origin: 'Italy', type: 'Designer', logo: 'images/brands/dolce-gabbana.svg', description: 'Italian fashion house whose fragrances range from fresh Mediterranean scents to warm florals.' },
  { name: 'Xerjoff', origin: 'Italy', type: 'Niche', logo: 'images/brands/xerjoff.svg', description: 'Italian niche house known for luxurious bottles and rich, high-quality compositions.' },
  { name: 'Initio Parfums Privés', origin: 'France', type: 'Niche', logo: 'images/brands/initio.svg', description: 'Paris niche house built around powerful, long-lasting scents with oud and musk.' },
  { name: 'Nishane', origin: 'Türkiye', type: 'Niche', logo: 'images/brands/nishane.svg', description: 'Istanbul niche house known for bold extraits with strong performance.' },
  { name: 'Marc Jacobs', origin: 'United States', type: 'Designer', logo: 'images/brands/marc-jacobs.svg', description: 'American designer brand known for light, cheerful and youthful fragrances.' },
  { name: 'Montblanc', origin: 'Germany', type: 'Designer', logo: 'images/brands/montblanc.svg', description: 'German luxury brand offering versatile, affordable fragrances for men.' }
];

/* Filter definitions used by the catalogue page */
const CATEGORY_OPTIONS = ['All', 'Men', 'Women', 'Unisex', 'Luxury', 'Niche', 'Designer'];

const PRICE_FILTERS = {
  'under-500': perfume => perfume.priceMin < 500,
  '500-1000': perfume => perfume.priceMin >= 500 && perfume.priceMin < 1000,
  'over-1000': perfume => perfume.priceMin >= 1000
};

const POPULARITY_FILTERS = {
  bestseller: perfume => perfume.popularity >= 93,
  popular: perfume => perfume.popularity >= 85 && perfume.popularity < 93,
  hidden: perfume => perfume.popularity < 85
};

const LONGEVITY_FILTERS = {
  light: perfume => perfume.longevityHours < 6,
  moderate: perfume => perfume.longevityHours >= 6 && perfume.longevityHours < 8,
  long: perfume => perfume.longevityHours >= 8
};

/* ---------------------------------------------------------
   3. HELPER FUNCTIONS
   --------------------------------------------------------- */
function getPerfumeById(id) {
  return PERFUMES.find(perfume => perfume.id === Number(id));
}

/* True when every word of the query appears somewhere in the perfume's info */
function matchesSearch(perfume, query) {
  const cleanQuery = normalizeText(query.trim());
  if (!cleanQuery) return true;

  const searchableText = normalizeText([
    perfume.brand,
    perfume.name,
    perfume.concentration,
    perfume.gender,
    perfume.category,
    perfume.fragranceFamily,
    ...perfume.topNotes,
    ...perfume.middleNotes,
    ...perfume.baseNotes
  ].join(' '));

  return cleanQuery.split(/\s+/).every(word => searchableText.includes(word));
}

/* Used by the search suggestions in main.js */
function getSearchSuggestions(query, limit = 6) {
  if (!query.trim()) return [];
  return PERFUMES
    .filter(perfume => matchesSearch(perfume, query))
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit);
}

/* Scores other perfumes by shared family, gender and notes */
function getSimilarPerfumes(perfume, limit = 4) {
  const notes = [...perfume.topNotes, ...perfume.middleNotes, ...perfume.baseNotes];

  return PERFUMES
    .filter(other => other.id !== perfume.id)
    .map(other => {
      const otherNotes = [...other.topNotes, ...other.middleNotes, ...other.baseNotes];
      const sharedNotes = otherNotes.filter(note => notes.includes(note)).length;
      let score = sharedNotes;
      if (other.fragranceFamily === perfume.fragranceFamily) score += 3;
      if (other.gender === perfume.gender || other.gender === 'Unisex') score += 1;
      return { perfume: other, score };
    })
    .sort((a, b) => b.score - a.score || b.perfume.popularity - a.perfume.popularity)
    .slice(0, limit)
    .map(item => item.perfume);
}

/* Counts perfumes that match a gender OR a category, e.g. "Men" or "Niche" */
function countPerfumesIn(value) {
  return PERFUMES.filter(p => p.gender === value || p.category === value).length;
}

function countPerfumesByBrand(brandName) {
  return PERFUMES.filter(p => p.brand === brandName).length;
}

function countPerfumesByFamily(family) {
  return PERFUMES.filter(p => p.fragranceFamily === family).length;
}

function getUniqueValues(key) {
  return [...new Set(PERFUMES.map(perfume => perfume[key]))].sort((a, b) => a.localeCompare(b));
}

function pluralize(count, word) {
  return `${count} ${word}${count === 1 ? '' : 's'}`;
}

/* ---------------------------------------------------------
   4. TEMPLATES (cards and quick-view modal)
   --------------------------------------------------------- */
function favoriteButtonAttrs(perfume) {
  const saved = isFavorite(perfume.id);
  const label = saved ? `Remove ${perfume.name} from favorites` : `Add ${perfume.name} to favorites`;
  return `data-favorite="${perfume.id}" aria-pressed="${saved}" aria-label="${escapeHTML(label)}"`;
}

function createPerfumeCard(perfume, index = 0) {
  const saved = isFavorite(perfume.id);
  const compared = isInCompare(perfume.id);
  const detailsUrl = `perfume-details.html?id=${perfume.id}`;

  return `
    <article class="perfume-card" style="--i:${index}">
      <div class="perfume-card-media">
        <a href="${detailsUrl}" tabindex="-1" aria-hidden="true">
          <img src="${perfume.image}" alt="Bottle illustration for ${escapeHTML(perfume.brand)} ${escapeHTML(perfume.name)}" width="400" height="480" loading="lazy">
        </a>
        <span class="card-tag">${perfume.category}</span>
        <button class="fav-btn${saved ? ' is-favorite' : ''}" type="button" ${favoriteButtonAttrs(perfume)}>${icon('heart')}</button>
        <button class="compare-btn${compared ? ' is-selected' : ''}" type="button" data-compare="${perfume.id}" aria-pressed="${compared}" aria-label="${compared ? 'Remove' : 'Add'} ${escapeHTML(perfume.name)} ${compared ? 'from' : 'to'} compare">${icon('compare')}</button>
        <button class="quick-view-btn" type="button" data-quick-view="${perfume.id}">Quick view</button>
      </div>
      <div class="perfume-card-body">
        <p class="label">${escapeHTML(perfume.brand)}</p>
        <h3 class="card-title"><a href="${detailsUrl}">${escapeHTML(perfume.name)}</a></h3>
        <p class="card-concentration">${perfume.concentration}</p>
        <ul class="card-meta" aria-label="Gender and fragrance family">
          <li class="tag">${perfume.gender}</li>
          <li class="tag">${perfume.fragranceFamily}</li>
        </ul>
        <p class="card-info">${icon('clock')} Lasts ${perfume.longevity}</p>
        <div class="card-footer">
          <p class="card-price"><small>Est. price</small>${perfume.price}</p>
          <a href="${detailsUrl}" class="btn btn-outline btn-sm">View Details</a>
        </div>
      </div>
    </article>`;
}

function renderPerfumeGrid(container, perfumes) {
  container.innerHTML = perfumes.map((perfume, index) => createPerfumeCard(perfume, index)).join('');
}

/* Compare button with a visible label (details page and quick view) */
function compareButtonWithLabel(perfume, classes = 'btn btn-outline') {
  const compared = isInCompare(perfume.id);
  return `<button class="${classes}${compared ? ' is-selected' : ''}" type="button" data-compare="${perfume.id}" aria-pressed="${compared}">
      ${icon('compare')}<span class="btn-label">${compared ? 'Added to compare' : 'Add to compare'}</span>
    </button>`;
}

/* Quick view modal (opened by "Quick view" buttons) */
function openPerfumeModal(id) {
  const perfume = getPerfumeById(id);
  if (!perfume) return;

  const saved = isFavorite(perfume.id);

  openModal(`
    <div class="quick-view">
      <div class="quick-view-media">
        <img src="${perfume.image}" alt="Bottle illustration for ${escapeHTML(perfume.brand)} ${escapeHTML(perfume.name)}" width="400" height="480">
      </div>
      <div class="quick-view-body">
        <p class="label">${escapeHTML(perfume.brand)}</p>
        <h2 id="modal-title">${escapeHTML(perfume.name)}</h2>
        <p>${escapeHTML(perfume.description)}</p>
        <dl class="quick-stats">
          <div><dt>Fragrance family</dt><dd>${perfume.fragranceFamily}</dd></div>
          <div><dt>Longevity</dt><dd>${perfume.longevity}</dd></div>
          <div><dt>Sillage</dt><dd>${perfume.sillage}</dd></div>
          <div><dt>Est. price</dt><dd>${perfume.price}</dd></div>
        </dl>
        <div class="notes-inline">
          <p><strong>Top:</strong> ${perfume.topNotes.join(', ')}</p>
          <p><strong>Heart:</strong> ${perfume.middleNotes.join(', ')}</p>
          <p><strong>Base:</strong> ${perfume.baseNotes.join(', ')}</p>
        </div>
        <div class="modal-actions">
          <a href="perfume-details.html?id=${perfume.id}" class="btn btn-gold">View Details</a>
          <button class="btn btn-outline${saved ? ' is-favorite' : ''}" type="button" data-favorite="${perfume.id}" aria-pressed="${saved}">
            ${icon('heart')}<span class="btn-label">${saved ? 'Saved to favorites' : 'Save to favorites'}</span>
          </button>
          ${compareButtonWithLabel(perfume)}
        </div>
      </div>
    </div>`);
}

/* ---------------------------------------------------------
   5a. HOME PAGE HELPERS
   --------------------------------------------------------- */
function renderFeaturedPerfumes(selector, count = 4) {
  const container = $(selector);
  if (!container) return;
  const featured = [...PERFUMES].sort((a, b) => b.popularity - a.popularity).slice(0, count);
  renderPerfumeGrid(container, featured);
}

function renderBrandTiles(selector, count = 8) {
  const container = $(selector);
  if (!container) return;

  const topBrands = [...BRANDS]
    .sort((a, b) => countPerfumesByBrand(b.name) - countPerfumesByBrand(a.name) || a.name.localeCompare(b.name))
    .slice(0, count);

  container.innerHTML = topBrands.map(brand => `
    <a class="brand-tile" href="perfumes.html?brand=${encodeURIComponent(brand.name)}">
      <span class="brand-tile-name">${escapeHTML(brand.name)}</span>
      <span class="brand-tile-count">${pluralize(countPerfumesByBrand(brand.name), 'perfume')}</span>
    </a>`).join('');
}

/* ---------------------------------------------------------
   5b. PERFUMES PAGE (catalogue with search, filters, sorting)
   --------------------------------------------------------- */
const catalogueState = {
  query: '',
  category: 'All',
  brand: 'all',
  gender: 'all',
  family: 'all',
  price: 'all',
  popularity: 'all',
  season: 'all',
  longevity: 'all',
  sort: 'popular'
};

/* Links each filter in catalogueState to its <select> id */
const FILTER_SELECTS = {
  brand: 'filter-brand',
  gender: 'filter-gender',
  family: 'filter-family',
  price: 'filter-price',
  popularity: 'filter-popularity',
  season: 'filter-season',
  longevity: 'filter-longevity'
};

function fillSelect(select, values) {
  values.forEach(value => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });
}

function filterPerfumes() {
  const s = catalogueState;
  return PERFUMES.filter(perfume => {
    if (!matchesSearch(perfume, s.query)) return false;
    if (s.category !== 'All' && perfume.gender !== s.category && perfume.category !== s.category) return false;
    if (s.brand !== 'all' && perfume.brand !== s.brand) return false;
    if (s.gender !== 'all' && perfume.gender !== s.gender) return false;
    if (s.family !== 'all' && perfume.fragranceFamily !== s.family) return false;
    if (s.price !== 'all' && !PRICE_FILTERS[s.price](perfume)) return false;
    if (s.popularity !== 'all' && !POPULARITY_FILTERS[s.popularity](perfume)) return false;
    if (s.season !== 'all' && !perfume.season.includes(s.season)) return false;
    if (s.longevity !== 'all' && !LONGEVITY_FILTERS[s.longevity](perfume)) return false;
    return true;
  });
}

function sortPerfumes(list, sortBy) {
  const sorted = [...list];
  switch (sortBy) {
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'price-low':
      return sorted.sort((a, b) => a.priceMin - b.priceMin);
    case 'price-high':
      return sorted.sort((a, b) => b.priceMax - a.priceMax);
    case 'longevity':
      return sorted.sort((a, b) => b.longevityHours - a.longevityHours);
    default:
      return sorted.sort((a, b) => b.popularity - a.popularity);
  }
}

function countActiveFilters() {
  const s = catalogueState;
  let count = Object.keys(FILTER_SELECTS).filter(key => s[key] !== 'all').length;
  if (s.category !== 'All') count++;
  if (s.query.trim()) count++;
  return count;
}

function renderCatalogue() {
  const grid = $('#perfume-grid');
  const results = sortPerfumes(filterPerfumes(), catalogueState.sort);

  renderPerfumeGrid(grid, results);

  $('#results-count').innerHTML = `Showing <strong>${results.length}</strong> of ${PERFUMES.length} perfumes`;
  $('#empty-state').hidden = results.length > 0;
  grid.hidden = results.length === 0;

  const active = countActiveFilters();
  $('#active-filter-count').textContent = active ? `(${active})` : '';
}

function syncCategoryChips() {
  $all('#category-chips .chip').forEach(chip => {
    const isActive = chip.dataset.category === catalogueState.category;
    chip.classList.toggle('is-active', isActive);
    chip.setAttribute('aria-pressed', String(isActive));
  });
}

function syncFilterControls() {
  $('#catalogue-search').value = catalogueState.query;
  $('#sort-select').value = catalogueState.sort;
  Object.entries(FILTER_SELECTS).forEach(([key, id]) => {
    document.getElementById(id).value = catalogueState[key];
  });
  syncCategoryChips();
}

function resetCatalogueFilters() {
  Object.assign(catalogueState, {
    query: '', category: 'All', brand: 'all', gender: 'all', family: 'all',
    price: 'all', popularity: 'all', season: 'all', longevity: 'all'
  });
  syncFilterControls();
  renderCatalogue();
}

function initPerfumesPage() {
  if (!$('#perfume-grid')) return;

  // 1. Fill the dropdowns that come from the data
  fillSelect($('#filter-brand'), getUniqueValues('brand'));
  fillSelect($('#filter-family'), getUniqueValues('fragranceFamily'));

  // 2. Read starting values from the URL, e.g. perfumes.html?brand=Dior
  const params = new URLSearchParams(window.location.search);
  catalogueState.query = params.get('q') || '';

  const brand = params.get('brand');
  if (brand && getUniqueValues('brand').includes(brand)) catalogueState.brand = brand;

  const family = params.get('family');
  if (family && getUniqueValues('fragranceFamily').includes(family)) catalogueState.family = family;

  const category = params.get('category');
  if (category && CATEGORY_OPTIONS.includes(category)) catalogueState.category = category;

  syncFilterControls();

  // 3. Live search while typing
  $('#catalogue-search').addEventListener('input', debounce(event => {
    catalogueState.query = event.target.value;
    renderCatalogue();
  }, 200));

  // 4. Dropdown filters
  Object.entries(FILTER_SELECTS).forEach(([key, id]) => {
    document.getElementById(id).addEventListener('change', event => {
      catalogueState[key] = event.target.value;
      renderCatalogue();
    });
  });

  // 5. Sorting
  $('#sort-select').addEventListener('change', event => {
    catalogueState.sort = event.target.value;
    renderCatalogue();
  });

  // 6. Category chips
  $all('#category-chips .chip').forEach(chip => {
    chip.addEventListener('click', () => {
      catalogueState.category = chip.dataset.category;
      syncCategoryChips();
      renderCatalogue();
    });
  });

  // 7. Clear buttons and the mobile "Filters" toggle
  $all('[data-clear-filters]').forEach(button => button.addEventListener('click', resetCatalogueFilters));

  const filterToggle = $('#filter-toggle');
  filterToggle.addEventListener('click', () => {
    const isOpen = $('#filters').classList.toggle('is-open');
    filterToggle.setAttribute('aria-expanded', String(isOpen));
  });

  renderCatalogue();
}

/* ---------------------------------------------------------
   5c. PERFUME DETAILS PAGE (perfume-details.html?id=1)
   --------------------------------------------------------- */
function formatSeasons(seasons) {
  return seasons.length === 4 ? 'All year' : seasons.join(', ');
}

function renderNoteCard(title, text, notes, strength) {
  return `
    <article class="note-card" style="--strength:${strength}">
      <h3>${title}</h3>
      <p>${text}</p>
      <ul class="note-list">${notes.map(note => `<li>${escapeHTML(note)}</li>`).join('')}</ul>
    </article>`;
}

function initDetailsPage() {
  const container = $('#perfume-details');
  if (!container) return;

  const perfume = getPerfumeById(getParam('id'));

  if (!perfume) {
    container.innerHTML = `
      <section class="section">
        <div class="container">
          <div class="empty-state">
            <h1>Perfume not found</h1>
            <p>This link doesn't match a perfume in the catalogue. Browse the catalogue to pick one.</p>
            <a href="perfumes.html" class="btn btn-gold">Explore Perfumes</a>
          </div>
        </div>
      </section>`;
    return;
  }

  // Update the page title, meta description and breadcrumb
  document.title = `${perfume.brand} ${perfume.name} | ScentFinder`;
  const metaDescription = $('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', `${perfume.brand} ${perfume.name}: notes, longevity, price range and trusted places to buy.`);
  }
  $('#breadcrumb-current').textContent = perfume.name;

  const saved = isFavorite(perfume.id);
  const sellers = getStoresForPerfume(perfume);

  container.innerHTML = `
    <section class="section details-section">
      <div class="container details-hero">
        <div class="details-media">
          <img src="${perfume.image}" alt="Bottle illustration for ${escapeHTML(perfume.brand)} ${escapeHTML(perfume.name)}" width="400" height="480">
        </div>

        <div class="details-info">
          <p class="label">${escapeHTML(perfume.brand)}</p>
          <h1 class="details-title">${escapeHTML(perfume.name)}</h1>
          <p class="details-concentration">${perfume.concentration}</p>

          <ul class="details-tags" aria-label="Perfume categories">
            <li class="tag">${perfume.gender}</li>
            <li class="tag">${perfume.category}</li>
            <li class="tag">${perfume.fragranceFamily}</li>
          </ul>

          <p class="details-description">${escapeHTML(perfume.description)}</p>

          <dl class="stat-grid">
            <div class="stat">${icon('droplet')}<div><dt>Fragrance family</dt><dd>${perfume.fragranceFamily}</dd></div></div>
            <div class="stat">${icon('clock')}<div><dt>Longevity</dt><dd>${perfume.longevity}</dd></div></div>
            <div class="stat">${icon('wind')}<div><dt>Sillage</dt><dd>${perfume.sillage}</dd></div></div>
            <div class="stat">${icon('sun')}<div><dt>Recommended season</dt><dd>${formatSeasons(perfume.season)}</dd></div></div>
            <div class="stat">${icon('tag')}<div><dt>Est. price range</dt><dd>${perfume.price}</dd></div></div>
            <div class="stat">${icon('store')}<div><dt>Sellers listed</dt><dd>${pluralize(sellers.length, 'store')}</dd></div></div>
          </dl>

          <div class="detail-block">
            <h2>Recommended occasions</h2>
            <ul class="pill-list">${perfume.occasions.map(item => `<li>${item}</li>`).join('')}</ul>
          </div>

          <div class="details-actions">
            <a href="#where-to-buy" class="btn btn-gold">See where to buy</a>
            <button class="btn btn-outline${saved ? ' is-favorite' : ''}" type="button" data-favorite="${perfume.id}" aria-pressed="${saved}">
              ${icon('heart')}<span class="btn-label">${saved ? 'Saved to favorites' : 'Save to favorites'}</span>
            </button>
            ${compareButtonWithLabel(perfume)}
          </div>

          <p class="price-note">${icon('info')} Price range is an indicative example in RM and may change. Confirm the final price with the seller.</p>
        </div>
      </div>
    </section>

    <section class="section section-alt" aria-labelledby="notes-title">
      <div class="container">
        <div class="section-header reveal">
          <h2 id="notes-title" class="section-title">Scent notes</h2>
          <p class="section-subtitle">How the fragrance changes on skin, from the first spray to the dry-down.</p>
        </div>
        <div class="notes-grid">
          ${renderNoteCard('Top notes', 'The first impression, noticeable for roughly the first 15 to 30 minutes.', perfume.topNotes, 1)}
          ${renderNoteCard('Middle notes', 'The heart of the scent, which appears as the top notes fade.', perfume.middleNotes, 0.65)}
          ${renderNoteCard('Base notes', 'The long-lasting foundation you still notice hours later.', perfume.baseNotes, 0.35)}
        </div>
      </div>
    </section>

    <section class="section" id="where-to-buy" aria-labelledby="buy-title">
      <div class="container">
        <div class="section-header reveal">
          <h2 id="buy-title" class="section-title">Where to Buy</h2>
          <p class="section-subtitle">Sellers that carry this brand in Malaysia, from most to least verified.</p>
        </div>
        <p class="notice" style="margin-bottom: 1.25rem">${icon('info')}<span><strong>Before you buy:</strong> stock and prices change often. Check that the seller has this exact perfume, and read what each label means on the <a href="stores.html" class="text-link">Trusted Stores</a> page.</span></p>
        ${sellers.length
          ? `<div class="seller-list">${sellers.map(createSellerRow).join('')}</div>`
          : `<div class="empty-state">
              <h3>No confirmed sellers yet</h3>
              <p>We haven't confirmed a Malaysian seller for this perfume. For the safest purchase, look for the brand's official store or an authorised retailer on the brand's own website.</p>
              <a href="stores.html" class="btn btn-outline">See all trusted stores</a>
            </div>`}
        <p class="small muted" style="margin-top: 1.5rem">Not sure about a seller? Read <a href="guide.html" class="text-link">how to check if a perfume is original</a>.</p>
      </div>
    </section>

    <section class="section section-alt" aria-labelledby="similar-title">
      <div class="container">
        <div class="section-header reveal">
          <h2 id="similar-title" class="section-title">Similar perfumes</h2>
          <p class="section-subtitle">Picked by shared scent family and notes.</p>
        </div>
        <div class="perfume-grid" id="similar-perfumes"></div>
      </div>
    </section>`;

  renderPerfumeGrid($('#similar-perfumes'), getSimilarPerfumes(perfume));

  // The page is built by JavaScript, so jump to #where-to-buy after it exists
  if (window.location.hash === '#where-to-buy') {
    setTimeout(() => $('#where-to-buy').scrollIntoView({ block: 'start' }), 50);
  }
}

/* ---------------------------------------------------------
   5d. BRANDS PAGE
   --------------------------------------------------------- */
function createBrandCard(brand, index = 0) {
  const count = countPerfumesByBrand(brand.name);
  return `
    <article class="brand-card" style="--i:${index}">
      <div class="brand-card-head">
        <img src="${brand.logo}" alt="${escapeHTML(brand.name)} monogram" width="60" height="60" loading="lazy">
        <span class="tag">${brand.type}</span>
      </div>
      <div>
        <h3>${escapeHTML(brand.name)}</h3>
        <p class="brand-origin">${brand.origin}</p>
      </div>
      <p class="brand-desc">${escapeHTML(brand.description)}</p>
      <div class="brand-card-footer">
        <span class="muted">${pluralize(count, 'perfume')}</span>
        <a href="perfumes.html?brand=${encodeURIComponent(brand.name)}" class="text-link">View perfumes</a>
      </div>
    </article>`;
}

function initBrandsPage() {
  const grid = $('#brand-grid');
  if (!grid) return;

  const searchInput = $('#brand-search');
  const typeChips = $all('[data-brand-type]');
  let activeType = 'All';

  function renderBrands() {
    const query = normalizeText(searchInput.value.trim());
    const list = BRANDS
      .filter(brand => activeType === 'All' || brand.type === activeType)
      .filter(brand => !query || normalizeText(`${brand.name} ${brand.origin}`).includes(query))
      .sort((a, b) => a.name.localeCompare(b.name));

    grid.innerHTML = list.map(createBrandCard).join('');
    grid.hidden = list.length === 0;
    $('#brand-empty').hidden = list.length > 0;
    $('#brand-count').innerHTML = `Showing <strong>${list.length}</strong> of ${BRANDS.length} brands`;
  }

  searchInput.addEventListener('input', debounce(renderBrands, 150));

  typeChips.forEach(chip => {
    chip.addEventListener('click', () => {
      activeType = chip.dataset.brandType;
      typeChips.forEach(other => {
        other.classList.toggle('is-active', other === chip);
        other.setAttribute('aria-pressed', String(other === chip));
      });
      renderBrands();
    });
  });

  $('#brand-clear').addEventListener('click', () => {
    searchInput.value = '';
    typeChips[0].click();
  });

  renderBrands();
}
