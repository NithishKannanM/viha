import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import ShopView from './components/ShopView';
import CheckoutFlow from './components/CheckoutFlow';
import TrackerView from './components/TrackerView';
import AccountView from './components/AccountView';
import ProductDetailView from './components/ProductDetailView';

import { Product, CartItem, Order } from './types';
import { PRODUCTS, MOCK_ORDERS } from './data';
import { ThemeProvider, useTheme, ThemeVariant } from './ThemeContext';

function AppInner() {
  const { theme, setTheme } = useTheme();

  // Navigation states
  const [currentView, setCurrentView] = useState<'home' | 'shop' | 'checkout' | 'tracker' | 'account' | 'product'>('home');
  const [checkoutStepView, setCheckoutStepView] = useState<'info' | 'delivery' | 'payment' | 'review' | 'success'>('info');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeProductDetail, setActiveProductDetail] = useState<Product | null>(null);

  const handleViewProduct = (product: Product) => {
    setActiveProductDetail(product);
    setCurrentView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delivery Region setup (CN, IN, US, GB, CA, AE)
  const [currentRegion, setCurrentRegion] = useState<string>(() => {
    return localStorage.getItem('preferred_region') || 'IN';
  });

  const handleRegionChange = (regionId: string) => {
    setCurrentRegion(regionId);
    localStorage.setItem('preferred_region', regionId);
  };

  // Basket states - pre-fill with 1 x "Vellerukku Vinayagar"
  const [cart, setCart] = useState<CartItem[]>([
    { product: PRODUCTS[0], quantity: 1 }
  ]);

  // Order Database Registry
  const [orderRegistry, setOrderRegistry] = useState<Order[]>(MOCK_ORDERS);
  const [activeTrackingOrder, setActiveTrackingOrder] = useState<Order | null>(null);

  // UI drawers states
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [wishlist, setWishlist] = useState<Product[]>([]);

  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      return exists ? prev.filter((p) => p.id !== product.id) : [...prev, product];
    });
  };

  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleUpdateCartQty = (productId: string, qty: number) => {
    if (qty <= 0) { handleRemoveFromCart(productId); return; }
    setCart((prev) =>
      prev.map((item) => item.product.id === productId ? { ...item, quantity: qty } : item)
    );
  };

  const handleClearCart = () => setCart([]);

  const handleNavigate = (view: 'home' | 'shop' | 'cart' | 'checkout-info' | 'tracker' | 'account' | 'product') => {
    setActiveTrackingOrder(null);
    if (view === 'cart') {
      setCartOpen(true);
    } else if (view === 'checkout-info') {
      setCurrentView('checkout');
      setCheckoutStepView('info' as 'info' | 'delivery' | 'payment' | 'review' | 'success');
    } else {
      setCurrentView(view);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTrackSubmit = (orderId: string) => {
    const match = orderRegistry.find(o => o.id.toUpperCase() === orderId.toUpperCase() || o.id.toUpperCase().includes(orderId.toUpperCase()));
    if (match) {
      setActiveTrackingOrder(match);
      setCurrentView('tracker');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleRegisterMockOrder = (newOrder: Order) => {
    setOrderRegistry((prev) => [newOrder, ...prev]);
  };

  // CSS class: only 'green' theme applies the green color overrides
  const themeClass = theme === 'green' ? 'theme-green' : '';

  const TOGGLE_OPTIONS: { id: ThemeVariant; label: string; swatch: string; desc: string }[] = [
    { id: 'maroon',          label: 'All Maroon',       swatch: '#5c181a', desc: 'Maroon theme + original logo' },
    { id: 'green',           label: 'All Green',        swatch: '#2d6b30', desc: 'Green theme + new logo'       },
    { id: 'logo-green-maroon', label: 'New Logo',       swatch: '#5c181a', desc: 'Maroon theme + new logo'      },
  ];

  return (
    <div className={`min-h-screen bg-brand-cream text-[#2D2D2D] flex flex-col justify-between selection:bg-brand-gold/30 selection:text-brand-maroon ${themeClass}`}>
      {/* 1. Header */}
      <Header
        cart={cart}
        onNavigate={handleNavigate}
        onSelectCategory={setSelectedCategory}
        onRemoveFromCart={handleRemoveFromCart}
        onUpdateCartQty={handleUpdateCartQty}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
        wishlist={wishlist}
        onToggleWishlist={handleToggleWishlist}
        wishlistOpen={wishlistOpen}
        setWishlistOpen={setWishlistOpen}
        onAddToCart={handleAddToCart}
        currentRegion={currentRegion}
        onRegionChange={handleRegionChange}
        onViewProduct={handleViewProduct}
      />

      {/* 2. Main views */}
      <main className="flex-grow">
        {currentView === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onSelectCategory={setSelectedCategory}
            onTrackOrder={handleTrackSubmit}
            onViewProduct={handleViewProduct}
          />
        )}
        {currentView === 'shop' && (
          <ShopView
            onAddToCart={handleAddToCart}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onNavigate={handleNavigate}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            currentRegion={currentRegion}
            onViewProduct={handleViewProduct}
          />
        )}
        {currentView === 'checkout' && (
          <CheckoutFlow
            cart={cart}
            currentStepView={checkoutStepView}
            onSetStepView={setCheckoutStepView}
            onNavigate={handleNavigate}
            onClearCart={handleClearCart}
            onRegisterMockOrder={handleRegisterMockOrder}
            trackedOrder={activeTrackingOrder}
            onSetTrackedOrder={setActiveTrackingOrder}
            currentRegion={currentRegion}
            onRegionChange={handleRegionChange}
          />
        )}
        {currentView === 'tracker' && activeTrackingOrder && (
          <TrackerView
            order={activeTrackingOrder}
            onNavigate={handleNavigate}
            onClearTracked={() => { setActiveTrackingOrder(null); setCurrentView('home'); }}
            currentRegion={currentRegion}
          />
        )}
        {currentView === 'account' && (
          <AccountView
            orders={orderRegistry}
            onNavigate={handleNavigate}
            onTrackOrder={handleTrackSubmit}
            currentRegion={currentRegion}
          />
        )}
        {currentView === 'product' && activeProductDetail && (
          <ProductDetailView
            product={activeProductDetail}
            onAddToCart={handleAddToCart}
            onNavigate={handleNavigate}
            currentRegion={currentRegion}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
          />
        )}
      </main>

      {/* 3. Footer */}
      <Footer onNavigate={handleNavigate} onSelectCategory={setSelectedCategory} />

      {/* Client preview: floating 3-option theme toggle */}
      <div className="fixed bottom-6 left-6 z-[200] flex flex-col gap-1.5 items-start">
        <span className="text-[9px] uppercase tracking-widest font-bold text-white/90 bg-black/50 px-2.5 py-0.5 rounded-full">
          Client Preview
        </span>
        <div className="flex flex-col gap-1 bg-white/95 backdrop-blur border border-gray-200 rounded-2xl shadow-2xl px-2.5 py-2.5">
          {TOGGLE_OPTIONS.map((opt, i) => (
            <React.Fragment key={opt.id}>
              <button
                type="button"
                onClick={() => setTheme(opt.id)}
                title={opt.desc}
                className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer w-full text-left ${
                  theme === opt.id
                    ? 'text-white shadow-md'
                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                }`}
                style={theme === opt.id ? { backgroundColor: opt.swatch } : {}}
              >
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0 border-2 border-white/40 shadow-sm"
                  style={{ backgroundColor: opt.swatch }}
                />
                {opt.label}
              </button>
              {i < TOGGLE_OPTIONS.length - 1 && (
                <div className="h-px bg-gray-100 mx-1" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}
