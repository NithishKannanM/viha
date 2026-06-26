import React from 'react';
import { Home, ShoppingBag, Search, Heart, LayoutGrid } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileBottomNavProps {
  currentView: string;
  cartCount: number;
  wishlistCount: number;
  onNavigate: (view: 'home' | 'shop' | 'cart' | 'checkout-info' | 'tracker' | 'account' | 'beauty') => void;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenWishlist: () => void;
  onOpenMenu: () => void;
}

const navItems = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'categories', icon: LayoutGrid, label: 'Shop' },
  { id: 'search', icon: Search, label: 'Search' },
  { id: 'wishlist', icon: Heart, label: 'Saved' },
  { id: 'cart', icon: ShoppingBag, label: 'Cart' },
] as const;

export default function MobileBottomNav({
  currentView,
  cartCount,
  wishlistCount,
  onNavigate,
  onOpenCart,
  onOpenSearch,
  onOpenWishlist,
  onOpenMenu,
}: MobileBottomNavProps) {
  const handleAction = (id: string) => {
    switch (id) {
      case 'home': return onNavigate('home');
      case 'categories': return onOpenMenu();
      case 'search': return onOpenSearch();
      case 'wishlist': return onOpenWishlist();
      case 'cart': return onOpenCart();
    }
  };

  const isActive = (id: string) => {
    if (id === 'home') return currentView === 'home';
    if (id === 'categories') return currentView === 'shop' || currentView === 'beauty';
    return false;
  };

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-brand-paper/95 border-t border-brand-cream-dark backdrop-blur-md shadow-[0_-2px_16px_rgba(0,0,0,0.08)]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-stretch h-14">
        {navItems.map(({ id, icon: Icon, label }) => {
          const badge = id === 'cart' ? cartCount : id === 'wishlist' ? wishlistCount : 0;
          const active = isActive(id);

          return (
            <motion.button
              key={id}
              onClick={() => handleAction(id)}
              whileTap={{ scale: 0.88 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 relative cursor-pointer min-h-[44px] ${
                active ? 'text-brand-maroon' : 'text-brand-charcoal/45'
              }`}
              aria-label={label}
            >
              {active && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className="absolute top-0 inset-x-0 mx-auto w-8 h-0.5 bg-brand-maroon rounded-full"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <div className="relative">
                <Icon
                  size={20}
                  strokeWidth={active ? 2.2 : 1.5}
                  className={
                    id === 'wishlist' && wishlistCount > 0
                      ? 'fill-brand-maroon text-brand-maroon'
                      : ''
                  }
                />
                <AnimatePresence>
                  {badge > 0 && (
                    <motion.span
                      key={`${id}-badge`}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute -top-1.5 -right-1.5 bg-brand-maroon text-white text-[8px] min-w-[14px] h-3.5 rounded-full flex items-center justify-center font-bold px-0.5"
                    >
                      {badge > 9 ? '9+' : badge}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <span
                className={`text-[9px] font-semibold uppercase tracking-wide ${
                  active ? 'text-brand-maroon' : 'text-brand-charcoal/40'
                }`}
              >
                {label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
