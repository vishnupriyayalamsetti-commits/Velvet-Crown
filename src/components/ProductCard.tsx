/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Product } from '../types';
import { useShop } from '../contexts/ShopContext';
import { Heart, Eye, ShoppingCart, Star } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { toggleWishlist, wishlist, addToCart, setSelectedProduct } = useShop();

  const isWishlisted = wishlist.includes(product.id);
  
  // Calculate discount percentage
  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Default to first size if sizes exist
    const defaultSize = product.details.size && product.details.size.length > 0 
      ? product.details.size[0] 
      : undefined;
    addToCart(product, 1, defaultSize);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickView(product);
  };

  const rupeeFormatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-[0_12px_30px_rgba(122,30,58,0.06)] hover:border-burgundy/10 transition-all flex flex-col h-full relative cursor-pointer"
      onClick={() => setSelectedProduct(product)}
      id={`product-card-${product.id}`}
    >
      {/* Visual badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
        {product.isNew && (
          <span className="bg-gold text-white text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-md shadow-sm">
            New
          </span>
        )}
        {product.isBestSeller && (
          <span className="bg-burgundy text-white text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-md shadow-sm">
            Best Seller
          </span>
        )}
        {discountPercent > 0 && (
          <span className="bg-rose-pink text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm">
            -{discountPercent}% OFF
          </span>
        )}
      </div>

      {/* Wishlist and Quick Action Buttons over image */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
        <button
          onClick={handleWishlistClick}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors shadow-md ${
            isWishlisted 
              ? 'bg-rose-pink/10 text-rose-pink border border-rose-pink/20' 
              : 'bg-white text-gray-400 border border-gray-100 hover:text-rose-pink hover:bg-rose-pink/5'
          }`}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current text-rose-pink' : ''}`} />
        </button>
        <button
          onClick={handleQuickViewClick}
          className="w-9 h-9 rounded-full bg-white text-gray-400 border border-gray-100 flex items-center justify-center hover:text-burgundy hover:bg-burgundy/5 transition-colors shadow-md md:opacity-0 md:group-hover:opacity-100 duration-200"
          title="Quick View"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Product Image Frame */}
      <div className="aspect-[3/4] bg-gray-50 overflow-hidden relative">
        <img
          src={product.images[0]}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        {/* Hover image sweep */}
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={`${product.name} alternative`}
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out"
          />
        )}
        
        {/* Quick Add to Cart Panel on desktop hover */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center hidden sm:flex">
          <button
            onClick={handleAddToCartClick}
            className="w-full bg-white/95 text-burgundy hover:bg-burgundy hover:text-white text-xs font-sans font-bold py-2.5 rounded-lg shadow-md flex items-center justify-center gap-2 transition-colors transition-luxury"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>

      {/* Details Box */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        {/* Brand & Category row */}
        <div className="text-[10px] uppercase font-sans font-semibold tracking-widest text-[#BCA02E] mb-1 flex items-center gap-1.5">
          <span>{product.brand}</span>
          <span>•</span>
          <span className="text-gray-400 font-medium lowercase">{product.category}</span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-sm sm:text-base font-medium text-gray-900 group-hover:text-burgundy transition-colors min-h-[2.5rem] line-clamp-2 leading-snug">
          {product.name}
        </h3>

        {/* Dynamic expanding underline from Artistic Flair theme */}
        <div className="mt-2 mb-1 h-[2px] w-0 group-hover:w-full bg-[#D4AF37] transition-all duration-500 ease-out"></div>

        {/* Rating Row */}
        <div className="flex items-center gap-1.5 my-2">
          <div className="flex items-center gap-0.5 text-amber-500">
            {Array.from({ length: 5 }).map((_, i) => {
              const count = i + 1;
              return (
                <Star 
                  key={i} 
                  className={`w-3 h-3 ${count <= Math.floor(product.rating) ? 'fill-current' : 'text-gray-200'}`} 
                />
              );
            })}
          </div>
          <span className="text-[10px] font-sans font-semibold text-gray-850">
            {product.rating.toFixed(1)}
          </span>
          <span className="text-[10px] font-sans text-gray-450">
            ({product.reviewsCount})
          </span>
        </div>

        {/* Price Row (push to bottom) */}
        <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-sm sm:text-base font-sans font-bold text-burgundy">
              {rupeeFormatter.format(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs font-sans text-gray-400 line-through">
                {rupeeFormatter.format(product.originalPrice)}
              </span>
            )}
          </div>
          
          {/* Mobile Cart Button (As Hover isn't active on touch targets) */}
          <button
            onClick={handleAddToCartClick}
            className="sm:hidden p-2 rounded-full bg-burgundy/5 text-burgundy hover:bg-burgundy hover:text-white transition-colors"
            title="Add directly to cart"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
