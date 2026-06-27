import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import ShopView from './components/ShopView';
import CheckoutFlow from './components/CheckoutFlow';
import TrackerView from './components/TrackerView';
import AccountView from './components/AccountView';
import LoginView from './components/LoginView';
import ProductDetailView from './components/ProductDetailView';
import BeautyView from './components/BeautyView';
import BeautyArticleView from './components/BeautyArticleView';
import MobileBottomNav from './components/MobileBottomNav';

import { Product, CartItem, Order } from './types';
import { PRODUCTS, MOCK_ORDERS } from './data';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'shop' | 'checkout' | 'tracker' | 'account' | 'login' | 'product' | 'beauty' | 'beauty-article'>('home');
  const [checkoutStepView, setCheckoutStepView] = useState<'info' | 'delivery' | 'payment' | 'review' | 'success'>('info');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeProductDetail, setActiveProductDetail] = useState<Product | null>(null);
  const [activeArticleIndex, setActiveArticleIndex] = useState<number>(0);

  const handleViewProduct = (product: Product) => {
    setActiveProductDetail(product);
    setCurrentView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReadArticle = (index: number) => {
    setActiveArticleIndex(index);
    setCurrentView('beauty-article');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [currentRegion, setCurrentRegion] = useState<string>(() => {
    return localStorage.getItem('preferred_region') || 'IN';
  });

  const handleRegionChange = (regionId: string) => {
    setCurrentRegion(regionId);
    localStorage.setItem('preferred_region', regionId);
  };

  const [cart, setCart] = useState<CartItem[]>([
    { product: PRODUCTS[0], quantity: 1 }
  ]);

  const [orderRegistry, setOrderRegistry] = useState<Order[]>(MOCK_ORDERS);
  const [activeTrackingOrder, setActiveTrackingOrder] = useState<Order | null>(null);

  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const handleNavigate = (view: 'home' | 'shop' | 'cart' | 'checkout-info' | 'tracker' | 'account' | 'login' | 'product' | 'beauty') => {
    setActiveTrackingOrder(null);
    if (view === 'cart') {
      setCartOpen(true);
    } else if (view === 'checkout-info') {
      setCurrentView('checkout');
      setCheckoutStepView('info');
    } else if (view === 'account') {
      setCurrentView('login');
    } else {
      setCurrentView(view as typeof currentView);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTrackSubmit = (orderId: string) => {
    const match = orderRegistry.find(o =>
      o.id.toUpperCase() === orderId.toUpperCase() ||
      o.id.toUpperCase().includes(orderId.toUpperCase())
    );
    if (match) {
      setActiveTrackingOrder(match);
      setCurrentView('tracker');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleRegisterMockOrder = (newOrder: Order) => {
    setOrderRegistry((prev) => [newOrder, ...prev]);
  };

  return (
    <div className="min-h-screen bg-brand-cream text-[#2D2D2D] flex flex-col justify-between selection:bg-brand-gold/30 selection:text-brand-maroon">
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
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main className="flex-grow pb-14 lg:pb-0">
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
        {currentView === 'login' && (
          <LoginView onNavigate={(view) => {
            if (view === 'account') setCurrentView('account');
            else handleNavigate(view as Parameters<typeof handleNavigate>[0]);
          }} />
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
        {currentView === 'beauty' && (
          <BeautyView
            onNavigate={handleNavigate}
            onSelectCategory={setSelectedCategory}
            onAddToCart={handleAddToCart}
            onViewProduct={handleViewProduct}
            onReadArticle={handleReadArticle}
          />
        )}
        {currentView === 'beauty-article' && (
          <BeautyArticleView
            articleIndex={activeArticleIndex}
            onNavigate={handleNavigate}
            onViewProduct={handleViewProduct}
            onReadArticle={handleReadArticle}
            onAddToCart={handleAddToCart}
          />
        )}
      </main>

      <Footer onNavigate={handleNavigate} onSelectCategory={setSelectedCategory} />

      <MobileBottomNav
        currentView={currentView}
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        wishlistCount={wishlist.length}
        onNavigate={handleNavigate}
        onOpenCart={() => setCartOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenMenu={() => setMobileMenuOpen(true)}
      />
    </div>
  );
}
