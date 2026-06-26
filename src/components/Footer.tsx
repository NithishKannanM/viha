import React from 'react';
import Logo from './Logo';

interface FooterProps {
  onNavigate: (view: 'home' | 'shop' | 'cart' | 'tracker') => void;
  onSelectCategory: (category: string) => void;
}

export default function Footer({ onNavigate, onSelectCategory }: FooterProps) {
  return (
    <footer className="bg-brand-cream border-t border-brand-cream-dark px-4 md:px-12 py-12 text-brand-charcoal font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Column */}
        <div className="space-y-4">
          <Logo size="sm" className="!items-start" />
          <p className="text-xs text-brand-charcoal/70 leading-relaxed mt-2" style={{ fontFamily: 'Libre Caslon Text, serif' }}>
            Preserving Heritage, Promoting Wellness.
          </p>
          <p className="text-[11px] text-brand-charcoal/50 leading-relaxed">
            Authentic traditional tools, botanical formulations, and sacred jewelry crafted in reverence to invoke divine energy.
          </p>
        </div>

        {/* Explore Column */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-brand-maroon mb-4">Explore</h4>
          <ul className="space-y-2.5 text-xs text-brand-charcoal/80">
            <li>
              <button onClick={() => onNavigate('home')} className="hover:text-brand-maroon transition-colors text-left cursor-pointer">
                Founder Story
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  onSelectCategory('pooja');
                  onNavigate('shop');
                }}
                className="hover:text-brand-maroon transition-colors text-left cursor-pointer"
              >
                Pooja Essentials
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  onSelectCategory('ayurveda');
                  onNavigate('shop');
                }}
                className="hover:text-brand-maroon transition-colors text-left cursor-pointer"
              >
                Ayurveda Care
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  onSelectCategory('jewelry');
                  onNavigate('shop');
                }}
                className="hover:text-brand-maroon transition-colors text-left cursor-pointer"
              >
                Spiritual Adornments
              </button>
            </li>
          </ul>
        </div>

        {/* Support Column */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-brand-maroon mb-4">Support & Care</h4>
          <ul className="space-y-2.5 text-xs text-brand-charcoal/80">
            <li>
              <a href="#tracker" className="hover:text-brand-maroon transition-colors block">
                Order Tracking
              </a>
            </li>
            <li>
              <button onClick={() => onSelectCategory('all')} className="hover:text-brand-maroon transition-colors text-left block cursor-pointer">
                Shipping Policy
              </button>
            </li>
            <li>
              <button type="button" onClick={() => {}} className="hover:text-brand-maroon transition-colors text-left block cursor-pointer">
                Contact Us
              </button>
            </li>
            <li>
              <button type="button" onClick={() => {}} className="hover:text-brand-maroon transition-colors text-left block cursor-pointer">
                Ethical Sourcing & Zari Guarantee
              </button>
            </li>
          </ul>
        </div>

        {/* Legal Column */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-brand-maroon mb-4">Secure Seal</h4>
          <p className="text-xs text-brand-charcoal/60 leading-relaxed mb-4">
            We employ industry-standard encryption for 100% secure spiritual commerce checkout.
          </p>
          <div className="flex gap-2">
            <span className="bg-brand-paper border border-brand-cream-dark text-emerald-800 text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider">
              Authentic Zari
            </span>
            <span className="bg-brand-paper border border-brand-cream-dark text-brand-gold text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider">
              Hand-carved
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-brand-cream-dark flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-brand-charcoal/50">
        <div>
          <span>© {new Date().getFullYear()} Viha Spiritual Boutique. All Rights Reserved.</span>
        </div>
        <div className="flex gap-4">
          <span className="hover:underline cursor-pointer">Privacy Policy</span>
          <span>•</span>
          <span className="hover:underline cursor-pointer">Terms of Service</span>
          <span>•</span>
          <span className="hover:underline cursor-pointer">Ethical Sourcing</span>
        </div>
      </div>
    </footer>
  );
}
