import React, { useState } from 'react';
import { ArrowRight, Search, Truck, AlertCircle } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data';
interface HomeViewProps {
  onNavigate: (view: 'home' | 'shop' | 'cart' | 'checkout-info' | 'tracker' | 'beauty') => void;
  onSelectCategory: (category: string) => void;
  onTrackOrder: (orderId: string) => void;
  onViewProduct: (product: Product) => void;
}

const SectionOrnament = () => (
  <div className="flex items-center justify-center gap-2 mt-4">
    <div className="h-px w-10 bg-gradient-to-r from-transparent to-brand-gold/50" />
    <div className="w-1.5 h-1.5 rotate-45 bg-brand-gold/75 shrink-0" />
    <div className="h-px w-10 bg-gradient-to-l from-transparent to-brand-gold/50" />
  </div>
);

export default function HomeView({ onNavigate, onSelectCategory, onTrackOrder, onViewProduct }: HomeViewProps) {
  const [trackInput, setTrackInput] = useState('');
  const [trackError, setTrackError] = useState('');

  const bestsellers = (() => {
    const flagged = PRODUCTS.filter(p => p.isBestseller);
    const topRated = PRODUCTS.filter(p => !p.isBestseller && p.rating && p.rating >= 4.8);
    return [...flagged, ...topRated].slice(0, 4);
  })();

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackInput.trim()) return;

    const query = trackInput.trim().toUpperCase();
    // Support typing the exact id or parts of it
    if (query.includes('89241') || query === 'VH-89241') {
      onTrackOrder('VH-89241');
      setTrackError('');
    } else if (query.includes('12345') || query === 'VIHA-12345') {
      onTrackOrder('VIHA-12345');
      setTrackError('');
    } else {
      setTrackError('Divine record not found. Try sample IDs like "VH-89241" or "VIHA-12345".');
    }
  };

  return (
    <div className="bg-brand-cream-dark/20 animate-fade-in font-sans">
      
      {/* 1. Hero banner section with antique background image overlay */}
      <section className="relative overflow-hidden w-full min-h-[480px] h-[520px] md:h-[620px] bg-brand-maroon flex items-center">
        {/* Artistic background blur photo representing spiritual lamps */}
        <div
          className="absolute inset-0 bg-cover bg-center brightness-[0.45] saturate-100"
          style={{
            backgroundImage: 'url("/images/hero_banner.png")',
            backgroundPosition: 'center center',
          }}
        />

        {/* Gold geometrical lines or mandala overlay */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-brand-maroon/70 pointer-events-none opacity-60" />

        <div className="relative max-w-7xl mx-auto w-full px-5 sm:px-6 md:px-12 text-center md:text-left z-10 flex flex-col justify-center">
          <span className="text-[10px] sm:text-xs uppercase tracking-widest text-brand-gold font-bold mb-3 block">
            VIHA HERITAGE COLLECTION
          </span>

          <h2 className="text-2xl sm:text-4xl md:text-6xl text-brand-cream/95 font-serif font-black tracking-tight leading-tight max-w-3xl mb-3 md:mb-4" style={{ fontFamily: 'Libre Caslon Text, Playfair Display, serif' }}>
            Tradition Delivered To Your Doorstep
          </h2>

          <p className="text-[13px] sm:text-sm md:text-base text-brand-cream-dark max-w-xl mb-6 md:mb-8 leading-relaxed font-sans opacity-90">
            Discover authentic pooja essentials, traditional clothing, and ayurvedic wellness products carefully curated for your sacred spaces.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center md:justify-start gap-3">
            <button
              onClick={() => {
                onSelectCategory('all');
                onNavigate('shop');
              }}
              className="w-full sm:w-auto px-8 py-4 sm:py-3.5 bg-brand-maroon text-white text-xs font-bold uppercase tracking-widest rounded-xs hover:bg-brand-maroon-dark transition-colors border border-brand-maroon shadow-md cursor-pointer min-h-[50px] sm:min-h-[44px]"
            >
              Shop Collection
            </button>
            <button
              onClick={() => onNavigate('beauty')}
              className="w-full sm:w-auto px-8 py-4 sm:py-3.5 bg-transparent text-white text-xs font-bold uppercase tracking-widest rounded-xs hover:bg-white/10 transition-all border border-white/50 cursor-pointer min-h-[50px] sm:min-h-[44px]"
            >
              Explore Beauty &amp; Wellness
            </button>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="bg-brand-maroon/95 py-4 md:py-5 border-y border-brand-gold/20 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-2.5 text-center">
          <h4 className="font-serif text-brand-cream tracking-tight px-6" style={{ fontFamily: 'Libre Caslon Text, serif' }}>
            <span className="text-xl md:text-2xl font-black text-brand-gold">1,00,000+</span>
            <span className="text-sm md:text-base font-bold text-brand-cream/85"> Customers Trust Viha</span>
          </h4>
          {/* Mobile: horizontal scroll chips */}
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide touch-scroll px-5 pb-1 md:hidden w-full snap-x snap-mandatory">
            {['Authentic Products', 'Secure Payments', 'Worldwide Shipping', 'Quality Assured'].map((trust) => (
              <div
                key={trust}
                className="flex-shrink-0 snap-start flex items-center gap-1.5 bg-white/10 border border-brand-gold/25 rounded-full px-4 py-2"
              >
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-cream/80 whitespace-nowrap">{trust}</span>
              </div>
            ))}
          </div>
          {/* Desktop: inline list */}
          <div className="hidden md:flex flex-wrap items-center justify-center gap-x-0 gap-y-1 text-[11px] text-brand-cream-dark/70 uppercase tracking-widest font-semibold">
            <span className="px-3">Authentic Spiritual Products</span>
            <span className="text-brand-gold/40">|</span>
            <span className="px-3">Secure Payments</span>
            <span className="text-brand-gold/40">|</span>
            <span className="px-3">International Delivery</span>
            <span className="text-brand-gold/40">|</span>
            <span className="px-3">Quality Assured</span>
          </div>
        </div>
      </section>

      {/* 2. Shop By Purpose Section */}
      <section className="py-10 md:py-16 px-5 sm:px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h3 className="text-2xl md:text-4xl font-serif text-brand-maroon font-black" style={{ fontFamily: 'Libre Caslon Text, serif' }}>
            Shop By Purpose
          </h3>
          <SectionOrnament />
        </div>

        {/* Mobile: vertical stack with compact heights | Desktop: original complex grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">

          {/* Left Large Column (Daily Pooja) */}
          <div
            onClick={() => {
              onSelectCategory('spiritual-pooja');
              onNavigate('shop');
            }}
            className="lg:col-span-6 relative h-[260px] sm:h-[320px] lg:h-[480px] bg-brand-maroon text-white overflow-hidden rounded-sm border border-brand-cream-dark shadow-sm group cursor-pointer"
          >
            <div
              className="absolute inset-0 bg-cover bg-center brightness-[0.7] group-hover:scale-105 transition-transform duration-700"
              style={{ backgroundImage: 'url("/images/daily_pooja.png")' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 md:bottom-6 md:left-6 md:right-6">
              <span className="text-[9px] uppercase font-bold tracking-widest text-brand-gold bg-brand-maroon/80 px-2 py-1 rounded-sm inline-block mb-2 md:mb-3">
                Daily Rituals
              </span>
              <h4 className="text-lg md:text-2xl font-serif text-brand-cream/95 font-semibold" style={{ fontFamily: 'Libre Caslon Text, serif' }}>
                Daily Pooja
              </h4>
              <p className="text-xs text-brand-cream-dark/90 mt-1 max-w-md line-clamp-2">
                Elevate your daily rituals with pure ingredients, authentic oil lamps, and hand-milled powders.
              </p>
            </div>
          </div>

          {/* Right Combined Column */}
          <div className="lg:col-span-6 flex flex-col gap-4 md:gap-6">

            {/* Top Row: Two Squares */}
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {/* Festival Essentials */}
              <div
                onClick={() => {
                  onSelectCategory('new-arrivals');
                  onNavigate('shop');
                }}
                className="relative h-[160px] sm:h-[190px] lg:h-[220px] bg-brand-maroon text-white overflow-hidden rounded-sm border border-brand-cream-dark shadow-sm group cursor-pointer"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center brightness-[0.7] group-hover:scale-105 transition-transform duration-700"
                  style={{ backgroundImage: 'url("/images/festival_essentials.png")' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-4">
                  <h4 className="text-[13px] md:text-sm font-serif font-semibold text-brand-cream/95 tracking-wide uppercase leading-tight" style={{ fontFamily: 'Libre Caslon Text, serif' }}>
                    Festival Essentials
                  </h4>
                  <p className="text-[9px] md:text-[10px] text-brand-cream-dark/80 mt-0.5 hidden sm:block">Lamps, ghee, and colorful dusts.</p>
                </div>
              </div>

              {/* Ayurvedic Beauty */}
              <div
                onClick={() => onNavigate('beauty')}
                className="relative h-[160px] sm:h-[190px] lg:h-[220px] bg-brand-maroon text-white overflow-hidden rounded-sm border border-brand-cream-dark shadow-sm group cursor-pointer"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center brightness-[0.65] group-hover:scale-105 transition-transform duration-700"
                  style={{ backgroundImage: 'url("/images/ayurveda_wellness.png")' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-4">
                  <span className="text-[8px] md:text-[9px] uppercase tracking-widest text-brand-gold font-bold mb-1 flex items-center gap-0.5">
                    Beauty <ArrowRight size={8} />
                  </span>
                  <h4 className="text-[13px] md:text-sm font-serif font-semibold text-brand-cream/95 tracking-wide uppercase leading-tight" style={{ fontFamily: 'Libre Caslon Text, serif' }}>
                    Ayurvedic Beauty
                  </h4>
                  <p className="text-[9px] md:text-[10px] text-brand-cream-dark/75 mt-0.5 hidden sm:block">Ritual skincare &amp; herbal formulations.</p>
                </div>
              </div>
            </div>

            {/* Bottom Row: Wide Rectangle (Housewarming Gifts) */}
            <div
              onClick={() => {
                onSelectCategory('home-living');
                onNavigate('shop');
              }}
              className="relative h-[180px] sm:h-[210px] lg:h-[236px] bg-brand-maroon text-white overflow-hidden rounded-sm border border-brand-cream-dark shadow-sm group cursor-pointer"
            >
              <div className="absolute inset-0 grid grid-cols-2">
                <div className="bg-brand-paper p-5 md:p-8 flex flex-col justify-center text-brand-charcoal">
                  <span className="text-[8px] md:text-[10px] uppercase font-bold tracking-widest text-brand-gold mb-1 md:mb-2 block">
                    NEW BEGINNINGS
                  </span>
                  <h4 className="text-sm md:text-lg font-serif font-semibold text-brand-maroon leading-tight" style={{ fontFamily: 'Libre Caslon Text, serif' }}>
                    Housewarming Gifts
                  </h4>
                  <p className="text-[10px] md:text-xs text-brand-charcoal/70 mt-1 md:mt-2 leading-relaxed line-clamp-2 md:line-clamp-none">
                    Thoughtful traditional gifts, hand-cast brass Ganeshas for new chapters.
                  </p>
                </div>
                <div
                  className="brightness-[0.8] relative h-full bg-cover bg-center"
                  style={{ backgroundImage: 'url("/images/housewarming_gifts.png")' }}
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2.5 Beauty & Wellness Promotional Section */}
      <section className="py-10 md:py-16 bg-brand-section-alt border-t border-brand-cream-dark px-5 sm:px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 items-center">

          {/* Image — Left (shorter on mobile) */}
          <div className="relative aspect-[16/9] sm:aspect-[4/3] lg:aspect-auto lg:h-[440px] overflow-hidden rounded-sm">
            <img
              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=900"
              alt="Viha Beauty & Wellness — handcrafted Ayurvedic products"
              className="w-full h-full object-cover brightness-[0.88] hover:brightness-[0.92] transition-all duration-500"
              loading="lazy"
            />
          </div>

          {/* Text — Right */}
          <div className="space-y-4 md:space-y-5 lg:pl-6">
            <span className="text-[10px] uppercase tracking-widest text-brand-gold font-bold block">
              AYURVEDIC BEAUTY
            </span>
            <h2
              className="text-2xl md:text-3xl lg:text-4xl font-serif text-brand-maroon font-black leading-tight"
              style={{ fontFamily: 'Libre Caslon Text, serif' }}
            >
              Beauty &amp; Wellness,<br />Rooted in Ayurveda
            </h2>
            <div className="flex items-center gap-2">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-brand-gold/60" />
              <div className="w-1 h-1 rotate-45 bg-brand-gold/70 shrink-0" />
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-brand-gold/60" />
            </div>
            <p className="text-sm text-brand-charcoal/75 leading-relaxed max-w-md">
              Discover handcrafted soaps, herbal skincare, traditional hair oils, natural fragrances, and authentic self-care products inspired by generations of Indian wisdom.
            </p>
            <button
              onClick={() => onNavigate('beauty')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 sm:py-3.5 bg-brand-maroon hover:bg-brand-maroon-dark text-white text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer min-h-[50px] sm:min-h-[44px]"
            >
              Explore Beauty &amp; Wellness <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* 2.75 Bestselling Items Section */}
      <section className="py-10 md:py-16 bg-brand-paper border-t border-brand-cream-dark">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12">
          <div className="text-center mb-8 md:mb-12">
            <h3 className="text-2xl md:text-4xl font-serif text-brand-maroon font-black" style={{ fontFamily: 'Libre Caslon Text, serif' }}>
              Bestselling Items
            </h3>
            <SectionOrnament />
          </div>
        </div>

        {/* Mobile: horizontal scroll carousel */}
        <div className="flex gap-4 overflow-x-auto scrollbar-hide touch-scroll snap-x snap-mandatory pb-4 px-5 sm:px-6 md:hidden">
          {bestsellers.map((product) => (
            <div
              key={product.id}
              onClick={() => onViewProduct(product)}
              className="flex-shrink-0 w-[62vw] max-w-[200px] snap-start bg-brand-cream border border-brand-cream-dark border-t-2 border-t-transparent rounded-sm overflow-hidden cursor-pointer group active:scale-98 transition-all flex flex-col"
            >
              <div className="aspect-square overflow-hidden relative bg-brand-cream flex items-center justify-center">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-contain mix-blend-multiply p-2"
                  loading="lazy"
                />
                {product.rating && product.rating >= 4.8 && (
                  <span className="absolute top-2 left-2 bg-brand-maroon text-brand-cream text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-sm">
                    Top Rated
                  </span>
                )}
              </div>
              <div className="p-3 flex flex-col items-center text-center flex-1 justify-between space-y-1.5">
                <div>
                  <span className="text-[9px] text-brand-gold uppercase tracking-widest font-bold mb-0.5 block">
                    {product.vendor || product.category}
                  </span>
                  <h4 className="text-[12px] font-serif font-semibold text-brand-maroon leading-tight line-clamp-2" style={{ fontFamily: 'Libre Caslon Text, serif' }}>
                    {product.name}
                  </h4>
                  {product.rating && (
                    <div className="flex items-center justify-center gap-0.5 mt-1 text-[9px] text-brand-charcoal/70">
                      <span className="text-brand-gold">★ {product.rating}</span>
                    </div>
                  )}
                </div>
                <span className="text-xs font-semibold text-brand-maroon">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-12">
          {bestsellers.map((product) => (
            <div
              key={product.id}
              onClick={() => onViewProduct(product)}
              className="bg-brand-cream border border-brand-cream-dark border-t-2 border-t-transparent hover:border-t-brand-gold rounded-xs overflow-hidden cursor-pointer group hover:shadow-md transition-all flex flex-col"
            >
              <div className="aspect-[4/3] overflow-hidden relative bg-brand-cream flex items-center justify-center">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-contain mix-blend-multiply p-2 group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {product.rating && product.rating >= 4.8 && (
                  <span className="absolute top-3 left-3 bg-brand-maroon text-brand-cream text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm border border-brand-gold/30">
                    Top Rated
                  </span>
                )}
              </div>
              <div className="p-4 flex flex-col items-center text-center flex-1 justify-between space-y-2">
                <div>
                  <span className="text-[10px] text-brand-gold uppercase tracking-widest font-bold mb-1 block">
                    {product.vendor || product.category + ' Essential'}
                  </span>
                  <h4 className="text-sm font-serif font-semibold text-brand-maroon leading-tight" style={{ fontFamily: 'Libre Caslon Text, serif' }}>
                    {product.name}
                  </h4>
                  {product.rating && (
                    <div className="flex items-center justify-center gap-1 mt-1 text-[10px] text-brand-charcoal/70">
                      <span className="text-brand-gold">★ {product.rating}</span>
                      {product.reviewsCount && (
                        <span>({product.reviewsCount} reviews)</span>
                      )}
                    </div>
                  )}
                </div>
                <span className="text-sm font-semibold text-brand-maroon">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 md:mt-10 text-center px-5 sm:px-6 md:px-12">
          <button
            onClick={() => {
              onSelectCategory('all');
              onNavigate('shop');
            }}
            className="w-full sm:w-auto px-8 py-4 sm:py-3 bg-brand-maroon text-white text-xs font-bold uppercase tracking-widest hover:bg-brand-maroon-dark transition-colors border border-brand-maroon shadow-md cursor-pointer min-h-[50px] sm:min-h-[44px]"
          >
            Shop All Best Sellers
          </button>
        </div>
      </section>

      {/* 3. Curated Collections Section */}
      <section className="py-10 md:py-16 bg-brand-cream border-t border-b border-brand-cream-dark">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-7 md:mb-10 px-5 sm:px-6 md:px-12">
            <div>
              <h3 className="text-2xl md:text-4xl font-serif text-brand-maroon font-black" style={{ fontFamily: 'Libre Caslon Text, serif' }}>
                Curated Collections
              </h3>
              <div className="flex items-center gap-2 mt-2">
                <div className="h-px w-8 bg-brand-gold/60" />
                <div className="w-1 h-1 rotate-45 bg-brand-gold/70 shrink-0" />
              </div>
            </div>
            <button
              onClick={() => {
                onSelectCategory('all');
                onNavigate('shop');
              }}
              className="text-brand-maroon hover:text-brand-gold transition-colors text-xs font-semibold uppercase tracking-widest flex items-center gap-1.5 cursor-pointer"
            >
              View All <ArrowRight size={14} />
            </button>
          </div>

          {/* Mobile: horizontal scroll */}
          <div className="flex gap-4 overflow-x-auto scrollbar-hide touch-scroll snap-x snap-mandatory pb-4 px-5 sm:px-6 md:hidden">
            {[
              { cat: 'spiritual-pooja', img: '/images/hero_banner.png', label: 'Pooja Products' },
              { cat: 'jewellery-fashion', img: '/images/sacred_jewelry.png', label: 'Sacred Jewelry' },
              { cat: 'jewellery-fashion', img: '/images/traditional_clothing.png', label: 'Traditional Clothing' },
            ].map((col) => (
              <div
                key={col.label}
                onClick={() => { onSelectCategory(col.cat); onNavigate('shop'); }}
                className="flex-shrink-0 w-[58vw] max-w-[190px] snap-start group cursor-pointer"
              >
                <div className="aspect-[3/4] overflow-hidden bg-brand-paper border border-brand-cream-dark rounded-sm">
                  <img
                    src={col.img}
                    alt={col.label}
                    className="w-full h-full object-cover brightness-[0.95]"
                    loading="lazy"
                  />
                </div>
                <h4 className="text-center font-serif text-[13px] font-semibold text-brand-maroon mt-3" style={{ fontFamily: 'Libre Caslon Text, serif' }}>
                  {col.label}
                </h4>
              </div>
            ))}
          </div>

          {/* Desktop: 3-column grid */}
          <div className="hidden md:grid grid-cols-3 gap-6 px-12">
            <div
              onClick={() => { onSelectCategory('spiritual-pooja'); onNavigate('shop'); }}
              className="group cursor-pointer"
            >
              <div className="aspect-[3/4] overflow-hidden bg-brand-paper border border-brand-cream-dark rounded-xs p-3 transition-shadow hover:shadow-md">
                <img src="/images/hero_banner.png" alt="Pooja Products" className="w-full h-full object-cover rounded-xs brightness-[0.95] group-hover:scale-102 transition-transform duration-500" />
              </div>
              <h4 className="text-center font-serif text-sm font-semibold text-brand-maroon mt-4 group-hover:text-brand-gold transition-colors" style={{ fontFamily: 'Libre Caslon Text, serif' }}>Pooja Products</h4>
            </div>
            <div
              onClick={() => { onSelectCategory('jewellery-fashion'); onNavigate('shop'); }}
              className="group cursor-pointer"
            >
              <div className="aspect-[3/4] overflow-hidden bg-brand-paper border border-brand-cream-dark rounded-xs p-3 transition-shadow hover:shadow-md">
                <img src="/images/sacred_jewelry.png" alt="Sacred Jewelry" className="w-full h-full object-cover rounded-xs brightness-[0.95] group-hover:scale-102 transition-transform duration-500" />
              </div>
              <h4 className="text-center font-serif text-sm font-semibold text-brand-maroon mt-4 group-hover:text-brand-gold transition-colors" style={{ fontFamily: 'Libre Caslon Text, serif' }}>Sacred Jewelry</h4>
            </div>
            <div
              onClick={() => { onSelectCategory('jewellery-fashion'); onNavigate('shop'); }}
              className="group cursor-pointer"
            >
              <div className="aspect-[3/4] overflow-hidden bg-brand-paper border border-brand-cream-dark rounded-xs p-3 transition-shadow hover:shadow-md">
                <img src="/images/traditional_clothing.png" alt="Traditional Clothing" className="w-full h-full object-cover rounded-xs brightness-[0.95] group-hover:scale-102 transition-transform duration-500" />
              </div>
              <h4 className="text-center font-serif text-sm font-semibold text-brand-maroon mt-4 group-hover:text-brand-gold transition-colors" style={{ fontFamily: 'Libre Caslon Text, serif' }}>Traditional Clothing</h4>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Heritage Introduction Section (Founder) */}
      <section className="py-12 md:py-20 px-5 sm:px-6 md:px-12 bg-brand-paper">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Portrait left */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative border border-brand-cream-dark p-4 bg-brand-cream rounded-xs shadow-sm max-w-sm w-full">
              {/* Premium image representing founder Mrs Anitha Kuppusamy */}
              <div className="aspect-square relative overflow-hidden rounded-xs">
                <img 
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600" 
                  alt="Anitha Kuppusamy" 
                  className="w-full h-full object-cover grayscale opacity-90 contrast-[1.05]"
                />
                
                {/* Visual marker in bottom right */}
                <div className="absolute bottom-3 right-3 bg-brand-paper border border-brand-gold/40 p-1.5 rounded-sm flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-brand-maroon">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z" fill="currentColor" className="opacity-10" />
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 2 12 2Z" stroke="#B8893D" strokeWidth="0.8" />
                    {/* Flower design */}
                    <path d="M12 8C12 8 10 10 10 12C10 14 12 16 12 16C12 16 14 14 14 12C14 10 12 8 12 8Z" fill="#5c181a" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Text Right */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-widest text-brand-gold font-bold block">
              OUR HERITAGE
            </span>
            
            <h3 className="text-3xl font-serif text-brand-maroon leading-tight font-black" style={{ fontFamily: 'Libre Caslon Text, serif' }}>
              Preserving Tradition, Promoting Wellness.
            </h3>
            
            <p className="text-sm text-brand-charcoal/80 leading-relaxed italic border-l-2 border-brand-gold pl-5 pr-2 py-1">
              "Viha was born from a deep-rooted desire to make authentic spiritual and traditional products accessible to every home. We believe that the rituals of our ancestors hold profound wisdom and peace."
            </p>
            
            <p className="text-xs text-brand-charcoal/70 leading-relaxed font-sans">
              Every product in our collection is thoughtfully curated to ensure it carries the essence of purity, crafted by artisans who understand the sanctity of these age-old spiritual traditions.
            </p>

            <div className="pt-2">
              <h5 className="font-serif text-brand-maroon font-black text-sm" style={{ fontFamily: 'Libre Caslon Text, serif' }}>
                Anitha Kuppusamy
              </h5>
              <p className="text-[10px] text-brand-gold uppercase tracking-widest font-semibold mt-0.5">
                FOUNDER, VIHA
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Track Pack Status block */}
      <section id="tracker" className="py-12 md:py-16 bg-brand-maroon text-brand-cream border-t border-brand-cream-dark px-5 sm:px-6 md:px-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#B8893D_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />

        <div className="max-w-xl mx-auto space-y-5 relative z-10">
          <div className="flex justify-center flex-col items-center">
            <Truck size={32} className="text-brand-gold mb-3" />
            <h3 className="text-xl md:text-2xl font-serif text-brand-cream font-bold" style={{ fontFamily: 'Libre Caslon Text, serif' }}>
              Track Your Spiritual Journey
            </h3>
            <p className="text-xs text-brand-cream-dark opacity-90 max-w-md mt-2 leading-relaxed">
              Enter your order ID to see the current logistics status of your Viha package.
            </p>
          </div>

          <form onSubmit={handleTrackSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Order ID (e.g., VH-89241)"
              value={trackInput}
              onChange={(e) => {
                setTrackInput(e.target.value);
                setTrackError('');
              }}
              className="w-full bg-black/30 border border-brand-gold/40 focus:outline-none focus:border-brand-gold text-brand-cream text-sm px-4 py-4 placeholder:text-brand-cream-dark/50 min-h-[52px]"
            />
            <button
              type="submit"
              className="w-full px-6 py-4 bg-brand-gold text-white hover:bg-amber-700 transition-colors text-xs font-bold uppercase tracking-widest border border-brand-gold cursor-pointer min-h-[52px]"
            >
              Track Order
            </button>
          </form>

          {trackError && (
            <div className="flex items-center gap-1.5 justify-center text-xs text-[#ff9a96] bg-black/10 p-2 border border-brand-maroon rounded-xs">
              <AlertCircle size={14} />
              <span>{trackError}</span>
            </div>
          )}

          <div className="pt-1 text-[10px] text-brand-cream-dark/60 flex flex-wrap items-center justify-center gap-2">
            <span>Try: <code className="bg-black/20 px-1.5 py-0.5 rounded text-white font-mono text-[9px]">VH-89241</code></span>
            <span>or</span>
            <code className="bg-black/20 px-1.5 py-0.5 rounded text-white font-mono text-[9px]">VIHA-12345</code>
          </div>
        </div>
      </section>

    </div>
  );
}
