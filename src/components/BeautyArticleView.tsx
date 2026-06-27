import React from 'react';
import { ArrowLeft, Clock, Star, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data';
import { Product } from '../types';

type NavigateTarget = 'home' | 'shop' | 'cart' | 'checkout-info' | 'tracker' | 'account' | 'beauty';

interface BeautyArticleViewProps {
  articleIndex: number;
  onNavigate: (view: NavigateTarget) => void;
  onViewProduct: (product: Product) => void;
  onReadArticle: (index: number) => void;
  onAddToCart: (product: Product) => void;
}

interface ArticleSection {
  heading?: string;
  body: string;
  pullQuote?: string;
  image?: string;
  imageCaption?: string;
}

interface Article {
  tag: string;
  title: string;
  excerpt: string;
  readTime: string;
  publishDate: string;
  image: string;
  relatedKeywords: string[];
  sections: ArticleSection[];
}

const ARTICLES: Article[] = [
  {
    tag: 'Skincare Ritual',
    title: 'The Ancient Science of Kumkumadi',
    excerpt: "Saffron-infused oils have graced royal beauty rituals for over two thousand years. We trace the lineage of India's most precious beauty elixir.",
    readTime: '5 min read',
    publishDate: 'June 2025',
    image: 'https://images.unsplash.com/photo-1601001435957-74f8c7e65db3?q=80&w=1920',
    relatedKeywords: ['oil', 'kumkumadi', 'herbal', 'soap'],
    sections: [
      {
        heading: 'A Formula Born in the Royal Courts',
        body: "Kumkumadi Tailam — \"kumkuma\" meaning saffron, \"tailam\" meaning oil — appears in the Ashtanga Hridayam, one of the three classical texts of Ayurveda compiled by Vagbhata in the 7th century CE. It was not a folk remedy. It was a physician's formulation, prescribed for brightening the complexion, treating hyperpigmentation, and preserving the skin's luminosity through seasonal changes.\n\nFor centuries, access to Kumkumadi was limited to royalty and the wealthy. Saffron — its primary ingredient — was worth more than gold by weight, harvested in Kashmir and traded across the Silk Road. The oil was applied by royal handmaidens as part of elaborate pre-dawn rituals that preceded dawn prayers and court appearances.",
        pullQuote: "Kumkumadi appears in the Ashtanga Hridayam compiled in the 7th century CE — not as a folk remedy, but as a physician's formulation.",
      },
      {
        heading: 'The Ingredients Behind the Glow',
        body: "What makes Kumkumadi extraordinary is not any single ingredient but the synergy of its botanical complex. The classical formula contains up to 26 ingredients, though modern versions typically concentrate on the most potent core.\n\nSaffron (Crocus sativus) forms the base. Its active compound, crocin, is a powerful antioxidant that inhibits melanin synthesis — the biological mechanism behind dark spots and uneven tone. Scientific studies from the last two decades have confirmed what Vagbhata described: saffron measurably reduces pigmentation and improves skin brightness over sustained use.\n\nSesame oil (Tila tailam) acts as the carrier. Unlike mineral oils or silicones, cold-pressed sesame penetrates the skin's lipid barrier without clogging pores. It is rich in linoleic acid, Vitamin E, and sesamol — its own antioxidant compound that extends the shelf life of the entire formula naturally.\n\nManjistha (Rubia cordifolia), the Indian madder root, contributes potent lymphatic-clearing properties. In Ayurveda, sluggish lymphatic circulation is seen as the root cause of dull, congested skin. Manjistha clears this congestion, allowing the brightening actives to work more efficiently.\n\nLotus (Nelumbo nucifera), Vetiver (Khus), Chandana (Sandalwood), and Dashamoola (ten roots) round out the formula with cooling, calming, and anti-inflammatory properties that balance the warming effect of saffron.",
        image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=1200',
        imageCaption: 'Raw Kumkumadi in its traditional form — deeply amber, carrying the scent of saffron and aged sesame.',
      },
      {
        heading: 'How to Use It Correctly',
        body: "The most common mistake is applying Kumkumadi like a moisturiser — in large quantities, spread across the full face. The classical application is more intentional.\n\nWarm three to five drops between your palms. Press — do not rub — into skin that is slightly damp, either after cleansing or after a facial steam. The warmth opens pores and allows the oil to penetrate the deeper layers of the dermis where melanocytes (pigment-producing cells) reside.\n\nLeave overnight where possible. The skin undergoes its deepest repair between 11 PM and 2 AM. Applying Kumkumadi before sleep allows the actives to work through this peak renewal window.\n\nConsistency over six to eight weeks is the minimum window to observe visible results. Ayurveda does not promise overnight transformation — it builds lasting change through repeated, mindful application.",
        pullQuote: "Press — do not rub — into skin that is slightly damp. Warmth opens pores and allows the oil to reach the deeper layers where melanocytes reside.",
      },
      {
        heading: 'Authentic vs. Commercial — What to Look For',
        body: "The Kumkumadi market has been diluted by products that use synthetic saffron colouring or fractional amounts of real saffron alongside petrochemical carriers. When evaluating any Kumkumadi product, three things reveal authenticity:\n\nColour: Genuine Kumkumadi is a deep amber-to-burgundy, not bright orange or pale yellow. The colour comes from real saffron's crocin compound.\n\nSmell: Authentic Kumkumadi carries a warm, earthy, slightly sweet-smoky scent from aged sesame and real saffron. Synthetic versions smell floral or generically \"herbal\" — pleasant but thin.\n\nTexture: A properly made Kumkumadi is medium-weight, absorbs within three to five minutes without residue, and does not feel greasy after absorption. If it feels heavy or never fully absorbs, the carrier is likely inferior.\n\nAt Viha, our Kumkumadi is cold-processed from real Kashmiri saffron threads steeped in cold-pressed sesame oil. No synthetic fragrance, no mineral oil dilution — only what the 7th-century physician prescribed.",
      },
    ],
  },

  {
    tag: 'Ayurveda',
    title: 'Understanding Your Prakriti',
    excerpt: 'Vata, Pitta, or Kapha — your Ayurvedic constitution governs your skin type and which ingredients will genuinely work for you.',
    readTime: '7 min read',
    publishDate: 'May 2025',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1920',
    relatedKeywords: ['oil', 'soap', 'herbal', 'ayurveda'],
    sections: [
      {
        heading: 'What Prakriti Actually Means',
        body: "Prakriti (Sanskrit: prakṛti, meaning \"nature\" or \"original form\") is your unique constitutional blueprint — established at conception and unchanged throughout your life. It determines not only your physical characteristics but your metabolic tendencies, emotional patterns, and how your skin responds to climate, diet, stress, and topical ingredients.\n\nUnlike skin typing systems (dry, oily, combination, sensitive) that describe current condition, Prakriti describes your inherent nature. Current skin condition is called Vikriti — the state of imbalance. Effective Ayurvedic skincare works on both: addressing current imbalances through active treatment while aligning your long-term routine with your Prakriti.\n\nPrakriti is composed of varying ratios of three fundamental forces — the Doshas.",
        pullQuote: "Prakriti is your inherent constitutional nature. Current skin condition is Vikriti — the state of imbalance. Effective Ayurvedic skincare works on both.",
      },
      {
        heading: 'Vata — The Wind Constitution',
        body: "Vata is governed by the elements of Air and Ether. In the skin, Vata expresses as dryness, thinness, and delicacy. Vata skin loses moisture rapidly, shows fine lines early, and is highly sensitive to cold and dry climates.\n\nVata skin needs rich, warming, deeply nourishing ingredients. Sesame oil is classically prescribed for Vata — its warming nature counteracts Vata's inherent coldness. Ashwagandha, Shatavari, and Bala are rejuvenating herbs that rebuild the skin's collagen matrix and moisture retention capacity.\n\nThe primary mistake Vata types make is over-cleansing. Foaming cleansers, clay masks, and astringent toners strip the skin's already-thin lipid barrier and trigger more dryness. The Ayurvedic prescription for Vata skin is \"sneha\" — anointing — not stripping.\n\nIf you have Vata skin: your routine should be oil-first, water-second. Cleanse with cream or milk-based formulas. Follow immediately with a warm oil application before water evaporates.",
        image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=1200',
        imageCaption: 'Therapeutic oils form the foundation of Vata skin care — anointment, not stripping.',
      },
      {
        heading: 'Pitta — The Fire Constitution',
        body: "Pitta is governed by Fire and Water. In the skin, Pitta manifests as warmth, reactivity, and a tendency toward redness, inflammation, and hyperpigmentation. Pitta skin tans easily, flushes with heat, and is prone to acne when internal heat (ama) accumulates.\n\nPitta skin benefits from cooling, anti-inflammatory ingredients. Chandana (Sandalwood) is the primary Pitta herb for skin — it reduces surface temperature, calms inflamed tissue, and carries a cooling energy that directly counteracts Pitta's excess fire. Kumkumadi, when used correctly, is effective for Pitta skin because Manjistha within it specifically addresses the lymphatic congestion that drives Pitta acne.\n\nThe biggest mistake Pitta types make is using hot water, steam, or warming oils like mustard. These amplify Pitta's excess fire and worsen inflammation and redness.\n\nIf you have Pitta skin: use cool or lukewarm water only. Avoid spicy food and alcohol. Choose cooling herbs — Neem, Manjistha, Chandana, Vetiver — over warming ones. Do not use harsh physical exfoliants; gentle enzymatic exfoliation (papaya, pineapple) suits Pitta far better.",
        pullQuote: "Sandalwood is the primary Pitta herb — it reduces surface temperature, calms inflamed tissue, and carries a cooling energy that directly counteracts excess fire.",
      },
      {
        heading: 'Kapha — The Earth Constitution',
        body: "Kapha is governed by Earth and Water. Kapha skin is the thickest of the three constitutions — oily, smooth, and prone to clogged pores, blackheads, and a dull surface complexion from accumulated sebum and toxins.\n\nKapha skin is the most durable — it resists ageing better than Vata or Pitta — but requires regular stimulation to prevent stagnation. Ubtan (herbal exfoliating paste made from chickpea flour, turmeric, and aromatic herbs) is the classical prescription for Kapha skin. It absorbs excess oil, exfoliates dead cells, and stimulates circulation.\n\nNeem is particularly beneficial for Kapha skin — its bitter, drying, antibacterial properties directly counter Kapha's tendency toward oiliness and microbial congestion. Turmeric addresses the inflammation under closed comedones.\n\nIf you have Kapha skin: exfoliate two to three times weekly. Prioritise dry brushing before bathing. Use lighter, astringent oils like sunflower or safflower rather than heavy sesame. Morning cold-water face washing stimulates Kapha's circulation and helps prevent the midday oiliness that Kapha types often experience.",
      },
      {
        heading: 'A Simple Self-Assessment',
        body: "True Prakriti assessment requires an Ayurvedic physician's pulse reading (Nadi Pariksha). But for practical skincare purposes, this pattern works well as an initial guide:\n\nIf your skin is typically dry, delicate, thin-pored, and your nails are brittle — Vata is dominant.\n\nIf your skin runs warm, flushes easily, is medium-pored, and you tend toward sensitivity and redness — Pitta is dominant.\n\nIf your skin is naturally oily, pore-enlarged, smooth-textured, and ages slowly — Kapha is dominant.\n\nMost people are dual-constitution (Vata-Pitta, Pitta-Kapha, Vata-Kapha) — in which case you balance the dominant one in the current season. Vata-Pitta types who live in hot climates should prioritise Pitta management in summer and Vata management in winter.\n\nThe beauty of Prakriti-based skincare is that it stops you chasing trends. Once you understand your constitution, you know exactly which ingredients your skin will always respond to — and which ones to permanently remove from your shelf.",
        pullQuote: "Once you understand your constitution, you stop chasing trends. You know exactly which ingredients your skin will always respond to.",
      },
    ],
  },

  {
    tag: 'Morning Rituals',
    title: 'Five Morning Rituals for Luminous Skin',
    excerpt: 'From oil pulling to Abhyanga self-massage, these Ayurvedic morning practices build radiance from the inside out — no serums required.',
    readTime: '4 min read',
    publishDate: 'April 2025',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1920',
    relatedKeywords: ['oil', 'soap', 'scrub', 'herbal'],
    sections: [
      {
        heading: 'Why Morning Rituals Matter in Ayurveda',
        body: "Ayurveda does not separate inner health from outer radiance. The skin is considered a mirror of the Agni — the digestive and metabolic fire that governs how the body processes food, emotion, and sensory input. When Agni is strong and digestion is clean, the skin reflects this: clear, luminous, evenly toned. When Agni is weak or the body is accumulating ama (metabolic waste), the skin becomes the first organ to show it.\n\nThe Dinacharya — the Ayurvedic daily routine — is designed to stoke Agni, clear accumulated ama, and prepare the body and skin for the day. None of the five practices below require a single commercial product. They are ancient, accessible, and work at the root of skin health rather than the surface.",
      },
      {
        heading: '01. Oil Pulling (Gandusha)',
        body: "Before eating, drinking, or speaking — take one tablespoon of cold-pressed sesame or coconut oil and swish it through the teeth and gums for 10 to 20 minutes. Do not gargle. Do not swallow. Spit into a bin, not the sink.\n\nOil pulling is documented in the Charaka Samhita as a treatment for oral disease, voice strengthening, and jaw vitality. Modern research has confirmed its antibacterial effect against Streptococcus mutans and the reduction of plaque levels comparable to chlorhexidine mouthwash.\n\nThe skin connection is indirect but significant: oral microbiome health is increasingly linked to systemic inflammation markers. Chronic low-grade oral bacterial load contributes to inflammatory skin conditions — including adult acne along the jawline and chin, the very zone that corresponds to gut and oral health in face-mapping traditions.\n\nStart with 5 minutes and build over two weeks. The jaw muscles will need to strengthen.",
        pullQuote: "Oil pulling before eating or speaking is documented in the Charaka Samhita — and modern research has confirmed its antibacterial effect comparable to chlorhexidine.",
        image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=1200',
        imageCaption: 'Cold-pressed sesame oil — the classical choice for Gandusha, warming and deeply antibacterial.',
      },
      {
        heading: '02. Tongue Scraping (Jihva Nirlekhana)',
        body: "A copper or stainless steel tongue scraper used 7 to 14 strokes from the back of the tongue forward removes the layer of ama that accumulates overnight. This coating — which you can observe as white or yellow film — is a combination of dead bacteria, mucus, food particles, and metabolic waste that the digestive system has expelled through the oral mucosa during sleep.\n\nIn Ayurveda, this coating is considered a direct indicator of digestive health and ama accumulation. Regular tongue scraping improves taste perception (which in turn moderates overeating), reduces the reabsorption of ama into the system, and stimulates the digestive organs through reflex points on the tongue corresponding to kidney, liver, and stomach.\n\nFor skin: improved liver and digestive function directly reduces the toxic load that expresses on the skin as acne, dullness, and uneven tone.",
      },
      {
        heading: '03. Abhyanga — The Self-Massage',
        body: "Abhyanga is the practice of warm oil self-massage applied before bathing. Use approximately 60 to 90 ml of your constitution-appropriate oil (sesame for Vata and Kapha; coconut or sunflower for Pitta). Warm it in a small bottle placed in hot water for two minutes.\n\nApply in long strokes on the limbs and circular strokes on the joints and abdomen. Give special attention to the soles of the feet, which contain Marma points — vital energy centres — connected to the optic nerve, brain, and endocrine system.\n\nLeave the oil on for 15 to 20 minutes, then bathe with a gentle herbal cleanser. Do not use strong soap — it strips the oil before it has nourished the tissue fully.\n\nThe documented effects of Abhyanga are extraordinary: improved lymphatic drainage, reduced cortisol (stress hormone) levels, enhanced nerve conduction, and measurable improvements in skin hydration and elasticity within three weeks of daily practice. For Vata-type dry skin, Abhyanga alone — practiced consistently — often eliminates the need for any additional moisturiser.",
        pullQuote: "For Vata-type dry skin, Abhyanga alone — practiced consistently over three weeks — often eliminates the need for any additional moisturiser.",
      },
      {
        heading: '04. Nasya — Nasal Oiling',
        body: "Two drops of warm sesame oil, placed into each nostril in the morning, constitute the practice of Nasya. Tilt the head back slightly, apply the drops, then sniff gently to draw the oil upward into the nasal passage.\n\nThe Sushruta Samhita describes the nose as \"the gateway to the brain\" — and anatomically, this is precise. The nasal mucosa has direct access to the olfactory bulb, which connects immediately to the limbic system and hypothalamus. Nasal oiling lubricates the mucous membranes, reduces the entry of allergens and pollutants, and calms the nervous system through this direct pathway.\n\nThe skin relevance: the nervous system — specifically the hypothalamic-pituitary-adrenal (HPA) axis — directly governs cortisol output, which in turn drives sebum overproduction, barrier disruption, and inflammatory skin conditions. A calmer nervous system produces measurably calmer skin.",
      },
      {
        heading: '05. Herbal Facial Steam (Swedana)',
        body: "Once or twice weekly — not daily — a herbal facial steam opens pores, loosens congestion, and prepares skin for deeper cleansing or oil absorption. Bring water to a boil, add a handful of herbs appropriate to your constitution (Neem and Tulsi leaves for Kapha-Pitta, Rose petals and Fennel for Pitta-Vata, Ginger and Cardamom pods for Vata-Kapha), cover your head with a towel, and allow the steam to contact your face for 5 to 8 minutes.\n\nFollow immediately with your Ubtan paste or herbal cleanser while pores are still open — this is the most effective moment for deep cleansing. Then apply your Kumkumadi or skin oil while the face is still warm and slightly damp.\n\nThe sequence matters: steam opens, cleanser removes, oil nourishes. This three-step combination, performed weekly, delivers results that no combination of commercial serums can replicate — because it works with the skin's own biology rather than forcing topical actives past a closed barrier.\n\nThese five practices, taken together, cost almost nothing. They require ten minutes of recalibrated morning time. And they build a quality of skin health that accumulates — unlike topical treatments that stop working the moment you stop using them.",
        pullQuote: "This three-step combination — steam, cleanse, oil — works with the skin's own biology. It delivers results that no combination of commercial serums can replicate.",
      },
    ],
  },
];

export default function BeautyArticleView({
  articleIndex,
  onNavigate,
  onViewProduct,
  onReadArticle,
  onAddToCart,
}: BeautyArticleViewProps) {
  const article = ARTICLES[articleIndex] ?? ARTICLES[0];
  const otherArticles = ARTICLES.filter((_, i) => i !== articleIndex);

  const relatedProducts = PRODUCTS.filter((p) =>
    article.relatedKeywords.some((kw) =>
      p.name.toLowerCase().includes(kw) ||
      p.category.toLowerCase().includes(kw) ||
      (p.ingredientsOrMaterials ?? '').toLowerCase().includes(kw)
    )
  ).slice(0, 4);

  return (
    <div className="bg-brand-cream font-sans animate-fade-in">

      {/* Hero */}
      <div className="relative w-full h-[340px] md:h-[500px] overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Breadcrumb */}
        <nav className="absolute top-6 left-6 md:left-12 flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-white/50 font-semibold">
          <button onClick={() => onNavigate('home')} className="hover:text-brand-gold transition-colors cursor-pointer">Home</button>
          <span>/</span>
          <button onClick={() => onNavigate('beauty')} className="hover:text-brand-gold transition-colors cursor-pointer">Beauty &amp; Wellness</button>
          <span>/</span>
          <span className="text-brand-gold">Journal</span>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-10 md:pb-14">
          <span className="inline-block text-[9px] uppercase tracking-widest font-bold text-brand-gold border border-brand-gold/40 px-2.5 py-1 mb-4">
            {article.tag}
          </span>
          <h1
            className="text-2xl sm:text-4xl md:text-5xl font-serif font-black text-white max-w-3xl leading-tight"
            style={{ fontFamily: 'Libre Caslon Text, serif' }}
          >
            {article.title}
          </h1>
          <div className="flex items-center gap-4 mt-4 text-[11px] text-white/55">
            <span className="flex items-center gap-1.5"><Clock size={12} /> {article.readTime}</span>
            <span className="text-white/20">|</span>
            <span>{article.publishDate}</span>
            <span className="text-white/20">|</span>
            <span>Viha Beauty Journal</span>
          </div>
        </div>
      </div>

      {/* Back button */}
      <div className="px-6 md:px-12 py-5 border-b border-brand-cream-dark bg-brand-paper">
        <button
          onClick={() => onNavigate('beauty')}
          className="flex items-center gap-2 text-[11px] uppercase tracking-widest font-bold text-brand-charcoal/60 hover:text-brand-maroon transition-colors cursor-pointer group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to Beauty Journal
        </button>
      </div>

      {/* Article body */}
      <div className="max-w-3xl mx-auto px-6 md:px-8 py-14 md:py-20">

        {/* Excerpt / lead */}
        <p className="text-base md:text-lg text-brand-charcoal/75 leading-relaxed italic border-l-4 border-brand-gold pl-5 mb-14 font-serif">
          {article.excerpt}
        </p>

        {/* Sections */}
        <div className="space-y-14">
          {article.sections.map((section, idx) => (
            <div key={idx} className="space-y-5">
              {section.heading && (
                <h2
                  className="text-xl md:text-2xl font-serif font-bold text-brand-maroon leading-snug"
                  style={{ fontFamily: 'Libre Caslon Text, serif' }}
                >
                  {section.heading}
                </h2>
              )}

              {section.body.split('\n\n').map((para, pIdx) => (
                <p key={pIdx} className="text-sm md:text-[15px] text-brand-charcoal/80 leading-[1.85]">
                  {para}
                </p>
              ))}

              {section.pullQuote && (
                <blockquote className="my-8 border-l-4 border-brand-gold bg-brand-paper px-6 py-5 rounded-xs">
                  <p
                    className="text-base md:text-lg font-serif text-brand-maroon italic leading-relaxed"
                    style={{ fontFamily: 'Libre Caslon Text, serif' }}
                  >
                    "{section.pullQuote}"
                  </p>
                </blockquote>
              )}

              {section.image && (
                <figure className="my-8">
                  <img
                    src={section.image}
                    alt={section.imageCaption ?? ''}
                    className="w-full object-cover rounded-xs max-h-[380px]"
                    loading="lazy"
                  />
                  {section.imageCaption && (
                    <figcaption className="mt-2.5 text-[11px] text-brand-charcoal/45 italic text-center">
                      {section.imageCaption}
                    </figcaption>
                  )}
                </figure>
              )}
            </div>
          ))}
        </div>

        {/* Article footer */}
        <div className="mt-16 pt-8 border-t border-brand-cream-dark flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-brand-gold">Written by</p>
            <p className="text-sm font-serif font-semibold text-brand-maroon mt-0.5">Viha Beauty Journal</p>
            <p className="text-[11px] text-brand-muted mt-0.5">{article.publishDate}</p>
          </div>
          <button
            onClick={() => onNavigate('beauty')}
            className="flex items-center gap-2 px-5 py-2.5 border border-brand-maroon/30 text-brand-maroon text-[10px] uppercase tracking-widest font-bold hover:bg-brand-maroon hover:text-white transition-all cursor-pointer rounded-xs"
          >
            <ArrowLeft size={11} /> More Articles
          </button>
        </div>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 md:py-20 px-6 md:px-12 bg-brand-paper border-t border-brand-cream-dark">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10">
              <span className="block text-[10px] uppercase tracking-widest text-brand-gold font-bold mb-2">
                FROM THE ARTICLE
              </span>
              <h2
                className="text-2xl md:text-3xl font-serif font-black text-brand-maroon"
                style={{ fontFamily: 'Libre Caslon Text, serif' }}
              >
                Products Mentioned
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
              {relatedProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => onViewProduct(product)}
                  className="group cursor-pointer bg-brand-cream border border-brand-cream-dark border-t-2 border-t-transparent hover:border-t-brand-gold rounded-sm overflow-hidden hover:shadow-md transition-all flex flex-col"
                >
                  <div className="aspect-square overflow-hidden bg-brand-cream flex items-center justify-center">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-contain mix-blend-multiply p-2 group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-3 flex flex-col flex-1 justify-between space-y-2">
                    <div>
                      <span className="text-[8px] text-brand-gold uppercase tracking-widest font-bold block mb-0.5">
                        {product.subcategory ?? product.category}
                      </span>
                      <h4
                        className="text-[12px] md:text-sm font-serif font-semibold text-brand-maroon leading-tight line-clamp-2"
                        style={{ fontFamily: 'Libre Caslon Text, serif' }}
                      >
                        {product.name}
                      </h4>
                      {product.rating && (
                        <div className="flex items-center gap-0.5 mt-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              size={9}
                              className={s <= Math.round(product.rating!) ? 'fill-brand-gold text-brand-gold' : 'text-brand-cream-dark'}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-brand-cream-dark">
                      <span className="text-[12px] font-semibold text-brand-maroon">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      <button
                        onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
                        className="px-2.5 py-1.5 bg-brand-maroon hover:bg-brand-maroon-dark text-white text-[9px] font-bold uppercase tracking-widest transition-colors cursor-pointer rounded-xs min-h-[32px]"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Other articles */}
      <section className="py-16 md:py-20 px-6 md:px-12 bg-brand-cream border-t border-brand-cream-dark">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <span className="block text-[10px] uppercase tracking-widest text-brand-gold font-bold mb-2">
              CONTINUE READING
            </span>
            <h2
              className="text-2xl md:text-3xl font-serif font-black text-brand-maroon"
              style={{ fontFamily: 'Libre Caslon Text, serif' }}
            >
              More from the Journal
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherArticles.map((other, i) => {
              const originalIndex = ARTICLES.indexOf(other);
              return (
                <article
                  key={i}
                  onClick={() => onReadArticle(originalIndex)}
                  className="group cursor-pointer bg-brand-paper border border-brand-cream-dark border-t-2 border-t-transparent hover:border-t-brand-gold rounded-xs overflow-hidden hover:shadow-md transition-all flex flex-col sm:flex-row"
                >
                  <div className="sm:w-40 md:w-48 shrink-0 aspect-video sm:aspect-auto overflow-hidden">
                    <img
                      src={other.image}
                      alt={other.title}
                      className="w-full h-full object-cover brightness-90 group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] uppercase tracking-widest font-bold text-brand-gold">{other.tag}</span>
                        <span className="text-[9px] text-brand-muted flex items-center gap-1"><Clock size={10} />{other.readTime}</span>
                      </div>
                      <h3
                        className="text-base font-serif font-bold text-brand-maroon group-hover:text-brand-gold transition-colors leading-snug"
                        style={{ fontFamily: 'Libre Caslon Text, serif' }}
                      >
                        {other.title}
                      </h3>
                      <p className="text-xs text-brand-muted leading-relaxed line-clamp-2">{other.excerpt}</p>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-maroon flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read Article <ArrowRight size={10} />
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
