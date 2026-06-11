/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useShop } from '../contexts/ShopContext';
import { Crown, ShoppingBag, Heart, Search, Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Header: React.FC = () => {
  const {
    currentView,
    setView,
    cart,
    wishlist,
    searchQuery,
    setSearchQuery,
    resetFilters
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const wishCount = wishlist.length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setView('catalog');
  };

  const handleNavClick = (view: any) => {
    if (view === 'catalog') {
      resetFilters();
    }
    setView(view);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Banner Alert */}
      <div className="bg-burgundy text-white py-1 px-4 text-center text-xs tracking-wider  font-sans font-medium flex justify-center items-center gap-2">
        <span>✨ ROYAL SPRING ENTRANCE: FLAT 40% OFF CODE: </span>
        <span className="font-bold border border-gold/40 px-1.5 py-0.2 select-all tracking-widest text-[#FFF] text-[11px] bg-white/10 rounded">VELVET40</span>
        <span className="hidden md:inline-block"> | FREE DISPATCH ON ALL ORDERS OVER ₹5,000</span>
      </div>

      <header className="sticky top-0 z-40 bg-[#FFF]/90 backdrop-blur-md border-b border-gray-100 shadow-[0_1px_10px_rgba(0,0,0,0.02)] transition-luxury">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
                     {/* Brand Logo */}
            <div 
              onClick={() => handleNavClick('home')} 
              className="flex items-center gap-2.5 cursor-pointer group shrink-0"
              id="header-logo"
            >
              <div className="w-10 h-10 rounded-full bg-burgundy flex items-center justify-center shadow-md shadow-burgundy/15 group-hover:bg-burgundy-hover transition-colors">
                <Crown className="w-5 h-5 text-gold animate-pulse" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-serif text-2xl font-bold tracking-tight text-burgundy group-hover:text-gold transition-colors block">
                  Velvet Crown
                </span>
                <span className="text-[9px] font-sans text-gold font-bold uppercase tracking-[0.3em] block mt-0.5">
                  Atelier
                </span>
              </div>
            </div>

            {/* Desktop Navigation links */}
            <nav className="hidden lg:flex items-center gap-8 text-xs font-bold tracking-[0.2em] uppercase text-gray-650 shrink-0">
              <button 
                onClick={() => handleNavClick('home')}
                className={`transition-colors py-2 relative uppercase ${
                  currentView === 'home' ? 'text-burgundy' : 'text-gray-600 hover:text-burgundy'
                }`}
              >
                Home
                {currentView === 'home' && (
                  <motion.div layoutId="nav_underline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold" />
                )}
              </button>
              
              <button 
                onClick={() => handleNavClick('catalog')}
                className={`transition-colors py-2 relative uppercase ${
                  currentView === 'catalog' ? 'text-burgundy' : 'text-gray-600 hover:text-burgundy'
                }`}
              >
                Collections
                {currentView === 'catalog' && (
                  <motion.div layoutId="nav_underline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold" />
                )}
              </button>

              <button 
                onClick={() => handleNavClick('contact')}
                className={`transition-colors py-2 relative uppercase ${
                  currentView === 'contact' ? 'text-burgundy' : 'text-gray-600 hover:text-burgundy'
                }`}
              >
                Bespoke Help
                {currentView === 'contact' && (
                  <motion.div layoutId="nav_underline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold" />
                )}
              </button>
            </nav>

            {/* Live Search Form */}
            <form 
              onSubmit={handleSearchSubmit} 
              className="hidden md:flex max-w-sm w-full relative"
              id="desktop-search-form"
            >
              <input
                type="text"
                placeholder="Search premium apparel, jewelry, accessories..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (currentView !== 'catalog') setView('catalog');
                }}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className={`w-full bg-gray-50 border border-gray-200 text-xs font-sans text-gray-900 rounded-full pl-4 pr-10 py-2.5 outline-none transition-all duration-300 ${
                  searchFocused 
                    ? 'ring-2 ring-burgundy/10 border-burgundy bg-[#FFF] shadow-inner' 
                    : 'hover:border-gray-350'
                }`}
              />
              <button 
                type="submit" 
                className="absolute right-3.5 top-2.5 text-gray-405 hover:text-burgundy transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* Utility Action Buttons */}
            <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
              
              {/* Mobile Search Open (Direct search query input preview toggler trigger) */}
              <button 
                onClick={() => setView('catalog')}
                className="md:hidden p-2 text-gray-600 hover:text-burgundy hover:bg-gray-50 rounded-full transition-colors"
                title="Search Store"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Icon */}
              <button
                onClick={() => handleNavClick('catalog')} 
                className="p-2 text-gray-600 hover:text-burgundy hover:bg-gray-50 rounded-full transition-colors relative"
                title="Your Wishlist"
                id="header-wishlist-btn"
              >
                <Heart className="w-5 h-5" />
                {wishCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-gold text-white text-[9px] font-sans font-bold w-4 h-4 rounded-full flex items-center justify-center shadow"
                  >
                    {wishCount}
                  </motion.span>
                )}
              </button>

              {/* Royal Cart Icon Button */}
              <button
                onClick={() => handleNavClick('cart')} 
                className="p-2.5 text-gray-600 hover:text-burgundy hover:bg-gray-50 rounded-full transition-colors relative"
                title="Your Royal Bag"
                id="header-cart-btn"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-0 right-0 bg-burgundy text-[#FFF] text-[9px] font-sans font-bold w-5 h-5 rounded-full flex items-center justify-center shadow"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>

              {/* Mobile Burger Menu Trigger */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 text-gray-600 hover:text-burgundy hover:bg-gray-50 rounded-full transition-colors"
                title="Open Menu"
              >
                <Menu className="w-5 h-5" />
              </button>

            </div>

          </div>
        </div>
      </header>

      {/* Flyout Mobile Side Navigation menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop cover overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
            />

            {/* Sliding Drawer Container */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', ease: 'easeOut', duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 max-w-sm w-full bg-white z-50 shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-gold" />
                  <span className="font-serif text-lg font-bold text-gray-900">Velvet Menu</span>
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Search input */}
              <div className="p-4 border-b border-gray-100">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <input
                    type="text"
                    placeholder="Search brand apparel..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      if (currentView !== 'catalog') setView('catalog');
                    }}
                    className="w-full bg-gray-50 border border-gray-205 text-sm rounded-lg pl-3 pr-9 py-2 outline-none focus:border-burgundy focus:bg-white"
                  />
                  <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-450" />
                </form>
              </div>

              {/* Drawer list */}
              <nav className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">
                <button 
                  onClick={() => handleNavClick('home')}
                  className={`text-left font-serif text-xl font-semibold border-b pb-2 ${
                    currentView === 'home' ? 'text-burgundy border-gold' : 'text-gray-800 border-gray-100'
                  }`}
                >
                  Home Portal
                </button>
                <button 
                  onClick={() => handleNavClick('catalog')}
                  className={`text-left font-serif text-xl font-semibold border-b pb-2 ${
                    currentView === 'catalog' ? 'text-burgundy border-gold' : 'text-gray-800 border-gray-100'
                  }`}
                >
                  The Full Catalog
                </button>
                <button 
                  onClick={() => handleNavClick('cart')}
                  className={`text-left font-serif text-xl font-semibold border-b pb-2 ${
                    currentView === 'cart' ? 'text-burgundy border-gold' : 'text-gray-800 border-gray-100'
                  }`}
                >
                  Your Royal Bag ({cartCount})
                </button>
                <button 
                  onClick={() => handleNavClick('contact')}
                  className={`text-left font-serif text-xl font-semibold border-b pb-2 ${
                    currentView === 'contact' ? 'text-burgundy border-gold' : 'text-gray-800 border-gray-100'
                  }`}
                >
                  Request Concierge
                </button>
              </nav>

              <div className="p-6 border-t border-gray-100 bg-gray-50 text-xs font-sans text-gray-550 flex flex-col gap-2">
                <p className="font-semibold text-gray-800 uppercase tracking-widest text-[9px] text-gold">Velvet Crown Guild</p>
                <p>Support Desk: +1800 572 4000 (Mon-Sat, 9AM - 8PM)</p>
                <p>Corporate Office: DLF Emporio, Vasant Kunj, New Delhi-110070</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
