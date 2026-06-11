/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { useShop } from '../contexts/ShopContext';
import { X, Star, Plus, Minus, ShoppingCart, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const { addToCart, wishlist, toggleWishlist } = useShop();
  
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.images[0]);
      // Default size to the first available size
      if (product.details.size && product.details.size.length > 0) {
        setSelectedSize(product.details.size[0]);
      } else {
        setSelectedSize('One Size');
      }
      setQuantity(1);
    }
  }, [product]);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize);
    onClose();
  };

  const isWishlisted = wishlist.includes(product.id);
  const rupeeFormatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
        {/* Backdrop cover overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Modal core window panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative z-10 grid grid-cols-1 md:grid-cols-2 md:divide-x md:divide-gray-100"
          id={`quick-view-modal-${product.id}`}
        >
          {/* Close button floats on top right */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Side: Images Gallery */}
          <div className="p-6 sm:p-8 flex flex-col gap-4">
            <div className="aspect-[4/5] bg-gray-50 rounded-xl overflow-hidden relative">
              <img
                src={selectedImage || product.images[0]}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnail Row */}
            {product.images.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-14 sm:w-16 aspect-[4/5] bg-gray-50 rounded-md overflow-hidden shrink-0 border-2 transition-all ${
                      selectedImage === img ? 'border-burgundy scale-95 shadow-sm' : 'border-transparent hover:border-gray-200'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`alternative ${idx}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Side: Product Description & purchasing selectors */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Brand label */}
              <div className="text-[10px] uppercase tracking-widest text-[#BCA02E] font-semibold mb-1 font-sans">
                {product.brand}
              </div>

              {/* Title heading */}
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 leading-tight mb-2">
                {product.name}
              </h2>

              {/* Ratings and reviews counter */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-sans font-semibold text-gray-800">
                  {product.rating.toFixed(1)} / 5.0
                </span>
                <span className="text-xs font-sans text-gray-400">
                  ({product.reviewsCount} verified reviews)
                </span>
              </div>

              {/* Price bracket */}
              <div className="flex items-baseline gap-3.5 mb-5 p-3.5 bg-gray-50 rounded-xl">
                <span className="text-xl sm:text-2xl font-sans font-extrabold text-burgundy">
                  {rupeeFormatter.format(product.price)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-sm font-sans text-gray-400 line-through">
                      {rupeeFormatter.format(product.originalPrice)}
                    </span>
                    <span className="text-xs font-sans font-bold text-rose-pink bg-rose-pink/10 px-2 py-0.5 rounded">
                      Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </span>
                  </>
                )}
              </div>

              {/* Description Body */}
              <p className="text-xs sm:text-sm text-gray-650 leading-relaxed font-sans mb-5">
                {product.description}
              </p>

              {/* Size Selector Form */}
              {product.details.size && product.details.size.length > 0 && (
                <div className="mb-5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-sans font-bold text-gray-800 uppercase tracking-wider">
                      Select Size
                    </span>
                    <span className="text-[11px] font-sans text-gray-400">
                      Standard Indian Sizing
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.details.size.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`min-w-[42px] h-10 px-3 rounded-lg border text-xs font-sans font-semibold transition-all ${
                          selectedSize === sz
                            ? 'border-burgundy bg-burgundy text-white shadow-sm'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-800'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity input */}
              <div className="mb-6 flex items-center gap-4">
                <span className="text-xs font-sans font-bold text-gray-800 uppercase tracking-wider shrink-0">
                  Quantity
                </span>
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2.5 hover:bg-gray-100 text-gray-600 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 text-sm font-sans font-bold text-gray-800 select-none">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-2.5 hover:bg-gray-100 text-gray-600 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="flex items-center gap-3.5 pt-4 border-t border-gray-100">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-burgundy hover:bg-burgundy-hover text-white py-3.5 rounded-xl text-sm font-sans font-bold flex items-center justify-center gap-2.5 shadow-md shadow-burgundy/10 transition-colors transition-luxury"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Royal Cart</span>
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3.5 rounded-xl border flex items-center justify-center transition-colors ${
                  isWishlisted
                    ? 'border-rose-pink/20 bg-rose-pink/5 text-rose-pink'
                    : 'border-gray-200 hover:border-gray-300 text-gray-400 hover:text-gray-900 bg-white'
                }`}
                title={isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current text-rose-pink' : ''}`} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
