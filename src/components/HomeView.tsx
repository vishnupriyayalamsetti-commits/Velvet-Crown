/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState } from 'react';
import { useShop } from '../contexts/ShopContext';
import { PRODUCTS, WHY_CHOOSE_US } from '../data';
import { ProductCard } from './ProductCard';
import { CountdownTimer } from './CountdownTimer';
import { ArrowRight, Sparkles, Mail, ShieldCheck, Truck, RefreshCw, Send, ChevronLeft, ChevronRight, Crown } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';

interface HomeViewProps {
  onQuickView: (product: Product) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onQuickView }) => {
  const { setView, setFilters, addToast } = useShop();
  const [emailInput, setEmailInput] = useState('');
  
  // New Arrivals slide scroll state
  const newArrivals = PRODUCTS.filter((p) => p.isNew);
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller);

  // Category listing map
  const categoriesMap = [
    { name: 'Dresses', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80' },
    { name: 'Bangles', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=600&q=80' },
    { name: 'Women’s Fashion', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80' },
    { name: 'Men’s Fashion', image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=600&q=80' },
    { name: 'Bags', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80' },
    { name: 'Jewelry', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80' },
    { name: 'Watches', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=600&q=80' },
    { name: 'Accessories', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80' }
  ];

  const handleCategoryClick = (catName: string) => {
    setFilters((prev) => ({ ...prev, category: catName }));
    setView('catalog');
  };

  const handleSubscribeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim() || !emailInput.includes('@')) {
      addToast('Please enter a valid royal coordinates email', 'error');
      return;
    }
    addToast('Success! Custom 10% voucher code [WELCOMECROWN] sent to your inbox.', 'success');
    setEmailInput('');
  };

  return (
    <div className="space-y-16 sm:space-y-24 bg-soft-bg pb-20">
      
      {/* 5.1 Hero Banner Section */}
      <section className="relative overflow-hidden bg-black py-20 sm:py-28 lg:py-36 min-h-[500px] sm:min-h-[600px] flex items-center">
        {/* Underlay banner generated image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/velvet_crown_hero_banner_1781160683632.png"
            alt="Velvet Crown Campaign Hero"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-60 mix-blend-luminosity scale-102 filter blur-[1px]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-900/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 backdrop-blur-md border border-white/10 select-none text-[10px] uppercase font-sans font-bold text-gold tracking-[0.3em]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE ROYAL COLLECTION • ATELIER</span>
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl italic leading-[1.1] text-[#FAFAFA] tracking-tight">
              Elevate Your <br/> <span className="not-italic font-bold text-white">Style.</span>
            </h1>

            <p className="font-sans text-xs sm:text-sm text-gray-300 leading-relaxed max-w-sm font-light">
              Discover curated luxury accessories, fine-tailor apparel, and sovereign ornaments crafted exclusively for modern elegance and timeless identity. 
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => {
                  setFilters((prev) => ({ ...prev, category: 'All' }));
                  setView('catalog');
                }}
                className="bg-burgundy hover:bg-[#5a162a] text-white px-8 py-3.5 text-xs font-bold tracking-widest uppercase cursor-pointer flex items-center justify-center gap-2 transition-luxury"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              
              <button
                onClick={() => {
                  setFilters((prev) => ({ ...prev, category: 'All' }));
                  setView('catalog');
                }}
                className="bg-transparent hover:bg-white/10 text-white border border-white/20 px-8 py-3.5 text-xs font-bold tracking-widest uppercase cursor-pointer flex items-center justify-center transition-colors"
              >
                Explore Lookbook
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5.2 Featured Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="featured-categories">
        <div className="text-center space-y-3 mb-10">
          <div className="text-xs font-sans text-gold font-bold uppercase tracking-[0.2em]">Crowned Portals</div>
          <h2 className="font-serif text-3xl font-bold text-gray-900 tracking-tight">Featured Categories</h2>
          <div className="h-1 w-12 bg-burgundy mx-auto mt-2 rounded"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-6">
          {categoriesMap.map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -5 }}
              onClick={() => handleCategoryClick(cat.name)}
              className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-gray-150 shadow-sm hover:shadow-md hover:border-burgundy/10 transition-all flex flex-col items-center"
            >
              <div className="w-full aspect-square overflow-hidden bg-gray-50 relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-4 text-center w-full bg-white">
                <span className="font-serif text-sm font-bold text-gray-800 group-hover:text-burgundy transition-colors block leading-tight">
                  {cat.name}
                </span>
                <span className="text-[10px] font-sans text-gold font-semibold uppercase tracking-wider block mt-1 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                  Browse Now &rarr;
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5.3 Best Sellers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="best-sellers">
        <div className="flex flex-col sm:flex-row justify-between items-baseline mb-10 gap-4 border-b border-gray-100 pb-4">
          <div className="text-left space-y-1.5">
            <span className="text-xs font-sans text-[#BCA02E] font-bold uppercase tracking-[0.2em] block">Sovereign Favourites</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Best Sellers Selection</h2>
          </div>
          <button
            onClick={() => {
              setFilters((prev) => ({ ...prev, category: 'All' }));
              setView('catalog');
            }}
            className="text-xs sm:text-sm font-sans font-bold text-burgundy hover:text-burgundy-hover flex items-center gap-1 group transition-colors cursor-pointer"
          >
            <span>See entire library</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {bestSellers.map((prod) => (
            <ProductCard 
              key={prod.id} 
              product={prod} 
              onQuickView={onQuickView} 
            />
          ))}
        </div>
      </section>

      {/* 5.5 Offers / Seasonal Sales Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-burgundy to-[#4C1021] rounded-2xl overflow-hidden shadow-xl border border-burgundy-hover text-white relative py-12 px-6 sm:px-12 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-12">
          {/* Subtle logo underlay background */}
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none select-none translate-y-10 translate-x-10">
            <Crown className="w-80 h-80 text-gold" />
          </div>

          <div className="space-y-5 flex-1 relative z-10 max-w-xl text-center md:text-left">
            <div className="inline-block bg-gold text-[#4C1021] text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full shadow">
              FLASH GOLD SEASONAL EVENT
            </div>
            
            <h3 className="font-serif text-3xl sm:text-4xl font-bold leading-tight text-white tracking-tight">
              Velvet Royal Spring Gala:<br />
              <span className="text-gold">Flat 40% OFF</span> on Atelier Suits & Collection
            </h3>
            
            <p className="font-sans text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
              Add your highly desired coats, jewelry accents, or velvet handstitched blazers before quantities run out. Complete checkout instantly with complimentary express insured dispatch.
            </p>

            {/* Countdown widget */}
            <div className="pt-2">
              <span className="text-xs uppercase font-sans tracking-[0.2em] mb-2 block font-semibold text-gold/80">REMAINING TICKING WINDOW</span>
              <CountdownTimer />
            </div>
          </div>

          <div className="shrink-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 text-center space-y-4 max-w-sm w-full relative z-10">
            <span className="text-xs font-sans text-gold font-bold tracking-widest uppercase block">USE EXCLUSIVE PROMO CODE</span>
            <div className="text-3xl sm:text-4xl font-mono font-extrabold bg-[#3c0917]/70 py-4 px-6 border-2 border-dashed border-gold/40 rounded-xl tracking-[0.1em] text-white">
              VELVET40
            </div>
            <p className="text-[11px] font-sans text-gray-300">
              Apply this coupon code in your cart drawer to capture an automatic 40% reduction off standard premium prices!
            </p>
            <button
              onClick={() => {
                setFilters((prev) => ({ ...prev, category: 'All' }));
                setView('catalog');
              }}
              className="w-full bg-gold hover:bg-gold-hover text-[#4F1225] py-3 rounded-lg text-xs font-sans font-bold uppercase tracking-wider shadow transition-colors"
            >
              SHOP EXCLUSIVE ITEMS NOW
            </button>
          </div>
        </div>
      </section>

      {/* 5.4 New Arrivals Slides Collection */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden" id="new-arrivals">
        <div className="flex flex-col sm:flex-row justify-between items-baseline mb-10 gap-4 border-b border-gray-100 pb-4">
          <div className="text-left space-y-1.5">
            <span className="text-xs font-sans text-[#BCA02E] font-bold uppercase tracking-[0.2em] block">Fresh Additions</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">The New Arrivals Lookbook</h2>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => {
                const el = document.getElementById('new-arrivals-scroll-box');
                if (el) el.scrollBy({ left: -320, behavior: 'smooth' });
              }}
              className="p-2 border border-gray-200 rounded-full hover:border-[#D4AF37] hover:text-[#7A1E3A] transition-colors bg-white text-gray-500 shadow-sm"
              title="Scroll Left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={() => {
                const el = document.getElementById('new-arrivals-scroll-box');
                if (el) el.scrollBy({ left: 320, behavior: 'smooth' });
              }}
              className="p-2 border border-gray-200 rounded-full hover:border-[#D4AF37] hover:text-[#7A1E3A] transition-colors bg-white text-gray-500 shadow-sm"
              title="Scroll Right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scroll Box container wrapper */}
        <div 
          id="new-arrivals-scroll-box"
          className="flex gap-6 sm:gap-8 overflow-x-auto pb-6 scrollbar-thin snap-x scroll-smooth -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
        >
          {newArrivals.map((prod) => (
            <div key={prod.id} className="min-w-[280px] sm:min-w-[320px] max-w-[320px] snap-start flex-1">
              <ProductCard 
                product={prod} 
                onQuickView={onQuickView} 
              />
            </div>
          ))}
        </div>
      </section>

      {/* 5.6 Why Choose Velvet Crown Section */}
      <section className="bg-gray-50 py-16 sm:py-20 border-y border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12 sm:mb-16">
            <span className="text-xs font-sans text-[#BCA02E] font-bold uppercase tracking-[0.2em] block">OUR CORE VOWS</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Why Choose Velvet Crown</h2>
            <div className="h-1 w-12 bg-burgundy mx-auto mt-2 rounded"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {WHY_CHOOSE_US.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: idx * 0.04 }}
                className="bg-white p-6 sm:p-8 rounded-xl border border-gray-150 shadow-sm hover:shadow-[0_8px_20px_rgba(0,0,0,0.03)] hover:border-gold/30 transition-all flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-full shrink-0 bg-gold/10 text-gold flex items-center justify-center font-bold font-serif shadow-inner">
                  {idx + 1}
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-serif text-base font-bold text-gray-900 leading-snug">
                    {item.title}
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-gray-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5.7 Newsletter subscription Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-[#FFF] border border-gray-150 rounded-2xl overflow-hidden p-8 sm:p-12 shadow-lg text-center flex flex-col items-center gap-6">
          {/* Subtle gold decoration corners */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold m-4 rounded" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold m-4 rounded" />

          <div className="w-12 h-12 rounded-full bg-burgundy text-[#FFF] flex items-center justify-center shadow-md">
            <Mail className="w-6 h-6" />
          </div>

          <div className="space-y-2 max-w-lg">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
              Join the Royal Registry
            </h3>
            <p className="font-sans text-xs sm:text-sm text-gray-500 leading-relaxed">
              Register your name to receive personal alerts regarding limited product drops, private sales, and earn an immediate <span className="font-bold text-burgundy">10% OFF coupon</span> for your upcoming acquisition.
            </p>
          </div>

          <form onSubmit={handleSubscribeSubmit} className="max-w-md w-full flex flex-col sm:flex-row gap-3 mt-2">
            <input
              type="email"
              placeholder="Enter your email coordinates..."
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="flex-1 bg-gray-50 border border-gray-250 rounded-lg px-4 py-3 text-xs sm:text-sm outline-none font-sans text-gray-900 focus:border-burgundy focus:bg-white transition-all shadow-inner"
              required
            />
            <button
              type="submit"
              className="bg-burgundy hover:bg-burgundy-hover text-white text-xs sm:text-sm font-sans font-bold uppercase tracking-wider px-6 py-3 rounded-lg cursor-pointer flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
              <span>Subscribe</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          <span className="text-[10px] uppercase font-sans text-gold font-bold tracking-widest block opacity-75">
            YOUR PRIVACY IS SECURED PRIVATELY WITH US. NO JUNK MAIL GUARANTEE.
          </span>
        </div>
      </section>

    </div>
  );
};
