/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from './types';

export const CATEGORIES = [
  'Dresses',
  'Bangles',
  'Women’s Fashion',
  'Men’s Fashion',
  'Bags',
  'Jewelry',
  'Watches',
  'Accessories'
];

export const BRANDS = [
  'Velvet Crown Atelier',
  'Aurelia Luxury',
  'Heritage Guild',
  'Monarch Classics',
  'Onyx & Co.'
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Burgundy Velvet Evening Blazer',
    price: 12499,
    originalPrice: 19999,
    rating: 4.9,
    reviewsCount: 142,
    images: [
      'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1594938298711-de1da0d102dc?auto=format&fit=crop&w=600&q=80'
    ],
    category: 'Men’s Fashion',
    brand: 'Velvet Crown Atelier',
    availability: 'In Stock',
    description: 'Tailored to absolute perfection, this velvet evening blazer features soft, double-brushed velvet cloth in our signature deep burgundy shade. Designed with elegant shawl lapels, real silk lining, and customized gold crest buttons, this blazer offers structural elegance and comfortable movement for unforgettable formal affairs.',
    details: {
      material: 'Primary: 100% Cotton Velvet, Lining: 100% Silk Satin',
      size: ['S', 'M', 'L', 'XL'],
      style: 'Single-breasted, One-button opening, Dual high vents, Shawl collar',
      care: 'Dry clean only by luxury garment experts. Iron cold under protective cloth layer.'
    },
    reviewsList: [
      {
        id: 'r1_1',
        userName: 'Aarav Malhotra',
        rating: 5,
        comment: 'This blazer is absolutely spectacular. The deep burgundy color catching the light is outstanding, and the silk lining feels incredibly luxurious. Highly recommend!',
        date: '2026-05-12'
      },
      {
        id: 'r1_2',
        userName: 'Vikram Mehta',
        rating: 4.8,
        comment: 'Superb fitting, tailoring exceeds expectations. Handcrafted details are evident in the gold buttons.',
        date: '2026-05-24'
      }
    ],
    isNew: true,
    isBestSeller: true
  },
  {
    id: 'p2',
    name: 'Royal Gold Draped Silk Gown',
    price: 18999,
    originalPrice: 24999,
    rating: 5.0,
    reviewsCount: 88,
    images: [
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80'
    ],
    category: 'Dresses',
    brand: 'Aurelia Luxury',
    availability: 'In Stock',
    description: 'Drape yourself in gold. Sculpted from heavyweight Mulberry raw silk, this masterfully draped golden gown features an asymmetrical shoulder line, flowy sash details, and a high-slit skirt that flows elegantly with every stride. Fully lined in lightweight slip sandwash silk for an ethereal touch against the skin.',
    details: {
      material: '100% Premium Mulberry Silk Gown, Sandwash silk slip included',
      size: ['XS', 'S', 'M', 'L'],
      style: 'Asymmetrical silhouette, Invisible side zipper zipper closure, High-leg front-left opening',
      care: 'Dry clean only. Store on wide padded hangers away from dust.'
    },
    reviewsList: [
      {
        id: 'r2_1',
        userName: 'Priya Sharma',
        rating: 5,
        comment: 'An absolute masterpiece. Got endless compliments at the royal charity gala. Fits like a custom glove!',
        date: '2026-06-02'
      }
    ],
    isNew: false,
    isBestSeller: true
  },
  {
    id: 'p3',
    name: 'Crocodile Embossed Leather Satchel',
    price: 9499,
    originalPrice: 14999,
    rating: 4.8,
    reviewsCount: 112,
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600&q=80'
    ],
    category: 'Bags',
    brand: 'Heritage Guild',
    availability: 'In Stock',
    description: 'Constructed from select Italian calfskin tanned with custom crocodile embossed relief structures, this satchel bag oozes luxury. Rigid structural double-handle design, solid brass hardware with matte gold plating, and a spacious suede-lined interior compartments with custom organizer pockets.',
    details: {
      material: 'Genuine embossed Calfskin Leather, Brass-plated solid hardware, Suede lining',
      size: ['One Size (12\" x 9.5\" x 5.5\")'],
      style: 'Classic Satchel, Detachable shoulder matching strap included, Front security flip lock',
      care: 'Clean with dry microfiber cloth. Use specialized leather conditioner thrice annually.'
    },
    reviewsList: [
      {
        id: 'r3_1',
        userName: 'Neha Singhania',
        rating: 5,
        comment: 'Stunning leatherwork. The gold lock feels heavy and authentic. Extremely spacious for all essentials.',
        date: '2026-04-15'
      }
    ],
    isNew: true,
    isBestSeller: false
  },
  {
    id: 'p4',
    name: 'Sovereign Crown Ruby Ring',
    price: 7499,
    originalPrice: 9999,
    rating: 4.7,
    reviewsCount: 64,
    images: [
      'https://files.catbox.moe/49s947.webp',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80'
    ],
    category: 'Jewelry',
    brand: 'Onyx & Co.',
    availability: 'In Stock',
    description: 'Make a royal statement with the Sovereign Crown ring. Crafted in solid vermeil sterling silver electroplated with thick 24k yellow gold, featuring a central oval-cut royal red lab-created pigeon blood ruby stone flanked by sparkling pavé zirconia crystal micro-crown details.',
    details: {
      material: '24K Gold Vermeil over 925 Sterling Silver, Oval pigeon blood ruby, White zirconias',
      size: ['6', '7', '8', '9'],
      style: 'Halo Crown Vintage Band, 3-carat main gemstone',
      care: 'Keep separate from abrasive items. Wipe after wearing with luxury flannel jewelry cloth.'
    },
    reviewsList: [
      {
        id: 'r4_1',
        userName: 'Karan Kapoor',
        rating: 4.7,
        comment: 'Beautiful crafted crown ring. Gifted it to my wife and she couldn’t stop staring at it.',
        date: '2026-05-30'
      }
    ],
    isNew: false,
    isBestSeller: true
  },
  {
    id: 'p5',
    name: 'Imperial Chrono Oyster Watch',
    price: 15999,
    originalPrice: 22499,
    rating: 4.9,
    reviewsCount: 204,
    images: [
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=600&q=80'
    ],
    category: 'Watches',
    brand: 'Monarch Classics',
    availability: 'In Stock',
    description: 'A classic chronograph reimagined for modern pioneers. Housing a robust Japanese quartz movement with dual calendar sub-dials, sapphire crystal anti-flare lens, and full solid stainless steel frame brushed with polished deep gold finish. Secure lock deployment clasp and 5 ATM depth protection.',
    details: {
      material: 'Marine Grade 316L Stainless Steel, Scratch-proof sapphire glass',
      size: ['One Size (41mm Dial Size, Adjustable Link Strap)'],
      style: 'Vintage Sports Chronograph, Sunburst textured gold dial with luminous markers',
      care: 'Water resistant up to 50 meters. Avoid magnetic surfaces and strong direct chemical contact.'
    },
    reviewsList: [
      {
        id: 'r5_1',
        userName: 'Deepak Sen',
        rating: 5,
        comment: 'Absolutely spectacular. Weight is perfectly balanced, looks easily double its cost. Very comfortable link band.',
        date: '2026-06-01'
      }
    ],
    isNew: false,
    isBestSeller: true
  },
  {
    id: 'p6',
    name: 'Golden Rimmed Aviator Sunglasses',
    price: 3499,
    originalPrice: 5999,
    rating: 4.6,
    reviewsCount: 95,
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80'
    ],
    category: 'Accessories',
    brand: 'Velvet Crown Atelier',
    availability: 'In Stock',
    description: 'A contemporary take on timeless aviators. Expertly engineered alloy framing coated in high gloss real-gold finish, coupled with custom organic polarized champagne lenses providing absolute UV400 defense against harsh glares. Ergonomic tortoiseshell design nose tips for flawless grip.',
    details: {
      material: 'Premium Electroplated Steel Alloy, Multi-layered Polarized Lenses, Acetate tips',
      size: ['One Size (Uni-fit Face Width 140mm)'],
      style: 'Ultra-thin gold aviators frame with integrated dual wire bridge support',
      care: 'Store strictly inside supplied velvet protective hard sleeve. Clean only with included silk cloth.'
    },
    reviewsList: [
      {
        id: 'r6_1',
        userName: 'Siddharth Roy',
        rating: 4.5,
        comment: 'Extremely lightweight and luxurious. Polarized lens works perfectly under direct noon glare.',
        date: '2026-04-18'
      }
    ],
    isNew: true,
    isBestSeller: false
  },
  {
    id: 'p7',
    name: 'Evelyn Cascade Pearl Necklace',
    price: 6499,
    originalPrice: 8999,
    rating: 4.9,
    reviewsCount: 76,
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80'
    ],
    category: 'Jewelry',
    brand: 'Aurelia Luxury',
    availability: 'In Stock',
    description: 'Drape your collarbone in high elegance. Hand-selected premium AAA saltwater cultured white pearls woven across a solid yellow-gold box chain. Interlocking circular links allow smooth drapes that capture light with shimmering luster.',
    details: {
      material: '18K Yellow Gold Plating, 0.925 Sterling Silver core, AAA Cultured Saltwater Pearls',
      size: ['Adjustable chain length (16\" to 18\")'],
      style: 'Layered pearl choker necklace blend, Lobster claw clasp mechanism',
      care: 'Keep dry. Avoid perfume spraying directly on pearls as it diminishes luster over time.'
    },
    reviewsList: [
      {
        id: 'r7_1',
        userName: 'Anjali Deshmukh',
        rating: 5,
        comment: 'Truly beautiful. The pearls are heavy, perfectly matched in shape, and shine beautifully in warm restaurant lighting.',
        date: '2026-05-19'
      }
    ],
    isNew: true,
    isBestSeller: false
  },
  {
    id: 'p8',
    name: 'Monarch Cashmere Overcoat',
    price: 14999,
    originalPrice: 22499,
    rating: 4.8,
    reviewsCount: 52,
    images: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80'
    ],
    category: 'Men’s Fashion',
    brand: 'Monarch Classics',
    availability: 'Low Stock',
    description: 'The pinnacle of stylish outerwear. Featuring a premium blend of selected fine cashmere and organic virgin sheep wool, this masterfully structured double-breasted overcoat delivers exquisite climate insulation, fluid shoulder movement, and refined hand-stitch collar elements.',
    details: {
      material: '35% Luxury Cashmere, 65% Certified Virgin Sheep Wool, Silk-Twill inner lining',
      size: ['M', 'L', 'XL'],
      style: 'Tailored Chesterfield Double-breasted Overcoat, Real horn premium buttons',
      care: 'Dry clean once a year. Store inside breathable canvas clothing bag.'
    },
    reviewsList: [
      {
        id: 'r8_1',
        userName: 'Rohan Verma',
        rating: 5,
        comment: 'Unbelievably soft material and heavy weight. The fit is beautifully tailored. Keeps me cozy and sophisticated.',
        date: '2026-04-29'
      }
    ],
    isNew: true,
    isBestSeller: false
  },
  {
    id: 'p9',
    name: 'Saffiano Leather Minimal Tote',
    price: 8499,
    originalPrice: 11999,
    rating: 4.5,
    reviewsCount: 110,
    images: [
      'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80'
    ],
    category: 'Bags',
    brand: 'Heritage Guild',
    availability: 'In Stock',
    description: 'Designed as a premium multi-role companion. Structured with rigid water-resistant Italian Saffiano cross-hatch leather, this minimalist tote opens wide to store full tech notebooks and beauty products, framed with ultra-thin tailored shoulder handles.',
    details: {
      material: 'Genuine Scratch-resistant Saffiano Leather, Polished silver brass accents',
      size: ['Standard (14\" x 12\" x 5\")'],
      style: 'Minimal tote with integrated zip divider core compartment',
      care: 'Wipe with damp microfiber cloth. Store stuffed with tissue paper to preserve original geometry.'
    },
    reviewsList: [
      {
        id: 'r9_1',
        userName: 'Jasmin Gill',
        rating: 4.5,
        comment: 'Great structural handbag for everyday business use. Heavy duty Saffiano is truly scratch proof as described!',
        date: '2026-05-14'
      }
    ],
    isNew: false,
    isBestSeller: false
  },
  {
    id: 'p10',
    name: 'Midnight Onyx Minimal Watch',
    price: 11499,
    originalPrice: 16999,
    rating: 4.8,
    reviewsCount: 89,
    images: [
      'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=600&q=80'
    ],
    category: 'Watches',
    brand: 'Onyx & Co.',
    availability: 'In Stock',
    description: 'An elegant display of luxury minimalism. Presenting a stealth, unbranded midnight-black sandblasted sunburst dial housed inside ultra-thin high density stainless carbon frame, detailed with custom gold accents and rich full-grain oiled camel leather strap.',
    details: {
      material: 'Ultra-thin DLC Carbon Coated Steel Dial, Organic Oiled Leather Band',
      size: ['One Size (38mm Flat Dial Case, Genuine Leather Variable Fit Strap)'],
      style: 'Minimalist dress watch with Japanese caliber-8 quartz movement core',
      care: 'Avoid immersion water. Leather band develops a beautiful organic antique patina naturally.'
    },
    reviewsList: [
      {
        id: 'r10_1',
        userName: 'Kabir Kapoor',
        rating: 5,
        comment: 'The absolute epitome of elegant minimalism. Perfect dress watch for subtle luxury styling.',
        date: '2026-06-03'
      }
    ],
    isNew: false,
    isBestSeller: false
  },
  {
    id: 'p11',
    name: 'Velvet Hexagonal Glam Glasses',
    price: 4299,
    originalPrice: 6499,
    rating: 4.7,
    reviewsCount: 72,
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80'
    ],
    category: 'Accessories',
    brand: 'Onyx & Co.',
    availability: 'In Stock',
    description: 'Crafted for fashion visionaries. Distinctive geometric hexagonal structure featuring robust Italian acetate with deep burgundy accents, paired with premium protective smoked lenses with solid gold hardware details.',
    details: {
      material: 'Premium Cellulose Acetate frame, Matte gold hinge pins, Tri-acetate cellulose lenses',
      size: ['One Size (Face Width 138mm)'],
      style: 'Geometric Hexagon Fashion Eyewear, Polarized UV-400 sunglasses',
      care: 'Clean strictly with dry lens cloth. Do not leave exposed inside warm vehicle dashboards.'
    },
    reviewsList: [
      {
        id: 'r11_1',
        userName: 'Kriti Sen',
        rating: 4.7,
        comment: 'Outstanding look and shape. Heavy duty luxury look, frame is robust and well balanced.',
        date: '2026-05-22'
      }
    ],
    isNew: true,
    isBestSeller: false
  },
  {
    id: 'p12',
    name: 'Imperial Suede Gold-Buckle Belt',
    price: 2999,
    originalPrice: 4499,
    rating: 4.6,
    reviewsCount: 61,
    images: [
      'https://images.unsplash.com/photo-1624222247344-550fb8407324?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80'
    ],
    category: 'Accessories',
    brand: 'Velvet Crown Atelier',
    availability: 'Low Stock',
    description: 'The crowning element of formal styling. Crafted in luxurious selected velvet-suede backed with premium vegetable tanned supple inner leather, styled with a polished solid brass sovereign gold horseshoe buckle.',
    details: {
      material: 'Luxurious Suede outer, Genuine Vegetable-tanned Cow leather core, Solid Brass Buckle',
      size: ['32', '34', '36', '38'],
      style: 'Form-fitting classic dress belt with 5 precision punched sizing ports',
      care: 'Avoid direct moisture. Clean with specialized rubber suede eraser blocks.'
    },
    reviewsList: [
      {
        id: 'r12_1',
        userName: 'Sameer Sen',
        rating: 4.8,
        comment: 'Gorgeous item, pure velvet texture is awesome! Looks incredible paired with dark chinos or trousers.',
        date: '2026-06-05'
      }
    ],
    isNew: false,
    isBestSeller: false
  },
  {
    id: 'p13',
    name: 'Classic Silk Blend Pocket Square & Tie Set',
    price: 999,
    originalPrice: 1999,
    rating: 4.7,
    reviewsCount: 48,
    images: [
      'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80'
    ],
    category: 'Men’s Fashion',
    brand: 'Velvet Crown Atelier',
    availability: 'In Stock',
    description: 'An exquisite silk-blend jacquard tie and matching pocket square set. Adorned with delicate vintage paisley patterns in deep emerald and royal charcoal shades, perfect for adding an instant touch of sophistication to any dress suit or wedding attire.',
    details: {
      material: '70% Soft Jagged Silk, 30% Fine Cotton Blend',
      size: ['Standard Tie (3.25" width, 58" length)'],
      style: 'Classic necktie structure with handpinned backing stitches, 12" square handkerchief',
      care: 'Steam iron only. Avoid spraying with water or laundry starch spray.'
    },
    reviewsList: [
      {
        id: 'r13_1',
        userName: 'Anish Deshpande',
        rating: 5,
        comment: 'Unbelievable value! The paisley shine is truly spectacular and fits perfectly with my navy blazer.',
        date: '2026-05-18'
      }
    ],
    isNew: true,
    isBestSeller: true
  },
  {
    id: 'p14',
    name: 'Gold-Tone Classic Hoop Earrings',
    price: 799,
    originalPrice: 1499,
    rating: 4.8,
    reviewsCount: 35,
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80'
    ],
    category: 'Jewelry',
    brand: 'Aurelia Luxury',
    availability: 'In Stock',
    description: 'Delicately handcrafted lightweight polished brass hoop earrings dipped in 18K yellow gold micro-plating for an everlasting premium shine. Designed with convenient hypoallergenic secure click closures for comfortable, irritation-free daily wear.',
    details: {
      material: '18K Yellow Gold Plating over Solid Eco-friendly Copper Alloy',
      size: ['Medium hoops (25mm diameter)'],
      style: 'Tubular round continuous band hoop earrings with durable tension latch',
      care: 'Always wipe with soft tissue after wear. Remove before shower swimming.'
    },
    reviewsList: [
      {
        id: 'r14_1',
        userName: 'Meenakshi Iyer',
        rating: 5,
        comment: 'Extremely lightweight on the ears! Look so expensive, completely perfect for college or office styling.',
        date: '2026-05-29'
      }
    ],
    isNew: true,
    isBestSeller: true
  },
  {
    id: 'p15',
    name: 'Handloomed Cotton-Linen Summer Scarf',
    price: 899,
    originalPrice: 1799,
    rating: 4.6,
    reviewsCount: 28,
    images: [
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80'
    ],
    category: 'Accessories',
    brand: 'Heritage Guild',
    availability: 'In Stock',
    description: 'Woven by traditional masters using pure organic cotton and breathable linen fibers. Highly airy, soft, and styled in gorgeous neutral pastel checks with manually twisted tassels, offering an elegant layer for both winters and summers.',
    details: {
      material: '60% Certified Organic Cotton, 40% Fine Hand-Spun Linen threads',
      size: ['One Size (70" x 22")'],
      style: 'Artisanal fringe-end wrap scarf with double-weave structural borders',
      care: 'Gentle hand wash under cold water. Lay flat in shade to dry naturally.'
    },
    reviewsList: [
      {
        id: 'r15_1',
        userName: 'Shruti Sen',
        rating: 4,
        comment: 'Warm yet breathable. The pastel color selection looks very classy for family gatherings.',
        date: '2026-06-03'
      }
    ],
    isNew: false,
    isBestSeller: false
  },
  {
    id: 'p16',
    name: 'Textured Saffiano Cardholder',
    price: 699,
    originalPrice: 1299,
    rating: 4.5,
    reviewsCount: 54,
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80'
    ],
    category: 'Bags',
    brand: 'Onyx & Co.',
    availability: 'In Stock',
    description: 'A compact and incredibly slim multi-pocket credit card holder. Styled with textured, scratch-resistant vegan saffiano leather, featuring four symmetrical card chambers and a central pocket section finished with a golden foil leaf stamp.',
    details: {
      material: '100% Water-repellent Vegan Polyurethane Saffiano Leather, Silk twill lining',
      size: ['Sleek pocket size (4.1" x 3.0" x 0.15")'],
      style: 'Double-sided card storage pouch with quick-access central slip compartment',
      care: 'Wipe clean easily with damp soft cloth. Dry away from intense heat.'
    },
    reviewsList: [
      {
        id: 'r16_1',
        userName: 'Amit Ranjan',
        rating: 5,
        comment: 'Extremely convenient! No more bulging pockets, looks beautiful and fits premium debit cards easily.',
        date: '2026-06-06'
      }
    ],
    isNew: true,
    isBestSeller: false
  },
  {
    id: 'p17',
    name: 'Aura Quartz Rose-Gold Chain Bracelet',
    price: 1199,
    originalPrice: 2299,
    rating: 4.9,
    reviewsCount: 42,
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80'
    ],
    category: 'Jewelry',
    brand: 'Aurelia Luxury',
    availability: 'In Stock',
    description: 'An elegant statement of organic warmth. Features a dainty solid silver anchor chain electroplated with bright 18K rose gold, highlighting a central polished pink quartz stone that catches highlights.',
    details: {
      material: '18K Rose Gold Plated Premium Sterling Silver core, Selected Aura Pink Quartz',
      size: ['Adjustable wrist chain (6.5" to 8" extender)'],
      style: 'Delicate slider wrist chain bracelet, secure premium spring loop clasp',
      care: 'Keep safely enclosed in felt casket when not in hand. Do not dip in bleach solutions.'
    },
    reviewsList: [
      {
        id: 'r17_1',
        userName: 'Riddhi Patel',
        rating: 5,
        comment: 'So lovely! It has beautiful dainty proportions and the rose gold holds up perfectly without tarnish.',
        date: '2026-05-12'
      }
    ],
    isNew: false,
    isBestSeller: true
  },
  {
    id: 'p18',
    name: 'Regal Brass Sovereign Cufflinks',
    price: 1099,
    originalPrice: 1999,
    rating: 4.7,
    reviewsCount: 30,
    images: [
      'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1594938298711-de1da0d102dc?auto=format&fit=crop&w=600&q=80'
    ],
    category: 'Accessories',
    brand: 'Monarch Classics',
    availability: 'In Stock',
    description: 'An immaculate pair of handpolished solid brass cufflinks. Cast with an elegant laser-engraved crown emblem on a brushed slate surface, offering a sovereign, premium finish to french cup shirts at family celebrations or interviews.',
    details: {
      material: 'Solid Brass Base Plate, High durability brushed pewter backing pins',
      size: ['Standard cufflink studs (16mm plate diameter)'],
      style: 'Slightly domed round cufflinks set, bullet-back toggle mechanisms',
      care: 'Avoid storing near abrasive keys. Polish occasionally with a soft cotton flannel cloth.'
    },
    reviewsList: [
      {
        id: 'r18_1',
        userName: 'Pranav Joshi',
        rating: 5,
        comment: 'Very robust build and beautiful shine. Received many positive remarks at our wedding festival.',
        date: '2026-05-27'
      }
    ],
    isNew: true,
    isBestSeller: false
  },
  {
    id: 'p19',
    name: 'Classic Minimalist Leather Strap Watch',
    price: 1899,
    originalPrice: 3999,
    rating: 4.6,
    reviewsCount: 67,
    images: [
      'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=600&q=80'
    ],
    category: 'Watches',
    brand: 'Monarch Classics',
    availability: 'In Stock',
    description: 'An elegant analog watch designed to bring timeless luxury to daily wear. Features a slim minimalist silver-brushed watch dial, sapphire-coated crystal lens for high scratch defense, and a highly durable synthetic camel brown crocodile strap.',
    details: {
      material: 'Premium Alloy Case with Gold plating, Hardened Mineral Glass, Vegan Faux-Leather strap',
      size: ['One Size (40mm flat watch case, 20mm adjustable band width)'],
      style: 'Sleek minimal dress watch with Japanese quartz battery movement system',
      care: 'Splash-proof only. Dry instantly if exposed to heavy monsoon rains.'
    },
    reviewsList: [
      {
        id: 'r19_1',
        userName: 'Gaurav K.',
        rating: 4.5,
        comment: 'Extremely beautiful! Fits easily on standard wrists, keeps perfect time, and looks luxurious with my office shirts.',
        date: '2026-06-04'
      }
    ],
    isNew: true,
    isBestSeller: true
  },
  {
    id: 'p20',
    name: 'Midnight Floral Georgette Dress',
    price: 1499,
    originalPrice: 2999,
    rating: 4.8,
    reviewsCount: 56,
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80'
    ],
    category: 'Dresses',
    brand: 'Heritage Guild',
    availability: 'In Stock',
    description: 'A beautiful georgette midi dress featuring a romantic floral pattern against a deep midnight black background. Designed with elegant tiered puff sleeves, a flattering smocked bodice, and a flowing skirt profile that offers unparalleled daily luxury.',
    details: {
      material: '100% Breathable Georgette, Soft inner cotton lining slip',
      size: ['S', 'M', 'L', 'XL'],
      style: 'Tiered midi length, elastic smocked bust, delicate sweetheart neckline',
      care: 'Hand wash in cold water or dry clean. Do not wring or tumble dry.'
    },
    reviewsList: [
      {
        id: 'r20_1',
        userName: 'Shreya Roy',
        rating: 5,
        comment: 'Absolutely stunning dress for this budget! Georgette drape is gorgeous and the fit is incredibly elastic and supportive.',
        date: '2026-05-30'
      }
    ],
    isNew: true,
    isBestSeller: true
  },
  {
    id: 'p21',
    name: 'Royal Handcrafted Kundan Gold Bangles Set',
    price: 699,
    originalPrice: 1599,
    rating: 4.9,
    reviewsCount: 78,
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80'
    ],
    category: 'Bangles',
    brand: 'Aurelia Luxury',
    availability: 'In Stock',
    description: 'A sovereign handpolished gold-plated kundan bangle set. Featuring meticulously placed faux glass gemstones, intricate filigree side carvings, and safe screw hinges, giving you a royal festive wedding accessory at an incredibly pocket-friendly rate.',
    details: {
      material: 'Eco-friendly Brass with 18k Yellow Gold Micro-plating, Premium Kundan glass stones',
      size: ['2.4', '2.6', '2.8'],
      style: 'Pair of 2 matching festive kadhas with convenient side screw latch opening',
      care: 'Avoid sweat and direct sanitizers. Wipe with a dry cotton microfiber cloth before packing.'
    },
    reviewsList: [
      {
        id: 'r21_1',
        userName: 'Divya Nair',
        rating: 5,
        comment: 'They look absolutely real! The gold luster and weight feel very premium. Unbeatable pricing.',
        date: '2026-06-01'
      }
    ],
    isNew: true,
    isBestSeller: true
  },
  {
    id: 'p22',
    name: 'Ethnic Cotton Linen Indigo Dress',
    price: 899,
    originalPrice: 1799,
    rating: 4.6,
    reviewsCount: 42,
    images: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80'
    ],
    category: 'Dresses',
    brand: 'Heritage Guild',
    availability: 'In Stock',
    description: 'An elegant Indian indigo hand-dyed print fusion dress. Handcrafted from premium breathable cotton-linen weave, styled with deep side-pockets, traditional wood buttons, and a flattering round neck, ensuring utmost style on everyday hot summer days.',
    details: {
      material: '60% Fine Organic Cotton, 40% Natural Flax Linen',
      size: ['M', 'L', 'XL'],
      style: 'A-Line flared kurta styling, elegant three-quarter rolled sleeves',
      care: 'Wash separately for the first cycle. Pure indigo dye may bleed slightly.'
    },
    reviewsList: [
      {
        id: 'r22_1',
        userName: 'Preeti Sharma',
        rating: 4,
        comment: 'Wonderful indigo print. The cotton is extremely breathable and comfortable for my daily hot office commute.',
        date: '2026-06-05'
      }
    ],
    isNew: false,
    isBestSeller: false
  },
  {
    id: 'p23',
    name: 'Regal Velvet Stone Lac Bangles Set',
    price: 499,
    originalPrice: 999,
    rating: 4.7,
    reviewsCount: 31,
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=600&q=80'
    ],
    category: 'Bangles',
    brand: 'Aurelia Luxury',
    availability: 'In Stock',
    description: 'A gorgeous Rajasthani traditional handcrafted lac bangle set of 12. Adorned with delicate golden beaded borders, glittering crystal rhinestones, and vibrant red velvet flocking accents, bringing instant royal heritage vibes to your outfit.',
    details: {
      material: 'Pure natural Lac core base, velvet micro-fibers, AAA rhinestones',
      size: ['2.4', '2.6', '2.8'],
      style: 'Set of 12 structured bangles including 4 outer broad kadhas and 8 inner thin pieces',
      care: 'Keep far away from heaters or high open flame boundaries as natural lac softens slightly with heat.'
    },
    reviewsList: [
      {
        id: 'r23_1',
        userName: 'Rekha Gupta',
        rating: 5,
        comment: 'Extremely shiny and well-packaged. Looks gorgeous with red sarees! Unbelievably budget-friendly.',
        date: '2026-05-24'
      }
    ],
    isNew: true,
    isBestSeller: false
  },
  {
    id: 'p24',
    name: 'Teal Banarasi Silk-Blend Flared Gown',
    price: 2499,
    originalPrice: 4999,
    rating: 4.9,
    reviewsCount: 65,
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80'
    ],
    category: 'Dresses',
    brand: 'Velvet Crown Atelier',
    availability: 'In Stock',
    description: 'Drape yourself in deep festive hues. This spectacular flared gown is woven with a premium Banarasi art-silk weave showcasing traditional golden Zari floral brocades along the collar and hemline. Unites heritage aesthetics with affordable everyday style.',
    details: {
      material: 'Premium Poly-Silk Jacquard Brocade, breathable polyester sanitised inner lining',
      size: ['S', 'M', 'L', 'XL'],
      style: 'Floor-length flared umbrella-gown with matching solid silk-blend dupatta scarf',
      care: 'Dry clean recommended first time. Steam iron on reverse under warm temperature.'
    },
    reviewsList: [
      {
        id: 'r24_1',
        userName: 'Kalyani S.',
        rating: 5,
        comment: 'Stunning zari work! The flared design gives a beautiful princess silhouette at an astonishing family price.',
        date: '2026-06-08'
      }
    ],
    isNew: true,
    isBestSeller: true
  },
  {
    id: 'p25',
    name: 'Minimalist Polished Golden Brass Kada set',
    price: 599,
    originalPrice: 1199,
    rating: 4.8,
    reviewsCount: 92,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=600&q=80'
    ],
    category: 'Bangles',
    brand: 'Onyx & Co.',
    availability: 'In Stock',
    description: 'A stylish pair of sleek, mirror-polished solid brass kadas. Handcarved with subtle geometric modern diagonal striations along the circumference, making them perfect to wear alongside smart wristwatches.',
    details: {
      material: 'High-grade Solid Brass, hand-polished gloss surface',
      size: ['2.6', '2.8'],
      style: 'Openable Kada band with comfortable smooth rounded edge profiles',
      care: 'Clean with a squeeze of lemon juice or brass polish if color darkens over years.'
    },
    reviewsList: [
      {
        id: 'r25_1',
        userName: 'Rhea Sen',
        rating: 5,
        comment: 'These are gorgeous! Very simple, modern elegance. Perfect to match with office wear or casual outings.',
        date: '2026-06-09'
      }
    ],
    isNew: false,
    isBestSeller: true
  }
];

export const WHY_CHOOSE_US = [
  {
    title: 'Premium Quality Materials',
    description: 'We harvest raw Mulberry silks, certified organic cashmere, and real calfskin tanned in Italian heritage ateliers.'
  },
  {
    title: 'Affordable Luxury',
    description: 'By bypassing intermediaries, we deliver masterfully customized luxury designs at a fair, sustainable cost.'
  },
  {
    title: 'Express Delivery',
    description: 'Handled with pristine white-glove security, dispatched across India in specialized premium protective casings.'
  },
  {
    title: 'Intuitive Returns',
    description: 'Unmatched 14 days risk-free courier pickup guarantee. No unnecessary questionnaires asked.'
  },
  {
    title: 'Secure Payments',
    description: 'Fully enciphered payments complying with peak global 256-bit bank safety layers.'
  },
  {
    title: '24/7 Royal Desk',
    description: 'A personal concierge team always here to support your styling, size adjustments, and delivery inquiries.'
  }
];

export const COUPONS = [
  { code: 'ROYAL10', value: 0.10, description: 'Get 10% OFF on all items' },
  { code: 'VELVET40', value: 0.40, description: 'Flat 40% OFF seasonal discount' },
  { code: 'WELCOMECROWN', value: 0.15, description: 'Welcome 15% OFF for first-time buyers' }
];
