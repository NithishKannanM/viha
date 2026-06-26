import React, { useState } from 'react';
import { ShoppingBag, ArrowRight, Star, Check, Info, Heart, ShieldAlert, CheckCircle2, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS, PRODUCT_CATEGORIES, REGIONS } from '../data';

interface ShopViewProps {
  onAddToCart: (product: Product) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onNavigate: (view: 'home' | 'shop' | 'cart' | 'checkout-info' | 'tracker') => void;
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
  currentRegion: string;
  onViewProduct: (product: Product) => void;
}

export default function ShopView({
  onAddToCart,
  selectedCategory,
  onSelectCategory,
  onNavigate,
  wishlist,
  onToggleWishlist,
  currentRegion,
  onViewProduct
}: ShopViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const activeRegionObj = REGIONS.find(r => r.id === currentRegion) || REGIONS[0];

  const formatPrice = (priceInINR: number) => {
    const converted = priceInINR * activeRegionObj.exchangeRate;
    if (activeRegionObj.id === 'IN') {
      return `₹${priceInINR.toLocaleString('en-IN')}`;
    }
    return `${activeRegionObj.symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
  };

  const getCategorySlug = (cat: string) => {
    return cat.toLowerCase()
      .replace(/ & /g, '-')
      .replace(/ \/ /g, '-')
      .replace(/ /g, '-');
  };

  // Filter products by search and category
  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || getCategorySlug(p.category) === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const triggerAddToCart = (product: Product) => {
    onAddToCart(product);
    setSuccessToast(`"${product.name}" added to sacred basket!`);
    setTimeout(() => {
      setSuccessToast(null);
    }, 3000);
  };

  return (
    <div className="bg-brand-cream-dark/5 py-8 md:py-12 px-4 md:px-12 max-w-7xl mx-auto space-y-6 md:space-y-10 min-h-screen font-sans">

      {/* Toast Alert — positioned above mobile bottom nav */}
      {successToast && (
        <div className="fixed bottom-20 lg:bottom-6 right-4 left-4 sm:left-auto sm:right-6 sm:max-w-sm z-50 bg-brand-maroon border border-brand-gold text-brand-cream py-3.5 px-5 rounded-xs shadow-xl flex items-center justify-between gap-3 text-xs uppercase tracking-wider font-semibold animate-slide-up">
          <Check size={16} className="text-brand-gold shrink-0" />
          <span className="flex-1 line-clamp-1">{successToast}</span>
          <button
            onClick={() => onNavigate('cart')}
            className="hover:underline text-brand-gold font-bold flex items-center gap-1 text-[11px] shrink-0"
          >
            Checkout <ArrowRight size={12} />
          </button>
        </div>
      )}

      {/* Grid Layout Headers */}
      <div className="flex flex-col md:flex-row items-center justify-between border-b border-brand-cream-dark pb-6 gap-6">
        <div>
          <h2 className="text-3xl font-serif text-brand-maroon font-bold flex items-center gap-2" style={{ fontFamily: 'Libre Caslon Text, serif' }}>
            Sacred Catalog
          </h2>
          <p className="text-xs text-brand-charcoal/60 mt-1">
            Browse our carefully vetted selection of physical spiritual accessories and classical formulations.
          </p>
        </div>

        {/* Catalog Search input */}
        <div className="w-full md:w-80 relative">
          <input
            type="text"
            placeholder="Filter catalog..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs px-4 py-2.5 bg-brand-paper border border-brand-cream-dark focus:outline-none focus:border-brand-gold text-brand-charcoal rounded-xs"
          />
        </div>
      </div>

      {/* Mobile: horizontal pill category scroll */}
      <div className="lg:hidden -mx-4 px-4">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide touch-scroll pb-2 snap-x">
          {PRODUCT_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex-shrink-0 snap-start px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wide border transition-all cursor-pointer whitespace-nowrap min-h-[36px] ${
                selectedCategory === cat.id
                  ? 'bg-brand-maroon text-white border-brand-maroon'
                  : 'bg-brand-paper text-brand-charcoal/70 border-brand-cream-dark hover:border-brand-maroon'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop mobile filter toggle */}
      <div className="hidden">
        <button
          onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          className="flex items-center gap-2 px-4 py-2.5 border border-brand-cream-dark bg-brand-paper text-xs font-bold uppercase tracking-widest cursor-pointer rounded-xs w-full justify-between hover:border-brand-maroon transition-colors"
          aria-expanded={mobileFilterOpen}
        >
          <span className="flex items-center gap-2"><SlidersHorizontal size={14} /> Filter by Category</span>
          <ChevronDown size={14} className={`transition-transform duration-200 ${mobileFilterOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column Categories Menu (Sidebar) */}
        <aside className={`lg:col-span-3 bg-brand-paper border border-brand-cream-dark p-6 rounded-xs space-y-6 ${mobileFilterOpen ? 'block' : 'hidden'} lg:block`}>
          <div>
            <h4 className="text-xs font-bold text-brand-maroon uppercase tracking-widest border-b border-brand-cream-dark pb-3">
              Categories
            </h4>
            <div className="flex flex-col space-y-2 mt-4 text-xs font-medium text-brand-charcoal">
              {PRODUCT_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`py-2 px-3 text-left rounded-sm transition-all flex items-center justify-between cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-brand-maroon text-white font-semibold'
                      : 'hover:bg-brand-cream-dark/20 text-brand-charcoal/80'
                  }`}
                >
                  <span>{cat.label}</span>
                  {selectedCategory === cat.id && <span className="w-1.5 h-1.5 bg-brand-gold rounded-full"></span>}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-brand-cream/40 p-4 border border-brand-gold/20 rounded-xs space-y-2">
            <h5 className="text-[11px] font-bold text-brand-gold uppercase tracking-widest flex items-center gap-1">
              <Star size={12} className="fill-brand-gold text-brand-gold" /> Gold Standard
            </h5>
            <p className="text-[10px] text-brand-charcoal/60 leading-relaxed">
              We stand by the purity of our ingredients. All traditional clothing integrates authentic certified zari thread directly from traditional weavers.
            </p>
          </div>
        </aside>

        {/* Right Column Product Grid */}
        <main className="lg:col-span-9 space-y-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-brand-paper border border-brand-cream-dark rounded-xs space-y-4">
              <p className="text-brand-charcoal/50 text-sm italic">
                No items match your selected filters. Let's wider your search.
              </p>
              <button
                onClick={() => {
                  onSelectCategory('all');
                  setSearchQuery('');
                }}
                className="px-6 py-2 bg-brand-maroon text-white text-xs uppercase tracking-widest font-semibold hover:bg-red-950 transition-colors cursor-pointer"
              >
                Reset catalog filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              {filteredProducts.map((p) => {
                const isRestricted = p.restrictedRegions?.includes(currentRegion);
                return (
                  <div
                    key={p.id}
                    className={`bg-brand-paper border border-t-2 rounded-sm group flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md transition-all relative ${
                      isRestricted
                        ? 'border-red-300 border-t-red-300 bg-red-50/10'
                        : 'border-brand-cream-dark border-t-transparent hover:border-t-brand-gold'
                    }`}
                  >
                    {/* Item Image */}
                    <div className="relative aspect-square sm:aspect-[4/3] bg-brand-cream overflow-hidden flex items-center justify-center">
                      <img
                        src={p.imageUrl}
                        alt={p.name}
                        className="w-full h-full object-contain mix-blend-multiply p-2 group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                        onClick={() => onViewProduct(p)}
                        loading="lazy"
                      />
                      {isRestricted ? (
                        <span className="absolute top-2 left-2 bg-[#4d1012] text-white text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm border border-red-500/30 flex items-center gap-0.5 shadow-md">
                          <ShieldAlert size={9} className="text-red-400 shrink-0" /> Blocked
                        </span>
                      ) : p.rating && p.rating >= 4.9 ? (
                        <span className="absolute top-2 left-2 bg-brand-maroon text-brand-cream text-[8px] md:text-[10px] font-bold uppercase tracking-widest px-1.5 md:px-2 py-0.5 rounded-sm border border-brand-gold/30">
                          Top Rated
                        </span>
                      ) : null}
                      {/* Wishlist Toggle Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleWishlist(p);
                        }}
                        className="absolute top-2 right-2 w-8 h-8 bg-[#FDFBF7]/90 hover:bg-[#FDFBF7] text-brand-maroon rounded-full border border-brand-cream-dark shadow-xs flex items-center justify-center cursor-pointer z-10 min-w-[32px] min-h-[32px]"
                        aria-label={wishlist.some((item) => item.id === p.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                      >
                        <Heart
                          size={13}
                          className={wishlist.some((item) => item.id === p.id) ? 'fill-brand-maroon text-brand-maroon' : 'text-brand-maroon'}
                        />
                      </button>
                    </div>

                    {/* Title & Body */}
                    <div className="p-2.5 sm:p-3 md:p-4 flex-1 flex flex-col justify-between space-y-2">
                      <div className="space-y-0.5 md:space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[8px] md:text-[10px] text-brand-gold uppercase tracking-widest font-bold truncate pr-1">
                            {p.category}
                          </span>
                          {p.rating && (
                            <div className="flex items-center text-brand-gold text-[9px] font-bold gap-0.5 shrink-0">
                              <Star size={9} className="fill-brand-gold text-brand-gold" />
                              <span>{p.rating}</span>
                            </div>
                          )}
                        </div>
                        <h3
                          onClick={() => onViewProduct(p)}
                          className="text-[12px] md:text-sm font-serif font-semibold text-brand-maroon hover:text-brand-gold cursor-pointer leading-tight line-clamp-2"
                          style={{ fontFamily: 'Libre Caslon Text, serif' }}
                        >
                          {p.name}
                        </h3>
                        <p className="text-[10px] md:text-xs text-brand-charcoal/70 line-clamp-2 leading-relaxed hidden sm:block">
                          {p.description}
                        </p>

                        {isRestricted && (
                          <div className="text-[9px] text-red-800 bg-red-100/50 border border-red-200/40 p-1.5 rounded-xs flex items-start gap-1 font-sans">
                            <ShieldAlert size={10} className="text-red-700 shrink-0 mt-0.5" />
                            <span className="line-clamp-2">Undeliverable to {activeRegionObj.name}.</span>
                          </div>
                        )}
                      </div>

                      {/* Pricing & Cart */}
                      <div className="flex items-center justify-between pt-2 border-t border-brand-cream-dark">
                        <span className="text-[12px] md:text-sm font-semibold text-brand-maroon">
                          {formatPrice(p.price)}
                        </span>
                        <div className="flex gap-1">
                          <button
                            onClick={() => onViewProduct(p)}
                            className="p-1.5 bg-brand-cream hover:bg-brand-cream-dark text-brand-charcoal rounded-xs cursor-pointer min-w-[28px] min-h-[28px] flex items-center justify-center"
                            aria-label="View details"
                          >
                            <Info size={13} />
                          </button>
                          <button
                            disabled={isRestricted}
                            onClick={() => triggerAddToCart(p)}
                            className={`px-2 sm:px-3 py-1.5 text-white rounded-xs text-[9px] md:text-[10px] uppercase font-bold tracking-widest flex items-center gap-0.5 cursor-pointer transition-all min-h-[28px] ${
                              isRestricted
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50'
                                : 'bg-brand-maroon hover:bg-brand-maroon-dark'
                            }`}
                          >
                            <ShoppingBag size={9} />
                            <span className="hidden sm:inline">{isRestricted ? 'N/A' : 'Add'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

    </div>
  );
}
