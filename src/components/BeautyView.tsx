import React, { useState } from 'react';
import {
  ArrowRight, Leaf, Droplets, Sparkles, Star, Mail, Clock, Sun,
  Heart, ChevronRight, Moon, Wind
} from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data';

type NavigateTarget = 'home' | 'shop' | 'cart' | 'checkout-info' | 'tracker' | 'account' | 'product' | 'beauty';

interface BeautyViewProps {
  onNavigate: (view: NavigateTarget) => void;
  onSelectCategory: (category: string) => void;
  onAddToCart: (product: Product) => void;
  onViewProduct: (product: Product) => void;
}

const SectionOrnament = () => (
  <div className="flex items-center justify-center gap-2 mt-4">
    <div className="h-px w-10 bg-gradient-to-r from-transparent to-brand-gold/50" />
    <div className="w-1.5 h-1.5 rotate-45 bg-brand-gold/75 shrink-0" />
    <div className="h-px w-10 bg-gradient-to-l from-transparent to-brand-gold/50" />
  </div>
);

const getCategorySlug = (cat: string) =>
  cat.toLowerCase().replace(/ & /g, '-').replace(/ \/ /g, '-').replace(/ /g, '-');

const CONCERNS = [
  { icon: Droplets, label: 'Dry Skin', count: '6 products' },
  { icon: Sparkles, label: 'Radiant Glow', count: '5 products' },
  { icon: Leaf, label: 'Acne & Blemishes', count: '7 products' },
  { icon: Clock, label: 'Anti-Aging', count: '4 products' },
  { icon: Sun, label: 'Oily Skin', count: '5 products' },
  { icon: Heart, label: 'Sensitive Skin', count: '6 products' },
  { icon: Moon, label: 'Night Repair', count: '3 products' },
  { icon: Wind, label: 'Scalp Health', count: '4 products' },
];

const COLLECTIONS = [
  {
    label: 'Handmade Soaps',
    desc: 'Cold-process herbal soaps with sacred botanicals for a gentle, ritual cleanse.',
    image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?q=80&w=800',
    count: '6 soaps',
  },
  {
    label: 'Ayurvedic Oils',
    desc: 'Time-extracted blends from seeds, flowers, and roots for face, scalp, and body.',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=800',
    count: '5 oils',
  },
  {
    label: 'Natural Perfumes',
    desc: 'Alcohol-free attars and roll-ons distilled from pure floral and resinous sources.',
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=800',
    count: '4 attars',
  },
];

const RITUAL_STEPS = [
  {
    number: '01',
    title: 'Cleanse',
    description:
      'Begin with a handmade herbal soap — neem, red sandalwood, or tulsi. Let it draw impurities gently while preserving the skin\'s natural pH.',
  },
  {
    number: '02',
    title: 'Exfoliate',
    description:
      'Use the vetiver root scrub or ubtan paste twice a week to slough dead cells, stimulate circulation, and reveal fresh, bright skin.',
  },
  {
    number: '03',
    title: 'Nourish',
    description:
      'Apply two to three drops of Kumkumadi oil or your chosen Ayurvedic facial blend. Press into warm skin, never rub.',
  },
  {
    number: '04',
    title: 'Seal',
    description:
      'Finish with sandalwood or rose-based moisture cream to lock in actives. Fragrance becomes a closing breath of the ritual.',
  },
];

const INGREDIENTS = [
  {
    name: 'Kumkumadi',
    subtitle: 'Liquid Gold',
    benefit: 'Brightens complexion, reduces pigmentation, promotes cellular renewal with saffron and sesame base.',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=600',
  },
  {
    name: 'Neem',
    subtitle: "Nature's Antibiotic",
    benefit: 'Purifies skin, combats acne-causing bacteria, soothes redness and surface irritation.',
    image: 'https://images.unsplash.com/photo-1629476077596-a1b54d2d0bba?q=80&w=600',
  },
  {
    name: 'Turmeric',
    subtitle: 'Golden Healer',
    benefit: 'Anti-inflammatory powerhouse — reduces dark spots, evens tone, and accelerates healing.',
    image: 'https://images.unsplash.com/photo-1567087953030-5e4e07b2d9d2?q=80&w=600',
  },
  {
    name: 'Red Sandalwood',
    subtitle: 'Sacred Coolant',
    benefit: 'Cooling, astringent, antibacterial — calms pitta and brings evenness to oily complexions.',
    image: 'https://images.unsplash.com/photo-1574273489895-5a7fef0c8e37?q=80&w=600',
  },
  {
    name: 'Vetiver',
    subtitle: 'Root of Calm',
    benefit: 'Detoxifying, grounding and cooling — exfoliates skin while delivering earthy aromatherapy.',
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?q=80&w=600',
  },
];

const REVIEWS = [
  {
    author: 'Priya Venkataraman',
    location: 'Chennai',
    rating: 5,
    product: 'Handmade Red Sandalwood Soap',
    content:
      'The sandalwood soap is pure luxury. The fragrance lingers gently and my skin feels smooth without feeling stripped. I\'ve ordered four bars now.',
  },
  {
    author: 'Meera Krishnamurthy',
    location: 'Bengaluru',
    rating: 5,
    product: 'Heritage Vetiver Bath Scrub',
    content:
      'This scrub is the real thing — I\'ve tried so many branded versions and nothing compares. The earthy vetiver scent is completely grounding.',
  },
  {
    author: 'Ananya Subramaniam',
    location: 'Mumbai',
    rating: 5,
    product: 'Divine Jasmine Attar',
    content:
      'Alcohol-free, long-lasting, and smells exactly like fresh jasmine garlands. Not sweet, not artificial. This is what attar should be.',
  },
];

const JOURNAL_ARTICLES = [
  {
    tag: 'Skincare Ritual',
    title: 'The Ancient Science of Kumkumadi',
    excerpt:
      'Saffron-infused oils have graced royal beauty rituals for over two thousand years. We trace the lineage of India\'s most precious beauty elixir.',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1601001435957-74f8c7e65db3?q=80&w=800',
  },
  {
    tag: 'Ayurveda',
    title: 'Understanding Your Prakriti',
    excerpt:
      'Vata, Pitta, or Kapha — your Ayurvedic constitution governs your skin type and which ingredients will genuinely work for you.',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=800',
  },
  {
    tag: 'Ingredients',
    title: 'Five Morning Rituals for Luminous Skin',
    excerpt:
      'From oil pulling to Abhyanga self-massage, these Ayurvedic morning practices build radiance from the inside out — no serums required.',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800',
  },
];

export default function BeautyView({
  onNavigate,
  onSelectCategory,
  onAddToCart,
  onViewProduct,
}: BeautyViewProps) {
  const [email, setEmail] = useState('');
  const [newsletterDone, setNewsletterDone] = useState(false);
  const [addedId, setAddedId] = useState<string | null>(null);

  const beautyProducts = PRODUCTS.filter(
    (p) => getCategorySlug(p.category) === 'ayurveda-herbal'
  );

  const goToBeautyShop = () => {
    onSelectCategory('ayurveda-herbal');
    onNavigate('shop');
  };

  const handleAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  return (
    <div className="bg-brand-cream font-sans animate-fade-in">

      {/* ─────────────────────────────────────────────────────
          1. HERO BANNER
      ───────────────────────────────────────────────────── */}
      <section className="relative w-full min-h-[460px] h-[520px] md:h-[700px] bg-brand-maroon-dark flex items-end md:items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=1920")',
            filter: 'brightness(0.38)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="absolute top-6 left-6 md:left-12 z-10 flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-brand-cream/50 font-semibold"
        >
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-brand-gold transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-brand-gold">Beauty &amp; Wellness</span>
        </nav>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-6 md:px-12 pb-16 md:pb-0">
          <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-brand-gold font-bold mb-3 md:mb-4">
            VIHA BEAUTY &amp; WELLNESS
          </span>
          <h1
            className="text-3xl sm:text-5xl md:text-7xl text-brand-cream font-serif font-black tracking-tight leading-[1.05] max-w-4xl mb-4 md:mb-5"
            style={{ fontFamily: 'Libre Caslon Text, serif' }}
          >
            Ancestral Beauty,<br className="hidden md:block" /> Timeless Ritual.
          </h1>
          <p className="text-[13px] sm:text-sm md:text-base text-brand-cream/70 max-w-xl mb-6 md:mb-8 leading-relaxed">
            Plant-based formulations rooted in five thousand years of Ayurvedic wisdom.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={goToBeautyShop}
              className="w-full sm:w-auto px-8 py-4 sm:py-3.5 bg-brand-maroon hover:bg-brand-maroon-dark text-white text-[11px] font-bold uppercase tracking-widest transition-colors cursor-pointer min-h-[50px] sm:min-h-[44px]"
            >
              Explore Collection
            </button>
            <button
              onClick={() => {
                document.getElementById('beauty-journal')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-4 sm:py-3.5 bg-transparent hover:bg-white/10 text-white text-[11px] font-bold uppercase tracking-widest transition-all border border-white/40 cursor-pointer min-h-[50px] sm:min-h-[44px]"
            >
              Beauty Journal
            </button>
          </div>
        </div>

        {/* Trust strip at bottom of hero */}
        <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/10 bg-black/40 backdrop-blur-sm py-3 overflow-hidden">
          {/* Mobile: scroll */}
          <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide px-5 md:hidden">
            {['100% Natural', 'No Parabens', 'Cruelty Free', 'Ayurvedic'].map((t) => (
              <span key={t} className="flex-shrink-0 text-[9px] uppercase tracking-widest text-brand-cream/60 font-semibold whitespace-nowrap">{t}</span>
            ))}
          </div>
          {/* Desktop: flex wrap */}
          <div className="hidden md:flex max-w-7xl mx-auto px-12 items-center justify-center gap-10 text-[10px] uppercase tracking-widest text-brand-cream/60 font-semibold">
            <span>100% Natural Ingredients</span>
            <span className="text-brand-gold/40">|</span>
            <span>No Parabens or SLS</span>
            <span className="text-brand-gold/40">|</span>
            <span>Cruelty Free</span>
            <span className="text-brand-gold/40">|</span>
            <span>Ayurvedic Formulations</span>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────
          2. SHOP BY CONCERN
      ───────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 px-6 md:px-12 bg-brand-cream">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="block text-[10px] uppercase tracking-widest text-brand-gold font-bold mb-3">
              PERSONALISED CARE
            </span>
            <h2
              className="text-3xl md:text-4xl font-serif text-brand-maroon font-black"
              style={{ fontFamily: 'Libre Caslon Text, serif' }}
            >
              Shop by Concern
            </h2>
            <SectionOrnament />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {CONCERNS.map((concern) => {
              const Icon = concern.icon;
              return (
                <button
                  key={concern.label}
                  onClick={goToBeautyShop}
                  className="group flex flex-col items-center gap-3 p-4 bg-brand-paper border border-brand-cream-dark hover:border-brand-maroon hover:shadow-md transition-all text-center cursor-pointer rounded-xs"
                >
                  <div className="w-11 h-11 rounded-full bg-brand-maroon/8 flex items-center justify-center text-brand-maroon group-hover:bg-brand-maroon group-hover:text-white transition-all">
                    <Icon size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-brand-charcoal group-hover:text-brand-maroon transition-colors leading-tight">
                      {concern.label}
                    </p>
                    <p className="text-[9px] text-brand-muted mt-0.5">{concern.count}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────
          3. FEATURED COLLECTIONS
      ───────────────────────────────────────────────────── */}
      <section className="py-12 md:py-20 bg-brand-section-alt border-t border-brand-cream-dark">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12 px-5 sm:px-6 md:px-12">
            <span className="block text-[10px] uppercase tracking-widest text-brand-gold font-bold mb-3">
              CURATED FOR YOU
            </span>
            <h2
              className="text-2xl md:text-4xl font-serif text-brand-maroon font-black"
              style={{ fontFamily: 'Libre Caslon Text, serif' }}
            >
              Featured Collections
            </h2>
            <SectionOrnament />
          </div>

          {/* Mobile: horizontal scroll */}
          <div className="flex gap-4 overflow-x-auto scrollbar-hide touch-scroll snap-x snap-mandatory pb-4 px-5 sm:px-6 md:hidden">
            {COLLECTIONS.map((col) => (
              <div
                key={col.label}
                onClick={goToBeautyShop}
                className="flex-shrink-0 w-[68vw] max-w-[220px] snap-start group cursor-pointer"
              >
                <div className="aspect-[3/4] overflow-hidden bg-brand-paper border border-brand-cream-dark rounded-sm relative">
                  <img
                    src={col.image}
                    alt={col.label}
                    className="w-full h-full object-cover brightness-90"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-brand-paper/90 text-[9px] font-bold uppercase tracking-widest text-brand-gold px-2 py-1">
                    {col.count}
                  </span>
                </div>
                <div className="pt-3 space-y-1">
                  <h3 className="font-serif font-semibold text-brand-maroon text-sm" style={{ fontFamily: 'Libre Caslon Text, serif' }}>
                    {col.label}
                  </h3>
                  <p className="text-[10px] text-brand-muted leading-relaxed line-clamp-2">{col.desc}</p>
                  <span className="text-[10px] text-brand-maroon font-bold flex items-center gap-1">
                    Shop Now <ArrowRight size={10} />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: 3-col grid */}
          <div className="hidden md:grid grid-cols-3 gap-6 px-12">
            {COLLECTIONS.map((col) => (
              <div
                key={col.label}
                onClick={goToBeautyShop}
                className="group cursor-pointer"
              >
                <div className="aspect-[3/4] overflow-hidden bg-brand-paper border border-brand-cream-dark rounded-xs relative">
                  <img
                    src={col.image}
                    alt={col.label}
                    className="w-full h-full object-cover brightness-90 group-hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute top-4 left-4 bg-brand-paper/90 text-[10px] font-bold uppercase tracking-widest text-brand-gold px-2.5 py-1">
                    {col.count}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="pt-4 space-y-1.5">
                  <h3 className="font-serif font-semibold text-brand-maroon group-hover:text-brand-gold transition-colors" style={{ fontFamily: 'Libre Caslon Text, serif' }}>
                    {col.label}
                  </h3>
                  <p className="text-xs text-brand-muted leading-relaxed">{col.desc}</p>
                  <span className="text-[11px] text-brand-maroon font-bold flex items-center gap-1 mt-2 group-hover:gap-2 transition-all">
                    Shop Now <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────
          4. BEST SELLERS
      ───────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 px-6 md:px-12 bg-brand-paper border-t border-brand-cream-dark">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="block text-[10px] uppercase tracking-widest text-brand-gold font-bold mb-3">
                MOST LOVED
              </span>
              <h2
                className="text-3xl md:text-4xl font-serif text-brand-maroon font-black"
                style={{ fontFamily: 'Libre Caslon Text, serif' }}
              >
                Beauty Best Sellers
              </h2>
              <div className="flex items-center gap-2 mt-3">
                <div className="h-px w-8 bg-brand-gold/60" />
                <div className="w-1 h-1 rotate-45 bg-brand-gold/70 shrink-0" />
              </div>
            </div>
            <button
              onClick={goToBeautyShop}
              className="hidden sm:flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-brand-maroon hover:text-brand-gold transition-colors cursor-pointer"
            >
              View All <ArrowRight size={14} />
            </button>
          </div>

          {beautyProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
              {beautyProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => onViewProduct(product)}
                  className="bg-brand-cream border border-brand-cream-dark border-t-2 border-t-transparent hover:border-t-brand-gold rounded-sm overflow-hidden cursor-pointer group hover:shadow-md transition-all flex flex-col"
                >
                  <div className="aspect-square sm:aspect-[4/3] overflow-hidden bg-brand-cream flex items-center justify-center relative">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-contain mix-blend-multiply p-2 group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    {product.rating && product.rating >= 4.9 && (
                      <span className="absolute top-2 left-2 bg-brand-maroon text-brand-cream text-[8px] md:text-[9px] font-bold uppercase tracking-widest px-1.5 md:px-2 py-0.5">
                        Top Rated
                      </span>
                    )}
                  </div>
                  <div className="p-2.5 sm:p-3 md:p-4 flex flex-col items-center text-center flex-1 justify-between space-y-1.5 md:space-y-2">
                    <div>
                      <span className="text-[8px] md:text-[9px] text-brand-gold uppercase tracking-widest font-bold mb-0.5 block">
                        {product.subcategory || 'Ayurveda'}
                      </span>
                      <h4
                        className="text-[12px] md:text-sm font-serif font-semibold text-brand-maroon leading-tight line-clamp-2"
                        style={{ fontFamily: 'Libre Caslon Text, serif' }}
                      >
                        {product.name}
                      </h4>
                      {product.rating && (
                        <div className="flex items-center justify-center gap-0.5 mt-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              size={9}
                              className={
                                s <= Math.round(product.rating!)
                                  ? 'fill-brand-gold text-brand-gold'
                                  : 'text-brand-cream-dark'
                              }
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="w-full pt-2 border-t border-brand-cream-dark flex items-center justify-between">
                      <span className="text-[12px] md:text-sm font-semibold text-brand-maroon">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      <button
                        onClick={(e) => handleAdd(e, product)}
                        className={`px-2 sm:px-3 py-1.5 text-[8px] md:text-[9px] font-bold uppercase tracking-widest transition-colors cursor-pointer rounded-xs min-h-[28px] ${
                          addedId === product.id
                            ? 'bg-brand-gold text-white'
                            : 'bg-brand-maroon hover:bg-brand-maroon-dark text-white'
                        }`}
                      >
                        {addedId === product.id ? '✓' : 'Add'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-brand-cream border border-brand-cream-dark rounded-xs space-y-4">
              <p className="text-brand-charcoal/50 text-sm">Explore all Ayurveda &amp; Herbal products.</p>
              <button
                onClick={goToBeautyShop}
                className="mt-3 px-6 py-2.5 bg-brand-maroon text-white text-[11px] font-bold uppercase tracking-widest cursor-pointer hover:bg-brand-maroon-dark transition-colors"
              >
                Shop Beauty Products
              </button>
            </div>
          )}

          <div className="mt-10 text-center sm:hidden">
            <button
              onClick={goToBeautyShop}
              className="px-8 py-3 bg-brand-maroon text-white text-[11px] font-bold uppercase tracking-widest hover:bg-brand-maroon-dark transition-colors cursor-pointer"
            >
              View All Beauty Products
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────
          5. TRADITIONAL BEAUTY RITUAL
      ───────────────────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 bg-brand-maroon text-brand-cream relative overflow-hidden">
        {/* Subtle dot-grid texture */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(circle, #B8893D 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-14">
            <span className="block text-[10px] uppercase tracking-widest text-brand-gold font-bold mb-3">
              4-STEP PRACTICE
            </span>
            <h2
              className="text-3xl md:text-4xl font-serif text-brand-cream font-black"
              style={{ fontFamily: 'Libre Caslon Text, serif' }}
            >
              The Traditional Beauty Ritual
            </h2>
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-brand-gold/50" />
              <div className="w-1.5 h-1.5 rotate-45 bg-brand-gold/75 shrink-0" />
              <div className="h-px w-10 bg-gradient-to-l from-transparent to-brand-gold/50" />
            </div>
            <p className="mt-6 text-xs text-brand-cream/60 max-w-lg mx-auto leading-relaxed">
              Ayurvedic beauty is not a routine — it is a dialogue with your body. Each step
              responds to your skin's intelligence, not a standardised protocol.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {RITUAL_STEPS.map((step) => (
              <div key={step.number} className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-4xl font-black text-brand-gold/30 leading-none tabular-nums">
                    {step.number}
                  </span>
                  <div className="h-px flex-1 bg-brand-gold/20" />
                </div>
                <h3
                  className="text-lg font-serif font-semibold text-brand-cream"
                  style={{ fontFamily: 'Libre Caslon Text, serif' }}
                >
                  {step.title}
                </h3>
                <p className="text-xs text-brand-cream/65 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <button
              onClick={goToBeautyShop}
              className="px-10 py-3.5 border border-brand-gold/50 text-brand-gold hover:bg-brand-gold hover:text-white transition-all text-[11px] font-bold uppercase tracking-widest cursor-pointer"
            >
              Start Your Ritual
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────
          6. INGREDIENT SPOTLIGHT
      ───────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 px-6 md:px-12 bg-brand-cream border-t border-brand-cream-dark">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="block text-[10px] uppercase tracking-widest text-brand-gold font-bold mb-3">
              KNOW YOUR BOTANICALS
            </span>
            <h2
              className="text-3xl md:text-4xl font-serif text-brand-maroon font-black"
              style={{ fontFamily: 'Libre Caslon Text, serif' }}
            >
              Ingredient Spotlight
            </h2>
            <SectionOrnament />
            <p className="mt-5 text-xs text-brand-muted max-w-xl mx-auto leading-relaxed">
              We trace every ingredient to its classical Ayurvedic text, then to its source. This
              is not marketing — it is accountability.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {INGREDIENTS.map((ing) => (
              <div
                key={ing.name}
                className="group bg-brand-paper border border-brand-cream-dark rounded-xs overflow-hidden hover:shadow-md hover:border-brand-maroon/30 transition-all"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={ing.image}
                    alt={ing.name}
                    className="w-full h-full object-cover brightness-90 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <div>
                    <h3
                      className="text-sm font-serif font-bold text-brand-maroon"
                      style={{ fontFamily: 'Libre Caslon Text, serif' }}
                    >
                      {ing.name}
                    </h3>
                    <p className="text-[9px] uppercase tracking-widest text-brand-gold font-bold mt-0.5">
                      {ing.subtitle}
                    </p>
                  </div>
                  <p className="text-[11px] text-brand-muted leading-relaxed">{ing.benefit}</p>
                  <button
                    onClick={goToBeautyShop}
                    className="text-[10px] font-bold text-brand-maroon hover:text-brand-gold transition-colors uppercase tracking-widest flex items-center gap-0.5 mt-1 cursor-pointer"
                  >
                    See Products <ChevronRight size={10} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────
          7. CUSTOMER REVIEWS
      ───────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 px-6 md:px-12 bg-brand-section-alt border-t border-brand-cream-dark">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="block text-[10px] uppercase tracking-widest text-brand-gold font-bold mb-3">
              REAL RESULTS
            </span>
            <h2
              className="text-3xl md:text-4xl font-serif text-brand-maroon font-black"
              style={{ fontFamily: 'Libre Caslon Text, serif' }}
            >
              What Our Customers Say
            </h2>
            <SectionOrnament />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((review, idx) => (
              <div
                key={idx}
                className="bg-brand-paper border border-brand-cream-dark rounded-xs p-6 space-y-4 hover:shadow-md transition-shadow"
              >
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={13}
                      className={
                        s <= review.rating
                          ? 'fill-brand-gold text-brand-gold'
                          : 'text-brand-cream-dark'
                      }
                    />
                  ))}
                </div>
                <blockquote className="text-sm text-brand-charcoal/85 leading-relaxed italic border-l-2 border-brand-gold pl-4">
                  "{review.content}"
                </blockquote>
                <div className="pt-2 border-t border-brand-cream-dark">
                  <p className="text-xs font-bold text-brand-charcoal">{review.author}</p>
                  <p className="text-[10px] text-brand-muted mt-0.5">
                    {review.location} · Purchased:{' '}
                    <span className="text-brand-maroon font-semibold">{review.product}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={goToBeautyShop}
              className="px-8 py-3 bg-brand-maroon text-white text-[11px] font-bold uppercase tracking-widest hover:bg-brand-maroon-dark transition-colors cursor-pointer"
            >
              Shop Beauty Products
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────
          8. BEAUTY JOURNAL
      ───────────────────────────────────────────────────── */}
      <section
        id="beauty-journal"
        className="py-16 md:py-20 px-6 md:px-12 bg-brand-cream border-t border-brand-cream-dark"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="block text-[10px] uppercase tracking-widest text-brand-gold font-bold mb-3">
                EDUCATION &amp; RITUAL
              </span>
              <h2
                className="text-3xl md:text-4xl font-serif text-brand-maroon font-black"
                style={{ fontFamily: 'Libre Caslon Text, serif' }}
              >
                Beauty Journal
              </h2>
              <div className="flex items-center gap-2 mt-3">
                <div className="h-px w-8 bg-brand-gold/60" />
                <div className="w-1 h-1 rotate-45 bg-brand-gold/70 shrink-0" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {JOURNAL_ARTICLES.map((article, idx) => (
              <article
                key={idx}
                className="group cursor-pointer bg-brand-paper border border-brand-cream-dark border-t-2 border-t-transparent hover:border-t-brand-gold rounded-xs overflow-hidden hover:shadow-md transition-all"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover brightness-90 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] uppercase tracking-widest font-bold text-brand-gold">
                      {article.tag}
                    </span>
                    <span className="text-[9px] text-brand-muted">{article.readTime}</span>
                  </div>
                  <h3
                    className="text-base font-serif font-bold text-brand-maroon group-hover:text-brand-gold transition-colors leading-snug"
                    style={{ fontFamily: 'Libre Caslon Text, serif' }}
                  >
                    {article.title}
                  </h3>
                  <p className="text-xs text-brand-muted leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-maroon flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read Article <ArrowRight size={11} />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────
          9. NEWSLETTER
      ───────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 px-6 md:px-12 bg-brand-maroon text-brand-cream border-t border-brand-gold/20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: 'radial-gradient(circle, #B8893D 1px, transparent 1px)',
            backgroundSize: '16px 16px',
          }}
        />
        <div className="max-w-xl mx-auto text-center space-y-6 relative z-10">
          <Mail size={30} className="text-brand-gold mx-auto" strokeWidth={1.5} />
          <div>
            <h2
              className="text-2xl md:text-3xl font-serif font-bold text-brand-cream mb-2"
              style={{ fontFamily: 'Libre Caslon Text, serif' }}
            >
              The Beauty Digest
            </h2>
            <p className="text-xs text-brand-cream/65 leading-relaxed">
              Seasonal rituals, Ayurvedic wisdom, and early access to new formulations — delivered
              twice a month.
            </p>
          </div>

          {newsletterDone ? (
            <div className="py-4 px-6 bg-brand-gold/20 border border-brand-gold/40 rounded-xs">
              <p className="text-sm font-serif text-brand-cream font-semibold">
                Thank you for subscribing.
              </p>
              <p className="text-xs text-brand-cream/65 mt-1">
                Your first issue of The Beauty Digest arrives within 48 hours.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setNewsletterDone(true);
              }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <label htmlFor="beauty-email" className="sr-only">
                Email address
              </label>
              <input
                id="beauty-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-black/30 border border-brand-gold/40 focus:outline-none focus:border-brand-gold text-brand-cream text-sm px-4 py-3 placeholder:text-brand-cream/35 rounded-xs"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-brand-gold hover:bg-amber-700 transition-colors text-white text-[11px] font-bold uppercase tracking-widest cursor-pointer rounded-xs whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}

          <p className="text-[10px] text-brand-cream/35 italic">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </div>
  );
}
