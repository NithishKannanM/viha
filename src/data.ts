import { Product, Order } from './types';
import varahiAmmanImage from '../assets/varahi-amman-statue.png';
import vellerukkuVinayagarImage from '../assets/Vellerukku_Vinayagar.png';
import amethystVastuPyramidImage from '../assets/Amethyst-Vastu-Pyramid.png';
export const BRAND_COLORS = {
  maroon: '#5c181a',
  maroonDark: '#3f0207',
  gold: '#B8893D',
  cream: '#fdf9f1',
  creamDark: '#f1ede6',
  paperWhite: '#FDFBF7',
  charcoal: '#2D2D2D',
};

export const PRODUCT_CATEGORIES = [
  { id: 'all', label: 'All Essentials' },
  { id: 'spiritual-pooja', label: 'Spiritual & Pooja' },
  { id: 'ayurveda-herbal', label: 'Ayurveda & Herbal' },
  { id: 'jewellery-fashion', label: 'Jewellery & Fashion' },
  { id: 'home-living', label: 'Home & Living' },
  { id: 'food-organic', label: 'Food & Organic' },
  { id: 'kids-baby', label: 'Kids & Baby' },
  { id: 'books-stationery', label: 'Books & Stationery' },
  { id: 'bags-pouches', label: 'Bags & Pouches' },
  { id: 'fashion-grooming', label: 'Fashion & Grooming' },
  { id: 'new-arrivals', label: 'New Arrivals' },
] as const;

export interface Region {
  id: string; // 'IN', 'US', 'CN', 'GB', 'CA', 'AE'
  name: string;
  flag: string;
  currency: string;
  symbol: string;
  exchangeRate: number; // relative to INR (1x)
}

export const REGIONS: Region[] = [
  { id: 'IN', name: 'India', flag: '🇮🇳', currency: 'INR', symbol: '₹', exchangeRate: 1 },
  { id: 'US', name: 'United States', flag: '🇺🇸', currency: 'USD', symbol: '$', exchangeRate: 0.012 },
  { id: 'CN', name: 'China', flag: '🇨🇳', currency: 'CNY', symbol: '¥', exchangeRate: 0.087 },
  { id: 'GB', name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP', symbol: '£', exchangeRate: 0.0094 },
  { id: 'CA', name: 'Canada', flag: '🇨🇦', currency: 'CAD', symbol: 'C$', exchangeRate: 0.016 },
  { id: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', currency: 'AED', symbol: 'AED ', exchangeRate: 0.044 },
];

export const PRODUCTS: Product[] = [
  {
    id: 'varahi-amman-statue',
    name: 'Varahi Amman Statue 4.5" inches',
    category: 'Spiritual & Pooja',
    subcategory: 'Pooja Products',
    price: 2400,
    description: 'Auspicious Varahi Amman Statue to bring success and protection. Expertly crafted in brass.',
    imageUrl: varahiAmmanImage,
    rating: 4.9,
    reviewsCount: 14,
    vendor: 'Viha Online',
    ingredientsOrMaterials: 'Premium Brass',
    sizeOrDimensions: '4.5 inches height'
  },
  {
    id: 'vellerukku-vinayagar',
    name: 'Vellerukku Vinayagar Original - 3" inches / Shwetark',
    category: 'Spiritual & Pooja',
    subcategory: 'Pooja Products',
    price: 1250,
    description: "The Viha Online's Vellerukku Vinayagar Original (3 inches) is intricately handcrafted from sacred Shwetark (Vellerukku) plant root, revered for its divine and auspicious qualities. Featuring Lord Ganesha in a compact form, it brings blessings, prosperity, and protection. Perfect for puja, travel, or gifting, it radiates positive energy and spiritual harmony wherever placed.",
    imageUrl: vellerukkuVinayagarImage,
    rating: 4.74,
    reviewsCount: 27,
    vendor: 'Viha Online',
    ingredientsOrMaterials: 'Authentic Shwetark (Vellerukku) plant root — White Calotropis gigantea',
    sizeOrDimensions: '3 inches height',
    isBestseller: true,
    restrictedRegions: ['CN', 'AE'],
    customsNote: 'Quarantine restrictions block White Calotropis raw root timber parts.',
    richDescription: [
      {
        title: 'Authentically Crafted from Sacred Shwetark Root',
        content: 'Every idol is hand-carved from authentic Shwetark (Vellerukku) plant root — the rare white Calotropis gigantea revered across Vedic traditions for its extraordinary spiritual potency. No two pieces are identical, making each one a truly one-of-a-kind sacred artifact.'
      },
      {
        title: 'Compact 3-Inch Form — Lightweight & Portable',
        content: 'At just 3 inches, this idol of Lord Ganesha is perfectly sized for personal altars, home mandir shelves, office desks, or travel. Lightweight and easy to carry, it accompanies you wherever you need divine protection and blessings.'
      },
      {
        title: 'Naturally Textured with Rustic Spiritual Charm',
        content: 'The idol retains the natural grain and texture of the Shwetark root, giving it a beautifully rustic appearance that reflects organic purity. Hand-carved with devotion, every contour preserves the sacred essence of the source plant.'
      },
      {
        title: 'Attracts Prosperity, Wisdom & Good Fortune',
        content: 'Vellerukku Vinayagar is traditionally believed to be one of the most powerful forms of Lord Ganesha for attracting wealth, wisdom, and auspiciousness. Keeping this idol in your space invites positive vibrations and clears the path to success.'
      },
      {
        title: 'Removes Obstacles & Promotes Positive Energy Flow',
        content: 'As the remover of obstacles, Lord Ganesha in this sacred Shwetark form is considered especially potent. It helps dissolve hindrances in endeavors, promotes harmony in relationships, and channels positive energy throughout the space it occupies.'
      },
      {
        title: 'Ideal for Meditation, Vastu Harmony & Gifting',
        content: 'Perfect for meditation corners, home altars, office spaces, and vehicle dashboards. It also supports Vastu harmony and spiritual well-being. An exceptionally meaningful gift for festivals, house warmings, inaugurations, and auspicious blessings.'
      },
      {
        title: 'Care & Maintenance',
        content: 'Dust gently with a soft, dry cloth — avoid water or cleaning chemicals as these can damage the natural root surface. Do not expose to direct sunlight for prolonged periods to preserve the texture and colour. With proper care, your Vellerukku Vinayagar will retain its radiant spiritual charm for years to come.'
      }
    ],
    reviewBreakdown: { 5: 21, 4: 5, 3: 1, 2: 0, 1: 0 },
    reviews: [
      {
        id: 'vv-r1',
        author: 'MAHALAKSHMI',
        date: '05/29/22',
        rating: 5,
        content: 'Super\nGood',
        verified: true
      },
      {
        id: 'vv-r2',
        author: 'Kannan Vijay',
        date: '05/28/22',
        rating: 5,
        content: 'vellarrukku vinayagar\niwant',
        verified: true
      },
      {
        id: 'vv-r3',
        author: 'Saranya Vignesh',
        date: '02/16/22',
        rating: 5,
        content: 'Second order! Wonderful service!\nI received velleruku pillayar, kubera vilaku, karungali rod, vel and gomathi chakra pendant and two creams. Delivered super fast. packing is excellent. Quality is not compromised! Wonderful service aunty and team! lots of love 💕',
        verified: true
      },
      {
        id: 'vv-r4',
        author: 'Geetha Govindappa',
        date: '11/14/21',
        rating: 4,
        content: 'Vepa marathu Ganesha / neem wood ganesha\nHi, I want neem wood ganesha idol pls let me know if u have. I will buy both (erakku and vepa mara) Ganesha idol together. Small size. Thanks',
        verified: true
      },
      {
        id: 'vv-r5',
        author: 'Suguna Murthy',
        date: '10/13/21',
        rating: 5,
        content: "It's really good and I got my order on time thank you so much mam.",
        verified: true
      }
    ]
  },
  {
    id: 'Amethyst-Vastu-Pyramid',
    name: 'Amethyst Vastu Pyramid',
    category: 'Spiritual & Pooja',
    subcategory: 'Pooja Utensils',
    price: 850,
    description: 'Unveil the profound world of meditation with the Amethyst Vastu Pyramid, a mesmerizing crystal that takes you on a spiritual journey. This natural wonder is more than just a pyramid; it is a gateway to the universes spiritual realm. Embrace the energy and positivity it exudes during meditation, and witness the transformation it brings to your life.',
    imageUrl: amethystVastuPyramidImage,
    rating: 4.78,
    reviewsCount: 23,
    vendor: 'Viha Online',
    ingredientsOrMaterials: 'Natural Amethyst crystal',
    sizeOrDimensions: 'Height: 7 cms, Length: 7.5 cms',
    weight: '203 grams approx.',
    richDescription: [
      { title: 'Enhancing Meditation Experience', content: 'As you meditate with the Amethyst Pyramid, you will find yourself immersed in a deep sense of tranquility and inner peace. It elevates your meditative state, enabling you to connect with the spiritual aspects of the universe and explore your inner self with clarity and focus.' },
      { title: 'Empowering Intuition and Psychic Abilities', content: 'Amethyst Pyramid bestows upon you the gifts of intuition, clairvoyance, and heightened psychic abilities. As you delve into the depths of meditation, the crystal enhances your spiritual connection, opening the gateway to higher realms of knowledge and wisdom.' },
      { title: 'A Symbol of Spiritual Awakening', content: 'With its enchanting violet hue akin to the crown chakra, the Amethyst Pyramid is revered as a spiritual stone. It aligns and balances the crown chakra, promoting spiritual awakening and expanding your consciousness.' },
      { title: 'A Source of Physical Healing', content: 'Beyond its spiritual attributes, the Amethyst Pyramid also offers healing properties. It is known to regulate blood-related issues and aid in curing respiratory problems. Moreover, it purifies the air in your home, creating a clean and positive environment.' },
      { title: 'Relief from Anxiety and Headaches', content: 'Embrace the soothing energy of Amethyst Pyramid to find solace from fears, anxiety, and cravings. It acts as a gentle guide, helping you overcome emotional challenges and alleviating headaches for a calmer state of mind.' },
      { title: 'Elevate Your Meditation Practice', content: 'Empower your meditation practice with the Amethyst Vastu Pyramid, a symbol of spiritual growth and healing. Embrace its captivating energy and embark on a journey of self-discovery and transformation.' }
    ],
    reviewBreakdown: { 5: 18, 4: 5, 3: 0, 2: 0, 1: 0 },
    reviews: [
      { id: 'r1', author: 'Maragathavalli', date: '12/20/25', rating: 5, content: 'Mam my daughter has many health problems and are chronic..pls suggest any vastu pyramid for us Pyramid', verified: true, replies: [{ author: 'Viha Online', content: 'Use Black Tourmaline Pyramid ma' }] },
      { id: 'r2', author: 'Niveditha', date: '02/01/23', rating: 4, content: 'Material of pyramid\nWhat is the outside material of the pyramid made of', verified: true },
      { id: 'r3', author: 'Sri Devi', date: '03/17/22', rating: 5, content: 'This is very amazing', verified: true },
      { id: 'r4', author: 'NEKIL', date: '03/03/22', rating: 5, content: 'THIS THINGS ARE VERY SUPER', verified: true },
      { id: 'r5', author: 'DHANALAKSHMI GIREESHKUMAR', date: '11/03/21', rating: 5, content: 'Good packing Nd reached safe\nHi mamm\nI ordered 2amethyst pyramid fir my twin daughters studying in blore\nReached safe Nd good packing Nd received bonus diwali gift too kumkum\n\nI asked them to keep on study table', verified: true }
    ]
  },
  {
    id: 'brass-kuber-diya',
    name: 'Premium Kubera Brass Oil Lamp',
    category: 'Spiritual & Pooja',
    subcategory: 'Kubera Pooja Products',
    price: 450,
    description: 'Compact brass lamp cast specifically with the sacred symbol of Kubera to attract wealth, auspiciousness, and joy.',
    imageUrl: 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=600',
    rating: 4.7,
    ingredientsOrMaterials: 'Lead-free Cast Brass',
    sizeOrDimensions: '3 inches height'
  },
  {
    id: 'aimpon-lakshmi-ring',
    name: 'Aimpon Panchaloha Mahalakshmi Ring',
    category: 'Spiritual & Pooja',
    subcategory: 'Aimpon / Panchaloha',
    price: 850,
    description: 'Immaculately cast ring composed of five traditional metal alloys (gold, silver, copper, brass, iron) for cosmic energy balance.',
    imageUrl: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600',
    rating: 4.9,
    ingredientsOrMaterials: 'Panchaloha (Five temple-metal alloys)',
    sizeOrDimensions: 'Adjustable size'
  },
  {
    id: 'panchmukhi-rudraksha-malai',
    name: 'Authentic Panchmukhi Rudraksha Mala (108 Beads)',
    category: 'Spiritual & Pooja',
    subcategory: 'Rudraksh',
    price: 650,
    description: 'Spiritual mala handcrafted from selected hand-cleaned 5-faced Rudraksha seeds from Nepal, ideal for daily Chanting & Meditation.',
    imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600',
    rating: 4.8,
    ingredientsOrMaterials: 'Natural Elaeocarpus ganitrus seeds',
    sizeOrDimensions: '8mm beads, 108 + 1 Meru bead'
  },
  {
    id: 'gomathi-chakra-set',
    name: 'Auspicious Gomathi Chakra Stones (Set of 11)',
    category: 'Spiritual & Pooja',
    subcategory: 'Gomathi Chakra',
    price: 195,
    description: 'Rare white shell stones naturally found in the Gomati river, displaying subtle circular patterns indicating Sudarshana chakra.',
    imageUrl: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?q=80&w=600',
    rating: 4.6,
    ingredientsOrMaterials: 'Natural River Shell Stones',
    sizeOrDimensions: 'Pack of 11 stones'
  },
  {
    id: 'vastu-pyramid-brass',
    name: 'Multi-layer Vastu Lead-Brass Pyramid',
    category: 'Spiritual & Pooja',
    subcategory: 'Vastu Products',
    price: 1200,
    description: 'Remedy device to neutralize home energy leaks. Place in northwest corners or near standard thresholds.',
    imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600',
    rating: 4.7,
    ingredientsOrMaterials: 'Solid Heavy Brass Alloy',
    sizeOrDimensions: '3 x 3 inches base'
  },
  {
    id: 'siddhar-photo-frame',
    name: 'Abirami Ammai God Photo Frame (Antique gold)',
    category: 'Spiritual & Pooja',
    subcategory: 'God Photos',
    price: 490,
    description: 'Classic high contrast picture frame depicting Devi Abirami seated, perfect for home altar hanging or shelf placement.',
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=600',
    rating: 4.9,
    ingredientsOrMaterials: 'Faux Antique Wood Frame with Acrylic Glass',
    sizeOrDimensions: '8 x 10 inches'
  },
  {
    id: 'idol-silk-shawl',
    name: 'Embroidered Silk Shawl & Clothes set for Idols',
    category: 'Spiritual & Pooja',
    subcategory: 'Idol Clothes & Ornaments',
    price: 320,
    description: 'Beautifully zari bordered miniature silk cloth wrapper set to adorn Ganesha, Lakshmi, or Murugan deities.',
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600',
    rating: 4.7,
    ingredientsOrMaterials: 'Satin Silk Blend, Fine Golden Thread',
    sizeOrDimensions: 'Sized for 4-8" idols'
  },
  {
    id: 'karungali-ebony-malai',
    name: 'Karungali Malai (8mm Ebony Wood Garland)',
    category: 'Ayurveda & Herbal',
    subcategory: 'Karungali Products',
    price: 1950,
    description: 'Original Karungali black ebony bead garland. Induces calmness, sharpens concentration, and absorbs negative vibes.',
    imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600',
    rating: 5.0,
    ingredientsOrMaterials: '100% Genuine Black Ebony wood',
    sizeOrDimensions: '8mm beads, 108 beads thread',
    restrictedRegions: ['CN', 'AE'],
    customsNote: 'Quarantine timber restrictions apply to raw ebony imports.'
  },
  {
    id: 'vetiver-root-scrub',
    name: 'Heritage Vetiver Bath Scrub (Handwoven)',
    category: 'Ayurveda & Herbal',
    subcategory: 'Vettiver, Vellerukku & Darba',
    price: 150,
    description: 'Fully natural, refreshing skin exfoliator woven with clean vetiver grass roots. Emits an earthy sweet aroma.',
    imageUrl: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?q=80&w=600',
    rating: 4.8,
    ingredientsOrMaterials: 'Pure Vetiver (Chrysopogon zizanioides) roots',
    sizeOrDimensions: 'Standard circular scrub'
  },
  {
    id: 'pancha-deepam-pooja-oil',
    name: 'Pancha Deepam Spiritual Lighting Oil Mix',
    category: 'Ayurveda & Herbal',
    subcategory: 'Oils',
    price: 380,
    description: 'Auspicious proprietary mix of sesame, coconut, castor, neem, and pure cow ghee. Specially created for temple lamps.',
    imageUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600',
    rating: 4.9,
    ingredientsOrMaterials: 'Cold pressed Sesame oil, Castor oil, Mahua oil, Neem oil, Cow Ghee',
    sizeOrDimensions: '500 ml',
    restrictedRegions: ['CN', 'US'],
    customsNote: 'Customs guidelines restrict uncertified Ayurvedic liquid oils.'
  },
  {
    id: 'red-sandalwood-handmade-soap',
    name: 'Handmade Red Sandalwood Soap (Rakta Chandan)',
    category: 'Ayurveda & Herbal',
    subcategory: 'Handmade Soaps',
    price: 240,
    description: 'Natural moisture soap prepared with red sandalwood extract, nourishing coconut oil, and traditional calming herbs.',
    imageUrl: 'https://images.unsplash.com/photo-1607006342411-1a90c4fb3152?q=80&w=600',
    rating: 4.9,
    ingredientsOrMaterials: 'Red Sandalwood powder, cold pressed coconut oil, essential oils',
    sizeOrDimensions: '100g bar'
  },
  {
    id: 'divine-jasmine-attar',
    name: 'Divine Jasmine Attar Floral Perfume',
    category: 'Ayurveda & Herbal',
    subcategory: 'Perfumes',
    price: 450,
    description: 'Traditional water-distilled jasmine perfume extract concentrated in a base of organic sandalwood oil, completely alcohol-free.',
    imageUrl: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600',
    rating: 4.8,
    ingredientsOrMaterials: 'Natural Jasminum Sambac extract, Sandalwood Carrier oil',
    sizeOrDimensions: '10 ml roll-on'
  },
  {
    id: 'silver-goli-anklets',
    name: 'Traditional Silver Goli Kolusu (Anklets)',
    category: 'Jewellery & Fashion',
    subcategory: 'Silver Jewellery',
    price: 2850,
    description: 'Classic sound-making silver anklets embellished with small silver globes, handcrafted by talented Salem smiths.',
    imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600',
    rating: 4.7,
    ingredientsOrMaterials: '92.5% Sterling Silver',
    sizeOrDimensions: '10 inches length (Standard)'
  },
  {
    id: 'kemp-temple-necklace',
    name: 'Lakshmi Temple Heritage Kemp Necklace',
    category: 'Jewellery & Fashion',
    subcategory: 'Jewellery',
    price: 5400,
    description: 'Exquisite antique temple choker with pinkish red kemp stones and tiny hanging freshwater pearls, carrying Lakshmi motifs.',
    imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600',
    rating: 4.9,
    ingredientsOrMaterials: 'Brass copper alloy base, 22K gold-plated antique wash, kemp gems',
    sizeOrDimensions: 'Adjustable chord fitting'
  },
  {
    id: 'silk-kanchipuram-pattu-saree',
    name: 'Salem Peacock Borders Pattu Saree (Green)',
    category: 'Jewellery & Fashion',
    subcategory: 'Clothing',
    price: 16500,
    description: 'Premium handloom silk saree featuring double-wrapped Salem zari weave, reflecting South Indian temple heritage.',
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600',
    rating: 5.0,
    ingredientsOrMaterials: '100% Pure Mulberry Silk, Pure Silver Zari coated in gold',
    sizeOrDimensions: '5.5 meters'
  },
  {
    id: 'designer-embossed-belt',
    name: 'Classic Zari Border Waist Belt (Oddiyanam)',
    category: 'Jewellery & Fashion',
    subcategory: 'Accessories',
    price: 850,
    description: 'Flexible temple jewelry style waist band wrapped in heavy silk fabric with traditional gold motif work.',
    imageUrl: 'https://images.unsplash.com/photo-1623998021450-85c24c626a5a?q=80&w=600',
    rating: 4.6,
    ingredientsOrMaterials: 'Zari silk band, metal adjustment buckle',
    sizeOrDimensions: 'Fits waist waist 28 - 38 inches'
  },
  {
    id: 'seeraga-samba-rice-organic',
    name: 'Premium Mappillai Samba Traditional Rice (1kg)',
    category: 'Food & Organic',
    subcategory: 'Organic Rice Varieties',
    price: 180,
    description: 'Ancient red rice variety native to Tamil Nadu, cultivated organically. Extremely high in trace iron, minerals, and fibers.',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=600',
    rating: 4.9,
    ingredientsOrMaterials: '100% Organically grown Mappillai Samba Red Rice',
    sizeOrDimensions: '1 kg pack',
    restrictedRegions: ['CN', 'GB'],
    customsNote: 'Quarantine restrictions ban agricultural whole-grain unpolished rice seed packets.'
  },
  {
    id: 'pure-home-groceries-turmeric',
    name: 'Organic Salem Selam Turmeric Powder (250g)',
    category: 'Food & Organic',
    subcategory: 'Groceries',
    price: 120,
    description: 'Unprocessed high-curcumin turmeric ground carefully from dry roots. Pure, natural color with rich earthy therapeutic flavor.',
    imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=600',
    rating: 4.9,
    ingredientsOrMaterials: 'Organic Salem Turmeric dry roots',
    sizeOrDimensions: '250g'
  },
  {
    id: 'traditional-ghee-mysore-pak',
    name: 'Pure Ghee Karupatti Mysore Pak (Box of 250g)',
    category: 'Food & Organic',
    subcategory: 'Sweets & Savouries',
    price: 340,
    description: 'Delectable Indian sweet made with roasted gram flour, nutrient-dense palm jaggery (Karupatti), and organic pure cow ghee.',
    imageUrl: 'https://images.unsplash.com/photo-1589187151032-573a91317c45?q=80&w=600',
    rating: 4.8,
    ingredientsOrMaterials: 'Gram Flour, Palm Jaggery (Karupatti), Pure Cow Ghee, Cardamom',
    sizeOrDimensions: '250g Box',
    restrictedRegions: ['US', 'CN'],
    customsNote: 'Perishable biological milk products must undergo strict FDA clearance.'
  },
  {
    id: 'handwoven-palm-leaf-tote',
    name: 'Handcrafted Palm Leaf Tote Bag with Handles',
    category: 'Home & Living',
    subcategory: 'Palm Woven Products',
    price: 420,
    description: 'Eco-friendly traditional shopping bag hand-woven by village weavers using naturally dyed tropical palm tree leaves.',
    imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600',
    rating: 4.8,
    ingredientsOrMaterials: '100% Natural Palm Leaf, Cotton Handles',
    sizeOrDimensions: '12 x 10 inches'
  },
  {
    id: 'brass-bell-urli-bowl',
    name: 'Exquisite Brass Urli Bowl with Hanging Bells',
    category: 'Home & Living',
    subcategory: 'Brass Products',
    price: 2800,
    description: 'Heavy traditional brass bowl to fill with water and floating flower petals. Place at front entrance for welcoming positive vibes.',
    imageUrl: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=600',
    rating: 5.0,
    ingredientsOrMaterials: '100% Solid Heavy Brass',
    sizeOrDimensions: '10 inches diameter'
  },
  {
    id: 'kids-pattu-pavadai-dress',
    name: 'Traditional Kids Silk Pattu Pavadai Set',
    category: 'Kids & Baby',
    subcategory: 'Kids & Children',
    price: 1950,
    description: 'Woven kids skirt and top matching traditional templates, perfect for Deepavali, Pongal, and temple visits.',
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600',
    rating: 4.8,
    ingredientsOrMaterials: 'Art Silk and Cotton lining',
    sizeOrDimensions: 'Age group 4-6 years (Size 24)'
  },
  {
    id: 'mens-silk-kurta-pyjama',
    name: 'Traditional Mens Silk-Blend Kurta Set',
    category: 'Fashion & Grooming',
    subcategory: 'Boys & Men',
    price: 1650,
    description: 'Classic cream-colored silk kurta paired with elastic churidar pants, perfect for festive rituals.',
    imageUrl: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=600',
    rating: 4.7,
    ingredientsOrMaterials: 'Raw-silk art polyester blend',
    sizeOrDimensions: 'Standard Size 40 (Medium)'
  },
  {
    id: 'abirami-shlokas-devotional-book',
    name: 'Abirami Anthadhi Devotional Book (With Meanings)',
    category: 'Books & Stationery',
    subcategory: 'Books',
    price: 120,
    description: 'Pristine compilation of 100 divine verses sung by Abirami Bhattar, complete with detailed word-by-word meanings in Tamil and English.',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600',
    rating: 4.9,
    ingredientsOrMaterials: 'Premium acid-free paper, Softbound',
    sizeOrDimensions: '160 pages'
  },
  {
    id: 'karungali-silver-capped-pendant',
    name: 'New Arrival Karungali Pendant with Silver Cap',
    category: 'New Arrivals',
    subcategory: 'New Arrivals',
    price: 750,
    description: 'Fresh arrival featuring a solid hand-cut cylinder ebony wood capped with pure 92.5 stamped silver rings and loops.',
    imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600',
    rating: 4.9,
    ingredientsOrMaterials: 'Karungali ebony wood, 92.5% Sterling Silver capping',
    sizeOrDimensions: '1.5 inches'
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'VH-89241',
    status: 'placed',
    placedAt: 'Oct 18, 10:45 AM',
    estimatedDelivery: 'October 24, 2024',
    items: [
      {
        product: PRODUCTS[0], // Vellerukku Vinayagar
        quantity: 1
      }
    ],
    subtotal: 1250,
    shippingCost: 150,
    shippingType: 'home',
    total: 1400,
    contactEmail: 'seeker@example.com',
    billingAddress: {
      street: '10 Bhagirathy Street, Bishop Garden',
      city: 'Raja Annamalaipuram, Chennai',
      postalCode: '600028'
    }
  },
  {
    id: 'VIHA-12345',
    status: 'shipped',
    placedAt: 'Jun 15, 02:30 PM',
    estimatedDelivery: 'June 21, 2026',
    items: [
      { product: PRODUCTS[1], quantity: 1 }, // Pure Copper Plate
      { product: PRODUCTS[9], quantity: 2 }  // Karungali Ebony Garland
    ],
    subtotal: 4880,
    shippingCost: 0,
    shippingType: 'store',
    total: 4880,
    contactEmail: 'devout_soul@example.com',
    billingAddress: {
      street: 'H BLOCK, Anna Nagar',
      city: 'Chennai',
      postalCode: '600040'
    }
  }
];
