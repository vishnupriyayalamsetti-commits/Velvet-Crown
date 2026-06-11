/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useMemo } from 'react';
import { useShop } from '../contexts/ShopContext';
import { ProductCard } from './ProductCard';
import { CATEGORIES, BRANDS, PRODUCTS } from '../data';
import { SlidersHorizontal, RotateCcw, X, Search, Check, Star, Sparkles, FilterX } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';

interface ShopViewProps {
  onQuickView: (product: Product) => void;
}

export const ShopView: React.FC<ShopViewProps> = ({ onQuickView }) => {
  const {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    sortBy,
    setSortBy,
    resetFilters
  } = useShop();

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filter and sort items dynamically inside memo.
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // 1. Search Query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand && !matchesDesc && !matchesCategory) {
          return false;
        }
      }

      // 2. Category
      if (filters.category !== 'All' && product.category !== filters.category) {
        return false;
      }

      // 3. Brand
      if (filters.brand !== 'All' && product.brand !== filters.brand) {
        return false;
      }

      // 4. Price range
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }

      // 5. Ratings
      if (filters.rating > 0 && product.rating < filters.rating) {
        return false;
      }

      // 6. Discount Trigger
      if (filters.discount && !product.originalPrice) {
        return false;
      }

      // 7. Availability
      if (filters.availability !== 'All') {
        if (filters.availability === 'In Stock Only' && product.availability !== 'In Stock') {
          return false;
        }
        if (filters.availability === 'Low Stock Only' && product.availability !== 'Low Stock') {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      // Sorting block
      if (sortBy === 'price-asc') {
        return a.price - b.price;
      }
      if (sortBy === 'price-desc') {
        return b.price - a.price;
      }
      if (sortBy === 'best-rated') {
        return b.rating - a.rating;
      }
      if (sortBy === 'new-arrivals') {
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      }
      // 'popular' is default (by review count or ratings composite)
      return b.reviewsCount - a.reviewsCount;
    });
  }, [searchQuery, filters, sortBy]);

  const handlePriceSlide = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = parseInt(e.target.value);
    setFilters((prev) => ({ ...prev, priceRange: [prev.priceRange[0], newVal] }));
  };

  const handleRatingFilter = (r: number) => {
    setFilters((prev) => ({ ...prev, rating: prev.rating === r ? 0 : r }));
  };

  const handleDiscountToggle = () => {
    setFilters((prev) => ({ ...prev, discount: !prev.discount }));
  };

  const rupeeFormatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 bg-soft-bg min-h-screen">
      
      {/* 5.1 Intro Headings Banner */}
      <div className="mb-8 border-b border-gray-100 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-gray-900 tracking-tight">
            The Velvet Atelier Shop
          </h1>
          <p className="font-sans text-xs sm:text-sm text-gray-500 mt-1 max-w-lg">
            Immerse yourself in our complete royal collection. Use advanced filtering to curate accessories tailored to your personal aesthetic.
          </p>
        </div>
        
        {/* Dynamic Items Counter Badge */}
        <div className="bg-burgundy/5 text-burgundy text-xs font-sans font-bold px-3 py-1.5 rounded-lg border border-burgundy/10 shrink-0 self-start md:self-center">
          Showing <span className="text-gold font-extrabold">{filteredProducts.length}</span> luxury treasures
        </div>
      </div>

      {/* Control Actions Row (Search, Sorting, Filter button) */}
      <div className="bg-white p-4 rounded-xl border border-gray-150 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        {/* Direct on-page catalog search frame */}
        <div className="relative w-full sm:max-w-sm">
          <input
            type="text"
            placeholder="Search within this catalog..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 text-xs sm:text-sm rounded-lg pl-9 pr-4 py-2.5 outline-none focus:border-burgundy focus:bg-white transition-all shadow-inner"
          />
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 text-[10px] font-sans font-bold text-gray-400 hover:text-gray-950 px-1 hover:bg-gray-150 rounded"
            >
              Clear
            </button>
          )}
        </div>

        {/* Desktop Controls (Sort & Mobile filter togglers) */}
        <div className="flex items-center gap-3 w-full sm:w-auto shrink-0 justify-between sm:justify-end">
          
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden flex items-center justify-center gap-2 border border-gray-200 hover:border-burgundy px-4 py-2.5 rounded-lg text-xs font-sans font-bold text-gray-800 bg-white shadow-sm transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Refine Custom Filters</span>
          </button>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-sans font-bold text-gray-500 uppercase tracking-widest hidden sm:inline">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-gray-200 text-xs sm:text-sm rounded-lg px-3 py-2.5 outline-none font-sans text-gray-850 focus:border-burgundy"
            >
              <option value="popular">Popular Picks</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="best-rated">Top Rated Royal Items</option>
              <option value="new-arrivals">New Arrivals Lookbook</option>
            </select>
          </div>

        </div>
      </div>

      {/* Main Core Columns Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* LEFT COLUMN: DESKTOP FLOATING FILTER PANEL */}
        <aside className="hidden lg:block space-y-6 shrink-0 z-10 self-start">
          <div className="bg-white rounded-xl border border-gray-150 p-6 shadow-sm space-y-6">
            
            {/* Header row */}
            <div className="flex items-center justify-between border-b pb-4 border-gray-100">
              <div className="flex items-center gap-2 text-gray-900">
                <SlidersHorizontal className="w-4 h-4 text-burgundy" />
                <h3 className="font-serif text-base font-bold">Select Filters</h3>
              </div>
              <button
                onClick={resetFilters}
                className="text-xs font-sans text-gold hover:text-burgundy font-bold flex items-center gap-1 transition-colors"
                title="Reset all inputs"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Filter Category Block */}
            <div className="space-y-2.5">
              <span className="text-xs font-sans font-bold text-gray-900 uppercase tracking-wider block">
                Departments
              </span>
              <div className="flex flex-col gap-1.5">
                <button
                  onClick={() => setFilters((prev) => ({ ...prev, category: 'All' }))}
                  className={`text-left text-xs font-sans py-1 rounded transition-colors flex justify-between items-center ${
                    filters.category === 'All' 
                      ? 'text-burgundy font-bold pl-1 border-l-2 border-burgundy' 
                      : 'text-gray-600 hover:text-burgundy'
                  }`}
                >
                  <span>All Catalog Collections</span>
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilters((prev) => ({ ...prev, category: cat }))}
                    className={`text-left text-xs font-sans py-1 rounded transition-colors flex justify-between items-center ${
                      filters.category === cat 
                        ? 'text-burgundy font-bold pl-1 border-l-2 border-burgundy' 
                        : 'text-gray-600 hover:text-burgundy'
                    }`}
                  >
                    <span>{cat}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Max Slider Block */}
            <div className="space-y-3.5 border-t border-gray-100 pt-4">
              <div className="flex justify-between items-center text-xs font-sans font-bold text-gray-950 uppercase tracking-wider">
                <span>Maximum Price</span>
                <span className="text-burgundy text-sm font-extrabold">{rupeeFormatter.format(filters.priceRange[1])}</span>
              </div>
              <input
                type="range"
                min="0"
                max="25000"
                step="500"
                value={filters.priceRange[1]}
                onChange={handlePriceSlide}
                className="w-full accent-burgundy h-1 bg-gray-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-sans text-gray-400">
                <span>₹0</span>
                <span>₹25,000</span>
              </div>

              {/* Quick Budget Filters */}
              <div className="space-y-1.5 pt-2">
                <span className="text-[10px] font-sans font-bold text-gray-400 uppercase tracking-wider block">Quick Budgets</span>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setFilters((prev) => ({ ...prev, priceRange: [0, 2000] }))}
                    className={`text-[10px] font-sans font-bold px-2 py-1 border transition-colors cursor-pointer ${
                      filters.priceRange[1] === 2000
                        ? 'bg-burgundy text-white border-burgundy'
                        : 'bg-gray-50 text-gray-700 hover:border-burgundy hover:text-burgundy border-gray-200'
                    }`}
                  >
                    Under ₹2,000
                  </button>
                  <button
                    onClick={() => setFilters((prev) => ({ ...prev, priceRange: [0, 5000] }))}
                    className={`text-[10px] font-sans font-bold px-2 py-1 border transition-colors cursor-pointer ${
                      filters.priceRange[1] === 5000
                        ? 'bg-burgundy text-white border-burgundy'
                        : 'bg-gray-50 text-gray-700 hover:border-burgundy hover:text-burgundy border-gray-200'
                    }`}
                  >
                    Under ₹5,000
                  </button>
                  <button
                    onClick={() => setFilters((prev) => ({ ...prev, priceRange: [0, 25000] }))}
                    className={`text-[10px] font-sans font-bold px-2 py-1 border transition-colors cursor-pointer ${
                      filters.priceRange[1] === 25000
                        ? 'bg-burgundy text-white border-burgundy'
                        : 'bg-gray-50 text-gray-700 hover:border-burgundy hover:text-burgundy border-gray-200'
                    }`}
                  >
                    Show All
                  </button>
                </div>
              </div>
            </div>

            {/* Brand Filter */}
            <div className="space-y-2.5 border-t border-gray-100 pt-4">
              <span className="text-xs font-sans font-bold text-gray-900 uppercase tracking-wider block">
                Brand Atelier
              </span>
              <div className="flex flex-col gap-1.5">
                <button
                  onClick={() => setFilters((prev) => ({ ...prev, brand: 'All' }))}
                  className={`text-left text-xs font-sans py-1 rounded transition-colors flex justify-between items-center ${
                    filters.brand === 'All' 
                      ? 'text-burgundy font-bold pl-1 border-l-2 border-burgundy' 
                      : 'text-gray-600 hover:text-burgundy'
                  }`}
                >
                  <span>All Brands</span>
                </button>
                {BRANDS.map((br) => (
                  <button
                    key={br}
                    onClick={() => setFilters((prev) => ({ ...prev, brand: br }))}
                    className={`text-left text-xs font-sans py-1 rounded transition-colors flex justify-between items-center ${
                      filters.brand === br 
                        ? 'text-burgundy font-bold pl-1 border-l-2 border-burgundy' 
                        : 'text-gray-600 hover:text-burgundy'
                    }`}
                  >
                    <span>{br}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Ratings Filter */}
            <div className="space-y-2.5 border-t border-gray-100 pt-4">
              <span className="text-xs font-sans font-bold text-gray-900 uppercase tracking-wider block">
                Customer Rating
              </span>
              <div className="flex flex-col gap-1.5">
                {[5, 4, 3].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleRatingFilter(num)}
                    className="flex items-center gap-2 text-xs font-sans text-gray-600 hover:text-burgundy text-left"
                  >
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                      filters.rating === num ? 'border-burgundy bg-burgundy text-white' : 'border-gray-200 bg-white'
                    }`}>
                      {filters.rating === num && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <div className="flex items-center gap-0.5 text-amber-500">
                      {Array.from({ length: 5 }).map((_, stIdx) => (
                        <Star key={stIdx} className={`w-3.5 h-3.5 ${stIdx < num ? 'fill-current' : 'text-gray-200'}`} />
                      ))}
                    </div>
                    <span className="text-gray-500 text-[11px] font-medium">{num === 5 ? 'Only perfect 5★' : `Over ${num}★ stars`}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Special Perks (Discounts and Availability) */}
            <div className="space-y-3 border-t border-gray-100 pt-5">
              <span className="text-xs font-sans font-bold text-gray-900 uppercase tracking-wider block">
                Product Privileges
              </span>
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleDiscountToggle}
                  className="flex items-center gap-2 text-xs font-sans text-gray-600 hover:text-burgundy text-left"
                >
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                    filters.discount ? 'border-burgundy bg-burgundy text-white' : 'border-gray-200 bg-white'
                  }`}>
                    {filters.discount && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span className="font-medium text-gray-700">Special Promo Discounted Only</span>
                </button>

                <div className="flex flex-col gap-1.5 mt-1.5">
                  <span className="text-[10px] font-sans font-bold text-gray-400 uppercase tracking-wider block">Availability</span>
                  {['All', 'In Stock Only', 'Low Stock Only'].map((avail) => (
                    <button
                      key={avail}
                      onClick={() => setFilters((prev) => ({ ...prev, availability: avail }))}
                      className={`text-left text-xs font-sans py-1 rounded transition-colors flex justify-between items-center ${
                        filters.availability === avail 
                          ? 'text-burgundy font-bold pl-1 border-l-2 border-burgundy' 
                          : 'text-gray-600 hover:text-burgundy'
                      }`}
                    >
                      {avail}
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </aside>

        {/* RIGHT COLUMN: PRODUCTS LISTINGS GRID */}
        <main className="lg:col-span-3">
          <AnimatePresence mode="popLayout">
            {filteredProducts.length > 0 ? (
              <motion.div 
                layout 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
              >
                {filteredProducts.map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    onQuickView={onQuickView}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-white rounded-xl border border-gray-150 p-12 text-center max-w-lg mx-auto flex flex-col items-center gap-5 shadow-sm mt-8"
                id="empty-search-results"
              >
                <div className="w-14 h-14 rounded-full bg-burgundy/5 text-burgundy flex items-center justify-center border border-burgundy/10">
                  <FilterX className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-serif text-lg font-bold text-gray-900">No Velvet Treasures Found</h3>
                  <p className="font-sans text-xs sm:text-sm text-gray-500 leading-relaxed max-w-sm">
                    No items in our current warehouse match your custom filters. Adjust your inputs or search to discover active items.
                  </p>
                </div>
                <button
                  onClick={resetFilters}
                  className="bg-burgundy hover:bg-burgundy-hover text-white text-xs sm:text-sm font-sans font-bold uppercase tracking-wider px-6 py-2.5 rounded-lg cursor-pointer shadow transition-colors mt-2"
                >
                  Clear All Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

      </div>

      {/* FLYOUT DRAWER FOR PHONE FILTERS */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFiltersOpen(false)}
              className="fixed inset-0 bg-black/60 z-50 backdrop-blur-xs lg:hidden"
            />
            
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', ease: 'easeOut', duration: 0.3 }}
              className="fixed left-0 top-0 bottom-0 max-w-xs w-full bg-white z-50 shadow-2xl p-6 overflow-y-auto flex flex-col justify-between lg:hidden"
            >
              <div>
                <div className="flex items-center justify-between border-b pb-4 mb-5 border-gray-100">
                  <span className="font-serif text-base font-bold text-gray-900 flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-burgundy" />
                    <span>Refine Selection</span>
                  </span>
                  <button 
                    onClick={() => setMobileFiltersOpen(false)}
                    className="p-1 px-2 border border-gray-100 text-xs font-bold text-gray-500 rounded hover:bg-gray-50"
                  >
                    Close
                  </button>
                </div>

                {/* Categories */}
                <div className="space-y-2 mb-6">
                  <span className="text-xs font-sans font-bold text-gray-900 uppercase tracking-wider block">Departments</span>
                  <div className="grid grid-cols-1 gap-1">
                    <button
                      onClick={() => setFilters((prev) => ({ ...prev, category: 'All' }))}
                      className={`text-left text-xs font-sans py-1.5 px-2 rounded ${
                        filters.category === 'All' ? 'bg-burgundy text-white font-bold' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      All collections
                    </button>
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setFilters((prev) => ({ ...prev, category: cat }))}
                        className={`text-left text-xs font-sans py-1.5 px-2 rounded ${
                          filters.category === cat ? 'bg-burgundy text-white font-bold' : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Brands */}
                <div className="space-y-2 mb-6">
                  <span className="text-xs font-sans font-bold text-gray-900 uppercase tracking-wider block">Brand Atelier</span>
                  <div className="grid grid-cols-1 gap-1">
                    <button
                      onClick={() => setFilters((prev) => ({ ...prev, brand: 'All' }))}
                      className={`text-left text-xs font-sans py-1.5 px-2 rounded ${
                        filters.brand === 'All' ? 'bg-burgundy text-white font-bold' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      All Brands
                    </button>
                    {BRANDS.map((br) => (
                      <button
                        key={br}
                        onClick={() => setFilters((prev) => ({ ...prev, brand: br }))}
                        className={`text-left text-xs font-sans py-1.5 px-2 rounded ${
                          filters.brand === br ? 'bg-burgundy text-white font-bold' : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {br}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price max slider */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center text-xs font-sans font-bold text-gray-950 uppercase tracking-wider">
                    <span>Max Price</span>
                    <span className="text-burgundy text-sm font-extrabold">{rupeeFormatter.format(filters.priceRange[1])}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="25000"
                    step="500"
                    value={filters.priceRange[1]}
                    onChange={handlePriceSlide}
                    className="w-full accent-burgundy h-1 bg-gray-200 rounded-lg cursor-pointer"
                  />

                  {/* Mobile Quick Budgets */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-sans font-bold text-gray-400 uppercase tracking-wider block">Quick Budgets</span>
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        onClick={() => setFilters((prev) => ({ ...prev, priceRange: [prev.priceRange[0], 2000] }))}
                        className={`text-[10px] font-sans font-bold px-2 py-1 border transition-colors cursor-pointer ${
                          filters.priceRange[1] === 2000
                            ? 'bg-burgundy text-white border-burgundy'
                            : 'bg-white text-gray-700 border-gray-200'
                        }`}
                      >
                        Under ₹2,000
                      </button>
                      <button
                        onClick={() => setFilters((prev) => ({ ...prev, priceRange: [prev.priceRange[0], 5000] }))}
                        className={`text-[10px] font-sans font-bold px-2 py-1 border transition-colors cursor-pointer ${
                          filters.priceRange[1] === 5000
                            ? 'bg-burgundy text-white border-burgundy'
                            : 'bg-white text-gray-700 border-gray-200'
                        }`}
                      >
                        Under ₹5,000
                      </button>
                      <button
                        onClick={() => setFilters((prev) => ({ ...prev, priceRange: [prev.priceRange[0], 25000] }))}
                        className={`text-[10px] font-sans font-bold px-2 py-1 border transition-colors cursor-pointer ${
                          filters.priceRange[1] === 25000
                            ? 'bg-burgundy text-white border-burgundy'
                            : 'bg-white text-gray-700 border-gray-200'
                        }`}
                      >
                        Show All
                      </button>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="space-y-3 mb-6">
                  <span className="text-xs font-sans font-bold text-gray-900 uppercase tracking-wider block">Customer Rating</span>
                  <div className="flex flex-col gap-2">
                    {[5, 4, 3].map((num) => (
                      <button
                        key={num}
                        onClick={() => handleRatingFilter(num)}
                        className="flex items-center gap-2 text-xs font-sans text-gray-600 text-left"
                      >
                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                          filters.rating === num ? 'border-burgundy bg-burgundy text-white' : 'border-gray-200'
                        }`}>
                          {filters.rating === num && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <div className="flex items-center gap-0.5 text-amber-500">
                          {Array.from({ length: 5 }).map((_, sIdx) => (
                            <Star key={sIdx} className={`w-3.5 h-3.5 ${sIdx < num ? 'fill-current' : 'text-gray-200'}`} />
                          ))}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Discount */}
                <div className="space-y-3 mb-6">
                  <span className="text-xs font-sans font-bold text-gray-900 uppercase tracking-wider block">Product Privileges</span>
                  <button
                    onClick={handleDiscountToggle}
                    className="flex items-center gap-2 text-xs font-sans text-gray-600 text-left"
                  >
                    <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                      filters.discount ? 'border-burgundy bg-burgundy text-white' : 'border-gray-200'
                    }`}>
                      {filters.discount && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span className="font-semibold text-gray-800">Discounted Only</span>
                  </button>
                </div>

              </div>

              <div className="pt-4 border-t border-gray-150 flex gap-2">
                <button
                  onClick={resetFilters}
                  className="flex-1 border text-center text-xs py-2.5 rounded-lg font-bold font-sans hover:bg-gray-50 transition-colors"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="flex-1 bg-burgundy hover:bg-burgundy-hover text-white text-center text-xs py-2.5 rounded-lg font-bold font-sans transition-colors"
                >
                  Show Results
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
};
