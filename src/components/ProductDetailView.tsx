import React, { useState } from 'react';
import { ShoppingBag, ArrowRight, Star, Heart, ShieldAlert, Check, User } from 'lucide-react';
import { Product } from '../types';
import { REGIONS } from '../data';

interface ProductDetailViewProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onNavigate: (view: 'home' | 'shop' | 'cart' | 'checkout-info' | 'tracker' | 'account') => void;
  currentRegion: string;
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
}

export default function ProductDetailView({
  product,
  onAddToCart,
  onNavigate,
  currentRegion,
  wishlist,
  onToggleWishlist
}: ProductDetailViewProps) {
  const [successToast, setSuccessToast] = useState<string | null>(null);
  
  const activeRegionObj = REGIONS.find(r => r.id === currentRegion) || REGIONS[0];
  const isRestricted = product.restrictedRegions?.includes(currentRegion);
  const isWishlisted = wishlist.some(item => item.id === product.id);

  const formatPrice = (priceInINR: number) => {
    const converted = priceInINR * activeRegionObj.exchangeRate;
    if (activeRegionObj.id === 'IN') {
      return `₹${priceInINR.toLocaleString('en-IN')}`;
    }
    return `${activeRegionObj.symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
  };

  const triggerAddToCart = () => {
    onAddToCart(product);
    setSuccessToast(`"${product.name}" added to sacred basket!`);
    setTimeout(() => {
      setSuccessToast(null);
    }, 3000);
  };

  return (
    <div className="bg-brand-cream-dark/5 min-h-screen font-sans py-12">
      {successToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-brand-maroon border border-brand-gold text-brand-cream py-3.5 px-6 rounded-xs shadow-xl flex items-center justify-between gap-3 text-xs uppercase tracking-wider font-semibold animate-slide-up">
          <Check size={16} className="text-brand-gold" />
          <span>{successToast}</span>
          <button 
            onClick={() => onNavigate('cart')}
            className="ml-3 hover:underline text-brand-gold font-bold flex items-center gap-1 text-[11px]"
          >
            Go to checkout <ArrowRight size={12} />
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Breadcrumb */}
        <div className="text-[10px] text-brand-charcoal/60 uppercase tracking-widest font-semibold">
          <span className="cursor-pointer hover:text-brand-maroon" onClick={() => onNavigate('home')}>Home</span>
          <span className="mx-2">/</span>
          <span className="cursor-pointer hover:text-brand-maroon" onClick={() => onNavigate('shop')}>Shop</span>
          <span className="mx-2">/</span>
          <span className="text-brand-maroon">{product.name}</span>
        </div>

        {/* Top Split Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Sticky Image */}
          <div className="relative aspect-[4/5] bg-brand-cream border border-brand-cream-dark rounded-xs p-6 shadow-sm flex items-center justify-center sticky top-24 self-start">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full h-full object-contain mix-blend-multiply" 
            />
            {isRestricted && (
              <span className="absolute top-4 left-4 bg-[#4d1012] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-sm border border-red-500/30 flex items-center gap-1.5 shadow-md">
                <ShieldAlert size={14} className="text-red-400" /> Border Blocked
              </span>
            )}
          </div>

          {/* Right: Product Details */}
          <div className="flex flex-col space-y-8 pt-4">
            <div className="space-y-4">
              <span className="text-xs text-brand-gold uppercase tracking-widest font-bold">
                {product.vendor || product.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-serif text-brand-maroon font-bold leading-tight" style={{ fontFamily: 'Libre Caslon Text, serif' }}>
                {product.name}
              </h1>
              
              <div className="flex items-center gap-4 text-sm font-semibold">
                <div className="text-2xl text-brand-charcoal">
                  {formatPrice(product.price)}
                </div>
                {product.rating && (
                  <div className="flex items-center gap-1.5 text-brand-gold bg-brand-cream-dark/20 px-3 py-1 rounded-sm text-xs border border-brand-gold/20">
                    <Star size={14} className="fill-brand-gold" />
                    <span className="text-brand-maroon font-bold">{product.rating}</span>
                    {product.reviewsCount && (
                      <span className="text-brand-charcoal/60 ml-1">({product.reviewsCount} reviews)</span>
                    )}
                  </div>
                )}
              </div>
            </div>

            <p className="text-sm text-brand-charcoal/80 leading-relaxed">
              {product.description}
            </p>

            <div className="space-y-3 pt-4 border-t border-brand-cream-dark text-xs text-brand-charcoal/70">
              {product.ingredientsOrMaterials && (
                <div className="grid grid-cols-3 gap-2">
                  <span className="font-bold text-brand-charcoal uppercase tracking-wider">Materials</span>
                  <span className="col-span-2">{product.ingredientsOrMaterials}</span>
                </div>
              )}
              {product.sizeOrDimensions && (
                <div className="grid grid-cols-3 gap-2">
                  <span className="font-bold text-brand-charcoal uppercase tracking-wider">Dimensions</span>
                  <span className="col-span-2">{product.sizeOrDimensions}</span>
                </div>
              )}
              {product.weight && (
                <div className="grid grid-cols-3 gap-2">
                  <span className="font-bold text-brand-charcoal uppercase tracking-wider">Weight</span>
                  <span className="col-span-2">{product.weight}</span>
                </div>
              )}
            </div>

            {isRestricted && (
              <div className="text-xs text-red-900 bg-red-100/60 border border-red-200 p-4 rounded-xs space-y-2">
                <p className="font-bold flex items-center gap-1.5">
                  <ShieldAlert size={16} className="text-red-700" />
                  Delivery Restriction
                </p>
                <p className="text-red-800/80 leading-relaxed">
                  This item is restricted in {activeRegionObj.name} due to international quarantine rules.
                  {product.customsNote && <span className="block mt-1 font-semibold">Note: {product.customsNote}</span>}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-brand-cream-dark">
              <button
                disabled={isRestricted}
                onClick={triggerAddToCart}
                className={`flex-1 py-4 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer transition-colors border border-brand-maroon ${
                  isRestricted 
                    ? 'bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed opacity-60' 
                    : 'bg-brand-maroon hover:bg-brand-maroon-dark shadow-md'
                }`}
              >
                <ShoppingBag size={16} /> {isRestricted ? 'Restricted' : 'Add to Basket'}
              </button>
              
              <button
                onClick={() => onToggleWishlist(product)}
                className={`px-6 py-4 border hover:bg-brand-cream text-brand-maroon rounded-xs flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  isWishlisted ? 'border-brand-maroon bg-brand-cream' : 'border-brand-cream-dark bg-brand-paper'
                }`}
              >
                <Heart size={16} className={isWishlisted ? "fill-brand-maroon" : ""} />
                <span className="hidden sm:inline">
                  {isWishlisted ? "Saved" : "Save"}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Rich Description Sections */}
        {product.richDescription && product.richDescription.length > 0 && (
          <div className="pt-16 border-t border-brand-cream-dark/50">
            <h3 className="text-2xl font-serif text-brand-maroon font-black mb-10 text-center" style={{ fontFamily: 'Libre Caslon Text, serif' }}>
              Discover the Mystical Power
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
              {product.richDescription.map((section, idx) => (
                <div key={idx} className="space-y-3">
                  <h4 className="text-base font-serif font-semibold text-brand-maroon flex items-start gap-2" style={{ fontFamily: 'Libre Caslon Text, serif' }}>
                    <span className="text-brand-gold mt-1">•</span> {section.title}
                  </h4>
                  <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews Section */}
        {product.reviews && product.reviews.length > 0 && (
          <div className="pt-16 border-t border-brand-cream-dark/50">
            <h3 className="text-2xl font-serif text-brand-maroon font-black mb-10 text-center" style={{ fontFamily: 'Libre Caslon Text, serif' }}>
              Customer Reviews
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Review Stats */}
              <div className="lg:col-span-4 bg-brand-paper p-8 border border-brand-cream-dark rounded-xs h-fit sticky top-24">
                <div className="text-center space-y-2 pb-6 border-b border-brand-cream-dark">
                  <div className="text-5xl font-bold text-brand-maroon">{product.rating}</div>
                  <div className="flex justify-center text-brand-gold gap-0.5">
                    {[1,2,3,4,5].map(star => (
                      <Star key={star} size={18} className={(product.rating || 0) >= star ? "fill-brand-gold" : "opacity-30"} />
                    ))}
                  </div>
                  <p className="text-xs text-brand-charcoal/60 uppercase tracking-widest font-semibold pt-1">
                    Based on {product.reviewsCount} reviews
                  </p>
                </div>

                <div className="space-y-3 pt-6">
                  {[5,4,3,2,1].map(star => {
                    const count = product.reviewBreakdown?.[star] || 0;
                    const max = product.reviewsCount || 1;
                    const percentage = (count / max) * 100;
                    
                    return (
                      <div key={star} className="flex items-center gap-3 text-xs font-semibold text-brand-charcoal">
                        <span className="w-4">{star}</span>
                        <Star size={12} className="text-brand-gold fill-brand-gold" />
                        <div className="flex-1 h-1.5 bg-brand-cream-dark/30 rounded-full overflow-hidden">
                          <div className="h-full bg-brand-gold" style={{ width: `${percentage}%` }}></div>
                        </div>
                        <span className="w-6 text-right text-brand-charcoal/60">{count}</span>
                      </div>
                    );
                  })}
                </div>
                
                <button type="button" className="w-full mt-8 py-3 bg-white text-brand-maroon border border-brand-maroon text-xs font-bold uppercase tracking-widest hover:bg-brand-maroon hover:text-white transition-colors cursor-pointer">
                  Write a review
                </button>
              </div>

              {/* Review List */}
              <div className="lg:col-span-8 space-y-8">
                <div className="text-xs uppercase tracking-widest text-brand-charcoal/50 font-bold border-b border-brand-cream-dark pb-3">
                  Most Recent
                </div>
                {product.reviews.map(review => (
                  <div key={review.id} className="space-y-4 pb-8 border-b border-brand-cream-dark/50 last:border-0">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-brand-maroon/10 text-brand-maroon flex items-center justify-center font-serif font-bold">
                            {review.author.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <span className="font-bold text-sm text-brand-charcoal block">{review.author}</span>
                            {review.verified && (
                              <span className="text-[10px] text-[#4d8b55] flex items-center gap-1 font-semibold uppercase tracking-wider">
                                <Check size={10} /> Verified Buyer
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-brand-charcoal/50 font-medium">{review.date}</span>
                    </div>
                    
                    <div className="flex gap-0.5 text-brand-gold">
                      {[1,2,3,4,5].map(star => (
                        <Star key={star} size={12} className={review.rating >= star ? "fill-brand-gold" : "opacity-30"} />
                      ))}
                    </div>

                    <p className="text-sm text-brand-charcoal/80 leading-relaxed whitespace-pre-line">
                      {review.content}
                    </p>

                    {review.replies && review.replies.map((reply, i) => (
                      <div key={i} className="mt-4 ml-6 p-4 bg-brand-cream border-l-2 border-brand-gold rounded-r-xs space-y-2">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-brand-maroon flex items-center gap-1.5">
                          <User size={12} /> {reply.author} replied:
                        </span>
                        <p className="text-sm text-brand-charcoal/90 leading-relaxed italic">
                          {reply.content}
                        </p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
