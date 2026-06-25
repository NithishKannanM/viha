import React, { useState } from 'react';
import { ArrowRight, Search, Truck, AlertCircle } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data';
interface HomeViewProps {
  onNavigate: (view: 'home' | 'shop' | 'cart' | 'checkout-info' | 'tracker') => void;
  onSelectCategory: (category: string) => void;
  onTrackOrder: (orderId: string) => void;
  onViewProduct: (product: Product) => void;
}

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
      <section className="relative overflow-hidden w-full h-[520px] md:h-[620px] bg-brand-maroon flex items-center">
        {/* Artistic background blur photo representing spiritual lamps */}
        <div 
          className="absolute inset-0 bg-cover bg-center brightness-[0.45] saturate-100"
          style={{ 
            backgroundImage: 'url("/images/hero_banner.png")' 
          }}
        />
        
        {/* Gold geometrical lines or mandala overlay */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-brand-maroon/70 pointer-events-none opacity-60" />
        
        <div className="relative max-w-7xl mx-auto w-full px-6 md:px-12 text-center md:text-left z-10 flex flex-col justify-center">
          <span className="text-xs uppercase tracking-widest text-brand-gold font-bold mb-3 block">
            PREMIUM SPIRITUAL LIFESTYLE
          </span>
          
          <h2 className="text-4xl md:text-6xl text-brand-cream/95 font-serif font-black tracking-tight leading-tight max-w-3xl mb-4" style={{ fontFamily: 'Libre Caslon Text, Playfair Display, serif' }}>
            Tradition Delivered To Your Doorstep
          </h2>
          
          <p className="text-sm md:text-base text-brand-cream-dark max-w-xl mb-8 leading-relaxed font-sans">
            Discover authentic pooja essentials, traditional clothing, and ayurvedic wellness products carefully curated for your sacred spaces.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            <button 
              onClick={() => {
                onSelectCategory('all');
                onNavigate('shop');
              }}
              className="w-full sm:w-auto px-8 py-3.5 bg-brand-maroon text-white text-xs font-bold uppercase tracking-widest rounded-xs hover:bg-brand-maroon-dark transition-colors border border-brand-maroon shadow-md"
            >
              Shop Collection
            </button>
            <button 
              onClick={() => {
                onSelectCategory('ayurveda-herbal');
                onNavigate('shop');
              }}
              className="w-full sm:w-auto px-8 py-3.5 bg-transparent text-white text-xs font-bold uppercase tracking-widest rounded-xs hover:bg-white/10 transition-all border border-white/50"
            >
              Explore Ayurveda
            </button>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="bg-brand-maroon/95 py-5 px-6 md:px-12 border-y border-brand-gold/20">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-2 text-center">
          <h4 className="text-sm md:text-base font-serif font-bold text-brand-cream tracking-tight" style={{ fontFamily: 'Libre Caslon Text, serif' }}>
            1,00,000+ Customers Trust Viha
          </h4>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[10px] md:text-[11px] text-brand-cream-dark/80 uppercase tracking-widest font-semibold">
            <span className="flex items-center gap-1.5">✦ Authentic Spiritual Products</span>
            <span className="flex items-center gap-1.5">✦ Secure Payments</span>
            <span className="flex items-center gap-1.5">✦ International Delivery</span>
            <span className="flex items-center gap-1.5">✦ Quality Assured</span>
          </div>
        </div>
      </section>

      {/* 2. Shop By Purpose Section */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3.5xl font-serif text-brand-maroon font-black" style={{ fontFamily: 'Libre Caslon Text, serif' }}>
            Shop By Purpose
          </h3>
          <div className="w-16 h-[1.5px] bg-brand-gold mx-auto mt-3"></div>
        </div>

        {/* Dynamic customized grid matching screenshot 1 precisely */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Large Column (Daily Pooja) */}
          <div 
            onClick={() => {
              onSelectCategory('spiritual-pooja');
              onNavigate('shop');
            }}
            className="lg:col-span-6 relative h-[360px] lg:h-[480px] bg-brand-maroon text-white overflow-hidden rounded-xs border border-brand-cream-dark shadow-sm group cursor-pointer"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center brightness-[0.7] group-hover:scale-105 transition-transform duration-700"
              style={{ backgroundImage: 'url("/images/daily_pooja.png")' }}
            />
            {/* Soft gold vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[10px] uppercase font-bold tracking-widest text-brand-gold bg-brand-maroon/80 px-2 py-1 rounded-sm inline-block mb-3">
                Daily Rituals
              </span>
              <h4 className="text-xl md:text-2xl font-serif text-brand-cream/95 font-semibold" style={{ fontFamily: 'Libre Caslon Text, serif' }}>
                Daily Pooja
              </h4>
              <p className="text-xs text-brand-cream-dark/90 mt-1 max-w-md">
                Elevate your daily rituals with pure ingredients, authentic oil lamps, and hand-milled powders.
              </p>
            </div>
          </div>

          {/* Right Combined Column */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            
            {/* Top Row: Two Squares */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Festival Essentials */}
              <div 
                onClick={() => {
                  onSelectCategory('new-arrivals');
                  onNavigate('shop');
                }}
                className="relative h-[220px] bg-brand-maroon text-white overflow-hidden rounded-xs border border-brand-cream-dark shadow-sm group cursor-pointer"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center brightness-[0.7] group-hover:scale-105 transition-transform duration-700"
                  style={{ backgroundImage: 'url("/images/festival_essentials.png")' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h4 className="text-sm font-serif font-semibold text-brand-cream/95 tracking-wide uppercase" style={{ fontFamily: 'Libre Caslon Text, serif' }}>
                    Festival Essentials
                  </h4>
                  <p className="text-[10px] text-brand-cream-dark/80 mt-0.5">Lamps, ghee, and colorful dusts.</p>
                </div>
              </div>

              {/* Ayurvedic Wellness */}
              <div 
                onClick={() => {
                  onSelectCategory('ayurveda-herbal');
                  onNavigate('shop');
                }}
                className="relative h-[220px] bg-brand-maroon text-white overflow-hidden rounded-xs border border-brand-cream-dark shadow-sm group cursor-pointer"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center brightness-[0.7] group-hover:scale-105 transition-transform duration-700"
                  style={{ backgroundImage: 'url("/images/ayurveda_wellness.png")' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h4 className="text-sm font-serif font-semibold text-brand-cream/95 tracking-wide uppercase" style={{ fontFamily: 'Libre Caslon Text, serif' }}>
                    Ayurvedic Wellness
                  </h4>
                  <p className="text-[10px] text-brand-cream-dark/80 mt-0.5">Herbs and skin oils made to formula.</p>
                </div>
              </div>
            </div>

            {/* Bottom Row: Wide Rectangle (Housewarming Gifts) */}
            <div 
              onClick={() => {
                onSelectCategory('home-living');
                onNavigate('shop');
              }}
              className="relative h-[236px] bg-brand-maroon text-white overflow-hidden rounded-xs border border-brand-cream-dark shadow-sm group cursor-pointer"
            >
              <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2">
                <div className="bg-brand-paper hover:bg-brand-cream-dark/30 p-6 md:p-8 flex flex-col justify-center text-brand-charcoal">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-brand-gold mb-2 block">
                    SACRED NEW BEGINNINGS
                  </span>
                  <h4 className="text-lg font-serif font-semibold text-brand-maroon" style={{ fontFamily: 'Libre Caslon Text, serif' }}>
                    Housewarming Gifts
                  </h4>
                  <p className="text-xs text-brand-charcoal/70 mt-2 leading-relaxed max-w-sm">
                    Thoughtful traditional gifts, hand-cast brass Ganeshas, and elegant box configurations for starting new chapters.
                  </p>
                </div>
                <div 
                  className="brightness-[0.8] relative h-full bg-cover bg-center"
                  style={{ backgroundImage: 'url("/images/housewarming_gifts.png")' }}
                />
              </div>
              <div className="absolute inset-y-0 left-12 w-0.5 bg-brand-gold h-full pointer-events-none hidden md:block" />
            </div>

          </div>
        </div>
      </section>

      {/* 2.5 Bestselling Items Section */}
      <section className="py-16 bg-brand-paper border-t border-brand-cream-dark px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3.5xl font-serif text-brand-maroon font-black" style={{ fontFamily: 'Libre Caslon Text, serif' }}>
              Bestselling Items
            </h3>
            <div className="w-16 h-[1.5px] bg-brand-gold mx-auto mt-3"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellers.map((product) => (
              <div 
                key={product.id}
                onClick={() => onViewProduct(product)}
                className="bg-brand-cream border border-brand-cream-dark rounded-xs overflow-hidden cursor-pointer group hover:shadow-md transition-all flex flex-col"
              >
                <div className="aspect-[4/3] overflow-hidden relative bg-brand-cream flex items-center justify-center">
                  <img src={product.imageUrl} alt={product.name} className="w-full h-full object-contain mix-blend-multiply p-2 group-hover:scale-105 transition-transform duration-500" />
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
          
          <div className="mt-10 text-center">
            <button 
              onClick={() => {
                onSelectCategory('all');
                onNavigate('shop');
              }}
              className="px-8 py-3 bg-brand-maroon text-white text-xs font-bold uppercase tracking-widest hover:bg-brand-maroon-dark transition-colors border border-brand-maroon shadow-md cursor-pointer"
            >
              Shop All Best Sellers
            </button>
          </div>
        </div>
      </section>

      {/* 3. Curated Collections Section */}
      <section className="py-16 bg-brand-cream border-t border-b border-brand-cream-dark px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h3 className="text-2xl md:text-3.5xl font-serif text-brand-maroon font-black" style={{ fontFamily: 'Libre Caslon Text, serif' }}>
                Curated Collections
              </h3>
              <div className="w-12 h-[1.5px] bg-brand-gold mt-2"></div>
            </div>
            
            <button 
              onClick={() => {
                onSelectCategory('all');
                onNavigate('shop');
              }}
              className="text-brand-maroon hover:text-brand-gold transition-colors text-xs font-semibold uppercase tracking-widest flex items-center gap-1.5"
            >
              View All <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pooja Products */}
            <div 
              onClick={() => {
                onSelectCategory('spiritual-pooja');
                onNavigate('shop');
              }}
              className="group cursor-pointer"
            >
              <div className="aspect-[3/4] overflow-hidden bg-brand-paper border border-brand-cream-dark rounded-xs p-3 transition-shadow hover:shadow-md">
                <img 
                  src="/images/hero_banner.png" 
                  alt="Pooja Products" 
                  className="w-full h-full object-cover rounded-xs brightness-[0.95] group-hover:scale-102 transition-transform duration-500"
                />
              </div>
              <h4 className="text-center font-serif text-sm font-semibold text-brand-maroon mt-4 group-hover:text-brand-gold transition-colors" style={{ fontFamily: 'Libre Caslon Text, serif' }}>
                Pooja Products
              </h4>
            </div>

            {/* Sacred Jewelry */}
            <div 
              onClick={() => {
                onSelectCategory('jewellery-fashion');
                onNavigate('shop');
              }}
              className="group cursor-pointer"
            >
              <div className="aspect-[3/4] overflow-hidden bg-brand-paper border border-brand-cream-dark rounded-xs p-3 transition-shadow hover:shadow-md">
                <img 
                  src="/images/sacred_jewelry.png" 
                  alt="Sacred Jewelry" 
                  className="w-full h-full object-cover rounded-xs brightness-[0.95] group-hover:scale-102 transition-transform duration-500"
                />
              </div>
              <h4 className="text-center font-serif text-sm font-semibold text-brand-maroon mt-4 group-hover:text-brand-gold transition-colors" style={{ fontFamily: 'Libre Caslon Text, serif' }}>
                Sacred Jewelry
              </h4>
            </div>

            {/* Traditional Clothing */}
            <div 
              onClick={() => {
                onSelectCategory('jewellery-fashion');
                onNavigate('shop');
              }}
              className="group cursor-pointer"
            >
              <div className="aspect-[3/4] overflow-hidden bg-brand-paper border border-brand-cream-dark rounded-xs p-3 transition-shadow hover:shadow-md">
                <img 
                  src="/images/traditional_clothing.png" 
                  alt="Traditional Clothing" 
                  className="w-full h-full object-cover rounded-xs brightness-[0.95] group-hover:scale-102 transition-transform duration-500"
                />
              </div>
              <h4 className="text-center font-serif text-sm font-semibold text-brand-maroon mt-4 group-hover:text-brand-gold transition-colors" style={{ fontFamily: 'Libre Caslon Text, serif' }}>
                Traditional Clothing
              </h4>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Heritage Introduction Section (Founder) */}
      <section className="py-20 px-6 md:px-12 bg-brand-paper">
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
      <section id="tracker" className="py-16 bg-brand-maroon text-brand-cream border-t border-brand-cream-dark px-6 md:px-12 text-center relative overflow-hidden">
        {/* Fine gold lines ornament */}
        <div className="absolute inset-0 bg-[radial-gradient(#B8893D_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />

        <div className="max-w-xl mx-auto space-y-6 relative z-10">
          <div className="flex justify-center flex-col items-center">
            <Truck size={36} className="text-brand-gold mb-3" />
            <h3 className="text-xl md:text-2xl font-serif text-brand-cream font-bold" style={{ fontFamily: 'Libre Caslon Text, serif' }}>
              Track Your Spiritual Journey
            </h3>
            <p className="text-xs text-brand-cream-dark opacity-90 max-w-md mt-2 leading-relaxed">
              Enter your order ID to see the current logistics status of your Viha package.
            </p>
          </div>

          <form onSubmit={handleTrackSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Order ID (e.g., VH-89241)"
              value={trackInput}
              onChange={(e) => {
                setTrackInput(e.target.value);
                setTrackError('');
              }}
              className="flex-1 bg-black/30 border border-brand-gold/40 focus:outline-none focus:border-brand-gold text-brand-cream text-xs px-4 py-3 placeholder:text-brand-cream-dark/50"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-brand-gold text-white hover:bg-amber-700 transition-colors text-xs font-bold uppercase tracking-widest border border-brand-gold"
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

          <div className="pt-2 text-[10px] text-brand-cream-dark/60 flex items-center justify-center gap-3">
            <span>Try sample order ID: <code className="bg-black/20 px-1.5 py-0.5 rounded text-white font-mono text-[9px]">VH-89241</code></span>
            <span>or</span>
            <span><code className="bg-black/20 px-1.5 py-0.5 rounded text-white font-mono text-[9px]">VIHA-12345</code></span>
          </div>
        </div>
      </section>

    </div>
  );
}
