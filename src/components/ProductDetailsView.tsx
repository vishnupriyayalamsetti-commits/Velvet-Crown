/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useEffect, useMemo } from 'react';
import { useShop } from '../contexts/ShopContext';
import { ProductCard } from './ProductCard';
import { PRODUCTS } from '../data';
import { Star, Plus, Minus, ShoppingCart, Heart, Send, Sparkles, Award, ShieldCheck, Truck, ArrowLeft, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';

interface ProductDetailsProps {
  onQuickView: (product: Product) => void;
}

export const ProductDetailsView: React.FC<ProductDetailsProps> = ({ onQuickView }) => {
  const {
    selectedProduct,
    setView,
    addToCart,
    wishlist,
    toggleWishlist,
    addReviewToProduct,
    addToast
  } = useShop();

  const [activeImage, setActiveImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'care'>('details');

  // Zoom Effect States
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);

  // New review state
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  // Reset states when the selected product changes
  useEffect(() => {
    if (selectedProduct) {
      setActiveImage(selectedProduct.images[0]);
      if (selectedProduct.details.size && selectedProduct.details.size.length > 0) {
        setSelectedSize(selectedProduct.details.size[0]);
      } else {
        setSelectedSize('One Size');
      }
      setQuantity(1);
      setActiveTab('details');
      
      // Reset review form
      setReviewName('');
      setReviewRating(5);
      setReviewComment('');
    }
  }, [selectedProduct]);

  const relatedProducts = useMemo(() => {
    if (!selectedProduct) return [];
    return PRODUCTS.filter(
      (p) => p.category === selectedProduct.category && p.id !== selectedProduct.id
    ).slice(0, 4);
  }, [selectedProduct]);

  if (!selectedProduct) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500 text-sm">Please select a product from the collection.</p>
        <button onClick={() => setView('catalog')} className="bg-burgundy text-white px-6 py-2 rounded-lg mt-4 text-xs font-sans font-bold">
          See Catalog
        </button>
      </div>
    );
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity, selectedSize);
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, quantity, selectedSize);
    setView('cart');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim()) {
      addToast('Please enter your signature name', 'error');
      return;
    }
    if (!reviewComment.trim()) {
      addToast('Please leave written review commentary', 'error');
      return;
    }

    addReviewToProduct(selectedProduct.id, {
      userName: reviewName.trim(),
      rating: reviewRating,
      comment: reviewComment.trim()
    });

    // Clear form
    setReviewName('');
    setReviewRating(5);
    setReviewComment('');
  };

  const isWishlisted = wishlist.includes(selectedProduct.id);
  const discountPercent = selectedProduct.originalPrice
    ? Math.round(((selectedProduct.originalPrice - selectedProduct.price) / selectedProduct.originalPrice) * 100)
    : 0;

  const rupeeFormatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 bg-soft-bg space-y-16 sm:space-y-24">
      
      {/* Back to Products navigation button */}
      <div className="flex justify-between items-center pb-4 border-b border-gray-150">
        <button
          onClick={() => setView('catalog')}
          className="flex items-center gap-2 text-xs sm:text-sm font-sans font-bold text-gray-600 hover:text-burgundy transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform" />
          <span>Back to entire collection catalog</span>
        </button>
        <span className="text-[10px] uppercase font-sans font-bold text-gray-400 tracking-wider">
          ATELIER SPECIFICATION OVERVIEW
        </span>
      </div>

      {/* CORE INFO SUBGRID (Images on left, controls details on right) */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 leading-relaxed">
        
        {/* LEFT COLUMN: Zoom lens gallery image display */}
        <div className="space-y-4">
          <div 
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsZooming(true)}
            onMouseLeave={() => setIsZooming(false)}
            className="aspect-[4/5] bg-gray-50 rounded-2xl overflow-hidden relative cursor-zoom-in border border-gray-200/50 shadow-sm"
          >
            <img
              src={activeImage || selectedProduct.images[0]}
              alt={selectedProduct.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-100 ease-out"
              style={{
                transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                transform: isZooming ? 'scale(1.9)' : 'scale(1)'
              }}
            />
            
            {/* Soft badge over image */}
            <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-white text-[10px] font-sans">
              <Eye className="w-3.5 h-3.5" />
              <span>Hover canvas to zoom fiber textures</span>
            </div>

            {discountPercent > 0 && (
              <span className="absolute top-4 left-4 bg-rose-pink text-white font-sans text-xs font-extrabold px-3 py-1 rounded-lg shadow">
                Flat {discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Thumbnail Selectors gallery row */}
          {selectedProduct.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto py-1">
              {selectedProduct.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(img)}
                  className={`w-16 sm:w-20 aspect-[4/5] bg-gray-50 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                    activeImage === img ? 'border-burgundy scale-95 shadow-sm' : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${selectedProduct.name} alternative thumbnail ${index}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Selection details dashboard */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Brand Category Tag */}
            <div className="text-xs uppercase font-sans font-semibold tracking-[0.2em] text-[#BCA02E] flex items-center gap-2">
              <span>{selectedProduct.brand}</span>
              <span>•</span>
              <span className="text-gray-400 font-medium lowercase">{selectedProduct.category}</span>
            </div>

            {/* Title heading */}
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
              {selectedProduct.name}
            </h1>

            {/* Ratings and availability badge */}
            <div className="flex flex-wrap items-center gap-4 border-b border-gray-100 pb-4">
              <div className="flex items-center gap-1.5">
                <div className="flex items-center text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(selectedProduct.rating) ? 'fill-current' : 'text-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-sans font-semibold text-gray-800">
                  {selectedProduct.rating.toFixed(1)}
                </span>
                <span className="text-xs font-sans text-gray-400">
                  ({selectedProduct.reviewsCount} verified royal reviews)
                </span>
              </div>

              <span>|</span>

              <span className={`text-xs font-sans font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                selectedProduct.availability === 'In Stock' 
                  ? 'bg-emerald-50 text-emerald-700' 
                  : selectedProduct.availability === 'Low Stock'
                  ? 'bg-amber-50 text-amber-700'
                  : 'bg-rose-50 text-rose-700'
              }`}>
                {selectedProduct.availability}
              </span>
            </div>

            {/* Price Box */}
            <div className="bg-white p-4 rounded-xl border border-gray-150 shadow-sm flex items-baseline gap-4">
              <span className="text-2xl sm:text-3xl font-sans font-extrabold text-burgundy">
                {rupeeFormatter.format(selectedProduct.price)}
              </span>
              {selectedProduct.originalPrice && (
                <>
                  <span className="text-base font-sans text-gray-400 line-through">
                    {rupeeFormatter.format(selectedProduct.originalPrice)}
                  </span>
                  <span className="text-xs font-sans font-bold text-[#E11D48] bg-rose-50 border border-rose-100 px-2 py-0.5 rounded">
                    Saves {rupeeFormatter.format(selectedProduct.originalPrice - selectedProduct.price)} ({discountPercent}% Reduction)
                  </span>
                </>
              )}
            </div>

            {/* Description Body */}
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans">
              {selectedProduct.description}
            </p>

            {/* Sizing Select */}
            {selectedProduct.details.size && selectedProduct.details.size.length > 0 && (
              <div className="space-y-2 pt-2">
                <div className="flex justify-between items-center text-xs font-sans font-bold text-gray-800 uppercase tracking-wider">
                  <span>Selected Size</span>
                  <span className="text-gold tracking-widest text-[10px]">STANDARD HEIGHT</span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {selectedProduct.details.size.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`min-w-[44px] h-11 px-3.5 rounded-lg border text-xs sm:text-sm font-sans font-bold transition-all ${
                        selectedSize === sz
                          ? 'border-burgundy bg-burgundy text-white shadow-md shadow-burgundy/15 scale-95'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-800 bg-white'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Controller & Purchasing Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 border-t border-gray-100">
              
              {/* Quantity controller */}
              <div className="flex items-center justify-between border border-gray-250 bg-white rounded-lg overflow-hidden shrink-0 h-12">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-3.5 hover:bg-gray-50 text-gray-600 transition-colors cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-5 text-sm font-sans font-bold text-gray-900 select-none">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-3.5 hover:bg-gray-50 text-gray-600 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add and buy buttons */}
              <div className="flex-1 flex gap-3 h-12">
                <button
                  onClick={handleAddToCart}
                  disabled={selectedProduct.availability === 'Out of Stock'}
                  className="flex-1 bg-white hover:bg-gray-50 text-burgundy border border-burgundy/20 hover:border-burgundy py-3 rounded-lg text-xs sm:text-sm font-sans font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={selectedProduct.availability === 'Out of Stock'}
                  className="flex-1 bg-burgundy hover:bg-burgundy-hover text-white py-3 rounded-lg text-xs sm:text-sm font-sans font-bold flex items-center justify-center gap-2 cursor-pointer transition-luxury shadow shadow-burgundy/10"
                >
                  <span>Buy Safely Now</span>
                </button>
              </div>

              {/* Wishlist Icon */}
              <button
                onClick={() => toggleWishlist(selectedProduct.id)}
                className={`w-12 h-12 rounded-lg border flex items-center justify-center cursor-pointer transition-colors shrink-0 ${
                  isWishlisted
                    ? 'border-rose-pink/20 bg-rose-pink/5 text-rose-pink'
                    : 'border-gray-200 hover:border-gray-300 text-gray-400 bg-white'
                }`}
                title={isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current text-rose-pink' : ''}`} />
              </button>

            </div>

          </div>

          {/* Vellum assurances badges */}
          <div className="grid grid-cols-3 gap-2 text-center bg-white border border-gray-150 p-4 rounded-xl shadow-xs text-[10px] sm:text-xs font-sans text-gray-550">
            <div className="flex flex-col items-center gap-1 border-r border-gray-100">
              <Truck className="w-4 h-4 text-gold mb-0.5" />
              <span className="font-semibold text-gray-800">Insured Dispatch</span>
              <span className="text-[9px] text-gray-400">Complimentary above ₹5K</span>
            </div>
            <div className="flex flex-col items-center gap-1 border-r border-gray-100">
              <ShieldCheck className="w-4 h-4 text-gold mb-0.5" />
              <span className="font-semibold text-gray-800">Secure Payments</span>
              <span className="text-[9px] text-gray-400">256-bit safe SSL</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Award className="w-4 h-4 text-gold mb-0.5" />
              <span className="font-semibold text-gray-800">100% Genuine</span>
              <span className="text-[9px] text-gray-400">Certified by Guilds</span>
            </div>
          </div>
        </div>

      </section>

      {/* DETAILED SPECIFICATION TABS */}
      <section className="bg-white rounded-2xl border border-gray-150 p-6 sm:p-10 shadow-sm">
        <div className="flex border-b border-gray-100 mb-6">
          <button
            onClick={() => setActiveTab('details')}
            className={`pb-3 font-serif text-base sm:text-lg font-bold transition-all border-b-2 uppercase tracking-wide mr-8 ${
              activeTab === 'details' ? 'border-burgundy text-burgundy' : 'border-transparent text-gray-400 hover:text-gray-900'
            }`}
          >
            Material & Details
          </button>
          <button
            onClick={() => setActiveTab('care')}
            className={`pb-3 font-serif text-base sm:text-lg font-bold transition-all border-b-2 uppercase tracking-wide ${
              activeTab === 'care' ? 'border-burgundy text-burgundy' : 'border-transparent text-gray-400 hover:text-gray-900'
            }`}
          >
            Care Instructions
          </button>
        </div>

        <div className="text-xs sm:text-sm font-sans text-gray-650 leading-relaxed">
          {activeTab === 'details' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 divide-y md:divide-y-0 md:divide-x divide-gray-100">
              <div className="space-y-3.5">
                <div className="flex gap-2">
                  <span className="font-bold text-gray-800 md:w-32 shrink-0">Fine Material:</span>
                  <span className="text-gray-600">{selectedProduct.details.material}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold text-gray-800 md:w-32 shrink-0">Active Style:</span>
                  <span className="text-gray-600">{selectedProduct.details.style}</span>
                </div>
              </div>
              <div className="pt-4 md:pt-0 md:pl-6 space-y-3.5 text-gray-600">
                <p>
                  At Velvet Crown, every thread, link, and cut is inspected twice by senior master dressmakers under strict studio conditions.
                </p>
                <p>
                  Our raw materials are ethically sourced under certified global guidelines to confirm no harm is brought to workers, local communities, or animal life.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-6 md:gap-10">
              <div className="p-4 bg-burgundy/5 border border-burgundy/10 text-burgundy rounded-xl max-w-sm w-full font-serif font-semibold italic text-center text-sm flex items-center justify-center sm:px-6">
                “To preserve the crown luster of your treasures, treat them with delicate gentleness.”
              </div>
              <div className="flex-1 space-y-3 text-gray-600">
                <p className="font-bold text-gray-800 uppercase tracking-widest text-[10px] text-gold">MAINTENANCE PRINCIPLE:</p>
                <p>{selectedProduct.details.care}</p>
                <p>We highly suggest cleaning item frames under micro-cloths, storing them stuffed in dustbags when inactive, and dry cleaning only by high-end professionals.</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CUSTOMER REVIEWS HUB (with custom verified post reviews form!) */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-10 sm:gap-14">
        
        {/* Left column: written feedback lists */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-gray-900">
            Atelier Customer Log ({selectedProduct.reviewsCount})
          </h3>
          
          <div className="space-y-4 divide-y divide-gray-100">
            {selectedProduct.reviewsList.map((rev) => (
              <div key={rev.id} className="pt-4 first:pt-0 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-sm font-bold text-gray-900">{rev.userName}</span>
                  <span className="text-[10px] font-sans text-gray-400">{rev.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center text-amber-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${i < rev.rating ? 'fill-current' : 'text-gray-200'}`}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] font-sans font-bold bg-emerald-50 text-emerald-800 border border-emerald-100 px-1.5 py-0.2 rounded uppercase">
                    Verified Buyer
                  </span>
                </div>
                <p className="font-sans text-xs sm:text-sm text-gray-550 italic leading-relaxed">
                  “{rev.comment}”
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right column: Star post review form */}
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-150 shadow-sm space-y-6 self-start">
          <div className="space-y-1.5 border-b border-gray-100 pb-3">
            <span className="text-[10px] font-sans text-[#BCA02E] font-bold uppercase tracking-widest block">POST AN ATTESTATION</span>
            <h4 className="font-serif text-lg font-bold text-gray-900 leading-snug">Write a Customer Review</h4>
          </div>

          <form onSubmit={handleReviewSubmit} className="space-y-4">
            
            <div className="space-y-1">
              <label className="text-xs font-sans font-semibold text-gray-700 block text-left">Your Signature Name</label>
              <input
                type="text"
                placeholder="Enter your name..."
                required
                value={reviewName}
                onChange={(e) => setReviewName(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-xs sm:text-sm rounded-lg px-3 py-2.5 outline-none font-sans focus:border-burgundy focus:bg-white transition-all shadow-inner"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-sans font-semibold text-gray-700 block text-left">Royal Rating Score</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setReviewRating(num)}
                    className="p-1 hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        num <= reviewRating ? 'text-amber-500 fill-current' : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-sans font-semibold text-gray-700 block text-left">Written Commentary</label>
              <textarea
                placeholder="Share your certified thoughts on fabrics, locks, fitting sizes..."
                rows={4}
                required
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-xs sm:text-sm rounded-lg px-3 py-2.5 outline-none font-sans focus:border-burgundy focus:bg-white transition-all shadow-inner h-24 sm:h-28"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-burgundy hover:bg-burgundy-hover text-white text-xs sm:text-sm font-sans font-bold py-3 rounded-lg uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-md shadow-burgundy/10"
            >
              <span>Submit Verified Feedback</span>
              <Send className="w-3.5 h-3.5" />
            </button>

          </form>
        </div>

      </section>

      {/* RELATED PRODUCTS RECOMMENDATIONS LIST */}
      {relatedProducts.length > 0 && (
        <section className="space-y-8" id="related-products">
          <div className="text-left space-y-1.5 border-b border-gray-150 pb-4">
            <span className="text-xs font-sans text-[#BCA02E] font-bold uppercase tracking-[0.2em] block">CURATED INDULGENCES</span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-gray-900">You May Also Admire</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {relatedProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
