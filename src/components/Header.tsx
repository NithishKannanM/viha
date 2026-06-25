import React, { useState, useEffect } from 'react';
import { Search, Heart, User, ShoppingBag, X, Trash2, ArrowRight, ShieldAlert, CheckCircle2, Globe, HelpCircle } from 'lucide-react';
import Logo from './Logo';
import { CartItem, Product } from '../types';
import { PRODUCTS, REGIONS, Region } from '../data';

interface HeaderProps {
  cart: CartItem[];
  onNavigate: (view: 'home' | 'shop' | 'cart' | 'checkout-info' | 'tracker' | 'account') => void;
  onSelectCategory: (category: string) => void;
  onRemoveFromCart: (productId: string) => void;
  onUpdateCartQty: (productId: string, qty: number) => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
  wishlistOpen: boolean;
  setWishlistOpen: (open: boolean) => void;
  onAddToCart: (product: Product) => void;
  currentRegion: string;
  onRegionChange: (regionId: string) => void;
  onViewProduct: (product: Product) => void;
}

const MEGA_MENU_DATA: Record<string, {
  subcategories: { name: string; description: string; items: string[] }[];
  featured: { name: string; description: string; imageUrl: string; price: number; id: string };
  quote: string;
}> = {
  'spiritual-pooja': {
    subcategories: [
      { name: "Pooja Products", description: "Sacred essentials", items: ["Vellerukku Vinayagar", "Camphor Tablets", "Pure Kumkum", "Divine Incense"] },
      { name: "Pooja Utensils", description: "Brass & copperware", items: ["Copper Pooja Plates", "Arati Plates", "Brass Bells", "Achamani Cups"] },
      { name: "Kubera Pooja Products", description: "Attract wealth & energy", items: ["Kuber Brass Diya", "Kubera Coins", "Kubera Yantras"] },
      { name: "Aimpon / Panchaloha", description: "Sacred alloys blend", items: ["Aimpon Rings", "Murugan Pendant", "Aimpon Bangles"] },
      { name: "Rudraksh", description: "Sacred seeds", items: ["Panchmukhi Malas", "Silver Capped Mala", "Collector Beads"] },
      { name: "Gomathi Chakra", description: "Auspicious river shells", items: ["Gomathi Stones", "Laxmi Cowrie Shells", "Sudarshana Stones"] },
      { name: "Vastu Products", description: "Harmonize space", items: ["Lead-Brass Pyramids", "Direction plates", "Tortoise plates"] },
      { name: "God Photos", description: "Divine frames", items: ["Seated Abirami Picture", "Agathiyar Frames", "Laxmi Photo set"] },
      { name: "Idol Clothes & Ornaments", description: "Deity drapery", items: ["Zari Altar Shawls", "Idol Hair Crowns", "Flower Garlands"] }
    ],
    featured: {
      id: "vellerukku-vinayagar",
      name: 'Vellerukku Vinayagar (3")',
      price: 1250,
      description: "Handcrafted from white calotropis root for divine protection and deep peace.",
      imageUrl: "https://images.unsplash.com/photo-1567591974574-e852636b14a3?q=80&w=600"
    },
    quote: "Invoking peace and protective clarity in your clean prayer spaces."
  },
  'ayurveda-herbal': {
    subcategories: [
      { name: "Ayurveda & Herbal", description: "Skin & hair powders", items: ["Chandan facial packs", "Botanical scrubs", "Ubtan pack"] },
      { name: "Vettiver, Vellerukku & Darba", description: "Therapeutic roots", items: ["Vetiver root scrubs", "Darba pooja grass", "Matted roots"] },
      { name: "Oils", description: "Therapeutic extractions", items: ["Pancha Deepam Oil", "Cold Sesame Oil", "Pure Kumkumadi Fluid"] },
      { name: "Handmade Soaps", description: "Skin-nourishing botanicals", items: ["Red Sandalwood Soap", "Neem & Haldi Soap", "Tulsi bath bar"] },
      { name: "Perfumes", description: "Earthy divine attar", items: ["Jasmine Attar rollon", "Sandalwood extract", "Mogra vapor"] },
      { name: "Karungali Products", description: "Sacred Ebony Wood", items: ["Karungali Ebony Mala", "Karungali Bracelets", "Karungali Keyrings"] }
    ],
    featured: {
      id: "karungali-ebony-malai",
      name: 'Karungali Beads Malai (8mm)',
      price: 1950,
      description: "Genuine black ebony beads to maintain inner calms and deflect high anxiety levels.",
      imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600"
    },
    quote: "Reclaim organic wellness crafted with ancestral biological wisdom."
  },
  'jewellery-fashion': {
    subcategories: [
      { name: "Silver Jewellery", description: "Sterling accessories", items: ["Silver Goli Kolusu", "Toe Rings", "Protection Rings"] },
      { name: "Jewellery", description: "Heritage decorations", items: ["Heritage Kemp Necklace", "Mayur Kemp Jhumkas", "Temple Bangles"] },
      { name: "Clothing", description: "Traditional garments", items: ["Salem Silk Sarees", "Silk Cotton Veshtis", "Angavastram sets"] },
      { name: "Accessories", description: "Festive embellishments", items: ["Silk Waist Belts", "Traditional Bindis", "Temple Mattals"] },
      { name: "Hair Accessories", description: "Dignified styling", items: ["Mogra Hair Gajras", "Freshwater Pearl Pins", "Classic Kemp Chotlis"] }
    ],
    featured: {
      id: "kemp-temple-necklace",
      name: 'Lakshmi Heritage Necklace',
      price: 5400,
      description: "Gold plated copper-brass traditional choker representing rich cultural legacy.",
      imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600"
    },
    quote: "Embody the rich spiritual aesthetics worn by generation of classic devotees."
  },
  'fashion-grooming': {
    subcategories: [
      { name: "Boys & Men", description: "Dignified traditional styling", items: ["Raw Silk Kurtas", "Boys Dhoti sets", "Veshti shoulder shawls"] }
    ],
    featured: {
      id: "mens-silk-kurta-pyjama",
      name: 'Mens Traditional Kurta',
      price: 1650,
      description: "Fine cream-shaded festive raw-silk kurta paired with churidar pants.",
      imageUrl: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=600"
    },
    quote: "Grace and comfort woven for pious festive mornings."
  },
  'home-living': {
    subcategories: [
      { name: "Home Needs", description: "Earthy lifestyle", items: ["Earthen cookware", "Natural room sprays", "Ethereal incense holders"] },
      { name: "Wall Hangings", description: "Threshold protectives", items: ["Mango leaf torans", "Swastika brass tags", "Devi Yantra plaques"] },
      { name: "Palm Woven Products", description: "Natural weaver crafts", items: ["Woven Palm Leaf Totes", "Storage boxes", "Tropical floor mats"] },
      { name: "Brass Products", description: "Exquisite metalware", items: ["Urli bowls with bells", "Heavy Ganesha Idols", "Poonja Panchapatras"] },
      { name: "Gift Articles", description: "Housewarming collections", items: ["Shubh Labh Giftbox", "Traditional Sweet trays", "Puja starter packs"] }
    ],
    featured: {
      id: "brass-bell-urli-bowl",
      name: 'Urli Bowl with Hanging Bells',
      price: 2800,
      description: "Heavy solid brass vessel designed for floating flower displays at home thresholds.",
      imageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=600"
    },
    quote: "Infuse your household with custom metalcrafts tuned for high positivity."
  },
  'food-organic': {
    subcategories: [
      { name: "Organic Rice Varieties", description: "Traditional raw crops", items: ["Mappillai Samba Red Rice", "Seeraga Samba rice", "Karuppu Kavuni rice"] },
      { name: "Groceries", description: "Unprocessed ground powders", items: ["Salem Turmeric Powder", "Organic Spices Block", "Ghee spices mixes"] },
      { name: "Sweets & Savouries", description: "Palm jaggery treats", items: ["Karupatti Mysore Pak", "Heritage Adhirasam", "Sorghum Spicy Murukku"] },
      { name: "Sugar Free Chocolates", description: "Diabetic friendly bites", items: ["Stevia Dark Chocolates", "Dry Date delights", "Millet Cocoa pieces"] }
    ],
    featured: {
      id: "traditional-ghee-mysore-pak",
      name: 'Karupatti Mysore Pak (250g)',
      price: 340,
      description: "Prepared with nutritious palm jaggery, gram flour, and grass-fed cow ghee.",
      imageUrl: "https://images.unsplash.com/photo-1589187151032-573a91317c45?q=80&w=600"
    },
    quote: "Taste clean food prepared without chemical synthesis or white sugar."
  },
  'kids-baby': {
    subcategories: [
      { name: "Baby Products", description: "Soft botanical care", items: ["Traditional baby washes", "Organic wrap swaddles", "Baby silver anklets"] },
      { name: "Kids & Children", description: "Children traditional festive", items: ["Kids Silk Pattu Pavadai", "Clay playing utensils", "Miniature prayer toys"] }
    ],
    featured: {
      id: "kids-pattu-pavadai-dress",
      name: 'Kids Traditional Pattu Silk Dress',
      price: 1950,
      description: "Adorable art silk skirt and top styled with rich peacock gold zari borders.",
      imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600"
    },
    quote: "Nourish and drape young souls in the warmth of timeless customs."
  },
  'books-stationery': {
    subcategories: [
      { name: "Books", description: "Devotional scriptures", items: ["Abirami Anthadhi", "Siddhars Herbal secrets", "Vedas guide volume"] },
      { name: "Stationery", description: "Ecological papercrafts", items: ["Copper-nib Writing Pens", "Recycled cotton paper", "Spiritual Altar diaries"] }
    ],
    featured: {
      id: "abirami-shlokas-devotional-book",
      name: 'Abirami Anthadhi Devotional Book',
      price: 120,
      description: "Beautifully printed verses sung by Bhattar with comprehensive translations.",
      imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600"
    },
    quote: "Absorb the sacred frequencies of timeless verses and daily chants."
  },
  'bags-pouches': {
    subcategories: [
      { name: "Handbags", description: "Artisan fiber totes", items: ["Palm-leaf Shoulder carrier", "Peacock silk handbag", "Linen market bags"] },
      { name: "Purses", description: "Zari card holders", items: ["Silk Coin Purses", "Velvet clutches", "Ganesha coin purse"] },
      { name: "Pouches", description: "Sustainable storage", items: ["Drawstring Jute sack", "Cotton herbal pouches", "Travel accessory kit"] },
      { name: "Keychains", description: "Positive accents", items: ["Ebony Ganesha Keychain", "Om copper keyrings", "Protection Yantra keychain"] }
    ],
    featured: {
      id: "handwoven-palm-leaf-tote",
      name: 'Palm Leaf Eco Tote Bag',
      price: 420,
      description: "Naturally dyed lightweight tote hand-woven with pride by Indian rural women artisans.",
      imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600"
    },
    quote: "Carry lightweight sustainable fibers woven with love and custom grace."
  },
  'new-arrivals': {
    subcategories: [
      { name: "New Arrivals", description: "Newly uncovered spiritual collections", items: ["Silver Capped pendants", "Organic honey jars", "Authentic kemp waistbands"] }
    ],
    featured: {
      id: "karungali-silver-capped-pendant",
      name: 'Karungali Silver Pendant',
      price: 750,
      description: "Solid circular Karungali wood capped with 92.5 pure stamped sterling silver borders.",
      imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600"
    },
    quote: "Explore fresh, authentic artifacts newly selected from traditional hubs."
  }
};

export default function Header({
  cart,
  onNavigate,
  onSelectCategory,
  onRemoveFromCart,
  onUpdateCartQty,
  cartOpen,
  setCartOpen,
  searchOpen,
  setSearchOpen,
  wishlist,
  onToggleWishlist,
  wishlistOpen,
  setWishlistOpen,
  onAddToCart,
  currentRegion,
  onRegionChange,
  onViewProduct
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [regionDropdownOpen, setRegionDropdownOpen] = useState(false);
  const [showRegionPrompt, setShowRegionPrompt] = useState(() => {
    return !localStorage.getItem('preferred_region');
  });

  const activeRegionObj = REGIONS.find(r => r.id === currentRegion) || REGIONS[0];

  const formatPrice = (priceInINR: number) => {
    const converted = priceInINR * activeRegionObj.exchangeRate;
    if (activeRegionObj.id === 'IN') {
      return `₹${priceInINR.toLocaleString('en-IN')}`;
    }
    return `${activeRegionObj.symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const categories = [
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
  ];

  return (
    <>
      {/* Backdrop to close region dropdown on outside click */}
      {regionDropdownOpen && (
        <div
          className="fixed inset-0 z-[35]"
          onClick={() => setRegionDropdownOpen(false)}
        />
      )}

      {/* Top Banner indicating delivery details and allowing context setup */}
      <div className="bg-brand-maroon-dark text-white text-[11px] px-4 py-2 text-center flex items-center justify-center gap-2 tracking-wide font-sans relative z-50">
        <span>📦 Free shipping worldwide to {activeRegionObj.flag} on orders over {formatPrice(1000)} equivalent.</span>
        <span className="hidden sm:inline opacity-60">|</span>
        <div className="flex items-center gap-1.5">
          <span className="opacity-85">Ships to:</span>
          <button
            onClick={() => { setRegionDropdownOpen(v => !v); setHoveredCategory(null); }}
            className="font-semibold underline hover:text-brand-gold flex items-center gap-1 cursor-pointer transition-colors"
          >
            {activeRegionObj.flag} {activeRegionObj.name} ({activeRegionObj.currency})
          </button>
        </div>
      </div>

      <header 
        className="sticky top-0 z-40 w-full bg-brand-cream border-b border-brand-cream-dark shadow-xs"
        onMouseLeave={() => setHoveredCategory(null)}
      >
        <div className="px-4 md:px-12 py-3 bg-[#fdf9f1]">
          <div className="max-w-7xl mx-auto flex items-center justify-between animate-fade-in">
            
            {/* Logo Left */}
            <div className="cursor-pointer font-serif" onClick={() => onNavigate('home')}>
              <Logo size="sm" />
            </div>

            {/* Middle premium brand tag to stabilize spacing */}
            <div className="hidden lg:flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-widest text-[#B8893D] font-bold">Viha Heritage Store</span>
              <span className="text-xs text-brand-maroon/20">|</span>
              <span className="text-[10.5px] italic text-brand-charcoal/55 font-sans">Spiritual Essentials Curated by Mrs Anitha Kuppusamy</span>
            </div>

            {/* Utility Icons Right */}
            <div className="flex items-center space-x-5 text-brand-maroon">
              {/* Region Selector Icon Trigger */}
              <button
                onClick={() => { setRegionDropdownOpen(v => !v); setHoveredCategory(null); }}
                className="p-1.5 hover:bg-brand-cream-dark rounded-full transition-colors flex items-center gap-1 cursor-pointer text-brand-maroon"
                title="Change delivery country"
              >
                <span className="text-base">{activeRegionObj.flag}</span>
                <span className="text-[10px] uppercase tracking-wider font-bold font-sans hidden md:inline">
                  {activeRegionObj.id}
                </span>
              </button>

              <button 
                onClick={() => setSearchOpen(true)}
                className="p-1.5 hover:bg-brand-cream-dark rounded-full transition-colors relative cursor-pointer"
                title="Search"
              >
                <Search size={18} strokeWidth={1.5} />
              </button>

              <button 
                onClick={() => onNavigate('account')} 
                className="p-1.5 hover:bg-brand-cream-dark rounded-full transition-colors relative hidden sm:inline-block cursor-pointer"
                title="Profile / Account"
              >
                <User size={18} strokeWidth={1.5} />
              </button>

              <button 
                onClick={() => setWishlistOpen(true)}
                className="p-1.5 hover:bg-brand-cream-dark rounded-full transition-colors relative cursor-pointer"
                title={`Saved Favorites (${wishlist.length})`}
              >
                <Heart 
                  size={18} 
                  strokeWidth={1.5} 
                  className={wishlist.length > 0 ? "fill-brand-maroon text-brand-maroon" : ""}
                />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-gold text-white text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                    {wishlist.length}
                  </span>
                )}
              </button>

              <button 
                onClick={() => setCartOpen(true)}
                className="p-1.5 hover:bg-brand-cream-dark rounded-full transition-colors relative cursor-pointer"
                title="Cart"
              >
                <ShoppingBag size={18} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-maroon text-white text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Second Row: Complete 11 Brand Categories Strip */}
        <div className="border-t border-brand-cream-dark/50 bg-[#faf6ee] hidden lg:block select-none py-1 shadow-3xs">
          <div className="max-w-7xl mx-auto px-12 flex items-center justify-center gap-1 xl:gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onMouseEnter={() => { setHoveredCategory(cat.id); setRegionDropdownOpen(false); }}
                onClick={() => {
                  onSelectCategory(cat.id);
                  onNavigate('shop');
                  setHoveredCategory(null);
                }}
                className={`text-brand-charcoal/90 hover:text-brand-maroon hover:bg-brand-cream-dark/50 rounded-xs px-2.5 py-1.5 transition-all font-sans text-[10px] xl:text-[10.5px] tracking-wider uppercase font-semibold relative cursor-pointer ${
                  cat.id === 'all' 
                    ? 'text-brand-gold font-bold border-b border-brand-gold/40' 
                    : cat.id === hoveredCategory 
                      ? 'text-brand-maroon bg-brand-cream-dark/30' 
                      : ''
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Region Destination Dropdown — positioned below full header via top-full */}
        {regionDropdownOpen && (
          <div className="absolute top-full right-4 md:right-12 w-60 bg-brand-paper border border-[#f1ede6] shadow-xl z-[60] rounded-xs p-3 space-y-2 text-brand-charcoal animate-fade-in">
            <div className="flex items-center justify-between border-b border-brand-cream-dark pb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-gold">
                Active Destination
              </span>
              <button onClick={() => setRegionDropdownOpen(false)} className="text-brand-charcoal/40 hover:text-brand-maroon cursor-pointer">
                <X size={12} />
              </button>
            </div>
            <div className="max-h-60 overflow-y-auto space-y-1 py-1">
              {REGIONS.map((reg) => (
                <button
                  key={reg.id}
                  onClick={() => {
                    onRegionChange(reg.id);
                    setRegionDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-2 text-xs text-left rounded-xs transition-colors cursor-pointer ${
                    reg.id === currentRegion ? 'bg-[#f1ede6] font-bold text-brand-maroon' : 'hover:bg-[#fdf9f1]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{reg.flag}</span>
                    <span>{reg.name}</span>
                  </span>
                  <span className="text-[9px] text-brand-charcoal/45 font-mono uppercase bg-brand-cream border border-[#f1ede6] rounded-xs px-1.5">
                    {reg.currency}
                  </span>
                </button>
              ))}
            </div>
            <p className="text-[9.5px] text-[#8c6d3f] leading-normal italic pt-2 border-t border-[#f1ede6] text-center">
              🌍 Some biological, botanical oils & wooden carvings are custom restricted outside India.
            </p>
          </div>
        )}

        {/* Hover Mega Menu Display Dropdown */}
        {hoveredCategory && MEGA_MENU_DATA[hoveredCategory] && !regionDropdownOpen && (
          <div 
            className="absolute left-0 right-0 top-full bg-brand-paper border-b border-brand-cream-dark shadow-xl z-50 hidden lg:block border-t border-[#f1ede6] animate-fade-in"
            onMouseEnter={() => setHoveredCategory(hoveredCategory)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <div className="max-w-7xl mx-auto px-12 py-8 grid grid-cols-12 gap-8 text-sans">
              
              {/* Left Column subcategories list - spans 8 columns */}
              <div className="col-span-8 grid grid-cols-3 gap-6">
                {MEGA_MENU_DATA[hoveredCategory].subcategories.map((sub, sIdx) => (
                  <div key={sIdx} className="space-y-2 text-left">
                    <h5 className="text-[11px] font-sans font-bold text-brand-gold uppercase tracking-widest">
                      {sub.name}
                    </h5>
                    <p className="text-[10px] text-brand-charcoal/50 italic leading-tight pb-1">
                      {sub.description}
                    </p>
                    <ul className="space-y-1.5 mt-2">
                      {sub.items.map((it, itemIdx) => (
                        <li key={itemIdx}>
                          <button
                            onClick={() => {
                              onSelectCategory(hoveredCategory);
                              onNavigate('shop');
                              setHoveredCategory(null);
                            }}
                            className="text-[11px] text-brand-charcoal/80 hover:text-brand-maroon transition-colors hover:translate-x-0.5 inline-block cursor-pointer text-left font-medium"
                          >
                            {it}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Dividing visual vertical line */}
              <div className="col-span-1 border-r border-[#f1ede6] h-full" />

              {/* Right Column (Category Featured Spotlight) - spans 3 columns */}
              <div className="col-span-3 bg-[#fdf9f1]/80 p-4 border border-[#f1ede6] rounded-xs flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[9px] uppercase font-bold tracking-widest text-brand-gold block font-sans">
                    FEATURED OBJECT
                  </span>
                  <div className="flex gap-3 mt-3">
                    <img 
                      src={MEGA_MENU_DATA[hoveredCategory].featured.imageUrl} 
                      alt="" 
                      className="w-12 h-12 object-cover rounded-xs border border-brand-cream-dark"
                    />
                    <div className="text-left">
                      <h6 className="text-xs font-serif font-bold text-brand-maroon tracking-tight leading-tight line-clamp-1">
                        {MEGA_MENU_DATA[hoveredCategory].featured.name}
                      </h6>
                      <p className="text-[10.5px] text-brand-maroon mt-0.5 font-semibold">
                        {formatPrice(MEGA_MENU_DATA[hoveredCategory].featured.price)}
                      </p>
                    </div>
                  </div>
                  <p className="text-[10px] text-brand-charcoal/60 leading-relaxed mt-2.5 text-left">
                    {MEGA_MENU_DATA[hoveredCategory].featured.description}
                  </p>
                </div>
                
                <button
                  onClick={() => {
                    onSelectCategory(hoveredCategory);
                    onNavigate('shop');
                    setHoveredCategory(null);
                  }}
                  className="w-full py-2 bg-brand-maroon hover:bg-brand-maroon-dark text-white text-[9px] font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  Shop Now <ArrowRight size={10} />
                </button>
              </div>

            </div>
            
            {/* Horizontal quotes bar */}
            <div className="bg-[#fdf9f1] py-2.5 px-12 border-t border-brand-cream-dark/60 text-center">
              <p className="text-[10.5px] text-brand-gold italic font-medium tracking-wide">
                "{MEGA_MENU_DATA[hoveredCategory].quote}"
              </p>
            </div>
          </div>
        )}
      </header>

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden font-sans">
          <div className="absolute inset-0 bg-black/60 transition-opacity" onClick={() => setCartOpen(false)} />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-brand-cream border-l border-brand-cream-dark flex flex-col shadow-xl">
              <div className="flex items-center justify-between p-6 border-b border-brand-cream-dark bg-brand-paper">
                <h3 className="text-lg font-serif text-brand-maroon font-bold flex items-center gap-2">
                  <ShoppingBag size={20} className="text-brand-gold" />
                  Your Sacred Basket
                </h3>
                <button onClick={() => setCartOpen(false)} className="p-1 hover:bg-brand-cream-dark rounded-full">
                  <X size={20} />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-brand-cream-dark flex items-center justify-center text-brand-maroon/40">
                      <ShoppingBag size={32} strokeWidth={1} />
                    </div>
                    <p className="text-brand-charcoal/60 font-sans text-sm">Your basket is currently empty.</p>
                    <button
                      onClick={() => {
                        setCartOpen(false);
                        onNavigate('shop');
                      }}
                      className="px-6 py-2.5 bg-brand-maroon text-white text-xs font-semibold uppercase tracking-widest hover:bg-red-950 transition-colors"
                    >
                      Browse Spiritual Treasures
                    </button>
                  </div>
                ) : (
                  cart.map((item) => {
                    const isRestricted = item.product.restrictedRegions?.includes(currentRegion);
                    return (
                      <div 
                        key={item.product.id} 
                        className={`flex flex-col gap-2 p-3 bg-brand-paper border rounded-xs transition-colors ${
                          isRestricted ? 'border-red-300 bg-red-50/30' : 'border-brand-cream-dark'
                        }`}
                      >
                        <div className="flex gap-4">
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded-xs border border-brand-cream-dark"
                          />
                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <h4 className="text-xs font-serif font-semibold text-brand-maroon leading-tight">
                                {item.product.name}
                              </h4>
                              <p className="text-[11px] text-brand-charcoal/60 capitalize mt-0.5">{item.product.category} Essential</p>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center border border-brand-cream-dark rounded-xs bg-brand-cream">
                                <button
                                  onClick={() => onUpdateCartQty(item.product.id, item.quantity - 1)}
                                  className="px-2 py-0.5 text-xs text-brand-charcoal hover:bg-brand-cream-dark cursor-pointer"
                                >
                                  -
                                </button>
                                <span className="px-2.5 py-0.5 text-xs font-medium text-brand-charcoal bg-brand-paper">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => onUpdateCartQty(item.product.id, item.quantity + 1)}
                                  className="px-2 py-0.5 text-xs text-brand-charcoal hover:bg-brand-cream-dark cursor-pointer"
                                >
                                  +
                                </button>
                              </div>
                              <span className="text-xs font-semibold text-brand-maroon">
                                {formatPrice(item.product.price * item.quantity)}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => onRemoveFromCart(item.product.id)}
                            className="p-1 text-brand-charcoal/40 hover:text-brand-maroon cursor-pointer self-start"
                            title="Remove"
                          >
                            <X size={14} />
                          </button>
                        </div>
                        {isRestricted && (
                          <div className="text-[10px] text-red-800 bg-red-100/60 border border-red-200/50 p-2 rounded-xs flex items-start gap-1.5 font-sans leading-relaxed">
                            <ShieldAlert size={12} className="text-red-700 shrink-0 mt-0.5" />
                            <div>
                              <span className="font-bold">Undeliverable to {activeRegionObj.name}:</span> {item.product.customsNote || "Customs regulations prevent clearing this product in this destination."}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Drawer Footer */}
              {cart.length > 0 && (() => {
                const hasRestrictedItems = cart.some(item => item.product.restrictedRegions?.includes(currentRegion));
                return (
                  <div className="p-6 border-t border-brand-cream-dark bg-brand-paper space-y-4">
                    <div className="flex items-center justify-between text-sm py-1">
                      <span className="text-brand-charcoal/80">Subtotal</span>
                      <span className="font-semibold text-brand-maroon text-base">
                        {formatPrice(cartTotal)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-brand-charcoal/60">
                      <span>Shipping (Customs Clearing)</span>
                      <span className="text-emerald-700 font-semibold uppercase tracking-wider">Free Shipping</span>
                    </div>
                    
                    {hasRestrictedItems ? (
                      <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-[10.5px] rounded-xs font-sans leading-relaxed text-left flex gap-1.5">
                        <ShieldAlert size={14} className="text-red-700 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold">Customs Hold in Blocked Country</p>
                          <p className="mt-0.5 text-red-700/80">Your basket includes items undeliverable to <span className="font-semibold underline">{activeRegionObj.name}</span> due to border customs. Please remove them or change your shipping region to checkout.</p>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setCartOpen(false);
                          onNavigate('checkout-info');
                        }}
                        className="w-full py-3 bg-brand-maroon hover:bg-brand-maroon-dark text-white font-sans text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        Proceed to Delivery
                      </button>
                    )}
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Wishlist Drawer */}
      {wishlistOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden font-sans">
          <div className="absolute inset-0 bg-black/60 transition-opacity" onClick={() => setWishlistOpen(false)} />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-brand-cream border-l border-brand-cream-dark flex flex-col shadow-xl">
              <div className="flex items-center justify-between p-6 border-b border-brand-cream-dark bg-brand-paper">
                <h3 className="text-lg font-serif text-brand-maroon font-bold flex items-center gap-2">
                  <Heart size={20} className="text-brand-gold fill-brand-gold" />
                  Saved Treasures ({wishlist.length})
                </h3>
                <button onClick={() => setWishlistOpen(false)} className="p-1 hover:bg-brand-cream-dark rounded-full cursor-pointer">
                  <X size={20} />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {wishlist.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-brand-cream-dark flex items-center justify-center text-brand-maroon/40">
                      <Heart size={32} strokeWidth={1} />
                    </div>
                    <p className="text-brand-charcoal/60 font-sans text-sm">Your wishlist is currently empty.</p>
                    <p className="text-[11px] text-brand-charcoal/40 italic px-4 leading-relaxed">
                      Tap the heart icon on any products in our catalog to save them as spiritual favorites.
                    </p>
                    <button
                      onClick={() => {
                        setWishlistOpen(false);
                        onNavigate('shop');
                      }}
                      className="px-6 py-2.5 bg-brand-maroon text-white text-xs font-semibold uppercase tracking-widest hover:bg-red-950 transition-colors cursor-pointer"
                    >
                      Browse Sacred Treasures
                    </button>
                  </div>
                ) : (
                  wishlist.map((product) => (
                    <div key={product.id} className="flex gap-4 p-3 bg-brand-paper border border-brand-cream-dark rounded-xs">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-xs border border-brand-cream-dark cursor-pointer"
                        onClick={() => {
                          setWishlistOpen(false);
                          onViewProduct(product);
                        }}
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h4 
                            onClick={() => {
                              setWishlistOpen(false);
                              onViewProduct(product);
                            }}
                            className="text-xs font-serif font-semibold text-brand-maroon leading-tight cursor-pointer hover:text-brand-gold transition-colors"
                          >
                            {product.name}
                          </h4>
                          <p className="text-[10px] text-brand-charcoal/60 capitalize mt-0.5">{product.category} Essential</p>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs font-semibold text-brand-maroon">
                            {formatPrice(product.price)}
                          </span>
                          <button
                            onClick={() => {
                              onAddToCart(product);
                              setWishlistOpen(false);
                              setCartOpen(true);
                            }}
                            className="px-2.5 py-1 bg-brand-maroon hover:bg-brand-maroon-dark text-white rounded-xs text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 cursor-pointer"
                          >
                            <ShoppingBag size={10} /> Add to Basket
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => onToggleWishlist(product)}
                        className="p-1 text-brand-charcoal/40 hover:text-brand-maroon cursor-pointer self-start"
                        title="Remove Saved Product"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Optimized Instant Search Overlay & Customs Checker dashboard */}
      {searchOpen && (() => {
        const matchingProducts = searchQuery.trim() === '' ? [] : PRODUCTS.filter(prod => 
          prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          prod.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          prod.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (prod.ingredientsOrMaterials?.toLowerCase().includes(searchQuery.toLowerCase()))
        );

        const popularTags = ['Kumkumadi', 'Ganesha', 'Saree', 'Brass Vilakku', 'Herbal bath'];

        const highlightText = (text: string, query: string) => {
          if (!query.trim()) return text;
          const parts = text.split(new RegExp(`(${query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi'));
          return (
            <span>
              {parts.map((part, i) => 
                part.toLowerCase() === query.trim().toLowerCase() 
                  ? <mark key={i} className="bg-brand-gold/30 text-brand-maroon font-bold px-0.5 rounded-sm">{part}</mark> 
                  : part
              )}
            </span>
          );
        };

        return (
          <div className="fixed inset-0 z-50 bg-[#fdfaf5] overflow-y-auto font-sans text-brand-charcoal flex flex-col">
            {/* Header control block inside Search page */}
            <div className="p-6 border-b border-brand-cream-dark bg-brand-paper">
              <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Logo size="sm" />
                <button 
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery('');
                  }} 
                  className="p-2 text-brand-charcoal/60 hover:text-brand-maroon rounded-full hover:bg-brand-cream-dark transition-all cursor-pointer flex items-center gap-1"
                  title="Close Search"
                >
                  <span className="text-[10px] uppercase font-bold tracking-widest hidden sm:inline">Close</span>
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Core Search Panel Container */}
            <div className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column (Search Input & Results list) - Spans 8 cols */}
              <div className="lg:col-span-8 flex flex-col space-y-6">
                <div>
                  <h2 className="text-xl md:text-2xl font-serif text-brand-maroon font-bold text-left tracking-tight">
                    Search our Sacred Heritage Essentials
                  </h2>
                  <p className="text-xs text-brand-charcoal/50 text-left mt-1 italic">
                    Instant catalog lookup with regional delivery analysis. Direct to your home.
                  </p>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    autoFocus
                    placeholder="Search traditional brassware, pure ayurvedic oils, Salem silk sarees..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full py-4 pl-12 pr-6 bg-brand-paper border border-[#e8dfcf] focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold text-brand-charcoal text-base shadow-xs placeholder-brand-charcoal/40"
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-maroon" size={20} />
                </div>

                {/* Popular Search tags list */}
                <div className="flex flex-wrap items-center gap-2 text-left">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-brand-gold mr-1">
                    Try Searching:
                  </span>
                  {popularTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSearchQuery(tag)}
                      className="px-3 py-1 bg-brand-paper hover:bg-brand-cream border border-brand-cream-dark hover:border-brand-gold transition-all text-xs text-brand-charcoal/80 hover:text-brand-maroon font-medium cursor-pointer"
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                {/* Matching Results List */}
                <div className="border-t border-[#f1ede6] pt-4 flex-1">
                  {searchQuery.trim() === '' ? (
                    <div className="py-12 text-center text-brand-charcoal/40 space-y-2">
                      <div className="w-12 h-12 rounded-full bg-brand-cream mx-auto flex items-center justify-center text-brand-gold/50">
                        <Search size={22} />
                      </div>
                      <p className="text-sm font-medium">Type to lookup details instantly</p>
                      <p className="text-[11px] leading-relaxed max-w-sm mx-auto italic px-4">
                        Search matches titles, ingredients, and categories. Results reflect delivery authorization markers under customs.
                      </p>
                    </div>
                  ) : matchingProducts.length === 0 ? (
                    <div className="py-12 bg-white border border-[#e8dfcf] rounded-xs text-center p-6 space-y-2">
                      <p className="text-sm font-semibold text-brand-maroon">No sacred objects match your search</p>
                      <p className="text-xs text-brand-charcoal/60 leading-relaxed max-w-md mx-auto">
                        We couldn't find items matching "{searchQuery}". Double-check spelling or seek general terms like "oil", "brass", "saree", or "bell".
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-[11px] text-brand-charcoal/50 text-left uppercase font-bold tracking-widest pl-1">
                        Found {matchingProducts.length} Authenticated Matches
                      </p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {matchingProducts.map((prod) => {
                          const isRestricted = prod.restrictedRegions?.includes(currentRegion);
                          return (
                            <div 
                              key={prod.id} 
                              className={`bg-brand-paper hover:bg-white border rounded-xs p-3 transition-all flex flex-col justify-between ${
                                isRestricted ? 'border-red-200 shadow-xs' : 'border-brand-cream-dark hover:shadow-xs'
                              }`}
                            >
                              <div className="flex gap-3">
                                <img 
                                  src={prod.imageUrl} 
                                  alt={prod.name} 
                                  className="w-16 h-16 object-cover rounded-md border border-brand-cream-dark cursor-pointer"
                                  onClick={() => {
                                    setSearchOpen(false);
                                    setSearchQuery('');
                                    onViewProduct(prod);
                                  }}
                                />
                                <div className="text-left flex-1 min-w-0">
                                  <span className="text-[8px] uppercase tracking-widest font-bold text-brand-gold block font-sans">
                                    {prod.category}
                                  </span>
                                  <h4 
                                    className="text-xs font-serif font-bold text-brand-maroon leading-tight truncate mt-0.5 cursor-pointer hover:text-brand-gold transition-colors"
                                    onClick={() => {
                                      setSearchOpen(false);
                                      setSearchQuery('');
                                      onViewProduct(prod);
                                    }}
                                  >
                                    {highlightText(prod.name, searchQuery)}
                                  </h4>
                                  <p className="text-[10px] text-brand-charcoal/80 font-bold mt-1">
                                    {formatPrice(prod.price)}
                                  </p>
                                </div>
                              </div>

                              <p className="text-[10px] text-brand-charcoal/60 line-clamp-2 mt-2 leading-relaxed text-left italic">
                                {highlightText(prod.description, searchQuery)}
                              </p>

                              {/* Customs indicators */}
                              <div className="mt-3 pt-2.5 border-t border-[#f1ede6] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                {isRestricted ? (
                                  <div className="text-[9.5px] text-red-700 font-medium flex items-center gap-1">
                                    <ShieldAlert size={12} className="text-red-700" />
                                    <span>Undeliverable to {activeRegionObj.id}</span>
                                  </div>
                                ) : (
                                  <div className="text-[9.5px] text-emerald-700 font-medium flex items-center gap-1">
                                    <CheckCircle2 size={12} className="text-emerald-600" />
                                    <span>Delivers to {activeRegionObj.name}</span>
                                  </div>
                                )}

                                <button
                                  disabled={isRestricted}
                                  onClick={() => {
                                    onAddToCart(prod);
                                    setSearchOpen(false);
                                    setCartOpen(true);
                                  }}
                                  className={`px-3 py-1 bg-brand-maroon text-white text-[9px] uppercase tracking-wider font-semibold rounded-xs transition-colors flex items-center gap-1 cursor-pointer self-start sm:self-auto ${
                                    isRestricted 
                                      ? 'opacity-30 bg-gray-400 cursor-not-allowed' 
                                      : 'hover:bg-brand-maroon-dark'
                                  }`}
                                >
                                  {isRestricted ? 'Restricted' : 'Quick Add'}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column (Customs Clearance & Region Selection Settings) - Spans 4 cols */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Active Country Config Widget */}
                <div className="bg-brand-paper border border-[#e8dfcf] p-5 rounded-xs space-y-4">
                  <div className="border-b border-brand-cream-dark pb-3 text-left">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-brand-gold font-sans block">
                      CUSTOMS SHIPPING BOUNDS
                    </span>
                    <h3 className="text-serif text-brand-maroon font-bold text-sm mt-1">
                      Set Your Delivery Region
                    </h3>
                  </div>

                  <div className="space-y-3 font-sans">
                    <p className="text-[11px] text-brand-charcoal/70 leading-relaxed text-left">
                      Toggle countries below to instantly verify which biological treatments or wooden temple accessories pass international cargo customs.
                    </p>

                    <div className="space-y-1.5">
                      {REGIONS.map((reg) => (
                        <button
                          key={reg.id}
                          onClick={() => onRegionChange(reg.id)}
                          className={`w-full flex items-center justify-between p-2 text-xs rounded-xs transition-colors cursor-pointer text-left ${
                            reg.id === currentRegion 
                              ? 'bg-brand-cream border border-brand-gold font-bold text-brand-maroon' 
                              : 'hover:bg-[#fcf9f2] border border-transparent'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span>{reg.flag}</span>
                            <span>{reg.name} ({reg.id})</span>
                          </span>
                          <span className="text-[9px] font-mono text-brand-charcoal/50 bg-brand-cream px-1 rounded-sm">
                            {reg.currency}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Dynamic Region-wise Customs Hold Cheat-sheet */}
                <div className="bg-[#fcf9f2] border border-brand-cream-dark p-4 rounded-sm text-left space-y-3 font-sans">
                  <h4 className="text-[10px] font-sans font-bold text-brand-gold uppercase tracking-widest flex items-center gap-1.5">
                    <HelpCircle size={12} className="text-brand-gold" />
                    Customs Breakdown Reference
                  </h4>
                  
                  <div className="space-y-2.5 text-[11px] text-brand-charcoal/80 leading-relaxed">
                    <div className="border-l-2 border-brand-gold pl-2">
                      <span className="font-bold">Ayurveda Oils (`Kumkumadi`):</span>
                      <p className="text-brand-charcoal/60 mt-0.5">Blocked in <span className="font-semibold text-brand-maroon">China 🇨🇳</span> and <span className="font-semibold text-brand-maroon">US 🇺🇸</span> due to liquid cargo rules & strict FDA licensing.</p>
                    </div>
                    <div className="border-l-2 border-brand-gold pl-2">
                      <span className="font-bold">Herbal powders (`Choornams`):</span>
                      <p className="text-brand-charcoal/60 mt-0.5">Blocked in <span className="font-semibold text-brand-maroon">China 🇨🇳</span>, <span className="font-semibold text-brand-maroon">Canada 🇨🇦</span> & <span className="font-semibold text-brand-maroon">UK 🇬🇧</span> due to raw quarantine check-points on biological seed products.</p>
                    </div>
                    <div className="border-l-2 border-brand-gold pl-2">
                      <span className="font-bold">Raw root woods (`Shwetark`):</span>
                      <p className="text-brand-charcoal/60 mt-0.5">Blocked in <span className="font-semibold text-brand-maroon">China 🇨🇳</span> and <span className="font-semibold text-brand-maroon">UAE 🇦🇪</span> because Calotropis roots fall under physical wood quarantines.</p>
                    </div>
                  </div>

                  <p className="text-[9.5px] text-brand-charcoal/40 italic leading-snug pt-1">
                    🔒 All other brassware thali sets, silk sarees, and metal jewelry comply with general shipping bounds across all selected nations.
                  </p>
                </div>

              </div>

            </div>
          </div>
        );
      })()}

      {/* Onboarding Regional Welcome Prompt Modal */}
      {showRegionPrompt && (
        <div className="fixed inset-0 bg-black/70 z-55 flex items-center justify-center p-4 backdrop-blur-xs font-sans animate-fade-in">
          <div className="bg-[#fdf9f1] border border-brand-cream-dark max-w-md w-full p-6 shadow-2xl relative space-y-4 rounded-xs">
            <button 
              onClick={() => {
                setShowRegionPrompt(false);
                localStorage.setItem('preferred_region', currentRegion);
              }}
              className="absolute top-4 right-4 text-brand-charcoal/40 hover:text-brand-maroon cursor-pointer p-1"
            >
              <X size={16} />
            </button>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto text-brand-gold mb-1">
                <Globe size={24} />
              </div>
              <h3 className="font-serif text-lg font-bold text-brand-maroon">
                Set Delivery Destination
              </h3>
              <p className="text-xs text-brand-charcoal/70 leading-relaxed md:px-2">
                Traditional plants, biological powders, and raw woods face diverse customs clearance policies across borders. Set your country to filter local regulatory restrictions and translate prices.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] uppercase font-bold tracking-widest text-[#8c6d3f] block text-left">
                Select Your Region:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {REGIONS.map((reg) => (
                  <button
                    key={reg.id}
                    onClick={() => {
                      onRegionChange(reg.id);
                      localStorage.setItem('preferred_region', reg.id);
                      setShowRegionPrompt(false);
                    }}
                    className={`flex items-center gap-2 p-2.5 bg-brand-paper border rounded-xs text-xs transition-all text-left cursor-pointer ${
                      reg.id === currentRegion 
                        ? 'border-brand-gold ring-1 ring-brand-gold bg-white' 
                        : 'border-[#f1ede6] hover:border-brand-cream-dark hover:bg-white'
                    }`}
                  >
                    <span className="text-base">{reg.flag}</span>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-brand-charcoal truncate text-[11px] leading-tight">{reg.name}</p>
                      <p className="text-[9px] text-brand-charcoal/40 uppercase font-mono mt-0.5">{reg.currency}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <p className="text-[9.5px] text-brand-charcoal/40 italic text-center pb-1">
              Prices, exchange conversions, and biological custom flags of all items will sync immediately.
            </p>

            <button
              onClick={() => {
                setShowRegionPrompt(false);
                localStorage.setItem('preferred_region', currentRegion);
              }}
              className="w-full py-2.5 bg-brand-maroon hover:bg-[#4d1012] text-white text-xs font-bold uppercase tracking-widest transition-all cursor-pointer shadow-xs"
            >
              Continue to Sacred Catalogue
            </button>
          </div>
        </div>
      )}
    </>
  );
}
